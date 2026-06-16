import type { EducationEntry } from './types'

// Note: les deux entrées IMSP sont légitimes (Licence TIC ET classes
// préparatoires sur la même période) — ce n'est pas un doublon.
export const education: EducationEntry[] = [
  {
    school: 'École Centrale Casablanca',
    detail: 'Cycle ingénieur',
    period: '2025 → aujourd’hui',
    location: 'Maroc',
  },
  {
    school: 'IMSP — Bénin',
    detail: 'Licence TIC',
    period: '2022 — 2025',
    location: 'Bénin',
  },
  {
    school: 'IMSP — Bénin',
    detail: 'Classes préparatoires MPSI / PCSI',
    period: '2022 — 2025',
    location: 'Bénin',
  },
  {
    school: 'Baccalauréat',
    detail: 'Série C',
    period: '2022',
  },
]
