'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { email, text } from '@/lib/validation'
import { recordId } from '@/lib/admin-validation'
function refresh() {
  revalidatePath('/admin/contacts')
  revalidatePath('/admin/dashboard')
}
export async function createContact(form: FormData) {
  const db = await createAdminClient()
  const { error } = await db
    .from('contacts')
    .insert({
      name: text(form.get('name'), 'Name', 100),
      email: email(form.get('email')),
      phone: text(form.get('phone') || '', 'Phone', 40, false),
      message: text(form.get('message') || '', 'Message', 5000, false),
      status: 'pending',
    })
  if (error) throw new Error('Could not create the contact.')
  refresh()
}
export async function importContacts(
  contacts: { name: string; email: string; phone?: string; message?: string }[],
) {
  const db = await createAdminClient()
  if (!Array.isArray(contacts) || contacts.length > 500 || !contacts.length)
    throw new Error('Import between 1 and 500 contacts at a time.')
  const rows = contacts.map((contact) => ({
    name: text(contact.name, 'Name', 100),
    email: email(contact.email),
    phone: text(contact.phone || '', 'Phone', 40, false),
    message: text(contact.message || '', 'Message', 5000, false),
    status: 'pending',
  }))
  const { error } = await db.from('contacts').insert(rows)
  if (error) throw new Error('Could not import contacts.')
  refresh()
}
export async function markAsReplied(id: string) {
  const db = await createAdminClient()
  recordId(id)
  const { error } = await db
    .from('contacts')
    .update({ status: 'replied' })
    .eq('id', id)
  if (error) throw new Error('Could not update the contact.')
  refresh()
}
export async function deleteContact(id: string) {
  const db = await createAdminClient()
  recordId(id)
  const { error } = await db.from('contacts').delete().eq('id', id)
  if (error) throw new Error('Could not delete the contact.')
  refresh()
}
export async function getAllContactEmails(): Promise<string[]> {
  const db = await createAdminClient()
  const { data, error } = await db
    .from('contacts')
    .select('email')
    .order('created_at', { ascending: false })
  if (error) throw new Error('Could not read contacts.')
  return Array.from(
    new Set(
      (data || []).map((contact) => contact.email as string).filter(Boolean),
    ),
  )
}
