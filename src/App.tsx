import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, X, Sun, Moon, GithubLogo, DownloadSimple, List, Trophy } from '@phosphor-icons/react'
import { projects } from './data/projects'
import { competitions } from './data/competitions'
import { projectStories } from './data/projectStories'
import { education } from './data/education'
import { skills } from './data/skills'
import { profile, contact } from './data/profile'
import type { Project } from './data/types'

const names: Record<string, string> = { risksim: 'RiskSim', neurogolf: 'NeuroGolf', credit: 'African Credit Scoring', 'financial-stress': 'Stress financier', geoai: 'GeoAI Aquaculture', waxal: 'WAXAL ASR', automl: 'Autonomous AutoML', '01': 'PediAppend', '02': 'Feux intelligents', '03': 'Analyse Forex', '05': 'Propagation de solitons' }
const clean = (s: string) => s.replace(/—/g, '·')
const software = ['risksim', 'automl', '01', '02', '03', '05'].map(id => projects.find(p => p.index === id)!)
const imageFor = (id: string) => id === 'risksim' ? '/projects/risksim-dashboard.png' : id === '01' ? '/projects/pediappend-interface-symptomes.jpg' : null

function ProjectDialog({ project, close }: { project: Project | null; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!project) return
    const dialog = ref.current!
    const focused = document.activeElement as HTMLElement | null
    dialog.showModal()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = oldOverflow; focused?.focus() }
  }, [project])
  if (!project) return null
  const story = projectStories[project.index]
  const image = imageFor(project.index)
  return <dialog ref={ref} className="project-dialog" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }} aria-labelledby="dialog-title">
    <div className="dialog-inner"><div className="dialog-toolbar"><span>{clean(project.context)}</span><button onClick={close} aria-label="Fermer la fiche projet"><X size={24}/></button></div>
      <h2 id="dialog-title">{names[project.index]}</h2><p className="dialog-subtitle">{clean(story.subtitle)}</p>
      <div className="dialog-result"><Trophy size={24}/><p>{clean(story.result)}</p></div>
      {image && <img className="dialog-image" src={image} alt={`Interface de ${names[project.index]}`} width="1440" height="1000"/>}
      <div className="dialog-prose">{story.paragraphs.map(p => <p key={p}>{clean(p)}</p>)}<h3>Approche</h3><p>{clean(story.method)}</p>{story.note && <p className="note">{clean(story.note)}</p>}</div>
      {project.index === 'risksim' && <figure><img className="dialog-image" src="/projects/risksim-results.png" alt="RiskSim : distribution des coûts, percentiles et analyse de sensibilité" loading="lazy"/><figcaption>Résultats sur un scénario de démonstration.</figcaption></figure>}
      <div className="stack">{project.stack.map(s => <span key={s}>{s}</span>)}</div><div className="dialog-links">{project.links.code && <a className="button" href={project.links.code} target="_blank" rel="noreferrer">Voir le code <GithubLogo size={20}/><span className="sr-only"> (nouvel onglet)</span></a>}{project.evidence && <a className="text-link" href={project.evidence.href} target="_blank" rel="noreferrer">{project.evidence.label} <ArrowUpRight size={20}/><span className="sr-only"> (nouvel onglet)</span></a>}</div>
    </div>
  </dialog>
}

