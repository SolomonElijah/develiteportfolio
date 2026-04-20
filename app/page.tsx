import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import AboutPreview from '@/components/AboutPreview'
import TechStack from '@/components/TechStack'
import CTA from '@/components/CTA'
import { getFeaturedProjects } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
 const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Solomon Elijah',
    jobTitle: 'Full-Stack Software Developer',
    url: 'https://solomonelijah.dev',
    sameAs: [
      'https://github.com/solomonelijah',
      'https://linkedin.com/in/solomonelijah',
      'https://twitter.com/solomonelijah',
    ],
    knowsAbout: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'React Native Expo', 'Laravel',
      'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'MySQL', 'Redis',
      'Web Development', 'Mobile Development', 'API Design', 'System Architecture',
    ],
  }
  return (
    <>

     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Featured Work Highlights – replaces duplicate stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Recent Highlights
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse of the systems I've built – from payment gateways to analytics dashboards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block bg-white dark:bg-navy-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-md">
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
          >
            View all projects
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <AboutPreview />
      <TechStack />
      <Projects />
      <CTA />
    </>
  )
}