'use client'

import { useState, useId } from 'react'
import { EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { markAsReplied } from '@/app/admin/(dashboard)/contacts/actions'
import { toast } from 'sonner'
import { sendEmailBatches, emailResultMessage } from '@/lib/email-client'

interface ReplyButtonProps {
  contact: {
    id: string
    name: string
    email: string
    message?: string
  }
}

export default function ReplyButton({ contact }: ReplyButtonProps) {
  const fieldPrefix = useId()

  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)
  const [unconfirmed, setUnconfirmed] = useState(false)

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    setSending(true)

    const formData = new FormData(e.currentTarget)
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    try {
      const result = await sendEmailBatches([contact.email], subject, message)
      setUnconfirmed(result.uncertain.length > 0)
      if (!result.sent.length) throw new Error(emailResultMessage(result))
      try {
        await markAsReplied(contact.id)
      } catch {
        toast.warning(
          'The reply was sent, but its contact status could not be updated.',
        )
      }
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
        onClick={() => {
          setUnconfirmed(false)
          setShowModal(true)
        }}
        disabled={sending}
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

            {unconfirmed && (
              <p role="alert" className="text-sm text-amber-300">
                Delivery is unconfirmed. Check your email provider before
                sending again.
              </p>
            )}
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor={`${fieldPrefix}-field-0`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Subject
                </label>
                <input
                  id={`${fieldPrefix}-field-0`}
                  type="text"
                  name="subject"
                  defaultValue={`Re: Inquiry from ${contact.name}`}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={`${fieldPrefix}-field-1`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Message Body
                </label>
                <textarea
                  id={`${fieldPrefix}-field-1`}
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
                  disabled={sending}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending || unconfirmed}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {sending && (
                    <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
                  )}
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
