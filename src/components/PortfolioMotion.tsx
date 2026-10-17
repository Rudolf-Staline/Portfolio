import { useEffect, useRef, useState } from 'react'

export type IconName =
  | 'spark' | 'award' | 'code' | 'trend' | 'flask' | 'radar' | 'layers'
  | 'audio' | 'grid' | 'planet' | 'heart' | 'chart' | 'shield'
  | 'school' | 'mail' | 'external' | 'arrow-down' | 'arrow-up'
  | 'arrow-right' | 'bolt' | 'compass' | 'globe' | 'terminal' | 'check'

const shapes: Record<IconName, JSX.Element> = {
  spark: <><path d="m12 2 1.9 7.1L21 11l-7.1 1.9L12 20l-1.9-7.1L3 11l7.1-1.9L12 2Z"/><path d="m19 18 .8 2.2L22 21l-2.2.8L19 24l-.8-2.2L16 21l2.2-.8L19 18Z" /></>,
  award: <><circle cx="12" cy="8.5" r="5.5"/><path d="m8.2 13-2.4 9 6.2-3.1 6.2 3.1-2.4-9"/><path d="m10.2 8.5 1.3 1.3 2.5-3"/></>,
  code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14.2 4l-4.4 16"/></>,
  trend: <><path d="M3 17.5 9 11l4 3.5L21 5M15 5h6v6"/></>,
  flask: <><path d="M9 3h6M10 3v7l-5.6 8.8A2 2 0 0 0 6.1 22h11.8a2 2 0 0 0 1.7-3.2L14 10V3M7.5 16h9"/></>,
  radar: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 12 19 6M12 3v2m9 7h-2"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
  audio: <><path d="M3 10v4M7 6v12M11 3v18M15 8v8M19 5v14M23 10v4"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><path d="m14 18 2.3 2.2L21 15"/></>,
  planet: <><circle cx="12" cy="12" r="6.5"/><ellipse cx="12" cy="12" rx="11" ry="4.1" transform="rotate(-25 12 12)"/><path d="M9 10.5h.01"/></>,
  heart: <><path d="M20.8 8.3c0 5.2-8.8 11.6-8.8 11.6S3.2 13.5 3.2 8.3a4.7 4.7 0 0 1 8.8-2.1 4.7 4.7 0 0 1 8.8 2.1Z"/><path d="M5.3 12h3.4l1.8-3 2.5 6 1.8-3h3.8"/></>,
  chart: <><path d="M4 20V4M4 20h17"/><path d="m7 16 4-5 3 2 5-8"/><circle cx="19" cy="5" r="1"/></>,
  shield: <><path d="M12 2.5 20 6v6c0 5-3.2 8.3-8 10-4.8-1.7-8-5-8-10V6l8-3.5Z"/><path d="m8.5 12 2.3 2.3 4.7-4.7"/></>,
  school: <><path d="m2 10 10-6 10 6-10 6-10-6ZM6 13v5c4 3 8 3 12 0v-5M22 10v7"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  external: <><path d="M13 4h7v7M20 4l-10 10"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></>,
  'arrow-down': <><path d="M12 3v18m-7-7 7 7 7-7"/></>,
  'arrow-up': <><path d="M12 21V3m-7 7 7-7 7 7"/></>,
  'arrow-right': <><path d="M3 12h18m-7-7 7 7-7 7"/></>,
  bolt: <><path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 4.5-4 13.5 0 18M12 3c4 4.5 4 13.5 0 18"/></>,
  terminal: <><rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="m6 9 3 3-3 3m6 0h5"/></>,
  check: <><path d="m4 12 5 5L20 6"/></>,
}

export function IconMark({
  name, size = 22, className = '',
}: { name: IconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>
}

/** Scroll-linked progression with reduced-motion-aware, one-time reveals.
 * No scroll library or perpetual requestAnimationFrame loop.
 */
export function MotionEnhancer() {
  const bar = useRef<HTMLDivElement>(null)
  const [topVisible, setTopVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(
      '.motion-in, .project-expanded, .expanded-skills-card, .contact-card, .education-card, .about-card'
    ))
    let observer: IntersectionObserver | undefined
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      nodes.forEach(node => node.classList.add('motion-pending'))
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('motion-visible')
          observer?.unobserve(entry.target)
        }
      }, { rootMargin: '0px 0px -42px 0px', threshold: 0.08 })
      nodes.forEach(node => observer?.observe(node))
    }

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, window.scrollY / max))
        if (bar.current) bar.current.style.transform = `scaleX(${progress})`
        const visible = window.scrollY > window.innerHeight * 0.7
        setTopVisible(old => old === visible ? old : visible)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const hoverTargets = Array.from(document.querySelectorAll<HTMLElement>('.project-expanded, .social-card'))
    const cleanup = hoverTargets.map(node => {
      const pointer = (event: PointerEvent) => {
        if (prefersReducedMotion || event.pointerType !== 'mouse') return
        const rect = node.getBoundingClientRect()
        node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      }
      node.addEventListener('pointermove', pointer, { passive: true })
      return () => node.removeEventListener('pointermove', pointer)
    })

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
      cleanup.forEach(fn => fn())
    }
  }, [])

  return <>
    <div className="reading-progress" aria-hidden="true"><div ref={bar} /></div>
    <button type="button" className={`return-top ${topVisible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}
      aria-label="Retourner en haut de la page">
      <IconMark name="arrow-up" size={19} /><span>Haut</span>
    </button>
  </>
}
