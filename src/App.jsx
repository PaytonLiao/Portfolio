import { useCallback, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CommandPalette from './components/CommandPalette'
import Cursor from './components/Cursor'
import { experience, skills } from './data'
import { useRevealAll } from './hooks'

export default function App() {
  const [palette, setPalette] = useState(false)
  const [skill, setSkill] = useState(null)
  const [openProject, setOpenProject] = useState(null)
  const [xpFocus, setXpFocus] = useState(null)
  useRevealAll()

  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName)
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setPalette((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const jump = useCallback((id) => {
    if (experience.some((e) => e.id === id)) {
      setXpFocus({ id, at: Date.now() })
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setOpenProject(id)
    }
  }, [])

  const onAction = useCallback(
    (a) => {
      if (a.type === 'scroll') document.getElementById(a.id)?.scrollIntoView({ behavior: 'smooth' })
      else jump(a.id)
    },
    [jump],
  )

  const highlight = skill ? skills.flatMap((g) => g.items).find((s) => s.name === skill)?.used : null
  const clearOpen = useCallback(() => setOpenProject(null), [])

  return (
    <>
      <Cursor />
      <Nav onOpenPalette={() => setPalette(true)} />
      <main>
        <Hero onOpenPalette={() => setPalette(true)} />
        <About />
        <Experience highlight={highlight} focus={xpFocus} />
        <Projects highlight={highlight} openId={openProject} onOpened={clearOpen} />
        <Skills active={skill} onHover={setSkill} onJump={jump} />
        <Contact />
      </main>
      <CommandPalette open={palette} onClose={() => setPalette(false)} onAction={onAction} />
    </>
  )
}
