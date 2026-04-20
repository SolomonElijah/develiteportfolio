import { createAdminClient } from '@/lib/supabase/server'

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
  outcome: string
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
  thumbnail_url?: string
  published?: boolean
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (data || []).map(p => ({
    ...p,
    image: p.image_url || '/images/project1.png',
    stack: p.stack || [],
    features: p.features || [],
  }))
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  return (data || []).map(p => ({
    ...p,
    image: p.image_url || '/images/project1.png',
    stack: p.stack || [],
    features: p.features || [],
  }))
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!data) return null

  return {
    ...data,
    image: data.image_url || '/images/project1.png',
    stack: data.stack || [],
    features: data.features || [],
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (data || []).map(p => ({
    ...p,
    date: new Date(p.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!data) return null

  return {
    ...data,
    date: new Date(data.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
export const developer = {
  name: 'Solomon Elijah',
  role: 'Full‑Stack Software Web and Mobile Developer',
  yearsExperience: 5,
  projectsDelivered: 20,
  apiRequests: 50,
  uptime: 99.99,
  email: 'contact@solomonelijah.com',
  phone: '++2349032236191', // optional
  location: 'Lagos, Nigeria', // optional
  github: 'https://github.com/solomonelijah',
  linkedin: 'https://linkedin.com/in/solomonelijah',
  twitter: 'https://twitter.com/solomonelijah',
  whatsapp: '+2349032236191', // phone number without '+' for WhatsApp link
}