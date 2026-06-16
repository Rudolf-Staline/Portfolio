import { profile, contact } from '../data/profile'
import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import { SolitonWave } from './Motif'

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Signature background: faint dot lattice + a soliton profile */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="bg-lattice absolute inset-0 opacity-60 dark:opacity-40"
          style={{
            maskImage:
              'radial-gradient(ellipse 78% 58% at 50% 6%, #000 32%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 78% 58% at 50% 6%, #000 32%, transparent 80%)',
          }}
        />
        <SolitonWave
          className="absolute inset-x-0 bottom-[-1px] h-36 w-full sm:h-52"
          opacity={0.45}
        />
      </div>

      <div className="container-content">
        {/* Meta row */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="mono-label">00 / Index</span>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            {profile.availability}
          </span>
        </div>

        {/* Masthead name */}
        <div className="animate-fade-up pt-10 sm:pt-14">
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Rudolf
            <br />
            Hounlete
          </h1>

          {/* Axis rule: short amber segment + fine line */}
          <div className="mt-7 flex items-center" aria-hidden>
            <span className="h-px w-16 bg-accent" />
            <span className="h-px flex-1 bg-line" />
          </div>
        </div>

        {/* Lower band: positioning + spec sheet */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div
            className="animate-fade-up"
            style={{ animationDelay: '90ms' }}
          >
            <p className="max-w-xl font-display text-xl font-medium text-ink sm:text-2xl">
              {profile.title}
            </p>
            <p className="mt-3 font-mono text-sm text-accent-text">
              {profile.subtitle}
            </p>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {profile.pitch}
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projets"
                className="group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
              >
                Voir les projets
                <ArrowUpRight
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {contact.cv ? (
                <a
                  href={contact.cv}
                  download
                  className="inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-5 py-3 font-mono text-sm font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent-text"
                >
                  <DownloadIcon width={16} height={16} />
                  Télécharger le CV
                </a>
              ) : (
                <span
                  title="CV PDF à venir — à fournir par Rudolf"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-sm border border-dashed border-line bg-surface px-5 py-3 font-mono text-sm font-medium text-faint"
                >
                  <DownloadIcon width={16} height={16} />
                  CV — bientôt
                </span>
              )}
            </div>

            {/* Social row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-muted"
              >
                <GitHubIcon width={16} height={16} /> GitHub
              </a>
              {contact.linkedin ? (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-muted"
                >
                  <LinkedInIcon width={16} height={16} /> LinkedIn
                </a>
              ) : (
                <span
                  title="URL LinkedIn à fournir par Rudolf"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-faint"
                >
                  <LinkedInIcon width={16} height={16} /> LinkedIn — bientôt
                </span>
              )}
              <a href={`mailto:${contact.email}`} className="link-line text-muted">
                <MailIcon width={16} height={16} /> Email
              </a>
            </div>
          </div>

          {/* Spec sheet — instrument-style fact panel */}
          <div
            className="animate-fade-up self-start"
            style={{ animationDelay: '160ms' }}
          >
            <SpecSheet />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Factual data sheet — all values sourced from the CV. */
function SpecSheet() {
  return (
    <div className="rounded border border-line bg-surface/80 shadow-card backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="mono-label">Fiche profil</span>
        <span className="font-mono text-[0.7rem] text-faint">rudolf.profil</span>
      </div>
      <dl>
        {profile.facts.map((f, i) => (
          <div
            key={f.k}
            className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
              i !== 0 ? 'border-t border-line' : ''
            }`}
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-faint">
              {f.k}
            </dt>
            <dd className="text-right font-mono text-sm text-ink">{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
