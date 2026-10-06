import Link from 'next/link'
import { getBlogPostBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { developer, siteUrl } from '@/lib/profile'
import { pageMetadata, serializeJsonLd } from '@/lib/seo'
export const revalidate = 300
interface Props {
  params: Promise<{ slug: string }>
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params,
    post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Article not found', robots: { index: false } }
  const metadata = pageMetadata(post.title, post.excerpt, `/blog/${post.slug}`)
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article' as const,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [developer.name],
    },
  }
}
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params,
    post = await getBlogPostBySlug(slug)
  if (!post) notFound()
  return (
    <div className="container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog">Writing</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{post.title}</span>
      </nav>
      <article className="article-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              url: `${siteUrl}/blog/${post.slug}`,
              datePublished: post.created_at,
              dateModified: post.updated_at || post.created_at,
              author: {
                '@type': 'Person',
                name: developer.name,
                url: `${siteUrl}/about`,
              },
              image: `${siteUrl}/opengraph-image`,
              mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
            }),
          }}
        />
        <header className="detail-header">
          <p className="eyebrow accent">DEVELOPMENT NOTES</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="reading-meta">
            <span>By {developer.name}</span>
            {post.created_at && post.date && (
              <time dateTime={post.created_at}>{post.date}</time>
            )}
            <span>
              {Math.max(
                1,
                Math.ceil(post.content.trim().split(/\s+/).length / 200),
              )}{' '}
              min read
            </span>
          </div>
        </header>
        <div className="article-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
