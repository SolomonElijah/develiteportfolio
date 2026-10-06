import Link from 'next/link'
import Image from 'next/image'
import { createAdminClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import {
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  PlusIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'

export default async function DashboardPage() {
  const supabase = await createAdminClient()

  const [
    { data: allProjects },
    { count: totalBlogPosts },
    { data: recentContacts, count: totalContacts },
    { data: clients },
  ] = await Promise.all([
    supabase
      .from('projects')
      .select('id, title, slug, type, image_url, featured, created_at')
      .order('created_at', { ascending: false }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase
      .from('contacts')
      .select('id, name, email, message, status, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(4),
    supabase.from('clients').select('revenue, expenditure'),
  ])

  const totalProjects = allProjects?.length || 0
  const featuredProjects = allProjects?.filter((p) => p.featured).length || 0
  const recentProjects = allProjects?.slice(0, 4) || []

  const totalRevenue =
    clients?.reduce((sum, c) => sum + (c.revenue || 0), 0) || 0
  const totalExpenditure =
    clients?.reduce((sum, c) => sum + (c.expenditure || 0), 0) || 0
  const totalProfit = totalRevenue - totalExpenditure

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects || 0,
      icon: FolderIcon,
      color: 'blue' as const,
      subtitle: `${featuredProjects || 0} featured on homepage`,
    },
    {
      title: 'Blog Articles',
      value: totalBlogPosts || 0,
      icon: DocumentTextIcon,
      color: 'purple' as const,
      subtitle: 'Published tech thoughts',
    },
    {
      title: 'Client Inquiries',
      value: totalContacts || 0,
      icon: EnvelopeIcon,
      color: 'orange' as const,
      subtitle: 'Incoming messages',
    },
    {
      title: 'Net Profit',
      value: `$${totalProfit.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'emerald' as const,
      subtitle: `$${totalRevenue.toLocaleString()} revenue`,
    },
  ]

  const typeIcons: Record<string, any> = {
    Web: GlobeAltIcon,
    Mobile: DevicePhoneMobileIcon,
    API: ServerStackIcon,
  }

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Actions Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Portfolio Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, Admin
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Manage your showcase projects, technical articles, client inquiries, and revenue tracking in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Project</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-medium transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Write Post</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Two Column Layout: Recent Projects & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Projects
              </h2>
              <p className="text-xs text-slate-400">
                Latest additions to your portfolio
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects && recentProjects.length > 0 ? (
              recentProjects.map((project) => {
                const Icon = typeIcons[project.type] || GlobeAltIcon
                return (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {project.image_url ? (
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {project.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500">
                            {project.type}
                          </span>
                          {project.featured && (
                            <>
                              <span className="text-slate-700">·</span>
                              <span className="text-[10px] text-blue-400 font-medium">
                                Featured
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors shrink-0"
                    >
                      Edit
                    </Link>
                  </div>
                )
              })
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                No projects uploaded yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Inquiries
              </h2>
              <p className="text-xs text-slate-400">
                Latest messages from contact forms
              </p>
            </div>
            <Link
              href="/admin/contacts"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentContacts && recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-200">
                      {contact.name}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                        contact.status === 'replied'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {contact.status || 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {contact.message}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span>{contact.email}</span>
                    <span>
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                No messages received yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
