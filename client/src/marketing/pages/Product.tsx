import {
  Lightning,
  UsersThree,
  Globe,
  ShieldCheck,
  ChartBar,
  Money,
  Check,
  X,
  CurrencyDollar,
  LinkSimple,
  WhatsappLogo,
  InstagramLogo,
  YoutubeLogo,
  Browser,
  Bank,
  FolderSimple,
  LockKeyOpen,
  Headset,
  CheckCircle,
  UploadSimple,
  ArrowRight,
} from '@phosphor-icons/react'
import { Reveal, Button, Section } from '../components/ui'
import StoryFlow from '../components/StoryFlow'
import { SwordMark } from '../components/Logo'
import { px, img } from '../lib/images'
import { useMessages } from '../i18n'

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const t = useMessages()
  const h = t.product.hero
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="grid-paper pointer-events-none absolute inset-0 -z-10" />
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <h1 className="font-display text-[clamp(2.52rem,5.82vw,4.46rem)] font-extrabold leading-[0.95] tracking-tight">
                {h.titlePrefix}
                <br />
                {h.titleInto ? <>{h.titleInto}{' '}</> : null}
                <span className="relative whitespace-nowrap text-cobalt">
                  {h.titleHighlight}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C60 3 220 2 298 7"
                      stroke="#2D5BFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {h.titleSuffix}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 font-display text-[30px] font-semibold text-cobalt flex flex-wrap items-baseline gap-x-[0.3em]">
                <span>{h.tagline1}</span>
                <span>{h.tagline2}</span>
                <span>{h.tagline3}</span>
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 max-w-md text-[19.8px] leading-relaxed text-ink-soft">
                {h.body}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 flex flex-wrap items-center gap-[13.2px]">
                <Button
                  href="https://swordpay.me"
                  className="!px-[22px] !py-[11px] !text-[18.2px] [&_svg]:!size-[17.6px]"
                >
                  {h.ctaPrimary}
                </Button>
                <Button
                  href="#flow"
                  variant="outline"
                  icon={false}
                  className="!px-[22px] !py-[11px] !text-[18.2px]"
                >
                  {h.ctaSecondary}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <ul className="mt-6 grid max-w-md grid-cols-1 gap-x-[26.4px] gap-y-[11px] sm:grid-cols-2">
                {h.chips.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-[11px] text-[17.5px] text-ink-soft"
                  >
                    <Check weight="bold" className="size-[17.6px] shrink-0 text-cobalt" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Liquid-glass payment mockup */}
          <Reveal delay={0.2} className="relative">
            <div className="relative mx-auto max-w-sm">
              <img
                src={px(img.creatorDesk, 900)}
                alt={h.creatorAlt}
                className="aspect-[4/5] w-full rounded-[var(--radius-xl)] border border-line object-cover"
              />

              {/* Floating glass PayLink card */}
              <div
                className="absolute -left-6 top-10 scale-[0.92] origin-top-left"
              >
                <div
                  className="float-in glass w-60 rounded-[var(--radius-md)] p-4"
                  style={{ animationDelay: '0.45s' }}
                >
                  <div className="flex items-center gap-2 text-[13.2px] font-semibold uppercase tracking-wide text-ink-mute">
                    <LinkSimple weight="bold" className="size-4" /> {h.yourPayLink}
                  </div>
                  <div className="mt-2 truncate rounded-full bg-paper-deep px-3 py-1.5 font-mono text-[14.3px] font-medium">
                    swordpay.me/pay/abc123
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[13.2px] text-ink-mute">{h.instantAccess}</span>
                    <CheckCircle weight="fill" className="size-5 text-cobalt" />
                  </div>
                </div>
              </div>

              {/* Floating glass payment chip */}
              <div
                className="absolute -right-5 bottom-8 scale-[1.5] origin-bottom-right"
              >
                <div
                  className="float-in glass flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5"
                  style={{ animationDelay: '0.65s' }}
                >
                  <span className="grid size-9 place-items-center rounded-full bg-cobalt text-paper">
                    <CurrencyDollar weight="fill" className="size-4" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[13.2px] text-ink-mute">{h.paymentReceived}</div>
                    <div className="font-display text-[16.5px] font-bold">{h.demoPaymentAmount}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PROBLEM — five tools to do one job
   ============================================================ */
