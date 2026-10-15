export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca',
  subtitle: 'Machine learning · Développement logiciel · Sciences appliquées',
  heroTitle: 'Rudolf Hounlete',
  heroFocus: 'Élève ingénieur à Centrale Casablanca.',
  heroDescription: 'Je travaille sur des modèles de machine learning et des applications, avec un intérêt pour les données, la simulation et les systèmes embarqués. Voici les projets et les expériences qui accompagnent mes études.',
  pitch: 'Étudiant ingénieur, je développe des applications et j’explore le machine learning à travers des projets et des compétitions.',
  about: [
    'Je m’appelle Rudolf. Je suis originaire du Bénin et je poursuis mes études d’ingénieur à l’École Centrale Casablanca. Avant de rejoindre Centrale, j’ai étudié les technologies de l’information et de la communication à l’IMSP, où j’ai également suivi des classes préparatoires scientifiques.',
    'Mes projets se situent souvent à la rencontre de plusieurs disciplines : un modèle de classification devient une application Flask ; une simulation probabiliste s’accompagne d’une interface React ; un système de vision commande les feux d’une maquette. J’aime travailler sur ces liens entre le calcul et ce que l’on peut en faire.',
    'Les compétitions occupent une place importante dans mon apprentissage du machine learning. Elles m’ont amené à traiter des transactions financières, des séries satellitaires incomplètes et des enregistrements vocaux en plusieurs langues. J’y ai obtenu trois médailles de bronze, sur Kaggle et Zindi.',
    'Ce site rassemble aussi des travaux moins centrés sur l’IA : une expérience de propagation de solitons, un outil d’analyse Forex et RiskSim, développé pendant mon stage chez CHOUBEL. Ils donnent un aperçu de ce que j’étudie et de la manière dont je mets ces connaissances en pratique.',
  ],
  interests: ['Machine learning', 'Développement logiciel', 'Finance quantitative', 'Physique expérimentale'],
  availability: 'Étudiant ingénieur · Casablanca',
  facts: [
    { k: 'Formation', v: 'Ingénieur généraliste' },
    { k: 'École', v: 'Centrale Casablanca' },
    { k: 'Parcours', v: 'Bénin → Maroc' },
    { k: 'Domaines', v: 'ML · Logiciel · Simulation' },
  ],
} as const

export const contact = {
  email: 'rudolfhounlete1@gmail.com',
  github: 'https://github.com/rudolf-staline',
  linkedin: null as string | null,
  cv: '/CV_Rudolf_HOUNLETE.pdf' as string | null,
} as const
export const socialLinks = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'Email', href: `mailto:${contact.email}` },
]
