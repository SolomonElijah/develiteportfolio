export const developer = {
  name: 'Solomon Elijah',
  fullName: 'Solomon Elijah Sunday',
  alternateNames: [
    'Solomon Elijah Sunday',
    'Solomon Sunday Elijah',
    'Elijah Sunday',
  ],
  role: 'Full-Stack Software Developer',
  email: 'solomonelijahsunday1@gmail.com',
  phone: '+2349032236191',
  location: 'Lagos, Nigeria',
  github: 'https://github.com/solomonelijah',
  linkedin: 'https://linkedin.com/in/solomonelijah',
  twitter: 'https://twitter.com/solomonelijah',
  whatsapp: '2349032236191',
  cv: '/solomon-elijah-cv.pdf',
}
const envUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'https://solomonelijah.vercel.app')

export const siteUrl = (
  envUrl.startsWith('http') ? envUrl : `https://${envUrl}`
).replace(/\/$/, '')
export const skillGroups = [
  {
    title: 'Web applications',
    description:
      'Responsive, server-rendered interfaces with clear navigation, accessible interactions, and high performance.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    description:
      'Robust application logic, high-concurrency architecture, and secure REST APIs connecting products to their data.',
    skills: ['Laravel', 'PHP', 'Node.js', 'Express', 'REST APIs', 'Redis'],
  },
  {
    title: 'Mobile development',
    description:
      'Cross-platform mobile applications with offline-first persistence, native integrations, and smooth user experiences.',
    skills: ['React Native', 'Flutter', 'Dart', 'Expo', 'SQLite'],
  },
  {
    title: 'Databases & data',
    description:
      'Relational and document database design, query optimization, indexing, and transactional integrity.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'],
  },
]
