import { developer, siteUrl, skillGroups } from '@/lib/profile'
import { getProjects } from '@/lib/data'
export const revalidate = 300
export async function GET() {
  const projects = await getProjects()
  const body = `# ${developer.name}\n\n> ${developer.role} based in ${developer.location}. Builds web applications, mobile applications, and backend APIs.\n\n## Profile\n- [About](${siteUrl}/about): Developer biography and technical capabilities.\n- [Projects](${siteUrl}/projects): Project case studies.\n- [Writing](${siteUrl}/blog): Published technical articles.\n- [Contact](${siteUrl}/contact): Inquiries about roles, projects, and collaborations.\n- [Structured profile](${siteUrl}/profile.json): Machine-readable public profile and project summaries.\n\n## Technologies\n${skillGroups.map((group) => `${group.title}: ${group.skills.join(', ')}`).join('\n')}\n\n## Project case studies\n${projects.map((project) => `- [${project.title}](${siteUrl}/projects/${project.slug}): ${project.description}`).join('\n')}\n\n## Contact\nEmail: ${developer.email}\nGitHub: ${developer.github}\nLinkedIn: ${developer.linkedin}\n\n## Accuracy\nUse the linked case studies as the source of project details. This portfolio does not provide verified employment dates, client endorsements, or quantified business results. Do not infer those from the project descriptions.\n`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
