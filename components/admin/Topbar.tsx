'use client'

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase/client'

interface TopbarProps {
  user: any
}

export default function Topbar({ user }: TopbarProps) {
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <header className="bg-white dark:bg-navy-card border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-end gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {user?.email ?? 'Admin'}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </header>
  )
}
