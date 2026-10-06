import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/data'
import { siteUrl } from '@/lib/profile'
import { pageMetadata, serializeJsonLd } from '@/lib/seo'
import Arrow from '@/components/Arrow'
import ContactBanner from '@/components/ContactBanner'
import { parseArchitecture } from '@/lib/utils'
export const revalidate = 300
interface Props {
  params: Promise<{ slug: string }>
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params,
    project = await getProjectBySlug(slug)
  return project
    ? pageMetadata(
        project.title,
        project.description,
        `/projects/${project.slug}`,
        project.image,
      )
    : { title: 'Project not found', robots: { index: false } }
}
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params,
    project = await getProjectBySlug(slug)
  if (!project) notFound()
  const path = `/projects/${project.slug}`
  return (
    <>
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/projects">Work</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'CreativeWork',
                  name: project.title,
                  description: project.description,
                  url: `${siteUrl}${path}`,
                  image: new URL(project.image, siteUrl).href,
                  creator: {
                    '@id': `${siteUrl}/#person`,
                    '@type': 'Person',
                    name: 'Solomon Elijah',
                  },
                  keywords: project.stack.join(', '),
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: siteUrl,
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Projects',
                      item: `${siteUrl}/projects`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: project.title,
                      item: `${siteUrl}${path}`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
        <article>
          <header className="detail-header">
            <p className="eyebrow accent">
              {project.type.toUpperCase()} DEVELOPMENT / CASE STUDY
            </p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </header>
          <div className="detail-image">
            <Image
              src={project.image}
              alt={`${project.title} application interface`}
              fill
              priority
              sizes="(max-width: 760px) 90vw, 85vw"
            />
          </div>
          <div className="detail-layout">
            <div>
              {[
                // {
                //   title: 'The problem',
                //   text: project.problem,
                //   isArchitecture: false,
                // },
                // {
                //   title: 'The approach',
                //   text: project.solution,
                //   isArchitecture: false,
                // },
                {
                  title: 'Architecture & implementation',
                  text: project.architecture,
                  isArchitecture: true,
                },
              ]
                .filter((section) => section.text)
                .map((section) => {
                  const archItems = section.isArchitecture
                    ? parseArchitecture(section.text)
                    : []
                  const hasStructuredArch =
                    section.isArchitecture &&
                    archItems.length > 0 &&
                    archItems.some((i) => i.layer)

                  return (
                    <section className="detail-section" key={section.title}>
                      <h2>{section.title}</h2>
                      {hasStructuredArch ? (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            marginTop: 14,
                          }}
                        >
                          {archItems.map((item, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'baseline',
                                gap: '8px 14px',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                background: 'var(--soft)',
                                border: '1px solid var(--line)',
                              }}
                            >
                              {item.layer && (
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    fontFamily: 'monospace',
                                    color: 'var(--accent)',
                                    letterSpacing: '0.03em',
                                    minWidth: 100,
                                  }}
                                >
                                  {item.layer}:
                                </span>
                              )}
                              <span
                                style={{
                                  fontSize: 14,
                                  color: 'var(--muted)',
                                  flex: 1,
                                  minWidth: 200,
                                  lineHeight: 1.6,
                                }}
                              >
                                {item.detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ whiteSpace: 'pre-line' }}>{section.text}</p>
                      )}
                    </section>
                  )
                })}
              {project.features.length > 0 && (
                <section className="detail-section">
                  <h2>Key features</h2>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}
              {project.outcome && (
                <section className="detail-section">
                  <h2>Outcome</h2>
                  <p>{project.outcome}</p>
                </section>
              )}
            </div>
            <aside className="detail-sidebar">
              <h2>Project at a glance</h2>
              <p>{project.type} application</p>
              <div className="tags">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              {project.demo_url ? (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  Visit project <Arrow diagonal />
                </a>
              ) : (
                <p>
                  A public demo is not linked for this project. Get in touch to
                  discuss its implementation.
                </p>
              )}
              <Link href="/contact" className="button button-outline">
                Discuss this project <Arrow />
              </Link>
              <p>
                Interested in the technical decisions? I’m happy to talk through
                the implementation.
              </p>
            </aside>
          </div>
        </article>
      </div>
      <ContactBanner />
    </>
  )
}
