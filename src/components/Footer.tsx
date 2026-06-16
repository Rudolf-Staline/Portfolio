import { profile, contact } from '../data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="container-content flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="font-mono text-xs text-faint">
          © {year} {profile.name} · Construit avec Vite, React &amp; Tailwind
        </p>
        <div className="flex items-center gap-5 font-mono text-xs">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent-text"
          >
            GitHub
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-muted transition-colors hover:text-accent-text"
          >
            Email
          </a>
          <a
            href="#accueil"
            className="text-muted transition-colors hover:text-accent-text"
          >
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
