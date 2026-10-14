export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca · Promotion 2028',
  subtitle: 'Data engineering · IA appliquée · sciences appliquées',
  heroTitle: 'Je conçois des applications',
  heroFocus: 'et j’entraîne des modèles de machine learning qui résolvent des problèmes concrets.',
  heroDescription: 'Élève ingénieur à Centrale Casablanca, je recherche un stage de fin d’année en développement logiciel ou en machine learning appliqué.',
  /** Short, factual positioning line used in the hero. */
  pitch:
    "Je construis des applications web et des modèles de machine learning, avec Python et TypeScript.",
  about: [
    "Je suis élève ingénieur généraliste à l’École Centrale Casablanca, après une licence en TIC et des classes préparatoires scientifiques à l’IMSP, au Bénin.",
    "Mon terrain de jeu : la classification sur données tabulaires et satellitaires, la transcription vocale multilingue et la simulation de risque. Ce qui me motive, c’est d’aller au-delà du notebook : empaqueter un modèle dans une CLI, l’intégrer dans une interface React ou le déployer sur un poste client.",
    "Lors de mon stage chez CHOUBEL, j’ai développé le moteur Python et l’interface React de RiskSim, un outil de simulation de risques projet, puis préparé sa distribution Windows.",
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
