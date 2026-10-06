import type { User } from '@supabase/supabase-js'
export function isAdmin(user: User | null) {
  if (!user || user.is_anonymous) return false
  const allowed = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
  return (
    user.app_metadata?.role === 'admin' ||
    (!!user.email &&
      !!user.email_confirmed_at &&
      allowed.includes(user.email.toLowerCase()))
  )
}
