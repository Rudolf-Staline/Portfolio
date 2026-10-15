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

function slideFromHash() {
  const index = slides.findIndex(slide => `#${slide.id}` === window.location.hash)
  return index < 0 ? 0 : index
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? 'M4 12 12 4M4 4h8v8' : 'M3 8h10M8 3l5 5-5 5'} /></svg></span>
}

function BronzeMedal() {
  return <svg className="medal-emblem" viewBox="0 0 80 92" fill="none" role="img" aria-label="Médaille de bronze"><path d="M16 3h18l12 31-18 9L16 3Z" fill="#9f805b"/><path d="M46 3h18L52 43l-18-9L46 3Z" fill="#d3b68b"/><circle cx="40" cy="59" r="28" fill="#b67c43"/><circle cx="40" cy="59" r="22" stroke="#efd1a6" strokeWidth="2"/><path d="m40 45 4 8 9 2-7 6 2 9-8-5-8 5 2-9-7-6 9-2 4-8Z" fill="#f6e3c9"/></svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [projectOpen, setProjectOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(slideFromHash)
  const activeSlide = slides[slideIndex]
  const chromeTheme = ['apropos', 'contact'].includes(activeSlide.id) ? ' on-dark' : ''
  const deck = useRef<HTMLElement>(null)
  useSlideMotion(deck)
  const navigateTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    const container = deck.current
    const section = container?.querySelector<HTMLElement>(`#${slides[next].id}`)
    if (!container || !section) return
    const top = section.offsetTop
    container.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior })
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
        const hash = `#${slides[index].id}`
        if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
      })
    }
    container.addEventListener('scroll', syncPosition, { passive: true })
    return () => { container.removeEventListener('scroll', syncPosition); cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (projectOpen || menuOpen || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'PageDown' || event.key === 'PageUp') {
        const container = deck.current
        if (!container) return
        event.preventDefault()
        const styles = window.getComputedStyle(container)
        const distance = Math.max(1, container.clientHeight - (parseFloat(styles.scrollPaddingTop) || 0) - (parseFloat(styles.scrollPaddingBottom) || 0))
        const sections = Array.from(container.querySelectorAll<HTMLElement>(':scope > section'))
        const current = sections.findIndex(section => container.scrollTop < section.offsetTop + section.offsetHeight - 1)
        const section = sections[current]
        if (!section) return
        const start = section.offsetTop
        const end = Math.max(start, start + section.offsetHeight - container.clientHeight)
        let top: number
        if (event.key === 'PageDown') {
          // Read the rest of a long panel before snapping to the next one.
          top = container.scrollTop < end - 1 ? Math.min(end, container.scrollTop + distance)
            : sections[current + 1]?.offsetTop ?? end
        } else if (container.scrollTop > start + 1) {
          top = Math.max(start, container.scrollTop - distance)
        } else {
          const previous = sections[current - 1]
          top = previous ? Math.max(previous.offsetTop, previous.offsetTop + previous.offsetHeight - container.clientHeight) : 0
        }
        container.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
        return
      }
      const next = event.key === 'ArrowRight' ? slideIndex + 1
        : event.key === 'ArrowLeft' ? slideIndex - 1
        : event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : null
      if (next !== null) { event.preventDefault(); navigateTo(next) }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [slideIndex, projectOpen, menuOpen])

  const dialog = useRef<HTMLDialogElement>(null)
  const visibleProjects = projects.filter(project => !project.placeholder)
  const featuredProjects = visibleProjects.filter(project => ['automl', '01', '02', '03'].includes(project.index))
  const otherProjects = visibleProjects.filter(project => project.index === '05')
  const internship = projects.find(project => project.index === 'risksim')!

  useEffect(() => {
    const element = dialog.current
    if (!projectOpen || !selected || !element) return
    element.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected, projectOpen])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  const openProject = (project: Project) => { setSelected(project); setProjectOpen(true) }
  // Retain the content while the native dialog finishes its exit transition.
  const closeProject = () => { dialog.current?.close(); setProjectOpen(false) }

  return (
    <>
      <a className="skip-link" href="#main">Aller à la slide</a>
      <header className={`header wrap${chromeTheme}`}>
        <a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete — accueil"><span className="brand-monogram" aria-hidden="true">rh.</span><span className="brand-name">Rudolf<br />Hounlete</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fermer' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
        <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navigation principale">
          <a href="#competitions" aria-current={activeSlide.id === 'competitions' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Compétitions</a>
          <a href="#projets" aria-current={activeSlide.id === 'projets' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#experience" aria-current={activeSlide.id === 'experience' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Expérience</a>
          <a href="#contact" aria-current={activeSlide.id === 'contact' ? 'location' : undefined} className="nav-contact" onClick={() => setMenuOpen(false)}>Contact <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main" className="wrap slide-deck" ref={deck} tabIndex={-1} aria-label="Portfolio de Rudolf Hounlete">
        <section className="hero" id="accueil"><div className="scene-stage hero">
          <div className="hero-copy">
            <p className="hello"><span /> Portfolio personnel · Casablanca</p>
            <h1>Rudolf<br />Hounlete<span>.</span></h1><p className="hero-specialty">{profile.heroFocus}</p>
            <p className="hero-description">{profile.heroDescription}</p>
            <p className="hero-location">Casablanca, Maroc</p><a className="hero-distinction" href="#competitions"><span className="bronze-dot" aria-hidden="true" />3 médailles de bronze · Kaggle & Zindi <Arrow diagonal /></a>
            <div className="hero-actions"><a className="button button-primary" href="#projets">Voir mes projets <span className="round-arrow"><Arrow /></span></a><a className="button button-outline" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV <Arrow diagonal /></a></div>
          </div>
          <div className="hero-art-frame"><div className="hero-art has-portrait">
            <img className="hero-portrait" src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="1254" height="1254" fetchPriority="high" decoding="async" />
          </div><span className="hero-orbit" aria-hidden="true" /><div className="portrait-caption"><span className="availability-dot" aria-hidden="true" /><span>{profile.availability}</span><span className="portrait-caption-index" aria-hidden="true">RH / 01</span></div></div>
        </div></section>

        <section className="section about-section" id="apropos"><div className="scene-stage section about-section">
          <div><p className="eyebrow"><span /> À propos</p><h2>Un parcours entre<br />modèles et applications<span>.</span></h2>{profile.about.map(paragraph => <p className="about-text" key={paragraph}>{paragraph}</p>)}<a className="text-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mon GitHub <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a></div>
          <div className="about-facts"><div><strong>3</strong><span>Médailles de bronze<br />Kaggle & Zindi</span></div><div><strong>2026</strong><span>Stage chez CHOUBEL<br />RiskSim · Python & React</span></div></div>
        </div></section>

        <section className="section expertise-section" id="competences"><div className="scene-stage section expertise-section">
          <div className="expertise-layout">
            <div className="expertise-lead"><p className="eyebrow"><span /> Compétences</p><h2>Des modèles<br />aux applications<span>.</span></h2><p className="section-intro">Les outils que j’utilise pour préparer les données, entraîner les modèles et développer les applications.</p><a className="text-link" href="#projets">Les voir dans mes projets <Arrow diagonal /></a><span className="expertise-decoration" aria-hidden="true">&#123; &#125;</span></div>
            <div className="expertise-grid">{skills.map((group, index) => <article className="expertise-group" key={group.label}><div className="expertise-group-heading"><span className="group-number">0{index + 1}</span><h3>{group.label}</h3></div><div className="tool-tags">{group.items.map((item, i) => <span className={i < 2 ? 'primary-tool' : ''} key={item}>{item}</span>)}</div></article>)}</div>
          </div>
        </div></section>

        <section className="section competition-section" id="competitions"><div className="scene-stage section competition-section">
          <div className="awards-heading"><div><p className="eyebrow"><span /> Kaggle & Zindi · 2026</p><h2>En compétition<span>.</span></h2></div><div className="award-total"><strong>3</strong><span>médailles<br />de bronze</span></div></div>
          <div className="medal-grid">{competitions.filter(entry => entry.medal).map(entry => <article className="medal-card" key={entry.name}><div className="medal-card-top"><span className="platform-label">{entry.platform}</span><BronzeMedal /></div><p className="medal-label">Médaille de bronze</p><h3>{entry.name}</h3><p className="award-description">{entry.detail}</p>{entry.result !== 'Médaille de bronze' && <p className="award-placement">{entry.result}</p>}<div className="award-links">{entry.projectId && <button className="text-link" type="button" onClick={() => openProject(projects.find(project => project.index === entry.projectId)!)}>Ma solution <Arrow diagonal /></button>}{entry.href && <a className="text-link" href={entry.href} target="_blank" rel="noreferrer">{entry.linkLabel} <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></article>)}</div>
          <div className="ranking-grid">{competitions.filter(entry => !entry.medal).map(entry => <article className="ranking-card" key={entry.name}><div className="ranking-position"><strong>{entry.result.split(' / ')[0]}</strong><span>sur {entry.result.split(' / ')[1]}</span></div><div><p className="platform-label">{entry.platform} · {entry.year}</p><h3>{entry.name}</h3><p className="award-description">{entry.detail}</p></div><div className="award-links">{entry.projectId && <button className="text-link" type="button" onClick={() => openProject(projects.find(project => project.index === entry.projectId)!)}>Ma solution <Arrow diagonal /></button>}{entry.href && <a className="text-link" href={entry.href} target="_blank" rel="noreferrer">Code <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></article>)}</div>
        </div></section>

        <section className="section internship-section" id="experience"><div className="scene-stage section internship-section">
          <div className="internship-layout"><div className="internship-story"><p className="eyebrow"><span /> Expérience · CHOUBEL</p><h2>RiskSim<span>.</span></h2><p className="internship-subtitle">Simuler les risques d’un projet.</p><p className="internship-date">Stage d’observation<br />15 juillet — 28 août 2026</p><p>Durant mon stage chez CHOUBEL, j’ai développé RiskSim pour analyser les risques d’un projet à partir d’un registre Excel. L’utilisateur peut modifier ses hypothèses, comparer des scénarios et calculer des réserves budgétaires.</p><p>J’ai travaillé sur le moteur Python, puis fait évoluer l’interface de Streamlit vers React. La préparation de la distribution Windows et de la documentation a prolongé ce travail jusqu’à la prise en main de l’application.</p><button className="button button-primary" type="button" onClick={() => openProject(internship)}>Explorer le projet <Arrow diagonal /></button></div>
          <div className="internship-blueprint"><div className="blueprint-heading"><span>Du registre à l’application</span><Arrow diagonal /></div><ol className="delivery-steps"><li><span className="delivery-number">01</span><div><h3>Importer les risques</h3><p>Registre Excel · hypothèses · corrélations</p></div></li><li><span className="delivery-number">02</span><div><h3>Simuler les scénarios</h3><p>Moteur Python · Monte Carlo · sensibilité</p></div></li><li><span className="delivery-number">03</span><div><h3>Explorer les résultats</h3><p>Interface React · réserves budgétaires</p></div></li></ol><div className="delivery-release"><span className="release-dot" /><div><strong>Application Windows</strong><p>Distribution et documentation préparées</p></div></div><div className="blueprint-stack">Python / NumPy / React / TypeScript</div></div></div>
        </div></section>

        <section className="section projects-section" id="projets"><div className="scene-stage section projects-section">
          <div className="section-heading"><div><p className="eyebrow"><span /> Logiciel & ingénierie</p><h2>Projets sélectionnés<span>.</span></h2></div><p className="section-note">Des outils développés en parallèle des compétitions.</p></div>
          <div className="work-grid">{featuredProjects.map((project, i) => <article className={i === 0 ? 'work-card work-featured' : 'work-card'} key={project.index}><div className="work-card-top"><span className="work-number">0{i + 1}</span><span>{project.period}</span></div><div className="work-content"><p className="work-category">{project.category ?? project.context}</p><h3>{project.title}</h3><p className="work-description">{project.cardDescription ?? project.tagline}</p>{project.fact && <p className="work-fact">{project.fact}</p>}<div className="work-stack">{project.stack.slice(0, 4).map(item => <span key={item}>{item}</span>)}</div></div><div className="work-links"><button className="text-link" type="button" onClick={() => openProject(project)}>Voir le projet <Arrow diagonal /></button>{project.links.code && <a className="text-link" href={project.links.code} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}{project.links.demo && <a className="text-link" href={project.links.demo} target="_blank" rel="noreferrer">Démo <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></article>)}</div>
          <details className="other-projects"><summary>Autres travaux</summary>{otherProjects.map(project => <article key={project.index}><h3>{project.title}</h3><p>{project.tagline}</p><button className="text-link" type="button" onClick={() => openProject(project)}>Voir le projet <Arrow diagonal /></button></article>)}</details>
        </div></section>

        <section className="section journey-section" id="parcours"><div className="scene-stage section journey-section"><div className="section-heading"><div><p className="eyebrow"><span /> Formation</p><h2>Mon parcours<span>.</span></h2></div></div><div className="education-list">{education.map(item => <article key={item.school + item.detail}><span className="education-period">{item.period}</span><div><h3>{item.school}</h3><p>{item.detail}</p></div><span className="education-place">{item.location}</span></article>)}</div></div></section>

        <section className="contact-section" id="contact"><div className="scene-stage contact-section"><div><p className="eyebrow"><span /> Contact</p><h2>Un stage dans votre équipe<span> ?</span></h2><p>Je recherche un stage en développement logiciel ou en machine learning appliqué. Si mon parcours correspond à ce que vous cherchez, je serais heureux d’échanger sur votre équipe et les projets auxquels je pourrais contribuer.</p></div><a className="button button-dark" href={`mailto:${contact.email}?subject=Proposition%20de%20stage`}>Proposer un stage <span className="round-arrow"><Arrow diagonal /></span></a><div className="contact-links"><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>{contact.linkedin && <a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></div></section>
      </main>
      <footer className={`wrap deck-controls${chromeTheme}`} aria-label="Navigation des slides">
        <div className="deck-label" aria-live="polite"><strong>{String(slideIndex + 1).padStart(2, '0')}<span> / {String(slides.length).padStart(2, '0')}</span></strong><span key={activeSlide.id}>{activeSlide.label}</span><span className="deck-scroll-hint">Défilez pour naviguer</span></div>
        <nav className="deck-dots" aria-label="Choisir une slide">{slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => navigateTo(index)} aria-label={`Slide ${index + 1} : ${slide.label}`} aria-current={slideIndex === index ? 'step' : undefined} title={slide.label}><span /></button>)}</nav>
        <div className="deck-arrows"><button type="button" onClick={() => navigateTo(slideIndex - 1)} disabled={slideIndex === 0} aria-label="Slide précédente">←</button><button type="button" onClick={() => navigateTo(slideIndex + 1)} disabled={slideIndex === slides.length - 1} aria-label="Slide suivante">→</button></div>
      </footer>

      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={closeProject} onClose={event => { if (!event.currentTarget.open) setProjectOpen(false) }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject() } }}>
        {selected && <><div className="dialog-heading"><p className="eyebrow">{selected.category ?? selected.context}</p><button className="dialog-close" type="button" onClick={closeProject} aria-label="Fermer la fiche projet" autoFocus>×</button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-context">{selected.context} · {selected.period}{selected.status && ` · ${selected.status}`}</p><p className="dialog-summary">{selected.tagline}</p>{selected.challenge && <><h3>Problème traité</h3><p className="case-text">{selected.challenge}</p></>}<h3>Travail réalisé</h3><ul>{selected.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>{selected.outcome && <><h3>Livrable et résultats</h3><p className="case-text">{selected.outcome}</p></>}{selected.limitation && <><h3>Limites et enseignements</h3><p className="case-text">{selected.limitation}</p></>}{selected.evidence && <a className="text-link" href={selected.evidence.href} target="_blank" rel="noreferrer">{selected.evidence.label} <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}<div className="stack">{selected.stack.map(item => <span key={item}>{item}</span>)}</div><div className="dialog-links">{selected.links.code && <a className="button button-primary" href={selected.links.code} target="_blank" rel="noreferrer">Voir le code <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}{selected.links.demo && <a className="text-link" href={selected.links.demo} target="_blank" rel="noreferrer">Ouvrir la démo <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></>}
      </dialog>
    </>
  )
}

export default App
