import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ClientForm from '@/components/admin/ClientForm'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditClientPage({ params }: Props) {
  const supabase = await createAdminClient()
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', (await params).id)
    .single()

  if (!client) {
    notFound()
  }

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
            Edit Client: {client.customer_name}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            ID: {client.id}
          </p>
        </div>
      </div>

      <ClientForm initialData={client} isEditing />
    </div>
  )
}
