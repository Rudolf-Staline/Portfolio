import { profile, contact } from '../data/profile'
import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Background: subtle grid + accent glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--line)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
          }}
        />
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-fade-up">
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Disponible pour un stage technique
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-xl font-display text-lg font-medium text-ink/90 sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-2 font-mono text-sm text-accent">{profile.subtitle}</p>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {profile.pitch}
            </p>

            {/* Primary CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projets"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Voir les projets
                <ArrowUpRight width={16} height={16} />
              </a>

              {contact.cv ? (
                <a
                  href={contact.cv}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <DownloadIcon width={16} height={16} />
                  Télécharger le CV
                </a>
              ) : (
                <span
                  title="CV PDF à venir — à fournir par Rudolf"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line bg-surface px-5 py-2.5 text-sm font-semibold text-faint"
                >
                  <DownloadIcon width={16} height={16} />
                  CV — bientôt
                </span>
              )}
            </div>

            {/* Social row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-muted"
              >
                <GitHubIcon width={17} height={17} /> GitHub
              </a>
              {contact.linkedin ? (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-medium text-muted"
                >
                  <LinkedInIcon width={17} height={17} /> LinkedIn
                </a>
              ) : (
                <span
                  title="URL LinkedIn à fournir par Rudolf"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-medium text-faint"
                >
                  <LinkedInIcon width={17} height={17} /> LinkedIn — bientôt
                </span>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="link-underline text-sm font-medium text-muted"
              >
                <MailIcon width={17} height={17} /> Email
              </a>
            </div>
          </div>

          {/* Decorative technical card */}
          <div className="hidden animate-fade-up lg:block" style={{ animationDelay: '120ms' }}>
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  )
}

/** A small "code editor" styled summary — purely decorative, mirrors the CV facts. */
function ProfileCard() {
  return (
    <div className="rounded-xl border border-line bg-surface/80 shadow-card backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-faint/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/30" />
        <span className="ml-2 font-mono text-xs text-faint">profile.py</span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.78rem] leading-relaxed text-muted">
        <code>
          <span className="text-accent">class</span> Rudolf:{'\n'}
          {'  '}focus = [<span className="text-ink">"data"</span>, <span className="text-ink">"ml"</span>, <span className="text-ink">"dev"</span>]{'\n'}
          {'  '}school = <span className="text-ink">"Centrale Casablanca"</span>{'\n'}
          {'  '}promo = <span className="text-ink">2028</span>{'\n'}
          {'\n'}
          {'  '}<span className="text-accent">def</span> method(self):{'\n'}
          {'    '}<span className="text-faint"># cadrer, découper,</span>{'\n'}
          {'    '}<span className="text-faint"># livrer une v1 testable</span>{'\n'}
          {'    '}<span className="text-accent">return</span> <span className="text-ink">"ship"</span>
        </code>
      </pre>
    </div>
  )
}
