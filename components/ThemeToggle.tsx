'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false),
    { resolvedTheme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === 'dark'
  return (
    <button
      className="icon-button"
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      disabled={!mounted}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        ) : (
          <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
        )}
      </svg>
    </button>
  )
}
