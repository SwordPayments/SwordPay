import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

import { useTranslation } from "react-i18next";

export function Navbar() {
  const [location] = useLocation();
  
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-10">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home" className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-wide text-[#1e3a8a]">SWORDPAY</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/how-it-works">
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-3"
                data-testid="link-how-it-works"
              >
                {t('nav.howItWorks')}
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-3" data-testid="button-find-creator">
                {t('nav.findCreator')}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
