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

  // btnTop drives initial static position only — React never animates it
  const [btnTop, setBtnTop] = useState(340);
  // docked = true → React uses bottom:24px + transform centering
  const [docked, setDocked] = useState(true);
  const btnRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef(340);
  const triggeredRef = useRef(false);

  // Hide button before first paint on every navigation — prevents any flash at wrong position
  useLayoutEffect(() => {
    const el = btnRef.current;
    if (el) el.style.opacity = "0";
  }, [location]);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    triggeredRef.current = false;
    el.style.transition = "none";
    el.style.transform = "";

    // Near-footer opacity — pure DOM, never React state, never interrupted by re-renders
    const updateOpacity = () => {
      const d = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      el.style.opacity = d < 100 ? "0" : "1";
      el.style.pointerEvents = d < 100 ? "none" : "auto";
    };

    // Non-home pages: lock to bottom immediately, no glide logic
    if (location !== "/") {
      triggeredRef.current = true;
      setDocked(true);
      updateOpacity();
      window.addEventListener("scroll", updateOpacity, { passive: true });
      return () => window.removeEventListener("scroll", updateOpacity);
    }

    // Home page: position button just below hero
    const init = () => {
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero || window.scrollY > 0) {
        setDocked(true);
        triggeredRef.current = true;
        updateOpacity();
        return;
      }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      setBtnTop(top);
      // Centering via DOM — React's non-docked btnStyle has no transform property,
      // so React won't override this on re-renders
      el.style.transform = "translateX(-50%)";
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

        // Animate via transform:translateY — GPU compositor thread, reliable on ALL iOS versions.
        // Animating `top` is NOT compositor-thread and drops on iOS Safari.
        // `top` stays fixed; translateY slides the button down to its docked position.
        const delta = (window.innerHeight - 80) - initialTopRef.current;
        el.style.transition = "none";
        el.style.transform = "translateX(-50%) translateY(0px)";
        el.getBoundingClientRect(); // force layout flush — required before transition starts
        el.style.transition = "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        el.style.transform = `translateX(-50%) translateY(${delta}px)`;

        setTimeout(() => {
          // Lock in final position before React takes over with docked style
          el.style.transition = "none";
          el.style.bottom = "24px";
          el.style.top = "";
          el.style.transform = "translateX(-50%)";
          setDocked(true);
        }, 2100);
      }
    };

    const timer = setTimeout(init, 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", updateOpacity, { passive: true });
    window.addEventListener("resize", init);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateOpacity);
      window.removeEventListener("resize", init);
    };
  }, [location]);

  // React owns: position, left, zIndex, bottom (docked only)
  // DOM ref owns: transform, top, opacity — React must NOT include these in non-docked style
  const btnStyle = docked
    ? { position: "fixed" as const, bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50 }
    : { position: "fixed" as const, top: btnTop, left: "50%", zIndex: 50 };

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
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[126px] sm:w-[165px] lg:w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
