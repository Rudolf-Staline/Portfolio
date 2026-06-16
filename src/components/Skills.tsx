import { skills } from '../data/skills'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="competences"
      index="03"
      eyebrow="Compétences"
      title="Une stack orientée data, IA et produit."
      intro="Regroupements clairs — sans barres de pourcentage arbitraires."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={Math.min(i * 70, 210)} className="h-full">
            <div className="card card-hover flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between border-b border-line pb-3">
                <h3 className="mono-label">{group.label}</h3>
                <span className="font-mono text-xs text-faint">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent/50"
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
