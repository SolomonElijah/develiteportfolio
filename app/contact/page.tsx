import type { Metadata } from 'next'
import { developer } from '@/lib/data'
import {
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Solomon Elijah for freelance projects, full‑time roles, or technical consulting. Available for web, mobile, and API development.',
  openGraph: {
    title: 'Contact Solomon Elijah',
    description: 'Get in touch to discuss your project or opportunity.',
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Let's work together
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400">
          I'm currently available for freelance projects or full‑time roles.
          Tell me about your project and I'll get back to you within{' '}
          <span className="font-medium text-blue-600 dark:text-blue-400">1 hour</span>.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column – Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Direct Contact Card */}
          <div className="bg-gray-50 dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Direct Contact
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <EnvelopeIcon className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Email</p>
                  <a
                    href={`mailto:${developer.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {developer.email}
                  </a>
                </div>
              </li>
              {developer.phone && (
                <li className="flex items-start gap-3">
                  <DevicePhoneMobileIcon className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Phone / WhatsApp</p>
                    <a
                      href={`https://wa.me/${developer.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {developer.phone}
                    </a>
                  </div>
                </li>
              )}
              {developer.location && (
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Location</p>
                    <p className="text-slate-700 dark:text-gray-300">{developer.location}</p>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Response Time</p>
                  <p className="text-slate-700 dark:text-gray-300">Within 1 hour (business hours)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="bg-gray-50 dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Connect with me
            </h3>
            <div className="flex flex-wrap gap-4">
              {developer.github && (
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {developer.linkedin && (
                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {developer.twitter && (
                <a
                  href={developer.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
              )}
              {developer.whatsapp && (
                <a
                  href={`https://wa.me/${developer.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700 transition-all"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-navy-card rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Send me a message
            </h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
              >
                Send Message
              </button>
              <p className="text-xs text-center text-slate-500 dark:text-gray-400 mt-4">
                I'll never share your email. You'll receive a reply within 1 hour.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}