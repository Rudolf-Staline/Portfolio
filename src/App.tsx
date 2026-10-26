import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, X, List, DownloadSimple, GithubLogo, Moon, Sun, Copy, Check, Medal, Image as ImageIcon, EnvelopeSimple } from '@phosphor-icons/react'
import { projects } from './data/projects'
import { projectStories } from './data/projectStories'
import { contact } from './data/profile'
import { skills } from './data/skills'
import { competitions } from './data/competitions'
import { additionalProjects } from './data/additionalProjects'
import { pitches } from './data/pitches'
import { projectVisuals } from './data/projectVisuals'

// Art direction: editorial, variance 8 / motion 6 / density 3.
// Real project captures and an existing portrait. One vermilion accent.
// Layer scale: header 20, chapter controls 25, mobile menu 30, native dialog top layer.
const plain = (text: string) => text.replace(/[—–]/g, '-')
type Work = {
  id: string; title: string; group: string; context: string; period: string;
  summary: string; result: string; method: string; paragraphs: string[];
  stack: string[]; code: string | null; note?: string;
}
const titles: Record<string, string> = { risksim: 'RiskSim', neurogolf: 'NeuroGolf', credit: 'African Credit Scoring', 'financial-stress': 'Stress financier', geoai: 'GeoAI Aquaculture', waxal: 'WAXAL ASR', automl: 'Autonomous AutoML', '01': 'PediAppend', '02': 'Feux intelligents', '03': 'Analyse Forex', '05': 'Propagation de solitons' }
const work: Work[] = projects.map(p => {
  const story = projectStories[p.index]
  return {
    id: p.index, title: titles[p.index] || p.title,
    group: ['risksim', 'automl', '03'].includes(p.index) ? 'Logiciel' : ['02', '05'].includes(p.index) ? 'Expérimentation' : 'Machine learning',
    context: plain(p.context), period: plain(p.period), summary: plain(p.cardDescription || p.tagline),
    result: plain(story.result), method: plain(story.method), paragraphs: story.paragraphs.map(plain),
    stack: p.stack, code: p.links.code || null, note: story.note ? plain(story.note) : undefined,
  }
})
work.splice(1, 0, {
  id: 'dossier-jaune', title: 'Dossier Jaune', group: 'Logiciel', context: 'Projet d’innovation · Centrale Casablanca', period: '2026',
  summary: 'Réunir les documents d’une commande textile et donner à chaque intervenant un accès adapté.',
  result: 'Un prototype avec dossiers par commande, espace client, droits par sous-dossier et annotations PDF versionnées.',
  method: 'Une application web avec FastAPI, PostgreSQL et stockage Supabase. Les annotations PDF sont enregistrées dans une nouvelle version du document.',
  paragraphs: [
    'Dans une commande textile, les documents circulent entre plusieurs intervenants. Le projet Dossier Jaune rassemble les pièces d’une commande dans un dossier commun, organisé en sous-dossiers métier.',
    'Le prototype prévoit un espace interne et un espace client. Chaque utilisateur accède aux documents selon ses droits. Un lecteur PDF permet d’annoter un fichier et de sauvegarder une nouvelle version.',
    'Je développe la plateforme et fais évoluer son ergonomie au fil des échanges du projet d’innovation. Le périmètre continue de s’affiner avec les retours du terrain.',
  ],
  stack: ['FastAPI', 'JavaScript', 'PostgreSQL', 'Supabase', 'PyMuPDF'], code: 'https://github.com/Rudolf-Staline/Framatex',
  note: 'Projet d’innovation en cours ; la capture présente une version du prototype.',
})
work.push(...additionalProjects)
const order = ['risksim', 'financial-stress', 'dossier-jaune', 'automl', 'neurogolf', 'credit', 'geoai', 'waxal', '01', 'churn-dashboard', '02', 'biohub', '03', '05']
work.sort((a,b) => order.indexOf(a.id) - order.indexOf(b.id))
work.forEach(p => { p.summary = pitches[p.id].summary })
const groups = ['Tous', 'Logiciel', 'Machine learning', 'Expérimentation']
const chapters = [
  { id: 'accueil', label: 'Accueil' }, { id: 'projets', label: 'Projets' },
  { id: 'competitions', label: 'Compétitions' }, { id: 'apropos', label: 'À propos' }, { id: 'contact', label: 'Contact' },
]

