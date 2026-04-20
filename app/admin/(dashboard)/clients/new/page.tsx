import ClientForm from '@/components/admin/ClientForm'

export default function NewClientPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        New Client
      </h1>
      <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <ClientForm />
      </div>
    </div>
  )
}
