import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Cache the service client singleton across server invocations to enable HTTP keep-alive
// connection pooling and eliminate TLS handshake overhead on every query.
let cachedServiceClient: SupabaseClient<any, 'public', any> | null = null

export function createServiceClient(): SupabaseClient<any, 'public', any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Database is not configured.')

  if (!cachedServiceClient) {
    cachedServiceClient = createClient<any>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  return cachedServiceClient
}
