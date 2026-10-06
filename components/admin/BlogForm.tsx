'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  createBlogPost,
  updateBlogPost,
} from '@/app/admin/(dashboard)/blog/actions'
import FileUpload from './FileUpload'
import { toast } from 'sonner'
import {
  CheckIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

interface BlogFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function BlogForm({
  initialData,
  isEditing = false,
}: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnail_url || '',
  )
  const [published, setPublished] = useState<boolean>(
    initialData?.published || false,
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('Article title is required.')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.set('title', title.trim())
    formData.set('excerpt', excerpt.trim())
    formData.set('content', content.trim())
    formData.set('thumbnailUrl', thumbnailUrl.trim())
    formData.set('published', published ? 'true' : 'false')

    try {
      if (isEditing) {
        await updateBlogPost(initialData.id, formData)
        toast.success('Article updated successfully.')
      } else {
        await createBlogPost(formData)
        toast.success('Article created successfully.')
      }
      router.push('/admin/blog')
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="border-b border-slate-800/80 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Article Details
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Markdown formatted article content and publication status.
            </p>
          </div>
          {isEditing && (
            <Link
              href={`/blog/${initialData.slug}`}
              target="_blank"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
            >
              <span>View live</span>
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-200">
            Article Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Scaling Next.js SSR with Supabase Cache"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-200">
            Excerpt / Summary
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A compelling 1-2 sentence preview for search results and social cards..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-1.5">
          <FileUpload
            bucket="blog"
            onUploadComplete={setThumbnailUrl}
            existingUrl={thumbnailUrl}
            label="Featured Cover / Thumbnail"
          />
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-200">
              Content (Markdown) <span className="text-rose-400">*</span>
            </label>
            <span className="text-xs text-slate-500">Supports GFM & KaTeX</span>
          </div>
          <textarea
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="# Introduction&#10;&#10;Write your technical post here..."
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Published switch */}
        <div className="pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/80 bg-slate-950/60 cursor-pointer hover:border-slate-600 transition-all max-w-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-900"
            />
            <div>
              <span className="text-sm font-medium text-white">
                Publish immediately
              </span>
              <p className="text-xs text-slate-400">
                Visible to public readers and RSS feed.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>{isEditing ? 'Update Article' : 'Publish Article'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-sm font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
