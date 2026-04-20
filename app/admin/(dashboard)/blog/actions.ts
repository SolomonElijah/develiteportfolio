'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'

export async function createBlogPost(formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const thumbnailUrl = formData.get('thumbnailUrl') as string
  const published = formData.get('published') === 'true'

  const slug = generateSlug(title)

  const { error } = await supabase.from('blog_posts').insert({
    title,
    slug,
    content,
    excerpt,
    thumbnail_url: thumbnailUrl,
    published,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const thumbnailUrl = formData.get('thumbnailUrl') as string
  const published = formData.get('published') === 'true'

  const slug = generateSlug(title)

  const { error } = await supabase
    .from('blog_posts')
    .update({
      title,
      slug,
      content,
      excerpt,
      thumbnail_url: thumbnailUrl,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/blog')
  revalidatePath(`/admin/blog/edit/${id}`)
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('thumbnail_url')
    .eq('id', id)
    .single()

  if (post?.thumbnail_url) {
    const fileName = post.thumbnail_url.split('/').pop()
    if (fileName) {
      await supabase.storage.from('blog').remove([fileName])
    }
  }

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('blog_posts')
    .update({ published: !published })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
}