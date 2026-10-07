'use client'

import { useState, useId } from 'react'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import { sendEmailBatches, emailResultMessage } from '@/lib/email-client'

export default function SendEmailButton() {
  const fieldPrefix = useId()

  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)
  const [unconfirmed, setUnconfirmed] = useState(false)

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    setSending(true)

    const formData = new FormData(e.currentTarget)
    const to = formData.get('to') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    try {
      const result = await sendEmailBatches([to], subject, message)
      setUnconfirmed(result.uncertain.length > 0)
      if (!result.sent.length) throw new Error(emailResultMessage(result))

      toast.success('Email sent successfully')
      setShowModal(false)
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email')
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
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-all"
      >
        <PaperAirplaneIcon className="w-4 h-4" />
        <span>Direct Email</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Send Direct Email
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Send a custom email via configured SMTP / Resend service.
              </p>
            </div>

            {unconfirmed && (
              <p role="alert" className="text-sm text-amber-300">
                Delivery is unconfirmed. Check your email provider before
                sending again.
              </p>
            )}
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-0`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Recipient Email *
                </label>
                <input
                  id={`${fieldPrefix}-field-0`}
                  type="email"
                  name="to"
                  required
                  placeholder="recipient@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-1`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Subject Line *
                </label>
                <input
                  id={`${fieldPrefix}-field-1`}
                  type="text"
                  name="subject"
                  required
                  placeholder="Project Consultation Update"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`${fieldPrefix}-field-2`}
                  className="block text-xs font-medium text-slate-300"
                >
                  Message Content *
                </label>
                <textarea
                  id={`${fieldPrefix}-field-2`}
                  name="message"
                  required
                  rows={5}
                  placeholder="Write message details..."
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {sending && (
                    <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
                  )}
                  <span>{sending ? 'Sending...' : 'Dispatch Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
