/**
 * Signature motif for the "Atlas scientifique" direction.
 * A real soliton profile — a superposition of sech² pulses, the canonical
 * shape of a Korteweg–de Vries soliton — drawn as a faint decorative curve.
 * Ties the visual identity to the physics / data universe (and project 05).
 */

type SolitonWaveProps = {
  className?: string
  /** Stroke opacity (0–1). */
  opacity?: number
}

const PULSES = [
  { x0: 0.28, amp: 0.66, w: 0.05 },
  { x0: 0.55, amp: 0.42, w: 0.07 },
  { x0: 0.8, amp: 0.27, w: 0.095 },
]

function sech(x: number) {
  return 1 / Math.cosh(x)
}

/** Builds an SVG path for the soliton profile across a unit-mapped viewBox. */
function buildPath(width: number, height: number, samples = 220) {
  const pts: string[] = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    let y = 0
    for (const p of PULSES) {
      const s = sech((t - p.x0) / p.w)
      y += p.amp * s * s
    }
    const px = t * width
    const py = height - y * height * 0.86 - 2
    pts.push(`${px.toFixed(1)} ${py.toFixed(1)}`)
  }
  return 'M' + pts.join(' L ')
}

export function SolitonWave({ className = '', opacity = 0.5 }: SolitonWaveProps) {
  const W = 1200
  const H = 220
  const d = buildPath(W, H)

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        d={d}
        stroke="rgb(var(--accent))"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
