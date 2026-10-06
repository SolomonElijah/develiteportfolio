'use client'

import { useState } from 'react'
import { developer } from '@/lib/profile'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const message = encodeURIComponent(
    'Hello Solomon, I visited your portfolio and would like to discuss a project.',
  )
  const whatsappUrl = `https://wa.me/${developer.whatsapp}?text=${message}`

  return (
    <aside
      aria-label="WhatsApp quick contact"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
    >
      {/* Floating tooltip label */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group hidden sm:flex items-center gap-2.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 py-2 px-3.5 shadow-lg shadow-black/5 dark:shadow-black/30 backdrop-blur-md transition-all duration-300 ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-90 translate-x-1 hover:opacity-100 hover:translate-x-0'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
          Chat on WhatsApp
        </span>
      </a>

      {/* Primary Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Solomon Elijah on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_32px_rgba(37,211,102,0.6)] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Soft pulse ring effect */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:hidden"
          style={{ animationDuration: '2.5s' }}
        />

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 h-7 w-7 fill-white transition-transform duration-300 group-hover:rotate-6"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 20.17C10.57 20.17 9.12 19.77 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.63L5.07 16.31C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.92C20.28 16.47 16.59 20.17 12.05 20.17ZM16.57 14.39C16.32 14.26 15.1 13.66 14.87 13.58C14.65 13.5 14.49 13.46 14.32 13.71C14.16 13.96 13.69 14.51 13.55 14.67C13.4 14.84 13.26 14.86 13.01 14.73C12.76 14.61 11.96 14.35 11.01 13.5C10.27 12.84 9.77 12.03 9.63 11.78C9.48 11.53 9.61 11.4 9.74 11.27C9.85 11.16 9.98 10.99 10.11 10.84C10.23 10.7 10.27 10.59 10.35 10.43C10.44 10.26 10.39 10.12 10.33 10C10.27 9.87 9.78 8.67 9.58 8.17C9.38 7.69 9.17 7.75 9.02 7.74C8.88 7.74 8.71 7.74 8.55 7.74C8.38 7.74 8.11 7.8 7.89 8.05C7.66 8.3 7.02 8.9 7.02 10.12C7.02 11.34 7.91 12.51 8.03 12.68C8.16 12.84 9.77 15.34 12.24 16.4C12.83 16.66 13.28 16.81 13.64 16.92C14.24 17.11 14.78 17.08 15.21 17.02C15.69 16.95 16.69 16.42 16.9 15.83C17.11 15.24 17.11 14.74 17.05 14.63C16.98 14.53 16.82 14.47 16.57 14.39Z" />
        </svg>
      </a>
    </aside>
  )
}
