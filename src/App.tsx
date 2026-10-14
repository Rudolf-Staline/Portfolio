import { useEffect, useRef, useState } from 'react'
import { competitions } from './data/competitions'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'
import { contact, profile } from './data/profile'
import type { Project } from './data/types'

const slides = [
  { id: 'accueil', label: 'Présentation' },
  { id: 'apropos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'competitions', label: 'Compétitions' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
] as const

function slideFromHash() {
  const index = slides.findIndex(slide => `#${slide.id}` === window.location.hash)
  return index < 0 ? 0 : index
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

/** Abstract illustrations, not screenshots or measured project results. */
function ProjectVisual({ project }: { project: Project }) {
  const kind = project.visual ?? 'code'
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      {kind === 'simulation' ? (
        <svg viewBox="0 0 360 210" fill="none">
          <path d="M35 170H330M35 35V170" stroke="currentColor" opacity=".18" />
          {[12, 22, 40, 69, 104, 125, 110, 86, 58, 36, 22, 12].map((height, i) => <rect key={i} x={54 + i * 21} y={170 - height} width="15" height={height} rx="3" fill={i > 7 ? '#c69329' : '#efc75e'} />)}
          <path d="M52 153C105 152 112 50 179 52C220 53 242 120 307 147" stroke="#25241f" strokeWidth="2" strokeDasharray="4 5" />
        </svg>
      ) : kind === 'calendar' ? (
        <div className="calendar-art"><div className="calendar-head"><span /> <span /> <span /></div><div className="calendar-grid">{Array.from({ length: 20 }, (_, i) => <div key={i}>{[2, 5, 7, 11, 16].includes(i) && <span className={`event event-${i % 3}`} />}</div>)}</div></div>
      ) : kind === 'journal' ? (
        <div className="journal-art"><span className="journal-sun" /><div /><div /><div /><span className="journal-dot" /></div>
      ) : kind === 'signal' ? (
        <svg viewBox="0 0 360 210" fill="none"><path d="M30 60H330M30 105H330M30 150H330" stroke="currentColor" opacity=".1"/><path d="M25 108C40 108 42 45 61 45S81 167 103 167S128 54 150 54S173 147 198 147S221 73 246 73S276 130 302 130S318 104 336 104" stroke="#655984" strokeWidth="3"/><path d="M25 115C54 115 79 81 104 81S154 132 182 132S231 92 260 92S307 115 336 115" stroke="#c3b2d2" strokeWidth="2"/></svg>
      ) : kind === 'vision' ? (
        <svg viewBox="0 0 360 210" fill="none"><path d="M150 20V190M210 20V190M30 75H330M30 135H330" stroke="#bcc5b3" strokeWidth="15"/><path d="M180 25V65M180 145V185M35 105H125M235 105H325" stroke="#fff" strokeWidth="2" strokeDasharray="8 8"/>{[[120, 45], [212, 139], [255, 68]].map(([x, y], i) => <g key={i}><rect x={x} y={y} width="24" height="32" rx="4" fill="#698566"/><rect x={x - 6} y={y - 6} width="36" height="44" rx="3" stroke="#334d30" strokeDasharray="4 3"/></g>)}</svg>
      ) : kind === 'model' ? (
        <svg viewBox="0 0 360 210" fill="none">{[[65, 65], [65, 145]].flatMap(([x, y]) => [[180, 45], [180, 105], [180, 165]].map(([a, b]) => <path key={`${y}-${b}`} d={`M${x} ${y}L${a} ${b}L295 105`} stroke="#a7b9ab"/>))}{[[65, 65], [65, 145], [180, 45], [180, 105], [180, 165], [295, 105]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 5 ? 18 : 12} fill={i === 5 ? '#e5be5e' : '#7c9b88'} stroke="#f2f5ed" strokeWidth="5"/>)}</svg>
      ) : (
        <div className="code-art"><span /><span /><span /><span /><span /><span /></div>
      )}
      <span className="visual-caption">Illustration du projet</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [slideIndex, setSlideIndex] = useState(slideFromHash)
  const activeSlide = slides[slideIndex]
  const deck = useRef<HTMLElement>(null)
  const touchStart = useRef<{ x: number; y: number; atTop: boolean; atBottom: boolean } | null>(null)
  const scrollEntry = useRef<'start' | 'end'>('start')
  const wheelGesture = useRef({ last: 0, total: 0, direction: 0, consumed: false, internal: false, lockedUntil: 0 })
  const navigateTo = (index: number, entry: 'start' | 'end' = 'start') => {
    scrollEntry.current = entry
    const next = Math.max(0, Math.min(slides.length - 1, index))
    setSlideIndex(next)
    setMenuOpen(false)
    const hash = `#${slides[next].id}`
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)
  }

  useEffect(() => {
    const syncHash = () => { setSlideIndex(slideFromHash()); setMenuOpen(false) }
    const followAnchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      const target = event.target instanceof Element ? event.target.closest('a') : null
      const hash = target?.getAttribute('href')
      const index = slides.findIndex(slide => `#${slide.id}` === hash)
      if (index < 0) return
      event.preventDefault()
      navigateTo(index)
    }
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    document.addEventListener('click', followAnchor)
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
      document.removeEventListener('click', followAnchor)
    }
  }, [])

  useEffect(() => {
    const section = deck.current?.querySelector<HTMLElement>(`#${activeSlide.id}`)
    if (section) section.scrollTop = scrollEntry.current === 'end' ? section.scrollHeight - section.clientHeight : 0
    scrollEntry.current = 'start'
    deck.current?.focus({ preventScroll: true })
  }, [activeSlide.id])

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (selected || menuOpen || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) return
      const next = event.key === 'ArrowRight' || event.key === 'PageDown' ? slideIndex + 1
        : event.key === 'ArrowLeft' || event.key === 'PageUp' ? slideIndex - 1
        : event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : null
      if (next !== null) { event.preventDefault(); navigateTo(next) }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [slideIndex, selected, menuOpen])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (selected || menuOpen || event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return
      const section = deck.current?.querySelector<HTMLElement>(`#${activeSlide.id}`)
      if (!section || !event.deltaY) return
      const now = performance.now()
      const gesture = wheelGesture.current
      const direction = Math.sign(event.deltaY)
      // A gesture is consumed once, including its trackpad momentum tail.
      if (now - gesture.last > 180 || gesture.direction !== direction) {
        gesture.total = 0
        gesture.consumed = false
        gesture.internal = false
      }
      gesture.last = now
      gesture.direction = direction
      if (gesture.consumed || now < gesture.lockedUntil) {
        gesture.consumed = true
        event.preventDefault()
        return
      }
      const canScroll = direction > 0
        ? section.scrollTop + section.clientHeight < section.scrollHeight - 2
        : section.scrollTop > 2
      if (canScroll) {
        gesture.internal = true
        gesture.total = 0
        // The pointer may be over the header or the controls rather than the slide.
        if (!(event.target instanceof Node) || !section.contains(event.target)) {
          event.preventDefault()
          const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? section.clientHeight : 1
          section.scrollTop += event.deltaY * unit
        }
        return
      }
      event.preventDefault()
      if (gesture.internal) { gesture.consumed = true; return }
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? section.clientHeight : 1
      gesture.total += event.deltaY * unit
      if (Math.abs(gesture.total) < 40) return
      const next = slideIndex + direction
      if (next < 0 || next >= slides.length) return
      gesture.consumed = true
      gesture.lockedUntil = now + 700
      navigateTo(next, direction < 0 ? 'end' : 'start')
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [slideIndex, activeSlide.id, selected, menuOpen])

  const dialog = useRef<HTMLDialogElement>(null)
  const visibleProjects = projects.filter(project => !project.placeholder)
  const featuredProjects = visibleProjects.filter(project => ['automl', '01', '02', '03'].includes(project.index))
  const otherProjects = visibleProjects.filter(project => project.index === '05')
  const internship = projects.find(project => project.index === 'risksim')!

  useEffect(() => {
    const element = dialog.current
    if (!selected || !element) return
    element.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  const closeProject = () => { dialog.current?.close(); setSelected(null) }

  return (
    <>
      <a className="skip-link" href="#main">Aller à la slide</a>
      <header className="header wrap">
        <a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete — accueil">Rudolf<br />Hounlete<span>.</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fermer' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
        <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navigation principale">
          <a href="#competitions" onClick={() => setMenuOpen(false)}>Compétitions</a>
          <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Expérience</a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Contact <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main" className="wrap slide-deck" ref={deck} tabIndex={-1} aria-label={`${activeSlide.label} — slide ${slideIndex + 1} sur ${slides.length}`} onTouchStart={event => {
        const touch = event.touches[0]
        const section = deck.current?.querySelector<HTMLElement>(`#${activeSlide.id}`)
        touchStart.current = touch && section ? {
          x: touch.clientX, y: touch.clientY,
          atTop: section.scrollTop <= 2,
          atBottom: section.scrollTop + section.clientHeight >= section.scrollHeight - 2,
        } : null
      }} onTouchEnd={event => {
        const start = touchStart.current
        touchStart.current = null
        const touch = event.changedTouches[0]
        if (!start || !touch || selected || menuOpen) return
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dy) > 70 && Math.abs(dy) > Math.abs(dx) * 2) {
          if (dy < 0 && start.atBottom) navigateTo(slideIndex + 1)
          if (dy > 0 && start.atTop) navigateTo(slideIndex - 1, 'end')
        } else if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2) {
          navigateTo(slideIndex + (dx < 0 ? 1 : -1))
        }
      }}>
        <section className="hero" id="accueil" aria-hidden={activeSlide.id !== 'accueil'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'accueil') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'accueil' ? { inert: '' } : {})}>
          <div className="hero-copy">
            <p className="hello">Bonjour, moi c’est Rudolf.</p>
            <h1>Rudolf<br />Hounlete<span>.</span></h1><p className="hero-specialty">{profile.heroFocus}</p>
            <p className="hero-description">{profile.heroDescription}</p>
            <p className="hero-location">Casablanca, Maroc</p><a className="hero-distinction" href="#competitions"><span className="bronze-dot" aria-hidden="true" />3 médailles de bronze · Kaggle & Zindi <Arrow diagonal /></a>
            <div className="hero-actions"><a className="button button-primary" href="#projets">Voir mes projets <span className="round-arrow"><Arrow /></span></a><a className="button button-outline" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV <Arrow diagonal /></a></div>
          </div>
          <div className="hero-art-frame"><div className="hero-art has-portrait">
            <img className="hero-portrait" src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="1254" height="1254" fetchPriority="high" decoding="async" />
          </div><span className="hero-orbit" aria-hidden="true" /></div>
        </section>

        <section className="section about-section" id="apropos" aria-hidden={activeSlide.id !== 'apropos'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'apropos') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'apropos' ? { inert: '' } : {})}>
          <div><p className="eyebrow"><span /> À propos</p><h2>Un parcours entre<br />modèles et applications<span>.</span></h2>{profile.about.map(paragraph => <p className="about-text" key={paragraph}>{paragraph}</p>)}<a className="text-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mon GitHub <Arrow diagonal /></a></div>
          <div className="about-facts"><div><strong>3</strong><span>Médailles de bronze<br />Kaggle & Zindi</span></div><div><strong>2026</strong><span>Stage chez CHOUBEL<br />RiskSim · Python & React</span></div></div>
        </section>

        <section className="section expertise-section" id="competences" aria-hidden={activeSlide.id !== 'competences'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'competences') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'competences' ? { inert: '' } : {})}>
          <div className="section-heading"><div><p className="eyebrow"><span /> Compétences</p><h2>Mes outils de travail<span>.</span></h2></div><p className="section-note">Du traitement des données à l’application.</p></div>
          <div className="skill-list">{skills.map(group => <div key={group.label}><span className="skill-symbol" aria-hidden="true">{group.label === 'Langages' ? '</>' : group.label === 'Web & produit' ? '▣' : group.label === 'IA & données' ? '◈' : '⌘'}</span><h3>{group.label}</h3><p>{group.items.join(' · ')}</p></div>)}</div>
        </section>

        <section className="section competition-section" id="competitions" aria-hidden={activeSlide.id !== 'competitions'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'competitions') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'competitions' ? { inert: '' } : {})}>
          <div className="section-heading"><div><p className="eyebrow"><span /> Kaggle & Zindi</p><h2>Résultats en compétition<span>.</span></h2></div><span className="section-note">2026 · 3 médailles de bronze</span></div>
          <p className="section-intro">Sur Kaggle et Zindi, j’ai abordé des problèmes très différents : reconnaître la parole dans plusieurs langues, repérer des bassins aquacoles depuis l’espace et prédire le stress financier. Voici les résultats de ces participations.</p>
          <div className="competition-list">{competitions.map(entry => (
            <article className="competition-row" key={entry.name}>
              <div className="competition-mark">{entry.medal ? <svg viewBox="0 0 40 48" fill="none" aria-label="Médaille de bronze" role="img"><path d="M8 2h9l7 17-9 5L8 2Z" fill="#c9ba98"/><path d="M23 2h9l-7 22-9-5 7-17Z" fill="#ead8ac"/><circle cx="20" cy="31" r="14" fill="#b78046"/><circle cx="20" cy="31" r="10" stroke="#eac59b"/><path d="m20 24 2 4 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1 2-4Z" fill="#f4dcc0"/></svg> : <span aria-hidden="true">↗</span>}</div>
              <div className="competition-info"><p className="project-meta">{entry.platform} · {entry.year}</p><h3>{entry.name}</h3><p>{entry.detail}</p></div>
              <div className="competition-result"><strong>{entry.result}</strong>{entry.medal && entry.result !== 'Médaille de bronze' && <span>Bronze</span>}<div className="competition-links">{entry.projectId && <button className="text-link" type="button" onClick={() => setSelected(projects.find(project => project.index === entry.projectId)!)}>Solution <Arrow diagonal /></button>}{entry.href && <a className="text-link" href={entry.href} target="_blank" rel="noreferrer">{entry.linkLabel} <Arrow diagonal /></a>}</div></div>
            </article>
          ))}</div>
        </section>

        <section className="section internship-section" id="experience" aria-hidden={activeSlide.id !== 'experience'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'experience') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'experience' ? { inert: '' } : {})}>
          <div className="section-heading"><div><p className="eyebrow"><span /> Expérience professionnelle</p><h2>CHOUBEL<span>.</span></h2></div><span className="section-note">Stage d’observation · 15 juillet — 28 août 2026</span></div>
          <div className="internship-content"><div><h3>RiskSim — Simulateur de risques projet</h3><p>Durant mon stage chez CHOUBEL, j’ai développé RiskSim pour analyser les risques d’un projet à partir d’un registre Excel. L’utilisateur peut modifier ses hypothèses, comparer des scénarios et calculer des réserves budgétaires.</p><p>J’ai travaillé sur le moteur Python, puis fait évoluer l’interface de Streamlit vers React. La préparation de la distribution Windows et de la documentation a prolongé ce travail jusqu’à la prise en main de l’application.</p><button className="text-link" type="button" onClick={() => setSelected(internship)}>Voir le projet <Arrow diagonal /></button></div><div className="internship-delivery"><span>Travail réalisé</span><ul><li>Moteur de simulation et analyse de sensibilité</li><li>Migration de Streamlit vers React</li><li>Distribution Windows et documentation</li></ul><p>Python · NumPy · React · TypeScript</p></div></div>
        </section>

        <section className="section projects-section" id="projets" aria-hidden={activeSlide.id !== 'projets'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'projets') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'projets' ? { inert: '' } : {})}>
          <div className="section-heading"><div><p className="eyebrow"><span /> Logiciel & ingénierie</p><h2>Projets sélectionnés<span>.</span></h2></div><span className="section-note">Projets personnels et académiques</span></div>
          <p className="section-intro">En parallèle des compétitions, je développe des outils et des prototypes. Cette sélection présente aussi bien des projets personnels que des travaux réalisés pendant ma formation.</p>
          <div className="project-grid">{featuredProjects.map(project => (
            <article className="project-card" key={project.index}>
              <button type="button" className="project-preview" onClick={() => setSelected(project)} aria-label={`Découvrir ${project.title}`}><ProjectVisual project={project} /><span className="preview-arrow"><Arrow diagonal /></span></button>
              <div className="project-copy"><p className="project-meta">{project.category ?? project.context}<span>{project.period}</span></p><h3>{project.title}</h3><p className="project-summary">{project.tagline}</p>{project.status && <p className="project-status">{project.status}</p>}<button className="text-link" type="button" onClick={() => setSelected(project)}>Voir la fiche <Arrow diagonal /></button>{project.links.code && <a className="text-link project-code-link" href={project.links.code} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>}{project.links.demo && <a className="text-link project-code-link" href={project.links.demo} target="_blank" rel="noreferrer">Démo <Arrow diagonal /></a>}</div>
            </article>
          ))}</div>
          <details className="other-projects"><summary>Autres travaux</summary>{otherProjects.map(project => <article key={project.index}><h3>{project.title}</h3><p>{project.tagline}</p><button className="text-link" type="button" onClick={() => setSelected(project)}>Voir le projet <Arrow diagonal /></button></article>)}</details>
        </section>

        <section className="section journey-section" id="parcours" aria-hidden={activeSlide.id !== 'parcours'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'parcours') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'parcours' ? { inert: '' } : {})}><div className="section-heading"><div><p className="eyebrow"><span /> Formation</p><h2>Mon parcours<span>.</span></h2></div></div><div className="education-list">{education.map(item => <article key={item.school + item.detail}><span className="education-period">{item.period}</span><div><h3>{item.school}</h3><p>{item.detail}</p></div><span className="education-place">{item.location}</span></article>)}</div></section>

        <section className="contact-section" id="contact" aria-hidden={activeSlide.id !== 'contact'} style={{ transform: `translateY(${(slides.findIndex(slide => slide.id === 'contact') - slideIndex) * 100}%)` }} {...(activeSlide.id !== 'contact' ? { inert: '' } : {})}><div><p className="eyebrow"><span /> Contact</p><h2>Un stage dans votre équipe<span> ?</span></h2><p>Je recherche un stage en développement logiciel ou en machine learning appliqué. Si mon parcours correspond à ce que vous cherchez, je serais heureux d’échanger sur votre équipe et les projets auxquels je pourrais contribuer.</p></div><a className="button button-dark" href={`mailto:${contact.email}?subject=Proposition%20de%20stage`}>Proposer un stage <span className="round-arrow"><Arrow diagonal /></span></a><div className="contact-links"><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>{contact.linkedin && <a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>}</div></section>
      </main>
      <footer className="wrap deck-controls" aria-label="Navigation des slides">
        <div className="deck-label" aria-live="polite"><strong>{String(slideIndex + 1).padStart(2, '0')}<span> / {String(slides.length).padStart(2, '0')}</span></strong><span>{activeSlide.label}</span><span className="deck-scroll-hint">Défilez pour naviguer</span></div>
        <nav className="deck-dots" aria-label="Choisir une slide">{slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => navigateTo(index)} aria-label={`Slide ${index + 1} : ${slide.label}`} aria-current={slideIndex === index ? 'step' : undefined} title={slide.label}><span /></button>)}</nav>
        <div className="deck-arrows"><button type="button" onClick={() => navigateTo(slideIndex - 1)} disabled={slideIndex === 0} aria-label="Slide précédente">←</button><button type="button" onClick={() => navigateTo(slideIndex + 1)} disabled={slideIndex === slides.length - 1} aria-label="Slide suivante">→</button></div>
      </footer>

      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={closeProject} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject() } }}>
        {selected && <><div className="dialog-heading"><p className="eyebrow">{selected.category ?? selected.context}</p><button className="dialog-close" type="button" onClick={closeProject} aria-label="Fermer la fiche projet" autoFocus>×</button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-context">{selected.context} · {selected.period}{selected.status && ` · ${selected.status}`}</p><p className="dialog-summary">{selected.tagline}</p>{selected.challenge && <><h3>Problème traité</h3><p className="case-text">{selected.challenge}</p></>}<h3>Travail réalisé</h3><ul>{selected.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>{selected.outcome && <><h3>Livrable et résultats</h3><p className="case-text">{selected.outcome}</p></>}{selected.limitation && <><h3>Limites et enseignements</h3><p className="case-text">{selected.limitation}</p></>}{selected.evidence && <a className="text-link" href={selected.evidence.href} target="_blank" rel="noreferrer">{selected.evidence.label} <Arrow diagonal /></a>}<div className="stack">{selected.stack.map(item => <span key={item}>{item}</span>)}</div><div className="dialog-links">{selected.links.code && <a className="button button-primary" href={selected.links.code} target="_blank" rel="noreferrer">Voir le code <Arrow diagonal /></a>}{selected.links.demo && <a className="text-link" href={selected.links.demo} target="_blank" rel="noreferrer">Ouvrir la démo <Arrow diagonal /></a>}</div></>}
      </dialog>
    </>
  )
}

export default App
