import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  /** Section index, e.g. "01". */
  index: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}

/** Section shell with a numbered eyebrow and heading. */
export function Section({ id, index, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-content">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            <p className="eyebrow flex items-center gap-2.5">
              <span>{index}</span>
              <span aria-hidden className="h-px w-7 bg-accent/50" />
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
            )}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
