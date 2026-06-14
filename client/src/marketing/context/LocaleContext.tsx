import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  fetchCountryFromCloudflareTrace,
  localeFromCountry,
  readCachedCountry,
  readCachedLocale,
  readStoredLocale,
  resolveInitialLocale,
  storeLocale,
  type SupportedLocale,
} from '../lib/locale'

type LocaleContextValue = {
  locale: SupportedLocale
  country: string | null
  ready: boolean
  setLocale: (locale: SupportedLocale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(readCachedLocale)
  const [country, setCountry] = useState<string | null>(readCachedCountry)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const applyCountry = (nextCountry: string | null) => {
      if (!nextCountry || cancelled) return
      setCountry(nextCountry)
      if (readStoredLocale()) return
      const fromCountry = localeFromCountry(nextCountry)
      if (fromCountry) {
        storeLocale(fromCountry, false, nextCountry)
        setLocaleState(fromCountry)
      }
    }

    fetchCountryFromCloudflareTrace().then(applyCountry)

    resolveInitialLocale().then((result) => {
      if (cancelled) return
      setLocaleState(result.locale)
      setCountry(result.country)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const setLocale = (next: SupportedLocale) => {
    storeLocale(next, true, country)
    setLocaleState(next)
  }

  const value = useMemo(
    () => ({ locale, country, ready, setLocale }),
    [locale, country, ready],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export { LOCALE_LABELS, SUPPORTED_LOCALES }
