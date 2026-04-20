'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/lib/data'
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (project.demo_url) {
      window.open(project.demo_url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className="bg-white dark:bg-navy-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {project.title}
            </h3>
            <span className="shrink-0 text-xs font-medium px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800">
              {project.type}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800/60 text-slate-600 dark:text-gray-400 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800/60 text-slate-500 dark:text-gray-500 rounded-full">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.demo_url && (
                <div className="relative group/tooltip">
                  <button
                    onClick={handleDemoClick}
                    className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors px-2 py-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    aria-label="Live Demo"
                  >
                    Demo
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    View live project
                  </span>
                </div>
              )}

              <span className="hidden sm:flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                Details
                <ArrowRightIcon className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}