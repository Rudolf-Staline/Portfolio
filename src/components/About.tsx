import { profile } from '../data/profile'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function About() {
  return (
    <Section id="a-propos" eyebrow="À propos" title="Cadrer, découper, livrer.">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="space-y-5">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-xl border border-line bg-surface p-6">
            <p className="eyebrow mb-4">Centres d'intérêt</p>
            <ul className="space-y-3">
              {profile.interests.map((interest) => (
                <li key={interest} className="flex items-center gap-3 text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
