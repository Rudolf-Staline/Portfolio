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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line/70 bg-bg/80 backdrop-blur-md">
        <nav
          aria-label="Navigation principale"
          className="container-content flex h-16 items-center justify-between gap-4"
        >
          <a
            href="#accueil"
            className="font-mono text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent"
          >
            <span className="text-accent">~/</span>rudolf
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
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'text-accent'
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
            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-4 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
                />
                <span className={`block h-0.5 w-4 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span
                  className={`block h-0.5 w-4 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
        >
          <ul className="container-content flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base ${
                    active === item.id ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
