import 'server-only'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { createServiceClient } from './service'
import { isAdmin } from './authorization'
export async function createClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Authentication is not configured.')
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          /* Server Components cannot update cookies; proxy refreshes them. */
        }
      },
    },
  })
}
export const getAuthUser = cache(async () => {
  try {
    const client = await createClient()
    const {
      data: { user },
      error,
    } = await client.auth.getUser()
    return error ? null : user
  } catch {
    return null
  }
})
export async function requireAdmin() {
  const user = await getAuthUser()
  if (!isAdmin(user)) throw new Error('Unauthorized')
  return user!
}
import type { SupabaseClient } from '@supabase/supabase-js'

export async function createAdminClient(): Promise<SupabaseClient<any, 'public', any>> {
  await requireAdmin()
  return createServiceClient()
}
