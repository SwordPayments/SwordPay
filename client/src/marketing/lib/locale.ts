/** Mirrors swordweb-ui/src/proxy.ts — country → language for i18n. */
export const LOCALE_STORAGE_KEY = 'NEXT_LOCALE'
export const LOCALE_MANUAL_KEY = 'NEXT_LOCALE_MANUAL'
export const LOCALE_COUNTRY_KEY = 'NEXT_LOCALE_COUNTRY'

export const SUPPORTED_LOCALES = [
  'en',
  'es',
  'pt',
  'fr',
  'de',
  'ar',
  'zh',
  'ja',
  'ko',
  'el',
] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'EN',
  es: 'ES',
  pt: 'PT',
  fr: 'FR',
  de: 'DE',
  ar: 'AR',
  zh: '中文',
  ja: 'JA',
  ko: '한국어',
  el: 'Ελληνικά',
}

export const COUNTRY_TO_LANG: Record<string, SupportedLocale> = {
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  BO: 'es',
  PY: 'es',
  UY: 'es',
  GT: 'es',
  HN: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  CU: 'es',
  DO: 'es',
  BR: 'pt',
  PT: 'pt',
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  CA: 'fr',
  SN: 'fr',
  CI: 'fr',
  CM: 'fr',
  MG: 'fr',
  ML: 'fr',
  BF: 'fr',
  DE: 'de',
  AT: 'de',
  LI: 'de',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  IQ: 'ar',
  JO: 'ar',
  KW: 'ar',
  LB: 'ar',
  LY: 'ar',
  MA: 'ar',
  OM: 'ar',
  QA: 'ar',
  SD: 'ar',
  SY: 'ar',
  TN: 'ar',
  YE: 'ar',
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  SG: 'zh',
  JP: 'ja',
  KR: 'ko',
  GR: 'el',
  CY: 'el',
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export function readCachedLocale(): SupportedLocale {
  if (typeof localStorage === 'undefined') return 'en'
  const manual = localStorage.getItem(LOCALE_MANUAL_KEY) === '1'
  if (manual) {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && isSupportedLocale(stored)) return stored
  }
  const fromCountry = localeFromCountry(readCachedCountry())
  if (fromCountry) return fromCountry
  return 'en'
}

export function readCachedCountry(): string | null {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(LOCALE_COUNTRY_KEY)
}

export function readStoredLocale(): SupportedLocale | null {
  if (typeof localStorage === 'undefined') return null
  if (localStorage.getItem(LOCALE_MANUAL_KEY) !== '1') return null
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored && isSupportedLocale(stored) ? stored : null
}

export function storeLocale(locale: SupportedLocale, manual = false, country?: string | null) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  if (country) {
    localStorage.setItem(LOCALE_COUNTRY_KEY, country)
  }
  if (manual) {
    localStorage.setItem(LOCALE_MANUAL_KEY, '1')
  }
}

export function localeFromCountry(country?: string | null): SupportedLocale | null {
  if (!country) return null
  return COUNTRY_TO_LANG[country.toUpperCase()] ?? null
}

/** Browser Accept-Language fallback (same as swordweb-ui proxy). */
export function localeFromBrowser(): SupportedLocale {
  if (typeof navigator === 'undefined') return 'en'
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const lang of langs) {
    const code = lang?.toLowerCase().replace('_', '-').split('-')[0]
    if (code && isSupportedLocale(code)) return code
  }
  return 'en'
}

export type LocaleDetection = {
  locale: SupportedLocale
  country: string | null
  source: 'stored' | 'country' | 'browser'
}

async function fetchCountryFromEdgeApi(): Promise<{ country: string | null; locale: SupportedLocale | null }> {
  try {
    const res = await fetch('/api/geoip', {
      credentials: 'same-origin',
      cache: 'no-store',
    })
    if (!res.ok) return { country: null, locale: null }
    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) return { country: null, locale: null }
    const data = (await res.json()) as { countryCode?: string | null }
    const country = data.countryCode?.toUpperCase() ?? null
    const locale = localeFromCountry(country)
    return { country, locale }
  } catch {
    return { country: null, locale: null }
  }
}

/** Cloudflare trace — works on localhost + respects VPN exit country. */
export async function fetchCountryFromCloudflareTrace(): Promise<string | null> {
  try {
    const text = await fetch('https://www.cloudflare.com/cdn-cgi/trace').then((r) => r.text())
    return text.match(/loc=([A-Z]+)/)?.[1] ?? null
  } catch {
    return null
  }
}

/**
 * Resolve locale like swordpay.com:
 * 1. Saved NEXT_LOCALE (manual pick)
 * 2. Country from IP (/api/geoip on Render, or CF trace fallback)
 * 3. Browser language
 */
export async function resolveInitialLocale(): Promise<LocaleDetection> {
  const [traceCountry, edge] = await Promise.all([
    fetchCountryFromCloudflareTrace(),
    fetchCountryFromEdgeApi(),
  ])

  // Prefer edge API when live; CF trace matches VPN exit country on localhost + production.
  const country = edge.country ?? traceCountry

  const stored = readStoredLocale()
  if (stored) {
    storeLocale(stored, true, country)
    return { locale: stored, country, source: 'stored' }
  }

  const fromCountry = localeFromCountry(country)
  if (fromCountry) {
    storeLocale(fromCountry, false, country)
    localStorage.removeItem(LOCALE_MANUAL_KEY)
    return { locale: fromCountry, country, source: 'country' }
  }

  if (edge.locale) {
    storeLocale(edge.locale, false, country)
    return { locale: edge.locale, country, source: 'country' }
  }

  const browser = localeFromBrowser()
  storeLocale(browser, false, country)
  return { locale: browser, country, source: 'browser' }
}

/** @deprecated Use useLocale() — kept for any legacy call sites. */
export function isPortugueseSpeakingUser() {
  const stored = readStoredLocale()
  if (stored) return stored === 'pt'
  return localeFromBrowser() === 'pt'
}
