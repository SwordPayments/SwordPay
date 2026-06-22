import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const isIOS =
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

export function Navbar() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const submitCreatorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    setLocation(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b" data-testid="navbar">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 w-full">
          <Link href="/" data-testid="link-home" className="shrink-0">
            <span className="text-[31.5px] sm:text-[2.8rem] font-black tracking-wide text-[#1e3a8a] leading-none">SWORDPAY</span>
          </Link>

          <div className="flex items-center gap-0 shrink-0">
            <form onSubmit={submitCreatorSearch} className="relative mr-1">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search creators"
                className="h-8 w-[132px] sm:w-[190px] rounded-full border border-blue-100 bg-white px-3 pr-8 text-xs sm:text-sm text-gray-800 outline-none focus:border-blue-500"
                data-testid="input-navbar-creator-search"
              />
              <button
                type="submit"
                aria-label="Search creators"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
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
              <button className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">{t('nav.home')}</button>
            </Link>
            <Link href="/explore">
              <button className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">{t('nav.explore')}</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
