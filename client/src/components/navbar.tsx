import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const isIOS =
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

export function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b" data-testid="navbar">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 w-full">
          <Link href="/" data-testid="link-home" className="shrink-0">
            <span className="text-[31.5px] sm:text-[2.8rem] font-black tracking-wide text-[#1e3a8a] leading-none">SWORDPAY</span>
          </Link>

          <div className="flex items-center gap-0 shrink-0">
            <Link href="/how-it-works">
              <Button
                size="sm"
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 sm:px-6 rounded-full sm:text-base ${isIOS ? "text-[11px]" : "text-[10px]"}`}
                style={{ animation: 'button-flash 3s linear infinite', animationDelay: '1.5s' }}
              >
                <span style={{ animation: 'button-text-flash 3s linear infinite', animationDelay: '1.5s', display: 'inline-block' }}>
                  How it works
                </span>
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 sm:px-3 h-7 sm:h-9" data-testid="button-search">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 sm:px-3 h-7 sm:h-9"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="bg-background/98 backdrop-blur-md border-b shadow-lg" onClick={() => setMenuOpen(false)}>
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link href="/">
              <button className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">Home</button>
            </Link>
            <Link href="/how-it-works">
              <button className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">How it works</button>
            </Link>
            <Link href="/explore">
              <button className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">Explore</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
