import Link from 'next/link'

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Let's build something that actually works in production
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          From MVP to enterprise-scale systems, I deliver robust solutions.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Start a Conversation
        </Link>
      </div>
    </section>
  )
}
