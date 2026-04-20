import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug } from '@/lib/data'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  CpuChipIcon,
  ServerIcon,
  CloudIcon,
} from '@heroicons/react/24/outline'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
            {project.type}
          </span>
          {project.featured && (
            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium border border-amber-200 dark:border-amber-800">
              Featured
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-400 max-w-4xl">
          {project.description}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Problem */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-500 dark:bg-red-400 rounded-full"></span>
              The Problem
            </h2>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 dark:bg-green-400 rounded-full"></span>
              The Solution
            </h2>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              {project.solution}
            </p>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 dark:bg-purple-400 rounded-full"></span>
              Architecture
            </h2>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              {project.architecture}
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Tech Stack Card */}
            <div className="bg-gray-50 dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CpuChipIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <ServerIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Outcome
              </h3>
              <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* Demo Link */}
            {project.demo_url && (
              <div className="bg-white dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
                >
                  <CloudIcon className="w-5 h-5" />
                  View Live Demo
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="text-xs text-center text-slate-500 dark:text-gray-500 mt-3">
                  Opens in a new tab
                </p>
              </div>
            )}

            {/* Quick Contact */}
            <div className="bg-gray-50 dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-3">
                Interested in a similar project?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Let's talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}