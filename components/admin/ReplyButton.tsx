'use client'

import { useState } from 'react'
import { EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { markAsReplied } from '@/app/admin/(dashboard)/contacts/actions'
import { toast } from 'sonner'

interface ReplyButtonProps {
  contact: {
    id: string
    name: string
    email: string
    message?: string
  }
}

export default function ReplyButton({ contact }: ReplyButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)

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
          to: contact.email,
          subject,
          message,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send')
      }

      await markAsReplied(contact.id)
      toast.success('Reply sent successfully')
      setShowModal(false)
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reply')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
        title={`Reply to ${contact.name}`}
      >
        <EnvelopeIcon className="w-4 h-4" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Reply to {contact.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {contact.email}
              </p>
            </div>

            {contact.message && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Their message:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {contact.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  defaultValue={`Re: Inquiry from ${contact.name}`}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Message Body
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your response here..."
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {sending && <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />}
                  <span>{sending ? 'Sending...' : 'Send Reply'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
