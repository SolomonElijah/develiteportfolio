import Image from 'next/image'
import Link from 'next/link'
import { developer, skillGroups, siteUrl } from '@/lib/profile'
import { pageMetadata, personSchema, serializeJsonLd } from '@/lib/seo'
import Arrow from '@/components/Arrow'
import ContactBanner from '@/components/ContactBanner'
export const metadata = pageMetadata(
  'About',
  'Meet Solomon Elijah, a full-stack software developer in Lagos, Nigeria. Explore his approach to web applications, backend APIs, and React Native mobile development.',
  '/about',
)
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            url: `${siteUrl}/about`,
            mainEntity: personSchema,
          }),
        }}
      />
      <section className="container about-page">
        <div>
          <header className="page-header">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h1>
              A developer.
              <br />A problem solver.
              <br />
              <span className="accent">Always a learner.</span>
            </h1>
          </header>
          <div className="about-copy">
            <p>
              I’m Solomon Elijah, a full-stack software developer based in
              Lagos, Nigeria. I build web and mobile applications, connecting
              the interfaces people use with the services and data behind them.
            </p>
            <p>
              My portfolio includes vehicle marketplaces, shopping experiences,
              utility payment platforms, delivery tracking, and travel booking.
              Across these projects, I focus on making complex workflows easier
              to understand and use.
            </p>
            <p>
              I work with React and Next.js for the web, React Native for
              mobile, and Laravel and Node.js for backend development. I’m
              interested in roles and projects where I can contribute across the
              product and keep learning from the people around me.
            </p>
          </div>
          <dl className="profile-facts">
            <div>
              <dt>Based in</dt>
              <dd>{developer.location}</dd>
            </div>
            <div>
              <dt>Specialization</dt>
              <dd>Web, mobile & APIs</dd>
            </div>
            <div>
              <dt>Core frontend</dt>
              <dd>React · Next.js · React Native · TypeScript</dd>
            </div>
            <div>
              <dt>Core backend</dt>
              <dd>Laravel · Node.js · MySQL · PostgreSQL</dd>
            </div>
          </dl>
          <div className="profile-links">
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub <Arrow diagonal />
            </a>
            <a
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              LinkedIn <Arrow diagonal />
            </a>
            <Link href="/contact" className="text-link">
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
        <div className="about-page-image">
          <Image
            src="/images/me.png"
            alt="Solomon Elijah in a development workspace"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 45vw"
          />
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MY TOOLKIT</p>
            <h2>From interface to infrastructure.</h2>
          </div>
        </div>
        <div className="capability-grid">
          {skillGroups.map((group, index) => (
            <article key={group.title} className="capability-card">
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
      <section className="about-section">
        <div className="container section">
          <p className="eyebrow">HOW I APPROACH THE WORK</p>
          <div className="approach-grid">
            {[
              {
                title: 'Understand the need',
                text: 'Start with the people using the product, the workflow they need, and the constraints that matter.',
              },
              {
                title: 'Make the system clear',
                text: 'Choose a practical architecture, explicit data flows, and components that are straightforward to maintain.',
              },
              {
                title: 'Care about the details',
                text: 'Review the mobile experience, loading and error states, accessibility, and the handoff between frontend and backend.',
              },
            ].map((item, index) => (
              <article key={item.title}>
                <span className="capability-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="section">
        <ContactBanner />
      </div>
    </>
  )
}
