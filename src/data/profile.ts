export const profile = {
  name: 'Rudolf Hounlete',
  title: 'Élève ingénieur — École Centrale Casablanca',
  subtitle: 'Machine learning · Développement logiciel · Sciences appliquées',
  heroTitle: 'Rudolf Hounlete',
  heroFocus: 'Élève ingénieur à Centrale Casablanca.',
  heroDescription: 'Je développe des applications et des modèles de machine learning autour de problèmes de finance, de simulation et de systèmes embarqués. Je présente ici les questions qui ont lancé mes projets, les choix de conception et les résultats obtenus.',
  pitch: 'Étudiant ingénieur, je développe des applications et j’explore le machine learning à travers des projets et des compétitions.',
  about: [
    'Je m’appelle Rudolf. Je suis originaire du Bénin et je poursuis mes études d’ingénieur à l’École Centrale Casablanca. Avant de rejoindre Centrale, j’ai étudié les technologies de l’information et de la communication à l’IMSP, où j’ai également suivi des classes préparatoires scientifiques.',
    'Ce qui m’intéresse dans un projet, c’est le passage du calcul à son utilisation. Un modèle de classification doit pouvoir être examiné depuis une interface ; une simulation doit permettre de modifier les hypothèses et de comprendre leur effet. C’est ce lien que je travaille avec Python, React et Flask, selon les sujets.',
    'Les compétitions me confrontent à des problèmes moins guidés qu’un exercice de cours. Avec des mois d’observations satellitaires manquants ou des voix enregistrées dans plusieurs langues, la façon de préparer les données et de valider le modèle devient une partie du problème. Mes participations sur Kaggle et Zindi ont été récompensées par trois médailles de bronze.',
    'Pendant mon stage chez CHOUBEL, j’ai développé RiskSim, du moteur de simulation à sa distribution Windows. Mes études me conduisent aussi au laboratoire : mesurer une impulsion à l’oscilloscope, la simuler dans LTspice, puis comparer les signaux. Je garde cette place pour l’expérimentation aux côtés du développement logiciel.',
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
