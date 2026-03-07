import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWidget } from "@/components/floating-widget";
import Home from "@/pages/home";
import Explore from "@/pages/explore";
import CreatorPage from "@/pages/creator";
import HowItWorks from "@/pages/how-it-works";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/creator/:slug" component={CreatorPage} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isCreatorPage = location.startsWith("/creator/");
  const [docked, setDocked] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef(340);
  const triggeredRef = useRef(false);

  useEffect(() => {
    // Hide button when within 100px of page bottom (over footer)
    const checkBottom = () => {
      const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setNearBottom(distFromBottom < 100);
    };
    window.addEventListener("scroll", checkBottom, { passive: true });
    checkBottom();

    // Set initial resting position instantly (no animation) — only when at top
    const init = () => {
      const el = btnRef.current;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero || !el) { setDocked(true); triggeredRef.current = true; return; }
      if (triggeredRef.current || window.scrollY > 0) { setDocked(true); triggeredRef.current = true; return; }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      el.style.transition = "none";
      el.style.top = `${top}px`;
      el.style.bottom = "auto";
      setDocked(false);
      triggeredRef.current = false;
    };

    // Direct DOM animation — bypasses React batching, works on iOS Safari
    const onScroll = () => {
      if (triggeredRef.current) return;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      const el = btnRef.current;
      if (!hero || !el) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= initialTopRef.current + 48) {
        triggeredRef.current = true;
        el.style.transition = "none";
        el.style.top = `${initialTopRef.current}px`;
        void el.offsetHeight; // force reflow — critical for iOS Safari
        el.style.transition = "top 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        el.style.top = `${window.innerHeight - 80}px`;
        setTimeout(() => setDocked(true), 2100);
      }
    };

    const timer = setTimeout(init, 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", init);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", init);
      window.removeEventListener("scroll", checkBottom);
    };
  }, []);

  // After glide: use true `bottom: 24px` so it always sits above mobile browser chrome
  const btnStyle = docked
    ? { position: "fixed" as const, bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50, opacity: nearBottom ? 0 : 1, transition: "opacity 0.3s", pointerEvents: nearBottom ? "none" as const : "auto" as const }
    : { position: "fixed" as const, top: 340, left: "50%", transform: "translateX(-50%)", zIndex: 50 };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-14">
            <Router />
          </main>
          {!isCreatorPage && <Footer />}
        </div>
        <Toaster />
        {/* Start Now — follows hero, then docks to bottom of screen */}
        <div ref={btnRef} data-start-now style={btnStyle}>
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[126px] sm:w-[165px] lg:w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
