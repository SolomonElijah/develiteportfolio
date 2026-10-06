import { developer, siteUrl } from '@/lib/profile'
import { pageMetadata, serializeJsonLd } from '@/lib/seo'
import ContactForm from '@/components/ContactForm'
import Arrow from '@/components/Arrow'
export const metadata = pageMetadata(
  'Contact',
  'Contact Solomon Elijah about software developer roles, freelance web and mobile projects, or technical collaboration. Based in Lagos, Nigeria.',
  '/contact',
)
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Solomon Elijah',
            url: `${siteUrl}/contact`,
            description:
              'Contact Solomon Elijah about software developer roles, freelance web and mobile projects, or technical collaboration.',
            mainEntity: {
              '@type': 'Person',
              name: developer.name,
              email: developer.email,
              telephone: developer.phone,
              url: siteUrl,
            },
          }),
        }}
      />
      <div className="container">
      <header className="page-header">
        <p className="eyebrow">GOOD WORK STARTS WITH A CONVERSATION</p>
        <h1>
          Let’s make it happen<span className="accent">.</span>
        </h1>
        <p>
          Hiring for your team? Building a new product? Have an interesting
          problem to solve? Tell me a little about it.
        </p>
      </header>
      <div className="contact-layout">
        <div className="contact-direct">
          <h2>A direct line to me.</h2>
          <p>
            For opportunities, please include the role or project scope, work
            arrangement, and a little about your team.
          </p>
          <div className="contact-channel">
            <span>Email</span>
            <a href={`mailto:${developer.email}`}>
              {developer.email}
              <Arrow diagonal />
            </a>
          </div>
          <div className="contact-channel">
            <span>Phone / WhatsApp</span>
            <a
              href={`https://wa.me/${developer.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {developer.phone}
              <Arrow diagonal />
            </a>
          </div>
          <div className="contact-channel">
            <span>Based in</span>
            <p>{developer.location}</p>
          </div>
          <div className="contact-socials">
            <a
              className="text-link"
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <Arrow diagonal />
            </a>
            <a
              className="text-link"
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  </>
  )
}
