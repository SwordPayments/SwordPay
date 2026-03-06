import { useState, useEffect, useCallback } from "react";
import { FloatingWidget } from "@/components/floating-widget";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
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
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <h1 className="text-[8.7vw] md:text-[4.73rem] font-bold text-white leading-tight tracking-tight mb-4 whitespace-nowrap [text-shadow:0_0_30px_rgba(255,255,255,0.35)]">
                  Sell Any File in Seconds
                </h1>
                <p
                  className="flex flex-nowrap items-baseline text-[8vw] md:text-[4.3rem] font-bold text-white leading-tight tracking-tight [text-shadow:0_0_30px_rgba(255,255,255,0.35)]"
                >
                  {words.map((word, i) => (
                    <span
                      key={word}
                      className="animate-arrow-seq-flash"
                      style={{
                        display: 'inline',
                        marginRight: '0.5em',
                        whiteSpace: 'nowrap',
                        animationDelay: i === 0 ? '0s' : i === 1 ? '1.2s' : '2.4s',
                        animationFillMode: 'backwards',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </p>
              </div>

            </div>
            {/* Arrow + Widget on the right */}
            <div className="shrink-0 mt-12 sm:mt-16 flex items-start gap-1" style={{position: 'relative'}}>
              <span className="animate-arrow-seq-flash text-white text-[4.8vw] md:text-[2.58rem]" style={{display: 'inline-block', alignSelf: 'flex-start', marginTop: '90px', animationDelay: '2.4s', animationFillMode: 'backwards', textShadow: '0 0 12px rgba(99,179,255,1), 0 0 24px rgba(99,179,255,0.8)', verticalAlign: 'top'}}>→</span>
              <span className="animate-arrow-seq-flash text-white text-[4.8vw] md:text-[2.58rem]" style={{display: 'inline-block', alignSelf: 'flex-start', marginTop: '290px', position: 'absolute', animationDelay: '1.2s', animationFillMode: 'backwards', textShadow: '0 0 12px rgba(99,179,255,1), 0 0 24px rgba(99,179,255,0.8)', verticalAlign: 'top'}}>→</span>
              <span className="animate-arrow-seq-flash text-white text-[4.8vw] md:text-[2.58rem]" style={{display: 'inline-block', alignSelf: 'flex-start', marginTop: '217px', position: 'absolute', animationDelay: '0s', animationFillMode: 'backwards', textShadow: '0 0 12px rgba(99,179,255,1), 0 0 24px rgba(99,179,255,0.8)', verticalAlign: 'top'}}>→</span>
              <FloatingWidget className="relative z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0 w-[154px] min-[414px]:w-[193px] sm:w-[165px] lg:w-[198px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-[380px] md:h-[550px]" data-testid="hero2-section">
        {hero2Images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-600 ${
              i === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <div
            className={`text-center transition-all duration-500 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {(t(`home.slides.slide${slideIndex + 1}`, { returnObjects: true }) as string[]).map((line, i) => (
              <p
                key={i}
                className={`font-bold text-white leading-tight tracking-tight ${
                  i % 2 === 0 ? "text-2xl md:text-4xl text-white/70" : "text-4xl md:text-6xl"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-[320px] md:h-[500px]" data-testid="hero3-section">
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
            <div>
              <div className="rounded-xl overflow-hidden mb-1 aspect-[4/3]">
                <img src="/images/card-conversion.jpeg" alt="Higher Conversion" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-blue-600 mb-0">{t('home.features.conversion')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('home.features.conversionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
