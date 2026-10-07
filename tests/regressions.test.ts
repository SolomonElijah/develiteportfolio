import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'
import { generateSlug, parseArchitecture } from '../lib/utils'
import { parseContactCsv } from '../lib/csv'
import * as validation from '../lib/validation'
import * as emailDelivery from '../lib/email-delivery'
import { sendEmailBatches } from '../lib/email-client'

// Load the real server module with provider boundaries replaced. These tests
// never use local credentials or contact SMTP, Resend, or a live database.
function loadServerModule(file: string, overrides: Record<string, unknown>) {
  const path = resolve(file),
    module = { exports: {} }
  const require = createRequire(path)
  const compiled = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  runInNewContext(compiled, {
    module,
    exports: module.exports,
    process,
    console,
    crypto,
    URL,
    require: (specifier: string) =>
      specifier === 'server-only'
        ? {}
        : specifier in overrides
          ? overrides[specifier]
          : require(
              specifier.startsWith('.')
                ? resolve(dirname(path), specifier)
                : specifier,
            ),
  })
  return module.exports as Record<string, any>
}

test('generated slugs match public route validation, including truncated titles', () => {
  for (const title of [
    'my_project',
    'Hello world!',
    `${'a'.repeat(179)} long title`,
  ]) {
    const slug = generateSlug(title)
    assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(slug.length <= 180)
  }
})

test('architecture parsing preserves descriptions and URL colons', () => {
  assert.deepEqual(
    parseArchitecture(
      'Frontend: React component UI Backend: REST API Storage: Cloud files',
    ),
    [
      { layer: 'Frontend', detail: 'React component UI' },
      { layer: 'Backend', detail: 'REST API' },
      { layer: 'Storage', detail: 'Cloud files' },
    ],
  )
  assert.deepEqual(
    parseArchitecture('Frontend: https://example.com Backend: Node.js'),
    [
      { layer: 'Frontend', detail: 'https://example.com' },
      { layer: 'Backend', detail: 'Node.js' },
    ],
  )
  assert.deepEqual(
    parseArchitecture('Custom Layer: First detail\nOther: Second detail'),
    [
      { layer: 'Custom Layer', detail: 'First detail' },
      { layer: 'Other', detail: 'Second detail' },
    ],
  )
})

test('contact CSV preserves quoted commas, escaped quotes, and multiline messages', () => {
  assert.deepEqual(
    parseContactCsv(
      '\uFEFFname,email,message\r\n"Smith, Jane",jane@example.com,"Hello\n""quoted"" message"\r\n',
    ),
    [
      {
        name: 'Smith, Jane',
        email: 'jane@example.com',
        message: 'Hello\n"quoted" message',
        phone: undefined,
      },
    ],
  )
  assert.throws(
    () => parseContactCsv('name,email\n"unfinished,jane@example.com'),
    /unterminated/,
  )
  assert.throws(
    () => parseContactCsv('name,email\nJane,jane@example.com,extra'),
    /all columns/,
  )
})

test('image validation permits approved hosts and rejects traversal, HTTP, and lookalike hosts', () => {
  const allowed = 'https://images.unsplash.com/photo-test?w=1200'
  assert.equal(validation.safeImageUrl(allowed), allowed)
  assert.equal(
    validation.safeImageUrl('http://images.unsplash.com/photo-test'),
    undefined,
  )
  assert.equal(
    validation.safeImageUrl('https://images.unsplash.com.evil.example/photo'),
    undefined,
  )
  assert.equal(validation.safeImageUrl('/images/../private.png'), undefined)
  assert.equal(
    validation.safeImageUrl('https://udkzxajwoxcppzthvzwz.supabase.co/admin'),
    undefined,
  )
})

test('a successful empty blog query does not republish snapshot articles', async () => {
  const query = {
    select() {
      return this
    },
    eq() {
      return this
    },
    async order() {
      return { data: [], error: null }
    },
  }
  const data = loadServerModule('lib/data.ts', {
    'next/cache': { unstable_cache: (fn: unknown) => fn },
    './supabase/service': {
      createServiceClient: () => ({ from: () => query }),
    },
  })
  assert.equal((await data.getBlogPosts()).length, 0)
})

test('contact saves respond before the notification is sent', async () => {
  let saved = false,
    notified = false,
    scheduled: (() => Promise<void>) | undefined
  const query = {
    select() {
      return this
    },
    eq() {
      return this
    },
    async gte() {
      return { count: 0, error: null }
    },
    async insert() {
      saved = true
      return { error: null }
    },
  }
  const route = loadServerModule('app/api/contact/route.ts', {
    'next/server': {
      NextResponse: { json: Response.json },
      after: (callback: () => Promise<void>) => {
        scheduled = callback
      },
    },
    '@/lib/supabase/service': {
      createServiceClient: () => ({ from: () => query }),
    },
    '@/lib/validation': validation,
    '@/lib/http': {
      sameOrigin: () => true,
      allowRequest: () => true,
      readJson: (request: Request) => request.json(),
    },
    '@/lib/email': {
      sendNewContactNotification: async () => {
        notified = true
        return { sent: ['owner@example.com'], failed: [], uncertain: [] }
      },
    },
  })
  const response = await route.POST(
    new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane',
        email: 'jane@example.com',
        subject: 'A project',
        message: 'A sufficiently long inquiry message.',
      }),
    }),
  )
  assert.equal(response.status, 201)
  assert.equal(saved, true)
  assert.equal(notified, false)
  assert.ok(scheduled)
  await scheduled()
  assert.equal(notified, true)
})

