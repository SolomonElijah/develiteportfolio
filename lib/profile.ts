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
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://solomonelijah.online'
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
