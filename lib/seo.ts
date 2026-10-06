import type { Metadata } from 'next'
import { developer, siteUrl } from './profile'

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/og-image.png',
): Metadata {
  const fullTitle = `${title} | ${developer.name}`
  const twitterHandle = '@solomonelijah'
  const imageUrl = image.startsWith('http')
    ? image
    : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`
  const canonicalUrl = `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Solomon Elijah — Portfolio',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}

export const personSchema = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: developer.name,
  jobTitle: developer.role,
  url: siteUrl,
  image: `${siteUrl}/images/me.png`,
  email: developer.email,
  sameAs: [developer.github, developer.linkedin, developer.twitter],
  homeLocation: { '@type': 'Place', name: developer.location },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Laravel',
    'React Native',
    'REST APIs',
    'MySQL',
    'PostgreSQL',
  ],
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