test('email fallback retries only recipients definitely rejected by SMTP', async () => {
  const fallbackCalls: string[][] = []
  const result = await emailDelivery.deliverEmail(
    ['sent@example.com', 'failed@example.com', 'unknown@example.com'],
    async (recipient) => {
      if (recipient.startsWith('failed'))
        throw { code: 'EENVELOPE', responseCode: 550 }
      if (recipient.startsWith('unknown'))
        throw { code: 'ECONNECTION', command: 'CONN' }
    },
    async (pending) => {
      fallbackCalls.push(pending)
    },
  )
  assert.deepEqual(result, {
    sent: ['sent@example.com', 'failed@example.com'],
    failed: [],
    uncertain: ['unknown@example.com'],
  })
  assert.deepEqual(fallbackCalls, [['failed@example.com']])
})

test('Resend API-only configuration is reachable and SMTP preflight failures fall back', async () => {
  const names = [
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PORT',
    'SMTP_PASSWORD',
    'SMTP_PASS',
    'RESEND_API_KEY',
    'RESEND_FROM_EMAIL',
  ]
  const original = Object.fromEntries(
    names.map((name) => [name, process.env[name]]),
  )
  const batches: any[][] = []
  let smtpSends = 0
  try {
    names.forEach((name) => delete process.env[name])
    process.env.RESEND_API_KEY = 'test-key'
    process.env.RESEND_FROM_EMAIL = 'owner@example.com'
    const mail = loadServerModule('lib/email.ts', {
      nodemailer: {
        createTransport: () => ({
          verify: async () => {
            throw new Error('Connection refused')
          },
          sendMail: async () => {
            smtpSends++
          },
        }),
      },
      resend: {
        Resend: class {
          batch = {
            send: async (batch: any[]) => {
              batches.push(batch)
              return {
                data: { data: batch.map(() => ({ id: 'test' })) },
                error: null,
              }
            },
          }
        },
      },
      './validation': validation,
      './email-delivery': emailDelivery,
      './profile': {
        developer: { email: 'owner@example.com' },
        siteUrl: 'https://example.com',
      },
    })
    await mail.sendContactReply({
      to: ['a@example.com', 'b@example.com'],
      subject: '<Hello>',
      message: '<script>text</script>',
    })
    assert.equal(batches.length, 1)
    assert.deepEqual(
      batches[0].map((mail) => Array.from(mail.to)),
      [['a@example.com'], ['b@example.com']],
    )
    assert.ok(batches[0][0].html.includes('&lt;script&gt;'))
    process.env.SMTP_HOST = 'smtp.example.com'
    process.env.SMTP_USER = 'owner'
    process.env.SMTP_PASSWORD = 'test-password'
    await mail.sendContactReply({
      to: 'a@example.com',
      subject: 'Hello',
      message: 'Text',
    })
    assert.equal(batches.length, 2)
    assert.equal(smtpSends, 0)
  } finally {
    names.forEach((name) => {
      if (original[name] === undefined) delete process.env[name]
      else process.env[name] = original[name]
    })
  }
})

test('broadcasts split at 50 recipients and retain failures without re-sending successes', async () => {
  const recipients = Array.from(
    { length: 51 },
    (_, index) => `person${index}@example.com`,
  )
  const batches: string[][] = []
  const request = (async (_url: unknown, init?: RequestInit) => {
    const batch = JSON.parse(String(init!.body)).to as string[]
    batches.push(batch)
    return Response.json(
      { sent: batch.slice(1), failed: [batch[0]], uncertain: [] },
      { status: 207 },
    )
  }) as typeof fetch
  const first = await sendEmailBatches(
    recipients,
    'Subject',
    'Message',
    request,
  )
  assert.deepEqual(
    batches.map((batch) => batch.length),
    [50, 1],
  )
  assert.equal(first.sent.length, 49)
  assert.deepEqual(first.failed, [recipients[0], recipients[50]])
  batches.length = 0
  await sendEmailBatches(
    [...first.failed, ...first.unsent],
    'Subject',
    'Message',
    request,
  )
  assert.deepEqual(batches, [[recipients[0], recipients[50]]])
})

test('a lost broadcast response is unconfirmed and later batches remain unsent', async () => {
  const recipients = Array.from(
    { length: 51 },
    (_, index) => `person${index}@example.com`,
  )
  const request = (async () => {
    throw new Error('Network interrupted')
  }) as typeof fetch
  const result = await sendEmailBatches(
    recipients,
    'Subject',
    'Message',
    request,
  )
  assert.equal(result.uncertain.length, 50)
  assert.deepEqual(result.unsent, [recipients[50]])
  assert.equal(result.failed.length, 0)
})
