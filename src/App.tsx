import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Sun,
  Moon,
  GithubLogo,
  DownloadSimple,
  Medal,
  X,
  Plus,
} from "@phosphor-icons/react";
import { projects } from "./data/projects";
import { competitions } from "./data/competitions";
import { projectStories } from "./data/projectStories";
import { education } from "./data/education";
import { skills } from "./data/skills";
import { contact } from "./data/profile";
import type { Project } from "./data/types";

const names: Record<string, string> = {
  risksim: "RiskSim",
  neurogolf: "NeuroGolf",
  credit: "African Credit Scoring",
  "financial-stress": "Stress financier",
  geoai: "GeoAI Aquaculture",
  waxal: "WAXAL ASR",
  automl: "Autonomous AutoML",
  "01": "PediAppend",
  "02": "Feux intelligents",
  "03": "Analyse Forex",
  "05": "Propagation de solitons",
};
const photos: Record<string, string> = {
  automl: "automl-photo.webp",
  "02": "traffic-night-photo.webp",
  "03": "forex-photo.webp",
  "05": "soliton-photo.webp",
  neurogolf: "neurogolf-photo.webp",
  waxal: "waxal-photo.webp",
  geoai: "geoai-aerial-photo.webp",
  "financial-stress": "financial-photo.webp",
  credit: "credit-photo.webp",
};
const clean = (text: string) => text.replace(/—/g, "·");
const getProject = (id: string) => projects.find((p) => p.index === id)!;

function Links({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.links.code && (
        <a href={project.links.code} target="_blank" rel="noreferrer">
          Code source <GithubLogo size={19} />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      )}
      {project.links.demo && (
        <a href={project.links.demo} target="_blank" rel="noreferrer">
          Démo <ArrowUpRight size={19} />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      )}
      {project.evidence && (
        <a href={project.evidence.href} target="_blank" rel="noreferrer">
          {project.evidence.label}
          <ArrowUpRight size={19} />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      )}
    </div>
  );
}
function Stack({ project }: { project: Project }) {
  return <p className="stack">{project.stack.join(" · ")}</p>;
}

