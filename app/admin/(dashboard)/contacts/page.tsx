import { createAdminClient } from '@/lib/supabase/server'
import ReplyButton from '@/components/admin/ReplyButton'
import DeleteButton from '@/components/admin/DeleteButton'
import AddContactButton from '@/components/admin/AddContactButton'
import ImportContactsButton from '@/components/admin/ImportContactsButton'
import SendEmailButton from '@/components/admin/SendEmailButton'
import BulkEmailButton from '@/components/admin/BulkEmailButton'

export default async function ContactsPage() {
  const supabase = createAdminClient()
  const { data: contacts } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  const totalContacts = contacts?.length || 0
  const pendingCount = contacts?.filter(c => c.status === 'pending').length || 0
  const repliedCount = contacts?.filter(c => c.status === 'replied').length || 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Contacts
        </h1>
        <div className="flex items-center gap-3">
          <BulkEmailButton contacts={contacts || []} />
          <SendEmailButton />
          <ImportContactsButton />
          <AddContactButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Contacts</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalContacts}</p>
        </div>
        <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
        </div>
        <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Replied</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{repliedCount}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-navy-card rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts?.map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {contact.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {contact.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {contact.phone || '—'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs block">
                    {contact.message || '—'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      contact.status === 'replied'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <ReplyButton contact={contact} />
                    <DeleteButton id={contact.id} type="contact" />
                  </div>
                </td>
              </tr>
            ))}
            {(!contacts || contacts.length === 0) && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No contacts yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}