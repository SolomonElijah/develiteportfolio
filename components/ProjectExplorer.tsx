'use client'
import { useState } from 'react'
import type { Project } from '@/lib/data'
import ProjectCard from './ProjectCard'
export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All')
  const visible = projects.filter(
    (project) => filter === 'All' || project.type === filter,
  )
  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label="Filter projects by platform"
      >
        {['All', 'Web', 'Mobile', 'API'].map((type) => (
          <button
            key={type}
            className="filter-button"
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
          >
            {type === 'All'
              ? 'All work'
              : type === 'API'
                ? 'APIs'
                : `${type} apps`}
          </button>
        ))}
        <span className="filter-count" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </span>
      </div>
      <div className="project-grid projects-list">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          {projects.length
            ? 'No standalone projects in this category yet. API work is also covered in the web and mobile case studies.'
            : 'Project details are being updated. Get in touch to discuss my work.'}
        </div>
      )}
    </>
  )
}
