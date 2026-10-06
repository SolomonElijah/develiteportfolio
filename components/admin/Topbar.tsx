'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase/client'

interface TopbarProps {
  user: any
}

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/admin/projects', icon: FolderIcon },
  { name: 'Blog', href: '/admin/blog', icon: DocumentTextIcon },
  { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon },
  { name: 'Clients', href: '/admin/clients', icon: UserGroupIcon },
]

export default function Topbar({ user }: TopbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  // Derive simple breadcrumb from pathname
  const segments = pathname.split('/').filter(Boolean).slice(1)
  const currentTitle =
    segments.length > 0
      ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
      : 'Dashboard'

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A'

  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 border border-slate-800"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs hidden sm:inline">Admin /</span>
          <span className="font-semibold text-slate-200 text-sm">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick View Website button */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
        >
          <GlobeAltIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>Live Site</span>
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-semibold">
            {userInitial}
          </div>
          <span className="text-xs text-slate-300 font-medium max-w-[140px] truncate hidden md:inline">
            {user?.email ?? 'Administrator'}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-all"
          title="Sign out of Admin"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-slate-950/95 border-b border-slate-800 p-4 space-y-2 backdrop-blur-xl z-50">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3.5 py-2 text-xs text-slate-400 hover:text-white"
            >
              <GlobeAltIcon className="w-4 h-4 text-blue-400" />
              <span>Visit Live Website</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
