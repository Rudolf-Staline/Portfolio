export type ProjectVisual = {
  src: string
  alt: string
  caption: string
  kind: 'capture' | 'generated'
  width: number
  height: number
}

const generated = (file: string, alt: string): ProjectVisual => ({
  src: `/projects/generated/${file}.webp`, alt,
  caption: 'Image générée pour évoquer le sujet du projet.',
  kind: 'generated', width: 1536, height: 1024,
})

export const projectVisuals: Record<string, ProjectVisual> = {
  risksim: {
    src: '/projects/risksim-dashboard.webp',
    alt: 'Interface RiskSim : registre des risques, distribution simulée des coûts et indicateurs de réserve.',
    caption: 'Capture de RiskSim sur un scénario de démonstration.',
    kind: 'capture', width: 1440, height: 1100,
  },
  'dossier-jaune': {
    src: '/projects/dossier-jaune.jpg',
    alt: 'Prototype Dossier Jaune avec navigation des documents d’une commande textile.',
    caption: 'Capture du prototype initial, alors nommé Framatex.',
    kind: 'capture', width: 1336, height: 752,
  },
  '01': {
    src: '/projects/pediappend-interface-symptomes.jpg',
    alt: 'Formulaire de symptômes et paramètres du prototype académique PediAppend.',
    caption: 'Capture de l’interface du prototype académique PediAppend.',
    kind: 'capture', width: 1357, height: 932,
  },
  'neurogolf': generated('neurogolf', 'Cubes colorés composant un puzzle de raisonnement sur une grille sombre.'),
  'credit': generated('credit', 'Balance en laiton, pièces et dossiers de crédit sous une lumière chaude.'),
  'financial-stress': generated('financial-stress', 'Six colonnes de verre ambré évoquant une évolution financière.'),
  'geoai': generated('geoai', 'Vue aérienne conceptuelle de bassins aquacoles aux eaux turquoise.'),
  'waxal': generated('waxal', 'Microphone de studio et onde sculptée en cuivre.'),
  'automl': generated('automl', 'Appareil de précision triant des billes de données colorées.'),
  'churn-dashboard': generated('churn-dashboard', 'Un personnage ambré se détache d’un groupe de silhouettes en verre.'),
  'biohub': generated('biohub', 'Cellules translucides aux noyaux orange, dont une en division.'),
  '02': generated('traffic', 'Maquette de carrefour avec véhicules, feux et caméra.'),
  '03': generated('forex', 'Bureau de recherche quantitative avec séries temporelles et prisme.'),
  '05': generated('solitons', 'Circuit à inductances et condensateurs devant un oscilloscope.'),
}
