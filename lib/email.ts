import 'server-only'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'
import { escapeHtml } from './validation'
import { developer, siteUrl } from './profile'

interface MailOptions {
  from?: string
  to: string | string[]
  replyTo?: string
  subject: string
  html: string
}

/**
 * Returns a configured Nodemailer SMTP transporter.
 * Supports Resend SMTP (smtp.resend.com), Gmail, Zoho, cPanel, or any standard SMTP server.
 */
function getMailTransporter() {
  const host =
    process.env.SMTP_HOST ||
    (process.env.RESEND_API_KEY ? 'smtp.resend.com' : undefined)
  const port = Number(
    process.env.SMTP_PORT || (host === 'smtp.resend.com' ? 465 : 587),
  )
  const user =
    process.env.SMTP_USER ||
    (host === 'smtp.resend.com' ? 'resend' : undefined)
  const pass =
    process.env.SMTP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.RESEND_API_KEY

  if (!host || !pass) {
    return null
  }

  // Use SSL for port 465 / 2465, STARTTLS for 587 / 2587
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465 || port === 2465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user
      ? {
          user,
          pass,
        }
      : undefined,
  })
}

function getFromAddress() {
  if (process.env.SMTP_FROM) return process.env.SMTP_FROM
  if (process.env.RESEND_FROM_EMAIL) {
    return `Solomon Elijah <${process.env.RESEND_FROM_EMAIL}>`
  }
  return `Solomon Elijah <${developer.email}>`
}

/**
 * Core dispatch function.
 * Uses SMTP (Nodemailer) as primary, with Resend REST API as transparent fallback.
 */
async function dispatchEmail({ to, replyTo, subject, html }: MailOptions) {
  const transporter = getMailTransporter()

  if (transporter) {
    const from = getFromAddress()
    const recipients = Array.isArray(to) ? to : [to]

    // Send individually so recipient addresses stay private
    const results = await Promise.all(
      recipients.map((recipient) =>
        transporter.sendMail({
          from,
          to: recipient,
          replyTo,
          subject,
          html,
        }),
      ),
    )

    return results
  }

  // Fallback to Resend REST API if SMTP credentials are not present but RESEND_API_KEY is
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const recipients = Array.isArray(to) ? to : [to]
    const { data, error } = await resend.batch.send(
      recipients.map((recipient) => ({
        from: `Solomon Elijah <${process.env.RESEND_FROM_EMAIL}>`,
        to: [recipient],
        replyTo,
        subject,
        html,
      })),
    )
    if (error) throw new Error('Failed to send email via Resend.')
    return data
  }

  throw new Error(
    'Email service is not configured. Please specify SMTP settings (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD) in .env',
  )
}

/**
 * Sends a reply or bulk email to contact/client inquiries from the admin panel.
 */
export async function sendContactReply({
  to,
  subject,
  message,
}: {
  to: string | string[]
  subject: string
  message: string
}) {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #0f172a;">
      <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 20px; font-weight: 700;">${escapeHtml(subject)}</h2>
      <div style="font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #334155; margin-bottom: 24px;">
${escapeHtml(message)}
      </div>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 13px; line-height: 1.5; color: #64748b; margin: 0;">
        Best regards,<br />
        <strong style="color: #0f172a;">Solomon Elijah</strong><br />
        Full-Stack Software Developer<br />
        <a href="${siteUrl}" style="color: #2563eb; text-decoration: none;">${siteUrl.replace(/^https?:\/\//, '')}</a>
      </p>
    </div>
  `

  return dispatchEmail({
    to,
    subject,
    html,
  })
}

/**
 * Sends an instant notification to Solomon's email whenever a new message is submitted on the website.
 */
export async function sendNewContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const recipient =
    process.env.ADMIN_NOTIFICATION_EMAIL || developer.email

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #0f172a;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 700;">📬 New Portfolio Contact Submission</h2>
        <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Someone reached out through your website contact form.</p>
      </div>

      <div style="margin-bottom: 20px; background-color: #f8fafc; border-radius: 8px; padding: 16px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 90px; font-weight: 600;">From:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Subject:</td>
            <td style="padding: 6px 0; color: #0f172a;">${escapeHtml(subject)}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Message:</h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1e293b;">
${escapeHtml(message)}
        </div>
      </div>

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Re: ' + subject)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-size: 13px; font-weight: 600;">
          Reply directly to ${escapeHtml(name)}
        </a>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
        Delivered automatically from your portfolio at <a href="${siteUrl}" style="color: #64748b;">${siteUrl.replace(/^https?:\/\//, '')}</a>
      </p>
    </div>
  `

  return dispatchEmail({
    to: recipient,
    replyTo: email,
    subject: `🔔 New message from ${name}: "${subject}"`,
    html,
  })
}

