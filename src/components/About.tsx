import { profile } from '../data/profile'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function About() {
  return (
    <Section id="a-propos" index="01" eyebrow="À propos" title="Cadrer, découper, livrer.">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded border border-line bg-surface p-6">
            <p className="mono-label mb-4">Centres d'intérêt</p>
            <ul className="space-y-3">
              {profile.interests.map((interest) => (
                <li key={interest} className="flex items-center gap-3 text-ink">
                  <span aria-hidden className="h-px w-3 shrink-0 bg-accent" />
                  <span className="text-base">{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
