import Link from 'next/link'
import Image from 'next/image'
import {
  PlusIcon,
  PencilIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import DeleteButton from '@/components/admin/DeleteButton'
import { togglePublished } from './actions'
import { createAdminClient } from '@/lib/supabase/server'

export default async function BlogPage() {
  const supabase = await createAdminClient()
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error('Could not load articles. Please try again.')

  const totalCount = posts?.length || 0
  const publishedCount = posts?.filter((p) => p.published).length || 0

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Blog Articles
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
              {totalCount} Total
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              {publishedCount} Published
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Write, publish, and manage engineering articles and technical
            insights.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Blog Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-medium uppercase tracking-wider">
                <th className="px-6 py-3.5">Article</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        {post.thumbnail_url ? (
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                            <Image
                              src={post.thumbnail_url}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="56px"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-500 shrink-0">
                            <DocumentTextIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors truncate max-w-xs sm:max-w-md">
                            {post.title}
                          </p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            /{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <form
                        action={togglePublished.bind(
                          null,
                          post.id,
                          post.published,
                        )}
                      >
                        <button
                          type="submit"
                          title={post.published ? 'Unpublish' : 'Publish'}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                            post.published
                              ? 'bg-emerald-600'
                              : 'bg-slate-800 border border-slate-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                              post.published ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </form>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs font-mono">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="View live article"
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          title="Edit article"
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={post.id} type="blog" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    <p className="text-base font-medium text-slate-300">
                      No blog posts yet
                    </p>
                    <Link
                      href="/admin/blog/new"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Write First Post</span>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
