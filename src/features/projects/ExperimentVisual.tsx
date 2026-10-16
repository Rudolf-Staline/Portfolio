import { useEffect, useId, useRef, useState } from 'react'

const labels: Record<string, [string, string]> = {
  neurogolf: ['Raisonnement visuel', 'Exemples → règle → transformation'],
  geoai: ['Observation de la Terre', 'Sentinel-1 / Sentinel-2 · fenêtres temporelles'],
  waxal: ['Reconnaissance vocale', 'Audio → représentation → transcription'],
  automl: ['Entraînement automatisé', 'CSV → validation → recherche → rapport'],
  'financial-stress': ['Données transactionnelles', 'Six mois d’observations → variables → modèle'],
  credit: ['Risque de crédit', 'Données tabulaires → estimation du risque'],
  '02': ['Vision & commande', 'Caméra → détection → phases des feux'],
  '03': ['Analyse quantitative', 'Données passées → signal → validation'],
  '05': ['Propagation non linéaire', 'Une impulsion le long d’une ligne de cellules'],
}
const gridPattern = [0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]
function Pattern({x, flip=false}:{x:number;flip?:boolean}) {
  return <g transform={`translate(${x} 115)`}>{gridPattern.map((value,i)=><rect key={i} x={(flip?4-i%5:i%5)*30} y={Math.floor(i/5)*30} width="27" height="27" rx="2" fill={value?'var(--lab-accent)':'var(--lab-tile)'}/>)}</g>
}
export function ExperimentVisual({id, compact=false}:{id:string;compact?:boolean}) {
  const patternId=useId()
  const [paused,setPaused]=useState(false)
  const [visible,setVisible]=useState(false)
  const figure=useRef<HTMLElement>(null)
  const animated=['geoai','waxal','02','05','automl'].includes(id)
  useEffect(()=>{
    if(!figure.current||compact)return
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0})
    observer.observe(figure.current)
    return()=>observer.disconnect()
  },[compact])
  const [title,detail]=labels[id]??labels.automl
  return <figure ref={figure} className={`experiment-visual visual-${id}${visible?' is-visible':''}${paused?' is-paused':''}`}>
    <div className="experiment-visual-top"><span>{title}</span><span>Schéma de principe</span></div>
    <svg viewBox="0 0 900 360" role="img" aria-label={`${title} : ${detail}. Illustration du fonctionnement, sans résultats mesurés.`}>
      <defs><pattern id={patternId} width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".14"/></pattern></defs>
      <rect width="900" height="360" fill={`url(#${patternId})`}/>
      {id==='neurogolf'?<><Pattern x={155}/><path d="M375 190h150m-15-10 15 10-15 10" className="diagram-line"/><Pattern x={600} flip/><text x="225" y="310">ENTRÉE</text><text x="675" y="310">TRANSFORMATION</text></>:
      id==='geoai'?<>{Array.from({length:12},(_,i)=><g key={i} transform={`translate(${70+i*65} 100)`}><rect width="49" height="130" rx="3" fill={i%4===2?'none':'var(--lab-tile)'} stroke="var(--lab-line)" strokeDasharray={i%4===2?'5 5':undefined}/>{i%4!==2&&<>{Array.from({length:5},(_,j)=><rect key={j} x={8+(j%2)*17} y={13+Math.floor(j/2)*35} width="13" height="27" fill={j%2?'var(--lab-accent)':'var(--lab-ink)'} opacity={j%2?.65:.18}/>)}</>}<text x="24" y="162">{String(i+1).padStart(2,'0')}</text></g>)}<path d="M66 280h775" className="diagram-line"/><rect className="temporal-window" x="70" y="85" width="250" height="165" rx="5" fill="none" stroke="var(--lab-accent)" strokeWidth="2"/></>:
      id==='waxal'?<>{Array.from({length:70},(_,i)=><rect className="wave-sample" key={i} x={65+i*11} y={180-(15+(i*17%70))} width="4" height={30+(i*17%70)*2} rx="2" fill={i%5?'var(--lab-ink)':'var(--lab-accent)'} style={{animationDelay:`${i*-.06}s`}}/>)}<text x="220" y="315">LINGALA</text><text x="450" y="315">LUGANDA</text><text x="680" y="315">SHONA</text></>:
      id==='02'?<><path d="M375 40h150v280H375zM110 115h680v130H110z" fill="var(--lab-tile)"/><path d="M450 40v280M110 180h680" stroke="var(--lab-line)" strokeDasharray="10 12"/>{[[190,140],[280,140],[580,215],[660,215],[405,70],[490,270]].map(([x,y],i)=><g key={i}><rect x={x} y={y} width="43" height="20" rx="3" fill="var(--lab-ink)"/><rect className="detection-box" x={x-5} y={y-5} width="53" height="30" fill="none" stroke="var(--lab-accent)" strokeWidth="2"/></g>)}<circle cx="350" cy="100" r="8" fill="var(--lab-accent)"/><circle cx="550" cy="260" r="8" fill="#487c64"/></>:
      id==='05'?<><path d="M55 235h790" className="diagram-line"/>{Array.from({length:20},(_,i)=><g key={i}><path d={`M${70+i*39} 225v20m7-20v20`} stroke="var(--lab-ink)" strokeWidth="2"/><circle cx={73+i*39} cy="235" r="2" fill="var(--lab-accent)"/></g>)}<g className="pulse-travel"><path d="M80 175h180c55 0 30-110 80-110s25 110 80 110h370" fill="none" stroke="var(--lab-accent)" strokeWidth="3"/></g><text x="450" y="300">20 CELLULES · IMPULSION ILLUSTRATIVE</text></>:
      id==='automl'?<>{['CSV','FOLDS','OPTUNA','PIPELINE','HTML'].map((label,i)=><g key={label}><rect x={55+i*165} y="130" width="130" height="90" rx="4" fill={i===2?'var(--lab-accent)':'var(--lab-tile)'} stroke="var(--lab-line)"/><text x={120+i*165} y="180" style={{fill:i===2?'#fff':undefined}}>{label}</text>{i<4&&<path d={`M${188+i*165} 175h28`} className="diagram-line flow-line"/>}</g>)}<path d="M285 225v50h330v-50" fill="none" stroke="var(--lab-line)" strokeDasharray="5 5"/><text x="450" y="308">ESSAIS ENREGISTRÉS · REPRISE DES EXPÉRIENCES</text></>:
      <>{Array.from({length:id==='financial-stress'?6:24},(_,i)=>{const n=id==='financial-stress'?6:24;const w=700/n;const h=40+(i*37%130);return <rect key={i} className="data-column" x={95+i*w} y={260-h} width={w*.55} height={h} fill={i%3===0?'var(--lab-accent)':'var(--lab-tile)'} style={{animationDelay:`${i*-.15}s`}}/>})}<path d="M75 60v200h750" className="diagram-line"/><path d="M100 210 180 190 260 200 340 125 420 145 500 100 580 135 660 90 790 110" fill="none" stroke="var(--lab-ink)" strokeWidth="2" strokeDasharray={id==='03'?'6 5':undefined}/><text x="450" y="315">{id==='financial-stress'?'M01      M02      M03      M04      M05      M06':id==='credit'?'VARIABLES → MODÈLE → SCORE':'PASSÉ                     SIGNAL                     ÉVALUATION'}</text></>}
    </svg>
    {!compact&&<figcaption><span>{detail}<small>Illustration du fonctionnement · aucune mesure ni prédiction réelle</small></span>{animated&&<button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'Reprendre':'Pause'} <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span></button>}</figcaption>}
  </figure>
}
