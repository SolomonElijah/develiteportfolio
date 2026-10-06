'use client'

import { useState } from 'react'
import { MegaphoneIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface BulkEmailButtonProps {
  contacts: { id: string; name: string; email: string }[]
}

export default function BulkEmailButton({ contacts }: BulkEmailButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)

  const uniqueEmails = Array.from(
    new Set(contacts.map((c) => c.email).filter(Boolean)),
  )

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

      toast.success(`Broadcast sent to ${uniqueEmails.length} contacts`)
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
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition-all disabled:opacity-40"
      >
        <MegaphoneIcon className="w-4 h-4" />
        <span>Broadcast ({uniqueEmails.length})</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Broadcast to All Contacts
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Send to {uniqueEmails.length} verified recipient addresses.
              </p>
            </div>

            <div className="max-h-24 overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-2.5">
              <div className="flex flex-wrap gap-1.5">
                {uniqueEmails.map((email) => (
                  <span
                    key={email}
                    className="inline-flex px-2 py-0.5 bg-blue-500/15 text-blue-300 border border-blue-500/20 rounded-md text-[11px] font-mono"
                  >
                    {email}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Portfolio Announcement / News"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Type broadcast message..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm leading-relaxed"
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
                  disabled={sending}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-purple-500/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {sending && <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />}
                  <span>{sending ? 'Sending...' : 'Send Broadcast'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
