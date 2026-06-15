import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  ChatCircle,
  Gift,
  Broadcast,
  Plus,
  Quotes,
  Star,
  Play,
} from '@phosphor-icons/react'
import { Reveal, Button, Section } from '../components/ui'
import StoryFlow from '../components/StoryFlow'
import { px, faces } from '../lib/images'
import { useLocale } from '../context/LocaleContext'
import { useMessages } from '../i18n'
import type { LandingMessages } from '../i18n/types'

type CreatorsCopy = LandingMessages['creators']

const PT_HERO_VIDEO = '/videos/creators-pt.mp4'
const DEFAULT_VIMEO_SRC =
  'https://player.vimeo.com/video/1201130712?muted=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&badge=0&dnt=1'

/* ============================================================
   HERO VIDEO — Vimeo (default) or local MP4 when locale is PT (Brazil/Portugal)
   ============================================================ */
function HeroVideo() {
  const { locale, country, ready } = useLocale()
  const t = useMessages()
  const isPt = locale === 'pt' || country === 'BR' || country === 'PT'
  const localePending = !ready && !country
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const enableAudio = (iframe: HTMLIFrameElement) => {
    const win = iframe.contentWindow
    win?.postMessage(JSON.stringify({ method: 'setVolume', value: 1 }), '*')
    win?.postMessage(JSON.stringify({ method: 'setMuted', value: false }), '*')
  }

  const togglePtPlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (!video.paused && !video.ended) {
      video.pause()
      return
    }

    video.loop = false
    video.muted = false
    video.volume = 1
    if (video.ended) video.currentTime = 0
    void video.play().catch(() => setIsPlaying(false))
  }

  useEffect(() => {
    if (!isPt) return
    return () => {
      const video = videoRef.current
      if (!video) return
      video.pause()
      video.muted = true
      video.currentTime = 0
      setIsPlaying(false)
    }
  }, [isPt])

  useEffect(() => {
    if (isPt) return
    const iframe = iframeRef.current
    if (!iframe) return

    const send = (method: string, value?: string | number | boolean) =>
      iframe.contentWindow?.postMessage(
        JSON.stringify(value === undefined ? { method } : { method, value }),
        '*',
      )

    const subscribe = () => {
      send('addEventListener', 'play')
      send('addEventListener', 'pause')
      send('addEventListener', 'ended')
      send('addEventListener', 'finish')
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://player.vimeo.com') return
      if (typeof event.data !== 'string') return
      try {
        const data = JSON.parse(event.data) as { event?: string }
        if (data.event === 'play') { setIsPlaying(true); enableAudio(iframe) }
        if (data.event === 'pause' || data.event === 'ended' || data.event === 'finish') setIsPlaying(false)
      } catch { /* ignore */ }
    }

    iframe.addEventListener('load', subscribe)
    window.addEventListener('message', onMessage)
    subscribe()

    return () => {
      iframe.removeEventListener('load', subscribe)
      window.removeEventListener('message', onMessage)
    }
  }, [isPt])

  const startVimeoPlayback = () => {
    const iframe = iframeRef.current
    if (!iframe) return
    enableAudio(iframe)
    iframe.contentWindow?.postMessage(JSON.stringify({ method: 'play' }), '*')
    setIsPlaying(true)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      {localePending ? (
        <div className="h-full w-full animate-pulse bg-paper-deep" aria-hidden />
      ) : isPt ? (
        <div
          className="relative h-full w-full cursor-pointer overflow-hidden rounded-[inherit]"
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? t.creators.hero.pauseLabel : t.creators.hero.playLabel}
          onClick={togglePtPlayback}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              togglePtPlayback()
            }
          }}
        >
          <video
            ref={videoRef}
            src={PT_HERO_VIDEO}
            className="pointer-events-none h-full w-full rounded-[inherit] object-cover"
            playsInline
            preload="metadata"
            title={t.creators.hero.videoTitle}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false)
              videoRef.current?.pause()
            }}
          />
          {!isPlaying && (
            <span className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full bg-paper/20 text-paper backdrop-blur-sm">
                <Play weight="fill" className="ml-1 size-8" />
              </span>
            </span>
          )}
        </div>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            src={DEFAULT_VIMEO_SRC}
            className="absolute left-0 right-0 top-0 w-full rounded-[inherit]"
            style={{ height: 'calc(100% + 40px)' }}
            allow="autoplay; picture-in-picture"
            title={t.creators.hero.videoTitle}
          />
          {!isPlaying && (
            <button
              type="button"
              onClick={startVimeoPlayback}
              className="absolute inset-0 z-10 grid place-items-center rounded-[inherit]"
              aria-label={t.creators.hero.playLabel}
            >
              <span className="grid size-20 place-items-center rounded-full bg-paper/20 text-paper backdrop-blur-sm transition-colors hover:bg-paper/30">
                <Play weight="fill" className="ml-1 size-8" />
              </span>
            </button>
          )}
        </>
      )}
    </div>
  )
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ copy }: { copy: CreatorsCopy['hero'] }) {
  return (
    <section className="relative bg-paper pt-24 md:pt-28">
      <div className="w-full max-w-full min-w-0">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper shadow-[0_24px_60px_-28px_rgba(0,0,0,0.28)]">
          <HeroVideo />
        </div>

        <div className="flex w-full flex-col items-center gap-3 px-5 pb-4 pt-5 text-center text-ink sm:gap-4 sm:pb-8 sm:pt-6 sm:px-6">
          <h1 className="max-w-full font-display text-[clamp(1.55rem,6.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight md:leading-[1]">
            <span className="block md:whitespace-nowrap">{copy.titleLine1}</span>
            <span className="block md:whitespace-nowrap">
              {copy.titleLine2Prefix}
              <span className="text-[#FFD230]">{copy.titleLine2Highlight}</span>
              {copy.titleLine2Suffix}
            </span>
          </h1>
          <p className="max-w-md text-[clamp(0.95rem,3.8vw,1.2rem)] leading-relaxed text-ink-soft md:text-[clamp(0.95rem,1.8vw,1.2rem)]">
            <span className="block md:whitespace-nowrap">{copy.bodyLine1}</span>
            <span className="block md:whitespace-nowrap">{copy.bodyLine2}</span>
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
            <Button
              href="https://swordpay.me"
              className="w-full justify-center !bg-[#FFD230] !text-ink hover:!bg-[#FFC800] !shadow-lg sm:w-auto"
            >
              {copy.ctaPrimary}
            </Button>
            <Button
              href="#how-it-works"
              variant="outline"
              icon={false}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="w-full justify-center !border-line-strong !text-ink hover:!border-ink sm:w-auto"
            >
              {copy.ctaSecondary}
            </Button>
          </div>

          {/* Mobile stats: 3-col card grid */}
          <div className="mt-2 w-full sm:hidden">
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-line bg-paper-deep">
              {copy.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center py-4 ${i > 0 ? 'border-l border-line' : ''}`}
                >
                  <strong className="text-[22px] font-extrabold leading-none tracking-tight text-cobalt">
                    {stat.value}
                  </strong>
                  <span className="mt-1.5 text-center text-[14px] font-bold leading-tight text-ink">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop stats: horizontal pill */}
          <div className="mt-1 hidden sm:mx-auto sm:flex sm:w-fit sm:overflow-x-auto sm:rounded-full sm:border sm:border-line sm:bg-paper-deep sm:px-7 sm:py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-baseline justify-center gap-x-3">
              {copy.stats.map((stat, i) => (
                <span key={stat.label} className="flex shrink-0 items-baseline gap-1.5">
                  {i > 0 && <span className="mx-1.5 text-ink-mute">·</span>}
                  <strong className="text-[28px] font-bold text-cobalt md:text-[28.4px]">
                    {stat.value}
                  </strong>
                  <span className="font-bold text-ink text-[24px] md:text-[23.9px]">{stat.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   REVENUE STREAMS
   ============================================================ */
function Streams({ copy }: { copy: CreatorsCopy['streams'] }) {
  const icons = [Heart, Gift, ChatCircle, Broadcast]
  return (
    <Section id="streams" className="border-y border-line bg-paper-deep">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-bold">
            {copy.heading}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft sm:text-[18.7px] md:whitespace-nowrap">
            {copy.subheading}
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {copy.items.map((s, i) => {
          const Icon = icons[i]
          return (
          <Reveal key={s.title} delay={i * 0.07}>
            <div className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink">
              <span className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-cobalt-wash text-cobalt transition-colors duration-300 group-hover:bg-cobalt group-hover:text-paper">
                <Icon weight="bold" className="size-6" />
              </span>
              <h3 className="mt-5 text-[20.9px] font-bold">{s.title}</h3>
              <p className="mt-2.5 text-[16.5px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ============================================================
   WHAT YOU KEEP
   ============================================================ */
/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials({ copy }: { copy: CreatorsCopy['testimonials'] }) {
  const facesList = [faces.maya, faces.helena, faces.kai]
  return (
    <Section className="border-y border-line bg-paper-deep">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-bold">
              {copy.heading}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[16.5px] text-ink-soft">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} weight="fill" className="size-4 text-cobalt" />
              ))}
            </div>
            <span className="font-semibold text-ink">4.9</span> {copy.rating}
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {copy.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7">
              <Quotes weight="fill" className="size-7 text-cobalt" />
              <blockquote className="mt-4 flex-1 text-[18.1px] leading-relaxed text-ink-soft">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 inline-flex w-fit rounded-full bg-cobalt-wash px-3 py-1 text-[14.3px] font-semibold text-cobalt">
                {t.stat}
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <img
                  src={px(facesList[i], 120, 120)}
                  alt={t.name}
                  className="size-11 rounded-full border border-line object-cover"
                />
                <div className="leading-tight">
                  <div className="text-[16.5px] font-semibold">{t.name}</div>
                  <div className="text-[14.3px] text-ink-mute">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ({ copy }: { copy: CreatorsCopy['faq'] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section className="border-t border-line bg-paper-deep">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold">
              {copy.heading}
            </h2>
            <p className="mt-5 max-w-sm text-[17.6px] text-ink-soft">
              {copy.subheading}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper">
            {copy.items.map((f, i) => (
              <div
                key={f.q}
                className={i !== copy.items.length - 1 ? 'border-b border-line' : ''}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[18.7px] font-semibold">{f.q}</span>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 ${
                      open === i ? 'rotate-45 bg-cobalt text-paper border-cobalt' : 'text-ink'
                    }`}
                  >
                    <Plus weight="bold" className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[17.6px] leading-relaxed text-ink-soft">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ============================================================
   CTA
   ============================================================ */
function CTA({ copy }: { copy: CreatorsCopy['cta'] }) {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-ink px-8 py-20 text-center text-paper md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '56px 56px',
                maskImage:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)',
              }}
            />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.98]">
              {copy.headingLine1}
              <br />
              <span className="text-cobalt">{copy.headingLine2}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17.6px] text-paper/80">{copy.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="https://swordpay.me" className="!bg-[#FFD230] !text-ink hover:!bg-[#FFC800] !shadow-lg">
                {copy.primary}
              </Button>
              <Button
                href="/"
                variant="ghost"
                className="!text-paper hover:!text-cobalt"
              >
                {copy.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ============================================================
   THREE SIMPLE STEPS — phone-mockup demo videos
   ============================================================ */
function ThreeSteps({ copy }: { copy: CreatorsCopy['steps'] }) {
  const images = ['/steps/set-price.png', '/steps/add-file.png', '/steps/share.png']
  return (
    <Section className="py-8 md:py-16">
      <Reveal>
        <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold">
          {copy.heading}
        </h2>
      </Reveal>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 md:mt-12 md:gap-10">
        {copy.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center">
              <h3 className="mb-5 text-[18px] font-bold uppercase tracking-[0.14em] text-ink sm:text-[21.6px]">
                {s.label}
              </h3>
              <div className="relative w-full max-w-[230px] rounded-[2.4rem] border-[7px] border-ink bg-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]">
                <div className="absolute left-1/2 top-2.5 z-10 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-ink" />
                <img
                  src={images[i]}
                  alt={s.alt}
                  className="block w-full rounded-[1.9rem]"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default function Creators() {
  const t = useMessages()

  return (
    <>
      <Hero copy={t.creators.hero} />
      <ThreeSteps copy={t.creators.steps} />
      <StoryFlow />
      <Streams copy={t.creators.streams} />
      <Testimonials copy={t.creators.testimonials} />
      <FAQ copy={t.creators.faq} />
      <CTA copy={t.creators.cta} />
    </>
  )
}
