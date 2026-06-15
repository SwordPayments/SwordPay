import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UploadSimple,
  Image as ImageIcon,
  CheckCircle,
  Check,
  LinkSimple,
  Copy,
  CurrencyDollar,
  LockKeyOpen,
  LockSimple,
  Bell,
} from '@phosphor-icons/react'
import { useMessages } from '../i18n'
import type { LandingMessages } from '../i18n'

// The premium image the creator uploads — blurred until unlock, then revealed.
const CONTENT_IMG = '/pexels-galina-kolonitskaia-485466282-34005245.jpg'

type Step = LandingMessages['storyFlow']['steps'][number]
type StoryFlowMocks = LandingMessages['storyFlow']['mocks']

const swap = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
}

/* ---------------- per-step glass mockups ---------------- */

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass w-full max-w-md rounded-[var(--radius-xl)] p-6 md:p-7">
      {children}
    </div>
  )
}

function UploadMock({ mocks }: { mocks: StoryFlowMocks }) {
  return (
    <CardShell>
      <div className="flex items-center gap-2 text-[14.3px] font-semibold uppercase tracking-wide text-ink-mute">
        <UploadSimple weight="bold" className="size-4" /> {mocks.uploading}
      </div>
      <div className="mt-4 rounded-[var(--radius-md)] border border-dashed border-line-strong p-3">
        {/* image being added — shown as a protected (blurred) preview */}
        <div className="relative overflow-hidden rounded-[var(--radius-sm)]">
          <img
            src={CONTENT_IMG}
            alt={mocks.uploadImageAlt}
            className="aspect-[4/3] w-full scale-110 object-cover blur-md"
          />
          <div className="absolute inset-0 grid place-items-center bg-ink/10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-[13.2px] font-semibold text-paper backdrop-blur-sm">
              <LockSimple weight="fill" className="size-3.5" /> {mocks.lockedPreview}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 px-1">
          <span className="grid size-10 place-items-center rounded-[var(--radius-sm)] bg-cobalt-wash text-cobalt">
            <ImageIcon weight="fill" className="size-5" />
          </span>
          <div className="flex-1">
            <div className="text-[15.4px] font-semibold">{mocks.demoFileName}</div>
            <div className="text-[13.2px] text-ink-mute">{mocks.uploadFileMeta}</div>
          </div>
          <CheckCircle weight="fill" className="size-6 text-cobalt" />
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper-deep">
          <div className="bar-x h-full w-full rounded-full bg-cobalt" />
        </div>
        <div className="mt-2 px-1 text-right text-[13.2px] font-medium text-ink-mute">
          {mocks.uploadPercent} · {mocks.uploaded}
        </div>
      </div>
    </CardShell>
  )
}

