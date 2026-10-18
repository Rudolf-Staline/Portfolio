import { useEffect, useRef, useState } from 'react'
import { projects } from './data/projects'
import { projectStories } from './data/projectStories'
import { competitions } from './data/competitions'
import { education } from './data/education'
import { skills } from './data/skills'
import { profile, contact } from './data/profile'
import { IconMark, type IconName } from './components/PortfolioMotion'
import type { Project } from './data/types'

/** Three lead case studies, then eight concise introductions with the same full technical documentation. */
const projectIds = [
  'risksim', 'financial-stress', 'geoai', '01', 'automl',
  'neurogolf', 'credit', 'waxal', '02', '03', '05',
] as const

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
    src:'/projects/risksim-dashboard.png',
    alt:'Capture authentique du tableau de bord RiskSim sur un scénario synthétique',
    authentic:true,
  },
  'financial-stress':{
    src:'/cinema/financial-photo.webp',
    alt:'Photographie illustrative de documents financiers et d’analyse de dépenses',
  },
  geoai:{
    src:'/cinema/geoai-aerial-photo.webp',
    alt:'Photographie aérienne illustrative de bassins et de parcelles aquacoles',
  },
  '01':{
    src:'/projects/pediappend-interface-symptomes.jpg',
    alt:'Capture authentique du formulaire des observations du prototype PediAppend',
    authentic:true,
  },
  automl:{
    src:'/cinema/automl-photo.webp',
    alt:'Photographie illustrative d’un poste de développement et d’évaluation de modèles',
  },
  neurogolf:{src:'/cinema/neurogolf-photo.webp',alt:'Illustration du raisonnement sur des grilles'},
  credit:{src:'/cinema/credit-photo.webp',alt:'Illustration du scoring de crédit'},
  waxal:{src:'/cinema/waxal-photo.webp',alt:'Illustration de la transcription de parole'},
  '02':{src:'/cinema/traffic-night-photo.webp',alt:'Illustration de systèmes de feux de circulation'},
  '03':{src:'/cinema/forex-photo.webp',alt:'Illustration des signaux financiers'},
  '05':{src:'/cinema/soliton-photo.webp',alt:'Illustration de propagation d’ondes'},
}

