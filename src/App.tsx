import { useState } from 'react'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'

const email = 'rudolfhounlete1@gmail.com'

function Arrow() {
  return <span aria-hidden>↗</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleProjects = projects.filter((project) => !project.placeholder)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Aller au contenu</a>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Accueil Rudolf Hounlété">
          <span>RH</span><i />
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navigation principale">
          <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#profil" onClick={() => setMenuOpen(false)}>Profil</a>
          <a href="#parcours" onClick={() => setMenuOpen(false)}>Parcours</a>
          <a href={`mailto:${email}`} onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="cv-link" href="/CV_Rudolf_HOUNLETE.pdf" download>CV <Arrow /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
          <span /><span />
        </button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-kicker"><span>01</span> Portfolio — 2026</div>
          <h1>Ingénieur en formation.<br /><em>Constructeur</em> par nature.</h1>
          <div className="hero-bottom">
            <p>Je transforme des problèmes techniques mal cadrés en systèmes testables — du modèle de données à l’interface.</p>
            <div className="availability"><b /> Disponible pour un stage ingénieur<br /><span>Maroc · International</span></div>
          </div>
          <div className="hero-rail" aria-hidden><span>RUDOLF</span><span>HOUNLÉTÉ</span></div>
        </section>

        <section className="projects-section" id="projets">
          <header className="section-head">
            <div><span className="index">02</span><p>Sélection de projets</p></div>
            <h2>Le travail,<br />pas les promesses.</h2>
          </header>

          <div className="project-list">
            {visibleProjects.map((project, index) => (
              <article className="project" key={project.index}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-body">
                  <div className="project-meta"><span>{project.context}</span><span>{project.period}</span></div>
                  <h3>{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <ul className="project-points">
                    {project.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
                <div className="project-action">
                  {project.links.code ? <a href={project.links.code} target="_blank" rel="noreferrer" aria-label={`Voir le code de ${project.title}`}><Arrow /></a> : <span>—</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section" id="profil">
          <div className="profile-title"><span className="index">03</span><h2>Un profil<br /><em>hybride.</em></h2></div>
          <div className="profile-copy">
            <p className="lead">Élève ingénieur à l’École Centrale Casablanca, je travaille à l’intersection du développement logiciel, des données et de l’intelligence artificielle appliquée.</p>
            <p>Mon réflexe : comprendre le système avant de choisir l’outil. Je cherche un stage où contribuer à un produit concret, apprendre au contact d’une équipe exigeante et prendre la responsabilité d’un vrai périmètre technique.</p>
            <a href={`mailto:${email}`} className="text-link">Parlons d’un stage <Arrow /></a>
          </div>
          <div className="skill-grid">
            {skills.map((group) => (
              <div className="skill-group" key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="journey-section" id="parcours">
          <header className="section-head inverse">
            <div><span className="index">04</span><p>Formation</p></div>
            <h2>Parcours<br />académique.</h2>
          </header>
          <div className="timeline">
            {education.map((item, index) => (
              <article key={`${item.school}-${item.detail}`}>
                <span className="timeline-dot">{String(index + 1).padStart(2, '0')}</span>
                <p>{item.period}</p><h3>{item.school}</h3><span>{item.detail}{item.location ? ` — ${item.location}` : ''}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <p>Une équipe. Un problème réel. Un stage.</p>
          <h2>Construisons<br /><em>quelque chose</em><br />qui fonctionne.</h2>
          <div className="contact-links">
            <a href={`mailto:${email}`}>{email} <Arrow /></a>
            <a href="https://github.com/rudolf-staline" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="/CV_Rudolf_HOUNLETE.pdf" download>Curriculum vitæ <Arrow /></a>
          </div>
        </section>
      </main>

      <footer><span>Rudolf Hounlété · Casablanca</span><span>© 2026</span></footer>
    </div>
  )
}

export default App