function ShareMock({ mocks }: { mocks: StoryFlowMocks }) {
  return (
    <CardShell>
      <div className="flex items-center gap-2 text-[14.3px] font-semibold uppercase tracking-wide text-ink-mute">
        <LinkSimple weight="bold" className="size-4" /> {mocks.yourPayLink}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-md)] border border-line bg-paper-deep px-4 py-3">
        <span className="grid size-9 place-items-center rounded-full bg-cobalt text-paper">
          <LinkSimple weight="bold" className="size-4" />
        </span>
        <span className="flex-1 truncate font-mono text-[15.4px] font-medium text-ink">
          swordpay.me/pay/abc123
        </span>
        <span className="grid size-8 place-items-center rounded-full border border-line-strong bg-paper text-ink">
          <Copy weight="bold" className="size-4" />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {mocks.shareChannels.map((c) => (
          <span
            key={c}
            className="rounded-full border border-line bg-paper py-2 text-center text-[13.8px] font-semibold text-ink-soft"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-cobalt py-2.5 text-[15.4px] font-semibold text-paper">
        <Check weight="bold" className="size-4" /> {mocks.linkCopied}
      </div>
    </CardShell>
  )
}

function PaidMock({ mocks }: { mocks: StoryFlowMocks }) {
  return (
    <CardShell>
      <div className="flex items-center gap-2 text-[14.3px] font-semibold uppercase tracking-wide text-ink-mute">
        <Bell weight="fill" className="size-4" /> {mocks.notification}
      </div>

      {/* push-notification style payment alert */}
      <div className="mt-4 flex items-start gap-3 rounded-[var(--radius-md)] border border-line bg-paper-deep p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-cobalt text-paper">
          <CurrencyDollar weight="bold" className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[22.2px] font-bold text-cobalt">SwordPay</span>
            <span className="shrink-0 text-[19px] font-bold text-cobalt">{mocks.notificationNow}</span>
          </div>
          <div className="mt-0.5 text-[22.9px] font-bold text-cobalt">
            {mocks.paymentReceived}
          </div>
          <p className="mt-0.5 text-[14.3px] leading-snug text-ink-soft">
            {mocks.paymentBody}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-cobalt-wash py-2 text-[14.3px] font-semibold text-cobalt">
        <CheckCircle weight="fill" className="size-4" /> {mocks.saleConfirmed}
      </div>
    </CardShell>
  )
}

function AccessMock({ mocks }: { mocks: StoryFlowMocks }) {
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-wash px-3 py-1 text-[13.2px] font-semibold text-cobalt">
          <LockKeyOpen weight="fill" className="size-3.5" /> {mocks.accessUnlocked}
        </span>
        <CheckCircle weight="fill" className="size-5 text-cobalt" />
      </div>
      {/* the same image, now revealed to the buyer — sharp, unblurred */}
      <div className="relative mt-4 overflow-hidden rounded-[var(--radius-md)] border border-line">
        <img
          src={CONTENT_IMG}
          alt={mocks.unlockedImageAlt}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="mt-3 flex items-center gap-3 px-1">
        <span className="grid size-10 place-items-center rounded-[var(--radius-sm)] bg-cobalt-wash text-cobalt">
          <ImageIcon weight="fill" className="size-5" />
        </span>
        <div className="flex-1">
          <div className="text-[15.4px] font-semibold">{mocks.demoFileName}</div>
          <div className="text-[13.2px] text-ink-mute">{mocks.availableToBuyer}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-[15.4px] font-semibold text-paper">
        <CheckCircle weight="fill" className="size-4 text-cobalt" /> {mocks.done}
      </div>
    </CardShell>
  )
}

function Mock({ stepKey, mocks }: { stepKey: string; mocks: StoryFlowMocks }) {
  switch (stepKey) {
    case 'share':
      return <ShareMock mocks={mocks} />
    case 'paid':
      return <PaidMock mocks={mocks} />
    case 'access':
      return <AccessMock mocks={mocks} />
    default:
      return <UploadMock mocks={mocks} />
  }
}

/* ---------------- the pinned scrollytelling scene ---------------- */

function StepMarker({
  step,
  index,
  done,
}: {
  step: Step
  index: number
  done: boolean
}) {
  if (done) return <Check weight="bold" className="size-[18.4px]" />
  if (step.noNumber)
    return <LockKeyOpen weight="bold" className="size-[18.4px]" />
  return index + 1
}

