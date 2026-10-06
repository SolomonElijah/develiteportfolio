'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
export default function SiteShell({ children }: { children: React.ReactNode }) {
  if (usePathname().startsWith('/admin'))
    return <div className="admin-shell">{children}</div>
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
