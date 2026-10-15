import { useEffect, useRef, useState } from 'react'
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
  { id: 'parcours', label: 'Formation' }, { id: 'contact', label: 'Contact' },
] as const
type Detail = Project | 'about' | 'skills' | null
const imageSources: Record<string, string> = {
  neurogolf: '/cinema/neurogolf-photo.webp', credit: '/cinema/credit-photo.webp',
  'financial-stress': '/cinema/financial-photo.webp', geoai: '/cinema/geoai-aerial-photo.webp',
  automl: '/cinema/automl-photo.webp', risksim: '/projects/risksim-dashboard.png',
  waxal: '/cinema/waxal-photo.webp', '01': '/projects/shap_summary_bar.png',
  '02': '/cinema/traffic-night-photo.webp', '03': '/cinema/forex-photo.webp', '05': '/cinema/soliton-photo.webp',
}
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
function ProjectTile({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const competition = competitions.find(entry => entry.projectId === project.index)
  const story = projectStories[project.index]
  const isExport = project.index === '01'
  return <article className={`work-item work-${project.index}`} data-project-id={project.index} data-reveal>
    <button type="button" className={`work-image${isExport ? ' plot-image' : ''}`} onClick={() => onOpen(project)} aria-label={`Découvrir ${project.title}`}>
      <img src={imageSources[project.index]} alt={isExport ? 'Importance des variables du modèle PediAppend' : ''} width="1672" height="941" loading="lazy" decoding="async"/>
      {competition?.medal && <span className="work-award"><Medal small/> Bronze · {competition.platform}</span>}
      <span className="image-origin">{isExport ? 'Graphique du projet' : 'Illustration créée par IA'}</span>
      <span className="image-arrow"><Icon name="arrow" size={25}/></span>
    </button>
    <div className="work-caption"><span className="overline">{competition ? competition.platform : project.stack.slice(0, 2).join(' / ')} · {project.period}</span><h3><button type="button" onClick={() => onOpen(project)}>{shortNames[project.index]} <Icon name="arrow" size={23}/></button></h3><p className="work-question">{story.subtitle}</p><p className="work-pitch">{story.paragraphs[0]}</p><div className="work-bottom"><span>{competition ? competition.result : project.stack.slice(0, 3).join(' · ')}</span><button type="button" className="text-link" onClick={() => onOpen(project)}>Lire le projet <span aria-hidden="true">↗</span></button></div></div>
  </article>
}

function App() {
  const dialog = useRef<HTMLDialogElement>(null)
  const returnHash = useRef('#accueil')
  const [active, setActive] = useState(0)
  const [detail, setDetail] = useState<Detail>(null)
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('portfolio-horizontal-theme') === 'dark' } catch { return false }
  })
  const navigate = (id: string, behavior: ScrollBehavior = 'smooth', push = true) => {
    const element = document.getElementById(id)
    if (!element) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior
    element.scrollIntoView({ behavior: motion, block: 'start' })
    const index = panels.findIndex(panel => panel.id === id)
    if (index >= 0) setActive(index)
    if (push && window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)
  }
  const openDetail = (next: Exclude<Detail, null>) => {
    returnHash.current = window.location.hash.startsWith('#projet/') ? '#projets' : window.location.hash || '#accueil'
    setDetail(next)
    history.pushState(null, '', typeof next === 'string' ? `#fiche/${next}` : `#projet/${next.index}`)
  }
  const closeDetail = () => { dialog.current?.close(); setDetail(null); history.replaceState(null, '', returnHash.current) }

  useEffect(() => {
    const followLocation = () => {
      const hash = decodeURIComponent(location.hash.slice(1))
      if (hash.startsWith('projet/')) {
        const project = visibleProjects.find(item => item.index === hash.slice(7))
        if (project) {
          const parent = project.index === 'risksim' ? 'experience' : competitions.some(entry => entry.projectId === project.index) ? 'competitions' : 'projets'
          returnHash.current = `#${parent}`
          navigate(parent, 'instant', false)
          setDetail(project)
          return
        }
      }
      if (hash === 'fiche/about' || hash === 'fiche/skills' || hash === 'competences') {
        returnHash.current = '#apropos'; setDetail(hash === 'fiche/about' ? 'about' : 'skills'); return
      }
      setDetail(null)
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
    const responsive = matchMedia('(max-width: 760px)')
    const realign = () => { if (!location.hash.includes('/')) navigate(location.hash.slice(1) || 'accueil', 'instant', false) }
    window.addEventListener('popstate', followLocation); window.addEventListener('hashchange', followLocation)
    document.addEventListener('click', anchors); responsive.addEventListener('change', realign)
    return () => {
      cancelAnimationFrame(initial); window.removeEventListener('popstate', followLocation); window.removeEventListener('hashchange', followLocation)
      document.removeEventListener('click', anchors); responsive.removeEventListener('change', realign)
    }
  }, [])
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (detail && !element.open) element.showModal()
    if (!detail && element.open) element.close()
    if (!detail) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [detail])
  useEffect(() => {
    let frame = 0
    const anchors = ['accueil', 'competitions', 'projets', 'apropos']
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
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-seen'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  const changeTheme = () => setDark(current => {
    try { localStorage.setItem('portfolio-horizontal-theme', current ? 'light' : 'dark') } catch { /* Theme works without storage. */ }
    return !current
  })
  const project = detail && typeof detail !== 'string' ? detail : null

  return <div className="horizontal-site folio-site" data-theme={dark ? 'dark' : 'light'}>
    <a className="skip-link" href="#main">Aller au contenu</a>
    <header className="folio-header"><a className="identity" href="#accueil"><span className="identity-monogram">rh.</span><span>Rudolf Hounlete</span></a><nav aria-label="Navigation principale"><a href="#competitions" aria-current={active === 3 ? 'location' : undefined}>Compétitions</a><a href="#projets" aria-current={active === 4 ? 'location' : undefined}>Projets</a><a href="#apropos">À propos</a><a href="#contact">Contact</a></nav><button type="button" className="theme-toggle" onClick={changeTheme} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}><Icon name={dark ? 'sun' : 'moon'} size={19}/></button></header>
    <main id="main" tabIndex={-1} aria-label="Portfolio de Rudolf Hounlete">
      <section className="folio-hero page-width" id="accueil" aria-labelledby="profile-name">
        <div className="hero-topline"><span><i/>Étudiant ingénieur · Centrale Casablanca</span><span>Portfolio / 2026</span></div>
        <div className="hero-composition"><h1 id="profile-name">Rudolf<br/><em>Hounlete.</em></h1><div className="hero-note"><div className="hero-portrait"><img src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="88" height="88" fetchPriority="high"/><span>Du Bénin<br/>à Casablanca.</span></div><p>Je développe des applications et des modèles de machine learning.</p><p className="hero-description">J’étudie à Centrale Casablanca. Entre compétitions, développement logiciel et expériences de laboratoire, je présente ici les projets sur lesquels je travaille.</p><a className="text-link" href="#experience">Explorer mes projets <span aria-hidden="true">↓</span></a></div></div>
        <div className="hero-bottom" id="liens"><a className="hero-distinctions" href="#competitions"><div><Medal/><Medal/><Medal/></div><span><strong>3 médailles de bronze</strong><small>Kaggle & Zindi</small></span></a><div className="hero-links"><a href={contact.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" size={16}/><span className="sr-only"> (nouvel onglet)</span></a><a href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Mon CV <Icon name="download" size={16}/></a></div><span className="hero-scroll">Défiler pour découvrir <span aria-hidden="true">↓</span></span></div>
      </section>
      <section className="featured-work page-width" id="experience" aria-labelledby="risk-heading" data-project-id="risksim" data-reveal>
        <div className="featured-copy"><span className="section-index">01 / Projet logiciel</span><span className="overline">CHOUBEL · Juillet — août 2026</span><h2 id="risk-heading">RiskSim<span>.</span></h2><p className="featured-question">{projectStories.risksim.subtitle}</p><p className="featured-pitch">{projectStories.risksim.paragraphs[0]}</p><div className="featured-tags"><span>Monte Carlo</span><span>Python + React</span><span>Windows</span></div><button className="text-link" type="button" onClick={() => openDetail(risksim)}>Découvrir RiskSim <Icon name="arrow" size={20}/></button></div>
        <button className="featured-image" type="button" onClick={() => openDetail(risksim)} aria-label="Découvrir RiskSim — Simulation de risques projet"><div className="capture-topline"><span><i/> RiskSim / Application Windows</span><span>Capture du projet</span></div><img src="/projects/risksim-dashboard.png" alt="Tableau de bord RiskSim sur un scénario de démonstration" width="1440" height="1100" decoding="async"/><div className="capture-caption"><span>Du registre de risques à la réserve budgétaire.</span><span aria-hidden="true">↗</span></div></button>
      </section>
      <section className="work-section page-width" id="competitions" aria-labelledby="competitions-heading"><header className="section-heading" data-reveal><div><span className="section-index">02 / Kaggle & Zindi</span><h2 id="competitions-heading">En compétition<span>.</span></h2></div><p>Des grilles à transformer, des voix à transcrire, des observations satellitaires incomplètes. Chaque compétition m’amène à aborder les données autrement.</p></header><div className="works-grid">{competitionProjects.map(item => <ProjectTile key={item.index} project={item} onOpen={openDetail}/>)}</div></section>
      <section className="work-section page-width" id="projets" aria-labelledby="projects-heading"><header className="section-heading" data-reveal><div><span className="section-index">03 / Logiciel & expérimentation</span><h2 id="projects-heading">Les projets<span>.</span></h2></div><p>Une application en ligne de commande, une interface de prédiction, une maquette pilotée par caméra. Des questions différentes, du code et des expériences pour y répondre.</p></header><div className="works-grid software-grid">{softwareProjects.map(item => <ProjectTile key={item.index} project={item} onOpen={openDetail}/>)}</div></section>
      <section className="about-section page-width" id="apropos" aria-labelledby="about-heading" data-reveal><div className="about-aside"><span className="section-index">04 / À propos</span><h2 id="about-heading">Derrière<br/>les projets<span>.</span></h2><div className="about-portrait"><img src="/portrait-rudolf.png" alt="Rudolf Hounlete" width="280" height="280" loading="lazy"/><span>Étudiant ingénieur<br/>Centrale Casablanca</span></div></div><div className="about-prose">{profile.about.map(text => <p key={text}>{text}</p>)}<a className="text-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mes dépôts GitHub <Icon name="arrow" size={19}/><span className="sr-only"> (nouvel onglet)</span></a></div></section>
      <section className="background-section page-width" id="parcours" aria-labelledby="education-heading"><div data-reveal><span className="section-index">Le parcours</span><h2 id="education-heading">Bénin → Maroc.</h2><div className="education-list">{education.map(item => <article key={item.school + item.detail}><span>{item.period || 'Formation scientifique'}</span><div><h3>{item.school}</h3><p>{item.detail}</p></div><small>{item.location}</small></article>)}</div></div><div className="tools-section" data-reveal><span className="section-index">La boîte à outils</span><h2>Ce que j’utilise.</h2>{skills.map(group => <div className="tool-group" key={group.label}><h3>{group.label}</h3><p>{group.items.join(' · ')}</p></div>)}<button type="button" className="text-link" onClick={() => openDetail('skills')}>Comment je les utilise <Icon name="arrow" size={18}/></button></div></section>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="page-width"><span className="section-index">Une idée, une question ?</span><div className="contact-composition"><h2 id="contact-heading">On en parle <em>?</em></h2><a className="contact-circle" href={`mailto:${contact.email}`} aria-label="Écrire à Rudolf par e-mail"><Icon name="arrow" size={42}/></a></div><div className="contact-details"><a href={`mailto:${contact.email}`}>{contact.email}</a><div><a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗<span className="sr-only"> (nouvel onglet)</span></a><a href={contact.cv ?? '/CV_Rudolf_HOUNLETE.pdf'} download>Télécharger mon CV ↓</a></div></div></div></section>
    </main>
    <footer className="folio-footer page-width"><p>© 2026 Rudolf Hounlete</p><span>Casablanca, Maroc</span><a href="#accueil">Retour en haut ↑</a></footer>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="detail-title" onCancel={event => { event.preventDefault(); closeDetail() }} onClick={event => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDetail()
    }}>
      <div className="dialog-top"><span>{project ? project.category ?? project.context : detail === 'about' ? 'Rudolf Hounlete' : 'Compétences'}</span><button type="button" onClick={closeDetail} aria-label="Fermer la fiche" autoFocus>Fermer <span aria-hidden="true">×</span></button></div>
      <div className="dialog-body">
        {project && <><div className="detail-heading"><p className="overline">{project.context} · {project.period}</p><h2 id="detail-title">{shortNames[project.index]}</h2><p className="detail-subtitle">{projectStories[project.index].subtitle}</p></div><div className="detail-visual">{project.index === 'risksim' ? <ProjectGallery key={project.index} kind="risksim"/> : project.index === '01' ? <ProjectGallery key={project.index} kind="clinical"/> : <ProjectVisual key={project.index} kind={projectVisualKind[project.index] ?? 'automl'}/>}</div><div className="detail-prose">{projectStories[project.index].paragraphs.map(text => <p key={text}>{text}</p>)}</div><div className="detail-summary"><div><h3>Approche technique</h3><p>{projectStories[project.index].method}</p></div><div><h3>Ce qui a été réalisé</h3><p>{projectStories[project.index].result}</p></div></div>{projectStories[project.index].note && <p className="project-note">{projectStories[project.index].note}</p>}<div className="detail-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="detail-links">{project.links.code && <a className="solid-link" href={project.links.code} target="_blank" rel="noreferrer">Explorer le dépôt <Icon name="github" size={18}/><span className="sr-only"> (nouvel onglet)</span></a>}{project.evidence && <a className="inline-link" href={project.evidence.href} target="_blank" rel="noreferrer">{project.evidence.label} <Icon name="arrow" size={17}/><span className="sr-only"> (nouvel onglet)</span></a>}</div></>}
        {detail === 'about' && <><div className="detail-heading"><p className="overline">Étudiant ingénieur · Centrale Casablanca</p><h2 id="detail-title">Rudolf Hounlete.</h2><p className="detail-subtitle">Le code, les modèles et l’expérimentation.</p></div><div className="detail-prose">{profile.about.map(text => <p key={text}>{text}</p>)}</div><div className="detail-stack">{profile.interests.map(item => <span key={item}>{item}</span>)}</div><a className="solid-link" href={contact.github} target="_blank" rel="noreferrer">Explorer mon GitHub <Icon name="arrow" size={17}/><span className="sr-only"> (nouvel onglet)</span></a></>}
        {detail === 'skills' && <><div className="detail-heading"><p className="overline">Compétences</p><h2 id="detail-title">Mes outils.</h2><p className="detail-subtitle">{editorial.skillsIntro}</p></div><div className="skills-detail">{skills.map((group, i) => <article key={group.label}><h3>{group.label}</h3><p>{editorial.skillContexts[i]}</p><div className="detail-stack">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div></>}
      </div>
    </dialog>
  </div>
}
export default App