function App() {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('portfolio-horizontal-theme') === 'dark' } catch { return false } })
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [active, setActive] = useState('accueil')
  const previousHash = useRef('#projets')
  useEffect(() => {
    const follow = () => {
      const hash = decodeURIComponent(location.hash.slice(1))
      if (hash.startsWith('projet/')) {
        const found = projects.find(p => p.index === hash.slice(7))
        if (found) setSelected(found)
      } else {
        setSelected(null)
        const alias = hash === 'fiche/about' ? 'apropos' : hash === 'fiche/skills' ? 'competences' : hash
        if (alias) requestAnimationFrame(() => document.getElementById(alias)?.scrollIntoView({ behavior: 'instant' }))
      }
    }
    follow(); window.addEventListener('hashchange', follow); window.addEventListener('popstate', follow)
    return () => { window.removeEventListener('hashchange', follow); window.removeEventListener('popstate', follow) }
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); if (entry.target.id) setActive(entry.target.id) }
    }, { threshold: .12 })
    document.querySelectorAll('.reveal,main > section[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  const open = (project: Project) => {
    previousHash.current = location.hash.startsWith('#projet/') ? '#projets' : location.hash || '#projets'
    history.pushState(null, '', `#projet/${project.index}`); setSelected(project)
  }
  const close = () => { history.replaceState(null, '', previousHash.current); setSelected(null) }
  const theme = () => { setDark(!dark); try { localStorage.setItem('portfolio-horizontal-theme', dark ? 'light' : 'dark') } catch { /* Optional preference storage. */ } }
  return <div className="portfolio" data-theme={dark ? 'dark' : 'light'}>
    <a href="#main" className="skip-link">Aller au contenu</a>
    <header className="topbar wrap"><a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete, accueil">Rudolf Hounlete</a>
      <nav aria-label="Navigation principale" className={menu ? 'nav open' : 'nav'}>{[['competitions', 'Compétitions'], ['projets', 'Projets'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenu(false)}>{label}</a>)}</nav>
      <div className="nav-actions"><button className="icon-button" onClick={theme} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}>{dark ? <Sun size={20}/> : <Moon size={20}/>}</button><button className="icon-button mobile-menu" aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={24}/> : <List size={24}/>}</button></div>
    </header>
    <main id="main" tabIndex={-1}>
      <section id="accueil" className="hero wrap">
        <div className="hero-copy"><p className="hero-eyebrow">Élève ingénieur · promotion 2028</p><h1>Rudolf<br/><span>Hounlete.</span></h1><p className="hero-description">Machine learning et développement logiciel.<br/>Des modèles testés, des applications qui prennent forme.</p><div className="hero-actions"><a className="button" href="#projets">Projets <ArrowDown size={20}/></a><a className="text-link" href={contact.cv!} download>Mon CV <DownloadSimple size={20}/></a></div></div>
        <a className="hero-work" href="#projet/risksim" onClick={e => { e.preventDefault(); open(software[0]) }} aria-label="Découvrir RiskSim, application de simulation de risques"><div className="hero-image-frame"><img src="/projects/risksim-dashboard.png" alt="Tableau de bord réel de RiskSim" width="1440" height="1000" fetchPriority="high"/></div><div className="hero-work-caption"><span>RiskSim <span className="caption-detail">/ Simulation de risques</span></span><ArrowUpRight size={25}/></div></a>
      </section>
      <section className="credentials wrap reveal" id="liens" aria-label="Liens et distinctions"><a href="#competitions"><strong>3</strong><span>Médailles de bronze<br/>Kaggle & Zindi</span></a><a href="#projet/credit" onClick={e => { e.preventDefault(); open(projects.find(p => p.index === 'credit')!) }}><strong>2<sup>e</sup></strong><span>sur 77 participants<br/>African Credit Scoring</span></a><a href="#projet/financial-stress" onClick={e => { e.preventDefault(); open(projects.find(p => p.index === 'financial-stress')!) }}><strong>4<sup>e</sup></strong><span>sur 262 participants<br/>Stress financier</span></a><a className="github-link" href={contact.github} target="_blank" rel="noreferrer"><GithubLogo size={28}/><span>Code & expériences<ArrowUpRight size={18}/></span><span className="sr-only"> (nouvel onglet)</span></a></section>
      <section className="projects-section wrap" id="projets"><header className="section-heading reveal"><h2>Du modèle<br/>à l’application.</h2><p>Simulation, apprentissage automatique et expérimentation.</p></header>
        <div className="work-grid">{software.map((p, i) => <article className={`work-card work-${p.index} reveal`} key={p.index}>
          <button className="work-open" onClick={() => open(p)} aria-label={`Ouvrir le projet ${names[p.index]}`}>
            <div className={`work-art ${imageFor(p.index) ? 'has-image' : ''}`}>{imageFor(p.index) ? <img src={p.index === 'risksim' ? '/projects/risksim-results.png' : imageFor(p.index)!} alt={`Interface réelle de ${names[p.index]}`} width="1440" height="1000" loading="lazy"/> : <div className="type-art" aria-hidden="true">{p.index === 'automl' ? <><span>Auto</span><span>ML<span className="type-period">.</span></span></> : p.index === '02' ? <><span>Vision.</span><span>Action.</span></> : p.index === '03' ? <><span>Forex</span><span className="type-outline">±</span></> : <><span>Signal</span><span className="type-outline">∿</span></>}</div>}</div>
            <div className="work-title"><h3>{names[p.index]}</h3><ArrowUpRight size={28}/></div><p className="work-description">{clean(p.cardDescription || p.tagline)}</p><span className="work-meta">{i === 0 ? 'Stage · CHOUBEL CONSULTING' : p.stack.slice(0, 3).join(' · ')}</span>
          </button>
        </article>)}</div>
      </section>
      <section id="competitions" className="competition-section"><div className="wrap"><header className="section-heading reveal"><h2>Le terrain<br/>des compétitions.</h2><p>Cinq problèmes imposés. Des résultats mesurés sur des données inédites.</p></header><div className="competition-layout"><div className="competition-statement reveal"><Trophy size={54} weight="light"/><p>Raisonnement visuel.<br/>Voix. Finance.<br/>Observation satellite.</p><span>3 médailles de bronze<br/>sur Kaggle et Zindi</span></div><div className="competition-list">{competitions.map(c => <button className="competition-row reveal" key={c.projectId} onClick={() => open(projects.find(p => p.index === c.projectId)!)}><div><span className="competition-platform">{c.platform}</span><h3>{c.name}</h3><p>{c.detail}</p></div><span className="competition-result">{c.medal ? 'Bronze' : c.result}<ArrowUpRight size={21}/></span></button>)}</div></div></div></section>
      <section id="apropos" className="about-section wrap reveal"><h2>Un parcours,<br/>plusieurs façons<br/>de construire.</h2><div className="about-copy">{profile.about.map(p => <p key={p}>{clean(p)}</p>)}<div className="about-links"><a className="text-link" href="#parcours">Formation <ArrowDown size={20}/></a><a className="text-link" href="#competences">Compétences <ArrowDown size={20}/></a></div></div></section>
      <section id="parcours" className="education-section wrap reveal"><h2>Formation</h2><div className="education-grid">{education.map(e => <article key={e.school + e.detail}><span>{clean(e.period || 'Préparation scientifique')}</span><h3>{e.school}</h3><p>{clean(e.detail)}</p><span>{e.location}</span></article>)}</div></section>
      <section id="competences" className="skills-section wrap reveal"><h2>Compétences</h2><div className="skills-grid">{skills.map(g => <div key={g.label}><h3>{g.label}</h3><p>{g.items.join(' / ')}</p></div>)}</div></section>
      <section id="contact" className="contact-section"><div className="wrap reveal"><h2>Une idée<br/>à construire ?</h2><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={38}/></a><div className="contact-links"><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={20}/><span className="sr-only"> (nouvel onglet)</span></a><a className="text-link" href={contact.cv!} download>Mon CV <DownloadSimple size={20}/></a></div></div></section>
    </main><footer className="wrap footer"><span>© 2026 Rudolf Hounlete</span><a href="#accueil">Retour en haut <ArrowUpRight size={18}/></a></footer><ProjectDialog project={selected} close={close}/>
  </div>
}
export default App
