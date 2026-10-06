'use client'
import { useState } from 'react'
import { developer } from '@/lib/profile'
import Arrow from './Arrow'

export default function ContactForm() {
  const [status, setStatus] = useState<
      'idle' | 'pending' | 'success' | 'error'
    >('idle'),
    [message, setMessage] = useState('')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'pending') return
    const form = event.currentTarget,
      data = new FormData(form)
    setStatus('pending')
    setMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json()
      if (!response.ok || !result.success)
        throw new Error(
          result.error || 'Your message could not be saved. Please try again.',
        )
      form.reset()
      setStatus('success')
      setMessage(
        'Thank you — your message has been saved. I’ll reply to the email address you provided.',
      )
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error && error.name !== 'TimeoutError'
          ? error.message
          : 'The request timed out. Please try again or email me directly.',
      )
    }
  }
  return (
    <form onSubmit={submit} className="contact-form">
      <h2>Tell me what you’re thinking.</h2>
      <p>A few details are all we need to get started.</p>
      <noscript>
        <p>
          Please email{' '}
          <a href={`mailto:${developer.email}`}>{developer.email}</a> to get in
          touch.
        </p>
      </noscript>
      {message && (
        <div
          className={`form-status ${status === 'error' ? 'error' : ''}`}
          role={status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {message}
        </div>
      )}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            maxLength={100}
            disabled={status === 'pending'}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
            disabled={status === 'pending'}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="subject">What would you like to discuss?</label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          disabled={status === 'pending'}
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option>Job opportunity</option>
          <option>Freelance project</option>
          <option>Technical collaboration</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about the role, project, or challenge. Include a timeline or relevant links if you have them."
          rows={5}
          minLength={20}
          maxLength={5000}
          required
          disabled={status === 'pending'}
        />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button" type="submit" disabled={status === 'pending'}>
        {status === 'pending' ? (
          <>
            <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Sending your message…
          </>
        ) : (
          <>
            Send message
            <Arrow diagonal />
          </>
        )}
      </button>
      <p className="form-note">
        Your name, email, and message are stored to respond to your inquiry.
        Prefer email?{' '}
        <a href={`mailto:${developer.email}`}>Contact me directly.</a>
      </p>
    </form>
  )
}
