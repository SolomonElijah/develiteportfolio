'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function TopLoaderContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const route = `${pathname}?${searchParams.toString()}`
  const previousRoute = useRef(route)

  // Complete progress on route changes
  useEffect(() => {
    if (previousRoute.current === route) return
    previousRoute.current = route
    if (isLoading) {
      setProgress(100)
      const fadeTimer = setTimeout(() => {
        setIsVisible(false)
      }, 200)

      const resetTimer = setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 400)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(resetTimer)
      }
    }
  }, [route, isLoading])

  // Trickle progress when loading
  useEffect(() => {
    let interval: ReturnJSInterval | null = null

    if (isLoading && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          // Organic deceleration curve towards 90%
          const step = Math.max((90 - prev) * 0.12, 1.2)
          return Math.min(90, prev + step)
        })
      }, 120) as unknown as ReturnJSInterval
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLoading, progress])

  // Auto-timeout failsafe so bar never hangs indefinitely
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsVisible(false)
        setIsLoading(false)
        setProgress(0)
      }, 8000)
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  useEffect(() => {
    function start() {
      setProgress(18)
      setIsLoading(true)
      setIsVisible(true)
    }

    function done() {
      setProgress(100)
      setTimeout(() => setIsVisible(false), 200)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 400)
    }

    function handleClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }

      const target = (e.target as HTMLElement)?.closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Skip external, anchors, mailto, etc.
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return
      }

      if (target.target && target.target !== '_self') return
      if (target.hasAttribute('download')) return

      try {
        const dest = new URL(href, window.location.href)
        const current = new URL(window.location.href)

        // Only handle same origin
        if (dest.origin !== current.origin) return

        // Skip identical route with same hash or query
        if (
          dest.pathname === current.pathname &&
          dest.search === current.search
        ) {
          return
        }

        start()
      } catch {
        // Invalid URL format
      }
    }

    function handlePopState() {
      start()
    }

    // Custom events for programmatic triggers
    window.addEventListener('toploader:start', start)
    window.addEventListener('toploader:done', done)
    document.addEventListener('click', handleClick, true)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('toploader:start', start)
      window.removeEventListener('toploader:done', done)
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  if (!isVisible && progress === 0) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[99999]"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 250ms ease-in-out',
      }}
    >
      {/* Laser progress line */}
      <div
        className="h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.85),0_0_6px_rgba(37,99,235,0.7)]"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? 'width 150ms ease-out'
              : 'width 250ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
      >
        {/* Leading glow beacon */}
        <div className="absolute right-0 top-[-2px] bottom-[-2px] w-24 bg-gradient-to-r from-transparent via-sky-300 to-white/90 blur-[1px]" />
      </div>

      {/* Floating indicator pill */}
      {isLoading && progress < 100 && (
        <div className="fixed top-3.5 right-4 z-[99999] flex items-center gap-2 rounded-full border border-blue-500/25 bg-white/90 dark:bg-slate-900/90 px-3 py-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] backdrop-blur-md text-[11px] font-semibold text-blue-600 dark:text-sky-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-sky-400" />
          </span>
          <span className="tracking-wide uppercase text-[10px]">Loading</span>
        </div>
      )}
    </div>
  )
}

type ReturnJSInterval = ReturnType<typeof setInterval>

export default function TopLoader() {
  return (
    <Suspense fallback={null}>
      <TopLoaderContent />
    </Suspense>
  )
}
