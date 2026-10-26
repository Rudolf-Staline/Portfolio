import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, X, List, DownloadSimple, GithubLogo, Moon, Sun, Copy, Check, Medal, ArrowLeft } from '@phosphor-icons/react'
import { contact } from './data/profile'
import { projectVisuals } from './data/projectVisuals'
import type { Locale } from './data/architecture'
import type { Work } from './data/work'
import { getWork, getPitch, homePath, projectPath, routeFor } from './routes'
import Architecture from './components/Architecture'
import { imageSet, portraitSet, portraitSizes, cardSizes, featureSizes, studySizes } from './images'

// Editorial portfolio for technical recruiters. Variance 6 / motion 3 / density 4.
// Layers: sticky header 20, mobile menu 30. All content is available without JS.
const text = {
 fr: {
  nav: ['Projets', 'Compétences', 'Parcours', 'Contact'], cv: 'Mon CV',
  eyebrow: 'Rudolf Hounlete · Élève ingénieur à Centrale Casablanca', hero: ['Du modèle', 'à la décision.'],
  intro: 'Je développe des modèles de machine learning et les logiciels qui les rendent utiles.',
  explore: 'Voir les projets', reach: 'Me contacter', field: 'Machine learning & développement logiciel',
  bronze: 'Médailles de bronze', outOf: 'sur', participants: 'participants',
  projectsTitle: 'Des projets, des choix, des preuves.', projectsText: 'Le besoin, ma contribution et le résultat : chaque projet se lit aussi comme une étude de cas.',
  read: 'Lire l’étude de cas', summary: 'Synthèse', technical: 'Architecture et validation',
  groups: ['Tous', 'Logiciel', 'Machine learning', 'Expérimentation'], search: 'Rechercher un projet', reset: 'Réinitialiser', empty: 'Aucun projet trouvé.', emptyText: 'Essaie un autre mot ou enlève le filtre.', count: 'projets',
  capture: 'Capture du projet', generated: 'Image générée', generatedCaption: 'Image générée pour évoquer le sujet du projet.', catalogue: 'Catalogue complet',
  skillsTitle: 'Les compétences, dans le travail.', skillsIntro: 'Une compétence compte lorsqu’elle permet de résoudre une difficulté concrète.',
  pillars: [
   ['Modéliser et vérifier', 'Construire les variables, comparer les modèles et concevoir une validation qui reproduit les conditions du test.', 'LightGBM / PyTorch / Optuna / SHAP', 'financial-stress'],
   ['Construire l’outil autour', 'Passer d’un moteur Python à une interface, à des droits d’accès et à une distribution utilisable.', 'Python / React / TypeScript / SQL', 'risksim'],
   ['Relier au système réel', 'Faire communiquer perception, décision et commande ; confronter une simulation à des mesures.', 'YOLOv8 / Raspberry Pi / LTspice', '02']
  ],
  compTitle: 'Des résultats qui se comparent.', compText: 'Trois médailles de bronze et deux classements de tête, sur des problèmes de raisonnement, d’audio, de données satellitaires et de finance.',
  aboutTitle: 'Le même soin pour le modèle et pour son usage.', aboutLead: 'Je m’intéresse à ce qui se passe entre un bon résultat technique et un outil dont quelqu’un peut se servir.',
  aboutText: 'Chez CHOUBEL CONSULTING, cela m’a conduit à travailler sur la restitution des simulations et l’interface de RiskSim. Sur Dossier Jaune, cela signifie reprendre les parcours à partir des retours des utilisateurs.',
  origin: 'Originaire du Bénin, formé aux mathématiques et aux TIC à l’IMSP, j’ai rejoint Centrale Casablanca en 2025. Je poursuis ce double travail de modélisation et de développement, avec un intérêt particulier pour le risque et la finance.',
  journey: 'Le parcours', engineering: 'Cycle ingénieur généraliste', internship: 'Stage de développement logiciel · RiskSim', degree: 'Licence en technologies de l’information et de la communication', morocco: 'Maroc', benin: 'Bénin',
  contactTitle: 'Construisons la suite.', contactText: 'Vous cherchez un profil capable de travailler sur les données et de construire l’application autour ? Parlons de votre équipe et de vos projets.',
  copy: 'Copier l’adresse e-mail', copied: 'Adresse copiée.', copyError: 'Copie indisponible. Tu peux sélectionner l’adresse ou cliquer dessus.',
  back: 'Revenir aux projets', problem: 'Le problème', role: 'Ma contribution', result: 'Le résultat', detail: 'Le projet en détail', decision: 'Le choix qui compte', method: 'Approche', limits: 'Périmètre et limites', code: 'Code source',
  next: 'Projet suivant', notFound: 'Cette page n’existe pas.', skip: 'Aller au contenu', top: 'Retour en haut', dark: 'Activer le thème sombre', light: 'Activer le thème clair', open: 'Ouvrir le menu', close: 'Fermer le menu', newTab: 'nouvel onglet'
 },
 en: {
  nav: ['Projects', 'Skills', 'Background', 'Contact'], cv: 'CV (French)',
  eyebrow: 'Rudolf Hounlete · Engineering student at Centrale Casablanca', hero: ['From model', 'to decision.'],
  intro: 'I build machine learning models and the software that makes them useful.',
  explore: 'View projects', reach: 'Get in touch', field: 'Machine learning & software development',
  bronze: 'Bronze medals', outOf: 'out of', participants: 'participants',
  projectsTitle: 'Projects, decisions and evidence.', projectsText: 'The problem, my contribution and the outcome: each project also has its own case study.',
  read: 'Read the case study', summary: 'Overview', technical: 'Architecture and validation',
  groups: ['All', 'Software', 'Machine learning', 'Experimentation'], search: 'Search projects', reset: 'Reset', empty: 'No projects found.', emptyText: 'Try another term or remove the filter.', count: 'projects',
  capture: 'Project screenshot', generated: 'Generated image', generatedCaption: 'Generated image evoking the subject of the project.', catalogue: 'Complete catalogue',
  skillsTitle: 'Skills, demonstrated through work.', skillsIntro: 'A skill matters when it helps solve a concrete problem.',
  pillars: [
   ['Model and validate', 'Engineer features, compare models and design validation that reflects the actual test conditions.', 'LightGBM / PyTorch / Optuna / SHAP', 'financial-stress'],
   ['Build the surrounding tool', 'Connect a Python engine to an interface, access controls and a usable distribution.', 'Python / React / TypeScript / SQL', 'risksim'],
   ['Connect to the physical system', 'Link perception, decision and control, and compare numerical simulation with measurements.', 'YOLOv8 / Raspberry Pi / LTspice', '02']
  ],
  compTitle: 'Results against a common benchmark.', compText: 'Three bronze medals and two leading ranks across visual reasoning, speech, satellite data and finance.',
  aboutTitle: 'The same care for the model and its use.', aboutLead: 'I am interested in the gap between a good technical result and a tool someone can actually use.',
  aboutText: 'At CHOUBEL CONSULTING, that meant working on simulation visualisations and the RiskSim interface. On Dossier Jaune, it means revising workflows based on user feedback.',
  origin: 'Originally from Benin, I studied mathematics and ICT at IMSP before joining Centrale Casablanca in 2025. I combine modelling and software development, with a particular interest in risk and finance.',
  journey: 'Background', engineering: 'General engineering degree programme', internship: 'Software development internship · RiskSim', degree: 'Bachelor’s degree in Information and Communication Technologies', morocco: 'Morocco', benin: 'Benin',
  contactTitle: 'Let’s build what comes next.', contactText: 'Looking for someone who can work on the data and build the application around it? Tell me about your team and projects.',
  copy: 'Copy email address', copied: 'Address copied.', copyError: 'Copy unavailable. Select the address or click it to send an email.',
  back: 'Back to projects', problem: 'The problem', role: 'My contribution', result: 'The outcome', detail: 'Inside the project', decision: 'The key decision', method: 'Approach', limits: 'Scope and limitations', code: 'Source code',
  next: 'Next project', notFound: 'This page does not exist.', skip: 'Skip to content', top: 'Back to top', dark: 'Use dark theme', light: 'Use light theme', open: 'Open menu', close: 'Close menu', newTab: 'new tab'
 }
}

