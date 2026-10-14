import { useEffect, useRef, useState } from 'react'
import { competitions } from './data/competitions'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'
import { contact, profile } from './data/profile'
import type { Project } from './data/types'
import { useSlideMotion } from './hooks/useSlideMotion'

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

/** Slides rendered on a dark panel — the fixed chrome adapts to them. */
const darkSlides = ['apropos', 'experience', 'contact']

function slideFromHash() {
  const index = slides.findIndex(slide => `#${slide.id}` === window.location.hash)
  return index < 0 ? 0 : index
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function BronzeMedal() {
  return <svg className="medal-emblem" viewBox="0 0 80 92" fill="none" role="img" aria-label="Médaille de bronze"><path d="M16 3h18l12 31-18 9L16 3Z" fill="#9f805b"/><path d="M46 3h18L52 43l-18-9L46 3Z" fill="#d3b68b"/><circle cx="40" cy="59" r="28" fill="#b67c43"/><circle cx="40" cy="59" r="22" stroke="#efd1a6" strokeWidth="2"/><path d="m40 45 4 8 9 2-7 6 2 9-8-5-8 5 2-9-7-6 9-2 4-8Z" fill="#f6e3c9"/></svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [slideIndex, setSlideIndex] = useState(slideFromHash)
  const activeSlide = slides[slideIndex]
  const chromeTheme = darkSlides.includes(activeSlide.id) ? ' on-dark' : ''
  const deck = useRef<HTMLElement>(null)
  useSlideMotion(deck)
  const lastSlideIndex = useRef(slideIndex)
  const programmaticScroll = useRef(false)
  const navigateTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    const container = deck.current
    const section = container?.querySelector<HTMLElement>(`#${slides[next].id}`)
    if (!container || !section) return
    const top = section.offsetTop
    const reduced = reducedMotion()
    // Directional slide choreography between panels, when the browser supports it.
    const direction = reduced || next === lastSlideIndex.current ? null
      : next > lastSlideIndex.current ? 'vt-forward' : 'vt-back'
    const scroll = () => {
      programmaticScroll.current = true
      container.scrollTo({ top, behavior: reduced ? 'instant' : behavior })
      window.setTimeout(() => { programmaticScroll.current = false }, reduced ? 80 : 950)
    }
    lastSlideIndex.current = next
    if (direction && 'startViewTransition' in document) {
      const root = document.documentElement
      root.classList.remove('vt-forward', 'vt-back')
      root.classList.add(direction)
      const transition = (document as Document & { startViewTransition: (callback: () => void) => { finished: Promise<void> } }).startViewTransition(scroll)
      transition.finished.finally(() => root.classList.remove('vt-forward', 'vt-back'))
    } else {
      scroll()
    }
    setMenuOpen(false)
    const hash = `#${slides[next].id}`
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)
  }

  useEffect(() => {
    const syncHash = () => navigateTo(slideFromHash())
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
    navigateTo(slideFromHash(), 'instant')
    const container = deck.current
    if (!container) return
    let frame = 0
    let settleTimer = 0
    const syncPosition = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const midpoint = container.scrollTop + container.clientHeight / 2
        const sections = Array.from(container.querySelectorAll<HTMLElement>(':scope > section'))
        // The panel crossing the middle of the viewport is the current section.
        const index = sections.findIndex(section => {
          return section.offsetTop <= midpoint && section.offsetTop + section.offsetHeight > midpoint
        })
        if (index < 0) return
        setSlideIndex(index)
        lastSlideIndex.current = index
        const hash = `#${slides[index].id}`
        if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
        // Free-scrolling settles back onto the nearest panel edge.
        clearTimeout(settleTimer)
        if (programmaticScroll.current || reducedMotion()) return
        settleTimer = window.setTimeout(() => {
          if (programmaticScroll.current) return
          const settled = container.scrollTop + container.clientHeight / 2
          let best = 0
          let bestDistance = Infinity
          sections.forEach((section, i) => {
            const distance = Math.abs(section.offsetTop - settled)
            if (distance < bestDistance) { bestDistance = distance; best = i }
          })
          if (Math.abs(container.scrollTop - sections[best].offsetTop) > 4) {
            navigateTo(best)
          }
        }, 180)
      })
    }
    container.addEventListener('scroll', syncPosition, { passive: true })
    return () => { container.removeEventListener('scroll', syncPosition); cancelAnimationFrame(frame); clearTimeout(settleTimer) }
  }, [])

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
      <a className="skip-link" href="#main">Aller au contenu</a>

      <header className={`chrome header${chromeTheme}`}>
        <a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete — accueil">
          <span className="wordmark-mark" aria-hidden="true">RH</span>
          <span className="wordmark-name">Rudolf Hounlete</span>
          <span className="wordmark-role">Élève ingénieur · Stage ML &amp; logiciel</span>
        </a>
        <nav className="navigation" aria-label="Navigation principale">
          {slides.map((slide, index) => (
            <a key={slide.id} href={`#${slide.id}`} className={slideIndex === index ? 'is-active' : undefined} aria-current={slideIndex === index ? 'page' : undefined}>{slide.label}</a>
          ))}
          <a className="nav-contact" href={`mailto:${contact.email}`}>Écrivez-moi <Arrow diagonal /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation-drawer" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fermer' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
      </header>

      <div id="navigation-drawer" className={menuOpen ? 'drawer is-open' : 'drawer'} aria-hidden={!menuOpen}>
        {slides.map((slide, index) => (
          <a key={slide.id} href={`#${slide.id}`} className={slideIndex === index ? 'is-active' : undefined} onClick={() => setMenuOpen(false)}>
            <span className="drawer-index">{String(index + 1).padStart(2, '0')}</span>{slide.label}
          </a>
        ))}
        <a className="drawer-contact" href={`mailto:${contact.email}`} onClick={() => setMenuOpen(false)}>Écrivez-moi <Arrow diagonal /></a>
      </div>

      <main id="main" className="slide-deck" ref={deck} tabIndex={-1} aria-label="Portfolio de Rudolf Hounlete">

        {/* ── 01 · Accueil ─────────────────────────────────────── */}
        <section id="accueil"><div className="scene-stage hero-stage">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hello"><span className="status-dot" aria-hidden="true" />{profile.availability}</p>
              <h1>Rudolf<br /><em>Hounlete</em><span className="period" aria-hidden="true">.</span></h1>
              <p className="hero-specialty">{profile.heroFocus}</p>
              <p className="hero-description">{profile.heroDescription}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projets">Voir mes projets <Arrow /></a>
                <a className="button button-outline" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV <Arrow diagonal /></a>
              </div>
              <dl className="hero-facts">{profile.facts.map(fact => <div key={fact.k}><dt>{fact.k}</dt><dd>{fact.v}</dd></div>)}</dl>
            </div>
            <div className="hero-side">
              <figure className="portrait-frame">
                <img className="hero-portrait" src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="1254" height="1254" {...{ fetchPriority: 'high' }} decoding="async" />
                <figcaption>Casablanca, Maroc</figcaption>
              </figure>
              <a className="medal-strip" href="#competitions">
                <BronzeMedal />
                <span><strong>3 médailles de bronze</strong>Kaggle &amp; Zindi · 2026</span>
                <Arrow diagonal />
              </a>
            </div>
          </div>
          <span className="scroll-cue" aria-hidden="true"><span className="scroll-cue-line" />Défiler</span>
        </div></section>

        {/* ── 02 · À propos ────────────────────────────────────── */}
        <section id="apropos"><div className="scene-stage dark about-stage">
          <div className="about-grid">
            <div className="about-lead">
              <p className="eyebrow"><span />À propos</p>
              <h2>Un parcours entre modèles<br />et applications<span className="period" aria-hidden="true">.</span></h2>
              <a className="text-link on-dark-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mon GitHub <Arrow diagonal /></a>
            </div>
            <div className="about-body">
              {profile.about.map(paragraph => <p className="about-text" key={paragraph.slice(0, 24)}>{paragraph}</p>)}
              <ul className="about-interests">{profile.interests.map(interest => <li key={interest}>{interest}</li>)}</ul>
            </div>
          </div>
        </div></section>

        {/* ── 03 · Compétences ─────────────────────────────────── */}
        <section id="competences"><div className="scene-stage skills-stage">
          <div className="skills-head">
            <p className="eyebrow"><span />Compétences</p>
            <h2>Des modèles<br />aux applications<span className="period" aria-hidden="true">.</span></h2>
            <p className="section-intro">Les outils que j’utilise pour préparer les données, entraîner les modèles et développer les applications.</p>
          </div>
          <div className="skills-table">
            {skills.map((group, index) => (
              <div className="skill-row" key={group.label}>
                <span className="skill-row-number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="skill-row-label">{group.label}</h3>
                <ul className="skill-row-tools">{group.items.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <a className="text-link skills-link" href="#projets">Les voir dans mes projets <Arrow /></a>
        </div></section>

        {/* ── 04 · Compétitions ────────────────────────────────── */}
        <section id="competitions"><div className="scene-stage awards-stage">
          <div className="awards-head">
            <div>
              <p className="eyebrow eyebrow-bronze"><span />Kaggle &amp; Zindi · 2026</p>
              <h2>En compétition<span className="period" aria-hidden="true">.</span></h2>
            </div>
            <p className="awards-summary">Cinq participations cette année : trois médailles de bronze et deux classements parmi les tout premiers.</p>
          </div>
          <ol className="results-list">
            {competitions.map(entry => {
              const position = entry.result.split(' / ')
              const medal = Boolean(entry.medal)
              return (
                <li className={medal ? 'result-row is-medal' : 'result-row'} key={entry.name}>
                  <span className="result-rank">{position.length > 1 ? position[0] : '🥉'}</span>
                  <div className="result-main">
                    <h3>{entry.name}</h3>
                    <p className="result-detail">{entry.detail}</p>
                  </div>
                  <div className="result-meta">
                    <span className="platform-label">{entry.platform} · {entry.year}</span>
                    {medal ? <span className="medal-tag">Médaille de bronze</span> : <span className="field-tag">{position.length > 1 ? `sur ${position[1]} équipes` : entry.result}</span>}
                  </div>
                  <div className="result-links">
                    {entry.projectId && <button className="text-link" type="button" onClick={() => setSelected(projects.find(project => project.index === entry.projectId)!)}>Ma solution <Arrow diagonal /></button>}
                    {entry.href && <a className="text-link" href={entry.href} target="_blank" rel="noreferrer">{entry.linkLabel} <Arrow diagonal /></a>}
                  </div>
                </li>
              )
            })}
          </ol>
        </div></section>

        {/* ── 05 · Expérience ──────────────────────────────────── */}
        <section id="experience"><div className="scene-stage dark work-stage">
          <div className="work-grid">
            <div className="work-story">
              <p className="eyebrow"><span />Expérience · CHOUBEL</p>
              <h2>RiskSim<span className="period" aria-hidden="true">.</span></h2>
              <p className="work-subtitle">Simuler les risques d’un projet.</p>
              <p className="work-date">Stage d’observation · 15 juillet — 28 août 2026</p>
              <p>Durant mon stage chez CHOUBEL, j’ai développé RiskSim pour analyser les risques d’un projet à partir d’un registre Excel. L’utilisateur modifie ses hypothèses, compare des scénarios et calcule des réserves budgétaires.</p>
              <p>J’ai travaillé sur le moteur Python, puis fait évoluer l’interface de Streamlit vers React, jusqu’à la distribution Windows et la documentation.</p>
              <button className="button button-light" type="button" onClick={() => setSelected(internship)}>Explorer le projet <Arrow diagonal /></button>
            </div>
            <div className="pipeline" aria-label="Chaîne de livraison du projet RiskSim">
              <p className="pipeline-title">Du registre Excel à l’application</p>
              <div className="pipeline-steps">
                <div className="pipeline-step"><span className="pipeline-node" /><span className="pipeline-kicker">01 · Données</span><h3>Importer les risques</h3><p>Registre Excel, hypothèses, corrélations</p></div>
                <div className="pipeline-step"><span className="pipeline-node" /><span className="pipeline-kicker">02 · Moteur</span><h3>Simuler les scénarios</h3><p>Python, Monte Carlo, sensibilité</p></div>
                <div className="pipeline-step"><span className="pipeline-node" /><span className="pipeline-kicker">03 · Interface</span><h3>Explorer les résultats</h3><p>React, TypeScript, réserves budgétaires</p></div>
                <div className="pipeline-step is-release"><span className="pipeline-node" /><span className="pipeline-kicker">Livraison</span><h3>Application Windows</h3><p>Emballage, lancement local, documentation</p></div>
              </div>
              <p className="pipeline-stack">Python · NumPy · React · TypeScript</p>
            </div>
          </div>
        </div></section>

        {/* ── 06 · Projets ─────────────────────────────────────── */}
        <section id="projets"><div className="scene-stage projects-stage">
          <div className="projects-head">
            <div>
              <p className="eyebrow"><span />Logiciel &amp; ingénierie</p>
              <h2>Projets sélectionnés<span className="period" aria-hidden="true">.</span></h2>
            </div>
            <p className="section-note">Des outils développés en parallèle des compétitions.</p>
          </div>
          <div className="projects-list">
            {featuredProjects.map((project, index) => (
              <article className="project-entry" key={project.index}>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-info">
                  <h3><button type="button" onClick={() => setSelected(project)}>{project.title}</button></h3>
                  <p className="project-category">{project.category ?? project.context} · {project.period}</p>
                  <p className="project-description">{project.cardDescription ?? project.tagline}</p>
                  <ul className="project-tags">{project.stack.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="project-actions">
                  <button className="text-link" type="button" onClick={() => setSelected(project)}>Ouvrir la fiche <Arrow diagonal /></button>
                  {project.links.code && <a className="text-link" href={project.links.code} target="_blank" rel="noreferrer">Code <Arrow diagonal /></a>}
                  {project.links.demo && <a className="text-link" href={project.links.demo} target="_blank" rel="noreferrer">Démo <Arrow diagonal /></a>}
                </div>
              </article>
            ))}
            {otherProjects.map(project => (
              <article className="project-entry is-secondary" key={project.index}>
                <span className="project-index">＋</span>
                <div className="project-info">
                  <h3><button type="button" onClick={() => setSelected(project)}>{project.title}</button></h3>
                  <p className="project-category">{project.category ?? project.context} · {project.period}</p>
                  <p className="project-description">{project.tagline}</p>
                </div>
                <div className="project-actions"><button className="text-link" type="button" onClick={() => setSelected(project)}>Ouvrir la fiche <Arrow diagonal /></button></div>
              </article>
            ))}
          </div>
        </div></section>

        {/* ── 07 · Formation ───────────────────────────────────── */}
        <section id="parcours"><div className="scene-stage journey-stage">
          <p className="eyebrow"><span />Formation</p>
          <h2>Mon parcours<span className="period" aria-hidden="true">.</span></h2>
          <ol className="timeline">
            {education.map(item => (
              <li key={item.school + item.detail}>
                <span className="timeline-period">{item.period || '—'}</span>
                <span className="timeline-node" aria-hidden="true" />
                <div className="timeline-body"><h3>{item.school}</h3><p>{item.detail}</p></div>
                <span className="timeline-place">{item.location}</span>
              </li>
            ))}
          </ol>
        </div></section>

        {/* ── 08 · Contact ─────────────────────────────────────── */}
        <section id="contact"><div className="scene-stage dark contact-stage">
          <p className="eyebrow"><span />Contact</p>
          <h2>Un stage dans<br />votre équipe<span className="period" aria-hidden="true"> ?</span></h2>
          <p className="contact-intro">Je recherche un stage en développement logiciel ou en machine learning appliqué. Si mon parcours correspond à ce que vous cherchez, je serais heureux d’échanger sur votre équipe et les projets auxquels je pourrais contribuer.</p>
          <a className="button button-light" href={`mailto:${contact.email}?subject=Proposition%20de%20stage`}>Proposer un stage <Arrow diagonal /></a>
          <div className="contact-links">
            <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className="text-link on-dark-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
            {contact.linkedin && <a className="text-link on-dark-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>}
          </div>
        </div></section>
      </main>

      <footer className={`chrome deck-bar${chromeTheme}`} aria-label="Navigation des slides">
        <div className="deck-progress" aria-hidden="true"><span style={{ inlineSize: `${((slideIndex + 1) / slides.length) * 100}%` }} /></div>
        <div className="deck-label" aria-live="polite">
          <strong>{String(slideIndex + 1).padStart(2, '0')}<span> / {String(slides.length).padStart(2, '0')}</span></strong>
          <span className="deck-label-name">{activeSlide.label}</span>
        </div>
        <nav className="deck-dots" aria-label="Choisir une slide">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => navigateTo(index)} aria-label={`Slide ${index + 1} : ${slide.label}`} aria-current={slideIndex === index ? 'step' : undefined} title={slide.label}><span /></button>
          ))}
        </nav>
        <div className="deck-arrows">
          <button type="button" onClick={() => navigateTo(slideIndex - 1)} disabled={slideIndex === 0} aria-label="Slide précédente">←</button>
          <button type="button" onClick={() => navigateTo(slideIndex + 1)} disabled={slideIndex === slides.length - 1} aria-label="Slide suivante">→</button>
        </div>
      </footer>

      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={closeProject} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject() } }}>
        {selected && <><div className="dialog-heading"><p className="eyebrow">{selected.category ?? selected.context}</p><button className="dialog-close" type="button" onClick={closeProject} aria-label="Fermer la fiche projet" autoFocus>×</button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-context">{selected.context} · {selected.period}{selected.status && ` · ${selected.status}`}</p><p className="dialog-summary">{selected.tagline}</p>{selected.challenge && <><h3>Problème traité</h3><p className="case-text">{selected.challenge}</p></>}<h3>Travail réalisé</h3><ul>{selected.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>{selected.outcome && <><h3>Livrable et résultats</h3><p className="case-text">{selected.outcome}</p></>}{selected.limitation && <><h3>Limites et enseignements</h3><p className="case-text">{selected.limitation}</p></>}{selected.evidence && <a className="text-link" href={selected.evidence.href} target="_blank" rel="noreferrer">{selected.evidence.label} <Arrow diagonal /></a>}<div className="stack">{selected.stack.map(item => <span key={item}>{item}</span>)}</div><div className="dialog-links">{selected.links.code && <a className="button button-primary" href={selected.links.code} target="_blank" rel="noreferrer">Voir le code <Arrow diagonal /></a>}{selected.links.demo && <a className="text-link" href={selected.links.demo} target="_blank" rel="noreferrer">Ouvrir la démo <Arrow diagonal /></a>}</div></>}
      </dialog>
    </>
  )
}

export default App