function CaseStudy({ project, onClose }: { project: Work | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = dialog.current
    if (!project || !el) return
    const trigger = document.activeElement as HTMLElement | null
    el.showModal()
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { el.close(); document.body.style.overflow = old; trigger?.focus({ preventScroll: true }) }
  }, [project])
  if (!project) return null
  return <dialog className="case-dialog" ref={dialog} aria-labelledby="case-title" onCancel={e => { e.preventDefault(); onClose() }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <article className="case-sheet">
      <div className="case-top"><span>{project.context}</span><button className="icon-button close-case" onClick={onClose} aria-label="Fermer le projet"><X size={25}/></button></div>
      <header className="case-heading"><p className="case-category">{project.group} / {project.period}</p><h2 id="case-title">{project.title}</h2><p className="case-intro">{pitches[project.id].headline}</p><p className="case-proof">{pitches[project.id].proof}</p></header>
      <div className="case-brief"><div><h3>Le problème</h3><p>{project.summary}</p></div><div><h3>Ma contribution</h3><p>{pitches[project.id].role}</p></div><div><h3>Le résultat</h3><p>{pitches[project.id].value}</p></div></div>
      <figure className={`case-figure case-figure-${projectVisuals[project.id].kind}`}><img src={projectVisuals[project.id].src} alt={projectVisuals[project.id].alt} width={projectVisuals[project.id].width} height={projectVisuals[project.id].height} decoding="async"/><figcaption>{projectVisuals[project.id].caption}</figcaption></figure>
      <div className="case-content"><div className="case-prose"><h3>Le projet en détail</h3>{project.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div><aside><h3>Le choix qui compte</h3><p>{pitches[project.id].decision}</p><h3>Approche</h3><p>{project.method}</p><div className="tech-list">{project.stack.map(s => <span key={s}>{s}</span>)}</div></aside></div>
      {project.note && <p className="case-note">{project.note}</p>}
      <footer className="case-footer">{project.code ? <a className="button primary" href={project.code} target="_blank" rel="noreferrer">Code source <GithubLogo size={21}/><span className="sr-only"> (nouvel onglet)</span></a> : <span>Présentation du projet</span>}<button className="text-button" onClick={onClose}>Revenir au portfolio <ArrowRight size={20}/></button></footer>
    </article>
  </dialog>
}

function ProjectButton({ id, className = '', children, labelledBy }: { id: string; className?: string; children: React.ReactNode; labelledBy?: string }) {
  return <a className={className} href={`#projet/${id}`} aria-labelledby={labelledBy}>{children}</a>
}

function ProjectCard({ project, index }: { project: Work; index: number }) {
  const visual = projectVisuals[project.id]
  return <ProjectButton id={project.id} className="archive-item" labelledBy={`card-${project.id}`}>
    <div className={`archive-visual archive-visual-${visual.kind}`}>
      <img src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} loading="lazy" decoding="async"/>
      <span className="visual-kind">{visual.kind === 'capture' ? <ImageIcon size={13} aria-hidden="true"/> : <ImageIcon size={13} aria-hidden="true"/>}{visual.kind === 'capture' ? 'Capture du projet' : 'Visuel généré'}</span>
    </div>
    <div className="archive-item-body">
      <div className="archive-item-top"><span>{String(index + 1).padStart(2, '0')} / {project.group}</span><ArrowUpRight size={22} aria-hidden="true"/></div>
      <h3 id={`card-${project.id}`}>{project.title}</h3><p>{project.summary}</p>
      <span className="archive-proof">{pitches[project.id].proof}</span><span className="archive-context">{project.stack.slice(0, 3).join(' · ')}</span>
    </div>
  </ProjectButton>
}

