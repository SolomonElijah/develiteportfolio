import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://solomonelijah.dev'),
  title: {
    default: 'Solomon Elijah - Full-Stack Developer | Building Scalable Systems',
    template: '%s | Solomon Elijah',
  },
  description: 'Full-Stack Software Developer specializing in building production-ready web apps, mobile apps, APIs, and scalable platforms. 5+ years of experience delivering high-performance systems.',
  keywords: [
    'Full-Stack Developer',
    'Web Developer',
    'Mobile Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript',
    'Solomon Elijah',
    'Software Engineer',
    'API Development',
    'Portfolio',
  ],
  authors: [{ name: 'Solomon Elijah' }],
  creator: 'Solomon Elijah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solomonelijah.dev',
    siteName: 'Solomon Elijah - Developer Portfolio',
    title: 'Solomon Elijah - Full-Stack Developer | Building Scalable Systems',
    description: 'Full-Stack Software Developer specializing in building production-ready web apps, mobile apps, APIs, and scalable platforms.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Solomon Elijah - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solomon Elijah - Full-Stack Developer',
    description: 'Full-Stack Software Developer specializing in building production-ready web apps, mobile apps, APIs, and scalable platforms.',
    images: ['/images/og-image.png'],
    creator: '@solomonelijah',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://solomonelijah.dev" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0B1120" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-navy text-slate-900 dark:text-gray-200`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}