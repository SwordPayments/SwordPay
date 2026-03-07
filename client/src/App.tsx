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
  const [btnTop, setBtnTop] = useState(340);
  const bottomDockedTop = typeof window !== "undefined" ? window.innerHeight - 72 : 700;

  useEffect(() => {
    const getBottomTop = () => window.innerHeight - 72;

    const measure = () => {
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      // No hero on this page — always dock to bottom
      if (!hero) { setBtnTop(getBottomTop()); return; }
      const rect = hero.getBoundingClientRect();
      const heroPos = Math.round(rect.bottom) - 52;
      const initialTop = Math.min(heroPos, window.innerHeight - 64);
      // Glide to bottom once hero bottom scrolls up past the button
      if (rect.bottom < initialTop + 48) {
        setBtnTop(getBottomTop());
      } else {
        if (window.scrollY === 0) setBtnTop(initialTop);
      }
    };
    const timer = setTimeout(measure, 150);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const btnStyle = {
    position: "fixed" as const,
    top: btnTop,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    transition: "top 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s",
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
