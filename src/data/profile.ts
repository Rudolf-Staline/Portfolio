export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca · Promotion 2028',
  subtitle: 'Data engineering · IA appliquée · sciences appliquées',
  heroTitle: 'Je développe des applications',
  heroFocus: 'et des modèles de machine learning.',
  heroDescription: 'Élève ingénieur à Centrale Casablanca, je cherche un stage en développement logiciel ou en machine learning appliqué.',
  /** Short, factual positioning line used in the hero. */
  pitch:
    "Je construis des applications web et des modèles de machine learning, avec Python et TypeScript.",
  about: [
    "Je suis élève ingénieur généraliste à l’École Centrale Casablanca, après une licence en TIC et des classes préparatoires à l’IMSP, au Bénin. Mes projets relient le développement logiciel aux modèles : classification tabulaire, données satellitaires, reconnaissance vocale et simulation probabiliste.",
    "Chez CHOUBEL, mon stage a porté sur RiskSim, un simulateur Monte Carlo doté d’une interface React. J’ai travaillé sur le moteur Python et le parcours d’utilisation, jusqu’à la distribution Windows. Je cherche maintenant un stage technique pour contribuer à un produit au sein d’une équipe et approfondir mes compétences en logiciel ou en machine learning.",
  ],
  interests: [
    'Finance quantitative',
    'Systèmes intelligents',
    'Échecs',
    'Lecture scientifique',
  ],
  /** Availability line shown in the hero. */
  availability: 'Disponible pour un stage technique',
  /** Spec-sheet facts (hero panel). Strictly from the CV — no invention. */
  facts: [
    { k: 'École', v: 'Centrale Casablanca' },
    { k: 'Promotion', v: '2028' },
    { k: 'Domaines', v: 'Data · IA · Dev' },
    { k: 'Langues', v: 'FR C1 · EN B2' },
    { k: 'Recherche', v: 'Stage technique' },
  ],
} as const

export const contact = {
  email: 'rudolfhounlete1@gmail.com',
  github: 'https://github.com/rudolf-staline',
  // TODO: à confirmer par Rudolf — URL LinkedIn
  linkedin: null as string | null,
  // CV servi depuis le dossier public.
  cv: '/CV_Rudolf_HOUNLETE.pdf' as string | null,
} as const

/** Links shown in the hero and footer. `href: null` => rendered as TODO. */
export const socialLinks: { label: string; href: string | null }[] = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'Email', href: `mailto:${contact.email}` },
]
