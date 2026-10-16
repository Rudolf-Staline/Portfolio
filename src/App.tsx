import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Sun,
  Moon,
  GithubLogo,
  DownloadSimple,
  Plus,
  X,
} from "@phosphor-icons/react";
import { projects } from "./data/projects";
import { competitions } from "./data/competitions";
import { projectBriefs } from "./data/projectBriefs";
import { projectStories } from "./data/projectStories";
import { education } from "./data/education";
import { skills } from "./data/skills";
import { contact } from "./data/profile";
import type { Project } from "./data/types";

const title: Record<string, string> = {
  risksim: "RiskSim",
  "01": "PediAppend",
  automl: "Autonomous AutoML",
  "02": "Feux intelligents",
  "03": "Analyse Forex",
  "05": "Propagation de solitons",
  neurogolf: "NeuroGolf",
  waxal: "WAXAL ASR",
  geoai: "GeoAI Aquaculture",
  "financial-stress": "Stress financier",
  credit: "African Credit Scoring",
};
const findProject = (id: string) => projects.find((p) => p.index === id)!;
const clean = (value: string) => value.replace(/—/g, "·");

function ExternalLinks({ project }: { project: Project }) {
  const links = [
    project.links.code && {
      href: project.links.code,
      label: "Code source",
      icon: <GithubLogo size={19} />,
    },
    project.links.demo && {
      href: project.links.demo,
      label: "Démo",
      icon: <ArrowUpRight size={19} />,
    },
    project.evidence && {
      href: project.evidence.href,
      label: project.evidence.label,
      icon: <ArrowUpRight size={19} />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];
  return (
    <div className="links">
      {links.map((item) => (
        <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
          {item.label}
          {item.icon}
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      ))}
    </div>
  );
}
function TechnicalNotes({ id }: { id: string }) {
  const story = projectStories[id];
  return (
    <details className="notes">
      <summary>
        Lire les notes techniques <Plus size={17} />
      </summary>
      <div>
        {story.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {story.note && <p className="caveat">{story.note}</p>}
      </div>
    </details>
  );
}
function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-fieldnotes-theme");
      return saved === "dark";
    } catch {
      return false;
    }
  });
  const [active, setActive] = useState("accueil");
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));
    const reveals = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            reveals.unobserve(entry.target);
          }
        }),
      { threshold: 0.04 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveals.observe(el));
    const follow = () => {
      let hash = "";
      try {
        hash = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      const alias: Record<string, string> = {
        "fiche/about": "apropos",
        "fiche/skills": "competences",
        index: "projets",
      };
      if (hash)
        requestAnimationFrame(() =>
          document.getElementById(alias[hash] || hash)?.scrollIntoView(),
        );
    };
    follow();
    window.addEventListener("hashchange", follow);
    return () => {
      observer.disconnect();
      reveals.disconnect();
      window.removeEventListener("hashchange", follow);
    };
  }, []);
  useEffect(() => {
    if (!image) {
      dialog.current?.close();
      return;
    }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [image]);
  const toggle = () =>
    setDark((value) => {
      try {
        localStorage.setItem(
          "portfolio-fieldnotes-theme",
          !value ? "dark" : "light",
        );
      } catch {
        /* Local preference is optional. */
      }
      return !value;
    });
  const shot = (src: string, alt: string, caption: string, kind: string) => (
    <figure className={`shot shot-${kind}`}>
      <button
        type="button"
        onClick={() => setImage({ src, alt })}
        aria-label={`Agrandir : ${alt}`}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <span>
          <Plus size={20} />
        </span>
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
  return (
    <div className="site" data-theme={dark ? "dark" : "light"}>
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <header className="nav">
        <a
          className="mark"
          href="#accueil"
          aria-label="RH. Rudolf Hounlete, accueil"
        >
          RH<span>+</span>
        </a>
        <nav aria-label="Navigation principale">
          {[
            ["projets", "Projets"],
            ["competitions", "Compétitions"],
            ["apropos", "Parcours"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="theme"
          onClick={toggle}
          aria-label={
            dark ? "Activer le thème clair" : "Activer le thème sombre"
          }
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>
      <main id="main" tabIndex={-1}>
        <section id="accueil" data-section className="hero frame">
          <div className="hero-head">
            <span>PORTFOLIO / 2026</span>
            <span>ÉLÈVE INGÉNIEUR · CASABLANCA</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-preface">RUDOLF</p>
              <h1>
                HOUNLETE<span className="period">.</span>
              </h1>
              <p className="hero-lead">
                Des modèles, des systèmes, des essais.
                <br />
                Et les résultats pour les juger.
              </p>
              <a className="button" href="#projets">
                Voir les projets <ArrowDown size={21} />
              </a>
            </div>
            <figure className="portrait">
              <img
                src="/portrait-rudolf.webp"
                alt="Portrait de Rudolf Hounlete"
                width="840"
                height="840"
                fetchPriority="high"
              />
              <figcaption>
                <span>01 / PORTRAIT</span>
                <span>BÉNIN → MAROC</span>
              </figcaption>
            </figure>
          </div>
          <div className="hero-foot">
            <span>CYCLE INGÉNIEUR · PROMOTION 2028</span>
            <span>ÉCOLE CENTRALE CASABLANCA</span>
          </div>
        </section>
        <section className="proof frame reveal" aria-label="Résultats">
          <div>
            <strong>03</strong>
            <span>
              Médailles de bronze
              <br />
              Kaggle et Zindi
            </span>
          </div>
          <a href="#projet/credit">
            <strong>
              02<sup>e</sup>
            </strong>
            <span>
              sur 77
              <br />
              African Credit Scoring
            </span>
            <ArrowUpRight size={19} />
          </a>
          <a href="#projet/financial-stress">
            <strong>
              04<sup>e</sup>
            </strong>
            <span>
              sur 262
              <br />
              Financial Stress Prediction
            </span>
            <ArrowUpRight size={19} />
          </a>
        </section>
        <section id="projets" data-section className="projects frame">
          <span id="index" className="anchor" />
          <header className="section-title reveal">
            <span className="index-no">01 / TRAVAUX</span>
            <h2>
              Projets construits.
              <br />
              <em>Résultats vérifiables.</em>
            </h2>
          </header>
          {(["risksim", "01"] as const).map((id, i) => {
            const p = findProject(id);
            const b = projectBriefs[id];
            return (
              <article
                key={id}
                id={`projet/${id}`}
                className={`feature feature-${id} reveal`}
              >
                <div className="feature-intro">
                  <div className="feature-meta">
                    <span>{String(i + 1).padStart(2, "0")} / PROJET</span>
                    <span>
                      {clean(p.context)} · {clean(p.period)}
                    </span>
                  </div>
                  <h3>{title[id]}</h3>
                  <p className="feature-pitch">{projectStories[id].subtitle}</p>
                  <div className="feature-fact">
                    <strong>{b.metric}</strong>
                    <span>{b.label}</span>
                  </div>
                  <p className="feature-body">{b.body}</p>
                  <p className="stack">{p.stack.join(" / ")}</p>
                  <ExternalLinks project={p} />
                  <TechnicalNotes id={id} />
                </div>
                <div className="feature-media">
                  {id === "risksim" ? (
                    <>
                      {shot(
                        "/projects/risksim-dashboard.png",
                        "Tableau de bord RiskSim, version S5",
                        "01 / Portefeuille des risques. Scénario de démonstration.",
                        "primary",
                      )}
                      {shot(
                        "/projects/risksim-results.png",
                        "Résultats RiskSim, version S5",
                        "02 / Distribution des coûts et sensibilité. Montants illustratifs.",
                        "secondary",
                      )}
                    </>
                  ) : (
                    <>
                      {shot(
                        "/projects/pediappend-interface-symptomes.jpg",
                        "Formulaire des symptômes PediAppend",
                        "01 / Saisie des observations dans le prototype Flask. Aucune donnée patient.",
                        "primary",
                      )}
                      {shot(
                        "/projects/shap_summary_bar.png",
                        "Graphique SHAP du modèle PediAppend",
                        "02 / Importance globale des variables du modèle.",
                        "secondary",
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
          <div className="project-ledger">
            {(["automl", "02", "03", "05"] as const).map((id, i) => {
              const p = findProject(id),
                b = projectBriefs[id];
              return (
                <article
                  id={`projet/${id}`}
                  className="ledger-entry reveal"
                  key={id}
                >
                  <span className="ledger-no">
                    {String(i + 3).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="eyebrow">
                      {clean(p.context)} · {clean(p.period)}
                    </span>
                    <h3>{title[id]}</h3>
                    <p>{b.body}</p>
                    <TechnicalNotes id={id} />
                  </div>
                  <div className="ledger-outcome">
                    <strong>{b.metric}</strong>
                    <span>{b.label}</span>
                    <ExternalLinks project={p} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="competitions" data-section className="competitions frame">
          <header className="section-title reveal">
            <span className="index-no">02 / COMPÉTITIONS</span>
            <h2>
              Classement
              <br />
              <em>et méthode.</em>
            </h2>
          </header>
          <div className="competition-ledger">
            {competitions.map((c, i) => {
              const p = findProject(c.projectId),
                b = projectBriefs[c.projectId];
              return (
                <article
                  id={`projet/${c.projectId}`}
                  className="competition reveal"
                  key={c.projectId}
                >
                  <div className="competition-left">
                    <span className="ledger-no">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      {c.platform} / {c.year}
                    </span>
                  </div>
                  <div className="competition-main">
                    <h3>{c.name}</h3>
                    <p>{b.body}</p>
                    <TechnicalNotes id={c.projectId} />
                    <ExternalLinks project={p} />
                    {c.href && !p.links.code && !p.evidence && (
                      <a
                        className="extra-link"
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {c.linkLabel} <ArrowUpRight size={17} />
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    )}
                  </div>
                  <div className="competition-rank">
                    <strong>{b.metric}</strong>
                    <span>{b.label}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="apropos" data-section className="about frame reveal">
          <div className="about-heading">
            <span className="index-no">03 / PARCOURS</span>
            <h2>
              Du Bénin
              <br />
              <em>à Casablanca.</em>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              À l’École Centrale Casablanca depuis 2025, après une licence en
              technologies de l’information et de la communication et une
              préparation scientifique à l’IMSP.
            </p>
            <p>
              Les projets relient modèles de machine learning, développement
              logiciel et expérimentation. Chaque résultat présenté est
              accompagné de sa méthode, de ses limites ou de son code lorsqu’il
              est public.
            </p>
            <a className="extra-link" href={contact.cv!} download>
              Mon CV <DownloadSimple size={20} />
            </a>
          </div>
        </section>
        <section id="parcours" className="studies frame reveal">
          <h2>Formation</h2>
          <div>
            {education.map((e) => (
              <article key={e.school + e.detail}>
                <span>{clean(e.period) || "Préparation scientifique"}</span>
                <h3>{e.school}</h3>
                <p>{e.detail}</p>
                <small>{e.location}</small>
              </article>
            ))}
          </div>
        </section>
        <section id="competences" className="skills frame reveal">
          <h2>Outils</h2>
          <div>
            {skills.map((g) => (
              <article key={g.label}>
                <h3>{g.label}</h3>
                <p>{g.items.join(" / ")}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" data-section className="contact frame reveal">
          <span className="index-no">04 / CONTACT</span>
          <h2>
            Une idée ?<br />
            <em>Écrivons la suite.</em>
          </h2>
          <a className="email" href={`mailto:${contact.email}`}>
            {contact.email}
            <ArrowUpRight size={32} />
          </a>
          <div className="contact-links">
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub <GithubLogo size={21} />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <a href={contact.cv!} download>
              Mon CV <DownloadSimple size={21} />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer frame">
        <span>© {new Date().getFullYear()} Rudolf Hounlete</span>
        <a href="#accueil">
          Retour en haut <ArrowUpRight size={18} />
        </a>
      </footer>
      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setImage(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setImage(null);
        }}
      >
        <button
          className="close"
          onClick={() => setImage(null)}
          aria-label="Fermer l’image"
        >
          <X size={24} />
        </button>
        {image && <img src={image.src} alt={image.alt} />}
      </dialog>
    </div>
  );
}
export default App;
