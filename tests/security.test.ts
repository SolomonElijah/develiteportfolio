import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  email,
  escapeHtml,
  safeExternalUrl,
  safeImage,
  formArray,
} from '../lib/validation'
import { isAdmin } from '../lib/supabase/authorization'
import type { User } from '@supabase/supabase-js'
test('unsafe links and unapproved image sources are rejected', () => {
  assert.equal(safeExternalUrl('javascript:alert(1)'), undefined)
  assert.equal(safeExternalUrl('https://name:password@example.com'), undefined)
  assert.equal(safeExternalUrl('http://example.com'), undefined)
  assert.equal(safeExternalUrl('https://example.com'), 'https://example.com/')
  assert.equal(
    safeImage('https://evil.example/track.png'),
    '/images/project1.png',
  )
  assert.equal(safeImage('/images/me.jpg'), '/images/me.jpg')
})
test('email markup and script terminators are escaped', () => {
  assert.equal(
    escapeHtml('<script>"hello" & \'world\'</script>'),
    '&lt;script&gt;&quot;hello&quot; &amp; &#39;world&#39;&lt;/script&gt;',
  )
})
test('malformed and oversized form arrays fail validation', () => {
  assert.throws(() => formArray('{"object":true}', 'Stack'))
  assert.throws(() => formArray(JSON.stringify(['a'.repeat(501)]), 'Stack'))
  assert.deepEqual(formArray('["React","React","Next.js"]', 'Stack'), [
    'React',
    'Next.js',
  ])
  assert.throws(() => email('a@b.com\r\nBcc:other@b.com'))
})
test('admin access ignores user-editable metadata and fails closed', () => {
  const original = process.env.ADMIN_EMAILS
  process.env.ADMIN_EMAILS = 'owner@example.com'
  const user = {
    email: 'visitor@example.com',
    email_confirmed_at: '2026-01-01',
    app_metadata: {},
    user_metadata: { role: 'admin' },
  } as unknown as User
  try {
    assert.equal(isAdmin(null), false)
    assert.equal(isAdmin(user), false)
    assert.equal(isAdmin({ ...user, email: 'OWNER@example.com' }), true)
    assert.equal(
      isAdmin({
        ...user,
        email: 'owner@example.com',
        email_confirmed_at: undefined,
      }),
      false,
    )
    assert.equal(isAdmin({ ...user, app_metadata: { role: 'admin' } }), true)
    assert.equal(
      isAdmin({ ...user, is_anonymous: true, app_metadata: { role: 'admin' } }),
      false,
    )
    process.env.ADMIN_EMAILS = ''
    assert.equal(isAdmin(user), false)
  } finally {
    if (original === undefined) delete process.env.ADMIN_EMAILS
    else process.env.ADMIN_EMAILS = original
  }
})
