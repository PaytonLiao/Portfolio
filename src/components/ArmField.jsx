import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks'

/**
 * A planar robot arm (solved with FABRIK inverse kinematics) that reaches for
 * the cursor, above a grid of "tactile sensors" that light up near the gripper.
 * Click / tap to close the gripper and send a pulse through the sensor skin.
 */
export default function ArmField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()
    let w = 0, h = 0, dpr = 1
    let base = { x: 0, y: 0 }
    let lengths = []
    let joints = []
    let dots = []
    const pointer = { x: 0, y: 0, active: false, lastMove: 0 }
    const tip = { x: 0, y: 0 }
    let grip = 0 // 0 open, 1 closed
    let gripTarget = 0
    const pulses = []
    let raf
    let t = 0

    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--accent').trim() || '#c8ff4d'
    const ink = css.getPropertyValue('--ink').trim() || '#f2f1ec'
    const accentRGB = hexToRgb(accent)

    function layout() {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const narrow = w < 760
      base = narrow ? { x: w * 0.82, y: h + 6 } : { x: w * 0.74, y: h + 10 }
      const reach = narrow ? Math.min(h * 0.62, w * 0.95) : Math.min(h * 0.86, w * 0.55)
      const ratios = [0.38, 0.32, 0.2, 0.1]
      lengths = ratios.map((k) => k * reach)
      joints = [{ ...base }]
      let y = base.y
      lengths.forEach((L) => {
        y -= L
        joints.push({ x: base.x, y })
      })
      tip.x = base.x - reach * 0.4
      tip.y = h * 0.4

      const gap = narrow ? 26 : 32
      dots = []
      for (let gy = gap / 2; gy < h; gy += gap)
        for (let gx = gap / 2; gx < w; gx += gap) dots.push({ x: gx, y: gy, e: 0 })
    }

    function fabrik(target) {
      const total = lengths.reduce((a, b) => a + b, 0)
      const dx = target.x - base.x, dy = target.y - base.y
      const dist = Math.hypot(dx, dy)
      if (dist > total) {
        for (let i = 0; i < lengths.length; i++) {
          const k = lengths.slice(0, i + 1).reduce((a, b) => a + b, 0) / dist
          joints[i + 1] = { x: base.x + dx * k, y: base.y + dy * k }
        }
        return
      }
      for (let iter = 0; iter < 8; iter++) {
        joints[joints.length - 1] = { ...target }
        for (let i = joints.length - 2; i >= 0; i--) {
          const a = joints[i], b = joints[i + 1]
          const d = Math.hypot(a.x - b.x, a.y - b.y) || 1
          const k = lengths[i] / d
          joints[i] = { x: b.x + (a.x - b.x) * k, y: b.y + (a.y - b.y) * k }
        }
        joints[0] = { ...base }
        for (let i = 0; i < joints.length - 1; i++) {
          const a = joints[i], b = joints[i + 1]
          const d = Math.hypot(a.x - b.x, a.y - b.y) || 1
          const k = lengths[i] / d
          joints[i + 1] = { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
        }
      }
    }

    function frame(now) {
      t = now / 1000
      ctx.clearRect(0, 0, w, h)

      // target: pointer if recently moved, otherwise an idle figure-eight
      const idle = !pointer.active || now - pointer.lastMove > 3500
      const target = idle
        ? { x: base.x - w * 0.22 + Math.sin(t * 0.6) * w * 0.14, y: h * 0.45 + Math.sin(t * 1.2) * h * 0.14 }
        : { x: pointer.x, y: pointer.y }
      const ease = reduce ? 1 : 0.09
      tip.x += (target.x - tip.x) * ease
      tip.y += (target.y - tip.y) * ease
      fabrik(tip)
      grip += (gripTarget - grip) * 0.25

      // tactile skin
      const end = joints[joints.length - 1]
      for (const d of dots) {
        const dist = Math.hypot(d.x - end.x, d.y - end.y)
        let e = Math.max(0, 1 - dist / 150)
        for (const p of pulses) {
          const ring = Math.abs(Math.hypot(d.x - p.x, d.y - p.y) - p.r)
          if (ring < 22) e = Math.max(e, (1 - ring / 22) * p.life)
        }
        d.e += (e - d.e) * 0.18
        const a = 0.1 + d.e * 0.9
        const size = 1.1 + d.e * 2.4
        ctx.fillStyle = d.e > 0.04 ? `rgba(${accentRGB},${a})` : 'rgba(255,255,255,0.09)'
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size)
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].r += 9
        pulses[i].life *= 0.965
        if (pulses[i].life < 0.03) pulses.splice(i, 1)
      }

      // reach guide from tip to cursor
      if (!idle) {
        ctx.setLineDash([3, 6])
        ctx.strokeStyle = `rgba(${accentRGB},0.35)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(end.x, end.y)
        ctx.lineTo(pointer.x, pointer.y)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // links
      for (let i = 0; i < joints.length - 1; i++) {
        const a = joints[i], b = joints[i + 1]
        const width = 22 - i * 5
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#1b1d22'
        ctx.lineWidth = width + 4
        line(a, b)
        ctx.strokeStyle = i % 2 ? '#2a2d33' : '#23262c'
        ctx.lineWidth = width
        line(a, b)
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        line(offset(a, b, -width / 2 + 2), offset(b, a, width / 2 - 2, true))
      }
      // joints
      joints.slice(0, -1).forEach((j, i) => {
        const r = 13 - i * 2.5
        ctx.fillStyle = '#0f1013'
        circle(j.x, j.y, r + 3)
        ctx.strokeStyle = accent
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(j.x, j.y, r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = accent
        circle(j.x, j.y, 2.5)
      })

      // gripper
      const prev = joints[joints.length - 2]
      const ang = Math.atan2(end.y - prev.y, end.x - prev.x)
      ctx.save()
      ctx.translate(end.x, end.y)
      ctx.rotate(ang)
      ctx.fillStyle = '#23262c'
      ctx.fillRect(-4, -12, 10, 24)
      const open = 11 - grip * 8
      ctx.strokeStyle = ink
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(6, -open); ctx.lineTo(20, -open); ctx.lineTo(26, -open + 4 + grip * 2)
      ctx.moveTo(6, open); ctx.lineTo(20, open); ctx.lineTo(26, open - 4 - grip * 2)
      ctx.stroke()
      ctx.restore()

      if (!reduce) raf = requestAnimationFrame(frame)
    }

    function line(a, b) {
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    function circle(x, y, r) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    function offset(a, b, d) {
      const ang = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2
      return { x: a.x + Math.cos(ang) * d, y: a.y + Math.sin(ang) * d }
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const p = e.touches ? e.touches[0] : e
      pointer.x = p.clientX - r.left
      pointer.y = p.clientY - r.top
      pointer.active = pointer.y >= 0 && pointer.y <= r.height
      pointer.lastMove = performance.now()
    }
    const onDown = (e) => {
      if (e.target.closest('a,button,input,textarea')) return
      onMove(e)
      if (!pointer.active) return
      gripTarget = 1
      const end = joints[joints.length - 1]
      pulses.push({ x: end.x, y: end.y, r: 0, life: 1 })
      if (reduce) frame(performance.now())
    }
    const onUp = () => (gripTarget = 0)

    layout()
    const ro = new ResizeObserver(() => {
      layout()
      if (reduce) frame(performance.now())
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return <canvas ref={canvasRef} className="arm-field" aria-hidden="true" />
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}
