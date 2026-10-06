import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/authorization'
import { sendContactReply } from '@/lib/email'
import { email, text } from '@/lib/validation'
import { allowRequest, readJson, sameOrigin } from '@/lib/http'
export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!isAdmin(user))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  if (!allowRequest(`reply:${user!.id}`, 10))
    return NextResponse.json(
      { error: 'Too many email requests. Try again later.' },
      { status: 429 },
    )
  let recipients: string[], subject: string, message: string
  try {
    const body = await readJson(request, 150000)
    const raw = Array.isArray(body.to) ? body.to : [body.to]
    if (!raw.length || raw.length > 50)
      throw new Error('Choose between 1 and 50 recipients.')
    recipients = Array.from(new Set(raw.map(email)))
    subject = text(body.subject, 'Subject', 200)
    if (/[\r\n]/.test(subject)) throw new Error('Subject must be one line.')
    message = text(body.message, 'Message', 10000)
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Invalid email request.',
      },
      { status: 400 },
    )
  }
  try {
    await sendContactReply({ to: recipients, subject, message })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email reply error:', error)
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Email could not be sent. Check the provider configuration before retrying.',
      },
      { status: 503 },
    )
  }
}
