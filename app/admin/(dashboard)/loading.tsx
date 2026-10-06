export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-150" aria-busy="true" aria-label="Loading admin dashboard">
      {/* Header bar skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div className="space-y-2">
          <div className="w-48 h-7 rounded-lg skeleton-shimmer" />
          <div className="w-72 h-4 rounded-md skeleton-shimmer" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-10 rounded-xl skeleton-shimmer" />
          <div className="w-28 h-10 rounded-xl skeleton-shimmer" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 rounded-md skeleton-shimmer" />
              <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
            </div>
            <div className="w-20 h-8 rounded-lg skeleton-shimmer" />
            <div className="w-36 h-3 rounded-md skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Two columns: Recent projects & messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 space-y-4">
          <div className="w-40 h-5 rounded-md skeleton-shimmer mb-6" />
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="flex items-center gap-4 py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
              <div className="w-12 h-12 rounded-xl skeleton-shimmer shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-44 h-4 rounded-md skeleton-shimmer" />
                <div className="w-24 h-3 rounded-md skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 space-y-4">
          <div className="w-40 h-5 rounded-md skeleton-shimmer mb-6" />
          {[1, 2, 3, 4].map((k) => (
            <div key={k} className="p-3 rounded-xl border border-slate-100 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <div className="w-32 h-4 rounded-md skeleton-shimmer" />
                <div className="w-16 h-3 rounded-md skeleton-shimmer" />
              </div>
              <div className="w-full h-3 rounded-md skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

