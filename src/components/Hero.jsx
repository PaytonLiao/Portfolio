import { useEffect, useState } from 'react'
import ArmField from './ArmField'
import { useScramble } from '../hooks'
import { profile } from '../data'

const ROLES = ['agentic AI systems', 'LLM evaluation', 'embodied learning', 'computer vision', 'robots that are curious']

export default function Hero({ onOpenPalette }) {
  const first = useScramble('Payton', { delay: 150 })
  const last = useScramble('Liao', { delay: 450 })
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])
  const role = useScramble(ROLES[i], { speed: 18 })

  return (
    <header className="hero" id="top">
      <ArmField />
      <div className="hero-inner wrap">
        <p className="eyebrow hero-eyebrow">
          <span className="dot-live" /> MEng Robotics &amp; AI · UCL · final year
        </p>
        <h1 className="hero-name" aria-label="Payton Liao">
          <span>{first || ' '}</span>
          <span className="outline">{last || ' '}</span>
        </h1>
        <p className="hero-tag">
          I build things that <em>learn</em> — from multi-agent LLM systems at Google to simulated
          robots that discover their own bodies.
        </p>
        <p className="hero-role mono">
          <span className="muted">currently into →</span> <span className="accent">{role}</span>
          <span className="caret" />
        </p>
        <div className="hero-cta">
          <a href="#work" className="btn btn-primary">See the work</a>
          <a href={profile.cv} className="btn" target="_blank" rel="noreferrer">CV ↗</a>
          <button className="btn btn-ghost" onClick={onOpenPalette}>
            <kbd>Ctrl</kbd><kbd>K</kbd> menu
          </button>
        </div>
      </div>
      <p className="hero-hint mono">move the cursor — the arm follows · click to grip</p>
      <a href="#about" className="scroll-cue" aria-label="Scroll down"><span /></a>
    </header>
  )
}
