import type { SkillGroup } from './types'

export const skills: SkillGroup[] = [
  {
    label: 'Langages',
    items: ['Python', 'Kotlin', 'TypeScript', 'SQL'],
  },
  {
    label: 'Frameworks',
    items: ['Flask', 'React + Vite', 'Tailwind', 'Jetpack Compose'],
  },
  {
    label: 'IA & données',
    items: [
      'Classification supervisée',
      'SHAP / XAI',
      'YOLOv8',
      'Backtesting',
      'Analyse quantitative',
    ],
  },
  {
    label: 'Outils',
    items: ['Git', 'Linux', 'VS Code', 'LaTeX', 'Raspberry Pi'],
  },
]
