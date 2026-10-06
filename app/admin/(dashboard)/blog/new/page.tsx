import Link from 'next/link'
import BlogForm from '@/components/admin/BlogForm'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/blog"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          title="Back to blog list"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Write New Article
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Craft a technical blog post or architecture writeup.
          </p>
        </div>
      </div>

      <BlogForm />
    </div>
  )
}
