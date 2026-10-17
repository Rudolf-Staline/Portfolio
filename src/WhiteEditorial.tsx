import { useEffect, useRef, useState } from 'react'
import { projects } from './data/projects'
import { projectStories } from './data/projectStories'
import { competitions } from './data/competitions'
import { education } from './data/education'
import { skills } from './data/skills'
import { profile, contact } from './data/profile'
import { IconMark, type IconName } from './components/PortfolioMotion'
import type { Project } from './data/types'

const featuredIds = ['risksim', 'financial-stress', 'geoai', '01', 'automl'] as const
const otherIds = ['neurogolf', 'credit', 'waxal', '02', '03', '05'] as const

const labels: Record<string, string> = {
  risksim:'RiskSim',
  'financial-stress':'Financial Stress',
  geoai:'GeoAI',
  '01':'PediAppend',
  automl:'AutoML',
  neurogolf:'NeuroGolf',
  credit:'African Credit Scoring',
  waxal:'WAXAL ASR',
  '02':'Feux intelligents',
  '03':'Analyse Forex',
  '05':'Propagation de solitons',
}
const categories: Record<string,string> = {
  risksim:'Simulation & risque',
  'financial-stress':'Prédiction financière',
  geoai:'Géospatial & IA',
  '01':'Machine learning · Santé',
  automl:'Ingénierie machine learning',
  neurogolf:'Raisonnement visuel',
  credit:'Scoring de crédit',
  waxal:'Traitement de la parole',
  '02':'Vision & systèmes embarqués',
  '03':'Analyse quantitative',
  '05':'Physique expérimentale',
}
const icons: Record<string,IconName> = {
  risksim:'radar','financial-stress':'trend',geoai:'globe','01':'heart',automl:'terminal',
  neurogolf:'grid',credit:'shield',waxal:'audio','02':'radar','03':'chart','05':'flask',
}
const media: Record<string,{src:string;alt:string;authentic?:boolean}> = {
  risksim:{
    src:'/cinema/risksim-photo.webp',
    alt:'Illustration éditoriale consacrée aux simulations de risques',
  },
  'financial-stress':{
    src:'/editorial-white/financial-stress.svg',
    alt:'Illustration conceptuelle de séries transactionnelles et de distributions financières',
  },
  geoai:{
    src:'/editorial-white/geoai.svg',
    alt:'Illustration géospatiale conceptuelle : parcelles et traitements satellitaires',
  },
  '01':{
    src:'/projects/pediappend-interface-symptomes.jpg',
    alt:'Capture authentique du formulaire des observations du prototype PediAppend',
    authentic:true,
  },
  automl:{
    src:'/editorial-white/automl.svg',
    alt:'Illustration conceptuelle d’un pipeline AutoML, de ses modèles et évaluations',
  },
  neurogolf:{src:'/cinema/neurogolf-photo.webp',alt:'Illustration du raisonnement sur des grilles'},
  credit:{src:'/cinema/credit-photo.webp',alt:'Illustration du scoring de crédit'},
  waxal:{src:'/cinema/waxal-photo.webp',alt:'Illustration de la transcription de parole'},
  '02':{src:'/cinema/traffic-night-photo.webp',alt:'Illustration de systèmes de feux de circulation'},
  '03':{src:'/cinema/forex-photo.webp',alt:'Illustration des signaux financiers'},
  '05':{src:'/cinema/soliton-photo.webp',alt:'Illustration de propagation d’ondes'},
}

const byId = (id:string) => projects.find(item => item.index===id)!

function Arrow({diagonal=false,size=17}:{diagonal?:boolean;size?:number}) {
  return diagonal ? <IconMark name="external" size={size}/> : <IconMark name="arrow-right" size={size}/>
}
function SiteGlyph({name,size=18}:{name:'github'|'download';size?:number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name==='github'
      ? <><path d="M9 20c-4 1-4-2-6-2m12 3v-3a3 3 0 0 0-1-2c4-.5 6-2.4 6-6A4.8 4.8 0 0 0 19 7a5 5 0 0 0 0-3s-1-.4-3 1a12 12 0 0 0-8 0C6 3.6 5 4 5 4a5 5 0 0 0 0 3 4.8 4.8 0 0 0-1 3c0 3.6 2 5.5 6 6a3 3 0 0 0-1 2v3"/></>
      : <><path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/></>}
  </svg>
}
function Label({children}:{children:React.ReactNode}) {
  return <span className="we-label">{children}</span>
}

