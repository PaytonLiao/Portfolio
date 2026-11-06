import { useEffect, useMemo, useRef, useState } from 'react'
import { experience, profile, projects } from '../data'

export default function CommandPalette({ open, onClose, onAction }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef(null)

  const commands = useMemo(
    () => [
      { label: 'Play Robot Rescue', hint: 'game', run: () => onAction({ type: 'project', id: 'rescue' }) },
      ...['about', 'experience', 'work', 'skills', 'contact'].map((id) => ({
        label: `Go to ${id[0].toUpperCase()}${id.slice(1)}`, hint: 'section', run: () => onAction({ type: 'scroll', id }),
      })),
      ...experience.map((e) => ({ label: `${e.company} — ${e.role}`, hint: 'experience', run: () => onAction({ type: 'xp', id: e.id }) })),
      ...projects.filter((p) => !p.playable).map((p) => ({ label: p.title, hint: 'project', run: () => onAction({ type: 'project', id: p.id }) })),
      { label: 'Copy email address', hint: 'contact', run: () => navigator.clipboard?.writeText(profile.email) },
      { label: 'Open CV (PDF)', hint: 'link', run: () => window.open(profile.cv, '_blank') },
      { label: 'Open GitHub', hint: 'link', run: () => window.open(profile.github, '_blank') },
      { label: 'Open LinkedIn', hint: 'link', run: () => window.open(profile.linkedin, '_blank') },
    ],
    [onAction],
  )

  const list = commands.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      setTimeout(() => input.current?.focus(), 10)
    }
  }, [open])
  useEffect(() => setSel(0), [q])

  if (!open) return null
  const choose = (c) => {
    onClose()
    setTimeout(c.run, 30)
  }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)) }
    if (e.key === 'Enter' && list[sel]) choose(list[sel])
    if (e.key === 'Escape') onClose()
  }

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <span className="accent mono">›</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Jump to… (try “game”, “google”, “cv”)"
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list" role="listbox">
          {list.map((c, i) => (
            <li key={c.label} role="option" aria-selected={i === sel}>
              <button className={i === sel ? 'is-sel' : ''} onMouseEnter={() => setSel(i)} onClick={() => choose(c)}>
                <span>{c.label}</span>
                <span className="mono muted small">{c.hint}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className="muted mono small palette-empty">no matches</li>}
        </ul>
      </div>
    </div>
  )
}
