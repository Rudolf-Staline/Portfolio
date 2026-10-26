import { projects } from './projects'
import { projectStories } from './projectStories'
import { additionalProjects } from './additionalProjects'
import { pitches } from './pitches'

const plain = (text: string) => text.replace(/[—–]/g, '-')
export type Work = {
  id: string; title: string; group: string; context: string; period: string;
  summary: string; result: string; method: string; paragraphs: string[]; problem?: string;
  stack: string[]; code: string | null; note?: string;
}
const titles: Record<string, string> = { risksim: 'RiskSim', neurogolf: 'NeuroGolf', credit: 'African Credit Scoring', 'financial-stress': 'Stress financier', geoai: 'GeoAI Aquaculture', waxal: 'WAXAL ASR', automl: 'Autonomous AutoML', '01': 'PediAppend', '02': 'Feux intelligents', '03': 'Analyse Forex', '05': 'Propagation de solitons' }
export const work: Work[] = projects.map(p => {
  const story = projectStories[p.index]
  return {
    id: p.index, title: titles[p.index] || p.title,
    group: ['risksim', 'automl', '03'].includes(p.index) ? 'Logiciel' : ['02', '05'].includes(p.index) ? 'Expérimentation' : 'Machine learning',
    context: plain(p.context), period: plain(p.period), summary: plain(p.cardDescription || p.tagline), problem: p.challenge ? plain(p.challenge) : undefined,
    result: plain(story.result), method: plain(story.method), paragraphs: story.paragraphs.map(plain),
    stack: p.stack, code: p.links.code || null, note: story.note ? plain(story.note) : undefined,
  }
})
work.splice(1, 0, {
  id: 'dossier-jaune', title: 'Dossier Jaune', group: 'Logiciel', context: 'Projet d’innovation · Centrale Casablanca', period: '2026',
  summary: 'Réunir les documents d’une commande textile et donner à chaque intervenant un accès adapté.',
  problem: 'Les pièces d’une commande textile circulent entre équipes et clients, avec des accès et des versions à maîtriser.',
  result: 'Un prototype avec dossiers par commande, espace client, droits par sous-dossier et annotations PDF versionnées.',
  method: 'Une application web avec FastAPI, PostgreSQL et stockage Supabase. Les annotations PDF sont enregistrées dans une nouvelle version du document.',
  paragraphs: [
    'Dans une commande textile, les documents circulent entre plusieurs intervenants. Le projet Dossier Jaune rassemble les pièces d’une commande dans un dossier commun, organisé en sous-dossiers métier.',
    'Le prototype prévoit un espace interne et un espace client. Chaque utilisateur accède aux documents selon ses droits. Un lecteur PDF permet d’annoter un fichier et de sauvegarder une nouvelle version.',
    'Je développe la plateforme et fais évoluer son ergonomie au fil des échanges du projet d’innovation. Le périmètre continue de s’affiner avec les retours du terrain.',
  ],
  stack: ['FastAPI', 'JavaScript', 'PostgreSQL', 'Supabase', 'PyMuPDF'], code: 'https://github.com/Rudolf-Staline/Framatex',
  note: 'Projet d’innovation en cours ; la capture présente une version du prototype.',
})
work.push(...additionalProjects)
const order = ['risksim', 'financial-stress', 'dossier-jaune', 'automl', 'neurogolf', 'credit', 'geoai', 'waxal', '01', 'churn-dashboard', '02', 'biohub', '03', '05']
work.sort((a,b) => order.indexOf(a.id) - order.indexOf(b.id))
work.forEach(p => { p.summary = pitches[p.id].summary })
