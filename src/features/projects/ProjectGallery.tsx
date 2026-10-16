const galleries = {
  risksim: [
    {src:'/projects/risksim-dashboard.png', label:'Tableau de bord', alt:'Capture du tableau de bord RiskSim S5 : indicateurs, portefeuille de risques et historique du scénario de démonstration.', caption:'Capture réelle de RiskSim · version S5. Scénario de démonstration, montants illustratifs.'},
    {src:'/projects/risksim-results.png', label:'Résultats', alt:'Capture RiskSim S5 : distribution des coûts, percentiles, courbe cumulée et classement de sensibilité du scénario de démonstration.', caption:'Capture réelle de l’écran de résultats S5. Les chiffres de ce scénario illustrent l’interface ; ils ne sont pas des résultats client.'},
  ],
  clinical: [
    {src:'/projects/pediappend-interface-symptomes.jpg',label:'Du symptôme à la saisie structurée',alt:'Capture de l’interface PediAppend : formulaire des symptômes cliniques et signes associés.',caption:'Interface du prototype Flask, rendue depuis les templates du dépôt. Formulaire vide, sans donnée patient.'},
    {src:'/projects/shap_summary_bar.png',label:'Comprendre les variables du modèle',alt:'Graphique SHAP du projet : importance moyenne des quinze principales variables, dont les observations échographiques, le diamètre de l’appendice et les marqueurs biologiques.',caption:'Graphique produit par le projet. L’importance moyenne décrit le modèle sur les données analysées ; elle n’explique pas à elle seule une prédiction individuelle.'},
  ],
}
export function ProjectGallery({kind}:{kind:keyof typeof galleries}) {
  if (kind === 'clinical') return <section className="pedi-showcase" aria-label="Interface et analyse du modèle PediAppend">
    <div className="pedi-visual-intro"><span className="overline">PediAppend · Le prototype en images</span><h4>Saisir les observations.<br/>Examiner ce que le modèle utilise.</h4><p>Les signes cliniques sont renseignés dans l’application Flask. L’analyse SHAP permet ensuite d’étudier le poids des variables dans les prédictions.</p></div>
    <div className="pedi-visual-grid">
      {galleries.clinical.map((image, index) => <figure className={`pedi-view pedi-view-${index}`} key={image.src}>
        <div className="pedi-view-heading"><span className="pedi-step">0{index + 1}</span><h4>{image.label}</h4></div>
        <div className="pedi-image-frame">{index === 0 && <div className="pedi-window-bar" aria-hidden="true"><i/><i/><i/><span>PediAppend / Symptômes</span></div>}<img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={index === 0 ? 1357 : 1186} height={index === 0 ? 932 : 1110}/></div>
        {index === 1 && <p className="pedi-chart-reading">Les observations échographiques figurent parmi les variables les plus influentes, aux côtés de la numération des globules blancs et de la CRP.</p>}
        <figcaption>{image.caption}</figcaption>
      </figure>)}
    </div>
  </section>
  return <div className={`project-gallery expanded-gallery gallery-${kind}`} role="group" aria-label={kind==='risksim'?'Captures de RiskSim':'Interface de PediAppend'}>
    {galleries[kind].map(image => <figure key={image.src}><h4>{image.label}</h4><img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={kind==='risksim'?1440:1357} height={kind==='risksim'?1100:932}/><figcaption>{image.caption}</figcaption></figure>)}
  </div>
}
