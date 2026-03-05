import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-2" data-testid="mobile-menu">
          <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start" data-testid="mobile-link-how-it-works">
              How it works
            </Button>
          </Link>
          <Link href="/explore" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" data-testid="mobile-button-find">
              {t('nav.findCreator')}
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
