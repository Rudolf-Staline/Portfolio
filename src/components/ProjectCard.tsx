import type { Project } from '../data/types'
import { ArrowUpRight, CodeIcon, GitHubIcon, LockIcon } from './icons'

export function ProjectCard({ project }: { project: Project }) {
  if (project.placeholder) return <PlaceholderCard project={project} />

  const { featured } = project

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
        featured ? 'frame-gradient' : 'border border-line hover:border-accent/40'
      }`}
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft font-mono text-sm font-semibold text-accent-text">
            {project.index}
          </span>
          {featured && (
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-accent-ink"
              style={{ backgroundImage: 'var(--grad-cta)' }}
            >
              Projet phare
            </span>
          )}
          {project.status && (
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-muted">
              {project.status}
            </span>
          )}
        </div>
        {project.period && (
          <span className="shrink-0 font-mono text-xs text-faint">
            {project.period}
          </span>
        )}
      </div>

      <h3
        className={`font-display font-bold tracking-tight text-ink ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl'
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-1.5 font-mono text-xs text-faint">{project.context}</p>

      <p
        className={`mt-4 leading-relaxed text-muted ${
          featured ? 'text-lg' : 'text-base'
        }`}
      >
        {project.tagline}
      </p>

      {/* Highlights */}
      <ul className={`mt-5 space-y-3 ${featured ? 'sm:columns-2 sm:gap-8 sm:space-y-0' : ''}`}>
        {project.highlights.map((h) => (
          <li
            key={h}
            className="flex gap-3 text-sm leading-relaxed text-muted sm:mb-3 sm:break-inside-avoid"
          >
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, rgb(var(--accent)), rgb(var(--accent-2)))',
              }}
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="tag group-hover:border-accent/30">
            {tech}
          </li>
        ))}
      </ul>

      {/* Links */}
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 text-sm">
        {project.links.code ? (
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-semibold"
          >
            <GitHubIcon width={16} height={16} /> Code
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-faint">
            <LockIcon width={16} height={16} /> Code à venir
          </span>
        )}

        {project.links.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-semibold"
          >
            <ArrowUpRight width={16} height={16} /> Démo
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-faint">
            <CodeIcon width={16} height={16} /> Pas de démo
          </span>
        )}
      </div>
    </article>
  )
}

/** Reserved slot — real project whose content is not yet provided. */
function PlaceholderCard({ project }: { project: Project }) {
  return (
    <article className="relative flex h-full min-h-[15rem] flex-col justify-between rounded-2xl border border-dashed border-line bg-surface/50 p-6 sm:p-8">
      <div>
        <div className="mb-5 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-dashed border-line font-mono text-sm font-semibold text-faint">
            {project.index}
          </span>
          <span className="rounded-full border border-dashed border-line px-2.5 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-faint">
            À venir
          </span>
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-ink/70">
          {project.title}
        </h3>
        <p className="mt-1.5 font-mono text-xs text-faint">{project.context}</p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-faint">
          Fiche en préparation — le contenu de ce projet sera publié prochainement.
        </p>
      </div>
    </article>
  )
}
