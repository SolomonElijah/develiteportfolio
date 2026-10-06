import { developer, siteUrl, skillGroups } from '@/lib/profile'
import { getProjects } from '@/lib/data'
export const revalidate = 300
export async function GET() {
  return Response.json({
    name: developer.name,
    role: developer.role,
    location: developer.location,
    url: siteUrl,
    email: developer.email,
    profiles: { github: developer.github, linkedin: developer.linkedin },
    skills: skillGroups.flatMap((group) => group.skills),
    projects: (await getProjects()).map((project) => ({
      title: project.title,
      type: project.type,
      description: project.description,
      technologies: project.stack,
      url: `${siteUrl}/projects/${project.slug}`,
      demo: project.demo_url || null,
    })),
  })
}
