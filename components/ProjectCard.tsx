import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/data'
import Arrow from './Arrow'
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  const href = `/projects/${project.slug}`
  return (
    <article className="project-card">
      <Link
        href={href}
        className={`project-image-link ${project.type === 'Mobile' ? 'mobile' : ''}`}
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
          sizes="(max-width: 480px) 90vw, (max-width: 760px) 45vw, 30vw"
        />
        <span className="project-open">
          <Arrow diagonal />
        </span>
      </Link>
      <div className="project-meta">
        <span>{project.type} development</span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>
        <Link href={href}>{project.title}</Link>
      </h3>
      <p>{project.description}</p>
      <div className="tags">
        {project.stack.slice(0, 3).map((tech) => (
          <span key={tech}>
            {tech.replace(
              /^(Frontend|Backend|Database|Styling|Design):\s*/i,
              '',
            )}
          </span>
        ))}
      </div>
      <Link href={href} className="text-link">
        Explore case study <Arrow />
      </Link>
    </article>
  )
}
