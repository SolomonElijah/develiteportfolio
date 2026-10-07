'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Arrow from './Arrow'
const links = [
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Writing', href: '/blog' },
]
export default function Navbar() {
  const pathname = usePathname(),
    [open, setOpen] = useState(false),
    toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return (
    <div className="site-header-wrapper">
      <header className={`site-header ${open ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="wordmark" aria-label="Solomon Elijah, home">
            <span className="brand-mark">
              se<span>.</span>
            </span>
            <span className="wordmark-text">Solomon Elijah</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname.startsWith(link.href) ? 'page' : undefined
                }
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <Link href="/contact" className="button button-small nav-contact">
              Let’s talk <Arrow diagonal />
            </Link>
            <button
              ref={toggle}
              className="icon-button menu-toggle"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                '✕'
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          hidden={!open}
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact <Arrow diagonal />
          </Link>
        </nav>
      </header>
    </div>
  )
}
