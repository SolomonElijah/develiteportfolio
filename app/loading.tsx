export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[70vh] w-full flex flex-col items-center justify-center py-20 px-4 select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Ambient soft glow aura */}
        <div className="absolute -inset-6 bg-blue-500/15 dark:bg-sky-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />

        {/* Orbiting spinner with central emblem */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer primary orbital ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/15 border-t-blue-600 dark:border-t-sky-400 border-r-blue-500/40 animate-spin" />

          {/* Inner counter-rotating ring */}
          <div
            className="absolute inset-2 rounded-full border border-sky-400/20 border-b-sky-400 border-l-blue-600/50 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
          />

          {/* Central Brand Badge */}
          <div className="relative z-10 w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-blue-500/25 dark:border-sky-500/30 shadow-md flex items-center justify-center">
            <span className="font-extrabold text-sm tracking-tight gradient-text">
              se<span className="text-blue-500 dark:text-sky-400">.</span>
            </span>
          </div>
        </div>

        {/* Animated label & progress bar */}
        <div className="mt-6 flex flex-col items-center gap-2.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span>Loading</span>
            <span className="inline-flex gap-0.5 ml-0.5 text-blue-500 dark:text-sky-400">
              <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </span>
          </p>

          {/* Sliding shimmer progress indicator */}
          <div className="w-32 h-1 rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden relative shadow-inner">
            <div className="skeleton-shimmer-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}

