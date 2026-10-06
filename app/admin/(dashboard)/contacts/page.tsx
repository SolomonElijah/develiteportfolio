import { createAdminClient } from '@/lib/supabase/server'
import ReplyButton from '@/components/admin/ReplyButton'
import DeleteButton from '@/components/admin/DeleteButton'
import AddContactButton from '@/components/admin/AddContactButton'
import ImportContactsButton from '@/components/admin/ImportContactsButton'
import SendEmailButton from '@/components/admin/SendEmailButton'
import BulkEmailButton from '@/components/admin/BulkEmailButton'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export default async function ContactsPage() {
  const supabase = await createAdminClient()
  const { data: contacts } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  const totalContacts = contacts?.length || 0
  const pendingCount =
    contacts?.filter((c) => c.status === 'pending').length || 0
  const repliedCount =
    contacts?.filter((c) => c.status === 'replied').length || 0

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Inquiries & Messages
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
              {totalContacts} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review contact form submissions, manage status, and send replies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <BulkEmailButton contacts={contacts || []} />
          <SendEmailButton />
          <ImportContactsButton />
          <AddContactButton />
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Total Messages
          </p>
          <p className="text-2xl font-bold text-white mt-1">{totalContacts}</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Pending Attention
          </p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {pendingCount}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Replied / Handled
          </p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {repliedCount}
          </p>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-medium uppercase tracking-wider">
                <th className="px-6 py-3.5">Sender</th>
                <th className="px-6 py-3.5">Email / Phone</th>
                <th className="px-6 py-3.5">Message</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Received</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {contact.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-slate-300 font-mono text-xs">
                        {contact.email}
                      </p>
                      {contact.phone && (
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {contact.phone}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400 line-clamp-2 max-w-sm block leading-relaxed">
                        {contact.message || '—'}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-semibold rounded-full ${
                          contact.status === 'replied'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {contact.status || 'pending'}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs font-mono">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <ReplyButton contact={contact} />
                        <DeleteButton id={contact.id} type="contact" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="text-base font-medium text-slate-300">
                      No inquiries received yet
                    </p>
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
