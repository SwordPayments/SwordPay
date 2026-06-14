import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'wouter'
import { ArrowRight } from '@phosphor-icons/react'

/* ----------------------------------------------------------------
   Reveal — scroll entrance via IntersectionObserver + CSS transition.
   Compositor-driven (robust + performant). A mount-time fallback
   always reveals, so content is never trapped invisible if IO never
   fires (slow JS, flaky observers). Stagger via CSS transition-delay.
   ---------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)

    // Safety net — always reveal shortly after mount.
    const t = setTimeout(() => setShown(true), 650)

    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [shown])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: shown ? `${delay}s` : '0s' }}
    >
      {children}
    </div>
  )
}

/* ----------------------------------------------------------------
   Buttons
   ---------------------------------------------------------------- */
type BtnProps = {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'solid' | 'outline' | 'ghost'
  icon?: boolean
  className?: string
}

export function Button({
  children,
  to,
  href,
  variant = 'solid',
  icon = true,
  className = '',
}: BtnProps) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[16.5px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
  const styles = {
    solid:
      'bg-ink text-paper hover:bg-cobalt hover:-translate-y-0.5',
    outline:
      'border border-line-strong text-ink hover:border-ink hover:-translate-y-0.5 bg-transparent',
    ghost: 'text-ink hover:text-cobalt',
  }[variant]

  const inner = (
    <>
      {children}
      {icon && (
        <ArrowRight
          weight="bold"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  const cls = `${base} ${styles} ${className}`
  if (to) return <Link href={to} className={cls}>{inner}</Link>
  if (href) return <a href={href} className={cls}>{inner}</a>
  return <button className={cls}>{inner}</button>
}

/* ----------------------------------------------------------------
   Section — vertical rhythm wrapper
   ---------------------------------------------------------------- */
export function Section({
  children,
  className = '',
  id,
  fullWidth = false,
  edgeToEdge = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
  /** Full viewport width with no horizontal inset (fullWidth only). */
  edgeToEdge?: boolean
}) {
  const inset = edgeToEdge ? 'w-full' : 'w-full px-5 sm:px-8 lg:px-12'
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      {fullWidth ? (
        <div className={inset}>{children}</div>
      ) : (
        <div className="shell">{children}</div>
      )}
    </section>
  )
}

/* ----------------------------------------------------------------
   Kicker — eyebrow label with a small accent dot
   ---------------------------------------------------------------- */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="kicker">
      <span className="size-1.5 rounded-full bg-cobalt" />
      {children}
    </span>
  )
}
