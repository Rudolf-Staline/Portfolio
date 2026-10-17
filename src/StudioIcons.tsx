import { useEffect, useRef } from 'react'

export type StudioIconName =
  | 'code' | 'sparkles' | 'arrow-up-right' | 'arrow-right' | 'arrow-down'
  | 'arrow-up' | 'flask' | 'orbit' | 'layers' | 'award' | 'graduation'
  | 'briefcase' | 'database' | 'terminal' | 'bar-chart' | 'line-chart'
  | 'shield' | 'heart-pulse' | 'brain' | 'satellite' | 'audio-lines'
  | 'network' | 'grid' | 'traffic' | 'coins' | 'cpu' | 'settings'
  | 'globe' | 'map-pin' | 'mail' | 'github' | 'download' | 'external'
  | 'clock' | 'check' | 'play' | 'pause' | 'crosshair' | 'file-code'
  | 'activity' | 'mouse' | 'circle-dot' | 'scan'

const shapes: Record<StudioIconName, React.ReactNode> = {
  code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"/></>,
  sparkles: <><path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z"/><path d="m20 18 .6 2.4L23 21l-2.4.6L20 24l-.6-2.4L17 21l2.4-.6L20 18Z"/></>,
  'arrow-up-right': <><path d="M6 18 18 6M7 6h11v11"/></>,
  'arrow-right': <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
  'arrow-down': <><path d="M12 3v18m-7-7 7 7 7-7"/></>,
  'arrow-up': <><path d="M12 21V3m-7 7 7-7 7 7"/></>,
  flask: <><path d="M9 3h6m-5 0v7l-6 9c-.5 1 .2 2 1.4 2h13.2c1.2 0 1.9-1 1.4-2l-6-9V3M7 16h10"/></>,
  orbit: <><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(35 12 12)"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
  award: <><circle cx="12" cy="8" r="6"/><path d="m8 13-2.5 9L12 19l6.5 3L16 13m-6-5 2 2 2-3"/></>,
  graduation: <><path d="m2 10 10-5 10 5-10 5-10-5ZM6 13v5c4 3 8 3 12 0v-5m4-3v8"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3m-12 7c5 4 13 4 18 0M11 15h2"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
  terminal: <><rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="m6 9 3 3-3 3m6 0h5"/></>,
  'bar-chart': <><path d="M4 20V4M4 20h17M8 17v-5m5 5V8m5 9V5"/></>,
  'line-chart': <><path d="M3 20V4m0 16h18m-16-5 5-6 4 3 6-8"/></>,
  shield: <><path d="m12 2 8 4v6c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-4Z"/><path d="m8.5 12 2.4 2.4 4.8-4.8"/></>,
  'heart-pulse': <><path d="M20.5 8c0 5-8.5 11.5-8.5 11.5S3.5 13 3.5 8a4.7 4.7 0 0 1 8.5-2.2A4.7 4.7 0 0 1 20.5 8Z"/><path d="M5 12h4l2-3 2 6 2-3h4"/></>,
  brain: <><path d="M12 6V4c0-3-5-3-6-1a4 4 0 0 0-2 5c-3 2-2 6 0 7-1 4 2 7 5 6 2 1 3 0 3-2V6Zm0-2c0-3 5-3 6-1a4 4 0 0 1 2 5c3 2 2 6 0 7 1 4-2 7-5 6-2 1-3 0-3-2"/></>,
  satellite: <><rect x="9" y="9" width="6" height="6" rx="1" transform="rotate(-45 12 12)"/><path d="m7 9-4-4 2-2 4 4m6 8 4 4-2 2-4-4m4-12a7 7 0 0 1 4 4M4 17a7 7 0 0 1 4 4"/></>,
  'audio-lines': <><path d="M3 10v4M7 6v12M11 3v18M15 8v8M19 5v14M23 10v4"/></>,
  network: <><circle cx="5" cy="5" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="19" r="2"/><path d="m7 5 10 1M6 7l5 10m7-9-5 9"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="m15 18 2 2 4-5"/></>,
  traffic: <><rect x="8" y="2" width="8" height="20" rx="2"/><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></>,
  coins: <><ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v8c0 4 12 4 12 0V7m0 4c7-2 9 2 6 4m-6 0c7-2 9 2 6 4m-6 0c7-2 9 2 6 4"/></>,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-17-7 2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 4.5-4 13.5 0 18M12 3c4 4.5 4 13.5 0 18"/></>,
  'map-pin': <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  github: <><path d="M9 20c-4 1-4-2-6-2m12 3v-3a3 3 0 0 0-1-2c4-.5 6-2.4 6-6A4.8 4.8 0 0 0 19 7a5 5 0 0 0 0-3s-1-.4-3 1a12 12 0 0 0-8 0C6 3.6 5 4 5 4a5 5 0 0 0 0 3 4.8 4.8 0 0 0-1 3c0 3.6 2 5.5 6 6a3 3 0 0 0-1 2v3"/></>,
  download: <><path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/></>,
  external: <><path d="M13 4h7v7m0-7L10 14M19 13v6H5V5h6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  play: <path d="m8 5 11 7-11 7V5Z"/>,
  pause: <><path d="M8 5v14M16 5v14"/></>,
  crosshair: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 1v5m0 12v5M1 12h5m12 0h5"/></>,
  'file-code': <><path d="M6 2h8l5 5v14H6zM14 2v5h5M11 12l-2 2 2 2m3-4 2 2-2 2"/></>,
  activity: <><path d="M2 12h5l3-7 4 14 3-7h5"/></>,
  mouse: <><rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 6v4"/></>,
  'circle-dot': <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/></>,
  scan: <><path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5m-1-3h18"/></>,
}

