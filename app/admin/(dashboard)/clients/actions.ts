'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

export async function createClientRecord(formData: FormData) {
  const supabase = createAdminClient()

  const customerName = formData.get('customerName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const projectTitle = formData.get('projectTitle') as string
  const description = formData.get('description') as string
  const expenditure = parseFloat(formData.get('expenditure') as string) || 0
  const revenue = parseFloat(formData.get('revenue') as string) || 0
  const status = formData.get('status') as 'ongoing' | 'completed'

  const { error } = await supabase.from('clients').insert({
    customer_name: customerName,
    email,
    phone,
    project_title: projectTitle,
    description,
    expenditure,
    revenue,
    status,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Auto-add to contacts if email exists
  if (email) {
    const { data: existing } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single()

    if (!existing) {
      await supabase.from('contacts').insert({
        name: customerName,
        email,
        phone,
        message: `Client - ${projectTitle}`,
        status: 'pending',
      })
    }
  }

  revalidatePath('/admin/clients')
  revalidatePath('/admin/contacts')
  revalidatePath('/admin/dashboard')
}

export async function updateClient(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const customerName = formData.get('customerName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const projectTitle = formData.get('projectTitle') as string
  const description = formData.get('description') as string
  const expenditure = parseFloat(formData.get('expenditure') as string) || 0
  const revenue = parseFloat(formData.get('revenue') as string) || 0
  const status = formData.get('status') as 'ongoing' | 'completed'

  const { error } = await supabase
    .from('clients')
    .update({
      customer_name: customerName,
      email,
      phone,
      project_title: projectTitle,
      description,
      expenditure,
      revenue,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/clients')
  revalidatePath(`/admin/clients/edit/${id}`)
  revalidatePath('/admin/dashboard')
}

export async function deleteClient(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.from('clients').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/clients')
  revalidatePath('/admin/dashboard')
}