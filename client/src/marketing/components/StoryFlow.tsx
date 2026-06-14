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

const CONTENT_IMG = '/pexels-galina-kolonitskaia-485466282-34005245.jpg'

type Step = LandingMessages['storyFlow']['steps'][number]
type StoryFlowMocks = LandingMessages['storyFlow']['mocks']

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
          <div className="flex-1 min-w-0">
            <div className="text-[15.4px] font-semibold">{mocks.demoFileName}</div>
            <div className="text-[13.2px] text-ink-mute">{mocks.uploadFileMeta}</div>
          </div>
          <CheckCircle weight="fill" className="size-6 shrink-0 text-cobalt" />
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
        <span className="min-w-0 flex-1 truncate font-mono text-[15.4px] font-medium text-ink">
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
      <div className="mt-4 rounded-[var(--radius-md)] border border-line bg-paper-deep p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-cobalt text-paper">
            <CurrencyDollar weight="bold" className="size-5" />
          </span>
          <div>
            <div className="text-[15.4px] font-semibold">{mocks.paymentReceived}</div>
            <div className="text-[13.2px] text-ink-mute">{mocks.notificationNow}</div>
          </div>
        </div>
        <div className="mt-4 font-display text-[28px] font-bold text-cobalt">{mocks.demoPaymentAmount}</div>
      </div>
      <p className="mt-4 text-[15.4px] leading-relaxed text-ink-soft">{mocks.paymentBody}</p>
    </CardShell>
  )
}

function UnlockMock({ mocks }: { mocks: StoryFlowMocks }) {
  return (
    <CardShell>
      <div className="flex items-center gap-2 text-[14.3px] font-semibold uppercase tracking-wide text-ink-mute">
        <LockKeyOpen weight="bold" className="size-4" /> {mocks.accessUnlocked}
      </div>
      <div className="relative mt-4 overflow-hidden rounded-[var(--radius-md)] border border-line">
        <img src={CONTENT_IMG} alt={mocks.unlockedImageAlt} className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="mt-4 flex items-center gap-2 text-[15.4px] font-semibold text-cobalt">
        <CheckCircle weight="fill" className="size-5" /> {mocks.availableToBuyer}
      </div>
      <p className="mt-2 text-[15.4px] leading-relaxed text-ink-soft">{mocks.done}</p>
    </CardShell>
  )
}

function Mock({ stepKey, mocks }: { stepKey: string; mocks: StoryFlowMocks }) {
  switch (stepKey) {
    case 'upload':
      return <UploadMock mocks={mocks} />
    case 'share':
      return <ShareMock mocks={mocks} />
    case 'paid':
      return <PaidMock mocks={mocks} />
    case 'unlock':
      return <UnlockMock mocks={mocks} />
    default:
      return <UploadMock mocks={mocks} />
  }
}

function StepMarker({ step, index }: { step: Step; index: number }) {
  if (step.noNumber) return <LockKeyOpen weight="bold" className="size-[18px]" />
  return index + 1
}

export default function StoryFlow() {
  const t = useMessages()
  const resolvedTitle = `${t.storyFlow.titleLine1}${t.storyFlow.titleIn}${t.storyFlow.titleHighlight}${t.storyFlow.titleLine2}`
  const steps = t.storyFlow.steps
  const mocks = t.storyFlow.mocks

  return (
    <section className="border-y border-line bg-paper py-16 md:py-20">
      <div className="shell">
        <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[0.98]">
          {resolvedTitle}
        </h2>

        {/* Mobile + tablet: stacked steps */}
        <div className="mt-12 space-y-12 lg:hidden">
          {steps.map((s, i) => (
            <div key={s.key} className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cobalt text-[14px] font-bold text-paper">
                  <StepMarker step={s} index={i} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[22px] font-bold">{s.label}</div>
                  <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </div>
              <Mock stepKey={s.key} mocks={mocks} />
            </div>
          ))}
        </div>

        {/* Desktop: all steps + mocks in two columns */}
        <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-2">
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li key={s.key} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cobalt text-[16px] font-bold text-paper">
                  <StepMarker step={s} index={i} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[24px] font-bold">{s.label}</div>
                  <p className="mt-2 text-[18px] leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="space-y-8">
            {steps.map((s) => (
              <Mock key={s.key} stepKey={s.key} mocks={mocks} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
