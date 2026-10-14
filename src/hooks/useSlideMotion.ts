import { useEffect, type RefObject } from 'react'

/** Reveals are driven by visibility in the native scroll container. */
export function useSlideMotion(deck: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = deck.current
    if (!root || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const selectors = [
      '.hero-copy > *', '.hero-art-frame',
      '.about-section h2', '.about-section .eyebrow', '.about-text', '.about-section .text-link', '.about-facts > div',
      '.expertise-lead > :not(.expertise-decoration)', '.expertise-group',
      '.awards-heading h2', '.awards-heading .eyebrow', '.award-total', '.medal-card', '.ranking-card',
      '.internship-story > *', '.internship-blueprint',
      '.projects-section .section-heading h2', '.projects-section .eyebrow', '.projects-section .section-note', '.work-card', '.other-projects',
      '.journey-section h2', '.journey-section .eyebrow', '.education-list article',
      '.contact-section h2', '.contact-section .eyebrow', '.contact-section p:not(.eyebrow)', '.contact-section > .button', '.contact-links',
    ].join(', ')
    const elements = Array.from(root.querySelectorAll<HTMLElement>(selectors))
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(':scope > section'))
    let reveals: IntersectionObserver | undefined
    let visibility: IntersectionObserver | undefined

    const configure = () => {
      reveals?.disconnect()
      visibility?.disconnect()
      if (preference.matches) {
        elements.forEach(element => element.classList.remove('motion-item', 'is-visible'))
        scenes.forEach(scene => scene.classList.remove('motion-scene', 'scene-visible'))
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
        element.dataset.motionKind = element.matches('h1, h2') ? 'heading' : 'block'
        element.classList.add('motion-item')
        reveals!.observe(element)
      })
      scenes.forEach(scene => { scene.classList.add('motion-scene'); visibility!.observe(scene) })
    }
    configure()
    preference.addEventListener('change', configure)
    return () => {
      reveals?.disconnect()
      visibility?.disconnect()
      preference.removeEventListener('change', configure)
      elements.forEach(element => { element.classList.remove('motion-item', 'is-visible'); element.style.removeProperty('--motion-delay'); delete element.dataset.motionKind })
      scenes.forEach(scene => scene.classList.remove('motion-scene', 'scene-visible'))
    }
  }, [deck])
}