function ProjectCard({ project: p, locale }: { project: Work; locale: Locale }) {
 const v = projectVisuals[p.id], t = text[locale], pitch = getPitch(p.id, locale)
 return <a href={projectPath(p.id, locale)} className="archive-item">
  <div className={`archive-visual archive-visual-${v.kind}`}><img src={v.src} srcSet={imageSet(p.id)} sizes={cardSizes} alt={locale === 'fr' ? v.alt : `${v.kind === 'capture' ? t.capture : t.generated}: ${p.title}`} width={v.width} height={v.height} loading="lazy" decoding="async"/></div>
  <div className="archive-item-body"><div className="archive-item-top"><span>{p.group}</span><ArrowUpRight size={22} aria-hidden="true"/></div><h3 id={`card-${p.id}`}>{p.title}</h3><p>{p.summary}</p><strong className="archive-proof">{pitch.proof}</strong><span className="archive-context">{p.stack.slice(0, 3).join(' / ')}</span></div>
 </a>
}

function StudyPage({ project: p, locale }: { project: Work; locale: Locale }) {
 const t = text[locale], pitch = getPitch(p.id, locale), list = getWork(locale), v = projectVisuals[p.id]
 const next = list[(list.findIndex(w => w.id === p.id) + 1) % list.length]
 return <main id="contenu" className="study-page wrap">
  <a href={`${homePath(locale)}#projets`} className="text-button study-back"><ArrowLeft size={19}/>{t.back}</a>
  <header className="study-heading"><p className="study-context">{p.context} / {p.period}</p><h1>{p.title}</h1><p className="study-headline">{pitch.headline}</p><p className="study-proof">{pitch.proof}</p></header>
  <nav className="study-navigation" aria-label={locale === 'fr' ? 'Dans cette étude' : 'On this page'}><a href="#synthese">{t.summary}</a><a href="#technique">{t.technical}<ArrowDown size={16}/></a>{p.code && <a href={p.code} target="_blank" rel="noreferrer">{t.code}<ArrowUpRight size={16}/><span className="sr-only"> ({t.newTab})</span></a>}</nav>
  <section className="study-brief" id="synthese" aria-label={t.summary}>{[[t.problem, p.problem || p.summary], [t.role, pitch.role], [t.result, pitch.value]].map(([heading, value]) => <div key={heading}><h2>{heading}</h2><p>{value}</p></div>)}</section>
  <figure className={`project-image project-image-large project-image-${v.kind}`}><img src={v.src} srcSet={imageSet(p.id)} sizes={studySizes} alt={locale === 'fr' ? v.alt : `${v.kind === 'capture' ? t.capture : t.generated}: ${p.title}`} width={v.width} height={v.height} decoding="async"/><figcaption>{locale === 'fr' ? v.caption : v.kind === 'generated' ? t.generatedCaption : `${p.title}: prototype screenshot.`}</figcaption></figure>
  <section className="study-detail" id="technique"><div className="study-prose"><h2>{t.detail}</h2>{p.paragraphs.map(value => <p key={value}>{value}</p>)}</div><aside><h2>{t.decision}</h2><p>{pitch.decision}</p><h2>{t.method}</h2><p>{p.method}</p><div className="tech-list">{p.stack.map(s => <span key={s}>{s}</span>)}</div></aside></section>
  <Architecture id={p.id} locale={locale}/>
  <section className="study-result"><div><h2>{t.result}</h2><p>{p.result}</p></div>{p.note && <div><h2>{t.limits}</h2><p>{p.note}</p></div>}</section>
  <footer className="study-footer"><a className="text-button" href={`${homePath(locale)}#projets`}><ArrowLeft size={19}/>{t.back}</a><a className="next-project" href={projectPath(next.id, locale)}><span>{t.next}</span><strong>{next.title}<ArrowRight size={23}/></strong></a></footer>
 </main>
}

