import { getAuthUser } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/authorization'
export async function GET() {
  const authorized = isAdmin(await getAuthUser())
  return Response.json(
    { authorized },
    {
      status: authorized ? 200 : 403,
      headers: { 'Cache-Control': 'private, no-store' },
    },
  )
}
