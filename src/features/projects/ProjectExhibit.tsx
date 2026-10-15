import type { Project } from '../../data/types'
import { projectStories } from '../../data/projectStories'
import { ProjectVisual, projectVisualKind } from './ProjectVisual'
import { ProjectGallery } from './ProjectGallery'

export function ProjectExhibit({project, order, onOpen, compact=false}:{project:Project;order:string;onOpen:(project:Project)=>void;compact?:boolean}) {
  const story=projectStories[project.index]
  return <article className={`project-exhibit${compact?' exhibit-compact':''}`}>
    <div className="exhibit-copy">
      <div className="exhibit-meta"><span>{order} / {project.category}</span><span>{project.period}</span></div>
      <h3>{project.title}</h3><p className="exhibit-subtitle">{story.subtitle}</p>
      <div className="exhibit-prose">{story.paragraphs.map(text=><p key={text}>{text}</p>)}</div>
      <dl className="exhibit-details"><div><dt>Approche</dt><dd>{story.method}</dd></div><div><dt>Réalisation</dt><dd>{story.result}</dd></div></dl>
      <div className="exhibit-stack">{project.stack.map(tech=><span key={tech}>{tech}</span>)}</div>
      <div className="exhibit-links"><button className="text-link" type="button" onClick={()=>onOpen(project)}>Ouvrir la fiche complète <span aria-hidden="true">↗</span></button>{project.links.code&&<a className="text-link" href={project.links.code} target="_blank" rel="noreferrer">Explorer le code <span aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>}</div>
    </div>
    <div className="exhibit-visual">{project.index==='01'?<ProjectGallery kind="clinical"/>:<ProjectVisual kind={projectVisualKind[project.index]??'automl'}/>}</div>
  </article>
}
