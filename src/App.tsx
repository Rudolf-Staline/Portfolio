import { useEffect, useRef, useState } from 'react'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'
import { contact, profile } from './data/profile'
import type { Project } from './data/types'

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
  const dialog = useRef<HTMLDialogElement>(null)
  const visibleProjects = projects.filter(project => !project.placeholder)

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
      <header className="header wrap">
        <a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete — accueil">Rudolf<br />Hounlete<span>.</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fermer' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
        <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navigation principale">
          <a href="#parcours" onClick={() => setMenuOpen(false)}>Parcours</a>
          <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#apropos" onClick={() => setMenuOpen(false)}>À propos</a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Contact <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main" className="wrap">
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <p className="hello"><span className="hello-mark" aria-hidden="true">✳</span> Bonjour, moi c’est Rudolf.</p>
            <h1>Élève ingénieur.<br />Je développe des applications et des modèles de <span className="underlined">machine learning.</span></h1>
            <p className="hero-location">École Centrale Casablanca · Maroc</p>
            <div className="hero-actions"><a className="button button-yellow" href="#projets">Voir mes projets <span className="round-arrow"><Arrow /></span></a><a className="text-link" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Mon CV <Arrow diagonal /></a></div>
          </div>
          <div className="hero-art has-portrait">
            <svg viewBox="0 0 520 450" fill="none" aria-hidden="true"><g className="yellow-strokes" stroke="#f3ca69" strokeLinecap="round"><path className="stroke stroke-one" d="M118 170L344 55" strokeWidth="62"/><path className="stroke stroke-two" d="M95 300L410 143" strokeWidth="68"/><path className="stroke stroke-three" d="M168 389L427 263" strokeWidth="62"/></g><circle cx="85" cy="100" r="5" fill="#282720"/><path d="M443 355V378M432 366H455" stroke="#282720" strokeWidth="2"/></svg>
            <img className="hero-portrait" src="/portrait-rudolf.webp" alt="Portrait de Rudolf Hounlete" width="1122" height="1402" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section className="experience-strip" aria-label="Parcours en bref">
          <p className="eyebrow"><span /> Parcours & expérience</p>
          <div className="experience-items"><div><strong>Centrale Casablanca</strong><span>Cycle ingénieur généraliste</span></div><div><strong>IMSP</strong><span>Licence TIC · Classes préparatoires</span></div><div><strong>CHOUBEL</strong><span>Stage · Développement de RiskSim</span></div></div>
        </section>

        <section className="section projects-section" id="projets">
          <div className="section-heading"><div><p className="eyebrow"><span /> Du code aux applications</p><h2>Une sélection de projets<span>.</span></h2></div><span className="section-note">Logiciel · IA · Simulation</span></div>
          <div className="project-grid">{visibleProjects.map(project => (
            <article className="project-card" key={project.index}>
              <button type="button" className="project-preview" onClick={() => setSelected(project)} aria-label={`Découvrir ${project.title}`}><ProjectVisual project={project} /><span className="preview-arrow"><Arrow diagonal /></span></button>
              <div className="project-copy"><p className="project-meta">{project.category ?? project.context}<span>{project.period}</span></p><h3>{project.title}</h3><p className="project-summary">{project.tagline}</p><button className="text-link" type="button" onClick={() => setSelected(project)}>Découvrir le projet <Arrow diagonal /></button></div>
            </article>
          ))}</div>
        </section>

        <section className="section about-section" id="apropos">
          <div><p className="eyebrow"><span /> À propos</p><h2>Le code comme<br />terrain d’exploration<span>.</span></h2><p className="about-text">{profile.pitch} Du développement web à la simulation, j’aime relier les modèles à une application concrète, puis tester ce qui fonctionne.</p><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mon GitHub <Arrow diagonal /></a></div>
          <div className="skill-list">{skills.map(group => <div key={group.label}><h3>{group.label}</h3><p>{group.items.join(' · ')}</p></div>)}</div>
        </section>

        <section className="section journey-section" id="parcours"><div className="section-heading"><div><p className="eyebrow"><span /> Formation</p><h2>D’où je viens<span>.</span></h2></div></div><div className="education-list">{education.map(item => <article key={item.school + item.detail}><span className="education-period">{item.period}</span><div><h3>{item.school}</h3><p>{item.detail}</p></div><span className="education-place">{item.location}</span></article>)}</div></section>

        <section className="contact-section" id="contact"><div><p className="eyebrow"><span /> Contact</p><h2>Un projet, une idée ?<br />Parlons-en<span>.</span></h2><p>Pour un stage, une collaboration ou une question sur mon travail.</p></div><a className="button button-dark" href={`mailto:${contact.email}`}>M’écrire <span className="round-arrow"><Arrow diagonal /></span></a><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a></section>
      </main>
      <footer className="wrap"><p>Rudolf Hounlete · {new Date().getFullYear()}</p><div><a href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><a href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>CV <Arrow diagonal /></a><a href="#accueil">En haut <span aria-hidden="true">↑</span></a></div></footer>

      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={closeProject} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject() } }}>
        {selected && <><div className="dialog-heading"><p className="eyebrow">{selected.category ?? selected.context}</p><button className="dialog-close" type="button" onClick={closeProject} aria-label="Fermer la fiche projet" autoFocus>×</button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-context">{selected.context} · {selected.period}</p><p className="dialog-summary">{selected.tagline}</p><h3>Le travail réalisé</h3><ul>{selected.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul><div className="stack">{selected.stack.map(item => <span key={item}>{item}</span>)}</div><div className="dialog-links">{selected.links.code && <a className="button button-yellow" href={selected.links.code} target="_blank" rel="noreferrer">Voir le code <Arrow diagonal /></a>}{selected.links.demo && <a className="text-link" href={selected.links.demo} target="_blank" rel="noreferrer">Ouvrir la démo <Arrow diagonal /></a>}</div></>}
      </dialog>
    </>
  )
}

export default App
