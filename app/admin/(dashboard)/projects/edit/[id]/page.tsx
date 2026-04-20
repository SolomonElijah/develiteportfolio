import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'

interface Props {
  params: { id: string }
}

export default async function EditProjectPage({ params }: Props) {
  const supabase = createAdminClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Edit Project
      </h1>
      <div className="bg-white dark:bg-navy-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <ProjectForm initialData={project} isEditing />
      </div>
    </div>
  )
}