import { nameOf, skills } from '../data'

export default function Skills({ active, onHover, onJump }) {
  const usedBy = active ? skills.flatMap((g) => g.items).find((s) => s.name === active)?.used ?? [] : []
  return (
    <section className="section wrap" id="skills">
      <div className="section-head" data-reveal>
        <span className="section-index mono">04</span>
        <h2>Skills</h2>
        <p className="section-sub">Hover or tap a skill to see where I actually used it, then jump straight there.</p>
      </div>

      <div className="skills" data-reveal onMouseLeave={() => onHover(null)}>
        {skills.map((g) => (
          <div key={g.group} className="skill-group">
            <h3 className="mono small muted">{g.group}</h3>
            <div className="skill-list">
              {g.items.map((s) => (
                <button
                  key={s.name}
                  className={`skill ${active === s.name ? 'is-active' : ''}`}
                  onMouseEnter={() => onHover(s.name)}
                  onFocus={() => onHover(s.name)}
                  onClick={() => onHover(s.name)}
                >
                  {s.name}
                  <span className="skill-n mono">{s.used.length}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="skill-readout mono" aria-live="polite">
          {active ? (
            <>
              <span className="muted">{active} →</span>{' '}
              {usedBy.map((id) => (
                <button key={id} className="skill-hit" onClick={() => onJump(id)}>{nameOf(id)} ↗</button>
              ))}
            </>
          ) : (
            <span className="muted">nothing selected</span>
          )}
        </div>
      </div>
    </section>
  )
}
