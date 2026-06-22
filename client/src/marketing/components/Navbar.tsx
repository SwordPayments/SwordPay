import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { List, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Button } from './ui'
import { Logo } from './Logo'
import { LOCALE_LABELS, SUPPORTED_LOCALES, useLocale } from '../context/LocaleContext'
import { useMessages } from '../i18n'
import { scrollToPricing, scrollToHowItWorks, scrollToYInstant } from '../lib/scroll'

function clearHashAndScrollTop(path: string) {
  window.history.replaceState(null, '', path)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
  scrollToYInstant(0)
}

function navigateToPricing(
  e: React.MouseEvent,
  location: string,
  setLocation: (to: string) => void,
) {
  e.preventDefault()
  if (location !== '/') {
    setLocation('/')
  }
  window.history.replaceState(null, '', '/#pricing')
  scrollToPricing()
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export const SCROLL_INTENT_KEY = 'sp_scroll_intent'

function navigateToSection(
  e: React.MouseEvent,
  anchor: string,
  location: string,
  setLocation: (to: string) => void,
) {
  e.preventDefault()
  const el = document.getElementById(anchor)
  if (el) {
    window.history.replaceState(null, '', `${window.location.pathname}#${anchor}`)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    if (anchor === 'how-it-works') scrollToHowItWorks()
    else if (anchor === 'pricing') scrollToPricing()
  } else {
    setLocation(`/creators#${anchor}`)
  }
}

function navLinkClass(isActive: boolean, isHash: boolean) {
  return `rounded-full px-3 py-1.5 text-[18px] font-medium transition-colors duration-200 ${
    isActive && !isHash ? 'text-ink' : 'text-ink-mute hover:text-ink'
  }`
}

export default function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useLocation()
  const { locale, country, setLocale } = useLocale()
  const t = useMessages()

  const links = [
    { to: '/', label: t.nav.product, end: true, hash: false, scrollTop: false, anchor: '' },
    { to: '/creators', label: t.nav.forCreators, end: false, hash: false, scrollTop: true, anchor: '' },
    { to: '#how-it-works', label: t.nav.howTo, end: false, hash: true, scrollTop: false, anchor: 'how-it-works' },
    { to: '/#pricing', label: t.nav.pricing, end: false, hash: true, scrollTop: false, anchor: 'pricing' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const isActive = (to: string, end?: boolean) => {
    if (to.startsWith('/#')) return false
    if (end) return location === to
    return location === to || location.startsWith(`${to}/`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <nav
        className={`nav-enter glass-nav mt-4 flex w-full items-center justify-between rounded-full px-2 py-1 pl-5 transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'max-w-[920px]' : 'max-w-[1080px]'
        }`}
      >
        <Logo markClassName="h-6 w-auto text-cobalt" textClassName="text-[21.12px]" />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.hash ? (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) =>
                  l.anchor === 'pricing'
                    ? navigateToPricing(e, location, setLocation)
                    : navigateToSection(e, l.anchor, location, setLocation)
                }
                className={navLinkClass(false, true)}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => clearHashAndScrollTop(l.to)}
                className={navLinkClass(isActive(l.to, l.end), false)}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/explore"
            aria-label="Creator search"
            title="Creator search"
            className="inline-flex h-8 items-center justify-center rounded-full border border-line-strong bg-paper/85 px-3 text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:text-cobalt"
          >
            Search creators
          </Link>
          <label className="sr-only" htmlFor="locale-select">
            {t.nav.language}
          </label>
          <div className="relative">
            <select
              id="locale-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as typeof locale)}
              title={country ? `${t.nav.detected}: ${country}` : t.nav.language}
              className="h-8 w-[58px] appearance-none rounded-full border border-line-strong bg-paper/80 pl-3 pr-6 text-[13px] font-semibold text-ink outline-none transition-colors hover:border-ink"
            >
              {SUPPORTED_LOCALES.map((code) => (
                <option key={code} value={code}>
                  {LOCALE_LABELS[code]}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-ink-mute">
              ▼
            </span>
          </div>
          <Button
            href="https://swordpay.me"
            icon={false}
            className="!py-1.5 !text-[18.6px] !bg-[#FFD230] !text-ink hover:!bg-[#FFC800]"
          >
            {t.nav.startEarning}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/explore"
            aria-label="Creator search"
            title="Creator search"
            className="inline-flex h-10 items-center justify-center rounded-full border border-line bg-paper-deep px-3 text-[14px] font-semibold text-ink shadow-sm transition-colors hover:bg-paper hover:text-cobalt"
          >
            Search creators
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line bg-paper-deep text-ink shadow-sm transition-colors hover:bg-paper"
            aria-label={t.nav.menu}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-4 top-20 rounded-3xl p-5 md:hidden border border-line-strong bg-paper shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) =>
                l.hash ? (
                  <a
                    key={l.to}
                    href={l.to}
                    onClick={(e) => {
                      if (l.anchor === 'pricing') {
                        navigateToPricing(e, location, setLocation)
                      } else {
                        navigateToSection(e, l.anchor, location, setLocation)
                      }
                      setOpen(false)
                    }}
                    className="rounded-xl px-4 py-3.5 text-[18px] font-semibold text-ink transition-colors hover:bg-paper-deep hover:text-cobalt"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => {
                      clearHashAndScrollTop(l.to)
                      setOpen(false)
                    }}
                    className="block rounded-xl px-4 py-3.5 text-[18px] font-semibold text-ink transition-colors hover:bg-paper-deep hover:text-cobalt"
                  >
                    {l.label}
                  </Link>
                ),
              )}
              <div className="mt-3 border-t border-line pt-3 px-1">
                <Link
                  href="/explore"
                  onClick={() => setOpen(false)}
                  className="mb-2 flex items-center justify-center gap-2 rounded-xl border border-line-strong bg-paper px-4 py-3 text-[16px] font-semibold text-ink transition-colors hover:bg-paper-deep hover:text-cobalt"
                >
                  <MagnifyingGlass size={18} weight="bold" />
                  Search creators
                </Link>
                <label className="mb-2 block px-1 text-[13px] font-semibold uppercase tracking-wide text-ink-mute">
                  {t.nav.language}
                  {country ? ` · ${country}` : ''}
                </label>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as typeof locale)}
                  className="mb-2 w-full rounded-2xl border border-line-strong bg-paper px-4 py-3 text-[16px] font-semibold text-ink outline-none"
                >
                  {SUPPORTED_LOCALES.map((code) => (
                    <option key={code} value={code}>
                      {LOCALE_LABELS[code]}
                    </option>
                  ))}
                </select>
                <Button href="https://swordpay.me" icon={false} className="w-full justify-center !bg-[#FFD230] !text-ink hover:!bg-[#FFC800]">
                  {t.nav.startEarning}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
