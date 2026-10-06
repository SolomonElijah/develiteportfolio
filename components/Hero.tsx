import Image from 'next/image'
import Link from 'next/link'
import Arrow from './Arrow'
import { developer } from '@/lib/profile'
export default function Hero() {
  return (
    <section className="container hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> WEB · MOBILE · APIs
        </div>
        <p className="hero-intro">Hello, I’m Elijah.</p>
<h1 id="hero-title">
  I build software
  <br />
  that <span className="gradient-text">solves real problems</span><span className="accent">.</span>
</h1>
<p className="hero-description">
  Software developer building reliable web and mobile applications with
  modern technologies. From intuitive interfaces to scalable APIs and
  everything in between.
</p>

        <div className="hero-actions">
          <Link href="/projects" className="button">
            Explore my work <Arrow />
          </Link>
          <Link href="/about" className="text-link">
            A little about me <Arrow diagonal />
          </Link>
        </div>
        <div className="hero-meta">
          <span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {developer.location}
          </span>
          <span>Web & mobile development</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame">
          <Image
            src="/images/me.png"
            alt="Solomon Elijah at a software development workspace"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 42vw"
            className="portrait-image"
          />
          <div className="portrait-caption">
            <span>Solomon Elijah</span>
            <span>Full-Stack Developer</span>
          </div>
        </div>
        <div className="hero-sticker">
          <span className="sticker-symbol" aria-hidden="true">
            ↗
          </span>
          <span>
            From idea
            <br />
            <strong>to production.</strong>
          </span>
        </div>
        {/* <div className="portrait-note">
          <span aria-hidden="true">✳</span> A human behind the code.
        </div> */}
      </div>
    </section>
  )
}
