import { Switch, Route, useLocation, useParams } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWidget } from "@/components/floating-widget";
import { LocaleProvider } from "@/marketing/context/LocaleContext";
import MarketingNavbar from "@/marketing/components/Navbar";
import MarketingFooter from "@/marketing/components/MarketingFooter";
import Product from "@/marketing/pages/Product";
import Creators from "@/marketing/pages/Creators";
import Explore from "@/pages/explore";
import CreatorPage from "@/pages/creator";
import HowItWorks from "@/pages/how-it-works";
import OnlyFansAlternative from "@/pages/onlyfans-alternative";
import NotFound from "@/pages/not-found";
import { isReservedSlug, RESERVED_SLUGS } from "@/lib/reservedSlugs";

const LEGACY_PATHS = new Set(["/explore", "/how-it-works", "/onlyfans-alternative"]);

function SlugCreatorPage() {
  const params = useParams<{ slug: string }>();
  if (!params.slug || isReservedSlug(params.slug)) {
    return <NotFound />;
  }
  return <CreatorPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Product} />
      <Route path="/creators" component={Creators} />
      <Route path="/explore" component={Explore} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/onlyfans-alternative" component={OnlyFansAlternative} />
      <Route path="/creator/:id" component={CreatorPage} />
      <Route path="/:slug" component={SlugCreatorPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isMarketingRoute = location === "/" || location === "/creators";
  const slug = location.startsWith("/") ? location.slice(1).split("/")[0] : "";
  const isCreatorPage =
    location.startsWith("/creator/") ||
    (slug.length > 0 &&
      !LEGACY_PATHS.has(location) &&
      location !== "/" &&
      location !== "/creators" &&
      !RESERVED_SLUGS.has(slug.toLowerCase()) &&
      !location.includes("/", 1));

  if (isMarketingRoute) {
    return (
      <div className="marketing-page min-h-screen flex flex-col bg-paper text-ink">
        <MarketingNavbar />
        <main className="flex-1 pt-14">{children}</main>
        <MarketingFooter />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-14">{children}</main>
        {!isCreatorPage && <Footer />}
      </div>
      {!isCreatorPage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2" data-start-now>
          <FloatingWidget className="cursor-pointer transition-transform hover:scale-105 min-w-[126px] sm:min-w-[165px] lg:min-w-[198px]" />
        </div>
      )}
    </>
  );
}

function App() {
  const [location] = useLocation();

  useEffect(() => {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    if (typeof w.gtag === "function") {
      w.gtag("event", "page_view", { page_path: location });
    }
    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }
  }, [location]);

  return (
    <LocaleProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppLayout>
            <Router />
          </AppLayout>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LocaleProvider>
  );
}

export default App;
