export interface EmailDeliveryResult {
  sent: string[]
  failed: string[]
  uncertain: string[]
}

// Only retry failures that establish the message was not accepted. A connection
// lost after DATA may have delivered the message even though sendMail rejected.
export function definitelyNotSent(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const { code, responseCode } = error as {
    code?: string
    responseCode?: number
  }
  return (
    ['EPRESEND', 'EAUTH', 'EDNS', 'EENVELOPE', 'EMESSAGE'].includes(
      code || '',
    ) ||
    (!!responseCode && responseCode >= 400)
  )
}

export async function deliverEmail(
  recipients: string[],
  smtp: ((recipient: string) => Promise<unknown>) | null,
  fallback: ((recipients: string[]) => Promise<void>) | null,
): Promise<EmailDeliveryResult> {
  const result: EmailDeliveryResult = { sent: [], failed: [], uncertain: [] }
  if (smtp) {
    // Bound SMTP concurrency and await every result before reporting delivery.
    for (let offset = 0; offset < recipients.length; offset += 5) {
      const batch = recipients.slice(offset, offset + 5)
      const outcomes = await Promise.allSettled(
        batch.map((recipient) => Promise.resolve().then(() => smtp(recipient))),
      )
      outcomes.forEach((outcome, index) => {
        if (outcome.status === 'fulfilled') result.sent.push(batch[index])
        else if (definitelyNotSent(outcome.reason))
          result.failed.push(batch[index])
        else result.uncertain.push(batch[index])
      })
    }
  } else {
    result.failed.push(...recipients)
  }
  if (fallback && result.failed.length) {
    const pending = [...result.failed]
    try {
      await fallback(pending)
      result.sent.push(...pending)
      result.failed = []
    } catch (error) {
      if (!definitelyNotSent(error)) {
        result.uncertain.push(...pending)
        result.failed = []
      }
    }
  }
  return result
}
