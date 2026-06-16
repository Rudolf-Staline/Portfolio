import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  /** Swiss section index, e.g. "01". */
  index: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}

/**
 * Publication-style section shell: a fine top rule, a left index rail
 * (number + mono label) and the content column.
 */
export function Section({ id, index, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-content">
        <div className="border-t border-line" />
        <div className="grid gap-x-10 gap-y-7 pt-8 sm:pt-10 lg:grid-cols-[11rem_1fr]">
          {/* Index rail */}
          <Reveal>
            <div className="flex items-center gap-4 lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-2.5">
              <span className="font-mono text-sm font-medium text-accent-text">
                {index}
                <span className="text-faint"> / 06</span>
              </span>
              <p className="mono-label">{eyebrow}</p>
            </div>
          </Reveal>

          {/* Content column */}
          <div>
            <Reveal delay={60}>
              <header className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
                  {title}
                </h2>
                {intro && (
                  <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
                )}
              </header>
            </Reveal>
            <div className="mt-9 sm:mt-11">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
