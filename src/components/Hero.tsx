import { profile, contact } from '../data/profile'
import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-spot absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-60" />
        <div className="glow-spot-2 absolute -top-10 right-[-10rem] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          {/* Left: positioning */}
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-muted backdrop-blur">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundImage:
                    'linear-gradient(120deg, rgb(var(--accent)), rgb(var(--accent-2)))',
                }}
              />
              {profile.availability}
            </p>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl">
              Rudolf <span className="gradient-text">Hounlete</span>
            </h1>

            <p className="mt-5 max-w-xl text-xl font-medium text-ink/90">
              {profile.title}
            </p>
            <p className="mt-2 font-mono text-sm text-accent-text">
              {profile.subtitle}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {profile.pitch}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projets" className="btn-primary group">
                Voir les projets
                <ArrowUpRight
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {contact.cv ? (
                <a href={contact.cv} download className="btn-ghost">
                  <DownloadIcon width={16} height={16} />
                  Télécharger le CV
                </a>
              ) : (
                <span
                  title="CV PDF à venir — à fournir par Rudolf"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-5 py-2.5 text-sm font-semibold text-faint"
                >
                  <DownloadIcon width={16} height={16} />
                  CV — bientôt
                </span>
              )}
            </div>

            {/* Socials */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-muted"
              >
                <GitHubIcon width={17} height={17} /> GitHub
              </a>
              {contact.linkedin ? (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-muted"
                >
                  <LinkedInIcon width={17} height={17} /> LinkedIn
                </a>
              ) : (
                <span
                  title="URL LinkedIn à fournir par Rudolf"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-faint"
                >
                  <LinkedInIcon width={17} height={17} /> LinkedIn — bientôt
                </span>
              )}
              <a href={`mailto:${contact.email}`} className="link-line text-muted">
                <MailIcon width={17} height={17} /> Email
              </a>
            </div>
          </div>

          {/* Right: profile fact card */}
          <div
            className="animate-fade-up lg:justify-self-end"
            style={{ animationDelay: '120ms' }}
          >
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Glassy fact panel with a gradient hairline frame. Values from the CV. */
function ProfileCard() {
  return (
    <div className="frame-gradient w-full max-w-sm rounded-2xl bg-surface/70 shadow-lift backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
          Profil
        </span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-accent/70" />
          <span className="h-2 w-2 rounded-full bg-accent-2/70" />
          <span className="h-2 w-2 rounded-full bg-faint/40" />
        </span>
      </div>
      <dl className="px-5 py-2">
        {profile.facts.map((f, i) => (
          <div
            key={f.k}
            className={`flex items-baseline justify-between gap-4 py-3 ${
              i !== 0 ? 'border-t border-line/70' : ''
            }`}
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-faint">
              {f.k}
            </dt>
            <dd className="text-right text-sm font-medium text-ink">{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
