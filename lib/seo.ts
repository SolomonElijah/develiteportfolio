import type { Metadata } from 'next'
import { developer, siteUrl } from './profile'
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/opengraph-image',
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${developer.name}`,
      description,
      url: path,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
export const personSchema = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: developer.name,
  jobTitle: developer.role,
  url: siteUrl,
  image: `${siteUrl}/images/me.jpg`,
  email: developer.email,
  sameAs: [developer.github, developer.linkedin],
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
