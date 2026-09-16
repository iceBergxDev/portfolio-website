'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="py-12">
        <p className="text-accent text-lg font-semibold mb-2">Message sent</p>
        <p className="text-text-muted text-sm">I&apos;ll read it and get back to you as soon as I can.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm text-text-muted mb-2">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-text-muted mb-2">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="your@email.com" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-text-muted mb-2">Message</label>
        <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell me about the role or project" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">The form did not send. Please email me directly at pirun.ks@gmail.com.</p>
      )}
      <button type="submit" disabled={status === 'loading'}
        className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
