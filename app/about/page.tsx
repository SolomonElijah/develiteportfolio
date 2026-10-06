import Image from 'next/image'
import Link from 'next/link'
import { developer, skillGroups, siteUrl } from '@/lib/profile'
import { pageMetadata, personSchema, serializeJsonLd } from '@/lib/seo'
import Arrow from '@/components/Arrow'
import ContactBanner from '@/components/ContactBanner'
const faqs = [
  {
    question: 'Who is Solomon Elijah (Sunday) and what does he specialize in?',
    answer:
      'Solomon Elijah Sunday (also known professionally as Solomon Elijah or Solomon Sunday Elijah) is a full-stack software developer based in Lagos, Nigeria. He specializes in designing and building high-performance web applications, cross-platform mobile apps (React Native & Flutter), and scalable backend REST APIs using Next.js, React, Laravel, Node.js, and PostgreSQL.',
  },
  {
    question: 'What core technologies and frameworks does Solomon Elijah use?',
    answer:
      'On the frontend and mobile, Solomon works with React, Next.js (App Router, Server Components, SSR), TypeScript, React Native, Flutter, Dart, Expo, and Tailwind CSS. On the backend, he builds robust services with Laravel, Node.js, Express, PostgreSQL, MySQL, Redis, and Supabase.',
  },
  {
    question: 'What kinds of production systems has Solomon Elijah built?',
    answer:
      'Solomon has engineered high-concurrency fintech and utility bills payment platforms (NexaPoint), vehicle loan and pre-order marketplaces, multi-leg flight booking platforms (United Airways), offline-first delivery package tracking mobile apps, and real estate portals (EstateZone).',
  },
  {
    question: 'Does Solomon Elijah build offline-first mobile applications?',
    answer:
      'Yes. Solomon architects cross-platform mobile applications in React Native and Flutter with local SQLite storage, optimistic UI state updates, outbox queue patterns, and background synchronization to guarantee reliable app performance even with zero network connectivity.',
  },
  {
    question: 'Is Solomon Elijah available for full-time roles, contracts, or remote work?',
    answer:
      'Yes. Solomon is open to full-time engineering roles, technical contracting, and remote software engineering opportunities worldwide. You can connect directly via the contact form or email solomonelijahsunday1@gmail.com.',
  },
]

export const metadata = pageMetadata(
  'About',
  'Meet Solomon Elijah Sunday, a full-stack software developer in Lagos, Nigeria. Explore his approach to web applications, backend APIs, and mobile app development (React Native & Flutter).',
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
            '@graph': [
              {
                '@type': 'ProfilePage',
                url: `${siteUrl}/about`,
                mainEntity: personSchema,
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ],
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
              I’m Solomon Elijah Sunday (known professionally as Solomon Elijah),
              a full-stack software developer based in Lagos, Nigeria. I build web
              and mobile applications, connecting the interfaces people use with the
              services, APIs, and data behind them.
            </p>
            <p>
              My portfolio includes vehicle marketplaces, shopping experiences,
              utility payment platforms, delivery tracking, and travel booking.
              Across these projects, I focus on making complex workflows easier
              to understand and use.
            </p>
            <p>
              I work with React and Next.js for the web, React Native and Flutter
              for mobile development, and Laravel, Node.js, and PostgreSQL for
              backend services. I build end-to-end full-stack solutions where interface,
              APIs, and data pipelines work together reliably.
            </p>
          </div>
          <dl className="profile-facts">
            <div>
              <dt>Full name</dt>
              <dd>Solomon Elijah Sunday</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{developer.location}</dd>
            </div>
            <div>
              <dt>Specialization</dt>
              <dd>Full-Stack · Mobile & Backend</dd>
            </div>
            <div>
              <dt>Web & Mobile</dt>
              <dd>React · Next.js · React Native · Flutter · TypeScript</dd>
            </div>
            <div>
              <dt>Backend & Data</dt>
              <dd>Laravel · Node.js · PostgreSQL · MySQL · REST APIs</dd>
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
      <section className="container section" aria-labelledby="faq-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COMMON QUESTIONS & QUICK ANSWERS</p>
            <h2 id="faq-heading">Frequently Asked Questions</h2>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '36px',
          }}
        >
          {faqs.map((faq, idx) => (
            <article
              key={faq.question}
              className="capability-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span className="capability-number">0{idx + 1}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
                {faq.question}
              </h3>
              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
      <div className="section">
        <ContactBanner />
      </div>
    </>
  )
}
