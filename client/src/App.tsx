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

  // Measure the hero section's bottom edge and pin the button there
  const [seamY, setSeamY] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement | null;
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        // On large screens the hero is very tall — cap at 60% of viewport height
        const capped = heroBottom > window.innerHeight * 0.75
          ? window.innerHeight * 0.60
          : heroBottom;
        setSeamY(capped);
      }
    };
    // Measure after page renders
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
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
        {/* Start Now — pinned exactly at the hero/hero2 seam */}
        <div
          className="fixed right-4 sm:right-6 z-50"
          style={seamY != null ? { top: seamY, transform: 'translateY(-50%)' } : { bottom: '1.5rem' }}
        >
          <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[126px] sm:w-[165px] lg:w-[198px]" />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