function useShowOnView(){
  useEffect(()=>{
    const nodes=Array.from(document.querySelectorAll<HTMLElement>('[data-appear]'))
    if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return
      entry.target.classList.add('we-on')
      observer.unobserve(entry.target)
    }),{rootMargin:'0px 0px -40px 0px',threshold:.08})
    nodes.forEach(node=>observer.observe(node))
    document.documentElement.classList.add('we-can-animate')
    return()=>{observer.disconnect();document.documentElement.classList.remove('we-can-animate')}
  },[])
}
function ProjectActions({project}:{project:Project}) {
  return <div className="we-project-actions">
    {project.links.code && <a href={project.links.code} rel="noopener noreferrer" target="_blank"><IconMark name="code" size={15}/> Code <Arrow diagonal size={14}/></a>}
    {project.links.demo && <a href={project.links.demo} rel="noopener noreferrer" target="_blank"><IconMark name="external" size={15}/> Démo <Arrow diagonal size={14}/></a>}
    {project.evidence && <a href={project.evidence.href} rel="noopener noreferrer" target="_blank"><IconMark name="award" size={15}/> {project.evidence.label} <Arrow diagonal size={14}/></a>}
  </div>
}
function WideRow({id,index}:{id:string;index:number}) {
  const p=byId(id)
  const art=media[id]
  return <article className="we-row" id={`projet-${id}`} data-appear>
    <span className="we-row-no" aria-hidden="true">{String(index).padStart(2,'0')}<i/></span>
    <figure className={`we-row-media ${art.authentic?'we-row-real':''}`}>
      <a href={`#etude-${id}`} aria-label={`Lire l’étude de cas ${labels[id]}`}>
        <img src={art.src} alt={art.alt} loading="lazy" decoding="async"/>
        <span className="we-image-action" aria-hidden="true"><Arrow size={23}/></span>
      </a>
    </figure>
    <div className="we-row-copy">
      <div className="we-row-heading"><Label>{categories[id]}</Label><a className="we-row-circle" aria-label={`Voir l’étude de cas ${labels[id]}`} href={`#etude-${id}`}><Arrow size={20}/></a></div>
      <h3><a href={`#etude-${id}`}>{labels[id]}</a></h3>
      <p>{p.tagline}</p>
      <div className="we-pills">{p.stack.slice(0,4).map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="we-row-foot"><span>{p.period}</span><a href={`#etude-${id}`}>Étude de cas <Arrow size={15}/></a></div>
    </div>
  </article>
}
function CaseStudy({id,index}:{id:string;index:number}) {
  const p=byId(id),story=projectStories[id]
  return <article className="we-case" id={`etude-${id}`} data-appear>
    <div className="we-case-head">
      <div><Label>{String(index).padStart(2,'0')} / ÉTUDE DE CAS</Label><h3>{labels[id]}</h3><p>{story.subtitle}</p></div>
      <div className="we-case-symbol"><IconMark name={icons[id]??'code'} size={39}/></div>
    </div>
    <div className="we-case-content">
      <div className="we-case-aside">
        <strong>{p.context}</strong>
        <span>{p.period}</span>
        <div className="we-pills">{p.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
        <ProjectActions project={p}/>
      </div>
      <div className="we-case-writing">
        {story.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
        <div className="we-case-findings">
          <div><Label><IconMark name="flask" size={16}/> Approche</Label><p>{story.method}</p></div>
          <div><Label><IconMark name="check" size={16}/> Résultat</Label><p>{story.result}</p></div>
        </div>
        {story.note&&<p className="we-note">{story.note}</p>}
        {p.limitation&&<p className="we-note"><strong>Limites :</strong> {p.limitation}</p>}
      </div>
    </div>
    {id==='risksim'&& <div className="we-proof-grid" aria-label="Captures réelles de RiskSim">
      <figure><img src="/projects/risksim-dashboard.png" loading="lazy" alt="Capture authentique du tableau de bord RiskSim sur un cas synthétique"/><figcaption>Tableau de bord de RiskSim · scénario synthétique</figcaption></figure>
      <figure><img src="/projects/risksim-results.png" loading="lazy" alt="Capture authentique des résultats, percentiles et sensibilités RiskSim"/><figcaption>Résultats de simulation · aucune donnée client réelle</figcaption></figure>
    </div>}
    {id==='01'&& <div className="we-proof-grid" aria-label="Captures réelles de PediAppend">
      <figure><img src="/projects/pediappend-interface-symptomes.jpg" loading="lazy" alt="Capture authentique du prototype Flask de saisie des observations"/><figcaption>Interface du prototype académique PediAppend</figcaption></figure>
      <figure><img src="/projects/shap_summary_bar.png" loading="lazy" alt="Importance moyenne des variables analysée avec SHAP dans PediAppend"/><figcaption>Interprétabilité globale avec SHAP · ne constitue pas un diagnostic clinique</figcaption></figure>
    </div>}
  </article>
}
function SmallProject({id}:{id:string}) {
 const p=byId(id)
 return <article className="we-mini" data-appear>
  <a className="we-mini-image" href={`#etude-${id}`}><img src={media[id].src} alt={media[id].alt} loading="lazy"/><span aria-hidden="true"><Arrow size={19}/></span></a>
  <div className="we-mini-copy"><div className="we-mini-meta"><IconMark name={icons[id]??'code'} size={18}/><Label>{categories[id]}</Label></div>
    <h3><a href={`#etude-${id}`}>{labels[id]}</a></h3><p>{p.tagline}</p>
    <a href={`#etude-${id}`}>Découvrir <Arrow size={16}/></a></div>
 </article>
}

export default function WhiteEditorial(){
  const [section,setSection]=useState('accueil')
  const progress=useRef<HTMLDivElement>(null)
  useShowOnView()
  useEffect(()=>{
    const anchors=Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    let raf=0
    const scan=()=>{
      const limit=Math.max(1,document.documentElement.scrollHeight-innerHeight)
      if(progress.current)progress.current.style.transform=`scaleX(${Math.min(1,scrollY/limit)})`
      let current='accueil'
      for(const item of anchors)if(item.getBoundingClientRect().top<=innerHeight*.34)current=item.id
      setSection(prev=>prev===current?prev:current)
      raf=0
    }
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(scan)}
    onScroll()
    addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll)
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)}
  },[])
  return <div className="we-site">
    <a className="we-skip" href="#projets">Aller aux projets</a>
    <div ref={progress} className="we-progress" aria-hidden="true"/>
    <header className="we-header">
      <a className="we-logo" href="#accueil">R<span className="we-logo-dot">.</span> HOUNLETE</a>
      <nav className="we-main-nav" aria-label="Navigation principale">
        <a href="#accueil" aria-current={section==='accueil'?'page':undefined}>Accueil</a>
        <a href="#projets" aria-current={section==='projets'?'page':undefined}>Projets</a>
        <a href="#apropos" aria-current={section==='apropos'?'page':undefined}>À propos</a>
        <a href="#parcours" aria-current={section==='parcours'?'page':undefined}>Parcours</a>
        <a href="#contact" aria-current={section==='contact'?'page':undefined}>Contact</a>
      </nav>
      <a className="we-contact-link" href="#contact">Échanger <Arrow size={17}/></a>
    </header>
    <main>
      <section id="accueil" className="we-hero" aria-labelledby="we-name">
        <div className="we-hero-copy">
          <Label>Creative developer / Ingénierie</Label>
          <h1 id="we-name">Rudolf<br/><em>Hounlete</em><span>.</span></h1>
          <p>Des logiciels, des modèles et des expériences de données au service de problèmes concrets.</p>
          <div className="we-hero-cta">
            <a className="we-button" href="#projets">Voir mes projets <Arrow size={18}/></a>
            <a className="we-text-link" href="#apropos">À propos <Arrow size={16}/></a>
          </div>
          <span className="we-hero-detail"><IconMark name="globe" size={15}/> Casablanca · Originaire du Bénin</span>
        </div>
        <figure className="we-hero-media">
          <img src="/editorial-white/hero-panorama.svg" alt="Paysage montagneux stylisé au bord d’un lac, illustration décorative" fetchPriority="high" />
          <figcaption>CRÉER · TESTER · EXPLIQUER</figcaption>
        </figure>
      </section>
      <section id="projets" className="we-featured" aria-labelledby="we-featured-title">
        <div className="we-section-top" data-appear><div><Label>Projets sélectionnés</Label><h2 id="we-featured-title">Selected <em>Work.</em></h2></div>
          <div className="we-section-side"><p>Cinq réalisations en simulation, machine learning, géospatial et développement logiciel.</p><a href="#autres">Tous les projets <Arrow size={17}/></a></div>
        </div>
        <div className="we-rows">{featuredIds.map((id,i)=><WideRow id={id} index={i+1} key={id}/>)}</div>
      </section>
      <section className="we-studies" id="etudes" aria-labelledby="we-study-title">
        <div className="we-section-top we-studies-top" data-appear><div><Label>Dans les coulisses</Label><h2 id="we-study-title">Au-delà <em>des images.</em></h2></div><p>Méthodes, décisions, résultats, limites : chaque projet est expliqué directement, sans écran à ouvrir.</p></div>
        {featuredIds.map((id,i)=><CaseStudy id={id} index={i+1} key={id}/>)}
      </section>
      <section className="we-other" id="autres" aria-labelledby="we-other-title">
        <div className="we-section-top" data-appear><div><Label>Explorations</Label><h2 id="we-other-title">Et aussi<span>…</span></h2></div><p>D’autres expériences, entre données, systèmes industriels, audio et physique.</p></div>
        <div className="we-mini-grid">{otherIds.map(id=><SmallProject id={id} key={id}/>)}</div>
        <div className="we-other-cases">{otherIds.map((id,i)=><CaseStudy id={id} index={i+6} key={id}/>)}</div>
      </section>
      <section className="we-honors" id="distinctions" aria-labelledby="we-honors-title">
        <div className="we-section-top" data-appear><div><Label>Kaggle & Zindi</Label><h2 id="we-honors-title">Résultats <em>mesurés.</em></h2></div><p>Des classements et des évaluations documentés, plutôt que des promesses.</p></div>
        <div className="we-honors-list">{competitions.map((c,i)=><div className="we-honor" key={c.projectId} data-appear><span>{String(i+1).padStart(2,'0')}</span><div><strong>{c.name}</strong><small>{c.platform} · {c.year}</small></div><b>{c.result}</b>{c.href?<a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`Voir ${c.name}`}><Arrow diagonal size={19}/></a>:<IconMark name="award" size={20}/>}</div>)}</div>
      </section>
      <section className="we-about" id="apropos" aria-labelledby="we-about-title">
        <div className="we-about-photo"><img src="/portrait-rudolf.webp" alt="Portrait original de Rudolf Hounlete" loading="lazy"/><span>PORTRAIT / 2026</span></div>
        <div className="we-about-copy" data-appear><Label>Un peu de contexte</Label><h2 id="we-about-title">Ingénieur en formation.<br/><em>Curieux par nature.</em></h2>{profile.about.map((part,i)=><p key={i}>{part}</p>)}<a href={contact.cv??'/CV_Rudolf_HOUNLETE.pdf'} download>Consulter le CV <SiteGlyph name="download" size={16}/></a></div>
      </section>
      <section className="we-background" id="parcours" aria-labelledby="we-background-title">
        <div className="we-section-top" data-appear><div><Label>Parcours & savoir-faire</Label><h2 id="we-background-title">Une base <em>solide.</em></h2></div></div>
        <div className="we-background-cols"><div><h3><IconMark name="school" size={24}/> Formation</h3>{education.map((entry,i)=><div className="we-education" key={i}><span>{entry.period||'—'}</span><div><b>{entry.school}</b><p>{entry.detail}</p><small>{entry.location}</small></div></div>)}</div>
        <div><h3><IconMark name="layers" size={24}/> Boîte à outils</h3>{skills.map((group,i)=><div className="we-skill" key={group.label}><span>0{i+1}</span><div><b>{group.label}</b><p>{group.items.join(' · ')}</p></div></div>)}</div></div>
      </section>
      <section id="contact" className="we-contact" aria-labelledby="we-contact-title">
        <Label>Contact</Label><h2 id="we-contact-title">Un projet commence<br/>par une <em>conversation.</em></h2>
        <a className="we-contact-email" href={`mailto:${contact.email}`}><IconMark name="mail" size={26}/>{contact.email}<Arrow diagonal size={25}/></a>
        <div className="we-footer-links"><span>Casablanca, Maroc · Bénin</span><a href={contact.github} target="_blank" rel="noopener noreferrer"><SiteGlyph name="github" size={16}/> GitHub <Arrow diagonal size={14}/></a><a href={contact.cv??'/CV_Rudolf_HOUNLETE.pdf'} download><SiteGlyph name="download" size={16}/> CV</a></div>
      </section>
    </main>
    <footer className="we-footer"><a className="we-logo" href="#accueil">R<span className="we-logo-dot">.</span> HOUNLETE</a><span>© 2026 · Portfolio personnel</span><a href="#accueil">Retour en haut <IconMark name="arrow-up" size={16}/></a></footer>
  </div>
}
