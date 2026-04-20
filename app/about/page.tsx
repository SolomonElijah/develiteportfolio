import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { developer } from '@/lib/data'
import {
  ServerIcon,
  CircleStackIcon,
  CpuChipIcon,
  ChartBarIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'About',
  description: 'Solomon Elijah is a Full-Stack Developer with 5+ years of experience building scalable web and mobile applications, APIs, and cloud-native platforms.',
  openGraph: {
    title: 'About Solomon Elijah - Full-Stack Developer',
    description: 'Full-Stack Developer with 5+ years of experience building scalable systems.',
  },
}
const capabilities = [
  { name: 'REST API & Backend Architecture', icon: ServerIcon },
  { name: 'Database Design & Optimization', icon: CircleStackIcon },
  { name: 'Full‑Stack System Development', icon: CpuChipIcon },
  { name: 'Performance Tuning & Scaling', icon: ChartBarIcon },
]

const systemsBuilt = [
  { name: 'Payment & Transaction Systems', icon: CloudIcon },
  { name: 'Admin & Analytics Dashboards', icon: ChartBarIcon },
  { name: 'API‑Driven Platforms', icon: ServerIcon },
  { name: 'Multi‑User Applications', icon: DevicePhoneMobileIcon },
]

const techStack = [
  'Laravel',
  'Next.js',
  'React Native',
  'MySQL',
  'PostgreSQL',
  'Tailwind',
  'Node.js',
  'Redis',
  'AWS',
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
        {/* Image Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
              <Image
                src="/images/me.jpg"
                alt="Solomon Elijah"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Quick Stats Card */}
            <div className="mt-6 bg-white dark:bg-navy-card rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {developer.yearsExperience}+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
                    Years
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    20+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
                    Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Headline */}
          <div>
            <span className="inline-block text-blue-600 dark:text-blue-400 font-medium text-sm uppercase tracking-wider mb-2">
              About Me
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              I build systems,
              <br />
              <span className="text-blue-600 dark:text-blue-400">not just interfaces</span>
            </h1>
          </div>

          {/* Bio */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              With over {developer.yearsExperience} years of experience, I design and build
              <strong className="text-slate-900 dark:text-white font-semibold"> production‑grade web and mobile systems</strong> used in real business environments. My focus is on creating maintainable, scalable solutions that solve genuine problems.
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Core Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 text-slate-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Capabilities & Systems Grid */}
          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            {/* Capabilities */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                Capabilities
              </h3>
              <ul className="space-y-3">
                {capabilities.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-0.5">
                      <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-700 dark:text-gray-300">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Systems Built */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full"></span>
                Systems Built
              </h3>
              <ul className="space-y-3">
                {systemsBuilt.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mt-0.5">
                      <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-gray-300">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            My Approach
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Principles that guide how I build and deliver software.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-white dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Business First
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
              I focus on solving real business problems. I choose architecture and tools based on impact, not trends.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Scalable by Design
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
              Systems are structured for growth with clear architecture and clean data flow so they remain easy to extend.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Performance Obsessed
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
              I optimize queries, APIs, and data flow to ensure speed and reliability under real usage.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-navy-card dark:to-navy rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to build something great?
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Let's discuss how I can help bring your project to life with clean, scalable systems.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
          >
            Work with me
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}