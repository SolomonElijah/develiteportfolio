import type { MetadataRoute } from 'next'
import { developer } from '@/lib/profile'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${developer.name} — Full-Stack Software Developer`,
    short_name: developer.name,
    description:
      'Full-stack software developer building web applications, mobile apps (React Native & Flutter), and backend APIs with React, Next.js, TypeScript, Laravel, and Node.js.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f6fb',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}

