import { developer, siteUrl, skillGroups } from '@/lib/profile'
import { getProjects, getBlogPosts } from '@/lib/data'

export const revalidate = 300

export async function GET() {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()])

  return Response.json({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: developer.name,
    fullName: developer.fullName,
    alternateNames: developer.alternateNames,
    jobTitle: developer.role,
    location: developer.location,
    url: siteUrl,
    email: developer.email,
    telephone: developer.phone,
    availability:
      'Open to full-time engineering roles, technical contracting, and remote positions worldwide',
    profiles: {
      github: developer.github,
      linkedin: developer.linkedin,
      twitter: developer.twitter,
    },
    skills: skillGroups.flatMap((group) => group.skills),
    skillCategories: skillGroups,
    projects: projects.map((project) => ({
      title: project.title,
      type: project.type,
      description: project.description,
      problem: project.problem,
      solution: project.solution,
      architecture: project.architecture,
      features: project.features,
      technologies: project.stack,
      url: `${siteUrl}/projects/${project.slug}`,
      demo: project.demo_url || null,
    })),
    articles: posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      date: post.date || post.created_at,
    })),
    aiEndpoints: {
      llmsTxt: `${siteUrl}/llms.txt`,
      llmsFullTxt: `${siteUrl}/llms-full.txt`,
      sitemap: `${siteUrl}/sitemap.xml`,
    },
  })
}
