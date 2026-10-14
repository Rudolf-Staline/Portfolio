/** Distinctions and ranks from Rudolf’s September 2026 CV. */
export const competitions = [
  {
    name: 'NeuroGolf Championship', platform: 'Kaggle', year: '2026',
    medal: 'Bronze', result: '220e / 2 963 équipes', detail: 'Top 7,4 % · Réseaux compacts pour les transformations de grilles ARC-AGI',
    href: 'https://www.kaggle.com/competitions/neurogolf-2026/leaderboard', linkLabel: 'Compétition', projectId: null,
  },
  {
    name: 'Google WAXAL ASR', platform: 'Zindi', year: '2026',
    medal: 'Bronze', result: 'Médaille de bronze', detail: 'Reconnaissance vocale · Lingala, luganda et shona',
    href: 'https://zindi.world/competitions/google-waxal-asr-challenge', linkLabel: 'Compétition', projectId: 'waxal',
  },
  {
    name: 'GeoAI Aquaculture', platform: 'Zindi', year: '2026',
    medal: 'Bronze', result: 'Médaille de bronze', detail: 'Identification de bassins aquacoles à partir de données satellitaires',
    href: 'https://github.com/Rudolf-Staline/GeoAi', linkLabel: 'Code', projectId: 'geoai',
  },
  {
    name: 'Financial Stress Prediction', platform: 'Zindi', year: '2026',
    medal: null, result: '4e / 262', detail: 'Top 1,5 % · Prédiction du stress financier',
    href: 'https://github.com/Rudolf-Staline/financial-stress-prediction', linkLabel: 'Expérimentations', projectId: 'financial-stress',
  },
  {
    name: 'African Credit Scoring', platform: 'Zindi', year: '2026',
    medal: null, result: '2e / 77', detail: 'Modélisation du risque de crédit',
    href: null, linkLabel: null, projectId: null,
  },
] as const
