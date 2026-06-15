export type LandingMessages = {
  meta: { title: string }
  nav: {
    product: string
    forCreators: string
    howTo: string
    pricing: string
    startEarning: string
    language: string
    menu: string
    detected: string
  }
  footer: {
    tagline: string
    operational: string
    company: string
    about: string
    contact: string
    terms: string
    privacy: string
    cookies: string
    acceptableUse: string
    safety: string
    copyright: string
    motto: string
  }
  storyFlow: {
    titleLine1: string
    titleIn: string
    titleHighlight: string
    titleLine2: string
    steps: { key: string; label: string; desc: string; noNumber?: boolean }[]
    mocks: {
      uploading: string
      lockedPreview: string
      uploaded: string
      yourPayLink: string
      linkCopied: string
      notification: string
      paymentReceived: string
      paymentBody: string
      saleConfirmed: string
      accessUnlocked: string
      availableToBuyer: string
      done: string
      notificationNow: string
      uploadImageAlt: string
      unlockedImageAlt: string
      uploadFileMeta: string
      uploadPercent: string
      demoFileName: string
      shareChannels: [string, string, string]
    }
  }
  product: {
    hero: {
      titlePrefix: string
      titleHighlight: string
      titleSuffix: string
      tagline1: string
      tagline2: string
      tagline3: string
      body: string
      ctaPrimary: string
      ctaSecondary: string
      chips: string[]
      creatorAlt: string
      yourPayLink: string
      instantAccess: string
      paymentReceived: string
      titleInto: string
      demoPaymentAmount: string
    }
    problem: {
      headingLine1: string
      headingLine2: string
      chain: { app: string; job: string }[]
      socialMedia: string
      marketing: string
      replaces: string
      friction: string
      paymentSeconds: string
    }
    how: {
      headingLine1: string
      headingIn: string
      headingHighlight: string
      headingSuffix: string
      subheading: string
      upload: string
      oneLink: string
      paymentReceived: string
      contentAlt: string
      demoFileName: string
      pays: { amount: string; label: string }[]
    }
    pricing: {
      heading: string
      subheading: string
      traditionalFlow: string
      swordpay: string
      rows: [string, string][]
      noMonthly: string
      feeMain: string
      feeSub: string
      feeNote: string
      bullets: string[]
      cta: string
    }
    audience: {
      heading: string
      category: string
      whatTheySell: string
      whyItWorks: string
      rows: { who: string; sell: string; why: string }[]
    }
    features: {
      heading: string
      subheading: string
      items: string[]
    }
    localPayments: {
      badge: string
      heading: string
      headingHighlight: string
      body: string
      methods: { name: string; place: string }[]
    }
    dazn: {
      partner: string
      heading: string
      leagueLogosAlt: string
      cards: { title: string; body: string }[]
    }
    whyNot: {
      headingLine1: string
      headingLine2: string
      subheading: string
      whyNot: string
      cards: { tool: string; their: string; ours: string }[]
    }
    cta: {
      headingLine1: string
      headingLine2Prefix: string
      headingLine2Highlight: string
      headingLine2Suffix: string
      body: string
      primary: string
      secondary: string
    }
  }
  creators: {
    hero: {
      titleLine1: string
      titleLine2Prefix: string
      titleLine2Highlight: string
      titleLine2Suffix: string
      bodyLine1: string
      bodyLine2: string
      ctaPrimary: string
      ctaSecondary: string
      stats: { value: string; label: string }[]
      videoTitle: string
      playLabel: string
      replayLabel: string
      pauseLabel: string
    }
    steps: { heading: string; items: { label: string; alt: string }[] }
    streams: {
      heading: string
      subheading: string
      items: { title: string; body: string }[]
    }
    testimonials: {
      heading: string
      rating: string
      items: { name: string; role: string; quote: string; stat: string }[]
    }
    faq: {
      heading: string
      subheading: string
      items: { q: string; a: string }[]
    }
    cta: {
      headingLine1: string
      headingLine2: string
      body: string
      primary: string
      secondary: string
    }
  }
}
