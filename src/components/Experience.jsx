import { useEffect, useState } from 'react'
import { experience } from '../data'
import { useCountUp, useInView } from '../hooks'
import { AgentsViz, LeaderboardViz, SpectralViz } from './ExperienceVisuals'

const VIS = { agents: AgentsViz, leaderboard: LeaderboardViz, spectral: SpectralViz }

function Metric({ m }) {
  const [ref, seen] = useInView(0.4)
  const v = useCountUp(m.value, seen)
  const decimals = m.value % 1 ? 1 : 0
  return (
    <div className="xp-metric" ref={ref}>
      <span className="xp-metric-num">
        {m.text ?? v.toFixed(decimals)}
        <span className="accent">{m.suffix}</span>
      </span>
      <span className="xp-metric-label">{m.label}</span>
    </div>
  )
}

export default function Experience({ highlight, focus }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const i = experience.findIndex((e) => e.id === focus?.id)
    if (i >= 0) setActive(i)
  }, [focus])
  const job = experience[active]
  const Visual = VIS[job.visual]

  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setActive((a) => (a + 1) % experience.length)
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setActive((a) => (a - 1 + experience.length) % experience.length)
  }

  return (
    <section className="section wrap" id="experience">
      <div className="section-head" data-reveal>
        <span className="section-index mono">02</span>
        <h2>Experience</h2>
        <p className="section-sub">Three internships across industry and research. Pick one — each comes with a small demo.</p>
      </div>

      <div className="xp" data-reveal>
        <div className="xp-tabs" role="tablist" aria-label="Internships" onKeyDown={onKey}>
          {experience.map((e, i) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              className={`xp-tab ${i === active ? 'is-active' : ''} ${highlight?.includes(e.id) ? 'is-lit' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="xp-tab-period mono">{e.period}</span>
              <span className="xp-tab-company">{e.company}</span>
              <span className="xp-tab-role">{e.role}</span>
            </button>
          ))}
        </div>

        <article className="xp-panel" key={job.id} role="tabpanel">
          <header className="xp-head">
            <div>
              <h3>{job.role} <span className="muted">@ {job.company}</span></h3>
              <p className="mono muted small">{job.period} · {job.place}</p>
            </div>
            <Metric m={job.metric} />
          </header>
          <p className="xp-summary">{job.summary}</p>
          <div className="xp-body">
            <ul className="xp-points">
              {job.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <Visual />
          </div>
          <div className="tags">
            {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </article>
      </div>
    </section>
  )
}
