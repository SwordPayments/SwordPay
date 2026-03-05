import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

import { useTranslation } from "react-i18next";

export function Navbar() {
  const [location] = useLocation();
  
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b" data-testid="navbar">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 w-full">
          <Link href="/" data-testid="link-home" className="shrink-0">
            <span className="text-lg sm:text-3xl font-black tracking-wide text-[#1e3a8a]">SWORDPAY</span>
          </Link>

          <div className="flex items-center gap-1 shrink-0">
            <Link href="/how-it-works">
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-sm px-2 sm:px-3 h-7 sm:h-9"
                data-testid="link-how-it-works"
              >
                {t('nav.howItWorks')}
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-sm px-2 sm:px-3 h-7 sm:h-9" data-testid="button-find-creator">
                {t('nav.findCreator')}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
