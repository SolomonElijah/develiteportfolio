import Link from 'next/link'
import ClientForm from '@/components/admin/ClientForm'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/clients"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          title="Back to clients"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Add New Client
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Log a new client agreement, contract value, and milestones.
          </p>
        </div>
      </div>

      <ClientForm />
    </div>
  )
}
