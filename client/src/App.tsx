import { Switch, Route, useLocation, useParams } from "wouter";
import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWidget } from "@/components/floating-widget";
import { LocaleProvider, useLocale } from "@/marketing/context/LocaleContext";
import { useMessages } from "@/marketing/i18n";
import MarketingNavbar from "@/marketing/components/Navbar";
import MarketingFooter from "@/marketing/components/MarketingFooter";
import { scrollToHash, scrollToPricing } from "@/marketing/lib/scroll";
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

function MarketingScrollManager() {
  const [location] = useLocation();
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const align = () => {
      if (cancelled) return;
      const currentHash = window.location.hash;
      if (!currentHash) {
        if (location === "/" || location === "/creators") {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
        return;
      }
      if (currentHash === "#pricing") {
        scrollToPricing();
        return;
      }
      const el = document.querySelector(currentHash);
      if (el) scrollToHash(currentHash);
    };

    align();
    const timers = [250, 500, 850, 1300].map((d) => window.setTimeout(align, d));
    const onLoad = () => {
      if (!cancelled) align();
    };
    window.addEventListener("load", onLoad);
    window.addEventListener("hashchange", align);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("hashchange", align);
    };
  }, [location, hash]);

  return null;
}

function DocumentLocale() {
  const { locale } = useLocale();
  const t = useMessages();

  useEffect(() => {
    document.title = t.meta.title;
    document.documentElement.lang =
      locale === "zh"
        ? "zh-CN"
        : locale === "pt"
          ? "pt-BR"
          : locale === "ko"
            ? "ko-KR"
            : locale === "el"
              ? "el-GR"
              : locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, t.meta.title]);

  return null;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isMarketingRoute = location === "/" || location === "/creators";

  useEffect(() => {
    document.documentElement.classList.toggle("marketing-site", isMarketingRoute);
    if (!isMarketingRoute) {
      return () => document.documentElement.classList.remove("marketing-site");
    }

    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    if (window.location.hash === "#pricing") {
      scrollToPricing();
    }

    return () => {
      document.documentElement.classList.remove("marketing-site");
      history.scrollRestoration = prevRestoration;
    };
  }, [isMarketingRoute]);

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
      <>
        <MarketingScrollManager />
        <MarketingNavbar />
        <main className="min-w-0 max-w-full overflow-x-clip">{children}</main>
        <MarketingFooter />
      </>
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
      <DocumentLocale />
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
