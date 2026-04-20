import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { developer } from '@/lib/data'

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              Available for work
            </span>
          </div>

          {/* Name & Headline */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              <span className="block text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
                Hi, I'm {developer.name}
              </span>
              Full-Stack Developer
              <br />
              <span className="text-blue-600 dark:text-blue-500">
                Building Scalable Systems
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed">
            I design and build production‑ready web & mobile apps, APIs, and platforms 
            that solve real business problems with clean, maintainable code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
            >
              View Projects
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium border border-gray-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200"
            >
              Hire Me
            </Link>

            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {developer.yearsExperience}+
              </p>
              <p className="text-sm text-slate-500 dark:text-gray-400">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{developer.projectsDelivered}+</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
            {/* Decorative Background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl blur-2xl opacity-60"></div>
            
            {/* Main Image Container */}
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
              <Image
                src="/images/me.jpg"
                alt={`${developer.name} - Full-Stack Developer`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Tech Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-navy-card rounded-xl px-4 py-2 shadow-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {developer.yearsExperience}+ Years of Code
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}