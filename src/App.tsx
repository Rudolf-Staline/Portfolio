import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'

const email = 'rudolfhounlete1@gmail.com'
const github = 'https://github.com/rudolf-staline'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Cross() {
  return <span className="cross" aria-hidden="true">+</span>
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

      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Retour en haut">
          <span>R/H</span>
          <b>Rudolf<br />Hounlété</b>
        </a>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navigation principale">
          <a href="#work" onClick={() => setMenuOpen(false)}>01 / Work</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>02 / Method</a>
          <a href="#ledger" onClick={() => setMenuOpen(false)}>03 / Ledger</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>04 / Contact</a>
        </nav>

        <a className="cv-link" href="/CV_Rudolf_HOUNLETE.pdf" download>
          CV.PDF <Arrow />
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
          <div className="hero-system-bar">
            <span>PORTFOLIO / REV.03</span>
            <span>CASABLANCA — MA</span>
            <span className="status"><i /> OPEN TO ENGINEERING INTERNSHIP</span>
          </div>

          <div className="hero-name" aria-label="Rudolf Hounlété">
            <span className="first-name">RUDOLF</span>
            <span className="last-name">HOUNLÉTÉ</span>
          </div>

          <div className="hero-bottom">
            <p className="hero-manifesto">
              Je ne collectionne pas les technologies.<br />
              <strong>Je construis des systèmes, je teste leurs limites et je documente ce qui résiste.</strong>
            </p>

            <div className="hero-spec">
              <div><span>DISCIPLINES</span><b>SOFTWARE / ML / DATA / SYSTEMS</b></div>
              <div><span>POSITION</span><b>ÉLÈVE INGÉNIEUR — CENTRALE CASABLANCA</b></div>
              <div><span>INTENT</span><b>TAKE OWNERSHIP. SHIP. LEARN FAST.</b></div>
            </div>
          </div>

          <div className="hero-stamp" aria-hidden="true">
            <span>BUILD</span><span>TEST</span><span>BREAK</span><span>REPEAT</span>
          </div>
        </section>

        <div className="ticker" aria-label="Domaines techniques">
          <div>
            <span>DEVELOPMENT</span><Cross /><span>MACHINE LEARNING</span><Cross />
            <span>EXPERIMENTAL SYSTEMS</span><Cross /><span>QUANTITATIVE THINKING</span><Cross />
            <span>DEVELOPMENT</span><Cross /><span>MACHINE LEARNING</span><Cross />
          </div>
        </div>

        <section className="work-section" id="work">
          <header className="brutal-heading">
            <span className="section-number">01</span>
            <div>
              <p>SELECTED WORK / FIVE CASE FILES</p>
              <h2>PREUVES<br />DE TRAVAIL.</h2>
            </div>
            <p className="heading-note">Pas de galerie décorative. Chaque dossier montre un problème, une intervention et une manière de raisonner.</p>
          </header>

          <div className="case-files">
            {visibleProjects.map((project, index) => (
              <article className="case-file" key={project.index}>
                <div className="case-index">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{project.featured ? 'PRIMARY' : 'CASE FILE'}</small>
                </div>

                <div className="case-title">
                  <div className="case-meta">
                    <span>{project.context}</span>
                    <span>{project.period}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.tagline}</p>
                </div>

                <div className="case-proof">
                  <p className="proof-label">INTERVENTION /</p>
                  <ol>
                    {project.highlights.slice(0, 3).map((highlight, itemIndex) => (
                      <li key={highlight}>
                        <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                        <p>{highlight}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="case-footer">
                  <p>{project.stack.join(' — ')}</p>
                  {project.links.code ? (
                    <a href={project.links.code} target="_blank" rel="noreferrer">
                      OPEN REPOSITORY <Arrow />
                    </a>
                  ) : (
                    <span>{project.status ?? 'ACADEMIC PROJECT'}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="method-section" id="method">
          <header className="method-header">
            <span className="section-number inverse">02</span>
            <p>OPERATING PRINCIPLES</p>
            <h2>RIGUEUR<br />AVANT<br /><i>DÉCORATION.</i></h2>
          </header>

          <div className="principle-grid">
            <article>
              <span>01 / SYSTEM FIRST</span>
              <h3>Le système avant l’outil.</h3>
              <p>Je cartographie les contraintes, les flux et les points de rupture avant de choisir une technologie.</p>
            </article>
            <article>
              <span>02 / TEST BEFORE CLAIM</span>
              <h3>Une hypothèse doit pouvoir perdre.</h3>
              <p>J’essaie de rendre mes décisions mesurables, reproductibles et faciles à contredire.</p>
            </article>
            <article>
              <span>03 / END TO END</span>
              <h3>Le modèle seul n’est pas le produit.</h3>
              <p>Données, logique métier, backend et interface doivent fonctionner comme un seul mécanisme.</p>
            </article>
            <article>
              <span>04 / DOCUMENT THE EDGE</span>
              <h3>Les limites font partie du résultat.</h3>
              <p>Je documente ce qui échoue, ce qui reste incertain et ce qui doit être renforcé ensuite.</p>
            </article>
          </div>
        </section>

        <section className="ledger-section" id="ledger">
          <header className="brutal-heading ledger-heading">
            <span className="section-number">03</span>
            <div>
              <p>CAPABILITY + TRAJECTORY LEDGER</p>
              <h2>REGISTRE<br />TECHNIQUE.</h2>
            </div>
          </header>

          <div className="ledger-table capabilities">
            <div className="ledger-head"><span>ID</span><span>CAPABILITY</span><span>TOOLS / PRACTICE</span></div>
            {skills.map((group, index) => (
              <div className="ledger-row" key={group.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{group.label}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>

          <div className="education-block">
            <div className="education-title">
              <span>TRAJECTORY</span>
              <h3>FORMATION<br />ACADÉMIQUE</h3>
            </div>
            <div className="education-list">
              {education.map((item, index) => (
                <article key={`${item.school}-${item.detail}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <time>{item.period}</time>
                  <h4>{item.school}</h4>
                  <p>{item.detail}{item.location ? ` — ${item.location}` : ''}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-side">
            <span>04 / CONTACT</span>
            <p>AVAILABLE FOR<br />ENGINEERING<br />INTERNSHIP</p>
          </div>

          <div className="contact-main">
            <p>UN PROBLÈME RÉEL.<br />UNE ÉQUIPE EXIGEANTE.<br />UN PÉRIMÈTRE À PRENDRE.</p>
            <h2>LET’S<br />BUILD.</h2>

            <div className="contact-links">
              <a href={`mailto:${email}`}><span>MAIL</span><b>{email}</b><Arrow /></a>
              <a href={github} target="_blank" rel="noreferrer"><span>CODE</span><b>github.com/rudolf-staline</b><Arrow /></a>
              <a href="/CV_Rudolf_HOUNLETE.pdf" download><span>FILE</span><b>CV_Rudolf_HOUNLETE.pdf</b><Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>RUDOLF HOUNLÉTÉ / CASABLANCA</span>
        <span>NO TEMPLATE. NO NOISE. JUST WORK.</span>
        <span>© 2026</span>
      </footer>
    </div>
  )
}

export default App
