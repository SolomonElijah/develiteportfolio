import { getFeaturedProjects } from '@/lib/data'
import ProjectCard from './ProjectCard'

export default async function Projects() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Featured Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}