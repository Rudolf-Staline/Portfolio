import { useState } from 'react'
import { navItems } from '../data/nav'
import { useActiveSection } from '../hooks/useActiveSection'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = ['accueil', ...navItems.map((n) => n.id)]

type NavProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
      <nav
        aria-label="Navigation principale"
        className="container-content flex h-16 items-center justify-between gap-4"
      >
        {/* Monogram brand */}
        <a href="#accueil" className="group inline-flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-accent-ink shadow-soft"
            style={{ backgroundImage: 'var(--grad-cta)' }}
          >
            RH
          </span>
          <span className="hidden text-sm font-semibold text-ink sm:inline">
            Rudolf&nbsp;Hounlete
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-accent-soft text-accent-text'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-accent/50 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden">
          <ul className="container-content flex flex-col py-2">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base ${
                      isActive ? 'bg-accent-soft text-accent-text' : 'text-muted'
                    }`}
                  >
                    <span className="font-mono text-xs text-faint">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
