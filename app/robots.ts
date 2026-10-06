import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/profile'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'Bytespider',
          'Cohere-ai',
        ],
        allow: [
          '/',
          '/about',
          '/projects',
          '/projects/*',
          '/blog',
          '/blog/*',
          '/contact',
          '/llms.txt',
          '/llms-full.txt',
          '/profile.json',
        ],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