const PROBLEM_CHAIN_ICONS = [
  {
    icons: [
      { icon: WhatsappLogo, className: 'text-[#25D366]' },
      { icon: InstagramLogo, className: 'text-[#E4405F]' },
      { icon: YoutubeLogo, className: 'text-[#FF0000]' },
    ],
  },
  { icon: Browser },
  { icon: Bank },
  { icon: FolderSimple },
  { icon: LockKeyOpen },
  { icon: Headset },
] as const

function Problem() {
  const t = useMessages()
  const p = t.product.problem
  const chain = p.chain.map((item, i) => ({
    ...item,
    ...PROBLEM_CHAIN_ICONS[i],
  }))
  return (
    <Section className="border-y border-line bg-paper-deep !pt-12 !pb-6 md:!pt-16 md:!pb-8">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2.3rem,4.6vw,3.57rem)] font-bold whitespace-nowrap">
            {p.headingLine1} {p.headingLine2}
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-3">
          {chain.map((c, i) => {
            const Single = 'icon' in c ? c.icon : undefined
            return (
            <div key={c.app} className="flex items-center gap-3">
              <div
                className={`flex flex-col items-center rounded-[var(--radius-md)] border border-line bg-paper px-3 py-5 text-center ${
                  'icons' in c && c.icons && c.icons.length > 2 ? 'w-40' : 'w-32'
                }`}
              >
                <span
                  className={
                    'icons' in c && c.icons
                      ? 'flex h-12 items-center justify-center gap-1.5'
                      : 'grid size-12 place-items-center rounded-[var(--radius-sm)] bg-cobalt text-paper shadow-lg shadow-cobalt/30 ring-1 ring-cobalt/20'
                  }
                >
                  {'icons' in c && c.icons
                    ? c.icons.map(({ icon: Ic, className }, idx) => (
                        <Ic
                          key={idx}
                          weight="fill"
                          className={`size-9 ${className}`}
                        />
                      ))
                    : Single && <Single weight="bold" className="size-6" />}
                </span>
                <div className="mt-3 text-[15.4px] font-bold">{c.app}</div>
                <div className="mt-0.5 text-[13.8px] text-ink-mute">{c.job}</div>
              </div>
              {i < chain.length - 1 && (
                <ArrowRight
                  weight="bold"
                  className="hidden size-5 shrink-0 text-ink sm:block"
                />
              )}
            </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mx-auto mt-8 max-w-2xl rounded-[var(--radius-lg)] border border-cobalt/30 bg-cobalt-wash px-6 py-4 text-center">
          <span className="grid mx-auto size-11 place-items-center rounded-full bg-cobalt text-paper">
            <SwordMark className="h-6 w-auto" />
          </span>
          <h3 className="mt-2.5 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold">
            <span className="text-cobalt">SwordPay</span> {p.replaces}
          </h3>
          <p className="mx-auto mt-1.5 max-w-xl text-[25.8px] font-bold leading-relaxed text-ink-soft">
            {p.friction}
          </p>
          <p className="mt-1 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-cobalt">
            {p.paymentSeconds}
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

/* ============================================================
   HOW IT WORKS — one PayLink handles everything
   ============================================================ */
function PayChip({ amount, label }: { amount: string; label: string }) {
  const t = useMessages()
  return (
    <div className="mb-3 flex items-center gap-3 rounded-[var(--radius-md)] border border-line bg-paper px-4 py-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cobalt-wash text-cobalt">
        <CurrencyDollar weight="bold" className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[14.8px] font-semibold text-ink">{t.product.how.paymentReceived}</div>
        <div className="truncate text-[13.2px] text-ink-mute">{label}</div>
      </div>
      <span className="font-display text-[17.6px] font-bold text-cobalt">+{amount}</span>
    </div>
  )
}

function How() {
  const t = useMessages()
  const h = t.product.how
  return (
    <Section id="how" className="!pt-8 !pb-14 md:!pt-10 md:!pb-20">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2.09rem,4.75vw,3.42rem)] font-bold leading-[1]">
            {h.headingLine1}
            <br />
            {h.headingIn ? <>{h.headingIn}{' '}</> : null}
            <span className="text-cobalt">{h.headingHighlight}</span>{h.headingSuffix}
          </h2>
          <p className="mt-3 text-[20.6px] text-ink-soft">
            {h.subheading}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* LEFT — upload */}
          <div className="glass mx-auto w-full max-w-sm rounded-[var(--radius-xl)] p-5">
            <div className="flex items-center gap-2 text-[14.3px] font-semibold uppercase tracking-wide text-ink-mute">
              <UploadSimple weight="bold" className="size-4" /> {h.upload}
            </div>
            <div className="mt-3 overflow-hidden rounded-[var(--radius-md)] border border-line">
              <img
                src="/pexels-galina-kolonitskaia-485466282-34005245.jpg"
                alt={h.contentAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-cobalt-wash text-cobalt">
                <CheckCircle weight="fill" className="size-5" />
              </span>
              <div className="text-[14.8px] font-semibold">{h.demoFileName}</div>
            </div>
          </div>

          {/* CENTER — one link to share */}
          <div className="flex items-center justify-center gap-4">
            <ArrowRight
              weight="bold"
              className="hidden size-6 shrink-0 text-line-strong lg:block"
            />
            <div className="flex flex-col items-center gap-[14.4px] text-center">
              <span className="grid size-[57.6px] place-items-center rounded-full bg-cobalt text-paper">
                <LinkSimple weight="bold" className="size-[28.8px]" />
              </span>
              <div className="rounded-full border border-line bg-paper px-[19.2px] py-[9.6px] font-mono text-[17.16px] font-medium">
                swordpay.me/pay/abc123
              </div>
              <div className="text-[24.67px] font-bold uppercase tracking-wide text-[#FFD230]">
                {h.oneLink}
              </div>
            </div>
            <ArrowRight
              weight="bold"
              className="hidden size-6 shrink-0 text-line-strong lg:block"
            />
          </div>

          {/* RIGHT — payments flowing in from above, infinite */}
          <div className="marquee-y relative mx-auto h-[340px] w-full max-w-sm">
            <div className="marquee-y-track">
              {[...h.pays, ...h.pays].map((p, i) => (
                <PayChip key={i} amount={p.amount} label={p.label} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ============================================================
   WHO USES SWORDPAY (table)
   ============================================================ */
const AUDIENCE_EMOJIS = ['🎥', '🔮', '🥗', '💪', '🎵', '⚽', '📈', '👥'] as const

function Audience() {
  const t = useMessages()
  const a = t.product.audience
  return (
    <Section fullWidth edgeToEdge className="border-y border-white/10 bg-[#0A0E1A] !py-10 text-white md:!py-14">
      <Reveal>
        <div className="px-5 pb-6 text-center sm:px-8 lg:px-12 md:pb-8">
          <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-tight text-white">
            {a.heading}
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="w-full overflow-hidden border-y border-white/10 bg-white/[0.04]">
          {/* header */}
          <div className="hidden md:grid md:h-12 md:grid-cols-[1.05fr_1.45fr_1.35fr] bg-[rgba(255,210,48,0.13)]">
            <div className="flex h-full items-center px-5 text-[18px] font-semibold uppercase tracking-[0.06em] text-[#FFD230]">
              {a.category}
            </div>
            <div className="flex h-full items-center px-5 text-[18px] font-semibold uppercase tracking-[0.06em] text-[#FFD230]">
              {a.whatTheySell}
            </div>
            <div className="flex h-full items-center px-5 text-[18px] font-semibold uppercase tracking-[0.06em] text-[#FFD230]">
              {a.whyItWorks}
            </div>
          </div>
          {/* rows */}
          {a.rows.map((r, i) => (
            <div
              key={r.who}
              className={`grid gap-1 px-4 py-2 md:grid md:h-[3.375rem] md:grid-cols-[1.05fr_1.45fr_1.35fr] md:gap-0 md:px-0 md:py-0 ${
                i !== 0 ? 'border-t border-white/[0.08]' : ''
              }`}
            >
              <div className="flex h-full items-center gap-2.5 px-5 font-display font-bold leading-none text-white">
                <span className="text-[26px] leading-none">{AUDIENCE_EMOJIS[i]}</span>
                <span className="text-[21px] leading-none">{r.who}</span>
              </div>
              <div className="flex h-full items-center px-5 text-[19.5px] leading-[1.22] text-white/64">
                {r.sell}
              </div>
              <div className="flex h-full items-center px-5 text-[19.5px] leading-[1.22] text-white/64">
                {r.why}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

/* ============================================================
   FEATURES — built for monetization
   ============================================================ */
const FEATURE_ICONS = [Lightning, UsersThree, Globe, ShieldCheck, ChartBar, Money] as const

function Features() {
  const t = useMessages()
  const f = t.product.features
  return (
    <Section fullWidth className="!py-10 md:!py-12">
      <Reveal>
        <div className="text-center">
          <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold">
            {f.heading}
          </h2>
          <p className="mt-3 text-[18.4px] text-cobalt">
            {f.subheading}
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {f.items.map((title, i) => {
          const Icon = FEATURE_ICONS[i]
          return (
          <Reveal key={title} delay={i * 0.06}>
            <div className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ink">
              <span className="grid size-10 place-items-center rounded-[var(--radius-sm)] bg-cobalt-wash text-cobalt transition-colors duration-300 group-hover:bg-cobalt group-hover:text-paper">
                <Icon weight="bold" className="size-5" />
              </span>
              <h3 className="mt-3 text-[18px] font-bold">{title}</h3>
            </div>
          </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ============================================================
   LOCAL PAYMENTS
   ============================================================ */
const LOCAL_PAYMENT_FLAGS = ['🇧🇷', '🇲🇽', '🇨🇴', '💳'] as const

function LocalPayments() {
  const t = useMessages()
  const lp = t.product.localPayments
  return (
    <Section fullWidth className="border-y border-white/10 bg-gradient-to-br from-[#0A0E1A] to-[#101B4F] !py-14 text-white md:!py-20">
      <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div>
          <Reveal>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
              {lp.badge}
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.12]">
              {lp.heading}{' '}
              <span className="text-[#FFD230]">{lp.headingHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-[19.55px] leading-[1.7] text-white/64">
              {lp.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid w-full grid-cols-2 gap-4 lg:gap-5">
            {lp.methods.map((m, i) => (
              <div
                key={m.name}
                className="rounded-[18px] border border-white/10 bg-white/[0.07] p-6 font-display"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[28px] leading-none">{LOCAL_PAYMENT_FLAGS[i]}</span>
                  <div className="leading-tight">
                    <div className="text-[22px] font-extrabold text-white">{m.name}</div>
                    <div className="mt-1.5 text-[13px] font-medium text-white/56">
                      {m.place}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ============================================================
   DAZN PARTNERSHIP
   ============================================================ */
const DAZN_CARD_IMAGES = ['/dazn/card-marketing.webp', '/dazn/card-payments.jpeg'] as const

function Dazn() {
  const t = useMessages()
  const d = t.product.dazn
  return (
    <Section>
      <Reveal>
        {/* Payment-partner banner */}
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-ink">
          <img
            src="/dazn/hero3-bg.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
          <div className="relative flex min-h-[300px] items-center gap-6 px-6 py-14 md:min-h-[380px] md:gap-10 md:px-14">
            <img
              src="/dazn/liga-strip.png"
              alt={d.leagueLogosAlt}
              className="hidden h-[260px] w-auto object-contain sm:block md:h-[300px]"
            />
            <div>
              <img
                src="/dazn/dazn-logo.png"
                alt="DAZN"
                className="w-[150px] md:w-[184px]"
              />
              <p className="mt-3 text-[16.25px] font-semibold uppercase tracking-[0.2em] text-paper/85">
                {d.partner}
              </p>
              <span className="mt-3 block h-px w-44 bg-paper/30" />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-14 text-center font-display text-[clamp(1.9rem,4vw,3rem)] font-bold">
          {d.heading}
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mx-auto mt-8 grid max-w-3xl gap-8 sm:grid-cols-2">
          {d.cards.map((c, i) => (
            <div key={c.title}>
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line">
                <img
                  src={DAZN_CARD_IMAGES[i]}
                  alt={c.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-[15px] font-bold uppercase tracking-wide text-cobalt">
                {c.title}
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-ink-soft">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

/* ============================================================
   WHY SWORDPAY (vs other tools)
   ============================================================ */
function WhyNot() {
  const t = useMessages()
  const w = t.product.whyNot
  return (
    <Section id="compare" className="scroll-mt-28 border-y border-line bg-paper-deep">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-bold">
            {w.headingLine1}
            <br />
            {w.headingLine2}
          </h2>
          <p className="mt-5 text-[18.7px] leading-relaxed text-ink-soft">
            {w.subheading}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {w.cards.map((c, i) => (
          <Reveal key={c.tool} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7">
              <h3 className="font-display text-[22px] font-bold">
                {w.whyNot} {c.tool}?
              </h3>
              <p className="mt-4 text-[16.5px] leading-relaxed text-ink-mute">
                {c.their}
              </p>
              <div className="my-5 h-px bg-line" />
              <p className="text-[17.1px] leading-relaxed text-ink-soft">
                {c.ours}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================
   PRICING — compare table + pricing card (swordpaytest layout)
   ============================================================ */
function Pricing() {
  const t = useMessages()
  const p = t.product.pricing

  return (
    <Section id="pricing" className="scroll-mt-28 border-y border-line bg-paper-deep !py-10 md:!py-14">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="scroll-mt-28">
          <Reveal>
            <h2 className="text-left text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold">
              {p.heading} <span className="text-cobalt">{p.swordpay}</span>
            </h2>
            <p className="mt-2 text-left text-[16px] text-ink-soft">
              {p.subheading}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <th className="px-5 py-2 text-left text-[15px] font-semibold text-ink-mute" />
                    <th className="bg-paper-deep px-5 py-2 text-center text-[15px] font-semibold text-ink-mute">
                      {p.traditionalFlow}
                    </th>
                    <th className="bg-cobalt-wash px-5 py-2 text-center text-[15px] font-semibold text-cobalt">
                      {p.swordpay}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.rows.map((row, i) => {
                    const last = i === p.rows.length - 1
                    return (
                      <tr
                        key={row[0]}
                        className={`border-t border-line ${last ? 'border-t-2 border-t-cobalt' : ''}`}
                      >
                        <td
                          className={`px-5 py-2 text-left text-[15px] text-ink-soft ${last ? 'font-bold text-ink' : 'font-medium'}`}
                        >
                          {row[0]}
                        </td>
                        <td className="bg-paper-deep px-5 py-2 text-center text-[15px]">
                          <X weight="bold" className="mx-auto size-4 text-red-600" />
                        </td>
                        <td
                          className={`bg-cobalt-wash px-5 py-2 text-center text-[15px] font-semibold text-ink ${last ? 'text-cobalt' : ''}`}
                        >
                          {row[1]}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[var(--radius-lg)] border-2 border-[#ffd230] bg-paper px-7 py-7 text-center shadow-[0_8px_32px_rgba(255,210,48,0.15)]">
            <h3 className="font-display text-[20px] font-bold text-ink">{p.noMonthly}</h3>
            <div className="mt-3 font-display font-extrabold leading-none text-cobalt">
              <span className="text-[52.8px]">{p.feeMain}</span>{' '}
              <span className="text-[23.4px]">{p.feeSub}</span>
            </div>
            <p className="mt-1 text-[15px] text-ink-mute">{p.feeNote}</p>
            <ul className="mt-5 mb-5 flex flex-col gap-2 text-left">
              {p.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5 text-[15px] text-ink-soft">
                  <Check weight="bold" className="size-4 shrink-0 text-cobalt" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Button href="https://swordpay.me" className="w-full justify-center">
              {p.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function CTA() {
  const t = useMessages()
  const c = t.product.cta
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper-deep px-8 py-20 text-center md:py-28">
          <div className="grid-paper pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.98]">
              {c.headingLine1}
              <br />
              {c.headingLine2Prefix}
              <span className="text-cobalt">{c.headingLine2Highlight}</span>
              {c.headingLine2Suffix}
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[19.8px] text-ink-soft">
              {c.body}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="https://swordpay.me">{c.primary}</Button>
              <Button href="#how" variant="outline" icon={false}>
                {c.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function Product() {
  return (
    <>
      <Hero />
      <div id="flow">
        <StoryFlow />
      </div>
      <Problem />
      <How />
      <Pricing />
      <Audience />
      <Features />
      <LocalPayments />
      <Dazn />
      <WhyNot />
      <CTA />
    </>
  )
}
