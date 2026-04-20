'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

export async function createContact(formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  const { error } = await supabase.from('contacts').insert({
    name,
    email,
    phone,
    message: message || '',
    status: 'pending',
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
}

export async function importContacts(contacts: { name: string; email: string; phone?: string; message?: string }[]) {
  const supabase = createAdminClient()

  const rows = contacts.map(c => ({
    name: c.name,
    email: c.email,
    phone: c.phone || '',
    message: c.message || '',
    status: 'pending',
  }))

  const { error } = await supabase.from('contacts').insert(rows)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
}

export async function markAsReplied(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('contacts')
    .update({ status: 'replied' })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
}

export async function deleteContact(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.from('contacts').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
}

export async function getAllContactEmails() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('contacts')
    .select('email')
    .order('created_at', { ascending: false })

  return Array.from(new Set((data || []).map(c => c.email).filter(Boolean)))
}