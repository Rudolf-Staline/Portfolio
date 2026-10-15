import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { CinematicCanvas, type CinemaKind } from './CinematicCanvas'
const scenes: Record<CinemaKind,{title:string[];eyebrow:string;detail:string;image?:string}> = {
  automl:{title:['Autonomous','AutoML.'],eyebrow:'01 / MACHINE LEARNING',detail:'CSV → modèles → rapport',image:'/cinema/automl-photo.webp'},
  geoai:{title:['GeoAI','Aquaculture.'],eyebrow:'OBSERVATION DE LA TERRE',detail:'Sentinel-1 / Sentinel-2',image:'/cinema/geoai-aerial-photo.webp'},
  traffic:{title:['Trafic','adaptatif.'],eyebrow:'VISION & SYSTÈMES EMBARQUÉS',detail:'YOLOv8 / Raspberry Pi',image:'/cinema/traffic-night-photo.webp'},
  audio:{title:['Les voix','de WAXAL.'],eyebrow:'RECONNAISSANCE VOCALE',detail:'Lingala / Luganda / Shona',image:'/cinema/waxal-photo.webp'},
  soliton:{title:['L’onde','se propage.'],eyebrow:'PHYSIQUE EXPÉRIMENTALE',detail:'Ligne non linéaire / 20 cellules',image:'/cinema/soliton-photo.webp'},
  risk:{title:['Risk','Sim.'],eyebrow:'SIMULATION PROBABILISTE',detail:'Monte Carlo / Python / React',image:'/cinema/risksim-photo.webp'},
  forex:{title:['Explorer','les marchés.'],eyebrow:'ANALYSE QUANTITATIVE',detail:'Données / signaux / backtesting',image:'/cinema/forex-photo.webp'},
  financial:{title:['Stress','financier.'],eyebrow:'DONNÉES TRANSACTIONNELLES',detail:'Six mois de transactions / LightGBM',image:'/cinema/financial-photo.webp'},
  neurogolf:{title:['NeuroGolf','Championship.'],eyebrow:'KAGGLE · RÉSEAUX COMPACTS',detail:'Transformations de grilles / ARC-AGI',image:'/cinema/neurogolf-photo.webp'},
  credit:{title:['African','Credit Scoring.'],eyebrow:'ZINDI · RISQUE DE CRÉDIT',detail:'Modélisation du risque de crédit',image:'/cinema/credit-photo.webp'},
  clinical:{title:['Pedi','Append.'],eyebrow:'MACHINE LEARNING EXPLICABLE',detail:'Classification / SHAP / Flask',image:'/cinema/clinical-photo.webp'},
}
export function ProjectVisual({kind}:{kind:CinemaKind}) {
  const scene=scenes[kind]
  const [visible,setVisible]=useState(false)
  const [paused,setPaused]=useState(false)
  const [close,setClose]=useState(false)
  const [reduce,setReduce]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)
  const figure=useRef<HTMLElement>(null)
  const moveFrame=useRef(0)
  useEffect(()=>{
    const node=figure.current;if(!node)return
    const preference=matchMedia('(prefers-reduced-motion: reduce)')
    const change=()=>setReduce(preference.matches)
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.08})
    observer.observe(node);preference.addEventListener('change',change)
    return()=>{observer.disconnect();preference.removeEventListener('change',change);cancelAnimationFrame(moveFrame.current)}
  },[])
  const running=visible&&!paused&&!reduce
  return <figure ref={figure} className={`cinema-scene cinema-${kind}${running?' cinema-running':''}${close?' camera-close':''}`} style={{'--camera-scale':close?1.18:1} as CSSProperties} onPointerMove={event=>{
    if(reduce||paused||event.pointerType!=='mouse')return
    const node=event.currentTarget,rect=node.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5
    cancelAnimationFrame(moveFrame.current);moveFrame.current=requestAnimationFrame(()=>{node.style.setProperty('--camera-x',`${-x*16}px`);node.style.setProperty('--camera-y',`${-y*12}px`)})
  }} onPointerLeave={event=>{cancelAnimationFrame(moveFrame.current);event.currentTarget.style.setProperty('--camera-x','0px');event.currentTarget.style.setProperty('--camera-y','0px')}} aria-label={`Scène d’illustration : ${scene.title.join(' ')}`}>
    <div className="cinema-camera">{scene.image?<img className="cinema-landscape" src={scene.image} alt="" loading="lazy" decoding="async" width="1672" height="941"/>:<CinematicCanvas kind={kind} running={running} close={close}/>}</div>
    <div className="cinema-vignette" aria-hidden="true"/><div className="cinema-grain" aria-hidden="true"/>
    <div className="cinema-topline"><span>{scene.eyebrow}</span><span className="cinema-format">R / H · PORTFOLIO</span></div>
    <div className="cinema-caption"><div className="cinema-title" aria-hidden="true">{scene.title.map(line=><span key={line}>{line}</span>)}</div><p>{scene.detail}</p></div>
    <div className="cinema-bottomline"><figcaption>{scene.image?'Illustration créée par IA':'Animation d’illustration'}</figcaption><div className="cinema-controls"><button type="button" aria-pressed={close} onClick={()=>setClose(!close)}>{close?'Vue large':'Vue rapprochée'}<span aria-hidden="true"> ↗</span></button>{!reduce&&<button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={`${paused?'Reprendre':'Mettre en pause'} la scène ${scene.title.join(' ')}`}>{paused?'Lecture':'Pause'} <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span></button>}</div></div>
    <div className="cinema-timeline" aria-hidden="true"><i/></div>
  </figure>
}
export const projectVisualKind: Record<string,CinemaKind>={automl:'automl',geoai:'geoai',waxal:'audio',neurogolf:'neurogolf',credit:'credit',risksim:'risk','financial-stress':'financial','01':'clinical','02':'traffic','03':'forex','05':'soliton'}
