import { useRef } from 'react'
import { profile } from '../data'
import { useCountUp, useInView } from '../hooks'

function Stat({ value, suffix = '', decimals = 0, label, text }) {
  const [ref, seen] = useInView(0.5)
  const v = useCountUp(value, seen)
  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">
        {text ?? v.toFixed(decimals)}
        <span className="accent">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function About() {
  const frame = useRef(null)
  const onMove = (e) => {
    const r = frame.current.getBoundingClientRect()
    frame.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    frame.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <section className="section about wrap" id="about">
      <div className="section-head" data-reveal>
        <span className="section-index mono">01</span>
        <h2>About</h2>
      </div>

      <div className="about-grid">
        <div
          className="portrait"
          ref={frame}
          onPointerMove={onMove}
          onPointerLeave={() => frame.current.style.setProperty('--mx', '-50%')}
          data-reveal
        >
          <img src={profile.photo} alt="Payton Liao" className="portrait-base" loading="lazy" />
          <img src={profile.photo} alt="" aria-hidden="true" className="portrait-reveal" loading="lazy" />
          <div className="portrait-scan" />
          <span className="portrait-tag mono">subject: payton · hover to scan</span>
        </div>

        <div className="about-copy" data-reveal>
          <p className="lede">
            I’m a final-year <strong>MEng Robotics &amp; AI</strong> student at UCL, from Taiwan and based in London. I like the
            space where machine learning meets the physical world.
          </p>
          <p>
            That’s taken me through three very different labs. At <strong>Google</strong> I built multi-agent LLM systems
            that write production A/B-test configs. At <strong>MathWorks</strong> I built the leaderboard that picks the
            foundation models behind MATLAB Copilot. At UCL’s <strong>Surgical Robot Vision</strong> group I worked on
            hyperspectral super-resolution. My own research asks how a robot can learn what its body is, the way a toddler
            does — by touching itself and being curious about it.
          </p>
          <p className="muted">
            Off-screen I co-founded the UCL baseball team, where I’m also welfare officer.
          </p>

          <div className="stats">
            <Stat value={3} label="research & industry internships" />
            <Stat value={99.8} decimals={1} suffix="%" label="cut in config creation time at Google" />
            <Stat text="1st" label="of 100+ at AI Hackathon London" />
          </div>
        </div>
      </div>
    </section>
  )
}
