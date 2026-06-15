import type { LandingMessages } from '../types'

const en: LandingMessages = {
  meta: {
    title: 'SwordPay — Monetize your content, sharpened.',
  },
  nav: {
    product: 'Product',
    forCreators: 'For creators',
    howTo: 'How to',
    pricing: 'Pricing',
    startEarning: 'Start earning',
    language: 'Language',
    menu: 'Menu',
    detected: 'Detected',
  },
  footer: {
    tagline:
      'The sharpest way for creators to turn an audience into income. Memberships, products, and payouts — one clean edge.',
    operational: 'All systems operational',
    company: 'Company',
    about: 'About',
    contact: 'Contact',
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    acceptableUse: 'Acceptable Use & Content Policy',
    safety: 'Safety & Transparency Center',
    copyright: '© 2026 SwordPay, Inc. Built for people who make things.',
    motto: 'Drawn sharp. Paid fast.',
  },
  storyFlow: {
    titleLine1: 'From link to money,',
    titleIn: 'in',
    titleHighlight: 'seconds',
    titleLine2: '.',
    steps: [
      {
        key: 'upload',
        label: 'Upload Digital File',
        desc: 'Files, videos, courses, reports or community access. SwordPay hosts it and delivers it automatically.',
      },
      {
        key: 'share',
        label: 'Share one link',
        desc: 'Send your private PayLink on WhatsApp, Instagram, Telegram or anywhere your buyers already are.',
      },
      {
        key: 'paid',
        label: 'Get paid',
        desc: 'The buyer pays. The sale is confirmed automatically — no manual checks, no back-and-forth.',
      },
      {
        key: 'access',
        label: 'Access unlocked',
        desc: 'The customer gets access instantly, the moment payment lands. You do nothing.',
        noNumber: true,
      },
    ],
    mocks: {
      uploading: 'Uploading',
      lockedPreview: 'Locked preview',
      uploaded: 'uploaded',
      yourPayLink: 'Your PayLink',
      linkCopied: 'Link copied',
      notification: 'Notification',
      paymentReceived: 'Payment received · $29.00',
      paymentBody: 'A new buyer just paid. Access was granted automatically.',
      saleConfirmed: 'Sale confirmed automatically',
      accessUnlocked: 'Access unlocked',
      availableToBuyer: 'Available to the buyer',
      done: 'Done',
      notificationNow: 'now',
      uploadImageAlt: 'Premium image being uploaded',
      unlockedImageAlt: 'The unlocked premium image',
      uploadFileMeta: '3.8 MB · JPG',
      uploadPercent: '100%',
      demoFileName: 'golden-hour-01.jpg',
      shareChannels: ['WhatsApp', 'Instagram', 'Telegram'],
    },
  },
  product: {
    hero: {
      titlePrefix: 'Turn anything',
      titleHighlight: 'value',
      titleSuffix: '.',
      tagline1: 'One PayLink.',
      tagline2: 'Multiple payments.',
      tagline3: 'Instant access.',
      body: 'Upload anything — files, content, knowledge, communities, access — share one link, and get paid instantly. The customer gets access automatically.',
      ctaPrimary: 'Create your First PayLink',
      ctaSecondary: '▶ See how it works',
      chips: [
        'Instant access after payment',
        'No monthly subscription fees',
        'Value sharing with collaborators',
        'Built for creators worldwide',
      ],
      creatorAlt: 'A creator at work',
      yourPayLink: 'Your PayLink',
      instantAccess: 'Instant access',
      paymentReceived: 'Payment received',
      titleInto: 'into',
      demoPaymentAmount: '$29.00',
    },
    problem: {
      headingLine1: 'Most Creators',
      headingLine2: 'take too many steps to do one job.',
      chain: [
        { app: 'Social Media', job: 'Marketing' },
        { app: 'Website', job: 'Collect payment' },
        { app: 'Bank', job: 'Verify payment' },
        { app: 'Drive', job: 'Send files' },
        { app: 'Access', job: 'Give access' },
        { app: 'Support', job: 'Fix issues' },
      ],
      socialMedia: 'Social Media',
      marketing: 'Marketing',
      replaces: 'replaces all of this.',
      friction: 'Less Friction. More Access. More Payments',
      paymentSeconds: 'Payment in Seconds',
    },
    how: {
      headingLine1: 'From upload to payment',
      headingIn: 'in',
      headingHighlight: '5 seconds',
      headingSuffix: '.',
      subheading:
        'Upload once, share one link — then watch the payments roll in, on their own, around the clock.',
      upload: 'Upload',
      oneLink: 'Create your First PayLink',
      paymentReceived: 'Payment received',
      contentAlt: 'Content to sell',
      demoFileName: 'golden-hour-01.jpg',
      pays: [
        { amount: '$29', label: 'Photo set' },
        { amount: '$99', label: 'Full course access' },
        { amount: '$19', label: 'Sample pack' },
        { amount: '$59', label: 'Match breakdown' },
        { amount: '$15', label: 'Private group invite' },
        { amount: '$45', label: 'Coaching call' },
        { amount: '$120', label: 'Strategy report' },
        { amount: '$12', label: 'Exclusive track' },
      ],
    },
    pricing: {
      heading: 'Traditional way vs',
      subheading: 'Stop juggling apps. One PayLink replaces the entire workflow.',
      traditionalFlow: 'Traditional Flow',
      swordpay: 'SwordPay',
      rows: [
        ['Multiple tools', 'One PayLink'],
        ['Manual payment verification', 'Automatic'],
        ['Manual delivery', 'Instant delivery'],
        ['Delayed access', 'Instant access'],
        ['High friction', 'Frictionless'],
        ['Lost sales', 'Higher conversion'],
        ['Multiple subscriptions', 'No monthly fees'],
      ],
      noMonthly: 'No monthly fees.',
      feeMain: '10%',
      feeSub: '+ $0.50',
      feeNote: 'only when you successfully sell',
      bullets: [
        'No setup fees.',
        'No monthly subscriptions.',
        'No hidden costs.',
        'You only pay when you earn.',
        'Local payment methods included.',
      ],
      cta: 'Start selling',
    },
    audience: {
      heading: 'Who uses SwordPay?',
      category: 'Category',
      whatTheySell: 'What they sell',
      whyItWorks: 'Why it works',
      rows: [
        {
          who: 'Creators',
          sell: 'Premium videos, photos, behind-the-scenes content',
          why: 'Fans pay once and unlock instantly.',
        },
        {
          who: 'Astrologers',
          sell: 'Horoscopes, natal charts, compatibility reports',
          why: 'Personalized digital access is easy to price and deliver.',
        },
        {
          who: 'Nutritionists',
          sell: 'Meal plans, weight-loss guides, supplement protocols',
          why: 'Plans can be sold directly before delivery.',
        },
        {
          who: 'Fitness Coaches',
          sell: 'Workout programs, transformation plans, video coaching',
          why: 'Training programs become paid digital products.',
        },
        {
          who: 'Musicians',
          sell: 'Songs, beats, sample packs, exclusive releases',
          why: 'Fans and clients get files immediately after payment.',
        },
        {
          who: 'Sports Tipsters',
          sell: 'Predictions, match analysis, VIP pick groups',
          why: 'Time-sensitive information unlocks at the exact moment of payment.',
        },
        {
          who: 'Analysts',
          sell: 'Crypto reports, market research, paid insights',
          why: 'Premium knowledge becomes a transaction, not a conversation.',
        },
        {
          who: 'Community Owners',
          sell: 'Telegram groups, Discord access, memberships',
          why: 'Access can be charged and controlled through one PayLink.',
        },
      ],
    },
    features: {
      heading: 'Built for Monetizing your Socializing',
      subheading: "Everything you need to get paid and nothing you don't.",
      items: [
        'Instant access',
        'Value sharing',
        'Global payments',
        'Fraud protection',
        'Creator dashboard',
        'No subscription fees',
      ],
    },
    localPayments: {
      badge: 'Built for local payments',
      heading: 'Global reach.',
      headingHighlight: 'Local payment behavior.',
      body: 'SwordPay is designed for markets where creators already sell through DMs, WhatsApp and private communities — especially Brazil and LATAM.',
      methods: [
        { name: 'PIX', place: 'Brazil' },
        { name: 'SPEI', place: 'Mexico' },
        { name: 'PSE', place: 'Colombia' },
        { name: 'Cards', place: 'Worldwide' },
      ],
    },
    dazn: {
      partner: 'Payment Partner of DAZN',
      heading: 'Profit Beyond Borders.',
      leagueLogosAlt: 'League logos',
      cards: [
        {
          title: 'Marketing',
          body: 'Join DAZN and other leading brands on SWORD, and gain access to a global audience.',
        },
        {
          title: 'Global Payments',
          body: 'Accept unlimited Payments from anywhere in the world.',
        },
      ],
    },
    whyNot: {
      headingLine1: 'Why SwordPay instead',
      headingLine2: 'of another tool?',
      subheading:
        'SwordPay is not another creator profile, storefront or payment button. It is instant paid access infrastructure.',
      whyNot: 'Why not',
      cards: [
        {
          tool: 'Patreon',
          their: 'Patreon was built for subscriptions.',
          ours: 'SwordPay was built for instant transactions. Buyers pay once and get access immediately. No membership required.',
        },
        {
          tool: 'Gumroad',
          their: 'Gumroad helps you sell products.',
          ours: 'SwordPay helps you monetize access. Payment, delivery and access happen automatically through a single PayLink.',
        },
        {
          tool: 'Stripe Payment Links',
          their: 'Stripe collects payment.',
          ours: 'SwordPay collects payment and unlocks access automatically. No manual delivery. No extra tools. No workflow gaps.',
        },
      ],
    },
    cta: {
      headingLine1: 'Stop chasing payments.',
      headingLine2Prefix: 'Get paid ',
      headingLine2Highlight: 'automatically',
      headingLine2Suffix: '.',
      body: 'Turn access, content, files, knowledge and communities into instant paid access. Create your first PayLink in under 60 seconds.',
      primary: 'Create your First PayLink',
      secondary: 'See how it works',
    },
  },
  creators: {
    hero: {
      titleLine1: 'You made the audience.',
      titleLine2Prefix: 'Now ',
      titleLine2Highlight: 'make a living',
      titleLine2Suffix: '.',
      bodyLine1: 'Whether you podcast, paint, teach, or play — SwordPay gives you',
      bodyLine2: 'every way to earn from your work, and pays you the moment a fan says yes.',
      ctaPrimary: 'Create your First PayLink',
      ctaSecondary: 'See the ways to earn',
      stats: [
        { value: '12,847', label: 'creators paid' },
        { value: '$23M', label: 'processed' },
        { value: '190+', label: 'countries' },
      ],
      videoTitle: 'SwordPay for creators',
      playLabel: 'Play video with sound',
      replayLabel: 'Replay video',
      pauseLabel: 'Pause video',
    },
    steps: {
      heading: 'Three Simple Steps',
      items: [
        { label: 'Set Price', alt: 'Set Price complete' },
        { label: 'Add File', alt: 'Add File complete' },
        { label: 'Share', alt: 'Share complete' },
      ],
    },
    streams: {
      heading: 'Every Income stream, one Solution.',
      subheading: 'Mix and match however your craft works. Turn any of these on with a single switch.',
      items: [
        {
          title: 'Memberships',
          body: 'Monthly support with tiers and perks your true fans actually want.',
        },
        {
          title: 'Digital products',
          body: 'Courses, presets, templates, packs — sell once, deliver instantly.',
        },
        {
          title: 'Tips & paid DMs',
          body: 'Let fans say thanks, or pay for a personal reply, shout-out, or request.',
        },
        {
          title: 'Live & events',
          body: 'Ticketed streams, workshops, and listening parties with paid access.',
        },
      ],
    },
    testimonials: {
      heading: 'Real people, drawing real income.',
      rating: 'from 2,000+ creators',
      items: [
        {
          name: 'Maya Okonkwo',
          role: 'Podcaster · The Long Cut',
          quote:
            'I moved three tools into SwordPay and doubled what I take home. The instant payouts feel almost unfair.',
          stat: '+112% take-home',
        },
        {
          name: 'Helena März',
          role: 'Educator · Design Foundations',
          quote:
            'My course sells while I sleep and the money is just there in the morning. No 30-day wait, no chasing.',
          stat: '4,800 students',
        },
        {
          name: 'Kai Render',
          role: 'Musician · sample packs',
          quote:
            "It looks like something I'd actually want my name on. Fans get a clean page, I get paid the second they buy.",
          stat: '$31k in 6 months',
        },
      ],
    },
    faq: {
      heading: "Everything you'd want to ask.",
      subheading:
        'Still curious? Our creator team replies to every message — usually within a few hours.',
      items: [
        {
          q: 'How much does SwordPay cost?',
          a: 'It is free to set up and publish. We take 10% + $0.50 per successful sale, which covers payment processing, delivery, and instant access. There are no setup fees, no monthly subscriptions, and no hidden cuts.',
        },
        {
          q: 'How fast does the buyer get access?',
          a: 'Instantly. The moment a payment is confirmed, access is unlocked automatically and the buyer can open their content — no manual delivery and no back-and-forth on your end.',
        },
        {
          q: 'Do I own my audience?',
          a: 'Always. Your member and customer data is yours to view, export, and take with you at any time. We never lock your audience behind our walls.',
        },
        {
          q: 'Can I move from another platform?',
          a: 'Yes. You can import members and products from most major platforms, and our team will help you migrate without losing a single subscriber.',
        },
        {
          q: 'What can I sell?',
          a: 'Memberships, digital products, tips, paid messages, and ticketed live events — in any combination. If you make it, you can list it.',
        },
      ],
    },
    cta: {
      headingLine1: 'Your craft is ready.',
      headingLine2: 'So is your income.',
      body: 'The sharpest way for creators to turn an audience into income. Memberships, products, and payouts — one clean edge.',
      primary: 'Create your First PayLink',
      secondary: 'Explore the product',
    },
  },
}

export default en
