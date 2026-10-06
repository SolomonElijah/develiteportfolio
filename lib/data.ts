import 'server-only'
import { unstable_cache } from 'next/cache'
import { createServiceClient } from './supabase/service'
import { safeImage, safeExternalUrl, stringArray } from './validation'
import snapshot from './projects.snapshot.json'
import blogSnapshot from './blog.snapshot.json'
import { revisePlaceholderArticle } from './article-content'

export { developer } from './profile'
export type ProjectType = 'Web' | 'Mobile' | 'API'

export interface Project {
  id?: string
  slug: string
  title: string
  type: ProjectType
  description: string
  image: string
  image_url?: string
  demo_url?: string
  stack: string[]
  problem: string
  solution: string
  architecture: string
  features: string[]
  outcome?: string
  featured?: boolean
}

export interface BlogPost {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  date?: string
  created_at?: string
  updated_at?: string
  thumbnail_url?: string
  published?: boolean
}

const projectColumns =
  'slug,title,type,description,image_url,demo_url,stack,problem,solution,architecture,features,featured'
const blogColumns =
  'slug,title,excerpt,content,created_at,updated_at,thumbnail_url,published'
const editorialOrder = [
  'nexapoint-nigerian-bills-payment-vtu-platform',
  'car-marketplace-loan-pre-order-platform',
  'package-delivery-tracking-mobile-app',
]

function normalizeProject(row: Record<string, unknown>): Project {
  return {
    slug: String(row.slug),
    title: String(row.title),
    type: ['Web', 'Mobile', 'API'].includes(String(row.type))
      ? (row.type as ProjectType)
      : 'Web',
    description: String(row.description || ''),
    image: safeImage(row.image_url),
    demo_url: safeExternalUrl(row.demo_url),
    stack: stringArray(row.stack),
    problem: String(row.problem || ''),
    solution: String(row.solution || ''),
    architecture: String(row.architecture || ''),
    features: stringArray(row.features),
    featured: row.featured === true,
  }
}

// Fetch and cache projects in Next.js Data Cache for instant responses
const fetchProjectsFromDb = async (): Promise<Project[]> => {
  try {
    const { data, error } = await createServiceClient()
      .from('projects')
      .select(projectColumns)
      .order('created_at', { ascending: false })
    if (error) throw new Error('Project query failed')
    return (data || []).map(normalizeProject)
  } catch {
    console.warn(
      'Project source unavailable; serving the existing public project snapshot.',
    )
    return snapshot.map(normalizeProject)
  }
}

export const getProjects = unstable_cache(
  fetchProjectsFromDb,
  ['public-projects-list'],
  { revalidate: 300, tags: ['projects'] },
)

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const projects = await getProjects()
  const featured = projects.filter((project) => project.featured)
  return (featured.length ? featured : projects).sort(
    (a, b) =>
      (editorialOrder.indexOf(a.slug) < 0
        ? 100
        : editorialOrder.indexOf(a.slug)) -
      (editorialOrder.indexOf(b.slug) < 0
        ? 100
        : editorialOrder.indexOf(b.slug)),
  )
}

export const getProjectBySlug = async (
  slug: string,
): Promise<Project | null> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 200)
    return null
  const projects = await getProjects()
  return projects.find((project) => project.slug === slug) || null
}

function normalizePost(row: BlogPost): BlogPost {
  row = revisePlaceholderArticle(row)
  const created = row.created_at ? new Date(row.created_at) : null
  return {
    ...row,
    thumbnail_url: row.thumbnail_url ? safeImage(row.thumbnail_url) : undefined,
    date:
      created && !Number.isNaN(created.getTime())
        ? created.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })
        : undefined,
  }
}

const fetchBlogPostsFromDb = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await createServiceClient()
      .from('blog_posts')
      .select(blogColumns)
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error) throw new Error('Article query failed')
    const list = data && data.length > 0 ? data : (blogSnapshot as BlogPost[])
    return list.map(normalizePost)
  } catch {
    console.warn(
      'Published article database source unavailable; serving blog snapshot.',
    )
    return (blogSnapshot as BlogPost[]).map(normalizePost)
  }
}

export const getBlogPosts = unstable_cache(
  fetchBlogPostsFromDb,
  ['public-blog-posts-list'],
  { revalidate: 300, tags: ['blog_posts'] },
)

export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 200)
    return null
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}
