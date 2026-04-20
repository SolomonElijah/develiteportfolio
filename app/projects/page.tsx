import { getProjects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio of web applications, mobile apps, and APIs built by Solomon Elijah. Production-ready systems serving thousands of users.',
  openGraph: {
    title: 'Projects - Solomon Elijah',
    description: 'Portfolio of production-ready web apps, mobile apps, and APIs.',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}