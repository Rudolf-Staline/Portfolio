import type { Certification, LanguageEntry } from './types'

// Extensible : ajouter une certification = ajouter une entrée ici.
export const certifications: Certification[] = [
  {
    title: 'Capstone : Project Management',
    issuer: 'Google',
    date: '2025',
    status: 'completed',
  },
  {
    title: 'Data Engineering Professional Certificate',
    issuer: 'DeepLearning.AI',
    date: 'en cours',
    status: 'in-progress',
  },
]

export const languages: LanguageEntry[] = [
  {
    language: 'Français',
    level: 'C1',
    target: 'DALF C2 (oct. 2026)',
  },
  {
    language: 'Anglais',
    level: 'B2',
    target: 'Cambridge C1 (août 2026)',
  },
]
