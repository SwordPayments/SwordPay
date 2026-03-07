import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSEO } from "@/hooks/use-seo";
import {
  ArrowRight,
  Heart,
  Shield,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Star,
  Lock,
  Globe,
} from "lucide-react";

const creatorBenefits = [
  {
    icon: DollarSign,
    title: "Predictable income",
    description: "Earn recurring revenue from your biggest fans instead of relying on ads or one-time sales.",
  },
  {
    icon: Users,
    title: "Build a community",
    description: "Create a dedicated space for your fans to connect with you and each other.",
  },
  {
    icon: Zap,
    title: "Creative freedom",
    description: "Create what you want without worrying about algorithms or platform changes.",
  },
  {
    icon: Shield,
    title: "Own your audience",
    description: "Your membership list is yours. No algorithm decides who sees your content.",
  },
];

const patronBenefits = [
  {
    icon: Star,
    title: "Exclusive content",
    description: "Get access to behind-the-scenes content, early releases, and patron-only updates.",
  },
  {
    icon: Lock,
    title: "Tiered rewards",
    description: "Choose the tier that fits your budget and get benefits at every level.",
  },
  {
    icon: Heart,
    title: "Direct impact",
    description: "Your support directly funds the creators you love, helping them do what they do best.",
  },
  {
    icon: Globe,
    title: "Community access",
    description: "Join a community of fellow fans and interact with creators in a meaningful way.",
  },
];

export default function HowItWorks() {
  const { t } = useTranslation();
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  // Close the expanded video on mouseup/touchend anywhere on the document
  useEffect(() => {
    const close = () => setFullscreenVideo(null);
    document.addEventListener("mouseup", close);
    document.addEventListener("touchend", close);
    document.addEventListener("touchcancel", close);
    return () => {
      document.removeEventListener("mouseup", close);
      document.removeEventListener("touchend", close);
      document.removeEventListener("touchcancel", close);
    };
  }, []);

  // Non-passive touchstart on video thumbnails — bypasses iOS 300ms delay entirely
  // React's onTouchStart/onPointerDown cannot set passive:false; addEventListener can
  useEffect(() => {
    const srcs = ["/set-price.mp4", "/add-file.mp4", "/share.mp4"];
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-video]"));
    const handlers = els.map((el, i) => {
      const fn = (e: TouchEvent) => {
        e.preventDefault(); // stops iOS 300ms delay + scroll interference
        setFullscreenVideo(srcs[i] ?? null);
      };
      el.addEventListener("touchstart", fn, { passive: false });
      return () => el.removeEventListener("touchstart", fn);
    });
    return () => handlers.forEach(cleanup => cleanup());
  }, []);
  useSEO({
    title: "How Sword Creator Works | Sword Creator",
    description: "Learn how Sword Creator helps creators earn recurring income from their fans and build sustainable creative careers.",
  });

  return (
    <div data-testid="page-how-it-works">

      {/* 80% screen video overlay — hold to expand, release to contract */}
      {fullscreenVideo && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center"
        >
          <div className="w-[80vw] h-[80vh] flex items-center justify-center">
            <video
              className="max-w-full max-h-full rounded-2xl shadow-2xl pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: "contain" }}
            >
              <source src={fullscreenVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
      <section className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8 py-[20vw] md:py-5 text-center">
          <h1 className="text-[8.2vw] md:text-[58px] font-bold mb-[1vw] md:mb-2 tracking-tight">
            {t('howItWorks.title')}
          </h1>
          <p className="text-[7vw] md:text-[25px] font-bold text-blue-600 max-w-xl mx-auto">
            Easy setup, no technical skills needed.
          </p>
        </div>
      </section>

      {/* Three Simple Steps cards */}
      <section className="py-[15.6vw] md:py-10 px-[3vw] md:px-8 mb-2 md:mb-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-[3.3vw] md:gap-10">
            {[
              {
                step: "Step 01", title: "Add File",
                desc: "Upload any digital file.",
                icon: <svg className="w-[4.5vw] h-[4.5vw] md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
              },
              {
                step: "Step 02", title: "Share Link",
                desc: "Get a payment link instantly.",
                icon: <svg className="w-[4.5vw] h-[4.5vw] md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
              },
              {
                step: "Step 03", title: "Get Paid",
                desc: "Money goes straight to you.",
                icon: <svg className="w-[4.5vw] h-[4.5vw] md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="border border-[#E4EAF5] rounded-[2.5vw] md:rounded-xl p-[3.3vw] md:p-6 hover:border-blue-500 transition-all duration-300 group bg-white min-h-[42vw] md:min-h-0 flex flex-col justify-center">
                <p className="text-[2.6vw] md:text-[12px] font-extrabold text-blue-600 tracking-widest uppercase mb-[1vw] md:mb-3">{step}</p>
                <div className="w-[7vw] h-[7vw] md:w-11 md:h-11 bg-blue-50 rounded-[1.5vw] md:rounded-xl flex items-center justify-center text-blue-600 mb-[1vw] md:mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">{icon}</div>
                <h3 className="text-[4.1vw] md:text-xl font-extrabold text-[#1a2340] mb-[0.5vw] md:mb-1.5">{title}</h3>
                <p className="text-[3.3vw] md:text-[16px] font-bold text-[#6B7A99] leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[9vw] md:pt-[20px] pb-[49vw] md:pb-0" data-testid="steps-section">
        <div className="max-w-7xl mx-auto px-[3vw] md:px-8">
          <h2 className="text-[6.7vw] md:text-[58px] font-bold text-center mb-[3vw] md:mb-[32px]">
            {t('howItWorks.steps')}
          </h2>
          <div className="grid grid-cols-3 gap-[3.3vw] md:gap-12">
            {/* Step 1: Set Price with Video */}
            <div className="text-center space-y-[2vw] md:space-y-1">
              <h3 className="text-[3.8vw] md:text-[25px] font-bold">{t('howItWorks.setPrice')}</h3>
              <div data-video onPointerDown={() => setFullscreenVideo("/set-price.mp4")} className="rounded-xl overflow-hidden shadow-lg max-w-[36vw] md:max-w-[202px] mx-auto transition-transform duration-300 hover:scale-[1.05] cursor-pointer" style={{touchAction:"manipulation"}}>
                <video className="w-full h-auto" autoPlay loop muted playsInline>
                  <source src="/set-price.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Step 2: Add File with Video */}
            <div className="text-center space-y-[2vw] md:space-y-1">
              <h3 className="text-[3.8vw] md:text-[25px] font-bold">{t('howItWorks.addFile')}</h3>
              <div data-video onPointerDown={() => setFullscreenVideo("/add-file.mp4")} className="rounded-xl overflow-hidden shadow-lg max-w-[36vw] md:max-w-[202px] mx-auto transition-transform duration-300 hover:scale-[1.05] cursor-pointer" style={{touchAction:"manipulation"}}>
                <video className="w-full h-auto" autoPlay loop muted playsInline>
                  <source src="/add-file.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Step 3: Share with Video */}
            <div className="text-center space-y-[2vw] md:space-y-1">
              <h3 className="text-[3.8vw] md:text-[25px] font-bold">{t('howItWorks.share')}</h3>
              <div data-video onPointerDown={() => setFullscreenVideo("/share.mp4")} className="rounded-xl overflow-hidden shadow-lg max-w-[36vw] md:max-w-[202px] mx-auto transition-transform duration-300 hover:scale-[1.05] cursor-pointer" style={{touchAction:"manipulation"}}>
                <video className="w-full h-auto" autoPlay loop muted playsInline>
                  <source src="/share.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
