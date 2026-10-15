import { useEffect, type RefObject } from 'react'

/** Reveals are driven by visibility in the native scroll container. */
export function useSlideMotion(deck: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = deck.current
    if (!root || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const selectors = [
      '.hero-copy > *', '.hero-art-frame', '.hero-topline > *', '.editorial-hero h1', '.hero-introduction > *', '.hero-achievement',
      '.about-section h2', '.about-section .eyebrow', '.about-text', '.about-section .text-link', '.about-facts > div',
      '.expertise-lead > :not(.expertise-decoration)', '.expertise-group',
      '.awards-heading h2', '.awards-heading .eyebrow', '.award-total', '.medal-card', '.ranking-card',
      '.internship-story > *', '.internship-blueprint', '.delivery-steps > li', '.delivery-release', '.blueprint-stack',
      '.projects-section .section-heading h2', '.projects-section .eyebrow', '.projects-section .section-note', '.work-card', '.other-projects',
      '.project-exhibit .exhibit-copy > h3', '.subsection-heading', '.experience-heading', '.experience-copy > p', '.student-notebook', '.journey-section h2', '.journey-section .eyebrow', '.education-list article',
      '.contact-section h2', '.contact-section .eyebrow', '.contact-section p:not(.eyebrow)', '.contact-section .button', '.contact-links',
    ].join(', ')
    const elements = Array.from(root.querySelectorAll<HTMLElement>(selectors))
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(':scope > section'))
    let phaseFrame = 0
    let pointerFrame = 0
    let positions: { scene: HTMLElement; top: number; height: number }[] = []
    const portrait = root.querySelector<HTMLElement>('.hero-art-frame')
    const phaseProperties = ['--scene-scale', '--scene-shift', '--scene-opacity', '--scene-radius']
    const resetPointer = () => {
      cancelAnimationFrame(pointerFrame)
      portrait?.style.setProperty('--portrait-x', '0px')
      portrait?.style.setProperty('--portrait-y', '0px')
      portrait?.style.setProperty('--portrait-tilt', '0deg')
    }
    const updatePhase = () => {
      if (preference.matches) return
      const viewport = root.clientHeight
      const scroll = root.scrollTop
      root.style.setProperty('--scroll-progress', String(scroll / Math.max(1, root.scrollHeight - viewport)))
      positions.forEach(({ scene, top, height }) => {
        // Keep long sections stable while their content is being read.
        const entering = Math.max(0, top - scroll) / viewport
        const leaving = Math.max(0, scroll - (top + height - viewport)) / viewport
        const phase = Math.min(1, Math.max(entering, leaving))
        scene.style.setProperty('--scene-scale', String(1 - phase * 0.035))
        scene.style.setProperty('--scene-shift', `${(entering > leaving ? 28 : -20) * phase}px`)
        scene.style.setProperty('--scene-opacity', String(1 - phase * 0.25))
        scene.style.setProperty('--scene-radius', `${phase * 16}px`)
      })
    }
    const schedulePhase = () => {
      cancelAnimationFrame(phaseFrame)
      phaseFrame = requestAnimationFrame(updatePhase)
    }
    const measure = () => {
      positions = scenes.map(scene => ({ scene, top: scene.offsetTop, height: scene.offsetHeight }))
      schedulePhase()
    }
    const pointerMove = (event: PointerEvent) => {
      if (preference.matches || event.pointerType !== 'mouse' || !portrait || !scenes[0].classList.contains('scene-visible')) return
      const x = (event.clientX / root.clientWidth - .5) * 2
      const y = (event.clientY / root.clientHeight - .5) * 2
      cancelAnimationFrame(pointerFrame)
      pointerFrame = requestAnimationFrame(() => {
        portrait.style.setProperty('--portrait-x', `${x * 14}px`)
        portrait.style.setProperty('--portrait-y', `${y * 10}px`)
        portrait.style.setProperty('--portrait-tilt', `${x * 1.8}deg`)
      })
    }
    const resize = new ResizeObserver(measure)
    resize.observe(root)
    scenes.forEach(scene => resize.observe(scene))
    root.addEventListener('scroll', schedulePhase, { passive: true })
    root.addEventListener('pointermove', pointerMove, { passive: true })
    root.addEventListener('pointerleave', resetPointer)
    let reveals: IntersectionObserver | undefined
    let visibility: IntersectionObserver | undefined

    const configure = () => {
      reveals?.disconnect()
      visibility?.disconnect()
      if (preference.matches) {
        elements.forEach(element => element.classList.remove('motion-item', 'is-visible'))
        scenes.forEach(scene => { scene.classList.remove('motion-scene', 'scene-visible'); phaseProperties.forEach(property => scene.style.removeProperty(property)) })
        root.style.removeProperty('--scroll-progress')
        resetPointer()
        return
      }
      reveals = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
          else if (!entry.target.contains(document.activeElement)) entry.target.classList.remove('is-visible')
        })
      }, { root, rootMargin: '-82px 0px -72px 0px', threshold: 0.08 })
      visibility = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('scene-visible', entry.isIntersecting))
      }, { root, threshold: 0 })
      elements.forEach(element => {
        const siblings = Array.from(element.parentElement?.children ?? [])
        element.style.setProperty('--motion-delay', `${Math.min(siblings.indexOf(element) * 65, 260)}ms`)
        element.dataset.motionKind = element.matches('h1, h2') ? 'heading' : element.matches('.expertise-group, .medal-card, .work-card, .internship-blueprint') ? 'card' : 'block'
        element.classList.add('motion-item')
        reveals!.observe(element)
      })
      scenes.forEach(scene => { scene.classList.add('motion-scene'); visibility!.observe(scene) })
      measure()
    }
    configure()
    preference.addEventListener('change', configure)
    return () => {
      reveals?.disconnect()
      visibility?.disconnect()
      preference.removeEventListener('change', configure)
      resize.disconnect()
      cancelAnimationFrame(phaseFrame)
      cancelAnimationFrame(pointerFrame)
      root.removeEventListener('scroll', schedulePhase)
      root.removeEventListener('pointermove', pointerMove)
      root.removeEventListener('pointerleave', resetPointer)
      root.style.removeProperty('--scroll-progress')
      resetPointer()
      elements.forEach(element => { element.classList.remove('motion-item', 'is-visible'); element.style.removeProperty('--motion-delay'); delete element.dataset.motionKind })
      scenes.forEach(scene => { scene.classList.remove('motion-scene', 'scene-visible'); phaseProperties.forEach(property => scene.style.removeProperty(property)) })
    }
  }, [deck])
}
