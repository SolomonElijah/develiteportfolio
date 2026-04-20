import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ClientForm from '@/components/admin/ClientForm'
import { createAdminClient } from '@/lib/supabase/server'

interface Props {
  params: { id: string }
}

export default async function EditClientPage({ params }: Props) {
  const supabase = createAdminClient()
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!client) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Edit Client
      </h1>
      <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <ClientForm initialData={client} isEditing />
      </div>
    </div>
  )
}
