import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  // Flagship first, reserved/placeholder slots last, others in source order.
  const rank = (featured?: boolean, placeholder?: boolean) =>
    featured ? 0 : placeholder ? 2 : 1
  const ordered = [...projects].sort(
    (a, b) => rank(a.featured, a.placeholder) - rank(b.featured, b.placeholder),
  )

  return (
    <Section
      id="projets"
      index="02"
      eyebrow="Projets"
      title="Du cadrage à la livraison."
      intro="Chaque projet part d'un problème concret et va jusqu'à une version testable : données, modèle, interface, tests."
    >
      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        {ordered.map((project, i) => (
          <Reveal
            key={project.index}
            delay={Math.min(i * 70, 210)}
            className={`h-full ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
