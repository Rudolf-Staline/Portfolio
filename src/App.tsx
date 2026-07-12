import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'

const email = 'rudolfhounlete1@gmail.com'
const github = 'https://github.com/rudolf-staline'

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function ProjectIndex({ value }: { value: string }) {
  return <span className="project-index" aria-hidden="true">P/{value}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleProjects = projects.filter((project) => !project.placeholder)

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Aller au contenu</a>

      <header className="topbar">
        <a className="identity" href="#top" aria-label="Retour en haut">
          <span className="identity-mark">RH</span>
          <span className="identity-copy">Rudolf Hounlété<br /><small>Portfolio d’ingénieur</small></span>
        </a>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navigation principale">
          <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#approche" onClick={() => setMenuOpen(false)}>Approche</a>
          <a href="#parcours" onClick={() => setMenuOpen(false)}>Parcours</a>
          <a href={`mailto:${email}`} onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <a className="topbar-cta" href="/CV_Rudolf_HOUNLETE.pdf" download>
          Télécharger le CV <Arrow />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-label">CASABLANCA / 2026 / PORTFOLIO 02</div>

          <div className="hero-heading">
            <p className="eyebrow"><span>Élève ingénieur</span> · logiciel, IA appliquée, données</p>
            <h1>
              Je construis des systèmes<br />
              <em>qui résistent au réel.</em>
            </h1>
          </div>

          <div className="hero-foot">
            <p className="hero-intro">
              Du problème mal cadré au prototype testable : architecture, données,
              modèle et interface réunis dans une même logique de produit.
            </p>

            <aside className="hero-brief" aria-label="Informations principales">
              <div><span>01</span><p>École Centrale Casablanca<br /><b>Cycle ingénieur</b></p></div>
              <div><span>02</span><p>Recherche<br /><b>Stage ingénieur</b></p></div>
              <div><span>03</span><p>Mobilité<br /><b>Maroc · International</b></p></div>
            </aside>
          </div>

          <div className="hero-signature" aria-hidden="true">HOUNLÉTÉ</div>
        </section>

        <section className="manifesto" aria-label="Positionnement">
          <span>Développement logiciel</span>
          <i>×</i>
          <span>Machine learning</span>
          <i>×</i>
          <span>Systèmes expérimentaux</span>
          <i>×</i>
          <span>Analyse quantitative</span>
        </section>

        <section className="projects-section" id="projets">
          <header className="section-header">
            <div className="section-code">01 / TRAVAUX SÉLECTIONNÉS</div>
            <div>
              <h2>Des projets comme<br /><em>preuves de travail.</em></h2>
              <p>Chaque projet montre une manière de raisonner : décomposer, tester, mesurer, puis améliorer.</p>
            </div>
          </header>

          <div className="project-list">
            {visibleProjects.map((project) => (
              <article className={project.featured ? 'project featured' : 'project'} key={project.index}>
                <ProjectIndex value={project.index} />

                <div className="project-title-block">
                  <div className="project-context">
                    <span>{project.context}</span>
                    <span>{project.period}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                </div>

                <div className="project-evidence">
                  <ol>
                    {project.highlights.slice(0, 3).map((highlight, itemIndex) => (
                      <li key={highlight}><span>{String(itemIndex + 1).padStart(2, '0')}</span>{highlight}</li>
                    ))}
                  </ol>
                  <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>

                <div className="project-link">
                  {project.links.code ? (
                    <a href={project.links.code} target="_blank" rel="noreferrer" aria-label={`Voir le dépôt de ${project.title}`}>
                      Code <Arrow />
                    </a>
                  ) : (
                    <span>{project.status ?? 'Projet académique'}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="approach-section" id="approche">
          <div className="approach-intro">
            <div className="section-code light">02 / MANIÈRE DE TRAVAILLER</div>
            <h2>Pas d’outil<br />sans <em>raison.</em></h2>
            <p>
              Je pars du système : contraintes, flux, hypothèses, points de rupture. Le choix technique vient après.
            </p>
          </div>

          <div className="principles">
            <article><span>01</span><h3>Comprendre</h3><p>Clarifier les variables, les utilisateurs et les compromis avant d’écrire la solution.</p></article>
            <article><span>02</span><h3>Rendre testable</h3><p>Transformer les intuitions en composants mesurables, reproductibles et faciles à contredire.</p></article>
            <article><span>03</span><h3>Relier</h3><p>Faire tenir ensemble données, modèle, backend et interface au lieu d’optimiser chaque couche isolément.</p></article>
          </div>

          <div className="capability-matrix">
            {skills.map((group, index) => (
              <div className="capability-row" key={group.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{group.label}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="journey-section" id="parcours">
          <header className="section-header compact">
            <div className="section-code">03 / FORMATION</div>
            <div><h2>Parcours<br /><em>académique.</em></h2></div>
          </header>

          <div className="timeline">
            {education.map((item, index) => (
              <article key={`${item.school}-${item.detail}`}>
                <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <p className="timeline-period">{item.period}</p>
                <h3>{item.school}</h3>
                <p>{item.detail}{item.location ? ` · ${item.location}` : ''}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-copy">
            <div className="section-code light">04 / CONTACT</div>
            <p className="contact-kicker">Une équipe exigeante. Un problème réel. Un périmètre à prendre.</p>
            <h2>Parlons d’un<br /><em>stage utile.</em></h2>
          </div>

          <div className="contact-actions">
            <a href={`mailto:${email}`}><span>Écrire</span><b>{email}</b><Arrow /></a>
            <a href={github} target="_blank" rel="noreferrer"><span>Explorer</span><b>GitHub</b><Arrow /></a>
            <a href="/CV_Rudolf_HOUNLETE.pdf" download><span>Consulter</span><b>Curriculum vitæ</b><Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <span>Rudolf Hounlété · Casablanca, Maroc</span>
        <span>Conçu comme un dossier de travail · 2026</span>
      </footer>
    </div>
  )
}

export default App