function HomePage({ locale }: { locale: Locale }) {
 const t = text[locale], list = getWork(locale)
 const [group, setGroup] = useState(t.groups[0]), [query, setQuery] = useState(''), [copyStatus, setCopyStatus] = useState('')
 const timer = useRef<ReturnType<typeof setTimeout>>()
 useEffect(() => () => clearTimeout(timer.current), [])
 const filtered = list.filter(p => (group === t.groups[0] || p.group === group) && `${p.title} ${p.summary} ${p.stack.join(' ')}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale)))
 const copy = async () => { clearTimeout(timer.current); try { await navigator.clipboard.writeText(contact.email); setCopyStatus(t.copied); timer.current = setTimeout(() => setCopyStatus(''), 2400) } catch { setCopyStatus(t.copyError) } }
 return <main id="contenu">
  <section className="hero chapter wrap" id="accueil" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1 id="hero-title">{t.hero[0]}<br/><span className="accent">{t.hero[1]}</span></h1><p className="hero-description">{t.intro}</p><div className="hero-actions"><a className="button primary" href="#projets">{t.explore}<ArrowDown size={20}/></a><a className="text-button" href={`mailto:${contact.email}`}>{t.reach}<ArrowUpRight size={20}/></a></div></div><figure className="hero-portrait"><div className="portrait-frame"><div className="portrait-accent"/><img src="/images/portrait.webp" srcSet={portraitSet} sizes={portraitSizes} alt="Rudolf Hounlete" width="1000" height="1000"/></div><figcaption>{t.field}</figcaption></figure></section>
  <div className="credential-strip wrap"><a href="#competitions"><strong>3</strong><span>{t.bronze}<br/>Kaggle & Zindi</span><Medal size={28} weight="light"/></a><a href={projectPath('credit', locale)}><strong>2<sup>{locale === 'fr' ? 'e' : 'nd'}</sup></strong><span>African Credit Scoring<br/>{t.outOf} 77 {t.participants}</span><ArrowUpRight size={22}/></a><a href={projectPath('financial-stress', locale)}><strong>4<sup>{locale === 'fr' ? 'e' : 'th'}</sup></strong><span>Financial Stress Prediction<br/>{t.outOf} 262 {t.participants}</span><ArrowUpRight size={22}/></a></div>
  <section className="projects chapter wrap" id="projets" aria-labelledby="projects-title"><header className="section-head"><h2 id="projects-title">{t.projectsTitle}</h2><p>{t.projectsText}</p></header>
   <div className="selected-work">{['risksim', 'financial-stress', 'dossier-jaune'].map((id, i) => {
    const p = list.find(p => p.id === id)!, pitch = getPitch(id, locale), v = projectVisuals[id]
    return <article className={`selected-case selected-case-${i}`} key={id}><a className={`selected-image selected-image-${v.kind}`} href={projectPath(id, locale)} aria-labelledby={`feature-${id}`}><img src={v.src} srcSet={imageSet(id)} sizes={featureSizes} alt={locale === 'fr' ? v.alt : p.title} width={v.width} height={v.height} loading="lazy"/></a><div className="selected-copy"><p className="selected-context">{p.title} / {p.group}</p><h3 id={`feature-${id}`}><a href={projectPath(id, locale)}>{pitch.headline}</a></h3><p>{pitch.summary}</p><strong className="selected-proof">{pitch.proof}</strong><a className="text-button" href={projectPath(id, locale)}>{t.read}<ArrowUpRight size={20}/></a></div></article>
   })}</div>
   <div className="archive-panel" id="index"><div className="catalogue-heading"><h3>{t.catalogue}</h3><span>14 {t.count}</span></div><div className="archive-toolbar"><div className="filters" role="group" aria-label={t.search}>{t.groups.map(g => <button key={g} onClick={() => setGroup(g)} aria-pressed={group === g}>{g}</button>)}</div><label className="search-label"><span className="sr-only">{t.search}</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={`${t.search}…`} name="project-search" autoComplete="off"/></label></div><p className="result-count" role="status">{filtered.length} / 14 {t.count}</p><div className="archive-grid">{filtered.map(p => <ProjectCard project={p} locale={locale} key={p.id}/>)}</div>{!filtered.length && <div className="empty-state"><h3>{t.empty}</h3><p>{t.emptyText}</p><button className="text-button" onClick={() => { setGroup(t.groups[0]); setQuery('') }}>{t.reset}<ArrowRight size={19}/></button></div>}</div>
  </section>
  <section className="expertise chapter wrap" id="competences" aria-labelledby="expertise-title"><header className="section-head"><h2 id="expertise-title">{t.skillsTitle}</h2><p>{t.skillsIntro}</p></header><div className="expertise-list">{t.pillars.map(([title, value, tools, id]) => <a className="expertise-row" href={projectPath(id, locale)} key={title}><h3>{title}</h3><div><p>{value}</p><span>{tools}</span></div><ArrowUpRight size={27}/></a>)}</div></section>
  <section className="competitions chapter wrap" id="competitions" aria-labelledby="competitions-title"><div className="competition-intro"><h2 id="competitions-title">{t.compTitle}</h2><p>{t.compText}</p></div><div className="competition-layout"><div className="medal-feature"><Medal size={64} weight="light"/><div className="medal-number">3</div><h3>{t.bronze}.</h3><p>Kaggle & Zindi</p></div><div className="competition-rows">{['neurogolf', 'waxal', 'geoai', 'financial-stress', 'credit'].map(id => {
   const p = list.find(p => p.id === id)!, pitch = getPitch(id, locale)
   return <a href={projectPath(id, locale)} className="competition-row" key={id}><div><span>{id === 'neurogolf' ? 'Kaggle' : 'Zindi'}</span><h3>{p.title}</h3><p className="competition-detail">{pitch.summary}</p></div><div className="competition-result"><strong>{id === 'credit' ? '2 / 77' : id === 'financial-stress' ? '4 / 262' : 'Bronze'}</strong><ArrowUpRight size={23}/></div></a>
  })}</div></div></section>
  <section className="about chapter wrap" id="apropos" aria-labelledby="about-title"><h2 id="about-title">{t.aboutTitle}</h2><div className="about-grid"><p className="about-lead">{t.aboutLead}</p><div className="about-copy"><p>{t.aboutText}</p><p>{t.origin}</p></div></div><div className="journey"><h3>{t.journey}</h3>{[
   ['2025 - 2028', 'École Centrale Casablanca', t.engineering, t.morocco], ['2026', 'CHOUBEL CONSULTING', t.internship, 'Casablanca'], ['2022 - 2025', 'Institut de mathématiques et de sciences physiques', t.degree, t.benin]
  ].map(([date, title, subtitle, place]) => <div className="journey-entry" key={title}><span className="journey-date">{date}</span><div><h4>{title}</h4><p>{subtitle}</p></div><span className="journey-place">{place}</span></div>)}</div></section>
  <section className="contact chapter" id="contact" aria-labelledby="contact-title"><div className="wrap"><h2 id="contact-title">{t.contactTitle}</h2><p className="contact-intro">{t.contactText}</p><div className="contact-main"><a href={`mailto:${contact.email}`} className="email-link">{contact.email}<ArrowUpRight size={40}/></a><button className="icon-button copy-email" onClick={copy} aria-label={t.copy}>{copyStatus === t.copied ? <Check size={24}/> : <Copy size={24}/>}</button></div><p className="copy-status" role="status">{copyStatus || '\u00a0'}</p><div className="contact-secondary"><a className="button primary" href={`mailto:${contact.email}`}>{t.reach}<ArrowUpRight size={21}/></a><a className="text-button" href={contact.github} target="_blank" rel="noreferrer">GitHub<GithubLogo size={22}/><span className="sr-only"> ({t.newTab})</span></a><a className="text-button" href={contact.cv!} download>{t.cv}<DownloadSimple size={21}/></a></div></div></section>
 </main>
}

export default function App({ pathname = '/' }: { pathname?: string }) {
 const { locale, id, notFound } = routeFor(pathname), t = text[locale]
 const [theme, setTheme] = useState('light'), [menu, setMenu] = useState(false)
 const home = homePath(locale), project = getWork(locale).find(p => p.id === id), other: Locale = locale === 'fr' ? 'en' : 'fr'
 const anchors = ['projets', 'competences', 'apropos', 'contact']
 useEffect(() => {
  setTheme(document.documentElement.dataset.theme || 'light')
  if (location.hash.startsWith('#projet/')) {
   let oldId: string
   try { oldId = decodeURIComponent(location.hash.slice(8)) } catch { return }
   if (getWork(locale).some(p => p.id === oldId)) location.replace(projectPath(oldId, locale))
  }
 }, [locale])
 useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
 const toggleTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); document.documentElement.dataset.theme = next; try { localStorage.setItem('rudolf-theme', next) } catch { /* Optional storage. */ } }
 return <>
  <a className="skip-link" href="#contenu">{t.skip}</a>
  <header className="site-header"><a className="brand" href={home} aria-label="rh. Rudolf Hounlete">rh<span>.</span></a><nav className="desktop-nav" aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>{anchors.map((anchor, i) => <a key={anchor} href={`${home}#${anchor}`}>{t.nav[i]}</a>)}</nav><div className="header-actions"><a className="locale-switch" href={id ? projectPath(id, other) : homePath(other)} hrefLang={other} lang={other} aria-label={locale === 'fr' ? 'EN - Read in English' : 'FR - Lire en français'}>{other.toUpperCase()}</a><a className="cv-nav" href={contact.cv!} download>{t.cv}<DownloadSimple size={18}/></a><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? t.light : t.dark}>{theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}</button><button className="icon-button menu-toggle" aria-label={menu ? t.close : t.open} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X size={24}/> : <List size={24}/>}</button></div>{menu && <nav id="mobile-nav" className="mobile-nav" aria-label={locale === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}>{anchors.map((anchor, i) => <a href={`${home}#${anchor}`} key={anchor} onClick={() => setMenu(false)}>{t.nav[i]}<ArrowUpRight size={24}/></a>)}<a href={contact.cv!} download>{t.cv}<DownloadSimple size={23}/></a></nav>}</header>
  {notFound ? <main id="contenu" className="not-found wrap"><h1>404</h1><p>{t.notFound}</p><a className="text-button" href={home}>{t.back}<ArrowRight size={19}/></a></main> : project ? <StudyPage project={project} locale={locale}/> : <HomePage locale={locale}/>}
  <footer className="site-footer wrap"><a className="brand" href={home} aria-label="rh. Rudolf Hounlete">rh<span>.</span></a><span>© 2026 Rudolf Hounlete</span><a href="#contenu">{t.top}<ArrowUp size={17}/></a></footer>
 </>
}
