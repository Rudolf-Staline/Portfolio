import { education } from '../data/education'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="parcours" index="04" eyebrow="Parcours" title="Formation">
      <ol className="relative border-l border-line pl-6 sm:pl-8">
        {education.map((entry, i) => (
          <Reveal key={`${entry.school}-${entry.detail}`} delay={Math.min(i * 60, 210)}>
            <li className="relative mb-9 last:mb-0">
              <span
                aria-hidden
                className="absolute -left-[1.7rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg sm:-left-[2.2rem]"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {entry.school}
                </h3>
                <span className="font-mono text-xs text-faint">{entry.period}</span>
              </div>
              <p className="mt-1 text-base text-muted">
                {entry.detail}
                {entry.location && <span className="text-faint"> · {entry.location}</span>}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
