import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

type Kind = 'automl' | 'geoai' | 'traffic' | 'audio' | 'forex' | 'soliton' | 'risk' | 'financial'
const titles: Record<Kind, string> = {
  automl: 'Du CSV au rapport', geoai: 'Une année partiellement observée', traffic: 'Observer, décider, commander',
  audio: 'Du signal aux mots', forex: 'Le parcours d’une observation', soliton: 'Une impulsion le long de la ligne',
  risk: 'Des hypothèses à la distribution', financial: 'Six mois de transactions',
}
const steps = [
  ['01', 'Examiner', 'CSV → profil des données', 'Le profilage identifie la cible, le type de tâche et les colonnes suspectes avant la recherche de modèles.'],
  ['02', 'Évaluer', 'Folds → pipelines → Optuna', 'Chaque pipeline ajuste ses prétraitements dans les folds. Les essais sont enregistrés pour comparer les candidats et reprendre une exécution.'],
  ['03', 'Restituer', 'Modèle → prédictions → HTML', 'Le modèle retenu est sauvegardé. Les artefacts et la relecture des prédictions sont vérifiés, puis un rapport est produit.'],
]

export function ProjectVisual({ kind }: { kind: Kind }) {
  const patternId = useId()
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const [windowSize, setWindowSize] = useState(4)
  const [phase, setPhase] = useState<'horizontal' | 'vertical'>('horizontal')
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const node = root.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: .05 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <figure ref={root} className={`tech-visual tech-${kind}${active ? ' is-active' : ''}${paused ? ' is-paused' : ''}`}>
    <div className="visual-heading"><span><i aria-hidden="true" /> {titles[kind]}</span><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? `Reprendre l’animation : ${titles[kind]}` : `Mettre en pause l’animation : ${titles[kind]}`}>{paused ? 'Reprendre' : 'Pause'}</button></div>
    {kind === 'automl' && <>
      <div className="pipeline-map" aria-hidden="true"><div className="data-file">.csv<span>DONNÉES</span></div><div className="pipeline-connection"><i /></div><div className="pipeline-core">&#123; ml &#125;<span>PIPELINE</span></div><div className="pipeline-connection"><i /></div><div className="data-file">.html<span>RAPPORT</span></div></div>
      <div className="pipeline-steps" role="group" aria-label="Étapes du pipeline AutoML">{steps.map(([n,label],i)=><button key={n} type="button" aria-pressed={step===i} onClick={()=>setStep(i)}><span>{n}</span>{label}</button>)}</div>
      <div className="pipeline-explanation" aria-live="polite"><code>{steps[step][2]}</code><p>{steps[step][3]}</p></div>
    </>}
    {kind === 'geoai' && <>
      <div className="satellite-scene" aria-hidden="true"><svg viewBox="0 0 500 165"><g stroke="currentColor" fill="none"><path d="M0 40 500 115M0 80 500 155M80 0 0 165M180 0 100 165M280 0 200 165M380 0 300 165M480 0 400 165" opacity=".16"/><g transform="translate(90 28) rotate(12)">{Array.from({length:8},(_,i)=><rect key={i} className="pond-cell" x={(i%4)*72} y={Math.floor(i/4)*57} width="57" height="42" rx="3" style={{animationDelay:`${i*.15}s`}} />)}</g><path d="M50 10v140" className="sensor-scan" strokeWidth="3"/></g></svg><span>RADAR S1 + OPTIQUE S2</span></div>
      <div className="window-selector" role="group" aria-label="Fenêtre d’observation radar"><span>Radar disponible</span>{[4,5,6].map(n=><button key={n} aria-pressed={windowSize===n} type="button" onClick={()=>setWindowSize(n)}>{n} mois</button>)}</div>
      <div className="sensor-grid"><span />{Array.from({length:12},(_,i)=><span key={i}>{String(i+1).padStart(2,'0')}</span>)}<strong>S1</strong>{Array.from({length:12},(_,i)=><i key={`s1-${i}`} className={i>=3&&i<3+windowSize?'observed':'missing'} aria-label={`Radar mois ${i+1} : ${i>=3&&i<3+windowSize?'présent':'absent'}`} />)}<strong>S2</strong>{Array.from({length:12},(_,i)=><i key={`s2-${i}`} className={i>=3&&i<3+windowSize&&i%4!==0?'optical':'missing'} aria-label={`Optique mois ${i+1} : ${i>=3&&i<3+windowSize&&i%4!==0?'présent':'absent'}`} />)}</div>
      <p className="visual-note">Les cases pleines représentent les observations disponibles. Le schéma reproduit le principe des lacunes, sans afficher les données de compétition.</p>
    </>}
    {kind === 'traffic' && <>
      <svg className={`traffic-map phase-${phase}`} viewBox="0 0 500 300" role="img" aria-label={`Carrefour schématique : voies ${phase==='horizontal'?'horizontales':'verticales'} ouvertes`}>
        <defs><pattern id={patternId} width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#d9d5cb"/></pattern></defs>
        <rect width="500" height="300" fill={`url(#${patternId})`}/><path d="M0 150H500M250 0V300" stroke="#343b38" strokeWidth="98"/>
        <path d="M0 150H200M300 150H500M250 0V100M250 200V300" stroke="#9ca69d" strokeDasharray="9 10"/>
        <rect x="195" y="95" width="110" height="110" rx="5" fill="none" stroke="#ba764e" strokeDasharray="5 6"/>
        <g className="traffic-horizontal"><rect className="car car-h" x="25" y="116" width="34" height="18" rx="5" fill="#dcab77"/><rect className="car car-h car-delayed" x="25" y="116" width="34" height="18" rx="5" fill="#e2d9c6"/></g>
        <g className="traffic-vertical"><rect className="car car-v" x="263" y="10" width="18" height="34" rx="5" fill="#9db8a4"/><rect className="car car-v car-delayed" x="263" y="10" width="18" height="34" rx="5" fill="#e2d9c6"/></g>
        <circle className="light-h" cx="184" cy="184" r="9"/><circle className="light-v" cx="316" cy="85" r="9"/>
        <text x="20" y="278" fill="#616a61" fontSize="11">CAMÉRA → ESTIMATION → COMMANDE</text>
      </svg>
      <div className="phase-selector" role="group" aria-label="Phase du carrefour"><button type="button" onClick={()=>setPhase('horizontal')} aria-pressed={phase==='horizontal'}>Voies horizontales</button><button type="button" onClick={()=>setPhase('vertical')} aria-pressed={phase==='vertical'}>Voies verticales</button></div>
    </>}
    {kind === 'audio' && <>
      <div className="audio-bars" aria-hidden="true">{Array.from({length:48},(_,i)=><i key={i} style={{'--bar-height':`${18+Math.abs(Math.sin(i*1.7)*Math.cos(i*.3))*76}%`,animationDelay:`${i*-.07}s`} as CSSProperties}/>)}</div>
      <div className="audio-stages"><span>Signal audio</span><b>→</b><span>Encodage / CTC</span><b>→</b><span>Transcription</span></div><div className="language-chips"><span>Lingala</span><span>Luganda</span><span>Shona</span></div><p className="visual-note">Séparer les locuteurs, puis examiner les erreurs par langue : WER pour les mots, CER pour les caractères.</p>
    </>}
    {kind === 'forex' && <>
      <svg className="market-chart" viewBox="0 0 500 220" role="img" aria-label="Illustration de bougies de marché et d’une ligne de suivi, sans données réelles"><path d="M30 45H470M30 100H470M30 155H470M30 210H470" stroke="currentColor" opacity=".12"/>{Array.from({length:24},(_,i)=>{const y=130-Math.sin(i*.38)*35-i*2;return <g key={i} className="market-candle" style={{animationDelay:`${i*.08}s`}}><path d={`M${40+i*18} ${y-20}v55`} stroke={i%3?'#97baaa':'#d38a64'}/><rect x={35+i*18} y={y-5} width="10" height={14+(i%3)*5} fill={i%3?'#97baaa':'#d38a64'}/></g>})}<path className="market-path" d="M30 165 60 151 90 150 120 131 150 112 180 119 210 132 240 137 270 120 300 100 330 102 360 85 390 74 420 85 460 67" fill="none" stroke="#eee3cd" strokeWidth="2"/><path className="market-cursor" d="M30 20V210" stroke="#ba764e" strokeDasharray="3 5"/></svg>
      <div className="audio-stages"><span>Données</span><b>→</b><span>Signaux</span><b>→</b><span>Backtest</span><b>→</b><span>Rapport</span></div><p className="visual-note">Le même ordre temporel doit être respecté dans le calcul des indicateurs et dans leur évaluation.</p>
    </>}
    {kind === 'soliton' && <>
      <svg className="soliton-diagram" viewBox="0 0 500 230" role="img" aria-label="Schéma d’une impulsion se déplaçant le long d’une ligne à vingt cellules"><path d="M20 170H480" stroke="currentColor" opacity=".25"/>{Array.from({length:20},(_,i)=><g key={i}><circle cx={26+i*23.5} cy="170" r="3" fill="currentColor" opacity=".5"/><path d={`M${26+i*23.5} 178v12`} stroke="currentColor" opacity=".3"/></g>)}<g className="traveling-pulse"><path d="M-80 169C-28 169-23 167-12 115C0 26 13 26 25 115C36 167 41 169 94 169" stroke="#c97750" strokeWidth="3" fill="none"/></g><text x="20" y="215" fontSize="11" fill="currentColor">CELLULE 01</text><text x="402" y="215" fontSize="11" fill="currentColor">CELLULE 20</text></svg><p className="visual-note">Mesurer cellule par cellule, puis comparer l’évolution des signaux au modèle LTspice.</p>
    </>}
    {kind === 'risk' && <>
      <div className="risk-flow"><span>Registre Excel</span><i>→</i><span>Distributions<br />& corrélations</span><i>→</i><span>Monte Carlo</span></div><svg className="risk-distribution" viewBox="0 0 500 210" role="img" aria-label="Schéma d’une distribution de coûts et de repères de percentiles, sans résultats numériques"><path d="M30 180H475" stroke="currentColor" opacity=".25"/><path className="distribution-fill" d="M30 180C75 180 90 170 120 90C145 15 180 20 210 65C245 120 280 155 340 170C385 180 420 180 475 180Z" fill="#c9775025"/><path className="distribution-line" d="M30 180C75 180 90 170 120 90C145 15 180 20 210 65C245 120 280 155 340 170C385 180 420 180 475 180" fill="none" stroke="#ce8d64" strokeWidth="3"/>{[235,320,380].map((x,i)=><g key={x}><path d={`M${x} 35V180`} stroke="currentColor" strokeDasharray="4 6" opacity=".4"/><text x={x-13} y="22" fill="currentColor" fontSize="12">{['P50','P80','P90'][i]}</text></g>)}</svg><p className="visual-note">Illustration du principe : les percentiles situent différents niveaux de couverture dans la distribution simulée.</p>
    </>}
    {kind === 'financial' && <>
      <div className="transaction-bars" aria-hidden="true">{[58,72,49,85,63,92].map((h,i)=><div key={i}><i style={{height:`${h}%`,animationDelay:`${i*.12}s`}}/><span>M{i+1}</span></div>)}</div><div className="feature-flow"><span>Agrégats</span><span>Évolutions</span><span>Valeurs mensuelles</span></div><div className="financial-model"><code>LightGBM</code><span>→</span><span>Probabilité de stress</span></div><p className="visual-note">Schéma des familles de variables. Les barres ne représentent pas des transactions réelles.</p>
    </>}
    <figcaption>Schéma explicatif interactif{['audio','forex','soliton','risk','financial'].includes(kind) ? ' · illustration animée' : ''}</figcaption>
  </figure>
}

export const projectVisualKind: Record<string, Kind> = { automl:'automl', geoai:'geoai', waxal:'audio', risksim:'risk', 'financial-stress':'financial', '02':'traffic', '03':'forex', '05':'soliton' }
