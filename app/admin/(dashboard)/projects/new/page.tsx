import Link from 'next/link'
import ProjectForm from '@/components/admin/ProjectForm'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          title="Back to projects"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create New Project
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Add a new application, API, or case study to your portfolio.
          </p>
        </div>
      </div>

      <ProjectForm />
    </div>
  )
}
