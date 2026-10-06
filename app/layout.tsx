import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import SiteShell from '@/components/SiteShell'
import TopLoader from '@/components/TopLoader'
import { developer, siteUrl } from '@/lib/profile'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Solomon Elijah | Full-Stack Software Developer',
    template: '%s | Solomon Elijah',
  },
  description:
    'Explore Solomon Elijah’s web, mobile, and API projects. Full-stack software developer based in Lagos, Nigeria, working with React, Next.js, Laravel, and React Native.',
  authors: [{ name: developer.name }],
  creator: developer.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Solomon Elijah — Portfolio',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f6fb',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${inter.className}`}>
        <Providers>
          <TopLoader />
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  )
}
