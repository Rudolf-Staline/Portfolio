/**
 * Shared types for the portfolio content layer.
 * Edit content in the sibling data files — never in the components.
 */

export type Link = {
  label: string
  href: string
}

export type ProjectLink = {
  /** GitHub repository URL. Use `null` when no public repo is available. */
  code: string | null
  /** Live demo URL. Use `null` when there is no demo. */
  demo: string | null
}

export type Project = {
  /** Display index, e.g. "01". */
  index: string
  title: string
  /** Context line: "Coding Week · Centrale Casablanca". */
  context: string
  period: string
  /** One-sentence summary of the project's value. */
  tagline: string
  /** 2–3 concrete bullet points. */
  highlights: string[]
  /** Technology tags. */
  stack: string[]
  links: ProjectLink
  /** Optional status badge, e.g. "Projet en cours". */
  status?: string
  /** Highlight the flagship project visually. */
  featured?: boolean
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type EducationEntry = {
  school: string
  detail: string
  period: string
  location?: string
}

export type Certification = {
  title: string
  issuer: string
  /** "2025" or "en cours". */
  date: string
  status?: 'completed' | 'in-progress'
}

export type LanguageEntry = {
  language: string
  /** Current level, e.g. "C1". */
  level: string
  /** Planned target, e.g. "DALF C2 (oct. 2026)". */
  target?: string
}
