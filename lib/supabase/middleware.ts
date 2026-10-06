import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isAdmin } from './authorization'
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const login = request.nextUrl.pathname === '/admin/login'
  if (!url || !key)
    return login
      ? response
      : NextResponse.redirect(new URL('/admin/login', request.url))
  const client = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        )
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })
  const {
    data: { user },
    error,
  } = await client.auth.getUser()
  if ((!isAdmin(error ? null : user) && !login) || (isAdmin(user) && login)) {
    const redirect = NextResponse.redirect(
      new URL(login ? '/admin/dashboard' : '/admin/login', request.url),
    )
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie))
    redirect.headers.set('Cache-Control', 'private, no-store')
    return redirect
  }
  response.headers.set('Cache-Control', 'private, no-store')
  return response
}
