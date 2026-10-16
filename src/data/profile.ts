export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur · École Centrale Casablanca (promotion 2028)',
  subtitle: 'Data engineering · IA appliquée · Développement logiciel',
  heroTitle: 'Rudolf Hounlete',
  heroFocus: 'Élève ingénieur à Centrale Casablanca, spécialisé en data engineering et en IA appliquée.',
  heroDescription: 'Je construis des modèles de machine learning et des outils logiciels qui aident à décider : estimer un risque de crédit, prédire un stress financier, dimensionner une réserve budgétaire. J’ai obtenu trois médailles de bronze sur Kaggle et Zindi, une 2e place sur 77 et une 4e place sur 262, et j’ai développé en stage un outil de simulation de risques livré en application Windows.',
  pitch: 'Élève ingénieur à Centrale Casablanca. Je développe des modèles de machine learning et des applications autour du risque, de la finance et de la simulation : trois médailles de bronze sur Kaggle et Zindi, 2e sur 77 et 4e sur 262 sur des défis de risque financier.',
  about: [
    'Originaire du Bénin, je poursuis le cycle ingénieur de l’École Centrale Casablanca, intégré en 2025 (promotion 2028). Ce parcours fait suite à une licence en technologies de l’information et de la communication et à une préparation scientifique MPSI/PCSI à l’IMSP.',
    'Les participations sur Kaggle et Zindi ont donné trois médailles de bronze (NeuroGolf, WAXAL et GeoAI), une 2e place sur 77 en scoring de crédit et une 4e place sur 262 en prédiction de stress financier. Sur des données satellitaires incomplètes ou des enregistrements dans trois langues, la préparation des données et la validation ont compté autant que le modèle.',
  ],
  interests: ['Machine learning', 'Data engineering', 'Finance quantitative', 'Développement logiciel', 'Physique expérimentale'],
  availability: 'Élève ingénieur · Casablanca',
  facts: [
    { k: 'Formation', v: 'Cycle ingénieur · promotion 2028' },
    { k: 'École', v: 'Centrale Casablanca' },
    { k: 'Parcours', v: 'Bénin → Maroc' },
    { k: 'Domaines', v: 'Data · IA appliquée · Simulation' },
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