export function StudioIcon({name,size=21,className=''}:{name:StudioIconName;size?:number;className?:string}){
  return <svg className={className} aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{shapes[name]}</svg>
}

export const projectIcons: Record<string, StudioIconName> = {
  risksim:'orbit', 'financial-stress':'line-chart',geoai:'satellite','01':'heart-pulse',
  automl:'terminal',neurogolf:'grid',waxal:'audio-lines',credit:'shield',
  '02':'traffic','03':'bar-chart','05':'activity',
}

export function SideRail({active}:{active:string}){
  const links: Array<{id:string;label:string;icon:StudioIconName}> = [
    {id:'accueil',label:'Accueil',icon:'sparkles'},
    {id:'travaux',label:'Projets',icon:'layers'},
    {id:'laboratoire',label:'Laboratoire',icon:'flask'},
    {id:'distinctions',label:'Distinctions',icon:'award'},
    {id:'parcours',label:'Parcours',icon:'graduation'},
    {id:'contact',label:'Contact',icon:'mail'},
  ]
  return <nav className="sd-rail" aria-label="Navigation rapide">
    {links.map(link=><a key={link.id} href={`#${link.id}`} className={active===link.id?'is-active':''} aria-label={link.label} aria-current={active===link.id?'location':undefined}>
      <StudioIcon name={link.icon} size={17}/><span>{link.label}</span>
    </a>)}
  </nav>
}

/** Pointer-generated lighting, throttled to a single frame and disabled with reduced motion. */
export function StudioMotion(){
  const frame=useRef(0)
  useEffect(()=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)')
    if(reduced.matches||!matchMedia('(pointer:fine)').matches)return
    const items=[...document.querySelectorAll<HTMLElement>('.cc-feature-top,.cc-archive-card,.cc-skill-row,.cc-ed-row,.sd-icon-cell')]
    const detach=items.map(el=>{
      const onMove=(event:PointerEvent)=>{
        if(frame.current) cancelAnimationFrame(frame.current)
        frame.current=requestAnimationFrame(()=>{
          const rect=el.getBoundingClientRect()
          el.style.setProperty('--mx',`${event.clientX-rect.left}px`)
          el.style.setProperty('--my',`${event.clientY-rect.top}px`)
          frame.current=0
        })
      }
      const onLeave=()=>{el.style.removeProperty('--mx');el.style.removeProperty('--my')}
      el.addEventListener('pointermove',onMove,{passive:true})
      el.addEventListener('pointerleave',onLeave)
      return ()=>{el.removeEventListener('pointermove',onMove);el.removeEventListener('pointerleave',onLeave)}
    })
    return ()=>{cancelAnimationFrame(frame.current);detach.forEach(fn=>fn())}
  },[])
  return null
}
