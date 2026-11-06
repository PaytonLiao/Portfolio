import { useEffect, useRef } from 'react'

/** A soft ring that trails the pointer and grows over interactive elements. Desktop only. */
export default function Cursor() {
  const ring = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ring.current
    el.style.display = 'block'
    let x = -100, y = -100, cx = -100, cy = -100, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      const hot = e.target.closest?.('a,button,input,textarea,[role="tab"]')
      el.classList.toggle('is-hot', !!hot)
    }
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      el.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
    }
  }, [])
  return <div ref={ring} className="cursor" aria-hidden="true" />
}
