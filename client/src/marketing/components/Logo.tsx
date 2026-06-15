import { Link } from 'wouter'

/* The real SwordPay mark, inlined so it inherits `currentColor`
   and can recolor per background (brand navy on light, paper on dark). */
export function SwordMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 23 42"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.392557">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 10.7788L7.71311 10.7788L7.71311 35.2836L11.4139 38.5369L15.1148 35.2836L15.1148 10.7788L22 10.7788L22 12.4433L17.1803 12.4433L17.1803 35.931L11.4139 41.0001L5.64754 35.931L5.64754 12.4433L1 12.4433L1 10.7788Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4214 30.1755L10.4214 10.79L12.4855 10.79L12.4855 30.1755L11.4534 30.7701L10.4214 30.1755Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4585 8.07628L10.4585 1L12.5226 1L12.5226 8.07628L10.4585 8.07628Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.7707 8.73233L5.30029 8.73233L5.30029 7.30518L17.7707 7.30518L17.7707 8.73233Z"
        />
      </g>
    </svg>
  )
}

/* Mark + wordmark lockup, linked home. */
export function Logo({
  className = '',
  markClassName = 'h-7 w-auto text-cobalt',
  textClassName = 'text-[18.7px]',
}: {
  className?: string
  markClassName?: string
  textClassName?: string
}) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <SwordMark
        className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 ${markClassName}`}
      />
      <span className={`font-display font-bold tracking-tight text-cobalt ${textClassName}`}>
        SwordPay
      </span>
    </Link>
  )
}
