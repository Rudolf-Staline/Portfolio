import { useEffect, useRef, useState } from 'react'
import { projects } from './data/projects'
import { projectStories } from './data/projectStories'
import { competitions } from './data/competitions'
import { education } from './data/education'
import { skills } from './data/skills'
import { profile, contact } from './data/profile'
import type { Project } from './data/types'

const selectProject = (id: string) => projects.find(project => project.index === id)!
const focusIds = ['risksim', 'financial-stress', 'geoai', '01', 'automl']
const archiveIds = ['neurogolf', 'waxal', 'credit', '02', '03', '05']
const alias: Record<string, string> = {
  risksim: 'RiskSim', 'financial-stress': 'Financial Stress', geoai: 'GeoAI',
  '01': 'PediAppend', automl: 'Autonomous AutoML', neurogolf: 'NeuroGolf',
  waxal: 'WAXAL ASR', credit: 'African Credit Scoring', '02': 'Feux intelligents',
  '03': 'Analyse Forex', '05': 'Solitons',
}
const media: Record<string, { src: string; alt: string; real?: boolean }> = {
  risksim: { src: '/projects/risksim-dashboard.png', alt: 'Capture réelle de l’interface RiskSim sur scénario de démonstration', real: true },
  'financial-stress': { src: '/cinema/financial-photo.webp', alt: 'Illustration photographique du projet de prédiction du stress financier' },
  geoai: { src: '/cinema/geoai-aerial-photo.webp', alt: 'Illustration aérienne des bassins aquacoles' },
  '01': { src: '/projects/pediappend-interface-symptomes.jpg', alt: 'Capture réelle du formulaire PediAppend', real: true },
  automl: { src: '/cinema/automl-photo.webp', alt: 'Illustration photographique d’un environnement de développement AutoML' },
  neurogolf: { src: '/cinema/neurogolf-photo.webp', alt: 'Illustration du raisonnement sur des grilles de couleur' },
  waxal: { src: '/cinema/waxal-photo.webp', alt: 'Illustration de la reconnaissance vocale multilingue' },
  credit: { src: '/cinema/credit-photo.webp', alt: 'Illustration de l’analyse de risque de crédit' },
  '02': { src: '/cinema/traffic-night-photo.webp', alt: 'Illustration d’un carrefour en circulation nocturne' },
  '03': { src: '/cinema/forex-photo.webp', alt: 'Illustration de graphiques de données de marché' },
  '05': { src: '/cinema/soliton-photo.webp', alt: 'Illustration de propagation d’ondes' },
}

