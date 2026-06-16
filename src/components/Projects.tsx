import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  // Flagship project first, then the rest.
  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  )

  return (
    <Section
      id="projets"
      eyebrow="Projets"
      title="Quatre projets, du cadrage à la livraison."
      intro="Chaque projet part d'un problème concret et va jusqu'à une version testable : données, modèle, interface, tests."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {ordered.map((project, i) => (
          <Reveal
            key={project.index}
            delay={Math.min(i * 80, 240)}
            className={project.featured ? 'lg:col-span-2' : ''}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
