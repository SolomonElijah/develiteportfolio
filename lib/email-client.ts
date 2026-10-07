import type { EmailDeliveryResult } from './email-delivery'

export interface EmailSendResult extends EmailDeliveryResult {
  unsent: string[]
  error?: string
}

export async function sendEmailBatches(
  recipients: string[],
  subject: string,
  message: string,
  request: typeof fetch = fetch,
): Promise<EmailSendResult> {
  const addresses = Array.from(
    new Set(recipients.map((address) => address.trim().toLowerCase())),
  )
  const result: EmailSendResult = {
    sent: [],
    failed: [],
    uncertain: [],
    unsent: [],
  }
  for (let offset = 0; offset < addresses.length; offset += 50) {
    const batch = addresses.slice(offset, offset + 50)
    if (offset) await new Promise((resolve) => setTimeout(resolve, 600))
    let response: Response
    try {
      response = await request('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: batch, subject, message }),
      })
    } catch {
      result.uncertain.push(...batch)
      result.unsent.push(...addresses.slice(offset + batch.length))
      result.error =
        'The connection was interrupted. Check delivery before resending unconfirmed emails.'
      break
    }
    if (!response.ok) {
      if ([400, 401, 403, 429].includes(response.status))
        result.failed.push(...batch)
      else result.uncertain.push(...batch)
      result.unsent.push(...addresses.slice(offset + batch.length))
      const data = await response.json().catch(() => ({}))
      result.error = data.error || 'Email could not be sent. Try again later.'
      break
    }
    try {
      const data = (await response.json()) as EmailDeliveryResult
      const groups = [data.sent, data.failed, data.uncertain]
      const reported = groups.flat()
      if (
        groups.some((group) => !Array.isArray(group)) ||
        reported.length !== batch.length ||
        new Set(reported).size !== batch.length ||
        reported.some((address) => !batch.includes(address))
      )
        throw new Error('Invalid delivery response.')
      result.sent.push(...data.sent)
      result.failed.push(...data.failed)
      result.uncertain.push(...data.uncertain)
    } catch {
      result.uncertain.push(...batch)
      result.unsent.push(...addresses.slice(offset + batch.length))
      result.error =
        'Delivery could not be confirmed. Check delivery before resending.'
      break
    }
  }
  return result
}

export function emailResultMessage(result: EmailSendResult) {
  return [
    `${result.sent.length} sent`,
    `${result.failed.length + result.unsent.length} not sent`,
    ...(result.uncertain.length
      ? [
          `${result.uncertain.length} unconfirmed; check delivery before resending`,
        ]
      : []),
    result.error,
  ]
    .filter(Boolean)
    .join('. ')
}
