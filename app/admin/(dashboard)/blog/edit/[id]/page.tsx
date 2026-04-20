import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BlogForm from '@/components/admin/BlogForm'
import { createAdminClient } from '@/lib/supabase/server'

interface Props {
  params: { id: string }
}

export default async function EditBlogPostPage({ params }: Props) {
  const supabase = await createAdminClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Edit Blog Post
      </h1>
      <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <BlogForm initialData={post} isEditing />
      </div>
    </div>
  )
}
