const galleries = {
  risksim: [
    {src:'/projects/risksim-dashboard.png', label:'Tableau de bord', alt:'Capture du tableau de bord RiskSim S5 : indicateurs, portefeuille de risques et historique du scénario de démonstration.', caption:'Capture réelle de RiskSim · version S5. Scénario de démonstration, montants illustratifs.'},
    {src:'/projects/risksim-results.png', label:'Résultats', alt:'Capture RiskSim S5 : distribution des coûts, percentiles, courbe cumulée et classement de sensibilité du scénario de démonstration.', caption:'Capture réelle de l’écran de résultats S5. Les chiffres de ce scénario illustrent l’interface ; ils ne sont pas des résultats client.'},
  ],
  clinical: [
    {src:'/projects/pediappend-interface-formulaire.jpg',label:'Le formulaire de l’application',alt:'Interface du prototype Flask PediAppend : formulaire de démographie vide, avec calcul de l’âge et saisie des caractéristiques du patient.',caption:'Vue du formulaire Flask, rendue à partir des templates du dépôt PediAppend. Prototype académique ; aucune donnée patient ni prédiction.'},
    {src:'/projects/pediappend-interface-symptomes.jpg',label:'La saisie des symptômes',alt:'Interface du prototype Flask PediAppend : étape des symptômes, avec les signes cliniques proposés et les contrôles de saisie.',caption:'Étape Symptômes du formulaire PediAppend, rendue depuis le code du projet. Cette vue illustre l’interface et ne constitue pas une validation clinique.'},
  ],
}
export function ProjectGallery({kind}:{kind:keyof typeof galleries}) {
  return <div className={`project-gallery expanded-gallery gallery-${kind}`} role="group" aria-label={kind==='risksim'?'Captures de RiskSim':'Interface de PediAppend'}>
    {galleries[kind].map(image => <figure key={image.src}><h4>{image.label}</h4><img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={kind==='risksim'?1440:1357} height={kind==='risksim'?1100:932}/><figcaption>{image.caption}</figcaption></figure>)}
  </div>
}
