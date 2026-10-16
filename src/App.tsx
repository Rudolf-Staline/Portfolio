import { useEffect, useState } from 'react'
import { competitions } from './data/competitions'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'
import { contact, profile } from './data/profile'
import { editorial } from './data/editorial'
import { projectStories } from './data/projectStories'
import type { Project } from './data/types'
import { ProjectGallery } from './features/projects/ProjectGallery'
import { ProjectVisual, projectVisualKind } from './features/projects/ProjectVisual'

const panels = [
  { id: 'accueil', label: 'Présentation' }, { id: 'liens', label: 'Liens & distinctions' },
  { id: 'experience', label: 'RiskSim' }, { id: 'competitions', label: 'Compétitions' },
  { id: 'projets', label: 'Projets' }, { id: 'apropos', label: 'À propos' },
  { id: 'parcours', label: 'Formation' }, { id: 'competences', label: 'Compétences' }, { id: 'contact', label: 'Contact' },
] as const
const shortNames: Record<string, string> = {
  neurogolf: 'NeuroGolf', credit: 'African Credit Scoring', 'financial-stress': 'Stress financier',
  geoai: 'GeoAI Aquaculture', automl: 'Autonomous AutoML', risksim: 'RiskSim',
  waxal: 'WAXAL ASR', '01': 'PediAppend', '02': 'Feux intelligents', '03': 'Analyse Forex', '05': 'Solitons',
}
const visibleProjects = projects.filter(project => !project.placeholder)
const competitionProjects = competitions.map(entry => visibleProjects.find(project => project.index === entry.projectId)!)
const softwareProjects = ['automl', '01', '02', '03', '05'].map(id => visibleProjects.find(project => project.index === id)!)
const risksim = visibleProjects.find(project => project.index === 'risksim')!

