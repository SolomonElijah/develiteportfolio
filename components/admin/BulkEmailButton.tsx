'use client'

import { useState } from 'react'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface BulkEmailButtonProps {
  contacts: { id: string; name: string; email: string }[]
}

export default function BulkEmailButton({ contacts }: BulkEmailButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)

  const uniqueEmails = [...new Set(contacts.map(c => c.email).filter(Boolean))]

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    const formData = new FormData(e.currentTarget)
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: uniqueEmails,
          subject,
          message,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send')
      }

      toast.success(`Email sent to ${uniqueEmails.length} contacts`)
      setShowModal(false)
    } catch (error: any) {
      toast.error(error.message || 'Failed to send emails')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={uniqueEmails.length === 0}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      >
        <MegaphoneIcon className="w-5 h-5" />
        Email All ({uniqueEmails.length})
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-navy-card rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Email All Contacts
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              This will send to {uniqueEmails.length} unique email addresses
            </p>

            <div className="mb-4 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex flex-wrap gap-1">
                {uniqueEmails.map((email) => (
                  <span
                    key={email}
                    className="inline-flex px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                  >
                    {email}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {sending ? 'Sending...' : `Send to ${uniqueEmails.length} contacts`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}