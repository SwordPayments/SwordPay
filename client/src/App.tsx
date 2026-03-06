import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
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
  const [seamY, setSeamY] = useState<number>(316);

  useEffect(() => {
    const measure = () => {
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement | null;
      if (!hero) return;
      const bottom = hero.getBoundingClientRect().bottom;
      if (bottom < 50) return; // skip invalid measurements
      // Cap at 65% of viewport on tall-hero screens (desktop)
      const capped = bottom > window.innerHeight * 0.78
        ? window.innerHeight * 0.62
        : bottom;
      setSeamY(capped);
    };

    // Measure immediately, then at intervals to catch font/image load
    measure();
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 800);
    const t3 = setTimeout(measure, 1500);

    // Watch hero for any size changes (font load, reflow)
    let ro: ResizeObserver | null = null;
    const hero = document.querySelector('[data-testid="hero-section"]');
    if (hero && window.ResizeObserver) {
      ro = new ResizeObserver(measure);
      ro.observe(hero);
    }

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [location]);

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
        {/* Start Now — pinned at hero/hero2 seam, measured from DOM */}
        <div
          className="fixed right-4 sm:right-6 z-50"
          style={{ top: seamY, transform: 'translateY(-50%)' }}
        >
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[126px] sm:w-[165px] lg:w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
