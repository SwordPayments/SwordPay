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
  const [btnVisible, setBtnVisible] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef(340);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const checkBottom = () => {
      const d = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setNearBottom(d < 100);
    };
    window.addEventListener("scroll", checkBottom, { passive: true });
    checkBottom();

    const init = () => {
      const el = btnRef.current;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero || !el) { setDocked(true); triggeredRef.current = true; return; }
      if (triggeredRef.current || window.scrollY > 0) { setDocked(true); triggeredRef.current = true; return; }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      // Manage top + transform directly — React style prop never touches these
      el.style.top = `${top}px`;
      el.style.transform = "translateX(-50%)";
      setBtnVisible(true);
      triggeredRef.current = false;
    };

    const onScroll = () => {
      if (triggeredRef.current) return;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      const el = btnRef.current;
      if (!hero || !el) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= initialTopRef.current + 48) {
        triggeredRef.current = true;
        // Animate via transform (GPU compositor) — top stays fixed, translateY moves the button
        // Web Animations API is the most reliable approach on iOS Safari
        const delta = (window.innerHeight - 80) - initialTopRef.current;
        const anim = el.animate(
          [
            { transform: "translateX(-50%) translateY(0px)" },
            { transform: `translateX(-50%) translateY(${delta}px)` },
          ],
          { duration: 2000, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "forwards" }
        );
        anim.onfinish = () => setDocked(true);
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

  // React controls ONLY opacity/position/left/zIndex — never top or transform
  // (re-renders from nearBottom must not override DOM-managed properties)
  const btnStyle = docked
    ? { position: "fixed" as const, bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50, opacity: nearBottom ? 0 : 1, transition: "opacity 0.3s", pointerEvents: nearBottom ? "none" as const : "auto" as const }
    : { position: "fixed" as const, left: "50%", zIndex: 50, opacity: nearBottom ? 0 : btnVisible ? 1 : 0, transition: "opacity 0.3s", pointerEvents: nearBottom ? "none" as const : "auto" as const };

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
