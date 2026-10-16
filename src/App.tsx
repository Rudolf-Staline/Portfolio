import { useEffect, useState } from 'react'
import { ArrowUpRight, ArrowDown, Sun, Moon, GithubLogo, DownloadSimple, Medal } from '@phosphor-icons/react'
import { projects } from './data/projects'
import { competitions } from './data/competitions'
import { projectStories } from './data/projectStories'
import { education } from './data/education'
import { skills } from './data/skills'
import { profile, contact } from './data/profile'
import { ProjectGallery } from './features/projects/ProjectGallery'
import { ExperimentVisual } from './features/projects/ExperimentVisual'
import type { Project } from './data/types'

const names: Record<string, string> = { risksim: 'RiskSim', neurogolf: 'NeuroGolf', credit: 'African Credit Scoring', 'financial-stress': 'Stress financier', geoai: 'GeoAI Aquaculture', waxal: 'WAXAL ASR', automl: 'Autonomous AutoML', '01': 'PediAppend', '02': 'Feux intelligents', '03': 'Analyse Forex', '05': 'Propagation de solitons' }
const software = ['risksim', 'automl', '01', '02', '03', '05'].map(id => projects.find(p => p.index === id)!)
const ordered = [...software, ...competitions.map(c => projects.find(p => p.index === c.projectId)!)]
const imageFor = (id: string) => id === 'risksim' ? '/projects/risksim-dashboard.png' : id === '01' ? '/projects/pediappend-interface-symptomes.jpg' : null

function ProjectArticle({ project, index }: { project: Project; index: number }) {
  const story = projectStories[project.index]
  const award = competitions.find(c => c.projectId === project.index)
  return <article className={`project-sheet project-${project.index}`} id={`projet/${project.index}`} aria-labelledby={`title-${project.index}`}>
    <div className="sheet-meta"><span>{String(index + 1).padStart(2, '0')} / 11</span><span>{project.context} · {project.period}</span><a href="#index" aria-label="Revenir à la liste des projets">Index <ArrowUpRight size={16}/></a></div>
    <header className="project-heading"><h3 id={`title-${project.index}`}>{names[project.index]}</h3><div><p>{story.subtitle}</p>{award?.medal && <span className="bronze"><Medal weight="duotone" size={25}/>Médaille de bronze · {award.platform}</span>}</div></header>
    <div className="project-result"><span>Résultat / réalisation</span><p>{story.result}</p></div>
    <div className="project-media">{project.index === 'risksim' ? <ProjectGallery kind="risksim"/> : project.index === '01' ? <ProjectGallery kind="clinical"/> : <ExperimentVisual id={project.index}/>}</div>
    <div className="project-body"><div className="project-prose">{story.paragraphs.map(p => <p key={p}>{p}</p>)}</div><aside><h4>Approche</h4><p>{story.method}</p>{story.note && <p className="project-note">{story.note}</p>}</aside></div>
    <footer className="project-footer"><div className="stack">{project.stack.map(s => <span key={s}>{s}</span>)}</div><div className="project-links">{project.links.code && <a className="text-link" href={project.links.code} target="_blank" rel="noreferrer">Code source <GithubLogo size={21}/><span className="sr-only"> (nouvel onglet)</span></a>}{project.links.demo && <a className="text-link" href={project.links.demo} target="_blank" rel="noreferrer">Démo <ArrowUpRight size={21}/><span className="sr-only"> (nouvel onglet)</span></a>}{project.evidence && <a className="text-link" href={project.evidence.href} target="_blank" rel="noreferrer">{project.evidence.label}<ArrowUpRight size={21}/><span className="sr-only"> (nouvel onglet)</span></a>}</div></footer>
  </article>
}

