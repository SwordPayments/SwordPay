import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
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
import OnlyFansAlternative from "@/pages/onlyfans-alternative";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/creator/:slug" component={CreatorPage} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/onlyfans-alternative" component={OnlyFansAlternative} />
      <Route component={NotFound} />
    </Switch>
  );
}

const isIOS =
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

function App() {
  const [location] = useLocation();
  const isCreatorPage = location.startsWith("/creator/");

  // btnTop = hero-bottom position (static, only changes on init/resize)
  const [btnTop, setBtnTop] = useState(340);
  // docked = switch to bottom:24px after glide
  // iOS starts docked so the very first render is already at bottom:24px (no flash)
  const [docked, setDocked] = useState(isIOS);
  const btnRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef(340);
  const triggeredRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Hide before first paint on every navigation — zero flash at wrong position
  useLayoutEffect(() => {
    const el = btnRef.current;
    if (el) el.style.opacity = "0";
  }, [location]);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    triggeredRef.current = false;

    // Opacity managed entirely via DOM — no React state, safe from re-render overrides
    const updateOpacity = () => {
      const d = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      el.style.opacity = d < 100 ? "0" : "1";
      el.style.pointerEvents = d < 100 ? "none" : "auto";
    };

    // Non-home pages: set DOM position directly BEFORE showing — no React re-render delay
    if (location !== "/") {
      triggeredRef.current = true;
      el.style.top = "";
      el.style.bottom = "24px";
      el.style.transform = "translateX(-50%)";
      el.style.transition = "none";
      setDocked(true);
      updateOpacity(); // safe now — DOM is already at correct position
      window.addEventListener("scroll", updateOpacity, { passive: true });
      return () => window.removeEventListener("scroll", updateOpacity);
    }

    // iOS: skip hero-position logic entirely — always dock at bottom immediately
    if (isIOS) {
      el.style.top = "";
      el.style.bottom = "24px";
      el.style.transform = "translateX(-50%)";
      el.style.transition = "none";
      triggeredRef.current = true;
      setDocked(true);
      updateOpacity();
      window.addEventListener("scroll", updateOpacity, { passive: true });
      return () => window.removeEventListener("scroll", updateOpacity);
    }

    // Home page: position just below hero (non-iOS)
    const init = () => {
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero || window.scrollY > 0) {
        // Set DOM directly before showing
        el.style.top = "";
        el.style.bottom = "24px";
        el.style.transform = "translateX(-50%)";
        setDocked(true);
        triggeredRef.current = true;
        updateOpacity();
        return;
      }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      // Set DOM directly before showing — button appears at exact correct position
      el.style.bottom = "";
      el.style.top = `${top}px`;
      el.style.transform = "translateX(-50%)";
      setBtnTop(top);
      setDocked(false);
      updateOpacity();
    };

    const onScroll = () => {
      updateOpacity();
      if (triggeredRef.current) return;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= initialTopRef.current + 48) {
        triggeredRef.current = true;

        // rAF animation — works on ALL browsers including iOS Safari.
        // CSS top transitions are unreliable on iOS; rAF bypasses the CSS engine entirely.
        // CRITICAL: startTime is set on the FIRST rAF callback, not the scroll event.
        // On iOS, rAF is suspended during momentum scrolling — if we used performance.now()
        // at scroll time, progress would jump to 1.0 on the first frame (instant snap).
        const durationMs = /iphone|ipad|ipod/i.test(navigator.userAgent) ? 3000 : 2000;
        const startTop = initialTopRef.current;
        const endTop = window.innerHeight - 80;
        let startTime = -1;

        const animate = (now: number) => {
          if (startTime < 0) startTime = now; // begin timing from first actual frame
          const progress = Math.min((now - startTime) / durationMs, 1);
          // easeOutCubic — matches cubic-bezier(0.25, 0.46, 0.45, 0.94) feel
          const eased = 1 - Math.pow(1 - progress, 3);
          el.style.top = `${startTop + (endTop - startTop) * eased}px`;
          if (progress < 1) {
            rafRef.current = requestAnimationFrame(animate);
          } else {
            rafRef.current = null;
            el.style.top = "";
            el.style.bottom = "24px";
            setDocked(true);
          }
        };
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    updateOpacity();
    const timer = setTimeout(init, 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", updateOpacity, { passive: true });
    window.addEventListener("resize", init);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateOpacity);
      window.removeEventListener("resize", init);
    };
  }, [location]);

  // React owns: position, left, zIndex, transform, top (static) or bottom (docked)
  // React does NOT own: opacity (DOM ref), transition (DOM ref during animation)
  const btnStyle = docked
    ? { position: "fixed" as const, bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50 }
    : { position: "fixed" as const, top: btnTop, left: "50%", transform: "translateX(-50%)", zIndex: 50 };

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
        {/* Start Now — glides to bottom on home page, always docked on other pages */}
        <div ref={btnRef} data-start-now style={btnStyle}>
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform min-w-[126px] sm:min-w-[165px] lg:min-w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
