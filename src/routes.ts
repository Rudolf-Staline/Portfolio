import { work } from './data/work'
import { english } from './data/english'
import { pitches } from './data/pitches'
import { projectVisuals } from './data/projectVisuals'
import type { Locale } from './data/architecture'

// Stable URLs keep existing project IDs available while giving public pages readable slugs.
const aliases: Record<string, string> = { '01': 'pediappend', '02': 'feux-intelligents', '03': 'analyse-forex', '05': 'solitons' }
export const slug = (id: string) => aliases[id] || id
export const homePath = (locale: Locale) => locale === 'en' ? '/en/' : '/'
export const projectPath = (id: string, locale: Locale) => `${locale === 'en' ? '/en/projects/' : '/projets/'}${slug(id)}/`
export const allRoutes = ['/', '/en/', ...work.flatMap(p => [projectPath(p.id, 'fr'), projectPath(p.id, 'en')])]
export function routeFor(pathname: string) {
  const locale: Locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
  const path = `${pathname.replace(/\/+$/, '')}/`
  const project = work.find(p => projectPath(p.id, locale) === path)
  return { locale, id: project?.id || null, notFound: path !== homePath(locale) && !project }
}
export function getWork(locale: Locale) {
  const terms: Record<string, string> = { 'Raisonnement visuel': 'Visual reasoning', 'Risque de crédit': 'Credit risk', 'Traitement audio': 'Audio processing', 'Traitement du signal': 'Signal processing', 'Simulation numérique': 'Numerical simulation', 'Architecture logicielle': 'Software architecture' }
  return work.map(p => locale === 'en' ? { ...p, ...english[p.id].work, problem: english[p.id].work.problem, stack: p.stack.map(s => terms[s] || s) } : p)
}
export const getPitch = (id: string, locale: Locale) => locale === 'en' ? english[id].pitch : pitches[id]
export function getMetadata(pathname: string) {
  const route = routeFor(pathname)
  const p = getWork(route.locale).find(p => p.id === route.id)
  const title = p ? `${p.title} | Rudolf Hounlete` : route.notFound ? '404 | Rudolf Hounlete' : `Rudolf Hounlete | ${route.locale === 'fr' ? 'Machine learning & logiciel' : 'Machine learning & software'}`
  const description = p ? getPitch(p.id, route.locale).summary : route.locale === 'fr' ? 'Élève ingénieur à Centrale Casablanca. Machine learning, simulation et développement logiciel : 14 projets documentés, trois médailles Kaggle et Zindi.' : 'Engineering student at Centrale Casablanca. Machine learning, simulation and software development: 14 documented projects, three Kaggle and Zindi medals.'
  return { ...route, title, description, image: p ? projectVisuals[p.id].src : '/images/portrait.webp', path: p ? projectPath(p.id, route.locale) : homePath(route.locale) }
}
