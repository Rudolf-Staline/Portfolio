import { ArrowRight } from '@phosphor-icons/react'
import { architecture } from '../data/architecture'
import type { Locale } from '../data/architecture'

export default function Architecture({ id, locale }: { id: string; locale: Locale }) {
  const data = architecture[id]?.[locale]
  if (!data) return null
  return <section className="architecture-panel" aria-labelledby={`architecture-${id}`}>
    <div className="architecture-heading"><h2 id={`architecture-${id}`}>{data.title}</h2><p>{data.description}</p></div>
    <ol className="architecture-flow">{data.nodes.map((node, i) => <li key={node.title}>
      <div className="architecture-node"><span className="architecture-index">{String(i + 1).padStart(2, '0')}</span><h3>{node.title}</h3><p>{node.detail}</p>{node.owner && <small>{node.owner}</small>}</div>
      {i < data.nodes.length - 1 && <ArrowRight className="architecture-arrow" size={20} aria-hidden="true"/>}
    </li>)}</ol>
    <ul className="architecture-checks">{data.checks.map(c => <li key={c}>{c}</li>)}</ul>
    <p className="architecture-note">{data.note}</p>
    <a className="text-button" href={`/architecture/${id}-${locale}.svg`} download>{locale === 'fr' ? 'Télécharger le schéma SVG' : 'Download the SVG diagram'} <ArrowRight size={18}/></a>
  </section>
}
