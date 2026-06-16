import type { Project } from '../data/types'
import { ArrowUpRight, CodeIcon, GitHubIcon, LockIcon } from './icons'

export function ProjectCard({ project }: { project: Project }) {
  const { featured } = project

  return (
    <article
      className={`group relative flex flex-col rounded-xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card-hover sm:p-8 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Header row */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">{project.index}</span>
          {featured && (
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-accent">
              Projet phare
            </span>
          )}
          {project.status && (
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-muted">
              {project.status}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-faint">{project.period}</span>
      </div>

      <h3
        className={`font-display font-bold tracking-tight text-ink ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl'
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-xs text-muted">{project.context}</p>

      <p
        className={`mt-4 leading-relaxed text-muted ${
          featured ? 'text-lg' : 'text-base'
        }`}
      >
        {project.tagline}
      </p>

      {/* Highlights */}
      <ul className={`mt-5 space-y-2.5 ${featured ? 'sm:columns-2 sm:gap-8' : ''}`}>
        {project.highlights.map((h) => (
          <li
            key={h}
            className="flex gap-2.5 text-sm leading-relaxed text-muted sm:break-inside-avoid"
          >
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
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
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
        {project.links.code ? (
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-semibold"
          >
            <GitHubIcon width={16} height={16} /> Code
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-faint">
            <LockIcon width={16} height={16} /> Code à venir
          </span>
        )}

        {project.links.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-semibold"
          >
            <ArrowUpRight width={16} height={16} /> Démo
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-faint">
            <CodeIcon width={16} height={16} /> Pas de démo
          </span>
        )}
      </div>
    </article>
  )
}
