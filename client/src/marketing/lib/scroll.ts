/** Instant hash scroll — avoids animating through StoryFlow's tall sticky track. */
export function scrollToHash(hash: string, instant = hash === '#pricing') {
  const el = document.querySelector(hash)
  if (!el) return false
  el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' })
  return true
}

export function scrollToPricing() {
  return scrollToHash('#pricing', true)
}
