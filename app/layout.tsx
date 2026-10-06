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
    'Full-stack software developer based in Lagos, Nigeria, building reliable web and mobile applications with React, Next.js, TypeScript, React Native, Laravel, and Node.js.',
  authors: [{ name: developer.name, url: siteUrl }],
  creator: developer.name,
  publisher: developer.name,
  keywords: [
    'Solomon Elijah',
    'Full-Stack Developer',
    'Software Engineer',
    'Next.js Developer',
    'React Developer',
    'React Native',
    'Laravel',
    'Node.js',
    'Web Developer Lagos Nigeria',
    'Mobile App Developer',
    'Portfolio',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Solomon Elijah — Portfolio',
    title: 'Solomon Elijah | Full-Stack Software Developer',
    description:
      'Full-stack software developer based in Lagos, Nigeria, building reliable web and mobile applications with React, Next.js, TypeScript, React Native, Laravel, and Node.js.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        secureUrl: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Solomon Elijah — Full-Stack Software Developer',
      },
      {
        url: `${siteUrl}/opengraph-image`,
        secureUrl: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Solomon Elijah — Full-Stack Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@solomonelijah',
    creator: '@solomonelijah',
    title: 'Solomon Elijah | Full-Stack Software Developer',
    description:
      'Full-stack software developer based in Lagos, Nigeria, building reliable web and mobile applications with React, Next.js, TypeScript, React Native, Laravel, and Node.js.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
