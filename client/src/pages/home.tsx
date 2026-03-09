import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTiktok, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CreatorCard, CreatorCardSkeleton } from "@/components/creator-card";
import { useQuery } from "@tanstack/react-query";
import { useSEO } from "@/hooks/use-seo";
import {
  ArrowRight,
  Palette,
  Music,
  Mic,
  Gamepad2,
  PenTool,
  Video,
  Heart,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { Creator } from "@shared/schema";

const categories = [
  { name: "Art & Illustration", icon: Palette, color: "text-rose-500" },
  { name: "Music", icon: Music, color: "text-violet-500" },
  { name: "Podcasts", icon: Mic, color: "text-amber-500" },
  { name: "Gaming", icon: Gamepad2, color: "text-emerald-500" },
  { name: "Writing", icon: PenTool, color: "text-blue-500" },
  { name: "Video", icon: Video, color: "text-pink-500" },
];


function useHeroAnimation() {
  const [phase, setPhase] = useState<"heading-in" | "heading-out" | "words" | "done">("heading-in");
  const [wordIndex, setWordIndex] = useState(-1);
  const { t: tHero } = useTranslation();
  const words = [tHero('home.hero.word1'), tHero('home.hero.word2'), tHero('home.hero.word3')];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "heading-in") {
      timer = setTimeout(() => setPhase("heading-out"), 2000);
    } else if (phase === "heading-out") {
      timer = setTimeout(() => {
        setPhase("words");
        setWordIndex(0);
      }, 800);
    } else if (phase === "words") {
      if (wordIndex < words.length - 1) {
        timer = setTimeout(() => setWordIndex((i) => i + 1), 600);
      } else {
        setPhase("done");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, wordIndex]);

  return { phase, wordIndex, words };
}

const hero2Images = [
  "/images/hero2-3.jpeg",
  "/images/hero2-1.webp",
  "/images/hero2-4.jpg",
];

function useHero2Animation() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setSlideIndex((i) => (i + 1) % hero2Images.length);
        setTextVisible(true);
      }, 600);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return { slideIndex, textVisible };
}

export default function Home() {
  const { words } = useHeroAnimation();
  const { slideIndex, textVisible } = useHero2Animation();
  const { t } = useTranslation();

  useSEO({
    title: "Sword Creator - Best way for creators to get paid",
    description: "Sell Any File in Seconds. Add File → Share → Get Paid. Discover and support creators on Sword Creator.",
  });

  const { data: featuredCreators, isLoading, error } = useQuery<Creator[]>({
    queryKey: ["/api/creators/featured"],
  });

  return (
    <div className="min-h-screen" data-testid="page-home">
      <section className="relative min-h-[260px] md:min-h-[600px] pb-16 md:pb-20" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover object-center md:object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-36">
          <div className="flex items-start">
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <h1 className="text-[13.76vw] md:text-[6.53rem] font-bold leading-tight tracking-tight mb-4">
                  <span className="block">
                    <span className="text-white">{t('home.hero.line1_white')}</span><span className="text-blue-500">{t('home.hero.line1_blue')}</span>
                  </span>
                  <span className="block text-blue-500">{t('home.hero.line2')}</span>
                </h1>
                <p className="text-[9.7vw] md:text-[4.73rem] font-bold text-white leading-tight tracking-tight mb-4">
                  {t('home.hero.tagline1')}<br className="md:hidden" />
                  {t('home.hero.tagline2')}
                </p>
                <div className="flex gap-3 items-center">
                  <FaInstagram size={34} className="text-pink-500" />
                  <FaYoutube size={34} className="text-red-500" />
                  <SiTiktok size={30} className="text-white" />
                  <SiX size={28} className="text-white" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* For Creators section */}
      <section className="bg-[#F7F9FF] min-h-[100vw] md:min-h-0 py-14 md:py-36 px-4 md:px-12 flex items-center" data-testid="hero2-section">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="text-[12.3vw] md:text-[5.5rem] font-extrabold leading-tight tracking-tight text-[#1a2340] mb-2 md:mb-4">
              {t('home.hero2.headline1')} <span className="text-blue-600">{t('home.hero2.headline2')}</span>
            </h2>
            <p className="text-[#6B7A99] text-[6.76vw] md:text-[2.2rem] mx-auto">
              {t('home.hero2.sub1')} <span className="text-blue-600 font-extrabold">SWORD</span> {t('home.hero2.sub2')}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-6 mb-6 md:mb-14">
            {[
              { icon: "🎬", titleKey: "home.categories.videos", bg: "bg-blue-50" },
              { icon: "🎓", titleKey: "home.categories.courses", bg: "bg-green-50" },
              { icon: "🎵", titleKey: "home.categories.music", bg: "bg-orange-50" },
              { icon: "🎨", titleKey: "home.categories.templates", bg: "bg-purple-50" },
              { icon: "🖼️", titleKey: "home.categories.digitalArt", bg: "bg-cyan-50" },
              { icon: "🎙️", titleKey: "home.categories.coaching", bg: "bg-yellow-50" },
              { icon: "📖", titleKey: "home.categories.pdfs", bg: "bg-emerald-50" },
              { icon: "👗", titleKey: "home.categories.fashion", bg: "bg-pink-50" },
            ].map(({ icon, titleKey, bg }) => (
              <a key={titleKey} href="https://swordpay.me" target="_blank" rel="noopener noreferrer"
                className="bg-white border border-[#E4EAF5] rounded-xl p-3 md:p-8 hover:border-blue-400 transition-all duration-300 group block no-underline text-center">
                <div className={`w-9 h-9 md:w-20 md:h-20 ${bg} rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-4xl mb-2 md:mb-4 mx-auto`}>{icon}</div>
                <h3 className="text-[10.5px] md:text-base font-bold text-[#1a2340] leading-tight">{t(titleKey)}</h3>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-6">
            <a href="https://swordpay.me" target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 md:px-14 md:py-5 rounded-full text-sm md:text-lg transition-all shadow-md shadow-blue-200">
                {t('home.hero2.ctaPrimary')}
              </button>
            </a>
            <a href="/how-it-works">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-5 py-3 md:px-10 md:py-5 rounded-full text-sm md:text-lg transition-all flex items-center gap-1.5">
                <span className="text-blue-600">▶</span> {t('home.hero2.ctaSecondary')}
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-[220px] md:h-[500px]" data-testid="hero3-section">
        <div className="absolute inset-0">
          <img
            src="/images/hero3-bg.webp"
            alt=""
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="flex items-center h-full px-4 sm:px-6 lg:px-8 gap-6 md:gap-10">
            <div className="h-[80%] shrink-0">
              <img
                src="/images/liga-strip.png"
                alt="League logos"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="shrink-0 flex flex-col items-center -mt-8">
              <img
                src="/images/dazn-logo.png"
                alt="DAZN"
                className="w-24 md:w-36 opacity-90"
              />
              <p className="text-white/80 text-xs md:text-sm font-semibold tracking-wider mt-3 uppercase">
                {t('home.features.paymentPartner')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3" data-testid="features-cards-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">{t('home.features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="rounded-xl overflow-hidden mb-1 aspect-[4/3]">
                <img src="/images/card-marketing.webp" alt="Marketing" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-blue-600 mb-0">{t('home.features.marketing')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('home.features.marketingDesc')}</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden mb-1 aspect-[4/3]">
                <img src="/images/card-payments.jpeg" alt="Global Payments" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-blue-600 mb-0">{t('home.features.payments')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('home.features.paymentsDesc')}</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
