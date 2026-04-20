import {
  CodeBracketIcon,
  ServerStackIcon,
  CircleStackIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

const categories = [
  {
    name: 'Frontend',
    icon: CodeBracketIcon,
    description:
      'I build fast, accessible, and responsive user interfaces with modern frameworks. Focus on component reusability, state management, and seamless user experiences.',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'WordPress'],
  },
  {
    name: 'Backend',
    icon: ServerStackIcon,
    description:
      'Robust, scalable APIs and services designed for high traffic. I emphasize clean architecture, efficient database queries, and comprehensive error handling.',
    techs: ['Node.js', 'Laravel','Express', 'NestJS'],
  },
  {
    name: 'Database',
    icon: CircleStackIcon,
    description:
      'Data modeling, query optimization, and caching strategies. I ensure data integrity and performance, whether SQL or NoSQL.',
    techs: ['MySQL', 'MongoDB', 'Redis', 'Prisma', 'Drizzle'],
  },
  {
    name: 'Infrastructure',
    icon: CloudIcon,
    description:
      'Cloud-native deployments with Docker and Kubernetes. I handle CI/CD, monitoring, and infrastructure as code for reliable, repeatable environments.',
    techs: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Vercel'],
  },
  {
    name: 'Mobile',
    icon: DevicePhoneMobileIcon,
    description:
      'Cross-platform mobile apps with native-like performance. I deliver consistent experiences across iOS and Android from a single codebase.',
    techs: ['React Native', 'Expo', ],
  },
]

export default function TechStack() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          What I Offer & Tech Stack
        </h2>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          End-to-end development expertise across the entire stack, from pixel‑perfect interfaces to
          production infrastructure.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group bg-white dark:bg-navy-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <cat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {cat.description}
            </p>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2">
              {cat.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 text-slate-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}