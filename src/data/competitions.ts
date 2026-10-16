/** Distinctions and ranks from Rudolf’s September 2026 CV. */
export const competitions = [
  {
    name: 'NeuroGolf Championship', platform: 'Kaggle', year: '2026',
    medal: 'Bronze', result: '220e / 2 963 équipes', detail: 'Retrouver une règle de transformation de grilles avec la plus petite solution possible.',
    pitch: 'Quelques grilles d’exemple, une règle à retrouver, et la taille de la solution comptée dans le score.',
    href: 'https://www.kaggle.com/competitions/neurogolf-2026/leaderboard', linkLabel: 'Classement', projectId: 'neurogolf',
  },
  {
    name: 'Google WAXAL ASR', platform: 'Zindi', year: '2026',
    medal: 'Bronze', result: 'Médaille de bronze', detail: 'Transcrire le lingala, le luganda et le shona.',
    pitch: 'Chaque langue est évaluée séparément, sur des locuteurs absents de l’entraînement.',
    href: 'https://zindi.world/competitions/google-waxal-asr-challenge', linkLabel: 'Compétition', projectId: 'waxal',
  },
  {
    name: 'GeoAI Aquaculture', platform: 'Zindi', year: '2026',
    medal: 'Bronze', result: 'Médaille de bronze', detail: 'Repérer des bassins aquacoles sur des séries satellitaires incomplètes.',
    pitch: 'Douze mois à l’entraînement, quatre à six au test : la validation reproduit ces lacunes.',
    href: 'https://github.com/Rudolf-Staline/GeoAi', linkLabel: 'Code', projectId: 'geoai',
  },
  {
    name: 'Financial Stress Prediction', platform: 'Zindi', year: '2026',
    medal: null, result: '4e / 262', detail: 'Prédire le stress financier à partir de six mois de transactions.',
    pitch: 'Variables mensuelles et agrégats autour de LightGBM, réglés avec Optuna.',
    href: 'https://github.com/Rudolf-Staline/financial-stress-prediction', linkLabel: 'Expérimentations', projectId: 'financial-stress',
  },
  {
    name: 'African Credit Scoring', platform: 'Zindi', year: '2026',
    medal: null, result: '2e / 77', detail: 'Estimer le risque de crédit à partir des informations d’une demande.',
    pitch: 'Deuxième sur 77 participants.',
    href: null, linkLabel: null, projectId: 'credit',
  },
] as const
