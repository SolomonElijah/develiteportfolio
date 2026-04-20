import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogPosts, developer } from '@/lib/data'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical blog by Solomon Elijah covering scalable systems, API design, TypeScript patterns, PostgreSQL optimization, and modern web & mobile application development.',
  openGraph: {
    title: 'Blog - Solomon Elijah',
    description: 'Insights on building scalable systems, API design, and modern web & mobile application development.',
  },
}

// Helper to calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Helper to format date
function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Date unavailable'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  // Featured post (first post) and rest
  const [featuredPost, ...regularPosts] = blogPosts

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl">
          Deep dives into system architecture, API design, and lessons from building production‑grade software.
        </p>
      </header>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <div className="bg-gray-50 dark:bg-navy-card rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Featured Image */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-gray-200 dark:bg-gray-800">
                {featuredPost.thumbnail_url ? (
                  <Image
                    src={featuredPost.thumbnail_url}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm">No image</span>
                  </div>
                )}
              </div>

              {/* Featured Content */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-gray-400 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {getReadingTime(featuredPost.content)} min read
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-3">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-slate-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 font-medium hover:gap-3 transition-all"
                >
                  Read featured article
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white dark:bg-navy-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                {post.thumbnail_url ? (
                  <Image
                    src={post.thumbnail_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm">No image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-gray-400 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {getReadingTime(post.content)} min
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-500 hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-gray-400">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA (optional) */}
      <section className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-navy-card dark:to-navy rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Stay in the loop
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-6">
            Get notified when I publish new articles on system design and full‑stack development.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}