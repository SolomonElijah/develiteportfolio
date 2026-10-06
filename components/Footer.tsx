import Link from 'next/link'
import { developer } from '@/lib/profile'
import Arrow from './Arrow'
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className="wordmark">
            <span className="brand-mark">
              se<span>.</span>
            </span>
            <span>Solomon Elijah</span>
          </Link>
          <p>Thoughtful interfaces. Dependable systems.</p>
        </div>
        <div className="footer-links">
          <a href={developer.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <Arrow diagonal />
          </a>
          <Link href="/contact">
            Contact <Arrow diagonal />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Solomon Elijah</span>
        <span>Software Developer · Based in Lagos, Nigeria</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  )
}
