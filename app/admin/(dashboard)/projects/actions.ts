'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'

export async function createProject(formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string
  const type = formData.get('type') as 'Web' | 'Mobile' | 'API'
  const description = formData.get('description') as string
  const problem = formData.get('problem') as string
  const solution = formData.get('solution') as string
  const architecture = formData.get('architecture') as string
  const imageUrl = formData.get('imageUrl') as string
  const demoUrl = formData.get('demoUrl') as string
  const featured = formData.get('featured') === 'true'

  let features: string[] = []
  let stack: string[] = []
  try {
    features = JSON.parse(formData.get('features') as string)
    stack = JSON.parse(formData.get('stack') as string)
  } catch (error) {
    console.error('Error parsing JSON:', error)
  }

  const slug = generateSlug(title)

  const { error } = await supabase.from('projects').insert({
    title,
    slug,
    type,
    description,
    problem,
    solution,
    architecture,
    features,
    stack,
    image_url: imageUrl,
    demo_url: demoUrl || null,
    featured,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
  revalidatePath('/')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string
  const type = formData.get('type') as 'Web' | 'Mobile' | 'API'
  const description = formData.get('description') as string
  const problem = formData.get('problem') as string
  const solution = formData.get('solution') as string
  const architecture = formData.get('architecture') as string
  const imageUrl = formData.get('imageUrl') as string
  const demoUrl = formData.get('demoUrl') as string
  const featured = formData.get('featured') === 'true'

  let features: string[] = []
  let stack: string[] = []
  try {
    features = JSON.parse(formData.get('features') as string)
    stack = JSON.parse(formData.get('stack') as string)
  } catch (error) {
    console.error('Error parsing JSON:', error)
  }

  const slug = generateSlug(title)

  const { error } = await supabase
    .from('projects')
    .update({
      title,
      slug,
      type,
      description,
      problem,
      solution,
      architecture,
      features,
      stack,
      image_url: imageUrl,
      demo_url: demoUrl || null,
      featured,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath(`/admin/projects/edit/${id}`)
  revalidatePath('/projects')
  revalidatePath('/')
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient()

  const { data: project } = await supabase
    .from('projects')
    .select('image_url')
    .eq('id', id)
    .single()

  if (project?.image_url) {
    const fileName = project.image_url.split('/').pop()
    if (fileName) {
      await supabase.storage.from('projects').remove([fileName])
    }
  }

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
  revalidatePath('/')
}

export async function toggleFeatured(id: string, featured: boolean) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('projects')
    .update({ featured: !featured })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
  revalidatePath('/')
}