import { useEffect, useState } from 'react'

const LINKS = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

export default function Nav({ onOpenPalette }) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fmt = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }).format(new Date()),
      )
    fmt()
    const id = setInterval(fmt, 15000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
      let current = ''
      for (const [id] of LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
      <a href="#top" className="nav-logo" aria-label="Back to top">
        PL<span className="accent">.</span>
      </a>
      <ul className="nav-links">
        {LINKS.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? 'is-active' : ''}>{label}</a>
          </li>
        ))}
      </ul>
      <div className="nav-right mono">
        <span className="nav-time" title="Time in London">LDN {time}</span>
        <button className="nav-k" onClick={onOpenPalette} aria-label="Open command menu">menu ⌘K</button>
      </div>
    </nav>
  )
}
