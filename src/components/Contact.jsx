import { useState } from 'react'
import { profile } from '../data'

const WEB3FORMS_KEY = 'd6f4dddc-beee-4f15-9064-0e317c720cef'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    data.append('access_key', WEB3FORMS_KEY)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        e.target.reset()
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact wrap" id="contact">
      <div className="section-head" data-reveal>
        <span className="section-index mono">05</span>
        <h2>Contact</h2>
      </div>

      <div className="contact-grid">
        <div data-reveal>
          <p className="contact-big">
            Let’s build something that <em>learns</em>.
          </p>
          <p className="muted">
            I graduate in 2027 and I’m interested in roles in agentic AI, ML research engineering and robot learning. The
            quickest way to reach me is email.
          </p>
          <button className="email-copy" onClick={copy}>
            <span className="mono">{profile.email}</span>
            <span className="email-copy-state mono">{copied ? 'copied ✓' : 'click to copy'}</span>
          </button>
          <div className="contact-links">
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">CV (PDF) ↗</a>
          </div>
        </div>

        <form className="form" onSubmit={onSubmit} data-reveal>
          <label>
            <span className="mono small muted">name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            <span className="mono small muted">email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            <span className="mono small muted">message</span>
            <textarea name="message" rows="5" required />
          </label>
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} />
          <button className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent — thank you ✓' : 'Send message →'}
          </button>
          {status === 'error' && <p className="form-error mono small">That didn’t go through. Email me directly instead.</p>}
        </form>
      </div>

      <footer className="footer mono small muted">
        <span>© {new Date().getFullYear()} Payton Liao</span>
        <span>London · built with React + a little inverse kinematics</span>
      </footer>
    </section>
  )
}
