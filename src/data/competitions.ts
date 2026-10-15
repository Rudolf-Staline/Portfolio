/** Distinctions and ranks from Rudolf’s September 2026 CV. */
export const competitions = [
  {
    name: 'NeuroGolf Championship', platform: 'Kaggle', year: '2026',
    medal: 'Bronze', result: '220e / 2 963 équipes', detail: 'Retrouver une transformation de grille avec un réseau compact.',
    pitch: 'Des exemples colorés révèlent une règle à retrouver. NeuroGolf ajoute une contrainte : la solution doit aussi rester petite.',
    href: 'https://www.kaggle.com/competitions/neurogolf-2026/leaderboard', linkLabel: 'Compétition', projectId: 'neurogolf',
  },
  {
    name: 'Google WAXAL ASR', platform: 'Zindi', year: '2026',
    medal: 'Bronze', result: 'Médaille de bronze', detail: 'Passer de la voix au texte en lingala, luganda et shona.',
    pitch: 'Un score global peut cacher des écarts entre langues. La chaîne de transcription est évaluée par langue et sur des locuteurs séparés de l’entraînement.',
    href: 'https://zindi.world/competitions/google-waxal-asr-challenge', linkLabel: 'Compétition', projectId: 'waxal',
  },
  {
    name: 'GeoAI Aquaculture', platform: 'Zindi', year: '2026',
    medal: 'Bronze', result: 'Médaille de bronze', detail: 'Reconnaître des bassins aquacoles avec des observations incomplètes.',
    pitch: 'Douze mois à l’entraînement, quelques mois au test : la validation reproduit les lacunes avant de comparer les modèles radar et optiques.',
    href: 'https://github.com/Rudolf-Staline/GeoAi', linkLabel: 'Code', projectId: 'geoai',
  },
  {
    name: 'Financial Stress Prediction', platform: 'Zindi', year: '2026',
    medal: null, result: '4e / 262', detail: 'Exploiter six mois de transactions pour prédire le stress financier.',
    pitch: 'Comparer les évolutions mensuelles et les agrégats pour retrouver des indices de fragilité dans les transactions.',
    href: 'https://github.com/Rudolf-Staline/financial-stress-prediction', linkLabel: 'Expérimentations', projectId: 'financial-stress',
  },
  {
    name: 'African Credit Scoring', platform: 'Zindi', year: '2026',
    medal: null, result: '2e / 77', detail: 'Estimer un risque de crédit à partir des informations disponibles.',
    pitch: 'Une participation consacrée à l’évaluation du risque de crédit, classée deuxième sur 77 sur Zindi.',
    href: null, linkLabel: null, projectId: 'credit',
  },
] as const
