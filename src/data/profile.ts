export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca · Promotion 2028',
  subtitle: 'Data engineering · IA appliquée · sciences appliquées',
  heroTitle: 'Rudolf Hounlete',
  heroFocus: 'Machine learning & développement logiciel.',
  heroDescription: 'Élève ingénieur à l’École Centrale Casablanca. Je recherche un stage en développement logiciel ou en machine learning appliqué.',
  /** Short, factual positioning line used in the hero. */
  pitch:
    "Je construis des applications web et des modèles de machine learning, avec Python et TypeScript.",
  about: [
    "Élève ingénieur à l’École Centrale Casablanca, je travaille sur des projets de machine learning et de développement logiciel. J’ai obtenu trois médailles de bronze sur Kaggle et Zindi.",
    "J’utilise principalement Python pour l’analyse des données, les modèles et la simulation, et TypeScript avec React pour les interfaces. Ma formation associe une licence en TIC et des classes préparatoires scientifiques à l’IMSP, au Bénin.",
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