function Icon({ name, size = 23 }: { name: 'arrow' | 'mail' | 'github' | 'code' | 'sun' | 'moon' | 'download'; size?: number }) {
  const paths = {
    arrow: <path d="M6 18 18 6M6 6h12v12" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    github: <path d="M9 19c-4 1.3-4-2-6-2m12 5v-3.4c0-1 .1-1.5-.5-2.1 3.3-.4 6.5-1.6 6.5-7A5.3 5.3 0 0 0 19.5 6a5 5 0 0 0-.1-3s-1.2-.4-3.6 1.3a12.2 12.2 0 0 0-6.6 0C6.8 2.6 5.6 3 5.6 3a5 5 0 0 0-.1 3A5.3 5.3 0 0 0 4 9.5c0 5.4 3.2 6.6 6.5 7-.6.6-.5 1.4-.5 2.1V22" />,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13Z" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
function Medal({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'bronze-icon small' : 'bronze-icon'} viewBox="0 0 64 76" fill="none" aria-hidden="true"><path d="M11 2h15l10 26-15 8L11 2Z" fill="#b4ac9a"/><path d="M38 2h15L43 36l-15-8L38 2Z" fill="#ddd7c8"/><circle cx="32" cy="48" r="24" fill="#bd8859"/><circle cx="32" cy="48" r="18.5" stroke="#f0d6b6" strokeWidth="1.5"/><path d="m32 36 3.5 7 8 1-6 6 1.5 8-7-4-7 4 1.5-8-6-6 8-1 3.5-7Z" fill="#f8e5ce"/></svg>
}
// Original decorative sphere; not a geographic map.
const globeDots = Array.from({ length: 29 }, (_, row) => {
  const lat = -Math.PI / 2 + (row + 1) * Math.PI / 30
  return Array.from({ length: 54 }, (_, col) => {
    const lon = -Math.PI / 2 + col * Math.PI / 53
    const patch = Math.sin(lon * 3.7 + lat * 2) + Math.cos(lat * 6.1 - lon * 2.8)
    return <circle key={`${row}-${col}`} cx={120 + Math.cos(lat) * Math.sin(lon) * 112} cy={120 + Math.sin(lat) * 112} r={patch > .1 ? 1.2 : .55} opacity={Math.cos(lat) * Math.cos(lon) * (patch > .1 ? .58 : .15)}/>
  })
})
function Globe() { return <div className="dot-globe" aria-hidden="true"><svg viewBox="0 0 240 240" fill="currentColor">{globeDots}</svg></div> }

function ProjectArticle({ project }: { project: Project }) {
  const competition = competitions.find(entry => entry.projectId === project.index)
  const story = projectStories[project.index]
  const Heading = project.index === 'risksim' ? 'h2' : 'h3'
  return <article className={`card project-expanded project-${project.index}`} id={`projet/${project.index}`} data-project-id={project.index} aria-labelledby={`title-${project.index}`}>
    <div className="expanded-media"><div className="expanded-media-inner">
      {project.index === 'risksim' ? <ProjectGallery kind="risksim"/> : project.index === '01' ? <ProjectGallery kind="clinical"/> : <ProjectVisual kind={projectVisualKind[project.index] ?? 'automl'}/>}
      <div className="expanded-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
      <div className="expanded-links">{project.links.code && <a className="solid-link" href={project.links.code} target="_blank" rel="noreferrer">Explorer le dépôt <Icon name="github" size={18}/><span className="sr-only"> (nouvel onglet)</span></a>}{project.evidence && <a className="inline-link" href={project.evidence.href} target="_blank" rel="noreferrer">{project.evidence.label} <Icon name="arrow" size={17}/><span className="sr-only"> (nouvel onglet)</span></a>}</div>
    </div></div>
    <div className="expanded-copy"><header><span className="overline">{project.context} · {project.period}</span><Heading id={`title-${project.index}`}>{shortNames[project.index]}</Heading>{competition && <p className="expanded-ranking">{competition.medal && <Medal small/>}{competition.medal ? `Bronze · ${competition.platform}` : competition.result + ' · ' + competition.platform}{competition.projectId === 'neurogolf' && <span>220e / 2 963 équipes · top 7,4 %</span>}</p>}<p className="expanded-subtitle">{story.subtitle}</p></header>
      <div className="expanded-prose">{story.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      <div className="expanded-summary"><div><h4>Approche technique</h4><p>{story.method}</p></div><div><h4>Ce qui a été réalisé</h4><p>{story.result}</p></div></div>
      {story.note && <p className="project-note">{story.note}</p>}
    </div>
  </article>
}

function App() {
  const [active, setActive] = useState(0)
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('portfolio-horizontal-theme') === 'dark' } catch { return false }
  })
  const navigate = (id: string, behavior: ScrollBehavior = 'smooth', push = true) => {
    const element = document.getElementById(id)
    if (!element) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior
    const offset = window.innerWidth <= 760 ? 92 : 112
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - offset, behavior: motion })
    const index = panels.findIndex(panel => panel.id === id)
    if (index >= 0) setActive(index)
    if (push && window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)
  }
  useEffect(() => {
    const followLocation = () => {
      const hash = decodeURIComponent(location.hash.slice(1))
      if (hash.startsWith('projet/') && visibleProjects.some(project => project.index === hash.slice(7))) { navigate(hash, 'instant', false); return }
      if (hash === 'fiche/about') { navigate('apropos', 'instant', false); return }
      if (hash === 'fiche/skills') { navigate('competences', 'instant', false); return }
      if (panels.some(panel => panel.id === hash)) navigate(hash, 'instant', false)
    }
    const initial = requestAnimationFrame(followLocation)
    window.addEventListener('load', followLocation)
    const anchors = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      const panel = panels.find(item => `#${item.id}` === anchor?.getAttribute('href'))
      if (!panel) return
      event.preventDefault(); navigate(panel.id)
    }
    window.addEventListener('popstate', followLocation); window.addEventListener('hashchange', followLocation)
    document.addEventListener('click', anchors)
    return () => {
      cancelAnimationFrame(initial); window.removeEventListener('load', followLocation); window.removeEventListener('popstate', followLocation); window.removeEventListener('hashchange', followLocation)
      document.removeEventListener('click', anchors)
    }
  }, [])
  useEffect(() => {
    let frame = 0
    const anchors = ['accueil', 'competitions', 'projets', 'apropos', 'parcours', 'competences', 'contact']
    const position = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let current = 0
        anchors.forEach(id => {
          if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 130) current = panels.findIndex(panel => panel.id === id)
        })
        setActive(current)
      })
    }
    window.addEventListener('scroll', position, { passive: true })
    window.addEventListener('resize', position)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', position); window.removeEventListener('resize', position) }
  }, [])
  const changeTheme = () => setDark(current => {
    try { localStorage.setItem('portfolio-horizontal-theme', current ? 'light' : 'dark') } catch { /* Theme works without storage. */ }
    return !current
  })

  return <div className="horizontal-site" data-theme={dark ? 'dark' : 'light'}>
    <a className="skip-link" href="#main">Aller au contenu</a>
    <header className="topbar"><nav className="top-links" aria-label="Navigation principale"><a href="#accueil" aria-current={active < 3 ? 'location' : undefined}>Rudolf Hounlete</a><span aria-hidden="true">/</span><a href="#competitions" aria-current={active === 3 ? 'location' : undefined}>Compétitions</a><a href="#projets" aria-current={active === 4 ? 'location' : undefined}>Projets</a><a href="#contact" aria-current={active === 8 ? 'location' : undefined}>Contact</a></nav><button type="button" className="theme-switch" onClick={changeTheme} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'} title={dark ? 'Thème clair' : 'Thème sombre'}><span className={!dark ? 'chosen' : ''}><Icon name="sun" size={16}/></span><span className={dark ? 'chosen' : ''}><Icon name="moon" size={16}/></span></button></header>
    <main className="horizontal-track" id="main" tabIndex={-1} aria-label="Portfolio de Rudolf Hounlete">
      <section className="rail-panel profile-panel" id="accueil" aria-labelledby="profile-name"><article className="card intro-card"><div className="person-line"><img src="/portrait-rudolf.webp" alt="Portrait de Rudolf Hounlete" width="840" height="840" fetchPriority="high"/><div><h1 id="profile-name">Rudolf Hounlete</h1><p><span className="status-dot"/>Étudiant ingénieur</p></div></div><p className="intro-text">Des applications et des modèles de <span>machine learning</span> pour des problèmes de simulation, de données et de systèmes. À <span>Centrale Casablanca,</span> du calcul au logiciel utilisable.</p><a className="inline-link intro-more" href="#apropos">À propos de moi <Icon name="arrow" size={15}/></a><div className="location"><p>Basé à Casablanca, Maroc.</p><span>Originaire du Bénin</span></div><Globe/></article></section>
      <section className="rail-panel links-panel" id="liens" aria-label="Liens et distinctions"><div className="social-grid">
        <a className="card social-card github-card" href={contact.github} target="_blank" rel="noreferrer"><Icon name="github" size={28}/><div><strong>@Rudolf-Staline</strong><span>Mes dépôts GitHub</span></div><span className="card-corner"><Icon name="arrow" size={16}/></span><span className="sr-only"> (nouvel onglet)</span></a>
        <a className="card social-card medal-card" href="#competitions"><Medal/><div><strong>3 médailles</strong><span>de bronze</span></div></a>
        <a className="card social-card cv-card" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download><Icon name="download"/><strong>Mon CV</strong></a>
        <a className="card email-card" href={`mailto:${contact.email}`}><Icon name="mail"/><span>{contact.email}</span></a>
        <a className="card social-card kaggle-card" href="#competitions"><span className="brand-letter">k</span><div><strong>Kaggle</strong><span>1 médaille de bronze</span></div></a>
        <a className="card social-card zindi-card" href="#competitions"><span className="brand-letter">z.</span><div><strong>Zindi</strong><span>2 médailles de bronze</span></div></a>
        <a className="card social-card skills-link" href="#competences"><Icon name="code"/><strong>Mes outils</strong></a>
      </div></section>
      <section className="rail-panel feature-panel" id="experience" aria-labelledby="risk-heading"><article className="card risk-card"><div className="risk-open"><div className="risk-image"><div className="risk-window"><div className="risk-window-bar"><span/><span/><span/><small>RiskSim</small></div><img src="/projects/risksim-dashboard.png" alt="Capture de l’interface RiskSim sur un scénario de démonstration" width="1440" height="1100" decoding="async"/></div><span className="risk-chip">Python + React</span></div><div className="risk-copy"><span className="overline">Logiciel · CHOUBEL · 2026</span><h2 id="risk-heading">RiskSim</h2><p>{projectStories.risksim.subtitle}</p><span className="tile-meta">Simulation Monte Carlo · Application Windows</span></div></div></article></section>
      <section className="rail-panel expanded-risk-panel" aria-labelledby="title-risksim"><ProjectArticle project={risksim}/></section>
      <section className="rail-panel collection-panel" id="competitions" aria-labelledby="competitions-heading"><div className="project-grid"><article className="card collection-intro"><div><span className="overline">Kaggle & Zindi</span><h2 id="competitions-heading">En compétition.</h2><p>Des grilles à transformer, des voix à transcrire, des données satellitaires incomplètes. À chaque participation, une autre façon d’aborder le machine learning.</p></div><div className="three-medals"><Medal/><Medal/><Medal/><span>3 médailles<br/>de bronze</span></div></article>{competitionProjects.map(item => <ProjectArticle key={item.index} project={item}/>)}</div></section>
      <section className="rail-panel collection-panel" id="projets" aria-labelledby="projects-heading"><div className="project-grid"><article className="card collection-intro software-intro"><div><span className="overline">Logiciel & expérimentation</span><h2 id="projects-heading">Mes projets.</h2><p>Du notebook à l’interface, de la caméra à la maquette. Voici ce que j’ai construit et les questions que j’ai voulu explorer.</p></div><a className="inline-link" href="#competences">Les outils utilisés <Icon name="arrow" size={16}/></a></article>{softwareProjects.map(item => <ProjectArticle key={item.index} project={item}/>)}</div></section>
      <section className="rail-panel about-panel" id="apropos" aria-labelledby="about-heading"><article className="card about-card"><span className="overline">À propos</span><h2 id="about-heading">Derrière les projets.</h2>{profile.about.map(text => <p key={text}>{text}</p>)}<div className="about-facts">{profile.facts.slice(0, 3).map(fact => <div key={fact.k}><span>{fact.k}</span><strong>{fact.v}</strong></div>)}</div><div className="expanded-stack">{profile.interests.map(item => <span key={item}>{item}</span>)}</div></article></section>
      <section className="rail-panel education-panel" id="parcours" aria-labelledby="education-heading"><article className="card education-card"><span className="overline">Formation</span><h2 id="education-heading">Bénin → Maroc.</h2><div className="education-entries">{education.map(item => <div key={item.school + item.detail}><span className="education-date">{item.period || 'Formation scientifique'}</span><h3>{item.school}</h3><p>{item.detail}</p><span className="education-country">{item.location}</span></div>)}</div></article></section>
      <section className="rail-panel expanded-skills-panel" id="competences" aria-labelledby="skills-heading"><article className="card expanded-skills-card"><header><span className="overline">Compétences</span><h2 id="skills-heading">Mes outils.</h2><p>{editorial.skillsIntro}</p></header><div className="expanded-skills-grid">{skills.map((group, i) => <section key={group.label}><h3>{group.label}</h3><p>{editorial.skillContexts[i]}</p><div className="expanded-stack">{group.items.map(item => <span key={item}>{item}</span>)}</div></section>)}</div></article></section>
      <section className="rail-panel contact-panel" id="contact" aria-labelledby="contact-heading"><article className="card contact-card"><div className="contact-mark"><Icon name="mail" size={34}/></div><div><span className="overline">Contact</span><h2 id="contact-heading">On en parle ?</h2><p>Une question sur un projet, une expérience à comparer ou une idée à développer ensemble ?</p><a className="contact-address" href={`mailto:${contact.email}`}>{contact.email} <Icon name="arrow" size={18}/></a></div><div className="contact-bottom"><a href={contact.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" size={15}/><span className="sr-only"> (nouvel onglet)</span></a><a href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV <Icon name="download" size={15}/></a></div></article></section>
    </main>
    <footer className="rail-footer"><p>© 2026 Rudolf Hounlete</p><a className="inline-link" href="#accueil">Retour en haut ↑</a></footer>

  </div>
}
export default App
