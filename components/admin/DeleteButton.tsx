'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteProject } from '@/app/admin/(dashboard)/projects/actions'
import { deleteBlogPost } from '@/app/admin/(dashboard)/blog/actions'
import { deleteClient } from '@/app/admin/(dashboard)/clients/actions'
import { deleteContact } from '@/app/admin/(dashboard)/contacts/actions'
import { toast } from 'sonner'

interface DeleteButtonProps {
  id: string
  type: 'project' | 'blog' | 'client' | 'contact'
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      if (type === 'project') {
        await deleteProject(id)
      } else if (type === 'blog') {
        await deleteBlogPost(id)
      } else if (type === 'client') {
        await deleteClient(id)
      } else if (type === 'contact') {
        await deleteContact(id)
      }
      toast.success('Deleted successfully')
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  )
}