export default function StoryFlow({
  title,
  steps,
}: {
  title?: React.ReactNode
  steps?: Step[]
} = {}) {
  const t = useMessages()
  const resolvedTitle =
    title ??
    (
      <>
        {t.storyFlow.titleLine1}
        <br />
        {t.storyFlow.titleIn ? <>{t.storyFlow.titleIn}{' '}</> : null}
        <span className="text-cobalt">{t.storyFlow.titleHighlight}</span>
        {t.storyFlow.titleLine2}
      </>
    )
  const resolvedSteps = steps ?? t.storyFlow.steps
  const mocks = t.storyFlow.mocks

  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = wrapRef.current
      if (!el) return

      const range = el.offsetHeight - window.innerHeight
      if (range <= 0) {
        setActive(0)
        return
      }

      const progress = Math.min(Math.max(-el.getBoundingClientRect().top / range, 0), 1)
      const step = Math.min(
        resolvedSteps.length - 1,
        Math.floor(progress * resolvedSteps.length),
      )
      setActive((prev) => (prev === step ? prev : step))
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [resolvedSteps.length])

  return (
    <section>
      {/* tall track — each viewport-height advances one step */}
      <div ref={wrapRef} style={{ height: `${resolvedSteps.length * 100}dvh` }}>
        <div className="sticky top-0 h-dvh overflow-hidden">
          {/* progress rail across the very top */}
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-line">
            <div
              className="h-full bg-cobalt transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${((active + 1) / resolvedSteps.length) * 100}%` }}
            />
          </div>

          {/* ---------- MOBILE: full-screen stacked ---------- */}
          <div className="flex h-full flex-col px-6 pb-9 pt-24 lg:hidden">
            <div className="shrink-0">
              <h2 className="font-display text-[clamp(1.9rem,8vw,2.6rem)] font-bold leading-[0.98]">
                {resolvedTitle}
              </h2>
            </div>

            <div className="relative flex flex-1 items-center justify-center py-5">
              <div className="grid-paper pointer-events-none absolute inset-0 opacity-50" />
              <motion.div
                key={resolvedSteps[active].key}
                initial={swap.initial}
                animate={swap.animate}
                transition={swap.transition}
                className="relative w-full max-w-sm"
              >
                <Mock stepKey={resolvedSteps[active].key} mocks={mocks} />
              </motion.div>
            </div>

            <div className="shrink-0">
              <div className="flex gap-[6.9px]">
                {resolvedSteps.map((s, i) => (
                  <span
                    key={s.key}
                    className={`h-[4.6px] flex-1 rounded-full transition-colors duration-500 ${
                      i <= active ? 'bg-cobalt' : 'bg-line'
                    }`}
                  />
                ))}
              </div>
              <ol className="mt-[18.4px] space-y-1">
                {resolvedSteps.map((s, i) => {
                  const done = i < active
                  const current = i === active
                  return (
                    <li
                      key={s.key}
                      className={`font-display text-[18px] leading-snug transition-all duration-300 ${
                        current
                          ? 'font-bold text-cobalt'
                          : done
                            ? 'font-bold text-ink'
                            : 'font-normal text-ink-mute'
                      }`}
                    >
                      {s.label}
                    </li>
                  )
                })}
              </ol>
              <div className="mt-[13.8px] flex items-center justify-between gap-[13.8px]">
                <span className="grid size-[32.2px] shrink-0 place-items-center rounded-full bg-cobalt text-[16.5px] font-bold text-paper">
                  {resolvedSteps[active].noNumber ? (
                    <LockKeyOpen weight="bold" className="size-[16.5px]" />
                  ) : (
                    active + 1
                  )}
                </span>
                <span className="shrink-0 text-[16.5px] font-semibold text-ink-mute">
                  {active + 1} / {resolvedSteps.length}
                </span>
              </div>
              <p className="mt-[9.2px] text-[18.3px] leading-relaxed text-ink-soft">
                {resolvedSteps[active].desc}
              </p>
            </div>
          </div>

          {/* ---------- DESKTOP: two columns ---------- */}
          <div className="hidden h-full items-center lg:flex">
          <div className="shell grid w-full items-center gap-12 lg:grid-cols-2">
            {/* left — narrative + accumulating checklist */}
            <div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[0.98]">
                {resolvedTitle}
              </h2>

              <ol className="mt-[46px] space-y-[4.6px]">
                {resolvedSteps.map((s, i) => {
                  const done = i < active
                  const current = i === active
                  return (
                    <li key={s.key} className="flex gap-[18.4px]">
                      {/* marker + connector */}
                      <div className="flex flex-col items-center">
                        <span
                          className={`grid size-[41.4px] shrink-0 place-items-center rounded-full text-[17.7px] font-bold transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            done
                              ? 'bg-cobalt text-paper'
                              : current
                                ? 'border-2 border-cobalt bg-paper text-cobalt'
                                : 'border border-line bg-paper text-ink-mute'
                          }`}
                        >
                          <StepMarker step={s} index={i} done={done} />
                        </span>
                        {i < resolvedSteps.length - 1 && (
                          <span
                            className={`my-[4.6px] w-px flex-1 transition-colors duration-500 ${
                              done ? 'bg-cobalt' : 'bg-line'
                            }`}
                          />
                        )}
                      </div>

                      {/* label + expanding description */}
                      <div className="pb-[27.6px]">
                        <div
                          className={`font-display text-[26.4px] transition-all duration-300 ${
                            current
                              ? 'font-bold text-cobalt'
                              : done
                                ? 'font-bold text-ink'
                                : 'font-normal text-ink-mute'
                          }`}
                        >
                          {s.label}
                        </div>
                        <AnimatePresence initial={false}>
                          {current && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden text-[19.7px] leading-relaxed text-ink-soft"
                            >
                              <span className="block pt-[9.2px]">{s.desc}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* right — morphing glass mockup */}
            <div className="relative flex min-h-[420px] items-center justify-center">
              <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
              <motion.div
                key={resolvedSteps[active].key}
                initial={swap.initial}
                animate={swap.animate}
                transition={swap.transition}
                className="relative flex w-full justify-center"
              >
                <Mock stepKey={resolvedSteps[active].key} mocks={mocks} />
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
