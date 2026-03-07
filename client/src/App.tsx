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
  const initialTopRef = useRef(340);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const bottomTop = () => window.innerHeight - 72;

    // Set initial resting position instantly (no animation) — only when at top
    const init = () => {
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) {
        setBtnTop(bottomTop());
        triggeredRef.current = true;
        return;
      }
      // If already scrolled past hero, keep button pinned at bottom
      if (triggeredRef.current || window.scrollY > 0) {
        setBtnTop(bottomTop());
        triggeredRef.current = true;
        return;
      }
      const rect = hero.getBoundingClientRect();
      const top = Math.max(Math.min(Math.round(rect.bottom) - 52, window.innerHeight - 64), 60);
      initialTopRef.current = top;
      setBtnTop(top);
      setGliding(false);
      triggeredRef.current = false;
    };

    // On scroll: detect the moment the hero scrolls past the button and trigger glide
    const onScroll = () => {
      if (triggeredRef.current) return;
      const hero = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= initialTopRef.current + 48) {
        triggeredRef.current = true;
        setGliding(true);
        setBtnTop(bottomTop());
      }
    };

    const timer = setTimeout(init, 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", init);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", init);
    };
  }, []);

  const btnStyle = {
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
