import type { MetadataRoute } from 'next'
import { getProjects, getBlogPosts } from '@/lib/data'
import { siteUrl } from '@/lib/profile'
export const revalidate = 300
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()])
  return [
    ...['', '/projects', '/about', '/blog', '/contact'].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      ...(post.updated_at || post.created_at
        ? { lastModified: post.updated_at || post.created_at }
        : {}),
      priority: 0.6,
    })),
  ]
}
