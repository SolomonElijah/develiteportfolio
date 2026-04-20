import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import {
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

export default async function DashboardPage() {
 
const supabase = createAdminClient()
  const [
    { count: totalProjects },
    { count: featuredProjects },
    { count: totalBlogPosts },
    { count: totalContacts },
    { data: clients },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('featured', true),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('contacts').select('*', { count: 'exact', head: true }),
    supabase.from('clients').select('revenue, expenditure, profit'),
  ])

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
    },
    {
      title: 'Featured Projects',
      value: featuredProjects || 0,
      icon: FolderIcon,
      color: 'purple' as const,
    },
    {
      title: 'Blog Posts',
      value: totalBlogPosts || 0,
      icon: DocumentTextIcon,
      color: 'green' as const,
    },
    {
      title: 'Contacts',
      value: totalContacts || 0,
      icon: EnvelopeIcon,
      color: 'orange' as const,
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'emerald' as const,
    },
    {
      title: 'Total Expenditure',
      value: `$${totalExpenditure.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'red' as const,
    },
    {
      title: 'Total Profit',
      value: `$${totalProfit.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'teal' as const,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  )
}
