import { skills } from '../data/skills'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="competences"
      eyebrow="Compétences"
      title="Une stack orientée data, IA et produit."
      intro="Regroupements clairs — sans barres de pourcentage arbitraires."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={Math.min(i * 80, 240)}>
            <div className="h-full rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
