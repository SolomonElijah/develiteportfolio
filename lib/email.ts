import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[]
  subject: string
  html: string
}) {
  const { data, error } = await resend.emails.send({
    from: `Admin <${FROM_EMAIL}>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  })

  if (error) {
    console.error('Email error:', error)
    throw new Error('Failed to send email')
  }

  return data
}

export async function sendContactReply({
  to,
  subject,
  message,
}: {
  to: string
  subject: string
  message: string
}) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563EB;">Thank you for contacting me</h2>
      <p style="color: #374151;">${message}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #6b7280; font-size: 14px;">
        Best regards,<br />
        Solomon Elijah<br />
        Full-Stack Developer
      </p>
    </div>
  `

  return sendEmail({ to, subject, html })
}
