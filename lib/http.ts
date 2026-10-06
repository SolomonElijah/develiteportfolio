import 'server-only'
import type { NextRequest } from 'next/server'

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).origin === request.nextUrl.origin
  } catch {
    return false
  }
}
export async function readJson(
  request: Request,
  limit = 24000,
): Promise<Record<string, unknown>> {
  if (!request.headers.get('content-type')?.includes('application/json'))
    throw new Error('Use an application/json request.')
  if (Number(request.headers.get('content-length') || 0) > limit)
    throw new Error('Request is too large.')
  const reader = request.body?.getReader()
  if (!reader) throw new Error('Request body is required.')
  const chunks: Uint8Array[] = []
  let length = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    length += value.length
    if (length > limit) {
      await reader.cancel()
      throw new Error('Request is too large.')
    }
    chunks.push(value)
  }
  const bytes = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.length
  }
  const result: unknown = JSON.parse(new TextDecoder().decode(bytes))
  if (!result || typeof result !== 'object' || Array.isArray(result))
    throw new Error('Invalid request body.')
  return result as Record<string, unknown>
}

// Per-process protection. The contact route additionally limits saved messages
// per email in the database; distributed IP limits belong at the hosting edge.
const buckets = new Map<string, { count: number; expires: number }>()
export function allowRequest(key: string, max: number, windowMs = 600000) {
  const now = Date.now()
  for (const [storedKey, value] of buckets)
    if (value.expires <= now) buckets.delete(storedKey)
  const existing = buckets.get(key)
  if (existing) {
    if (existing.count >= max) return false
    existing.count++
    return true
  }
  if (buckets.size >= 10000) return false
  buckets.set(key, { count: 1, expires: now + windowMs })
  return true
}
