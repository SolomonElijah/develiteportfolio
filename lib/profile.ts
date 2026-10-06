export const developer = {
  name: 'Solomon Elijah',
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
    title: 'Web experiences',
    description:
      'Responsive interfaces with clear navigation, accessible interactions, and thoughtful performance.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    description:
      'Application logic, service integrations, and APIs that connect products to their data.',
    skills: ['Laravel', 'PHP', 'Node.js', 'REST APIs'],
  },
  {
    title: 'Mobile & data',
    description:
      'Mobile applications backed by structured data and reusable application services.',
    skills: ['React Native', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
]
