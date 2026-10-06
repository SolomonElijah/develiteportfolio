'use client'

import { useState } from 'react'
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
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
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete this ${type}?`))
      return

    setLoading(true)
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
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`)
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete record')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      aria-label={`Delete ${type}`}
      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-lg transition-all disabled:opacity-50"
      title={`Delete ${type}`}
    >
      {loading ? (
        <ArrowPathIcon className="w-4 h-4 animate-spin text-rose-400" />
      ) : (
        <TrashIcon className="w-4 h-4" />
      )}
    </button>
  )
}
