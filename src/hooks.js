import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Adds .in to every [data-reveal] element as it scrolls into view. */
export function useRevealAll() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

/** Text that "decodes" from random glyphs into its final value. */
export function useScramble(text, { delay = 0, speed = 28 } = {}) {
  const [out, setOut] = useState(prefersReducedMotion() ? text : '')
  useEffect(() => {
    if (prefersReducedMotion()) {
      setOut(text)
      return
    }
    const glyphs = '!<>-_\\/[]{}—=+*^?#01'
    let frame = 0
    let raf
    const total = text.length * 2 + 10
    const start = performance.now() + delay
    const tick = (t) => {
      if (t < start) {
        raf = requestAnimationFrame(tick)
        return
      }
      frame = Math.floor((t - start) / speed)
      const s = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (frame > i * 2 + 6) return ch
          if (frame > i * 2) return glyphs[(Math.random() * glyphs.length) | 0]
          return ''
        })
        .join('')
      setOut(s)
      if (frame < total) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, speed])
  return out
}

/** Counts a number up once it is visible. */
export function useCountUp(target, seen, ms = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen || typeof target !== 'number') return
    if (prefersReducedMotion()) {
      setV(target)
      return
    }
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms)
      const eased = 1 - Math.pow(1 - k, 4)
      setV(target * eased)
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, seen, ms])
  return v
}
