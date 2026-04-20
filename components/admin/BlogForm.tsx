'use client'

import { useState } from 'react'
import { createBlogPost, updateBlogPost } from '@/app/admin/(dashboard)/blog/actions'
import FileUpload from './FileUpload'
import { toast } from 'sonner'

interface BlogFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function BlogForm({
  initialData,
  isEditing = false,
}: BlogFormProps) {
  const [loading, setLoading] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set('thumbnailUrl', thumbnailUrl)

    try {
      if (isEditing) {
        await updateBlogPost(initialData.id, formData)
      } else {
        await createBlogPost(formData)
      }
      toast.success(isEditing ? 'Post updated' : 'Post created')
      window.location.href = '/admin/blog'
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          defaultValue={initialData?.excerpt}
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content (Markdown)
        </label>
        <textarea
          name="content"
          defaultValue={initialData?.content}
          rows={15}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Thumbnail
        </label>
        <FileUpload
          bucket="blog"
          onUploadComplete={setThumbnailUrl}
          existingUrl={thumbnailUrl}
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            value="true"
            defaultChecked={initialData?.published}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Published
          </span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading
            ? 'Saving...'
            : isEditing
            ? 'Update Post'
            : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}