type GlyphName = 'arrow' | 'up' | 'down' | 'github' | 'mail' | 'play' | 'pause' | 'target' | 'layers' | 'sound' | 'star' | 'cross'
const iconPaths: Record<GlyphName, React.ReactNode> = {
  arrow: <><path d="M4 12h16M13 5l7 7-7 7"/></>,
  up: <><path d="M12 20V4M5 11l7-7 7 7"/></>,
  down: <><path d="M12 4v16M5 13l7 7 7-7"/></>,
  github: <><path d="M9 20c-4 1-4-2-6-2m12 3v-3a3 3 0 0 0-1-2c4-.5 6-2.4 6-6A4.8 4.8 0 0 0 19 7a5 5 0 0 0 0-3s-1-.4-3 1a12 12 0 0 0-8 0C6 3.6 5 4 5 4a5 5 0 0 0 0 3 4.8 4.8 0 0 0-1 3c0 3.6 2 5.5 6 6a3 3 0 0 0-1 2v3"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  play: <path d="m8 5 11 7-11 7V5Z"/>,
  pause: <><path d="M8 5v14M16 5v14"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
  sound: <><path d="M4 10v4M8 6v12M12 3v18M16 8v8M20 5v14"/></>,
  star: <><path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/></>,
  cross: <><path d="M12 2v20M2 12h20"/></>,
}
function Glyph({name, size=22}: {name:GlyphName;size?:number}) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>
}
function useEntrance() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-enter]')
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      nodes.forEach(node=>node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -25px 0px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}
type Mode = 'mesh' | 'wave' | 'particles'
function GenerativeLab() {
  const ref = useRef<HTMLCanvasElement>(null)
  const point = useRef({ x:.5, y:.5, inside:false })
  const [mode,setMode] = useState<Mode>('mesh')
  const [playing,setPlaying] = useState(true)
  const [reduced,setReduced] = useState(false)

  useEffect(()=>{
    const mql = matchMedia('(prefers-reduced-motion: reduce)')
    const onChange=()=>setReduced(mql.matches)
    onChange(); mql.addEventListener('change',onChange)
    return ()=>mql.removeEventListener('change',onChange)
  }, [])
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas?.getContext('2d')
    if(!canvas||!ctx)return
    let width=0,height=0,raf=0
    let frame=0
    const fit=()=>{
      const rect=canvas.getBoundingClientRect()
      width=Math.max(1,rect.width);height=Math.max(1,rect.height)
      const dpr=Math.min(window.devicePixelRatio||1,2)
      canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr)
      ctx.setTransform(dpr,0,0,dpr,0,0)
      draw(frame)
    }
    const draw=(tick:number)=>{
      ctx.clearRect(0,0,width,height)
      ctx.fillStyle='#17191a';ctx.fillRect(0,0,width,height)
      const t=tick*.011
      const px=point.current.x*width,py=point.current.y*height
      if(mode==='mesh') {
        const cols=27,rows=18
        const pos=(i:number,j:number)=>{
          const x=(i/(cols-1))*width,y=(j/(rows-1))*height
          const dx=x-px,dy=y-py
          const influence=point.current.inside?Math.exp(-(dx*dx+dy*dy)/(Math.pow(width*.23,2))):0
          const z=Math.sin(i*.48+j*.35+t)*8+Math.cos(j*.65-i*.17+t*.55)*5
          return {x:x+Math.sin(j*.41+t)*8+dx*influence*.08,y:y+z+dy*influence*.12}
        }
        ctx.lineWidth=.75
        for(let j=0;j<rows;j++){
          ctx.beginPath()
          for(let i=0;i<cols;i++){const p=pos(i,j);if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y)}
          ctx.strokeStyle=j%5===0?'rgba(221,255,92,.68)':'rgba(211,218,208,.23)';ctx.stroke()
        }
        for(let i=0;i<cols;i+=2){
          ctx.beginPath()
          for(let j=0;j<rows;j++){const p=pos(i,j);if(j===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y)}
          ctx.strokeStyle='rgba(195,205,196,.17)';ctx.stroke()
        }
        for(let j=0;j<rows;j+=3)for(let i=0;i<cols;i+=3){const p=pos(i,j);ctx.beginPath();ctx.arc(p.x,p.y,1.55,0,Math.PI*2);ctx.fillStyle='#ddff5c';ctx.fill()}
      } else if(mode==='wave') {
        for(let j=0;j<17;j++){
          ctx.beginPath()
          for(let x=0;x<=width;x+=4) {
            const influence=point.current.inside ? (point.current.x-.5)*65 : 0
            const phase=(x/width)*Math.PI*3.8+t+j*.27
            const y=height*.5+(j-8)*14+Math.sin(phase)*((height*.12)+influence)+Math.sin(phase*.47+j)*14
            if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)
          }
          ctx.lineWidth=j===8?2:1
          ctx.strokeStyle=j===8?'#ddff5c':`rgba(226,231,225,${.15+j*.014})`
          ctx.stroke()
        }
      } else {
        const n=130
        const points=Array.from({length:n},(_,i)=>{
          const a=i*2.39996+t*.12,r=Math.sqrt(i/n)
          const x=width/2+Math.cos(a)*r*width*.44
          const y=height/2+Math.sin(a)*r*height*.45
          const d=Math.hypot(x-px,y-py)
          const pull=point.current.inside?Math.max(0,1-d/250)*20:0
          return {x:x+Math.cos(a+t)*pull,y:y+Math.sin(a+t)*pull}
        })
        ctx.lineWidth=.75
        for(let i=0;i<n;i++){
          for(let j=i+1;j<n;j++){
            const dx=points[i].x-points[j].x,dy=points[i].y-points[j].y
            const d2=dx*dx+dy*dy
            if(d2>3400||d2<40)continue
            ctx.beginPath();ctx.moveTo(points[i].x,points[i].y);ctx.lineTo(points[j].x,points[j].y)
            ctx.strokeStyle=`rgba(215,226,210,${.21*(1-d2/3400)})`;ctx.stroke()
          }
        }
        points.forEach((p,i)=>{
          ctx.beginPath();ctx.arc(p.x,p.y,i%9===0?2.7:1.6,0,Math.PI*2)
          ctx.fillStyle=i%9===0?'#ddff5c':'#e2ece7';ctx.fill()
        })
      }
    }
    const loop=()=>{frame++;draw(frame);raf=requestAnimationFrame(loop)}
    const resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(fit):null
    resizeObserver?.observe(canvas)
    window.addEventListener('resize',fit)
    fit()
    if(playing&&!reduced) raf=requestAnimationFrame(loop)
    return ()=>{cancelAnimationFrame(raf);resizeObserver?.disconnect();window.removeEventListener('resize',fit)}
  },[mode,playing,reduced])
  return <section className="cc-lab" id="laboratoire" aria-labelledby="lab-title">
    <div className="cc-lab-head" data-enter>
      <span className="cc-index"><span className="cc-mark"/> 01 / EXPÉRIENCE INTERACTIVE</span>
      <h2 id="lab-title">Le code est aussi<br/><em>une matière à explorer.</em></h2>
      <p>Un petit système génératif. Trois comportements, le même principe : des règles simples produisent des formes complexes. Déplace le pointeur pour perturber le champ.</p>
    </div>
    <div className="cc-lab-stage" data-enter>
      <div className="cc-lab-screen"
        onPointerMove={e=>{const rect=e.currentTarget.getBoundingClientRect();point.current={x:(e.clientX-rect.left)/rect.width,y:(e.clientY-rect.top)/rect.height,inside:true}}}
        onPointerLeave={()=>{point.current.inside=false}}>
        <canvas ref={ref} role="img" aria-label="Visualisation générative de lignes ou de particules réagissant au déplacement du pointeur"/>
        <span className="cc-canvas-corner cc-canvas-top">SYSTEM / EXP–001</span>
        <span className="cc-canvas-corner cc-canvas-bottom">REAL-TIME · CANVAS 2D</span>
        <div className="cc-canvas-cross" aria-hidden="true"><Glyph name="cross" size={20}/></div>
      </div>
      <div className="cc-lab-console">
        <div><span className="cc-micro">MODÈLE ACTIF</span><strong>{mode==='mesh'?'01 / Champ':mode==='wave'?'02 / Onde':'03 / Réseau'}</strong></div>
        <div className="cc-mode-switch" role="group" aria-label="Choisir la visualisation">
          <button type="button" aria-pressed={mode==='mesh'} onClick={()=>setMode('mesh')}>Champ</button>
          <button type="button" aria-pressed={mode==='wave'} onClick={()=>setMode('wave')}>Onde</button>
          <button type="button" aria-pressed={mode==='particles'} onClick={()=>setMode('particles')}>Réseau</button>
        </div>
        <button type="button" className="cc-pause" onClick={()=>setPlaying(p=>!p)}
          aria-label={playing?'Mettre en pause l’animation':'Reprendre l’animation'}>
          <Glyph name={playing?'pause':'play'} size={18}/><span>{playing?'Pause':'Lecture'}</span>
        </button>
      </div>
    </div>
  </section>
}
function ProjectLinks({project}:{project:Project}) {
  return <div className="cc-project-links">
    {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer">Code source <Glyph name="arrow" size={16}/></a>}
    {project.evidence && <a href={project.evidence.href} target="_blank" rel="noreferrer">{project.evidence.label} <Glyph name="arrow" size={16}/></a>}
    {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer">Voir le projet <Glyph name="arrow" size={16}/></a>}
  </div>
}
function Feature({id,n}:{id:string;n:number}) {
  const project=selectProject(id),story=projectStories[id],picture=media[id]
  const isCapture=!!picture.real
  return <article className={`cc-feature cc-feature-${id}`} id={`projet/${id}`}>
    <div className="cc-feature-top" data-enter>
      <div className="cc-feature-number">{String(n).padStart(2,'0')}<span>/ 05</span></div>
      <div className="cc-feature-title"><span className="cc-micro">{project.context} · {project.period}</span><h3>{alias[id]}</h3><p>{story.subtitle}</p></div>
      <span className="cc-feature-arrow" aria-hidden="true">↘</span>
    </div>
    <figure className={`cc-feature-media ${isCapture?'cc-is-capture':''}`} data-enter>
      <img src={picture.src} alt={picture.alt} loading="lazy" decoding="async"/>
      <figcaption>{isCapture?'Capture réelle du prototype · données de démonstration':'Illustration générée · distincte des résultats réels du projet'}</figcaption>
    </figure>
    <div className="cc-feature-body" data-enter>
      <div className="cc-feature-side">
        <span className="cc-micro">PROCESS / {String(n).padStart(2,'0')}</span>
        <h4>Du problème<br/>à la <em>preuve.</em></h4>
        <div className="cc-tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
        <ProjectLinks project={project}/>
      </div>
      <div className="cc-feature-story">
        {story.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
        <div className="cc-outcome">
          <div><span className="cc-micro">APPROCHE</span><p>{story.method}</p></div>
          <div><span className="cc-micro">RÉSULTAT</span><p>{story.result}</p></div>
        </div>
        {story.note && <p className="cc-disclaimer">{story.note}</p>}
      </div>
    </div>
    {id==='risksim' && <figure className="cc-second-proof" data-enter><img src="/projects/risksim-results.png" loading="lazy" alt="Capture réelle des résultats de simulation RiskSim : distribution, percentiles et analyse de sensibilité"/><figcaption>RiskSim / résultats de simulation sur un scénario de démonstration.</figcaption></figure>}
    {id==='01' && <figure className="cc-second-proof cc-shap" data-enter><img src="/projects/shap_summary_bar.png" loading="lazy" alt="Graphique SHAP montrant l’importance globale des variables du modèle PediAppend"/><figcaption>Importance des variables (SHAP) · une analyse du modèle, pas un diagnostic.</figcaption></figure>}
  </article>
}
function ArchiveCard({id,n}:{id:string;n:number}) {
  const p=selectProject(id),story=projectStories[id],picture=media[id]
  return <article className="cc-archive-card" id={`projet/${id}`} data-enter>
    <div className="cc-archive-media"><img src={picture.src} alt={picture.alt} loading="lazy" decoding="async"/></div>
    <div className="cc-archive-head"><span className="cc-micro">{String(n).padStart(2,'0')} / {p.period}</span><span aria-hidden="true">↗</span></div>
    <h3>{alias[id]}</h3><p className="cc-archive-subtitle">{story.subtitle}</p>
    <p className="cc-archive-summary">{story.paragraphs[0]}</p>
    <div className="cc-archive-result"><span className="cc-micro">RÉSULTAT</span><p>{story.result}</p></div>
    <div className="cc-tags">{p.stack.slice(0,4).map(tag=><span key={tag}>{tag}</span>)}</div>
    <ProjectLinks project={p}/>
    <span className="cc-archive-origin">{picture.real?'Capture réelle':'Illustration générée'}</span>
  </article>
}
function App() {
  const [active,setActive]=useState('accueil')
  const [progress,setProgress]=useState(0)
  useEntrance()
  useEffect(()=>{
    const sections=[...document.querySelectorAll<HTMLElement>('section[id]')]
    const onScroll=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight)
      setProgress(Math.min(1,Math.max(0,window.scrollY/max)))
      let next='accueil'
      for(const section of sections) if(section.getBoundingClientRect().top<window.innerHeight*.38)next=section.id
      setActive(current=>current===next?current:next)
    }
    onScroll();window.addEventListener('scroll',onScroll,{passive:true})
    window.addEventListener('resize',onScroll)
    return ()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)}
  },[])
  return <div className="cc-app">
    <a className="cc-skip" href="#travaux">Aller aux projets</a>
    <div className="cc-progress" aria-hidden="true" style={{transform:`scaleX(${progress})`}}/>
    <header className="cc-header">
      <a className="cc-brand" href="#accueil" aria-label="Rudolf Hounlete, retour à l’accueil"><span>R<span className="cc-brand-dot">•</span>H</span><small>INDEX / 26</small></a>
      <nav className="cc-nav" aria-label="Navigation principale">
        <a href="#travaux" aria-current={active==='travaux'?'page':undefined}>Travaux</a>
        <a href="#laboratoire" aria-current={active==='laboratoire'?'page':undefined}>Laboratoire</a>
        <a href="#parcours" aria-current={active==='parcours'?'page':undefined}>Parcours</a>
      </nav>
      <a className="cc-nav-contact" href="#contact">Contact <Glyph name="arrow" size={17}/></a>
    </header>
    <main>
      <section className="cc-hero" id="accueil" aria-labelledby="hero-name">
        <div className="cc-hero-main">
          <div className="cc-hero-copy">
            <div className="cc-hero-topline"><span className="cc-dot"/>PORTFOLIO PERSONNEL · CASABLANCA / 2026</div>
            <h1 id="hero-name">Rudolf<br/><span>Hounlete<span className="cc-terminal-dot">.</span></span></h1>
            <p className="cc-hero-statement">Des idées aux systèmes.<br/><em>Du code au réel.</em></p>
            <p className="cc-hero-description">Élève ingénieur à Centrale Casablanca. Logiciels, machine learning et simulation — conçus pour être testés, compris et utilisés.</p>
            <div className="cc-hero-actions"><a className="cc-action-main" href="#travaux">Explorer les projets <Glyph name="arrow"/></a><a className="cc-action-text" href="#laboratoire">Voir le laboratoire <Glyph name="down" size={17}/></a></div>
          </div>
          <div className="cc-hero-photo">
            <div className="cc-photo-corner cc-photo-corner-a" aria-hidden="true"/>
            <img src="/portrait-rudolf.webp" alt="Portrait original de Rudolf Hounlete" fetchPriority="high"/>
            <div className="cc-photo-corner cc-photo-corner-b" aria-hidden="true"/>
          </div>
        </div>
        <div className="cc-hero-bottom"><span>01 — INGÉNIERIE</span><span>02 — MACHINE LEARNING</span><span>03 — CRÉATION LOGICIELLE</span><a href="#laboratoire" aria-label="Descendre vers le laboratoire"><Glyph name="down" size={20}/></a></div>
      </section>
      <GenerativeLab/>
      <section className="cc-work" id="travaux" aria-labelledby="work-title">
        <div className="cc-section-intro" data-enter><div className="cc-idx"><span className="cc-mark"/> 02 / TRAVAUX CHOISIS</div><h2 id="work-title">Construire.<br/><em>Et montrer comment.</em></h2><p>Du modèle à l’interface, de l’expérience au résultat. Pas seulement des images : les choix techniques, les limites et les preuves sont présentés avec chaque projet.</p></div>
        <div className="cc-features">{focusIds.map((id,i)=><Feature id={id} n={i+1} key={id}/>)}</div>
      </section>
      <section className="cc-archive" id="autres" aria-labelledby="archive-title">
        <div className="cc-archive-intro" data-enter><span className="cc-index">03 / AUTRES EXPÉRIENCES</span><h2 id="archive-title">L’atelier ne<br/><em>s’arrête pas là.</em></h2><p>Six autres expériences en vision, audio, raisonnement, finance et physique.</p></div>
        <div className="cc-archive-grid">{archiveIds.map((id,i)=><ArchiveCard id={id} n={i+6} key={id}/>)}</div>
      </section>
      <section className="cc-proofwall" id="distinctions" aria-labelledby="proof-title">
        <div className="cc-proof-intro" data-enter><span className="cc-index">04 / COMPÉTITIONS</span><h2 id="proof-title">Les résultats<br/>se <em>mesurent.</em></h2><p>Des problèmes imposés, une validation à défendre, des classements publics quand ils sont disponibles.</p></div>
        <div className="cc-proof-list">
          {competitions.map((c,i)=><a key={c.projectId} data-enter className="cc-proof-row" href={c.href || `#projet/${c.projectId}`} target={c.href?'_blank':undefined} rel={c.href?'noreferrer':undefined}>
            <span className="cc-proof-index">{String(i+1).padStart(2,'0')}</span><span className="cc-proof-name">{c.name}<small>{c.platform}</small></span><span className="cc-proof-result">{c.medal?'● BRONZE':c.result}</span><Glyph name="arrow" size={21}/>
          </a>)}
        </div>
      </section>
      <section className="cc-bio" id="parcours" aria-labelledby="bio-title">
        <div className="cc-bio-head" data-enter><span className="cc-index">05 / PARCOURS</span><h2 id="bio-title">Curieux par nature.<br/><em>Ingénieur par formation.</em></h2><p>{profile.about[0]}</p><p>{profile.about[1]}</p></div>
        <div className="cc-bio-grid">
          <div className="cc-education" data-enter><h3>Trajectoire</h3>{education.map((e,i)=><div className="cc-ed-row" key={i}><span>{e.period||'Formation scientifique'}</span><div><strong>{e.school}</strong><p>{e.detail}</p></div><small>{e.location}</small></div>)}</div>
          <div className="cc-skills" data-enter><h3>Boîte à outils</h3>{skills.map((group,i)=><div className="cc-skill-row" key={group.label}><span>0{i+1}</span><div><h4>{group.label}</h4><p>{group.items.join(' · ')}</p></div></div>)}</div>
        </div>
      </section>
      <section className="cc-contact" id="contact" aria-labelledby="contact-title">
        <div className="cc-contact-heading" data-enter><span className="cc-index">06 / CONTACT</span><h2 id="contact-title">Une idée en tête ?<br/><em>Écrivons la suite.</em></h2></div>
        <a className="cc-mail-link" href={`mailto:${contact.email}`}>{contact.email}<Glyph name="arrow" size={40}/></a>
        <div className="cc-contact-end"><p>Casablanca, Maroc · Originaire du Bénin</p><div><a href={contact.github} target="_blank" rel="noreferrer">GitHub <Glyph name="arrow" size={15}/></a><a href={contact.cv??'/CV_Rudolf_HOUNLETE.pdf'} download>CV <Glyph name="down" size={16}/></a></div></div>
      </section>
    </main>
    <footer className="cc-footer"><a href="#accueil">RH<span>°</span></a><span>© 2026 Rudolf Hounlete</span><button type="button" onClick={()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Retour en haut <Glyph name="up" size={15}/></button></footer>
  </div>
}
export default App
