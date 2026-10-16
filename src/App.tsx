import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { useMotion } from './hooks/useMotion'
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
  { id: 'competitions', label: 'Compétitions' },
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
const readingOrder = [risksim, ...competitionProjects, ...softwareProjects]

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
  return <svg className={small ? 'bronze-icon small' : 'bronze-icon'} viewBox="0 0 80 96" fill="none" aria-hidden="true">
    <path d="M16 3h18l15 35-19 10L16 3Z" fill="#274a78"/><path d="M46 3h18L50 48 31 38 46 3Z" fill="#4778ac"/>
    <path d="m22 3 13 36M58 3 45 39" stroke="#dce8f5" strokeWidth="3"/>
    <circle cx="40" cy="59" r="32" fill="#754321"/><circle cx="40" cy="57" r="31" fill="#c58a50"/>
    <circle cx="40" cy="57" r="26" stroke="#f6d1a2" strokeWidth="2"/><circle cx="40" cy="57" r="22" fill="#ad6f39"/>
    <path d="m40 41 4.7 9.5 10.5 1.5-7.6 7.4 1.8 10.5L40 65l-9.4 4.9 1.8-10.5-7.6-7.4 10.5-1.5L40 41Z" fill="#ffe1b9" stroke="#754321" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M19 72a27 27 0 0 0 42 0" stroke="#eab77e" strokeWidth="2" strokeLinecap="round"/>
  </svg>
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
  const pageNumber = String(readingOrder.findIndex(item => item.index === project.index) + 1).padStart(2, '0')
  return <article className={`card project-expanded project-${project.index}`} id={`projet/${project.index}`} data-project-id={project.index} aria-labelledby={`title-${project.index}`}>
    <div className="sheet-label"><span><span className="sheet-number">{pageNumber}</span> / {readingOrder.length} · {competition ? 'Compétition' : 'Projet'}</span><span>{shortNames[project.index]}</span><span className="sheet-progress" aria-hidden="true"><i/></span></div>
    <header className="expanded-heading"><span className="overline">{project.context} · {project.period}</span><Heading id={`title-${project.index}`}>{shortNames[project.index]}</Heading>{competition && <p className="expanded-ranking">{competition.medal && <Medal small/>}{competition.medal ? `Bronze · ${competition.platform}` : competition.result + ' · ' + competition.platform}{competition.projectId === 'neurogolf' && <span>220e / 2 963 équipes · top 7,4 %</span>}</p>}<p className="expanded-subtitle">{story.subtitle}</p></header>
    {project.index !== 'risksim' && <div className="expanded-media"><div className="expanded-media-inner">{project.index === '01' ? <ProjectGallery kind="clinical"/> : <ProjectVisual kind={projectVisualKind[project.index] ?? 'automl'}/>}</div></div>}
    <div className="expanded-copy">
      <div className="expanded-prose">{story.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      <div className="expanded-summary"><div><h4>Approche</h4><p>{story.method}</p></div><div><h4>Résultat</h4><p>{story.result}</p></div></div>
      {story.note && <p className="project-note">{story.note}</p>}
    </div>
    {project.index === 'risksim' && <section className="risk-interface-section" aria-labelledby="risk-interface-heading"><header><span className="overline">L’application</span><h3 id="risk-interface-heading">Ce que voit l’utilisateur</h3><p>Le tableau de bord réunit les hypothèses, le portefeuille de risques et l’historique des scénarios. L’écran de résultats affiche la distribution des coûts, les percentiles P50, P80 et P90 et le classement des risques par sensibilité.</p></header><div className="expanded-media"><ProjectGallery kind="risksim"/></div></section>}
    <footer className="expanded-project-footer"><div className="expanded-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="expanded-links">{project.links.code && <a className="solid-link" href={project.links.code} target="_blank" rel="noreferrer">Voir le code <Icon name="github" size={18}/><span className="sr-only"> (nouvel onglet)</span></a>}{project.evidence && <a className="inline-link" href={project.evidence.href} target="_blank" rel="noreferrer">{project.evidence.label} <Icon name="arrow" size={17}/><span className="sr-only"> (nouvel onglet)</span></a>}</div></footer>
  </article>
}

