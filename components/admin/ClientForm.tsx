'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createClientRecord,
  updateClient,
} from '@/app/admin/(dashboard)/clients/actions'
import { toast } from 'sonner'
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface ClientFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function ClientForm({
  initialData,
  isEditing = false,
}: ClientFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      if (isEditing) {
        await updateClient(initialData.id, formData)
        toast.success('Client updated successfully')
      } else {
        await createClientRecord(formData)
        toast.success('Client created successfully')
      }
      router.push('/admin/clients')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="border-b border-slate-800/80 pb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Client & Project Particulars
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Customer contact information, contract scope, and financial terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Customer / Company Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              defaultValue={initialData?.customer_name}
              required
              placeholder="e.g. Acme Corporation"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Contract Project Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="projectTitle"
              defaultValue={initialData?.project_title}
              required
              placeholder="e.g. Corporate SaaS Architecture"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              defaultValue={initialData?.email}
              placeholder="billing@acme.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              defaultValue={initialData?.phone}
              placeholder="+1 555-0192"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-200">
            Project Scope & Notes
          </label>
          <textarea
            name="description"
            defaultValue={initialData?.description}
            rows={3}
            placeholder="Contract deliverables, milestones, or client requirements..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-800/80">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Contract Revenue ($)
            </label>
            <input
              type="number"
              name="revenue"
              defaultValue={initialData?.revenue || 0}
              step="0.01"
              min="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-emerald-400 font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Expenditure / Costs ($)
            </label>
            <input
              type="number"
              name="expenditure"
              defaultValue={initialData?.expenditure || 0}
              step="0.01"
              min="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-rose-400 font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Status
            </label>
            <select
              name="status"
              defaultValue={initialData?.status || 'ongoing'}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>{isEditing ? 'Update Client' : 'Create Client Record'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/clients')}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-sm font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
