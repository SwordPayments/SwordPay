import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d1a]/90 backdrop-blur-md border-b border-white/5" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-black tracking-wide text-white">SWORDPAY</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works">
              <span className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer">Features</span>
            </Link>
            <Link href="/explore">
              <span className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer">Creators</span>
            </Link>
            <Link href="/how-it-works">
              <span className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer">Pricing</span>
            </Link>
          </div>

          <Link href="/auth">
            <button className="text-white font-semibold px-5 py-2 rounded-full text-sm"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
              Start Free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
