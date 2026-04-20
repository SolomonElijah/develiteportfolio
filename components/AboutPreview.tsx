import Link from 'next/link'
import {
  ArrowRightIcon,
  ServerIcon,
  CpuChipIcon,
  CloudIcon,
  ChartBarIcon,
  CircleStackIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { developer } from '../lib/data'

// Replace with your actual name and details


const capabilities = [
  {
    label: 'API Design & Architecture',
    icon: ServerIcon,
    description:
      'I design RESTful and GraphQL APIs with a focus on versioning, security, and developer experience. Every endpoint is documented, tested, and built to scale.',
  },
  {
    label: 'Distributed Systems',
    icon: CpuChipIcon,
    description:
      'Message queues, event‑driven workflows, and microservices patterns ensure resilience and fault tolerance across complex deployments.',
  },
  {
    label: 'Cloud Infrastructure',
    icon: CloudIcon,
    description:
      'From AWS to Vercel, I provision infrastructure as code (Terraform), configure auto‑scaling, and set up monitoring for high availability.',
  },
  {
    label: 'Performance Optimization',
    icon: ChartBarIcon,
    description:
      'I profile applications at every layer—frontend bundle sizes, database query plans, caching strategies—to deliver sub‑second response times.',
  },
  {
    label: 'Data Modeling',
    icon: CircleStackIcon,
    description:
      'Whether SQL or NoSQL, I design schemas that balance normalization, query efficiency, and future flexibility for growing applications.',
  },
  {
    label: 'Team Leadership',
    icon: UserGroupIcon,
    description:
      'I mentor developers, conduct code reviews, and establish engineering best practices that improve team velocity and code quality.',
  },
]

export default function AboutPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Intro Text */}
          {/* Left Column - Intro & Headline */}
<div className="lg:sticky lg:top-24">
  <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">
    About Me
  </span>

  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
    Hi, I'm {developer.name}
    <br />
    <span className="text-blue-600 dark:text-blue-400">
      I build scalable systems that handle real users, not just demos
    </span>
  </h2>

  <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
    I'm a{' '}
    <strong className="text-slate-900 dark:text-white font-semibold">
      {developer.role}
    </strong>{' '}
    with over {developer.yearsExperience} years of experience building
    production-grade web and mobile applications.
    {/* <br /><br />
    I specialize in Laravel, Next.js, and React Native — designing backend systems,
    APIs, and data flows that remain stable under load and easy to scale.
    <br /><br /> */}
    I don’t just ship features, I build systems aligned with business goals,
    optimized for performance, and structured for long-term maintainability.
  </p>

  <Link
    href="/about"
    className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
  >
    See how I build systems
    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Link>
</div>

        {/* Right Column - Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="bg-white dark:bg-navy-card rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <cap.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{cap.label}</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}