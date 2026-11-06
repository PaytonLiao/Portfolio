import { useEffect, useRef, useState } from 'react'

/* ---------- Google: multi-agent pipeline you can run ---------- */
const NODES = [
  { id: 'req', x: 40, y: 110, label: 'request', sub: '“test new ranking”' },
  { id: 'plan', x: 150, y: 110, label: 'planner', sub: 'splits the task' },
  { id: 'sql', x: 270, y: 40, label: 'SQL agent', sub: 'writes queries' },
  { id: 'syn', x: 270, y: 110, label: 'syntax agent', sub: 'config grammar' },
  { id: 'stat', x: 270, y: 180, label: 'stats agent', sub: 'picks the tests' },
  { id: 'val', x: 390, y: 110, label: 'backtest', sub: 'vs. history' },
  { id: 'out', x: 490, y: 110, label: 'config ✓', sub: 'validated' },
]
const EDGES = [
  ['req', 'plan'], ['plan', 'sql'], ['plan', 'syn'], ['plan', 'stat'],
  ['sql', 'val'], ['syn', 'val'], ['stat', 'val'], ['val', 'out'],
]
const STAGES = [['req'], ['plan'], ['sql', 'syn', 'stat'], ['val'], ['out']]

export function AgentsViz() {
  const [stage, setStage] = useState(-1)
  const [hover, setHover] = useState(null)
  const timer = useRef()
  const run = () => {
    clearTimeout(timer.current)
    let s = 0
    setStage(0)
    const next = () => {
      s += 1
      if (s < STAGES.length) {
        setStage(s)
        timer.current = setTimeout(next, 650)
      }
    }
    timer.current = setTimeout(next, 650)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  const lit = new Set(STAGES.slice(0, stage + 1).flat())
  const pos = Object.fromEntries(NODES.map((n) => [n.id, n]))
  const shown = hover ? pos[hover] : null

  return (
    <div className="viz">
      <div className="viz-bar mono">
        <span>multi-agent config pipeline</span>
        <button className="chip chip-on" onClick={run}>{stage >= STAGES.length - 1 ? '↻ run again' : '▶ run'}</button>
      </div>
      <svg viewBox="0 0 530 220" className="agents-svg" role="img" aria-label="Diagram: a planner agent hands work to SQL, syntax and statistics agents, whose output is backtested before a configuration is produced.">
        {EDGES.map(([a, b]) => {
          const on = lit.has(a) && lit.has(b)
          return (
            <path
              key={a + b}
              d={`M${pos[a].x},${pos[a].y} C${(pos[a].x + pos[b].x) / 2},${pos[a].y} ${(pos[a].x + pos[b].x) / 2},${pos[b].y} ${pos[b].x},${pos[b].y}`}
              className={`edge ${on ? 'edge-on' : ''}`}
            />
          )
        })}
        {NODES.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x},${n.y})`}
            className={`node ${lit.has(n.id) ? 'node-on' : ''}`}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
          >
            <circle r="15" />
            <text y="34" textAnchor="middle">{n.label}</text>
          </g>
        ))}
      </svg>
      <p className="viz-caption mono">
        {shown ? `${shown.label} — ${shown.sub}` : stage >= STAGES.length - 1 ? 'config generated and backtested — 99.8% less time than doing it by hand.' : 'press run, or hover a node'}
      </p>
    </div>
  )
}

/* ---------- MathWorks: a leaderboard that re-ranks by benchmark ---------- */
const MODELS = ['model-α', 'model-β', 'model-γ', 'model-δ', 'model-ε']
const BENCH = {
  'code gen': [71, 84, 62, 77, 58],
  reasoning: [80, 66, 74, 59, 70],
  'MATLAB Q&A': [64, 72, 88, 61, 75],
}
export function LeaderboardViz() {
  const [bench, setBench] = useState('code gen')
  const scores = BENCH[bench]
  const order = [...MODELS.keys()].sort((a, b) => scores[b] - scores[a])
  const rank = Object.fromEntries(order.map((m, r) => [m, r]))
  return (
    <div className="viz">
      <div className="viz-bar mono">
        <span>leaderboard · illustrative</span>
        <div className="chips">
          {Object.keys(BENCH).map((b) => (
            <button key={b} className={`chip ${b === bench ? 'chip-on' : ''}`} onClick={() => setBench(b)}>{b}</button>
          ))}
        </div>
      </div>
      <div className="board" style={{ height: MODELS.length * 40 }}>
        {MODELS.map((m, i) => (
          <div key={m} className="board-row" style={{ transform: `translateY(${rank[i] * 40}px)` }}>
            <span className="board-rank mono">#{rank[i] + 1}</span>
            <span className="board-name mono">{m}</span>
            <span className="board-track">
              <span className={`board-fill ${rank[i] === 0 ? 'board-top' : ''}`} style={{ width: `${scores[i]}%` }} />
            </span>
            <span className="board-score mono">{scores[i]}</span>
          </div>
        ))}
      </div>
      <p className="viz-caption mono">switch the benchmark and the “best” model changes — which is why the leaderboard mattered.</p>
    </div>
  )
}

/* ---------- UCL: hyperspectral bands + super-resolution wipe ---------- */
export function SpectralViz() {
  const canvas = useRef(null)
  const [nm, setNm] = useState(620)
  const [split, setSplit] = useState(50)

  useEffect(() => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    const W = 240, H = 150
    c.width = W
    c.height = H
    const img = ctx.createImageData(W, H)
    const band = (nm - 400) / 600 // 0..1
    const [r, g, b] = wavelengthToRgb(nm)
    const field = (x, y) => {
      // vessels + tissue texture; different structures dominate at different wavelengths
      const vessel = Math.abs(Math.sin(x * 0.05 + Math.sin(y * 0.04) * 2.2)) < 0.12 ? 1 : 0
      const vessel2 = Math.abs(Math.sin(y * 0.07 + Math.cos(x * 0.03) * 1.6)) < 0.08 ? 1 : 0
      const tex = 0.5 + 0.25 * Math.sin(x * 0.21) * Math.cos(y * 0.17) + 0.15 * Math.sin((x + y) * 0.09)
      const v = tex * (0.6 + 0.4 * band) - vessel * (1 - band) * 0.7 - vessel2 * band * 0.5
      return Math.max(0, Math.min(1, v))
    }
    const cut = (split / 100) * W
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const low = x < cut
        const sx = low ? Math.floor(x / 10) * 10 + 5 : x
        const sy = low ? Math.floor(y / 10) * 10 + 5 : y
        const v = field(sx, sy)
        const i = (y * W + x) * 4
        img.data[i] = r * v
        img.data[i + 1] = g * v
        img.data[i + 2] = b * v
        img.data[i + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)
    ctx.fillStyle = '#fff'
    ctx.fillRect(cut - 0.5, 0, 1, H)
  }, [nm, split])

  return (
    <div className="viz">
      <div className="viz-bar mono">
        <span>hyperspectral SR · illustrative</span>
        <span className="accent">{nm} nm</span>
      </div>
      <div className="spectral">
        <canvas ref={canvas} className="spectral-canvas" aria-label="Synthetic tissue image: low resolution on the left, super-resolved on the right" />
        <span className="spectral-l mono">low-res</span>
        <span className="spectral-r mono">super-res</span>
        <input type="range" min="0" max="100" value={split} onChange={(e) => setSplit(+e.target.value)} className="spectral-split" aria-label="Compare low and super resolution" />
      </div>
      <label className="spectral-band mono">
        wavelength
        <input type="range" min="400" max="1000" step="5" value={nm} onChange={(e) => setNm(+e.target.value)} aria-label="Wavelength band" />
      </label>
      <p className="viz-caption mono">a hyperspectral image has hundreds of bands; each shows different tissue. drag both sliders.</p>
    </div>
  )
}

function wavelengthToRgb(nm) {
  let r = 0, g = 0, b = 0
  if (nm < 440) [r, g, b] = [-(nm - 440) / 40, 0, 1]
  else if (nm < 490) [r, g, b] = [0, (nm - 440) / 50, 1]
  else if (nm < 510) [r, g, b] = [0, 1, -(nm - 510) / 20]
  else if (nm < 580) [r, g, b] = [(nm - 510) / 70, 1, 0]
  else if (nm < 645) [r, g, b] = [1, -(nm - 645) / 65, 0]
  else if (nm <= 780) [r, g, b] = [1, 0, 0]
  else {
    // near-infrared: show as a warm false colour
    const k = (nm - 780) / 220
    ;[r, g, b] = [1, 0.35 + k * 0.4, 0.55 + k * 0.45]
  }
  return [r * 255, g * 255, b * 255]
}
