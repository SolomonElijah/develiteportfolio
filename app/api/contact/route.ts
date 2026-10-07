import { after, NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { email, text } from '@/lib/validation'
import { allowRequest, readJson, sameOrigin } from '@/lib/http'
import { sendNewContactNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: 'This request could not be verified.' },
      { status: 403 },
    )
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!allowRequest(`contact:${ip}`, 5))
    return NextResponse.json(
      {
        error:
          'Too many requests. Please try again later or email me directly.',
      },
      { status: 429, headers: { 'Retry-After': '600' } },
    )
  let payload: { name: string; email: string; subject: string; message: string }
  try {
    const body = await readJson(request)
    if (body.website)
      return NextResponse.json(
        { error: 'This message could not be submitted.' },
        { status: 400 },
      )
    payload = {
      name: text(body.name, 'Name', 100),
      email: email(body.email),
      subject: text(body.subject, 'Subject', 150),
      message: text(body.message, 'Message', 5000),
    }
    if (payload.message.length < 20)
      throw new Error('Please include at least 20 characters in your message.')
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof SyntaxError
            ? 'Invalid request body.'
            : error instanceof Error
              ? error.message
              : 'Check your message and try again.',
      },
      { status: 400 },
    )
  }
  try {
    const db = createServiceClient()
    const { count, error: countError } = await db
      .from('contacts')
      .select('id', { count: 'exact', head: true })
      .eq('email', payload.email)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString())
    if (countError) throw new Error('Contact limit lookup failed')
    if ((count || 0) >= 3)
      return NextResponse.json(
        {
          error:
            'You have sent several messages recently. Please try again later or email me directly.',
        },
        { status: 429, headers: { 'Retry-After': '3600' } },
      )
    const { error } = await db.from('contacts').insert({
      name: payload.name,
      email: payload.email,
      message: `Subject: ${payload.subject}\n\n${payload.message}`,
      phone: '',
      status: 'pending',
    })
    if (error) throw new Error('Contact save failed')

    // Keep the notification alive after responding, without delaying the saved message.
    after(async () => {
      try {
        const result = await sendNewContactNotification(payload)
        if (result.failed.length || result.uncertain.length)
          console.error('Email alert delivery was not confirmed.')
      } catch (emailErr) {
        console.error('Email alert delivery failed:', emailErr)
      }
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    console.error('Contact submission unavailable.')
    return NextResponse.json(
      {
        error:
          'Your message could not be saved. Please try again or use the direct email link.',
      },
      { status: 503 },
    )
  }
}
