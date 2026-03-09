import { storage } from "./storage";

const BASE_URL = "https://swordpay.com";
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-bg.jpg`;

interface MetaTags {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  canonical: string;
  jsonLd: object | object[];
}

async function getMetaForPath(url: string): Promise<MetaTags> {
  const path = url.split("?")[0];

  // Creator pages — dynamic meta + JSON-LD from DB
  const creatorMatch = path.match(/^\/creator\/([^/]+)/);
  if (creatorMatch) {
    try {
      const creator = await storage.getCreatorBySlug(creatorMatch[1]);
      if (creator) {
        const creatorUrl = `${BASE_URL}/creator/${creator.slug}`;
        const coverImage = creator.coverUrl ? `${BASE_URL}${creator.coverUrl}` : DEFAULT_IMAGE;
        return {
          title: `${creator.name} | SwordPay`,
          description: creator.tagline || `Support ${creator.name} on SwordPay. ${creator.description?.slice(0, 120) || ""}`,
          ogTitle: `${creator.name} | SwordPay`,
          ogDescription: creator.tagline || `Support ${creator.name} on SwordPay`,
          ogImage: coverImage,
          ogUrl: creatorUrl,
          ogType: "profile",
          twitterCard: "summary_large_image",
          canonical: creatorUrl,
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "url": creatorUrl,
              "name": `${creator.name} on SwordPay`,
              "description": creator.tagline || creator.description?.slice(0, 200),
              "image": coverImage,
              "mainEntity": {
                "@type": "Person",
                "name": creator.name,
                "description": creator.tagline,
                "url": creatorUrl,
                "image": creator.avatarUrl ? `${BASE_URL}${creator.avatarUrl}` : coverImage,
                "sameAs": Object.values(creator.socialLinks || {}).filter(Boolean),
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": `${creator.name} — Digital Content`,
              "description": creator.tagline || `Exclusive digital content by ${creator.name}`,
              "url": creatorUrl,
              "image": coverImage,
              "brand": {
                "@type": "Brand",
                "name": "SwordPay",
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "SwordPay",
                  "url": BASE_URL,
                },
              },
            },
          ],
        };
      }
    } catch (_) {}
  }

  // Homepage JSON-LD — WebSite + Organization
  const homepageJsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": BASE_URL,
      "name": "SwordPay",
      "description": "Sell any digital file in seconds. Post anywhere. Earn everywhere.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/explore?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SwordPay",
      "url": BASE_URL,
      "logo": `${BASE_URL}/images/sword-logo.png`,
      "description": "The fastest way for creators to monetise their content globally. Sell digital files in seconds.",
      "sameAs": [
        "https://twitter.com/swordpay",
        "https://instagram.com/swordpay",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": BASE_URL,
      },
    },
  ];

  // Static pages
  const pages: Record<string, MetaTags> = {
    "/": {
      title: "SwordPay — Turn your Content into Cash",
      description: "Sell any digital file in seconds. Post anywhere. Earn everywhere. The fastest way for creators to monetise their content globally.",
      ogTitle: "SwordPay — Turn your Content into Cash",
      ogDescription: "Sell any digital file in seconds. Post anywhere. Earn everywhere.",
      ogImage: DEFAULT_IMAGE,
      ogUrl: BASE_URL,
      ogType: "website",
      twitterCard: "summary_large_image",
      canonical: BASE_URL,
      jsonLd: homepageJsonLd,
    },
    "/explore": {
      title: "Explore Creators | SwordPay",
      description: "Discover and support amazing creators selling digital content on SwordPay. Videos, music, courses, templates and more.",
      ogTitle: "Explore Creators | SwordPay",
      ogDescription: "Discover and support amazing creators on SwordPay.",
      ogImage: DEFAULT_IMAGE,
      ogUrl: `${BASE_URL}/explore`,
      ogType: "website",
      twitterCard: "summary_large_image",
      canonical: `${BASE_URL}/explore`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Explore Creators | SwordPay",
        "description": "Discover and support amazing creators selling digital content on SwordPay.",
        "url": `${BASE_URL}/explore`,
        "isPartOf": { "@type": "WebSite", "url": BASE_URL, "name": "SwordPay" },
      },
    },
    "/how-it-works": {
      title: "How It Works | SwordPay",
      description: "Add your file, share your link, get paid. SwordPay makes it simple for creators to sell digital content anywhere in the world.",
      ogTitle: "How SwordPay Works",
      ogDescription: "Add your file, share your link, get paid. Simple creator monetisation.",
      ogImage: DEFAULT_IMAGE,
      ogUrl: `${BASE_URL}/how-it-works`,
      ogType: "website",
      twitterCard: "summary_large_image",
      canonical: `${BASE_URL}/how-it-works`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to sell digital content with SwordPay",
        "description": "Sell any digital file in seconds using SwordPay.",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Add your file", "text": "Upload any digital file — videos, courses, music, templates, PDFs and more." },
          { "@type": "HowToStep", "position": 2, "name": "Share your link", "text": "Share your SwordPay link anywhere — social media, WhatsApp, email, or your website." },
          { "@type": "HowToStep", "position": 3, "name": "Get paid", "text": "Receive payments from anywhere in the world instantly through SwordPay." },
        ],
      },
    },
  };

  return pages[path] ?? pages["/"];
}

export function buildMetaTags(meta: MetaTags): string {
  const jsonLdArray = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
  const jsonLdTags = jsonLdArray
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n    ");

  return `
    <title>${meta.title}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${meta.canonical}" />

    <!-- Open Graph -->
    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:url" content="${meta.ogUrl}" />
    <meta property="og:title" content="${esc(meta.ogTitle)}" />
    <meta property="og:description" content="${esc(meta.ogDescription)}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:site_name" content="SwordPay" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="${meta.twitterCard}" />
    <meta name="twitter:title" content="${esc(meta.ogTitle)}" />
    <meta name="twitter:description" content="${esc(meta.ogDescription)}" />
    <meta name="twitter:image" content="${meta.ogImage}" />

    <!-- Structured Data (JSON-LD) -->
    ${jsonLdTags}`.trim();
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export { getMetaForPath };