const figures: Record<string,{value:string;caption:string}> = {
  risksim:{value:'P50 · P80 · P90',caption:'Percentiles de coûts simulés'},
  'financial-stress':{value:'4e / 262',caption:'Classement privé Zindi'},
  geoai:{value:'Bronze',caption:'Médaille Zindi · GeoAI'},
  '01':{value:'782',caption:'Patients · données de recherche'},
  automl:{value:'393',caption:'Tests automatisés'},
  neurogolf:{value:'220e / 2 963',caption:'Bronze Kaggle'},
  credit:{value:'2e / 77',caption:'Classement Zindi'},
  waxal:{value:'Bronze',caption:'Médaille Zindi · 3 langues'},
  '02':{value:'YOLOv8',caption:'Détection des véhicules'},
  '03':{value:'Walk-forward',caption:'Validation hors échantillon'},
  '05':{value:'20',caption:'Cellules simulées dans LTspice'},
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
  return <div className={`we-row ${index<=3?'we-row-lead':'we-row-secondary'}`} data-appear>
    <span className="we-row-no" aria-hidden="true">{String(index).padStart(2,'0')}<i/></span>
    <figure className={`we-row-media ${art.authentic?'we-row-real':''}`}>
      <img src={art.src} alt={art.alt} loading="lazy" decoding="async"/>
      <figcaption className="we-art-source">{art.authentic?'Capture réelle du prototype':'Photographie illustrative · non issue du projet'}</figcaption>
    </figure>
    <div className="we-row-copy">
      <div className="we-row-heading"><Label>{categories[id]}</Label><IconMark name={icons[id]??'code'} size={22}/></div>
      <h3>{labels[id]}</h3>
      <div className="we-impact"><strong>{figures[id].value}</strong><span>{figures[id].caption}</span></div>
      <p>{p.tagline}</p>
      <div className="we-pills">{p.stack.slice(0,4).map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="we-row-foot"><span>{p.period}</span><a href={`#details-${id}`}>Lire la démarche <Arrow size={15}/></a></div>
    </div>
  </div>
}
function CaseStudy({id,index}:{id:string;index:number}) {
  const p=byId(id),story=projectStories[id]
  return <div className="we-case" id={`details-${id}`} data-appear>
    <div className="we-case-intro"><Label>Projet {String(index).padStart(2,'0')} — Conception, démarche et résultats</Label></div>
    <div className="we-case-content">
      <div className="we-case-aside">
        <span className="we-case-aside-icon"><IconMark name={icons[id]??'code'} size={26}/></span>
        <strong>{p.context}</strong>
        <div className="we-case-side-facts"><span>REPÈRES TECHNIQUES</span>{p.highlights.slice(0,2).map(point=><p key={point}>{point}</p>)}</div>
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
    {id==='risksim'&& <div className="we-proof-grid we-proof-single" aria-label="Seconde capture réelle de RiskSim">
      <figure><img src="/projects/risksim-results.png" loading="lazy" alt="Capture authentique des résultats, percentiles et sensibilités RiskSim"/><figcaption>Résultats de simulation · aucune donnée client réelle</figcaption></figure>
    </div>}
    {id==='01'&& <div className="we-proof-grid" aria-label="Captures réelles de PediAppend">
      <figure><img src="/projects/pediappend-interface-symptomes.jpg" loading="lazy" alt="Capture authentique du prototype Flask de saisie des observations"/><figcaption>Interface du prototype académique PediAppend</figcaption></figure>
      <figure><img src="/projects/shap_summary_bar.png" loading="lazy" alt="Importance moyenne des variables analysée avec SHAP dans PediAppend"/><figcaption>Interprétabilité globale avec SHAP · ne constitue pas un diagnostic clinique</figcaption></figure>
    </div>}
  </div>
}

function ProjectChapter({id,index}:{id:string;index:number}) {
  const next=projectIds[index]
  return <article className={`we-project-chapter ${index<=3?'we-project-featured':'we-project-compact'}`} id={`projet-${id}`} aria-label={`Projet ${index} sur ${projectIds.length} : ${labels[id]}`}>
    <div className="we-chapter-eyebrow"><span>PROJECT / {String(index).padStart(2,'0')}</span><span>{categories[id]}</span><span>{String(index).padStart(2,'0')} — {String(projectIds.length).padStart(2,'0')}</span></div>
    <WideRow id={id} index={index}/>
    <CaseStudy id={id} index={index}/>
    <div className="we-chapter-bottom">
      <span>FIN DU PROJET {String(index).padStart(2,'0')}</span>
      {next ? <a href={`#projet-${next}`} aria-label={`Passer au projet suivant : ${labels[next]}`}>Projet suivant <strong>{labels[next]}</strong><Arrow size={18}/></a> : <a href="#distinctions">Voir les distinctions <Arrow size={18}/></a>}
    </div>
  </article>
}

export default function WhiteEditorial(){
  const [section,setSection]=useState('apropos')
  const [menuOpen,setMenuOpen]=useState(false)
  const [activeProject,setActiveProject]=useState(0)
  const progress=useRef<HTMLDivElement>(null)
  useShowOnView()
  useEffect(()=>{
    const anchors=Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const chapters=Array.from(document.querySelectorAll<HTMLElement>('.we-project-chapter'))
    let raf=0
    const scan=()=>{
      const limit=Math.max(1,document.documentElement.scrollHeight-innerHeight)
      if(progress.current)progress.current.style.transform=`scaleX(${Math.min(1,scrollY/limit)})`
      let current='apropos'
      for(const item of anchors)if(item.getBoundingClientRect().top<=innerHeight*.34)current=item.id
      setSection(prev=>prev===current?prev:current)
      const nearTop=innerHeight*.47
      let page=0
      for(let i=0;i<chapters.length;i++) if(chapters[i].getBoundingClientRect().top <= nearTop) page=i
      setActiveProject(prev=>prev===page?prev:page)
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
    <nav className={`we-page-rail ${section==='projets'?'is-open':''}`} aria-label="Navigation page par page des projets">
      <span className="we-rail-title">PROJETS</span>
      <div className="we-rail-dots">{projectIds.map((id,i)=><a key={id} href={`#projet-${id}`} aria-label={`Aller à la page ${i+1} : ${labels[id]}`} aria-current={section==='projets' && activeProject===i?'location':undefined} className={section==='projets'&&activeProject===i?'is-current':''}><span className="we-rail-tip">{labels[id]}</span></a>)}</div>
      <span className="we-rail-number">{String(activeProject+1).padStart(2,'0')} / {String(projectIds.length).padStart(2,'0')}</span>
    </nav>
    <header className="we-header">
      <a className="we-logo" href="#apropos">R<span className="we-logo-dot">.</span> HOUNLETE</a>
      <button type="button" className="we-menu-toggle" aria-controls="we-primary-links" aria-expanded={menuOpen} onClick={()=>setMenuOpen(current=>!current)}><span className="we-menu-lines" aria-hidden="true"><i/><i/></span>{menuOpen?'Fermer':'Menu'}</button>
      <nav id="we-primary-links" className={`we-main-nav ${menuOpen?'is-open':''}`} aria-label="Navigation principale" onClick={()=>setMenuOpen(false)}>
        <a href="#apropos" aria-current={section==='apropos'?'page':undefined}>À propos</a>
        <a href="#projets" aria-current={section==='projets'?'page':undefined}>Projets</a>
        <a href="#distinctions" aria-current={section==='distinctions'?'page':undefined}>Distinctions</a>
        <a href="#parcours" aria-current={section==='parcours'?'page':undefined}>Parcours</a>
        <a href="#contact" aria-current={section==='contact'?'page':undefined}>Contact</a>
      </nav>
      <a className="we-contact-link" href="#contact"><IconMark name="mail" size={17}/> <span>Contact</span></a>
    </header>
    <main>
      <section id="apropos" className="we-hero we-hero-about" aria-labelledby="we-name">
        <div className="we-hero-copy">
          <Label>À propos / École Centrale Casablanca</Label>
          <h1 id="we-name">Rudolf<br/><em>Hounlete</em><span>.</span></h1>
          <h2 className="we-hero-about-heading">Ingénieur en formation.<br/><em>Curieux par nature.</em></h2>
          <div className="we-hero-proof" aria-label="Distinctions et classements">
            <a href="#distinctions"><strong>3</strong><span>Médailles<br/>de bronze</span></a>
            <a href="#distinctions"><strong>2e <small>/ 77</small></strong><span>Crédit · Zindi</span></a>
            <a href="#distinctions"><strong>4e <small>/ 262</small></strong><span>Stress financier · Zindi</span></a>
          </div>
          <div className="we-hero-about-intro">
            {profile.about.map((part,i)=><p key={i}>{part}</p>)}
          </div>
          <div className="we-hero-cta">
            <a className="we-button" href="#projets">Explorer mes projets <Arrow size={18}/></a>
            <a className="we-text-link" href={contact.cv??'/CV_Rudolf_HOUNLETE.pdf'} download>Consulter mon CV <SiteGlyph name="download" size={17}/></a>
          </div>
          <div className="we-hero-about-facts" aria-label="Repères personnels">
            <span><IconMark name="school" size={17}/> Centrale Casablanca</span>
            <span><IconMark name="globe" size={17}/> Bénin → Maroc</span>
            <span><IconMark name="layers" size={17}/> {projectIds.length} projets présentés</span>
          </div>
          <span className="we-hero-endnote">Simulation · Intelligence artificielle · Développement logiciel</span>
        </div>
        <figure className="we-hero-media we-hero-portrait">
          <div className="we-portrait-ring" aria-hidden="true"/>
          <div className="we-portrait-mark" aria-hidden="true">RH<span>.</span></div>
          <img src="/portrait-rudolf.webp" alt="Portrait original de Rudolf Hounlete" fetchPriority="high" decoding="async"/>
          <figcaption><span>RUDOLF HOUNLETE</span><span>CASABLANCA · 2026</span></figcaption>
        </figure>
      </section>
      <section id="projets" className="we-featured" aria-labelledby="we-featured-title">
        <div className="we-section-top" data-appear><div><Label>Portfolio / 11 réalisations</Label><h2 id="we-featured-title">Projets <em>sélectionnés.</em></h2></div>
          <div className="we-section-side"><p>Trois réalisations à la une, puis huit autres projets présentés plus sobrement. Tous conservent leur démarche, leurs résultats et leurs limites, directement dans la page.</p></div>
        </div>
        <div className="we-rows">{projectIds.map((id,i)=><ProjectChapter id={id} index={i+1} key={id}/>)}</div>
      </section>
      <section className="we-honors" id="distinctions" aria-labelledby="we-honors-title">
        <div className="we-section-top" data-appear><div><Label>Kaggle & Zindi</Label><h2 id="we-honors-title">Résultats <em>mesurés.</em></h2></div><p>Des classements et des évaluations documentés, plutôt que des promesses.</p></div>
        <div className="we-honors-list">{competitions.map((c,i)=><div className="we-honor" key={c.projectId} data-appear><span>{String(i+1).padStart(2,'0')}</span><div><strong>{c.name}</strong><small>{c.platform} · {c.year}</small></div><b className={c.medal?'we-medal':''}>{c.result}</b>{c.href?<a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`Voir ${c.name}`}><Arrow diagonal size={19}/></a>:<IconMark name="award" size={20}/>}</div>)}</div>
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
    <footer className="we-footer"><a className="we-logo" href="#apropos">R<span className="we-logo-dot">.</span> HOUNLETE</a><span>© 2026 · Portfolio personnel</span><a href="#apropos">Retour en haut <IconMark name="arrow-up" size={16}/></a></footer>
  </div>
}
