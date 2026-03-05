import { useState, useEffect, useCallback } from "react";
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
  Upload,
  FileText,
  Link2,
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
  const { phase, wordIndex, words } = useHeroAnimation();
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
    <div className="min-h-screen" style={{ background: "#0d0d1a" }} data-testid="page-home">
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]" data-testid="hero-section"
        style={{ background: "linear-gradient(160deg, #0d0d1a 0%, #110d1f 50%, #0d0d1a 100%)" }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Left: text */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
                🔥 Drop your first product today
              </div>

              {/* Headline */}
              <h1 className="text-[13vw] md:text-[5.2rem] font-black text-white leading-[1.05] tracking-tight mb-4">
                Turn your{" "}
                <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  content
                </span>
                <br />into cash
              </h1>

              {/* Sub */}
              <p className="text-white/60 text-lg md:text-xl mb-8 font-normal">
                Upload a file. Set a price. Share your link.
              </p>

              {/* CTA */}
              <div className="flex flex-col items-start gap-2">
                <Link href="/auth">
                  <button className="text-white font-bold px-8 py-4 rounded-full text-lg flex items-center gap-2"
                    style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                    Start for free →
                  </button>
                </Link>
                <p className="text-white/35 text-sm pl-1">No credit card needed</p>
              </div>
            </div>

            {/* Right: product card mockup */}
            <div className="flex-shrink-0 hidden md:flex items-center justify-center">
              <div className="bg-[#13111e] rounded-[1.5rem] border border-white/8 p-5 shadow-2xl w-[300px]"
                style={{ boxShadow: "0 30px 80px rgba(168,85,247,0.15), 0 0 0 1px rgba(255,255,255,0.04)" }}>
                {/* Creator row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>Y</div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">@yourname</p>
                    <p className="text-white/40 text-xs mt-0.5">Creator</p>
                  </div>
                </div>

                {/* Product thumbnail */}
                <div className="rounded-xl mb-4 flex items-center justify-center h-36 text-white text-2xl font-black tracking-wider"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)" }}>
                  LR
                </div>

                {/* Product info */}
                <p className="text-white font-semibold text-sm mb-1">Lightroom Preset Pack</p>
                <p className="text-white font-black text-2xl mb-4">$12</p>

                {/* Buy Now */}
                <button className="w-full text-white font-bold py-3 rounded-xl text-sm mb-3"
                  style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                  Buy Now
                </button>

                {/* Stats */}
                <p className="text-white/40 text-xs text-center">143 sales &nbsp;·&nbsp; ⭐ 4.9</p>
              </div>
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

      <section className="py-20 md:py-28" style={{ background: "#0d0d1a" }} data-testid="features-cards-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-widest uppercase mb-3"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Why creators choose SwordPay
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-12">
            Everything you need,<br className="hidden md:block" /> nothing you don't
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                ⬆
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Drop any file</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Presets, beats, templates, PDFs, filters — if you made it, you can sell it. Any format, any size.
              </p>
            </div>
            {/* Card 2 */}
            <div className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                💲
              </div>
              <h3 className="text-white font-bold text-xl mb-2">You keep 90%</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                No monthly fees. No hidden costs. You earn 90¢ on every dollar and get paid out instantly.
              </p>
            </div>
            {/* Card 3 */}
            <div className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)" }}>
                🔗
              </div>
              <h3 className="text-white font-bold text-xl mb-2">One link to sell</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Share it on TikTok, Instagram, Twitter, anywhere. Your buyers click, pay, and download. Done.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
