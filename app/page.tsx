import Link from 'next/link'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import Arrow from '@/components/Arrow'
import ContactBanner from '@/components/ContactBanner'
import { getFeaturedProjects } from '@/lib/data'
import { skillGroups, siteUrl } from '@/lib/profile'
import { pageMetadata, personSchema, serializeJsonLd } from '@/lib/seo'
export const revalidate = 300
export const metadata = pageMetadata(
  'Full-Stack Software Developer',
  'Solomon Elijah builds web applications, mobile apps, and APIs with React, Next.js, Laravel, and React Native. Explore selected projects and get in touch.',
  '/',
)
export default async function Home() {
  const projects = (await getFeaturedProjects()).slice(0, 4)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [
              personSchema,
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: 'Solomon Elijah — Developer Portfolio',
                author: { '@id': `${siteUrl}/#person` },
              },
            ],
          }),
        }}
      />
      <Hero />
      <div className="technology-strip">
        <div className="container">
          <span className="eyebrow">TOOLS OF THE TRADE</span>
          <div>
            {[
              'Next.js',
              'React Native',
              'TypeScript',
              'Laravel',
              'Node.js',
              'MySQL',
              'PostgreSQL',
            ].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
      <section className="container section" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2 id="work-title">
              Real problems. <span className="gradient-text">Thoughtful solutions</span>.
            </h2>
          </div>
          <Link href="/projects" className="text-link">
            All projects <Arrow diagonal />
          </Link>
        </div>
        <p className="section-description">
          A selection of web and mobile products, with a closer look at the
          thinking and technology behind each one.
        </p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        {projects.length === 0 && (
          <p className="empty-state">
            Project details are being updated.{' '}
            <Link href="/contact">
              Ask me about my work <Arrow />
            </Link>
          </p>
        )}
      </section>
      <section className="about-section">
        <div className="container about-preview">
          <div>
            <p className="eyebrow">02 / BEHIND THE WORK</p>
            <h2>
              Curious by nature.
              <br />
              Practical by design.
            </h2>
          </div>
          <div>
            <p className="lead">
              I’m Solomon Elijah, a full-stack software developer based in
              Lagos, Nigeria.
            </p>
            <p>
              I work across web interfaces, mobile applications, and backend
              services. My projects span commerce, payments, travel, and
              logistics — products where the details of the user journey and the
              underlying system both matter.
            </p>
            <Link href="/about" className="text-link">
              Get to know me <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section" aria-labelledby="skills-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / WHAT I BRING</p>
            <h2 id="skills-title">
              Connected thinking, <span className="gradient-text">end to end</span>.
            </h2>
          </div>
          <span className="section-aside">
            An interface is only the beginning.
          </span>
        </div>
        <div className="capability-grid">
          {skillGroups.map((group, index) => (
            <article className="capability-card" key={group.title}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactBanner />
    </>
  )
}
