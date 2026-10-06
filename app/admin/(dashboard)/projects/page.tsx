import Link from 'next/link'
import Image from 'next/image'
import {
  PlusIcon,
  PencilIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import DeleteButton from '@/components/admin/DeleteButton'
import { toggleFeatured } from './actions'
import { createAdminClient } from '@/lib/supabase/server'

export default async function ProjectsPage() {
  const supabase = await createAdminClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const typeConfig: Record<
    string,
    { icon: any; color: string; label: string }
  > = {
    Web: {
      icon: GlobeAltIcon,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      label: 'Web App',
    },
    Mobile: {
      icon: DevicePhoneMobileIcon,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      label: 'Mobile',
    },
    API: {
      icon: ServerStackIcon,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      label: 'API / Backend',
    },
  }

  const totalCount = projects?.length || 0
  const featuredCount = projects?.filter((p) => p.featured).length || 0

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Projects
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
              {totalCount} Total
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              {featuredCount} Featured
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your project portfolio, case studies, screenshots, and featured highlights.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-medium uppercase tracking-wider">
                <th className="px-6 py-3.5">Project</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Featured</th>
                <th className="px-6 py-3.5">Live Demo</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {projects && projects.length > 0 ? (
                projects.map((project) => {
                  const typeInfo = typeConfig[project.type] || typeConfig.Web
                  const TypeIcon = typeInfo.icon

                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Project Title + Thumbnail */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          {project.image_url ? (
                            <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                              <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-500 shrink-0">
                              <TypeIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors truncate max-w-xs sm:max-w-md">
                              {project.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-slate-500 font-mono">
                                /{project.slug}
                              </span>
                              {project.stack && project.stack.length > 0 && (
                                <>
                                  <span className="text-slate-700">·</span>
                                  <span className="text-xs text-slate-400 truncate max-w-xs">
                                    {project.stack.slice(0, 3).join(', ')}
                                    {project.stack.length > 3 ? '...' : ''}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${typeInfo.color}`}
                        >
                          <TypeIcon className="w-3.5 h-3.5" />
                          <span>{typeInfo.label}</span>
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <form
                          action={toggleFeatured.bind(
                            null,
                            project.id,
                            project.featured,
                          )}
                        >
                          <button
                            type="submit"
                            title={
                              project.featured
                                ? 'Unfeature project'
                                : 'Feature on homepage'
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                              project.featured
                                ? 'bg-blue-600'
                                : 'bg-slate-800 border border-slate-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                project.featured
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </form>
                      </td>

                      {/* Live Demo Link */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.demo_url ? (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg border border-blue-500/20 transition-colors"
                          >
                            <span>Live demo</span>
                            <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            title="View public page"
                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/projects/edit/${project.id}`}
                            title="Edit project"
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                          <DeleteButton id={project.id} type="project" />
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <p className="text-base font-medium text-slate-300">
                      No projects found
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Get started by adding your first portfolio project.
                    </p>
                    <Link
                      href="/admin/projects/new"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Create Project</span>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
