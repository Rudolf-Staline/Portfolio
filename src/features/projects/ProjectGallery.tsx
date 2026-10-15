import { useState } from 'react'
const galleries = {
  risksim: [
    {src:'/projects/risksim-dashboard.png', label:'Tableau de bord', alt:'Capture du tableau de bord RiskSim S5 : indicateurs, portefeuille de risques et historique du scénario de démonstration.', caption:'Capture réelle de RiskSim · version S5. Scénario de démonstration, montants illustratifs.'},
    {src:'/projects/risksim-results.png', label:'Résultats', alt:'Capture RiskSim S5 : distribution des coûts, percentiles, courbe cumulée et classement de sensibilité du scénario de démonstration.', caption:'Capture réelle de l’écran de résultats S5. Les chiffres de ce scénario illustrent l’interface ; ils ne sont pas des résultats client.'},
  ],
  clinical: [
    {src:'/projects/shap_summary_bar.png',label:'Importance SHAP',alt:'Graphique SHAP du dépôt PediAppend : importance moyenne des quinze premières variables pour le modèle évalué.',caption:'Export du dépôt PediAppend · importance moyenne des variables selon SHAP. Une contribution au modèle n’établit pas une relation causale.'},
    {src:'/projects/roc_curve.png',label:'Courbe ROC',alt:'Courbe ROC exportée par le pipeline d’évaluation du projet académique PediAppend.',caption:'Export du dépôt PediAppend · courbe ROC du modèle évalué sur le jeu du projet. Ce graphique ne constitue pas une validation clinique.'},
  ],
}
export function ProjectGallery({kind}:{kind:keyof typeof galleries}) {
  const [index,setIndex]=useState(0)
  const images=galleries[kind]; const current=images[index]
  return <figure className={`project-gallery gallery-${kind}`}>
    <div className="gallery-tabs" role="group" aria-label={kind==='risksim'?'Captures de RiskSim':'Graphiques de PediAppend'}>{images.map((img,i)=><button type="button" key={img.src} aria-pressed={index===i} onClick={()=>setIndex(i)}>{img.label}</button>)}<span>VISUEL DU PROJET</span></div>
    <a href={current.src} target="_blank" rel="noreferrer" aria-label={`Agrandir : ${current.label} (nouvel onglet)`}><img src={current.src} alt={current.alt} loading="lazy" decoding="async" width={kind==='risksim'?1440:1200} height={kind==='risksim'?1100:1100}/><span className="gallery-expand">Agrandir ↗</span></a>
    <figcaption aria-live="polite">{current.caption}</figcaption>
  </figure>
}
