import type { Project } from '../data/types'
import { ArrowUpRight, CodeIcon, GitHubIcon, LockIcon } from './icons'
import { SolitonWave } from './Motif'

export function ProjectCard({ project }: { project: Project }) {
  if (project.placeholder) return <PlaceholderCard project={project} />

  const { featured } = project

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded border bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover sm:p-7 ${
        featured
          ? 'border-accent/40 hover:border-accent/70'
          : 'border-line hover:border-accent/50'
      }`}
    >
      {/* Featured: amber edge */}
      {featured && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
      )}

      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-lg font-medium text-accent-text">
            {project.index}
          </span>
          {featured && (
            <span className="rounded-sm bg-accent-soft px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-accent-text">
              Projet phare
            </span>
          )}
          {project.status && (
            <span className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-muted">
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
            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
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
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 font-mono text-sm">
        {project.links.code ? (
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-medium"
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
            className="link-line font-medium"
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
    <article className="relative flex h-full min-h-[16rem] flex-col overflow-hidden rounded border border-dashed border-line bg-surface/40 p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-lg font-medium text-faint">
          {project.index}
        </span>
        <span className="rounded-sm border border-dashed border-line px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-faint">
          À venir
        </span>
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight text-ink/75">
        {project.title}
      </h3>
      <p className="mt-1.5 font-mono text-xs text-faint">{project.context}</p>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-faint">
        Fiche en préparation — le contenu de ce projet sera publié prochainement.
      </p>

      {/* Decorative soliton glyph (nods to the project name) */}
      <div className="mt-auto pt-6">
        <SolitonWave className="h-10 w-full" opacity={0.35} />
      </div>
    </article>
  )
}
