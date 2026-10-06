'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { projectInput, recordId } from '@/lib/admin-validation'
function refresh() {
  try {
    revalidateTag('projects', 'max')
  } catch {}
  revalidatePath('/admin/projects')
  revalidatePath('/projects', 'layout')
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
  revalidatePath('/llms.txt')
  revalidatePath('/profile.json')
}
export async function createProject(form: FormData) {
  const db = await createAdminClient()
  const input = projectInput(form)
  const { error } = await db.from('projects').insert(input)
  if (error) {
    console.error('Create project error:', error)
    throw new Error(
      error.message?.includes('duplicate key') || error.code === '23505'
        ? 'A project with this title or slug already exists.'
        : `Could not create project: ${error.message}`,
    )
  }
  refresh()
}
export async function updateProject(id: string, form: FormData) {
  const db = await createAdminClient()
  recordId(id)
  const input = projectInput(form)
  const { error } = await db
    .from('projects')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) {
    console.error('Update project error:', error)
    throw new Error(`Could not update project: ${error.message}`)
  }
  refresh()
  revalidatePath(`/admin/projects/edit/${id}`)
}
export async function deleteProject(id: string) {
  const db = await createAdminClient()
  recordId(id)
  const { error } = await db.from('projects').delete().eq('id', id)
  if (error) throw new Error('Could not delete the project.')
  refresh()
}
export async function toggleFeatured(id: string, featured: boolean) {
  const db = await createAdminClient()
  recordId(id)
  if (typeof featured !== 'boolean') throw new Error('Invalid featured state.')
  const { error } = await db
    .from('projects')
    .update({ featured: !featured })
    .eq('id', id)
  if (error) throw new Error('Could not update featured state.')
  refresh()
}
