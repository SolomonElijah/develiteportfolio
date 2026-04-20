import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json()

    const recipients = Array.isArray(to) ? to : [to]

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563EB;">${subject}</h2>
        <div style="color: #374151; white-space: pre-wrap;">${message}</div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #6b7280; font-size: 14px;">
          Best regards,<br />
          Solomon Elijah<br />
          Full-Stack Developer
        </p>
      </div>
    `

    const { data, error } = await resend.emails.send({
      from: `Solomon Elijah <${FROM_EMAIL}>`,
      to: recipients,
      subject,
      html,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}