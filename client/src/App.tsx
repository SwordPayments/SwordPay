import { Switch, Route, useLocation } from "wouter";
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-14">
            <Router />
          </main>
          {!isCreatorPage && <Footer />}
          <span className="animate-word-fade" style={{ position: 'fixed', top: '480px', right: '215px', zIndex: 50, fontSize: '2.58rem', color: '#38bdf8', textShadow: '0 0 16px rgba(56,189,248,1), 0 0 32px rgba(56,189,248,0.8)', animationDelay: '2.4s', animationFillMode: 'both' }}>→</span>
          <span className="animate-word-fade" style={{ position: 'fixed', top: '607px', right: '215px', zIndex: 50, fontSize: '2.58rem', color: '#38bdf8', textShadow: '0 0 16px rgba(56,189,248,1), 0 0 32px rgba(56,189,248,0.8)', animationDelay: '0s', animationFillMode: 'both' }}>→</span>
          <span className="animate-word-fade" style={{ position: 'fixed', top: '680px', right: '215px', zIndex: 50, fontSize: '2.58rem', color: '#38bdf8', textShadow: '0 0 16px rgba(56,189,248,1), 0 0 32px rgba(56,189,248,0.8)', animationDelay: '1.2s', animationFillMode: 'both' }}>→</span>
          <div style={{ position: 'fixed', top: '390px', right: '8px', zIndex: 50 }}>
            <FloatingWidget className="cursor-pointer hover:scale-105 transition-transform w-[154px] min-[414px]:w-[193px] sm:w-[165px] lg:w-[198px]" />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
