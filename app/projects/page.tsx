import { getProjects } from '@/lib/data'
import ProjectExplorer from '@/components/ProjectExplorer'
import ContactBanner from '@/components/ContactBanner'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 300
export const metadata = pageMetadata(
  'Projects',
  'Explore web and mobile software projects by Solomon Elijah, including commerce, bill payments, logistics, and travel platforms. Read implementation details and technology choices.',
  '/projects',
)
export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <>
      <div className="container page-body">
        <header className="page-header">
          <p className="eyebrow">THE PORTFOLIO / SELECTED PROJECTS</p>
          <h1>
            Built with purpose<span className="accent">.</span>
          </h1>
          <p>
            Web experiences, mobile applications, and the systems behind them.
            Explore the problem, approach, and technology in each project.
          </p>
        </header>
        <ProjectExplorer projects={projects} />
      </div>
      <ContactBanner />
    </>
  )
}
