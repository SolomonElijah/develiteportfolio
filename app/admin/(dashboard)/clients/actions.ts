'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { clientInput, recordId } from '@/lib/admin-validation'
function refresh() {
  revalidatePath('/admin/clients')
  revalidatePath('/admin/dashboard')
}
export async function createClientRecord(form: FormData) {
  const db = await createAdminClient(),
    input = clientInput(form)
  const { error } = await db.from('clients').insert(input)
  if (error) throw new Error('Could not create the client record.')
  refresh()
}
export async function updateClient(id: string, form: FormData) {
  const db = await createAdminClient()
  recordId(id)
  const { error } = await db
    .from('clients')
    .update({ ...clientInput(form), updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error('Could not update the client.')
  refresh()
  revalidatePath(`/admin/clients/edit/${id}`)
}
export async function deleteClient(id: string) {
  const db = await createAdminClient()
  recordId(id)
  const { error } = await db.from('clients').delete().eq('id', id)
  if (error) throw new Error('Could not delete the client.')
  refresh()
}
