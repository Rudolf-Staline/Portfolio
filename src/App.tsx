import { useEffect, useRef, useState } from 'react'
import { competitions } from './data/competitions'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'
import { contact, profile } from './data/profile'
import type { Project } from './data/types'
import { useSlideMotion } from './hooks/useSlideMotion'
import { projectStories } from './data/projectStories'
import { ProjectExhibit } from './features/projects/ProjectExhibit'
import { ProjectGallery } from './features/projects/ProjectGallery'
import { ProjectVisual, projectVisualKind } from './features/projects/ProjectVisual'

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
  const competitionProjects = competitions.map(entry => visibleProjects.find(project => project.index === entry.projectId)).filter((project): project is Project => Boolean(project))
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
      <a className="skip-link" href="#main">Aller au contenu</a>
      <header className={`header wrap${chromeTheme}`}>
        <a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete — accueil">Rudolf<br />Hounlete<span>.</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fermer' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
        <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navigation principale">
          <a href="#competitions" aria-current={activeSlide.id === 'competitions' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Compétitions</a>
          <a href="#projets" aria-current={activeSlide.id === 'projets' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#experience" aria-current={activeSlide.id === 'experience' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>Expérience</a>
          <a href="#contact" aria-current={activeSlide.id === 'contact' ? 'location' : undefined} className="nav-contact" onClick={() => setMenuOpen(false)}>Contact <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main" className="wrap slide-deck" ref={deck} tabIndex={-1} aria-label="Portfolio de Rudolf Hounlete">
        <section className="hero" id="accueil"><div className="scene-stage hero editorial-hero">
          <div className="hero-topline"><p>Bonjour, moi c’est Rudolf.</p><p>Casablanca, Maroc / Portfolio 2026</p></div>
          <div className="hero-title-block"><h1>Rudolf<span>Hounlete<i className="hero-dot">.</i></span></h1><svg className="hero-spark" viewBox="0 0 80 80" aria-hidden="true"><path d="M40 3C44 28 52 36 77 40C52 44 44 52 40 77C36 52 28 44 3 40C28 36 36 28 40 3Z" fill="currentColor"/></svg></div>
          <div className="hero-bottom"><div className="hero-introduction"><p className="hero-specialty">{profile.heroFocus}</p><p className="hero-description">{profile.heroDescription}</p><div className="hero-actions"><a className="button button-primary" href="#projets">Voir mes projets <Arrow diagonal /></a><a className="button button-outline" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Mon CV <Arrow diagonal /></a></div></div>
          <div className="hero-art-frame"><div className="hero-art has-portrait"><img className="hero-portrait" src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="1254" height="1254" fetchPriority="high" decoding="async" /></div><span className="hero-orbit" aria-hidden="true" /></div>
          <a className="hero-achievement" href="#competitions"><span className="achievement-number">3<span>↗</span></span><strong>Médailles de bronze</strong><span>Kaggle & Zindi</span><span className="achievement-link">Voir les compétitions <Arrow diagonal /></span></a></div>
        </div></section>

        <section className="section about-section" id="apropos"><div className="scene-stage section about-section">
          <div><p className="eyebrow"><span /> À propos</p><h2>Étudier, expérimenter,<br />développer<span>.</span></h2>{profile.about.map(paragraph => <p className="about-text" key={paragraph}>{paragraph}</p>)}<a className="text-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mon GitHub <Arrow diagonal /><span className="sr-only"> (nouvel onglet)</span></a></div>
          <aside className="student-notebook"><p className="notebook-label">Quelques repères</p><dl>{profile.facts.map(fact=><div key={fact.k}><dt>{fact.k}</dt><dd>{fact.v}</dd></div>)}</dl><div className="notebook-interests"><span>Ce que j’explore</span>{profile.interests.map(interest=><p key={interest}>{interest}</p>)}</div><p className="notebook-footnote">Les descriptions qui suivent présentent les projets, leur contexte et les traces disponibles : code, captures ou résultats d’expériences.</p></aside>
        </div></section>

        <section className="section expertise-section" id="competences"><div className="scene-stage section expertise-section">
          <div className="expertise-layout">
            <div className="expertise-lead"><p className="eyebrow"><span /> Compétences</p><h2>Les outils<br />dans mes projets<span>.</span></h2><p className="section-intro">Python et TypeScript occupent la plus grande place dans mon travail. Les autres outils interviennent selon le projet : entraînement, interface web, commande d’une maquette ou simulation physique.</p><a className="text-link" href="#projets">Les voir dans mes projets <Arrow diagonal /></a><span className="expertise-decoration" aria-hidden="true">&#123; &#125;</span></div>
            <div className="expertise-grid">{skills.map((group, index) => <article className="expertise-group" key={group.label}><div className="expertise-group-heading"><span className="group-number">0{index + 1}</span><h3>{group.label}</h3></div><p className="skill-context">{["Python pour les expériences et les moteurs de calcul ; TypeScript pour les interfaces. J’utilise également SQL, Kotlin et C/C++ selon les travaux.","React et Vite pour RiskSim, Flask pour le projet clinique. L’interface permet de manipuler les données et d’examiner les résultats du calcul.","LightGBM pour les données tabulaires, PyTorch pour les réseaux, Optuna pour les expériences et SHAP pour examiner les contributions des variables.","Git et Linux pour développer, les tests pour vérifier les traitements. Raspberry Pi et LTspice relient la programmation aux systèmes physiques."][index]}</p><div className="tool-tags">{group.items.map((item, i) => <span className={i < 2 ? 'primary-tool' : ''} key={item}>{item}</span>)}</div></article>)}</div>
          </div>
        </div></section>

        <section className="section competition-section" id="competitions"><div className="scene-stage section competition-section">
          <div className="awards-heading"><div><p className="eyebrow"><span /> Kaggle & Zindi · 2026</p><h2>En compétition<span>.</span></h2></div><div className="award-total"><strong>3</strong><span>médailles<br />de bronze</span></div></div>
          <div className="competition-intro"><p>Les compétitions me font travailler sur des données et des problèmes très différents. Je construis des variables, compare les modèles et examine les erreurs ; la validation détermine ensuite ce que je peux réellement conclure de ces essais.</p><p>Trois participations ont été récompensées par une médaille de bronze. Les classements ci-dessous sont présentés séparément des scores de validation locale documentés dans les projets.</p></div><div className="medal-grid">{competitions.filter(entry => entry.medal).map(entry => <article className="medal-card" key={entry.name}><div className="medal-card-top"><span className="platform-label">{entry.platform}</span><BronzeMedal /></div><p className="medal-label">Médaille de bronze</p><h3>{entry.name}</h3><p className="award-description">{entry.detail}</p><p className="award-story">{entry.name === "NeuroGolf Championship" ? "Une compétition autour de transformations de grilles ARC-AGI et de réseaux compacts. La contrainte porte aussi sur la taille des solutions proposées." : entry.name === "Google WAXAL ASR" ? "Une chaîne audio multilingue, avec une évaluation par langue et une attention à la séparation des locuteurs entre entraînement et validation." : "Des observations radar et optiques à exploiter malgré des mois manquants. Le protocole reproduit ces lacunes pour comparer les modèles."}</p>{entry.result !== 'Médaille de bronze' && <p className="award-placement">{entry.result}</p>}<div className="award-links">{entry.projectId && <button className="text-link" type="button" onClick={() => openProject(projects.find(project => project.index === entry.projectId)!)}>Ma solution <Arrow diagonal /></button>}{entry.href && <a className="text-link" href={entry.href} target="_blank" rel="noreferrer">{entry.linkLabel} <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></article>)}</div>
          <div className="ranking-grid">{competitions.filter(entry => !entry.medal).map(entry => <article className="ranking-card" key={entry.name}><div className="ranking-position"><strong>{entry.result.split(' / ')[0]}</strong><span>sur {entry.result.split(' / ')[1]}</span></div><div><p className="platform-label">{entry.platform} · {entry.year}</p><h3>{entry.name}</h3><p className="award-description">{entry.detail}</p></div><div className="award-links">{entry.projectId && <button className="text-link" type="button" onClick={() => openProject(projects.find(project => project.index === entry.projectId)!)}>Ma solution <Arrow diagonal /></button>}{entry.href && <a className="text-link" href={entry.href} target="_blank" rel="noreferrer">Code <Arrow diagonal /> <span className="sr-only">(s’ouvre dans un nouvel onglet)</span></a>}</div></article>)}</div>
          <div className="competition-studies"><div className="subsection-heading"><p className="eyebrow"><span /> Dans les expériences</p><h3>Les cinq compétitions en images.</h3><p>Chaque participation possède sa propre scène. Les descriptions et les liens disponibles précisent le sujet, les résultats et le travail documenté.</p></div>{competitionProjects.map((project,i)=><ProjectExhibit key={project.index} project={project} order={String(i+1).padStart(2,'0')} onOpen={openProject} compact/>)}</div>
        </div></section>

        <section className="section internship-section" id="experience"><div className="scene-stage section internship-section">
          <div className="experience-heading"><p className="eyebrow"><span /> Expérience · CHOUBEL · 2026</p><h2>RiskSim<span>.</span></h2><p>{projectStories.risksim.subtitle}</p></div>
          <div className="experience-cinema"><ProjectVisual kind="risk"/></div><div className="experience-editorial"><div className="experience-copy"><p className="internship-date">Stage d’observation<br />15 juillet — 28 août 2026</p>{projectStories.risksim.paragraphs.map(text=><p key={text}>{text}</p>)}<div className="experience-delivered"><span>Du moteur à l’application</span><p>{projectStories.risksim.result}</p></div><button className="button button-primary" type="button" onClick={()=>openProject(internship)}>Lire la fiche technique <Arrow diagonal /></button></div><div className="experience-media"><ProjectGallery kind="risksim"/></div></div>
        </div></section>

        <section className="section projects-section" id="projets"><div className="scene-stage section projects-section">
          <div className="section-heading"><div><p className="eyebrow"><span /> Logiciel & ingénierie</p><h2>Les projets,<br />de plus près<span>.</span></h2></div><p className="section-note">Applications, machine learning et systèmes physiques : chaque projet est présenté avec sa démarche et les éléments que l’on peut consulter.</p></div>
          <div className="project-collection">{featuredProjects.map((project,i)=><ProjectExhibit key={project.index} project={project} order={String(i+1).padStart(2,'0')} onOpen={openProject}/>)}</div>
          <div className="experimental-project"><div className="subsection-heading"><p className="eyebrow"><span /> Physique expérimentale</p><h3>Du côté du laboratoire.</h3></div>{otherProjects.map(project=><ProjectExhibit key={project.index} project={project} order="05" onOpen={openProject}/>)}</div>
        </div></section>

        <section className="section journey-section" id="parcours"><div className="scene-stage section journey-section"><div className="section-heading"><div><p className="eyebrow"><span /> Formation</p><h2>Du Bénin<br />à Casablanca<span>.</span></h2></div><p className="section-note">Un parcours en informatique et en sciences, poursuivi dans une formation d’ingénieur généraliste.</p></div><div className="education-list">{education.map((item,i)=><article key={item.school+item.detail}><span className="education-period">{item.period || 'Formation scientifique'}</span><div><h3>{item.school}</h3><p>{item.detail}</p><p className="education-description">{["J’y poursuis ma formation d’ingénieur en associant cours scientifiques, travaux expérimentaux et projets. Les études présentées ici en machine learning, simulation et systèmes embarqués s’inscrivent dans ce parcours.","Cette licence constitue la partie informatique de mon parcours avant Centrale. Elle précède mes projets actuels de développement logiciel et d’apprentissage automatique.","Les classes préparatoires font partie de ma formation scientifique à l’IMSP. Elles complètent mon parcours en technologies de l’information et de la communication.","Baccalauréat obtenu au Bénin, avant la poursuite de mes études supérieures à l’IMSP."][i]}</p></div><span className="education-place">{item.location}</span></article>)}</div></div></section>

        <section className="contact-section" id="contact"><div className="scene-stage contact-section"><div><p className="eyebrow"><span /> Contact</p><h2>Un projet,<br />une question<span> ?</span></h2><p>Vous travaillez sur un sujet proche de l’un de ces projets, vous souhaitez discuter d’une méthode ou proposer une collaboration étudiante ? Vous pouvez m’écrire.</p><p>Mes dépôts GitHub regroupent le code et la documentation disponibles. Mon CV présente mon parcours de formation et mes expériences.</p></div><div className="contact-actions"><a className="button button-dark" href={`mailto:${contact.email}?subject=Échange%20autour%20du%20portfolio`}>M’écrire <Arrow diagonal /></a><a className="text-link" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV <Arrow diagonal /></a></div><div className="contact-links"><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /><span className="sr-only"> (nouvel onglet)</span></a>{contact.linkedin&&<a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /><span className="sr-only"> (nouvel onglet)</span></a>}</div></div></section>
      </main>
      <footer className={`wrap deck-controls${chromeTheme}`} aria-label="Navigation des slides">
        <div className="deck-label" aria-live="polite"><strong>{String(slideIndex + 1).padStart(2, '0')}<span> / {String(slides.length).padStart(2, '0')}</span></strong><span key={activeSlide.id}>{activeSlide.label}</span><span className="deck-scroll-hint">Défilez pour naviguer</span></div>
        <nav className="deck-dots" aria-label="Choisir une slide">{slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => navigateTo(index)} aria-label={`Slide ${index + 1} : ${slide.label}`} aria-current={slideIndex === index ? 'step' : undefined} title={slide.label}><span /></button>)}</nav>
        <div className="deck-arrows"><button type="button" onClick={() => navigateTo(slideIndex - 1)} disabled={slideIndex === 0} aria-label="Slide précédente">←</button><button type="button" onClick={() => navigateTo(slideIndex + 1)} disabled={slideIndex === slides.length - 1} aria-label="Slide suivante">→</button></div>
      </footer>

      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={closeProject} onClose={event => { if (!event.currentTarget.open) setProjectOpen(false) }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject() } }}>
        {selected && <><div className="dialog-heading"><p className="eyebrow">{selected.category ?? selected.context}</p><button className="dialog-close" type="button" onClick={closeProject} aria-label="Fermer la fiche projet" autoFocus>×</button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-context">{selected.context} · {selected.period}{selected.status && ` · ${selected.status}`}</p><p className="dialog-summary">{projectStories[selected.index].subtitle}</p><div className="dossier-prose">{projectStories[selected.index].paragraphs.map(text=><p key={text}>{text}</p>)}</div>{selected.index==='01'?<ProjectGallery key={selected.index} kind="clinical"/>:selected.index==='risksim'?<ProjectGallery key={selected.index} kind="risksim"/>:<ProjectVisual key={selected.index} kind={projectVisualKind[selected.index]??'automl'}/>}<h3>Approche technique</h3><p className="case-text">{projectStories[selected.index].method}</p><h3>Ce qui a été réalisé</h3><p className="case-text">{projectStories[selected.index].result}</p>{projectStories[selected.index].note&&<p className="project-note">{projectStories[selected.index].note}</p>}{selected.evidence&&<a className="text-link" href={selected.evidence.href} target="_blank" rel="noreferrer">{selected.evidence.label} <Arrow diagonal /><span className="sr-only"> (nouvel onglet)</span></a>}<div className="stack">{selected.stack.map(item=><span key={item}>{item}</span>)}</div><div className="dialog-links">{selected.links.code&&<a className="button button-primary" href={selected.links.code} target="_blank" rel="noreferrer">Explorer le dépôt <Arrow diagonal /><span className="sr-only"> (nouvel onglet)</span></a>}</div></>}

      </dialog>
    </>
  )
}

export default App
