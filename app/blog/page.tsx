import Link from 'next/link'
import { getBlogPosts } from '@/lib/data'
import { pageMetadata } from '@/lib/seo'
import Arrow from '@/components/Arrow'
import ContactBanner from '@/components/ContactBanner'
export const revalidate = 300
export const metadata = pageMetadata(
  'Writing',
  'Technical articles and notes by Solomon Elijah on web development, backend systems, and building software.',
  '/blog',
)
export default async function BlogPage() {
  const posts = await getBlogPosts()
  return (
    <>
      <div className="container page-body">
        <header className="page-header">
          <p className="eyebrow">NOTES FROM THE WORKBENCH</p>
          <h1>
            Ideas worth sharing<span className="accent">.</span>
          </h1>
          <p>
            Notes on building software, understanding systems, and the decisions
            that shape a product.
          </p>
        </header>
        {posts.length ? (
          <div className="article-list">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="article-row">
                  <div className="article-date">
                    {post.created_at && post.date ? (
                      <time dateTime={post.created_at}>{post.date}</time>
                    ) : (
                      'Development notes'
                    )}
                    <br />
                    {Math.max(
                      1,
                      Math.ceil(post.content.trim().split(/\s+/).length / 200),
                    )}{' '}
                    min read
                  </div>
                  <div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                  </div>
                  <Arrow diagonal />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>More notes soon.</h2>
            <p>
              In the meantime, my project case studies cover the thinking and
              implementation behind the work.
            </p>
            <Link href="/projects" className="text-link">
              Explore the projects <Arrow />
            </Link>
          </div>
        )}
      </div>
      <ContactBanner />
    </>
  )
}