function App() {
  const [active, setActive] = useState('accueil')
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('portfolio-horizontal-theme') === 'dark' } catch { return false }
  })
  const navigate = (id: string, behavior: ScrollBehavior = 'smooth', push = true) => {
    const element = document.getElementById(id)
    if (!element) return
    if (element.matches('.project-expanded')) element.classList.add('direct-arrival')
    const motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior
    element.scrollIntoView({ behavior: motion, block: 'start' })
    if (panels.some(panel => panel.id === id)) setActive(id)
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
      cancelAnimationFrame(initial); window.removeEventListener('popstate', followLocation); window.removeEventListener('hashchange', followLocation)
      document.removeEventListener('click', anchors)
    }
  }, [])
  useEffect(() => {
    let frame = 0
    const anchors = ['accueil', 'competitions', 'projets', 'apropos', 'parcours', 'competences', 'contact']
    const position = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let current = 'accueil'
        anchors.forEach(id => {
          if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 130) current = id
        })
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'contact'
        setActive(current)
      })
    }
    position()
    window.addEventListener('scroll', position, { passive: true })
    window.addEventListener('resize', position)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', position); window.removeEventListener('resize', position) }
  }, [])
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('page-arrived'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.project-expanded,.collection-intro,.about-card,.education-card,.expanded-skills-card,.contact-card').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  useMotion()
  const changeTheme = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const next = !dark
    try { localStorage.setItem('portfolio-horizontal-theme', next ? 'dark' : 'light') } catch { /* Theme works without storage. */ }
    const doc = document as Document & { startViewTransition?: (update: () => void) => unknown }
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) { setDark(next); return }
    const box = event.currentTarget.getBoundingClientRect()
    document.documentElement.style.setProperty('--vt-x', `${box.left + box.width / 2}px`)
    document.documentElement.style.setProperty('--vt-y', `${box.top + box.height / 2}px`)
    doc.startViewTransition(() => flushSync(() => setDark(next)))
  }

  return <div className="horizontal-site" data-theme={dark ? 'dark' : 'light'}>
    <div className="reading-progress" aria-hidden="true"><i/></div>
    <a className="skip-link" href="#main">Aller au contenu</a>
    <header className="topbar"><nav className="top-links" aria-label="Navigation principale"><a href="#accueil" aria-current={(active === 'accueil' || active === 'liens') ? 'location' : undefined}>Rudolf Hounlete</a><span aria-hidden="true">/</span><a href="#competitions" aria-current={active === 'competitions' ? 'location' : undefined}>Compétitions</a><a href="#projets" aria-current={active === 'projets' ? 'location' : undefined}>Projets</a><a href="#contact" aria-current={active === 'contact' ? 'location' : undefined}>Contact</a></nav><button type="button" className="theme-switch" onClick={changeTheme} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'} title={dark ? 'Thème clair' : 'Thème sombre'}><span className={!dark ? 'chosen' : ''}><Icon name="sun" size={16}/></span><span className={dark ? 'chosen' : ''}><Icon name="moon" size={16}/></span></button></header>
    <main className="horizontal-track" id="main" tabIndex={-1} aria-label="Portfolio de Rudolf Hounlete">
      <section className="rail-panel profile-panel" id="accueil" aria-labelledby="profile-name"><article className="card intro-card"><div className="person-line"><img src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="136" height="136" fetchPriority="high"/><div><h1 id="profile-name">Rudolf Hounlete</h1><p><span className="status-dot"/>Élève ingénieur · promo 2028</p></div></div><p className="intro-text">Élève ingénieur à <span>Centrale Casablanca,</span> je développe des modèles de <span>machine learning</span> et les applications qui les accompagnent. Trois médailles de bronze sur Kaggle et Zindi, et une application de simulation de risques développée en stage.</p><a className="inline-link intro-more" href="#apropos">À propos de moi <Icon name="arrow" size={15}/></a><div className="location"><p>Basé à Casablanca, Maroc.</p><span>Originaire du Bénin</span></div><Globe/></article></section>
      <section className="rail-panel links-panel" id="liens" aria-label="Liens et distinctions"><div className="social-grid">
        <a className="card social-card github-card" href={contact.github} target="_blank" rel="noreferrer"><Icon name="github" size={28}/><div><strong>@Rudolf-Staline</strong><span>Code et projets</span></div><span className="card-corner"><Icon name="arrow" size={16}/></span><span className="sr-only"> (nouvel onglet)</span></a>
        <a className="card social-card medal-card" href="#competitions"><Medal/><div><strong>3 médailles</strong><span>de bronze</span></div></a>
        <a className="card social-card cv-card" href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download><Icon name="download"/><strong>Mon CV</strong></a>
        <a className="card email-card" href={`mailto:${contact.email}`}><Icon name="mail"/><span>{contact.email}</span></a>
        <a className="card social-card kaggle-card" href="#competitions"><span className="brand-letter">k</span><div><strong>Kaggle</strong><span>1 médaille de bronze</span></div></a>
        <a className="card social-card zindi-card" href="#competitions"><span className="brand-letter">z.</span><div><strong>Zindi</strong><span>2 médailles de bronze</span></div></a>
        <a className="card social-card skills-link" href="#competences"><Icon name="code"/><strong>Compétences</strong></a>
      </div></section>
      <section className="rail-panel expanded-risk-panel" aria-labelledby="title-risksim"><ProjectArticle project={risksim}/></section>
      <section className="rail-panel collection-panel" id="competitions" aria-labelledby="competitions-heading"><div className="project-grid"><article className="card collection-intro"><div><span className="overline">Kaggle & Zindi</span><h2 id="competitions-heading">Trois médailles, deux places dans le top 5.</h2><p>Raisonnement visuel, reconnaissance vocale, imagerie satellite, finance : cinq compétitions Kaggle et Zindi, avec une 2e place sur 77 et une 4e place sur 262 en plus des trois médailles de bronze.</p></div><div className="three-medals"><Medal/><Medal/><Medal/><span>3 médailles<br/>de bronze</span></div></article>{competitionProjects.map(item => <ProjectArticle key={item.index} project={item}/>)}</div></section>
      <section className="rail-panel collection-panel" id="projets" aria-labelledby="projects-heading"><div className="project-grid"><article className="card collection-intro software-intro"><div><span className="overline">Logiciel & expérimentation</span><h2 id="projects-heading">Projets et réalisations.</h2><p>Une application de simulation de risques développée en entreprise, un pipeline AutoML testé par 393 tests, un prototype clinique explicable, une maquette de carrefour pilotée par caméra.</p></div><a className="inline-link" href="#competences">Compétences et outils <Icon name="arrow" size={16}/></a></article>{softwareProjects.map(item => <ProjectArticle key={item.index} project={item}/>)}</div></section>
      <section className="rail-panel about-panel" id="apropos" aria-labelledby="about-heading"><article className="card about-card"><span className="overline">À propos</span><h2 id="about-heading">Qui je suis.</h2>{profile.about.map(text => <p key={text}>{text}</p>)}<div className="about-facts">{profile.facts.slice(0, 3).map(fact => <div key={fact.k}><span>{fact.k}</span><strong>{fact.v}</strong></div>)}</div><div className="expanded-stack">{profile.interests.map(item => <span key={item}>{item}</span>)}</div></article></section>
      <section className="rail-panel education-panel" id="parcours" aria-labelledby="education-heading"><article className="card education-card"><span className="overline">Formation</span><h2 id="education-heading">Bénin → Maroc.</h2><div className="education-entries">{education.map(item => <div key={item.school + item.detail}><span className="education-date">{item.period || 'Formation scientifique'}</span><h3>{item.school}</h3><p>{item.detail}</p><span className="education-country">{item.location}</span></div>)}</div></article></section>
      <section className="rail-panel expanded-skills-panel" id="competences" aria-labelledby="skills-heading"><article className="card expanded-skills-card"><header><span className="overline">Compétences</span><h2 id="skills-heading">Mes outils.</h2><p>{editorial.skillsIntro}</p></header><div className="expanded-skills-grid">{skills.map((group, i) => <section key={group.label}><h3>{group.label}</h3><p>{editorial.skillContexts[i]}</p><div className="expanded-stack">{group.items.map(item => <span key={item}>{item}</span>)}</div></section>)}</div></article></section>
      <section className="rail-panel contact-panel" id="contact" aria-labelledby="contact-heading"><article className="card contact-card"><div className="contact-mark"><Icon name="mail" size={34}/></div><div><span className="overline">Contact</span><h2 id="contact-heading">Travaillons ensemble.</h2><p>Un stage, une collaboration, un projet de données ou une question sur ces travaux ? Écrivez-moi.</p><a className="contact-address" href={`mailto:${contact.email}`}>{contact.email} <Icon name="arrow" size={18}/></a></div><div className="contact-bottom"><a href={contact.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" size={15}/><span className="sr-only"> (nouvel onglet)</span></a><a href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV <Icon name="download" size={15}/></a></div></article></section>
    </main>
    <footer className="rail-footer"><p>© 2026 Rudolf Hounlete</p><a className="inline-link" href="#accueil">Retour en haut ↑</a></footer>

  </div>
}
export default App