function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('rudolf-theme') || 'light' } catch { return 'light' } })
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('accueil')
  const [projectId, setProjectId] = useState<string | null>(null)
  const [group, setGroup] = useState('Tous')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>()
  const returnHash = useRef('#projets')
  const hashOpened = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('rudolf-theme', theme) } catch { /* storage may be disabled */ }
  }, [theme])
  useEffect(() => {
    const follow = () => {
      let hash: string
      try { hash = decodeURIComponent(location.hash.slice(1)) } catch { return }
      if (hash.startsWith('projet/')) { setProjectId(hash.slice(7)); setMenu(false) }
      else { setProjectId(null); returnHash.current = location.hash || '#projets'; hashOpened.current = false }
    }
    follow()
    window.addEventListener('hashchange', follow)
    const markOpening = (event: MouseEvent) => {
      const a = (event.target as Element).closest('a[href^="#projet/"]')
      if (a) hashOpened.current = true
    }
    document.addEventListener('click', markOpening)
    return () => { window.removeEventListener('hashchange', follow); document.removeEventListener('click', markOpening) }
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-18% 0px -60% 0px', threshold: 0 })
    chapters.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target) } })
    }, { threshold: 0.08 })
    document.querySelectorAll('[data-reveal]').forEach(el => reveals.observe(el))
    return () => { observer.disconnect(); reveals.disconnect(); clearTimeout(copyTimer.current) }
  }, [])
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])
  const closeProject = () => {
    if (hashOpened.current) history.back()
    else { history.replaceState(null, '', returnHash.current); setProjectId(null) }
  }
  const filtered = work.filter(p => (group === 'Tous' || p.group === group) && `${p.title} ${p.summary} ${p.stack.join(' ')}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr')))
  const selected = work.find(p => p.id === projectId) || null
  const activeIndex = chapters.findIndex(c => c.id === active)
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(contact.email); setCopied(true); setCopyError(false); copyTimer.current = setTimeout(() => setCopied(false), 2400) }
    catch { setCopyError(true) }
  }

  return <>
    <a className="skip-link" href="#contenu">Aller au contenu</a>
    <header className="site-header">
      <a className="brand" href="#accueil" aria-label="Rudolf Hounlete, accueil">rh<span>.</span></a>
      <nav className="desktop-nav" aria-label="Navigation principale">{chapters.slice(1).map(c => <a href={`#${c.id}`} key={c.id} aria-current={active === c.id ? 'location' : undefined}>{c.label}</a>)}</nav>
      <div className="header-actions"><a className="cv-nav" href={contact.cv!} download>Mon CV <DownloadSimple size={18}/></a><button className="icon-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}>{theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}</button><button className="icon-button menu-toggle" aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X size={24}/> : <List size={24}/>}</button></div>
      {menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Navigation mobile">{chapters.map(c => <a href={`#${c.id}`} key={c.id} onClick={() => setMenu(false)}>{c.label}<ArrowUpRight size={24}/></a>)}<a href={contact.cv!} download>Mon CV <DownloadSimple size={23}/></a></nav>}
    </header>
    <main id="contenu">
      <section className="hero chapter wrap" id="accueil" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">Rudolf Hounlete · Élève ingénieur à Centrale Casablanca</p><h1 id="hero-title">Du modèle<br/>à <span className="accent">la décision.</span></h1><p className="hero-description">Je développe des modèles de machine learning et les logiciels qui les rendent utiles.</p><div className="hero-actions"><a className="button primary" href="#projets">Voir les projets <ArrowDown size={20}/></a><a className="text-button" href={`mailto:${contact.email}`}>Me contacter <ArrowUpRight size={20}/></a></div></div>
        <figure className="hero-portrait"><div className="portrait-frame"><div className="portrait-accent"/><img src="/images/portrait.webp" alt="Portrait de Rudolf Hounlete" width="1000" height="1000" fetchPriority="high"/></div><figcaption><span>Machine learning & développement logiciel</span><span>Casablanca</span></figcaption></figure>
      </section>
      <div className="credential-strip wrap" data-reveal><a href="#competitions"><strong>3</strong><span>Médailles de bronze<br/>Kaggle & Zindi</span><Medal size={28} weight="light"/></a><a href="#projet/credit"><strong>2<sup>e</sup></strong><span>African Credit Scoring<br/>sur 77 participants</span><ArrowUpRight size={22}/></a><a href="#projet/financial-stress"><strong>4<sup>e</sup></strong><span>Financial Stress Prediction<br/>sur 262 participants</span><ArrowUpRight size={22}/></a></div>
      <section className="projects chapter wrap" id="projets" aria-labelledby="projects-title">
        <header className="section-head" data-reveal><h2 id="projects-title">Ce que je sais<br/><span className="muted">faire avancer.</span></h2><p>Un outil développé en entreprise, un résultat en compétition, un produit construit autour d’un besoin métier.</p></header>
        <div className="selected-work">{['risksim', 'financial-stress', 'dossier-jaune'].map((id, i) => {
          const p = work.find(p => p.id === id)!, pitch = pitches[id], visual = projectVisuals[id]
          return <article className={`selected-case selected-case-${i}`} key={id} data-reveal>
            <ProjectButton id={id} className={`selected-image selected-image-${visual.kind}`} labelledBy={`selected-${id}`}><img src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} loading="lazy"/><span className="selected-number">0{i+1}</span><span className="cover-action" aria-hidden="true"><ArrowUpRight size={28}/></span></ProjectButton>
            <div className="selected-copy"><p className="selected-context">{p.title} · {i === 0 ? 'Expérience en entreprise' : i === 1 ? 'Machine learning compétitif' : 'Développement produit'}</p><h3 id={`selected-${id}`}><ProjectButton id={id}>{pitch.headline}</ProjectButton></h3><p>{pitch.summary}</p><strong className="selected-proof">{pitch.proof}</strong><ProjectButton id={id} className="text-button">Lire l’étude de cas <ArrowUpRight size={20}/></ProjectButton></div>
          </article>
        })}</div>
        <div className="engineering-note" data-reveal><span className="engineering-number">393</span><div><h3>Automatiser demande aussi de vérifier.</h3><p>Autonomous AutoML : des expériences reprenables, un contrôle des fuites de données et 393 tests pour encadrer le passage du CSV au modèle.</p><ProjectButton id="automl" className="text-button">Voir le projet <ArrowUpRight size={20}/></ProjectButton></div></div>
        <div className="archive-panel" id="index">
          <div id="all-projects" className="archive-content"><div className="archive-toolbar"><div className="filters" role="group" aria-label="Filtrer les projets">{groups.map(g => <button key={g} onClick={() => setGroup(g)} aria-pressed={group === g}>{g}</button>)}</div><label className="search-label"><span className="sr-only">Rechercher un projet</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un projet…" name="project-search" autoComplete="off"/></label></div><p className="result-count" role="status">{filtered.length} projet{filtered.length > 1 ? 's' : ''}</p><div className="archive-grid">{filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i}/>)}</div>{!filtered.length && <div className="empty-state"><h3>Aucun projet trouvé.</h3><p>Essaie un autre mot ou enlève le filtre.</p><button className="text-button" onClick={() => { setQuery(''); setGroup('Tous') }}>Réinitialiser <ArrowRight size={20}/></button></div>}</div>
        </div>
      </section>
      <section className="competitions chapter wrap" id="competitions" aria-labelledby="competitions-title">
        <div className="competition-intro" data-reveal><p className="eyebrow">Kaggle & Zindi</p><h2 id="competitions-title">Des résultats qui<br/>se comparent.</h2><p>Trois médailles de bronze sur des problèmes de raisonnement visuel, de reconnaissance vocale et de données satellitaires. Deux classements de tête en finance.</p></div>
        <div className="competition-layout" data-reveal><div className="medal-feature"><Medal size={64} weight="light"/><div className="medal-number">3</div><h3>Médailles<br/>de bronze.</h3><p>Raisonnement visuel, reconnaissance vocale et données satellitaires.</p></div><div className="competition-rows">{competitions.map(c => <ProjectButton id={c.projectId} key={c.projectId} className="competition-row"><div><span>{c.platform}</span><h3>{c.name}</h3><p className="competition-detail">{c.detail}</p></div><div className="competition-result"><strong>{c.medal ? 'Bronze' : c.result}</strong><ArrowUpRight size={23}/></div></ProjectButton>)}</div></div>
      </section>
      <section className="about chapter wrap" id="apropos" aria-labelledby="about-title">
        <div className="about-top" data-reveal><h2 id="about-title">Le même soin pour le modèle<br/><span className="muted">et pour son usage.</span></h2><div className="about-grid"><p className="about-lead">Je m’intéresse à ce qui se passe entre un bon résultat technique et un outil dont quelqu’un peut se servir.</p><div className="about-copy"><p>Chez CHOUBEL CONSULTING, cela m’a conduit à travailler sur la restitution des simulations et l’interface de RiskSim. Sur Dossier Jaune, cela signifie reprendre les parcours à partir des retours des utilisateurs.</p><p>Originaire du Bénin, formé aux mathématiques et aux TIC à l’IMSP, j’ai rejoint Centrale Casablanca en 2025. Je poursuis ce double travail de modélisation et de développement, avec un intérêt particulier pour le risque et la finance.</p></div></div></div>
        <div className="journey" id="parcours" data-reveal><h3>Le parcours</h3><div className="journey-entry"><span className="journey-date">2025 - 2028</span><div><h4>École Centrale Casablanca</h4><p>Cycle ingénieur généraliste</p></div><span className="journey-place">Maroc</span></div><div className="journey-entry"><span className="journey-date">2026</span><div><h4>CHOUBEL CONSULTING</h4><p>Stage de développement logiciel · RiskSim</p></div><span className="journey-place">Casablanca</span></div><div className="journey-entry"><span className="journey-date">2022 - 2025</span><div><h4>Institut de mathématiques et de sciences physiques</h4><p>Licence en technologies de l’information et de la communication</p></div><span className="journey-place">Bénin</span></div></div>
        <div className="skills-block" id="competences" data-reveal><h3>Mes outils de travail</h3><div className="skills-grid">{skills.map(g => <div key={g.label}><h4>{g.label}</h4><p>{g.items.join(', ')}</p></div>)}</div></div>
      </section>
      <section className="contact chapter" id="contact" aria-labelledby="contact-title"><div className="wrap" data-reveal><p className="eyebrow">Stage · Machine learning · Développement logiciel</p><h2 id="contact-title">Construisons<br/>la suite<span className="accent">.</span></h2><p className="contact-intro">Vous cherchez un profil capable de travailler sur les données et de construire l’application autour ? Parlons de votre équipe et de vos projets.</p><div className="contact-main"><a href={`mailto:${contact.email}`} className="email-link">{contact.email}<ArrowUpRight size={40}/></a><button className="icon-button copy-email" onClick={copyEmail} aria-label={copied ? 'Adresse copiée' : 'Copier l’adresse e-mail'}>{copied ? <Check size={24}/> : <Copy size={24}/>}</button></div><p className="copy-status" role="status">{copied ? 'Adresse copiée.' : copyError ? 'Copie indisponible. Tu peux sélectionner l’adresse ou cliquer dessus.' : '\u00a0'}</p><div className="contact-secondary"><a className="button primary" href={`mailto:${contact.email}`}>Me contacter <EnvelopeSimple size={21}/></a><a className="text-button" href={contact.github} target="_blank" rel="noreferrer">GitHub <GithubLogo size={22}/><span className="sr-only"> (nouvel onglet)</span></a><a className="text-button" href={contact.cv!} download>Mon CV <DownloadSimple size={21}/></a></div></div></section>
    </main>
    <footer className="site-footer wrap"><a className="brand" href="#accueil" aria-label="Retour à l’accueil">rh<span>.</span></a><span>© {new Date().getFullYear()} Rudolf Hounlete</span><a href="#accueil">Retour en haut <ArrowUp size={17}/></a></footer>
    <nav className="chapter-control" aria-label="Parcourir les sections"><span>{chapters[activeIndex]?.label}</span><a href={`#${chapters[Math.max(0, activeIndex - 1)].id}`} aria-label="Section précédente" aria-disabled={activeIndex === 0} tabIndex={activeIndex === 0 ? -1 : 0}><ArrowUp size={18}/></a><a href={`#${chapters[Math.min(chapters.length - 1, activeIndex + 1)].id}`} aria-label="Section suivante" aria-disabled={activeIndex === chapters.length - 1} tabIndex={activeIndex === chapters.length - 1 ? -1 : 0}><ArrowDown size={18}/></a></nav>
    {projectId && !selected && <div className="missing-project" role="alert"><p>Ce projet n’est pas disponible.</p><button onClick={closeProject}>Revenir aux projets</button></div>}
    <CaseStudy project={selected} onClose={closeProject}/>
  </>
}

export default App
