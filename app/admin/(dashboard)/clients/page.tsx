import Link from 'next/link'
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline'
import DeleteButton from '@/components/admin/DeleteButton'
import { createAdminClient } from '@/lib/supabase/server'

export default async function ClientsPage() {
  const supabase = await createAdminClient()
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error('Could not load clients. Please try again.')

  const totalRevenue =
    clients?.reduce((sum, c) => sum + (c.revenue || 0), 0) || 0
  const totalExpenditure =
    clients?.reduce((sum, c) => sum + (c.expenditure || 0), 0) || 0
  const totalProfit = totalRevenue - totalExpenditure

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Clients & Finances
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
              {clients?.length || 0} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track customer contracts, revenues, development expenditures, and
            project status.
          </p>
        </div>

        <Link
          href="/admin/clients/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          <span>New Client</span>
        </Link>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Total Expenditure
          </p>
          <p className="text-2xl font-bold text-rose-400 mt-1">
            ${totalExpenditure.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Net Profit
          </p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            ${totalProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-medium uppercase tracking-wider">
                <th className="px-6 py-3.5">Customer & Project</th>
                <th className="px-6 py-3.5">Revenue</th>
                <th className="px-6 py-3.5">Cost</th>
                <th className="px-6 py-3.5">Profit</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {clients && clients.length > 0 ? (
                clients.map((client) => {
                  const profit =
                    (client.revenue || 0) - (client.expenditure || 0)

                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                            {client.customer_name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {client.project_title}
                          </p>
                          {client.email && (
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                              {client.email}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-emerald-400 font-medium">
                        ${(client.revenue || 0).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-rose-400 font-medium">
                        ${(client.expenditure || 0).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-cyan-400 font-medium">
                        ${profit.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${
                            client.status === 'completed'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/clients/edit/${client.id}`}
                            title="Edit client"
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                          <DeleteButton id={client.id} type="client" />
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="text-base font-medium text-slate-300">
                      No client records found
                    </p>
                    <Link
                      href="/admin/clients/new"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add First Client</span>
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