function App() {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('portfolio-horizontal-theme') === 'dark' } catch { return false } })
  const [active, setActive] = useState('accueil')
  useEffect(() => {
    const follow = () => {
      let hash: string
      try { hash = decodeURIComponent(location.hash.slice(1)) } catch { return }
      const alias = hash === 'fiche/about' ? 'apropos' : hash === 'fiche/skills' ? 'competences' : hash
      if (alias) requestAnimationFrame(() => document.getElementById(alias)?.scrollIntoView({ behavior: 'instant' }))
    }
    follow(); window.addEventListener('hashchange', follow); window.addEventListener('popstate', follow)
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'))
    let frame = 0
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => {
      const current = sections.filter(section => section.getBoundingClientRect().top <= 180).slice(-1)[0]
      setActive(current?.id ?? 'accueil')
    }) }
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => { window.removeEventListener('hashchange', follow); window.removeEventListener('popstate', follow); window.removeEventListener('scroll', update); cancelAnimationFrame(frame) }
  }, [])
  const theme = () => { setDark(current => { const next = !current; try { localStorage.setItem('portfolio-horizontal-theme', next ? 'dark' : 'light') } catch { /* Optional preference storage. */ } return next }) }
  return <div className="portfolio" data-theme={dark ? 'dark' : 'light'}>
    <a href="#main" className="skip-link">Aller au contenu</a>
    <header className="topbar wrap"><a className="wordmark" href="#accueil" aria-label="Rudolf Hounlete, accueil">RH<span>.</span></a><nav aria-label="Navigation principale">{[['projets', 'Projets'], ['competitions', 'Compétitions'], ['contact', 'Contact']].map(([id,label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav><button className="theme-toggle" onClick={theme} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}>{dark ? <Sun size={21}/> : <Moon size={21}/>}</button></header>
    <main id="main" tabIndex={-1}>
      <section id="accueil" className="hero wrap"><div className="hero-label"><span>Portfolio / ingénierie</span><span>Casablanca, Maroc · 2026</span></div><div className="hero-stage"><div className="hero-copy"><p className="eyebrow">Élève ingénieur · Centrale Casablanca</p><h1>Rudolf<br/><span>Hounlete.</span></h1><p className="hero-description">Machine learning et développement logiciel.<br/>Des modèles testés, des applications qui prennent forme.</p><div className="hero-actions"><a className="button" href="#index">Explorer les projets <ArrowDown size={20}/></a><a className="text-link" href={contact.cv!} download>Mon CV <DownloadSimple size={20}/></a></div></div><figure className="hero-portrait"><div className="portrait-orbit"><img src="/portrait-rudolf.png" alt="Portrait de Rudolf Hounlete" width="1254" height="1254" fetchPriority="high"/></div><figcaption><span>Du Bénin au Maroc</span><span>Promotion 2028 ↗</span></figcaption></figure></div></section>
      <section className="credentials wrap" aria-label="Résultats et liens"><a href="#competitions"><Medal size={35} weight="duotone"/><strong>3</strong><span>Médailles de bronze<br/>Kaggle & Zindi</span></a><a href="#projet/credit"><strong>2<sup>e</sup></strong><span>sur 77 participants<br/>African Credit Scoring</span></a><a href="#projet/financial-stress"><strong>4<sup>e</sup></strong><span>sur 262 participants<br/>Stress financier</span></a><a className="github-link" href={contact.github} target="_blank" rel="noreferrer"><GithubLogo size={27}/><span>Code & expériences<ArrowUpRight size={19}/></span><span className="sr-only"> (nouvel onglet)</span></a></section>
      <section id="index" className="project-index wrap"><header className="section-heading"><div><span className="eyebrow">01 / Les réalisations</span><h2>Projets &<br/><span>expériences.</span></h2></div><p>Onze projets, du prototype logiciel aux compétitions de machine learning. Les descriptions complètes et les visuels sont présentés plus bas.</p></header><div className="index-grid">{ordered.map((p,i) => <a className="index-card" href={`#projet/${p.index}`} key={p.index}><div className="index-art">{imageFor(p.index) ? <img src={imageFor(p.index)!} alt={`Interface de ${names[p.index]}`} width="1440" height="1100" loading="lazy"/> : <ExperimentVisual id={p.index} compact/>}</div><div className="index-caption"><span>{String(i+1).padStart(2,'0')}</span><h3>{names[p.index]}</h3><ArrowUpRight size={24}/></div><p>{p.cardDescription || p.tagline}</p></a>)}</div></section>
      <section className="projects-section wrap" id="projets"><header className="section-heading"><div><span className="eyebrow">02 / Logiciel & expérimentation</span><h2>Les projets,<br/><span>en détail.</span></h2></div><p>Le problème de départ, les choix techniques et ce qui a été obtenu.</p></header>{software.map((p,i) => <ProjectArticle key={p.index} project={p} index={i}/>)}</section>
      <section id="competitions" className="competition-section"><div className="wrap"><header className="section-heading"><div><span className="eyebrow">03 / Kaggle & Zindi</span><h2>Le terrain des<br/><span>compétitions.</span></h2></div><p>Trois médailles de bronze, une deuxième place sur 77 et une quatrième place sur 262.</p></header><div className="competition-list">{competitions.map(c => <a className="competition-row" key={c.projectId} href={`#projet/${c.projectId}`}><span>{c.platform}</span><h3>{c.name}</h3><span className={c.medal ? 'bronze' : ''}>{c.medal && <Medal size={24} weight="duotone"/>}{c.medal ? 'Bronze' : c.result}<ArrowDown size={18}/></span></a>)}</div>{competitions.map((c,i) => <ProjectArticle key={c.projectId} project={projects.find(p => p.index === c.projectId)!} index={software.length+i}/>)}</div></section>
      <section id="apropos" className="about-section wrap"><div><span className="eyebrow">04 / À propos</span><h2>Le parcours.</h2></div><div className="about-copy">{profile.about.map(p => <p key={p}>{p}</p>)}</div></section>
      <section id="parcours" className="education-section wrap"><h2>Formation</h2><div className="education-grid">{education.map(e => <article key={e.school + e.detail}><span>{e.period || 'Préparation scientifique'}</span><h3>{e.school}</h3><p>{e.detail}</p><span>{e.location}</span></article>)}</div></section>
      <section id="competences" className="skills-section wrap"><h2>Compétences</h2><div className="skills-grid">{skills.map(g => <div key={g.label}><h3>{g.label}</h3><p>{g.items.join(' / ')}</p></div>)}</div></section>
      <section id="contact" className="contact-section"><div className="wrap"><span className="eyebrow">05 / Contact</span><h2>Une idée<br/>à construire<span> ?</span></h2><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={38}/></a><div className="contact-links"><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={20}/><span className="sr-only"> (nouvel onglet)</span></a><a className="text-link" href={contact.cv!} download>Mon CV <DownloadSimple size={20}/></a></div></div></section>
    </main><footer className="wrap footer"><span>© 2026 Rudolf Hounlete</span><a href="#accueil">Retour en haut <ArrowUpRight size={18}/></a></footer>
  </div>
}
export default App
