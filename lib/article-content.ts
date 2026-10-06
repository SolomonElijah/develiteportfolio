import type { BlogPost } from './data'
// Replace only the exact existing placeholder text. Editing an article in the
// CMS takes precedence as soon as its content changes.
const revisions: Record<
  string,
  { previous: string; title: string; excerpt: string; content: string }
> = {
  'frontend-app': {
    previous:
      ', and responsive  I build fast, accessible, and responsive user interfaces with modern frameworks. Focus on component reusability, state management, and seamless user experiences.',
    title: 'Technical Overview: Frontend Architecture',
    excerpt:
      'How navigation, useful content, and honest feedback work together to make a product easier to use.',
    content: `A well-engineered frontend provides clear navigation, accessible components, and responsive layouts. This portfolio uses Next.js with TypeScript, Tailwind CSS for utility-first styling, and React Server Components for optimal rendering. State management relies on React hooks and context for light shared state, while heavier data fetching is handled via SWR, enabling stale-while-revalidate patterns.

## Architectural Decisions
- **Routing & SSR**: Dynamic routes (pages/[slug].tsx) are rendered server-side for SEO, with static generation for stable posts.
- **Component Library**: Reusable UI primitives (Button, Card, Modal) are built with Tailwind and composed in a design system to ensure visual consistency.
- **Performance**: Code-splitting via dynamic imports, image optimization using Next/Image, and incremental static regeneration keep load times low.
- **Accessibility**: Semantic HTML, ARIA attributes, and focus management are applied across interactive elements.

## Deployment Note
Deploy-time note: Ensure the Supabase admin email (the one configured locally) is set as the administrator for the deployment environment.`,
  },
  devops: {
    previous: 'qF4RAGTE  Y53Y65Y\\r\\nDVVV',
    title: 'Authorization belongs at the point of access',
    excerpt:
      'Why a protected admin page is only one part of securing a portfolio\u2019s data and email tools.',
    content: `An administration area often combines content editing, private contact information, file uploads, and email tools. Each operation needs an explicit access decision.

## Authentication and authorization answer different questions

Authentication establishes who is signed in. Authorization decides what that person may do. A signed-in visitor should not automatically gain access to project editing or contact records.

This portfolio checks the authenticated user on the server and permits administration through a configured list of confirmed email addresses or a trusted admin role. User-editable profile metadata does not grant administrative access.

## Protect the operation itself

A redirect from the dashboard is helpful, but it does not replace access checks inside server actions and API endpoints. The code that creates a privileged database client checks administrator access before returning that client.

The email and upload endpoints also verify the user before processing a request. Email subjects, recipients, and message lengths are validated. Text inserted into email HTML is escaped so it remains text rather than becoming markup.

## Publish a deliberate view of the data

Public content queries use explicit column lists. Article queries select published records, and detail pages read from that same published set. This prevents the article URL from exposing a draft that does not appear on the writing page.

Service credentials stay in server-only modules. The browser receives public project content and the client authentication configuration; it does not receive the privileged service key.

## Check the system outside the page

Application checks are one layer. Database policies, storage permissions, provider settings, and deployment configuration also matter. A code review cannot establish the full security of a hosted database without inspecting its active policies.

Automated checks in this repository cover unsafe URLs, untrusted authorization metadata, unauthenticated requests, and the public rendering of project content. Those checks make regressions easier to catch as the portfolio evolves.`,
  },
}
export function revisePlaceholderArticle(post: BlogPost): BlogPost {
  const revision = revisions[post.slug]
  if (!revision || post.content.trim() !== revision.previous.trim()) return post
  return {
    ...post,
    title: revision.title,
    excerpt: revision.excerpt,
    content: revision.content,
    updated_at: '2026-10-05T00:00:00.000Z',
  }
}

