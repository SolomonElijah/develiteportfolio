export default function ProjectsLoading() {
  return (
    <div className="container page-body" aria-busy="true" aria-label="Loading projects">
      <header className="page-header">
        <p className="eyebrow">THE PORTFOLIO / SELECTED PROJECTS</p>
        <h1>
          Built with purpose<span className="accent">.</span>
        </h1>
        <p>
          Web experiences, mobile applications, and the systems behind them.
          Explore the problem, approach, and technology in each project.
        </p>
      </header>

      {/* Filter bar placeholder */}
      <div className="filter-bar opacity-75">
        <div className="flex gap-2">
          {['All work', 'Web apps', 'Mobile apps', 'APIs'].map((tab, i) => (
            <div
              key={tab}
              className={`h-9 px-4 rounded-full skeleton-shimmer border border-slate-200 dark:border-white/10 ${
                i === 0 ? 'w-24 bg-blue-500/10 dark:bg-sky-500/10' : 'w-28'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid of skeleton project cards */}
      <div className="project-grid projects-list mt-8">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="project-card border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm"
          >
            {/* Image banner */}
            <div className="w-full aspect-[16/10] rounded-xl skeleton-shimmer mb-5" />

            {/* Meta row */}
            <div className="flex justify-between items-center mb-3">
              <div className="w-28 h-3.5 rounded-md skeleton-shimmer" />
              <div className="w-6 h-3.5 rounded-md skeleton-shimmer" />
            </div>

            {/* Title */}
            <div className="w-3/4 h-6 rounded-md skeleton-shimmer mb-3" />

            {/* Description lines */}
            <div className="space-y-2 mb-5">
              <div className="w-full h-3.5 rounded-md skeleton-shimmer" />
              <div className="w-5/6 h-3.5 rounded-md skeleton-shimmer" />
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-5">
              <div className="w-16 h-5 rounded-full skeleton-shimmer" />
              <div className="w-20 h-5 rounded-full skeleton-shimmer" />
              <div className="w-14 h-5 rounded-full skeleton-shimmer" />
            </div>

            {/* Bottom link */}
            <div className="w-32 h-4 rounded-md skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}

