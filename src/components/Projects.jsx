import { useEffect, useRef, useState } from 'react'
import { archive, projects } from '../data'
import ProjectArt from './ProjectArt'
import RescueGame from './RescueGame'

const FILTERS = [
  ['all', 'All'],
  ['research', 'Research'],
  ['robotics', 'Robotics'],
  ['ai', 'AI'],
  ['fun', 'Just for fun'],
]

function Card({ p, index, onOpen, dim, lit }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    ref.current.style.setProperty('--sx', `${x}px`)
    ref.current.style.setProperty('--sy', `${y}px`)
    ref.current.style.setProperty('--rx', `${((y / r.height) - 0.5) * -6}deg`)
    ref.current.style.setProperty('--ry', `${((x / r.width) - 0.5) * 6}deg`)
  }
  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }
  return (
    <button
      ref={ref}
      className={`card ${p.featured ? 'card-wide' : ''} ${dim ? 'is-dim' : ''} ${lit ? 'is-lit' : ''}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => onOpen(p)}
      style={{ '--i': index }}
    >
      <div className="card-media">
        {p.image ? <img src={p.image} alt="" loading="lazy" /> : <ProjectArt kind={p.art} />}
        {p.badge && <span className="card-badge mono">{p.badge}</span>}
      </div>
      <div className="card-body">
        <span className="card-kicker mono">{p.kicker} · {p.year}</span>
        <h3>{p.title}</h3>
        <p>{p.blurb}</p>
        <span className="card-more mono">{p.playable ? 'play it →' : 'open →'}</span>
      </div>
    </button>
  )
}

function Modal({ p, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const prev = document.activeElement
    dialogRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <span className="card-kicker mono">{p.kicker} · {p.year}</span>
        <h3 className="modal-title">{p.title}</h3>
        {p.playable ? (
          <RescueGame />
        ) : p.image ? (
          <img className="modal-img" src={p.image} alt={`${p.title} screenshot`} />
        ) : (
          <div className="modal-art"><ProjectArt kind={p.art} /></div>
        )}
        <div className="modal-text">
          {p.detail.map((d) => <p key={d}>{d}</p>)}
        </div>
        <div className="tags">{p.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
        <div className="modal-links">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn">{l.label} ↗</a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ highlight, openId, onOpened }) {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!openId) return
    setOpen(projects.find((p) => p.id === openId) ?? null)
    onOpened?.()
  }, [openId, onOpened])

  const visible = projects.filter((p) => filter === 'all' || p.filter.includes(filter))

  return (
    <section className="section wrap" id="work">
      <div className="section-head" data-reveal>
        <span className="section-index mono">03</span>
        <h2>Selected work</h2>
        <p className="section-sub">Research, robots, a hackathon win, and one game you can play right here.</p>
      </div>

      <div className="chips filters" role="group" aria-label="Filter projects" data-reveal>
        {FILTERS.map(([id, label]) => (
          <button key={id} className={`chip ${filter === id ? 'chip-on' : ''}`} onClick={() => setFilter(id)} aria-pressed={filter === id}>
            {label}
            <span className="chip-count">{id === 'all' ? projects.length : projects.filter((p) => p.filter.includes(id)).length}</span>
          </button>
        ))}
      </div>

      <div className="grid">
        {visible.map((p, i) => (
          <Card
            key={p.id}
            p={p}
            index={i}
            onOpen={setOpen}
            lit={highlight?.includes(p.id)}
            dim={highlight && !highlight.includes(p.id)}
          />
        ))}
      </div>

      <div className="archive" data-reveal>
        <span className="mono muted small">also in the archive</span>
        <ul>
          {archive.map((a) => (
            <li key={a.title}>
              <a href={a.href} target="_blank" rel="noreferrer">
                <span>{a.title}</span>
                <span className="mono muted small">{a.note}</span>
                <span className="archive-arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {open && <Modal p={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
