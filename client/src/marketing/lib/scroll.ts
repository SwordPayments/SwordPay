const PRICING_HASH = '#pricing'
const PRICING_RETRY_MS = [0, 16, 50, 100, 200, 400, 800, 1200, 1800, 2500]

function pricingScrollMargin(el: HTMLElement) {
  return Number.parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0
}

/** Bypass CSS scroll-behavior:smooth — assign scrollTop directly for a true instant jump. */
function scrollToYInstant(y: number) {
  const target = Math.max(0, Math.round(y))
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  html.scrollTop = target
  document.body.scrollTop = target
  window.scrollTo(0, target)
  html.style.scrollBehavior = prev
}

function pricingTargetY(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY - pricingScrollMargin(el)
}

function pricingInView(el: HTMLElement) {
  const margin = pricingScrollMargin(el)
  const top = el.getBoundingClientRect().top
  return top >= margin - 8 && top <= margin + 80
}

/** Instant jump to #pricing — retries until StoryFlow layout height is settled. */
export function scrollToPricing() {
  const attempt = () => {
    const el = document.getElementById('pricing')
    if (!el) return false
    scrollToYInstant(pricingTargetY(el))
    return pricingInView(el)
  }

  attempt()
  requestAnimationFrame(() => {
    attempt()
    requestAnimationFrame(attempt)
  })

  for (const ms of PRICING_RETRY_MS) {
    window.setTimeout(attempt, ms)
  }

  return true
}

export function scrollToHash(hash: string, instant = hash === PRICING_HASH) {
  if (instant && hash === PRICING_HASH) {
    return scrollToPricing()
  }

  const el = document.querySelector(hash)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}
