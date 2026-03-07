import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
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
  const [btnTop, setBtnTop] = useState(340);
  const [gliding, setGliding] = useState(false);
  const [docked, setDocked] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef(340);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = btnRef.current;

    // Opacity managed via direct DOM — never put in btnStyle so React re-renders can't touch it
    const updateOpacity = () => {
      if (!el) return;
      const d = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      el.style.opacity = d < 100 ? "0" : "1";
      el.style.pointerEvents = d < 100 ? "none" : "auto";
    };

    const init = () => {
      if (triggeredRef.current) { setDocked(true); return; }
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) { setDocked(true); triggeredRef.current = true; return; }
      if (window.scrollY > 0) { setDocked(true); triggeredRef.current = true; return; }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      setBtnTop(top);
      setGliding(false);
      setDocked(false);
      triggeredRef.current = false;
    };

    const onScroll = () => {
      updateOpacity();
      if (triggeredRef.current) return;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= initialTopRef.current + 48) {
        triggeredRef.current = true;
        // flushSync forces React to commit the transition BEFORE we change btnTop.
        // This guarantees iOS Safari sees the transition property on the element
        // before the position changes — the only reliable way to trigger CSS transitions on iOS.
        flushSync(() => setGliding(true));
        requestAnimationFrame(() => {
          setBtnTop(window.innerHeight - 80);
          setTimeout(() => {
            setGliding(false);
            setDocked(true);
          }, 2100);
        });
      }
    };

    updateOpacity();
    const timer = setTimeout(init, 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", updateOpacity, { passive: true });
    window.addEventListener("resize", init);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateOpacity);
      window.removeEventListener("resize", init);
    };
  }, []);

  // Opacity is NOT in btnStyle — managed via DOM ref so React re-renders never reset it
  const btnStyle = docked
    ? { position: "fixed" as const, bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50 }
    : { position: "fixed" as const, top: btnTop, left: "50%", transform: "translateX(-50%)", zIndex: 50, transition: gliding ? "top 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none" };

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
        {/* Start Now — follows hero, then glides to dock at bottom */}
        <div ref={btnRef} data-start-now style={btnStyle}>
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[126px] sm:w-[165px] lg:w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
