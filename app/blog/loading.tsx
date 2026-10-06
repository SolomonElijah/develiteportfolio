export default function BlogLoading() {
  return (
    <div className="container page-body" aria-busy="true" aria-label="Loading articles">
      <header className="page-header">
        <p className="eyebrow">NOTES FROM THE WORKBENCH</p>
        <h1>
          Ideas worth sharing<span className="accent">.</span>
        </h1>
        <p>
          Notes on building software, understanding systems, and the decisions
          that shape a product.
        </p>
      </header>

      <div className="article-list mt-8">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="article-row border-b border-slate-200/80 dark:border-white/10 py-7 flex flex-col md:flex-row gap-4 md:items-start"
          >
            {/* Date column */}
            <div className="w-32 shrink-0 space-y-1.5">
              <div className="w-24 h-4 rounded-md skeleton-shimmer" />
              <div className="w-16 h-3 rounded-md skeleton-shimmer" />
            </div>

            {/* Main content */}
            <div className="flex-1 space-y-3">
              <div className="w-3/5 h-6 rounded-md skeleton-shimmer" />
              <div className="w-full h-4 rounded-md skeleton-shimmer" />
              <div className="w-4/5 h-4 rounded-md skeleton-shimmer" />
            </div>

            {/* Trailing arrow */}
            <div className="hidden md:block w-6 h-6 rounded-full skeleton-shimmer shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

