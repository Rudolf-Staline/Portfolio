export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca · Promotion 2028',
  subtitle: 'Data engineering · IA appliquée · sciences appliquées',
  /** Short, factual positioning line used in the hero. */
  pitch:
    "Je travaille sur des projets où le code aide à comprendre ou à décider.",
  about: [
    "Je travaille sur des projets où le code aide à comprendre ou à décider. Mon réflexe : partir d'un sujet mal cadré, le découper proprement, livrer une première version testable.",
    "Je cherche une première immersion professionnelle pour voir comment ces réflexes se traduisent dans une équipe technique.",
  ],
  interests: [
    'Finance quantitative',
    'Systèmes intelligents',
    'Échecs',
    'Lecture scientifique',
  ],
} as const

export const contact = {
  email: 'rudolfhounlete1@gmail.com',
  github: 'https://github.com/rudolf-staline',
  // TODO: à confirmer par Rudolf — URL LinkedIn
  linkedin: null as string | null,
  // TODO: déposer le PDF dans /public et renseigner le chemin (ex. '/cv-rudolf-hounlete.pdf')
  cv: null as string | null,
} as const

/** Links shown in the hero and footer. `href: null` => rendered as TODO. */
export const socialLinks: { label: string; href: string | null }[] = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'Email', href: `mailto:${contact.email}` },
]
