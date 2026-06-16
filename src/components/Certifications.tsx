import { certifications, languages } from '../data/certifications'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Certifications() {
  return (
    <Section
      id="certifications"
      index="05"
      eyebrow="Certifications & langues"
      title="Certifications recentrées data / ML."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Certifications */}
        <Reveal>
          <h3 className="mono-label border-b border-line pb-3">Certifications</h3>
          <ul className="mt-4 space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert.title}
                className="flex items-start justify-between gap-4 rounded border border-line bg-surface p-5"
              >
                <div>
                  <p className="font-display font-semibold text-ink">{cert.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{cert.issuer}</p>
                </div>
                <span
                  className={`shrink-0 rounded-sm px-2.5 py-1 font-mono text-[0.7rem] font-medium ${
                    cert.status === 'in-progress'
                      ? 'border border-line text-muted'
                      : 'bg-accent-soft text-accent-text'
                  }`}
                >
                  {cert.date}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Languages */}
        <Reveal delay={120}>
          <h3 className="mono-label border-b border-line pb-3">Langues</h3>
          <ul className="mt-4 space-y-3">
            {languages.map((lang) => (
              <li
                key={lang.language}
                className="flex items-center justify-between gap-4 rounded border border-line bg-surface p-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-semibold text-ink">
                    {lang.language}
                  </span>
                  <span className="rounded-sm bg-surface-2 px-2 py-0.5 font-mono text-xs text-accent-text">
                    {lang.level}
                  </span>
                </div>
                {lang.target && (
                  <span className="text-right text-sm text-muted">→ {lang.target}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
