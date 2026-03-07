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
  const [btnTop, setBtnTop] = useState(340);
  const [gliding, setGliding] = useState(false);
  const [docked, setDocked] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
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
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) {
        setDocked(true);
        triggeredRef.current = true;
        return;
      }
      // If already scrolled past hero, keep button docked at bottom
      if (triggeredRef.current || window.scrollY > 0) {
        setDocked(true);
        triggeredRef.current = true;
        return;
      }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      setBtnTop(top);
      setGliding(false);
      setDocked(false);
      triggeredRef.current = false;
    };

    // On scroll: trigger glide when hero scrolls past the button
    const onScroll = () => {
      if (triggeredRef.current) return;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= initialTopRef.current + 48) {
        triggeredRef.current = true;
        // Step 1: enable transition on current position
        setGliding(true);
        // Step 2: double-rAF ensures transition is committed to DOM before position changes
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setBtnTop(window.innerHeight - 80);
            setTimeout(() => {
              setGliding(false);
              setDocked(true);
            }, 2200);
          });
        });
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
    : {
        position: "fixed" as const,
        top: btnTop,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        transition: gliding ? "top 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "opacity 0.2s",
      };

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
        <div data-start-now style={btnStyle}>
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[126px] sm:w-[165px] lg:w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
