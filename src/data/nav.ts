export type NavItem = { id: string; label: string; index: string }

/** Section order + numbering (swiss "01, 02…" indices). */
export const navItems: NavItem[] = [
  { id: 'a-propos', label: 'À propos', index: '01' },
  { id: 'projets', label: 'Projets', index: '02' },
  { id: 'competences', label: 'Compétences', index: '03' },
  { id: 'parcours', label: 'Parcours', index: '04' },
  { id: 'certifications', label: 'Certifications', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]
