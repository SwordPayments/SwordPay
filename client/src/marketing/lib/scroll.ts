/** Instant hash scroll — avoids animating through StoryFlow's tall sticky track. */
export function scrollToHash(hash: string, instant = hash === '#pricing') {
  const el = document.querySelector(hash)
  if (!el) return false

  if (instant) {
    const style = window.getComputedStyle(el)
    const scrollMarginTop = Number.parseFloat(style.scrollMarginTop) || 0
    const top = el.getBoundingClientRect().top + window.scrollY - scrollMarginTop
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
    return true
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

export function scrollToPricing() {
  return scrollToHash('#pricing', true)
}
