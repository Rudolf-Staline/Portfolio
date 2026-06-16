import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  /** Stagger delay in ms. */
  delay?: number
  className?: string
}

/** Wraps children in a subtle scroll-triggered fade-up. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  )
}
