'use client'

import { useState, useId } from 'react'
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { createContact } from '@/app/admin/(dashboard)/contacts/actions'
import { toast } from 'sonner'

export default function AddContactButton() {
  const fieldPrefix = useId()

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      await createContact(formData)
      toast.success('Contact added successfully')
      setShowModal(false)
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Failed to add contact')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Contact</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Add New Contact
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manually record a client inquiry or prospect.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-0`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Name *
                </label>
                <input
                  id={`${fieldPrefix}-field-0`}
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-1`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Email *
                </label>
                <input
                  id={`${fieldPrefix}-field-1`}
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-2`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Phone
                </label>
                <input
                  id={`${fieldPrefix}-field-2`}
                  type="tel"
                  name="phone"
                  placeholder="+1 555-0199"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-3`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Message / Details
                </label>
                <textarea
                  id={`${fieldPrefix}-field-3`}
                  name="message"
                  rows={3}
                  placeholder="Project inquiry details..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loading && (
                    <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
                  )}
                  <span>{loading ? 'Adding...' : 'Save Contact'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
