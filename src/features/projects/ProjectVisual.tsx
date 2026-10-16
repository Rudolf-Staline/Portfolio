import type { CinemaKind } from './CinematicCanvas'

/**
 * Editorial project artwork. These images illustrate a subject, not a product
 * screenshot. Technical evidence and real captures live in ProjectGallery.
 * Keep the image unobstructed: no headings, status badges, or faux player UI.
 */
const imagery: Record<CinemaKind, { src: string; alt: string }> = {
  automl: { src: '/cinema/automl-photo.webp', alt: 'Illustration du travail sur les pipelines de machine learning.' },
  geoai: { src: '/cinema/geoai-aerial-photo.webp', alt: 'Vue aérienne illustrant la détection de bassins aquacoles.' },
  traffic: { src: '/cinema/traffic-night-photo.webp', alt: 'Vue nocturne illustrant la circulation et les feux intelligents.' },
  audio: { src: '/cinema/waxal-photo.webp', alt: 'Illustration de la reconnaissance vocale multilingue.' },
  soliton: { src: '/cinema/soliton-photo.webp', alt: 'Illustration de l’étude expérimentale des signaux et des ondes.' },
  risk: { src: '/cinema/risksim-photo.webp', alt: 'Illustration de la simulation des risques de projet.' },
  forex: { src: '/cinema/forex-photo.webp', alt: 'Illustration de l’analyse des données de marché.' },
  financial: { src: '/cinema/financial-photo.webp', alt: 'Illustration de l’analyse des transactions et du risque financier.' },
  neurogolf: { src: '/cinema/neurogolf-photo.webp', alt: 'Illustration du raisonnement sur des grilles de couleur.' },
  credit: { src: '/cinema/credit-photo.webp', alt: 'Illustration du traitement de données pour le scoring de crédit.' },
  clinical: { src: '/cinema/clinical-photo.webp', alt: 'Illustration de l’intelligence artificielle appliquée à la santé.' },
}

export function ProjectVisual({ kind }: { kind: CinemaKind }) {
  const scene = imagery[kind]
  return (
    <figure className={`folio-visual folio-${kind}`}>
      <div className="folio-visual-image">
        <img src={scene.src} alt={scene.alt} width={1672} height={941} loading="lazy" decoding="async" />
      </div>
      <figcaption>Illustration du sujet · visuel généré, distinct des captures réelles du projet</figcaption>
    </figure>
  )
}

export const projectVisualKind: Record<string, CinemaKind> = {
  automl: 'automl', geoai: 'geoai', waxal: 'audio',
  neurogolf: 'neurogolf', credit: 'credit', risksim: 'risk',
  'financial-stress': 'financial', '01': 'clinical',
  '02': 'traffic', '03': 'forex', '05': 'soliton',
}
