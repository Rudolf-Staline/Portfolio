import { useEffect } from 'react'

/** Groupes dont les enfants apparaissent en cascade, puis éléments isolés. */
const GROUPS = '.intro-card,.social-grid,.expanded-skills-grid,.education-entries,.about-card,.contact-card,.expanded-summary,.three-medals'
const SINGLES = '.collection-intro h2,.collection-intro p,.expanded-prose,.expanded-heading,.risk-interface-section header'

/**
 * Révélations rejouables non bloquantes + parallaxe douce de la sphère.
 * Tout s'arrête si `prefers-reduced-motion` est actif, y compris s'il change en cours de visite.
 */
export function useMotion() {
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let io: IntersectionObserver | undefined
    let frame = 0
    const hero = document.querySelector<HTMLElement>('.intro-card')

    const clear = () => {
      io?.disconnect()
      document.querySelectorAll('[data-reveal],[data-stagger]').forEach(el => {
        el.removeAttribute('data-reveal'); el.removeAttribute('data-stagger'); el.classList.remove('is-in')
        el.querySelectorAll<HTMLElement>(':scope > *').forEach(child => child.style.removeProperty('--i'))
      })
      document.documentElement.removeAttribute('data-motion')
    }

    const pointer = (event: PointerEvent) => {
      if (!hero || event.pointerType !== 'mouse') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--mx', String((event.clientX / innerWidth - .5) * 2))
        hero.style.setProperty('--my', String((event.clientY / innerHeight - .5) * 2))
      })
    }

    const setup = () => {
      clear()
      if (preference.matches) return
      document.documentElement.setAttribute('data-motion', 'on')
      io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // Rejoue à l'entrée ; on ne retire la classe qu'une fois l'élément bien sorti pour éviter le scintillement.
          if (entry.isIntersecting) entry.target.classList.add('is-in')
          else if (entry.boundingClientRect.top > innerHeight || entry.boundingClientRect.bottom < -200) entry.target.classList.remove('is-in')
        })
      }, { threshold: 0, rootMargin: '0px 0px -6% 0px' } /* seuil 0 : les blocs très hauts doivent aussi se révéler */)
      document.querySelectorAll<HTMLElement>(GROUPS).forEach(group => {
        group.setAttribute('data-stagger', '')
        Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(Math.min(i, 8))))
        io!.observe(group)
      })
      document.querySelectorAll<HTMLElement>(SINGLES).forEach(el => { el.setAttribute('data-reveal', ''); io!.observe(el) })
    }

    setup()
    preference.addEventListener('change', setup)
    window.addEventListener('pointermove', pointer, { passive: true })
    return () => {
      preference.removeEventListener('change', setup)
      window.removeEventListener('pointermove', pointer)
      cancelAnimationFrame(frame)
      clear()
    }
  }, [])
}
