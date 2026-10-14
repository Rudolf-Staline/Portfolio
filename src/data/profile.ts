export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca · Promotion 2028',
  subtitle: 'Data engineering · IA appliquée · sciences appliquées',
  heroTitle: 'Rudolf Hounlete',
  heroFocus: 'Machine learning & développement logiciel.',
  heroDescription: 'Mes projets vont de la reconnaissance vocale aux outils de simulation. Je recherche un stage pour poursuivre ce travail au sein d’une équipe, en développement logiciel ou en machine learning appliqué.',
  /** Short, factual positioning line used in the hero. */
  pitch:
    "Je construis des applications web et des modèles de machine learning, avec Python et TypeScript.",
  about: [
    "Mon parcours a commencé à l’IMSP, au Bénin, où j’ai suivi une licence en TIC et des classes préparatoires scientifiques. J’ai ensuite rejoint l’École Centrale Casablanca pour poursuivre ma formation d’ingénieur.",
    "Je travaille surtout avec Python et TypeScript. Ce qui m’intéresse, c’est aussi ce qui vient après le modèle : pouvoir le réutiliser, comprendre ses résultats et construire une interface pour l’exploiter. C’est ce que j’ai fait avec RiskSim, du moteur de simulation à l’application Windows.",
    "Les compétitions Kaggle et Zindi occupent une place importante dans mes projets. J’y ai travaillé sur des données financières, des observations satellitaires et la reconnaissance vocale multilingue. Ces participations m’ont valu trois médailles de bronze ; les résultats et les travaux associés sont présentés plus haut.",
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
