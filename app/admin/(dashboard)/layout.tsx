import { getAuthUser } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/authorization'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'
import { ToastProvider } from '@/components/admin/ToastProvider'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthUser()
  if (!isAdmin(user)) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar user={user} />
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <ToastProvider />
          {children}
        </main>
      </div>
    </div>
  )
}
