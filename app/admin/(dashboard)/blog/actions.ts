'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { blogInput, recordId } from '@/lib/admin-validation'
function refresh() {
  try {
    revalidateTag('blog_posts', 'max')
  } catch {}
  revalidatePath('/admin/blog')
  revalidatePath('/blog', 'layout')
  revalidatePath('/sitemap.xml')
  revalidatePath('/llms.txt')
}
export async function createBlogPost(form: FormData) {
  const db = await createAdminClient()
  const { error } = await db.from('blog_posts').insert(blogInput(form))
  if (error)
    throw new Error(
      'Could not create the article. Check that its title is unique.',
    )
  refresh()
}
export async function updateBlogPost(id: string, form: FormData) {
  const db = await createAdminClient()
  recordId(id)
  const { slug: _slug, ...input } = blogInput(form)
  const { error } = await db
    .from('blog_posts')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error('Could not update the article.')
  refresh()
  revalidatePath(`/admin/blog/edit/${id}`)
}
export async function deleteBlogPost(id: string) {
  const db = await createAdminClient()
  recordId(id)
  const { error } = await db.from('blog_posts').delete().eq('id', id)
  if (error) throw new Error('Could not delete the article.')
  refresh()
}
export async function togglePublished(id: string, published: boolean) {
  const db = await createAdminClient()
  recordId(id)
  if (typeof published !== 'boolean')
    throw new Error('Invalid publication state.')
  const { error } = await db
    .from('blog_posts')
    .update({ published: !published })
    .eq('id', id)
  if (error) throw new Error('Could not update publication state.')
  refresh()
}
