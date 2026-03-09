import { storage } from "./storage";

const BASE_URL = "https://swordpay.com";
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-bg.png`;

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
}

async function getMetaForPath(url: string): Promise<MetaTags> {
  const path = url.split("?")[0];

  // Creator pages — dynamic meta from DB
  const creatorMatch = path.match(/^\/creator\/([^/]+)/);
  if (creatorMatch) {
    try {
      const creator = await storage.getCreatorBySlug(creatorMatch[1]);
      if (creator) {
        return {
          title: `${creator.name} | SwordPay`,
          description: creator.tagline || `Support ${creator.name} on SwordPay. ${creator.description?.slice(0, 120) || ""}`,
          ogTitle: `${creator.name} | SwordPay`,
          ogDescription: creator.tagline || `Support ${creator.name} on SwordPay`,
          ogImage: creator.coverUrl ? `${BASE_URL}${creator.coverUrl}` : DEFAULT_IMAGE,
          ogUrl: `${BASE_URL}/creator/${creator.slug}`,
          ogType: "profile",
          twitterCard: "summary_large_image",
          canonical: `${BASE_URL}/creator/${creator.slug}`,
        };
      }
    } catch (_) {}
  }

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
    },
  };

  return pages[path] ?? pages["/"];
}

export function buildMetaTags(meta: MetaTags): string {
  return `
    <title>${meta.title}</title>
    <meta name="description" content="${escape(meta.description)}" />
    <link rel="canonical" href="${meta.canonical}" />

    <!-- Open Graph -->
    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:url" content="${meta.ogUrl}" />
    <meta property="og:title" content="${escape(meta.ogTitle)}" />
    <meta property="og:description" content="${escape(meta.ogDescription)}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:site_name" content="SwordPay" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="${meta.twitterCard}" />
    <meta name="twitter:title" content="${escape(meta.ogTitle)}" />
    <meta name="twitter:description" content="${escape(meta.ogDescription)}" />
    <meta name="twitter:image" content="${meta.ogImage}" />`.trim();
}

function escape(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export { getMetaForPath };
