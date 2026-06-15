import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { Button } from './ui'
import { Logo } from './Logo'
import { LOCALE_LABELS, SUPPORTED_LOCALES, useLocale } from '../context/LocaleContext'
import { useMessages } from '../i18n'
import { scrollToPricing } from '../lib/scroll'

function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
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
    { to: '/', label: t.nav.product, end: true, hash: false, scrollTop: false },
    { to: '/creators', label: t.nav.forCreators, end: false, hash: false, scrollTop: true },
    { to: '/#pricing', label: t.nav.pricing, end: false, hash: true, scrollTop: false },
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
                href="/#pricing"
                onClick={(e) => navigateToPricing(e, location, setLocation)}
                className={navLinkClass(false, true)}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.to} href={l.to}>
                <a
                  onClick={() => {
                    if (l.scrollTop) scrollPageToTop()
                  }}
                  className={navLinkClass(isActive(l.to, l.end), false)}
                >
                  {l.label}
                </a>
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <label className="sr-only" htmlFor="locale-select">
            {t.nav.language}
          </label>
          <select
            id="locale-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            title={country ? `${t.nav.detected}: ${country}` : t.nav.language}
            className="rounded-full border border-line-strong bg-paper/80 px-3 py-1.5 text-[15px] font-semibold text-ink outline-none transition-colors hover:border-ink"
          >
            {SUPPORTED_LOCALES.map((code) => (
              <option key={code} value={code}>
                {LOCALE_LABELS[code]}
              </option>
            ))}
          </select>
          <Button
            href="https://swordpay.me"
            icon={false}
            className="!py-1.5 !text-[18.6px] !bg-[#FFD230] !text-ink hover:!bg-[#FFC800]"
          >
            {t.nav.startEarning}
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-full text-ink md:hidden"
          aria-label={t.nav.menu}
        >
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-nav absolute inset-x-4 top-20 rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) =>
                l.hash ? (
                  <a
                    key={l.to}
                    href="/#pricing"
                    onClick={(e) => {
                      navigateToPricing(e, location, setLocation)
                      setOpen(false)
                    }}
                    className="rounded-2xl px-4 py-3 text-[17.6px] font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.to} href={l.to}>
                    <a
                      onClick={() => {
                        if (l.scrollTop) scrollPageToTop()
                      }}
                      className="rounded-2xl px-4 py-3 text-[17.6px] font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </Link>
                ),
              )}
              <div className="mt-2 px-1">
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