function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-horizontal-theme");
      return saved
        ? saved === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });
  const [active, setActive] = useState("accueil");
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const targets = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    const reveals = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            reveals.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveals.observe(el));
    const follow = () => {
      let hash = "";
      try {
        hash = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      const aliases: Record<string, string> = {
        "fiche/about": "apropos",
        "fiche/skills": "competences",
        index: "projets",
      };
      if (hash)
        requestAnimationFrame(() =>
          document.getElementById(aliases[hash] || hash)?.scrollIntoView(),
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
    if (zoom) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    } else dialog.current?.close();
  }, [zoom]);
  const theme = () =>
    setDark((value) => {
      try {
        localStorage.setItem(
          "portfolio-horizontal-theme",
          !value ? "dark" : "light",
        );
      } catch {
        /* Storage is optional. */
      }
      return !value;
    });
  const capture = (src: string, alt: string, caption: string) => (
    <figure className="capture">
      <button
        onClick={() => setZoom({ src, alt })}
        aria-label={`Agrandir : ${alt}`}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <span className="enlarge">
          <Plus size={22} />
        </span>
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
  return (
    <div className="portfolio" data-theme={dark ? "dark" : "light"}>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <header className="topbar">
        <a
          className="wordmark"
          href="#accueil"
          aria-label="RH. Rudolf Hounlete, accueil"
        >
          RH<span>.</span>
        </a>
        <nav aria-label="Navigation principale">
          {[
            ["projets", "Projets"],
            ["competitions", "Compétitions"],
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
          className="icon-button"
          onClick={theme}
          aria-label={
            dark ? "Activer le thème clair" : "Activer le thème sombre"
          }
        >
          {dark ? <Sun size={21} /> : <Moon size={21} />}
        </button>
      </header>
      <main id="main" tabIndex={-1}>
        <section id="accueil" data-section className="hero wrap">
          <p className="hero-kicker">Élève ingénieur · Centrale Casablanca</p>
          <h1>
            Rudolf
            <br />
            <span>Hounlete.</span>
          </h1>
          <div className="hero-bottom">
            <div>
              <p>
                Machine learning, simulation et logiciels.
                <br />
                Du problème de départ au résultat mesuré.
              </p>
              <a className="button" href="#projets">
                Explorer les projets <ArrowDown size={20} />
              </a>
            </div>
            <a className="hero-note" href="#apropos">
              Du Bénin à Centrale Casablanca.
              <br />
              Le parcours <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-image">
            <img
              src="/portrait-rudolf.webp"
              alt="Rudolf Hounlete"
              width="1254"
              height="1254"
              fetchPriority="high"
            />
          </div>
        </section>
        <section className="credentials wrap reveal" aria-label="Distinctions">
          <div>
            <Medal size={28} />
            <strong>3</strong>
            <span>
              Médailles de bronze
              <br />
              Kaggle & Zindi
            </span>
          </div>
          <a href="#projet/credit">
            <strong>
              2<sup>e</sup>
            </strong>
            <span>
              sur 77 participants
              <br />
              African Credit Scoring
            </span>
            <ArrowUpRight />
          </a>
          <a href="#projet/financial-stress">
            <strong>
              4<sup>e</sup>
            </strong>
            <span>
              sur 262 participants
              <br />
              Financial Stress Prediction
            </span>
            <ArrowUpRight />
          </a>
        </section>
        <section id="projets" data-section className="work wrap">
          <span id="index" className="anchor" />
          <header className="section-head reveal">
            <p className="eyebrow">Logiciel & expérimentation</p>
            <h2>
              Mettre les idées
              <br />
              <span>à l’épreuve.</span>
            </h2>
          </header>
          {["risksim", "01"].map((id, index) => {
            const project = getProject(id);
            const story = projectStories[id];
            return (
              <article
                id={`projet/${id}`}
                key={id}
                className={`flagship flagship-${id}`}
              >
                <header className="project-header reveal">
                  <div className="project-number">0{index + 1}</div>
                  <div>
                    <p className="project-context">
                      {clean(project.context)} · {clean(project.period)}
                    </p>
                    <h3>{names[id]}</h3>
                    <p className="project-subtitle">{story.subtitle}</p>
                  </div>
                  <Links project={project} />
                </header>
                <div className="showcase reveal">
                  {id === "risksim" ? (
                    <>
                      {capture(
                        "/projects/risksim-dashboard.png",
                        "Tableau de bord de RiskSim",
                        "Tableau de bord · version S5, scénario de démonstration.",
                      )}
                      {capture(
                        "/projects/risksim-results.png",
                        "Résultats de simulation RiskSim",
                        "Distribution des coûts, percentiles et sensibilité. Montants illustratifs.",
                      )}
                    </>
                  ) : (
                    <>
                      {capture(
                        "/projects/pediappend-interface-symptomes.jpg",
                        "Formulaire des symptômes de PediAppend",
                        "Prototype Flask · aucune donnée patient affichée.",
                      )}
                      {capture(
                        "/projects/shap_summary_bar.png",
                        "Importance moyenne des variables SHAP",
                        "Analyse globale du modèle, distincte d’une explication individuelle.",
                      )}
                    </>
                  )}
                </div>
                <div className="project-detail reveal">
                  <div className="result-block">
                    <span>Ce qui a été réalisé</span>
                    <p>{story.result}</p>
                    <Stack project={project} />
                  </div>
                  <div className="project-prose">
                    {story.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {story.note && <p className="note">{story.note}</p>}
                  </div>
                </div>
              </article>
            );
          })}
          <div className="side-projects">
            {["automl", "02", "03", "05"].map((id) => {
              const p = getProject(id);
              const story = projectStories[id];
              return (
                <article id={`projet/${id}`} className="study reveal" key={id}>
                  <figure className="study-photo">
                    <img
                      src={`/cinema/${photos[id]}`}
                      alt={`Illustration conceptuelle : ${names[id]}`}
                      loading="lazy"
                    />
                    <figcaption>Illustration conceptuelle</figcaption>
                  </figure>
                  <p className="project-context">
                    {clean(p.context)} · {clean(p.period)}
                  </p>
                  <h3>{names[id]}</h3>
                  <p className="study-intro">{story.subtitle}</p>
                  <div className="small-prose">
                    {story.paragraphs.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                  <p className="study-result">{story.result}</p>
                  <Stack project={p} />
                  <Links project={p} />
                </article>
              );
            })}
          </div>
        </section>
        <section id="competitions" data-section className="competitions wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Kaggle & Zindi</p>
            <h2>
              Des modèles.
              <br />
              <span>Des résultats.</span>
            </h2>
            <p className="section-intro">
              Trois médailles de bronze, et des expériences documentées au-delà
              du classement.
            </p>
          </header>
          <div className="competition-grid">
            {competitions.map((c) => {
              const p = getProject(c.projectId);
              const story = projectStories[c.projectId];
              return (
                <article
                  id={`projet/${c.projectId}`}
                  key={c.projectId}
                  className="competition reveal"
                >
                  <div className="competition-top">
                    <span>
                      {c.platform} · {c.year}
                    </span>
                    {c.medal ? (
                      <span>
                        <Medal size={23} /> Bronze
                      </span>
                    ) : (
                      <strong>{c.result}</strong>
                    )}
                  </div>
                  <h3>{c.name}</h3>
                  <p className="study-intro">{c.detail}</p>
                  <div className="small-prose">
                    {story.paragraphs.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                  <p className="note">{story.note}</p>
                  <Stack project={p} />
                  <Links project={p} />
                  {c.href && !p.links.code && !p.evidence && (
                    <a
                      className="inline-link"
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.linkLabel}
                      <ArrowUpRight size={18} />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>
        <section id="apropos" data-section className="about wrap reveal">
          <div className="about-art">
            <img
              src="/atelier-wave.webp"
              alt="Sculpture conceptuelle en aluminium bleu évoquant une onde"
              loading="lazy"
              width="1536"
              height="1024"
            />
          </div>
          <div className="about-text">
            <h2>
              Curieux par nature.
              <br />
              <span>Ingénieur en formation.</span>
            </h2>
            <p>
              Du Bénin au Maroc, un parcours qui relie l’informatique, les
              mathématiques et l’expérimentation.
            </p>
            <p>
              Après une licence en technologies de l’information et de la
              communication et une préparation scientifique à l’IMSP, entrée à
              l’École Centrale Casablanca en 2025, dans la promotion 2028.
            </p>
            <p>
              Les projets présentés ici passent du code aux données, de la
              simulation à une maquette physique. Leur point commun :
              construire, mesurer, puis comprendre ce qui fonctionne et ce qui
              résiste.
            </p>
            <a className="inline-link" href={contact.cv!} download>
              Mon CV <DownloadSimple size={20} />
            </a>
          </div>
        </section>
        <section id="parcours" className="education wrap reveal">
          <h2>Formation</h2>
          <div>
            {education.map((e) => (
              <article key={e.school + e.detail}>
                <p>{clean(e.period) || "Préparation scientifique"}</p>
                <h3>{e.school}</h3>
                <p>{e.detail}</p>
                <span>{e.location}</span>
              </article>
            ))}
          </div>
        </section>
        <section id="competences" className="skills wrap reveal">
          <h2>Outils de travail</h2>
          <div>
            {skills.map((group) => (
              <article key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join(" / ")}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" data-section className="contact wrap reveal">
          <p className="eyebrow">Contact</p>
          <h2>
            La suite commence
            <br />
            <span>par une conversation.</span>
          </h2>
          <a className="email" href={`mailto:${contact.email}`}>
            {contact.email}
            <ArrowUpRight />
          </a>
          <div className="contact-bottom">
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={20} />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <a href={contact.cv!} download>
              Mon CV <DownloadSimple size={20} />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Rudolf Hounlete</span>
        <a href="#accueil">
          Retour en haut <ArrowUpRight size={18} />
        </a>
      </footer>
      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setZoom(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setZoom(null);
        }}
      >
        <button
          className="icon-button close"
          onClick={() => setZoom(null)}
          aria-label="Fermer l’image"
        >
          <X size={26} />
        </button>
        {zoom && <img src={zoom.src} alt={zoom.alt} />}
      </dialog>
    </div>
  );
}
export default App;
