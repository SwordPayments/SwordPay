import { useMemo } from 'react'
import { useLocale } from '../context/LocaleContext'
import type { SupportedLocale } from '../lib/locale'
import type { LandingMessages } from './types'
import en from './messages/en'
import pt from './messages/pt'
import es from './messages/es'
import fr from './messages/fr'
import de from './messages/de'
import ar from './messages/ar'
import zh from './messages/zh'
import ja from './messages/ja'
import ko from './messages/ko'
import el from './messages/el'

const MESSAGES: Record<SupportedLocale, LandingMessages> = { en, pt, es, fr, de, ar, zh, ja, ko, el }

export function getMessages(locale: SupportedLocale): LandingMessages {
  return MESSAGES[locale] ?? en
}

export function useMessages(): LandingMessages {
  const { locale } = useLocale()
  return useMemo(() => getMessages(locale), [locale])
}

export type { LandingMessages }
