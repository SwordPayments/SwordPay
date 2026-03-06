import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { useTranslation } from "react-i18next";

export function Navbar() {
  const [location] = useLocation();
  
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b" data-testid="navbar">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 w-full">
          <Link href="/" data-testid="link-home" className="shrink-0">
            <span className="text-[2.2rem] sm:text-[2.8rem] font-black tracking-wide text-[#1e3a8a] leading-none">SWORDPAY</span>
          </Link>

          <div className="flex items-center gap-1 shrink-0">
            <Link href="/how-it-works">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 sm:px-6 rounded-full text-sm sm:text-base">
                How it works
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 sm:px-3 h-7 sm:h-9" data-testid="button-search">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
