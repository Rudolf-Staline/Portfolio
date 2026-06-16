import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}

/** Standard section shell: anchor target, eyebrow label, heading, content. */
export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-content">
        <div ref={ref} className="reveal mb-12 max-w-2xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
