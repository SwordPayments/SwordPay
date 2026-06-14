/** Paths that must not be captured by /:slug creator routes. */
export const RESERVED_SLUGS = new Set([
  'explore',
  'how-it-works',
  'onlyfans-alternative',
  'creators',
  'creator',
  'api',
  'legal',
  'assets',
])

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase())
}
