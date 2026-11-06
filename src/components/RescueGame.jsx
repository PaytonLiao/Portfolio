import { useEffect, useRef, useState } from 'react'

/**
 * Browser remake of Payton's C game: steer the robot (arrows / WASD, or drag),
 * rescue people, dodge obstacles that multiply as the score rises,
 * eat a burger for an extra life. Press C for CRAZY mode.
 */
export default function RescueGame() {
  const canvasRef = useRef(null)
  const [hud, setHud] = useState({ score: 0, lives: 3, best: 0, over: false, crazy: false, started: false })
  const api = useRef({})

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = 480, H = 320, S = 16
    canvas.width = W
    canvas.height = H
    let best = 0
    try { best = +localStorage.getItem('rescue-best') || 0 } catch { /* storage unavailable */ }

    let st
    const keys = {}
    const rand = (n) => Math.floor(Math.random() * n)
    const free = () => ({ x: rand((W - S) / S) * S, y: rand((H - S) / S) * S })

    function reset(crazy = false) {
      st = {
        bot: { x: W / 2, y: H / 2 }, person: free(), obstacles: [], burger: null,
        score: 0, lives: 3, speed: 2.4, crazy, over: false, inv: 0, started: true, target: null, flash: 0,
      }
      sync()
    }
    function sync() {
      setHud({ score: st.score, lives: st.lives, best, over: st.over, crazy: st.crazy, started: st.started })
    }
    const hit = (a, b, pad = 0) => a.x < b.x + S - pad && a.x + S - pad > b.x && a.y < b.y + S - pad && a.y + S - pad > b.y

    function step() {
      if (!st.started || st.over) return
      const sp = st.speed * (st.crazy ? 1.6 : 1)
      let dx = (keys.ArrowRight || keys.d ? 1 : 0) - (keys.ArrowLeft || keys.a ? 1 : 0)
      let dy = (keys.ArrowDown || keys.s ? 1 : 0) - (keys.ArrowUp || keys.w ? 1 : 0)
      if (!dx && !dy && st.target) {
        const tx = st.target.x - S / 2 - st.bot.x, ty = st.target.y - S / 2 - st.bot.y
        const d = Math.hypot(tx, ty)
        if (d > 3) { dx = tx / d; dy = ty / d }
      }
      st.bot.x = Math.max(0, Math.min(W - S, st.bot.x + dx * sp))
      st.bot.y = Math.max(0, Math.min(H - S, st.bot.y + dy * sp))

      for (const o of st.obstacles) {
        o.x += o.vx; o.y += o.vy
        if (o.x < 0 || o.x > W - S) o.vx *= -1
        if (o.y < 0 || o.y > H - S) o.vy *= -1
      }

      if (hit(st.bot, st.person)) {
        st.score += 1
        st.person = free()
        const n = st.crazy ? 2 : 1
        for (let i = 0; i < n; i++) {
          let o
          do { o = free() } while (Math.hypot(o.x - st.bot.x, o.y - st.bot.y) < 80)
          const v = st.crazy ? 1.6 : 0.6 + st.score * 0.05
          o.vx = (Math.random() - 0.5) * v * 2
          o.vy = (Math.random() - 0.5) * v * 2
          st.obstacles.push(o)
        }
        if (st.score % 5 === 0) st.speed += 0.3
        if (!st.burger && Math.random() < 0.25) st.burger = free()
        st.flash = 8
        sync()
      }
      if (st.burger && hit(st.bot, st.burger)) {
        st.lives += 1
        st.burger = null
        sync()
      }
      if (st.inv > 0) st.inv -= 1
      else if (st.obstacles.some((o) => hit(st.bot, o, 3))) {
        st.lives -= 1
        st.inv = 60
        if (st.lives <= 0) {
          st.over = true
          if (st.score > best) {
            best = st.score
            try { localStorage.setItem('rescue-best', String(best)) } catch { /* ignore */ }
          }
        }
        sync()
      }
      if (st.flash) st.flash -= 1
    }

    function draw() {
      ctx.fillStyle = st.crazy ? '#1a0b12' : '#0c0d10'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      for (let x = 0; x < W; x += S) for (let y = 0; y < H; y += S) ctx.fillRect(x, y, 1, 1)
      if (st.flash) {
        ctx.fillStyle = `rgba(200,255,77,${st.flash / 40})`
        ctx.fillRect(0, 0, W, H)
      }
      // person
      ctx.fillStyle = '#7cc7ff'
      ctx.fillRect(st.person.x + 5, st.person.y, 6, 6)
      ctx.fillRect(st.person.x + 3, st.person.y + 7, 10, 9)
      // obstacles
      ctx.fillStyle = st.crazy ? '#ff4d8d' : '#ff7a45'
      for (const o of st.obstacles) ctx.fillRect(o.x + 2, o.y + 2, S - 4, S - 4)
      if (st.burger) {
        ctx.font = '15px serif'
        ctx.fillText('🍔', st.burger.x, st.burger.y + 14)
      }
      // robot
      if (!(st.inv && Math.floor(st.inv / 5) % 2)) {
        ctx.fillStyle = '#c8ff4d'
        ctx.fillRect(st.bot.x, st.bot.y, S, S)
        ctx.fillStyle = '#000'
        ctx.fillRect(st.bot.x + 3, st.bot.y + 4, 3, 3)
        ctx.fillRect(st.bot.x + 10, st.bot.y + 4, 3, 3)
        ctx.fillRect(st.bot.x + 4, st.bot.y + 11, 8, 2)
      }
    }

    let raf
    const loop = () => {
      step()
      draw()
      raf = requestAnimationFrame(loop)
    }

    st = { bot: { x: W / 2 - S / 2, y: H / 2 - S / 2 }, person: free(), obstacles: [], burger: null, score: 0, lives: 3, speed: 2.4, crazy: false, over: false, inv: 0, started: false, target: null, flash: 0 }
    sync()
    raf = requestAnimationFrame(loop)

    const down = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault()
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      keys[k] = true
      // a quick tap should still move the robot a little
      const nudge = { ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] }[k]
      if (nudge && st.started && !st.over && !e.repeat) {
        st.bot.x = Math.max(0, Math.min(W - S, st.bot.x + nudge[0] * S / 2))
        st.bot.y = Math.max(0, Math.min(H - S, st.bot.y + nudge[1] * S / 2))
      }
      if ((e.key === ' ' || e.key === 'Enter') && (!st.started || st.over)) reset(st.crazy)
      if (e.key.toLowerCase() === 'c') reset(!st.crazy)
    }
    const up = (e) => (keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = false)
    const toCanvas = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }
    }
    const pdown = (e) => {
      if (!st.started || st.over) reset(st.crazy)
      st.target = toCanvas(e)
      canvas.setPointerCapture(e.pointerId)
    }
    const pmove = (e) => { if (st.target) st.target = toCanvas(e) }
    const pup = () => (st.target = null)

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    canvas.addEventListener('pointerdown', pdown)
    canvas.addEventListener('pointermove', pmove)
    canvas.addEventListener('pointerup', pup)
    api.current = { start: () => reset(st.crazy), crazy: () => reset(!st.crazy) }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  return (
    <div className="game">
      <div className="game-hud mono">
        <span>rescued <b className="accent">{hud.score}</b></span>
        <span>lives {'♥'.repeat(Math.max(0, hud.lives))}</span>
        <span>best {hud.best}</span>
        <button className={`chip ${hud.crazy ? 'chip-hot' : ''}`} onClick={() => api.current.crazy()}>
          {hud.crazy ? 'CRAZY ON' : 'crazy mode (C)'}
        </button>
      </div>
      <div className="game-stage">
        <canvas ref={canvasRef} className="game-canvas" />
        {(!hud.started || hud.over) && (
          <button className="game-overlay" onClick={() => api.current.start()}>
            <span className="game-title">{hud.over ? `Game over — ${hud.score} rescued` : 'Robot Rescue'}</span>
            <span className="mono small">
              arrows / WASD or drag to move · reach the <span style={{ color: '#7cc7ff' }}>people</span> · dodge the{' '}
              <span style={{ color: '#ff7a45' }}>blocks</span> · 🍔 = extra life
            </span>
            <span className="btn btn-primary">{hud.over ? 'Play again' : 'Start'} ⏎</span>
          </button>
        )}
      </div>
    </div>
  )
}
