import Link from 'next/link'
import Arrow from './Arrow'
export default function ContactBanner() {
  return (
    <section className="container contact-banner">
      <div>
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h2>
          Let’s build something
          <br />
          people love to use.
        </h2>
        <p>
          A role, a product, or an interesting technical challenge.
          <br />
          I’d love to hear about it.
        </p>
      </div>
      <Link href="/contact" className="button button-light">
        Start a conversation <Arrow diagonal />
      </Link>
      <span className="banner-decoration" aria-hidden="true">
        ↗
      </span>
    </section>
  )
}
