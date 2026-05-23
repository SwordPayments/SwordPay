import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AVATAR_COLORS = ["#7c3aed","#2563eb","#059669","#dc2626","#d97706","#0891b2","#9333ea","#be185d"];

interface ExternalCreator {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
}

interface Fileshare {
  id: string;
  price: string;
  currency?: string;
  link: string;
  message: string | null;
  thumb: string | null;
}

// Currency symbol map. Default to "$" when no/unknown currency.
const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  BRL: "R$",
  MXN: "MX$",
  COP: "COL$",
  CLP: "CL$",
  PEN: "S/",
};
const symbolFor = (currency?: string): string =>
  (currency && CURRENCY_SYMBOL[currency.toUpperCase()]) || "$";

function getInitials(first: string, last: string) {
  return ((first?.[0] || "") + (last?.[0] || "")).toUpperCase();
}

// Fetches fresh thumbUrl from detail endpoint on mount to avoid S3 signed URL expiry
function FileshareCard({ fs }: { fs: Fileshare }) {
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://web-api.swordpay.me/v1/fileshares/${fs.id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!cancelled && data?.thumbUrl) setThumbUrl(data.thumbUrl);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [fs.id]);

  // Show logo if no thumb loaded, or if loaded image is tiny/blurred (< 100px wide = low-res paywall preview)
  const showLogo = !thumbUrl || isBlurred;

  return (
    <a
      href={fs.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white block"
      data-testid={`fileshare-${fs.id}`}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt=""
            className="w-full h-full object-cover"
            onLoad={(e) => {
              // If naturalWidth is tiny (≤100px), it's a blurred paywall preview
              if (e.currentTarget.naturalWidth <= 100) setIsBlurred(true);
            }}
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              if (el.parentElement) {
                el.parentElement.style.background = "linear-gradient(135deg, #c8b8d8 0%, #b8c8d8 100%)";
              }
            }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #c8b8d8 0%, #b8c8d8 100%)" }} />
        )}
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[4.5rem] h-[4.5rem] bg-white/90 rounded-full flex items-center justify-center">
              <img src="/images/sword-icon.png" alt="sword" className="w-[2.625rem] h-[2.625rem] object-contain" />
            </div>
          </div>
        )}
      </div>
      <div className="px-2 py-2">
        <div className="text-sm font-bold text-gray-900">{symbolFor(fs.currency)}{fs.price}</div>
        {fs.message && (
          <div className="text-xs text-gray-500 mt-0.5 truncate">{fs.message}</div>
        )}
      </div>
    </a>
  );
}

export default function CreatorPage() {
  const params = useParams<{ id: string }>();
  const [creator, setCreator] = useState<ExternalCreator | null>(null);
  const [fileshares, setFileshares] = useState<Fileshare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  useSEO({
    title: creator ? `${creator.firstName} ${creator.lastName} | Sword Creator` : "Creator | Sword Creator",
    description: creator ? `Support ${creator.firstName} ${creator.lastName} on Sword Creator.` : "Support this creator on Sword Creator.",
  });

  useEffect(() => {
    if (!params.id) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch fileshares immediately
        const fsRes = await fetch(`https://web-api.swordpay.me/v1/creators/${params.id}/fileshares?take=50`, { signal });
        if (!fsRes.ok) throw new Error(`Fileshares API ${fsRes.status}`);
        const fsData = await fsRes.json();

        // Find creator by scanning all pages
        let found: ExternalCreator | null = null;
        let page = 1;
        while (!found) {
          const r = await fetch(`https://web-api.swordpay.me/v1/creators?take=50&page=${page}`, { signal });
          if (!r.ok) break;
          const data = await r.json();
          const batch: ExternalCreator[] = data.data || [];
          found = batch.find((c) => c.id === params.id) || null;
          if (found || batch.length < 50) break;
          page++;
        }
        setCreator(found);

        // Store fileshare list — each FileshareCard fetches its own fresh thumbUrl
        setFileshares(fsData.data || []);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [params.id]);

  // Derive avatar color from id for consistency per creator
  const avatarColorIndex = params.id
    ? params.id.charCodeAt(0) % AVATAR_COLORS.length
    : 0;
  const avatarColor = AVATAR_COLORS[avatarColorIndex];
  const initials = creator ? getInitials(creator.firstName, creator.lastName) : "?";
  const handle = creator
    ? `@${creator.firstName.toLowerCase()}.${creator.lastName.toLowerCase().replace(/\s+/g, "")}`
    : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-lg mx-auto" data-testid="page-creator-loading">
        <div className="border-b px-4 py-4 flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        <div className="grid grid-cols-3 gap-0.5 bg-gray-200 p-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white">
              <Skeleton className="w-full aspect-square" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="creator-error">
        <div className="text-center space-y-2">
          <AlertCircle className="h-10 w-10 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold">Could not load creator</h2>
          <p className="text-muted-foreground text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="creator-not-found">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Creator not found</h2>
          <p className="text-muted-foreground">This creator doesn&apos;t exist or couldn&apos;t be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto" data-testid={`page-creator-${params.id}`}>
      {/* Creator bar */}
      <div className="border-b px-4 py-3 flex items-center gap-3">
        <button
          className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-base focus:outline-none"
          style={{ background: creator.imageUrl ? undefined : avatarColor }}
          onClick={() => creator.imageUrl && setAvatarOpen(true)}
        >
          {creator.imageUrl ? (
            <img
              src={creator.imageUrl}
              alt={creator.firstName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                if (el.parentElement) {
                  el.parentElement.style.background = avatarColor;
                  el.parentElement.textContent = initials;
                }
              }}
            />
          ) : initials}
        </button>

        {/* Avatar lightbox */}
        {avatarOpen && creator.imageUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setAvatarOpen(false)}
          >
            <img
              src={creator.imageUrl}
              alt={creator.firstName}
              className="max-w-[90vw] max-h-[90vh] rounded-full object-cover shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-base truncate">
              {creator.firstName} {creator.lastName}
            </span>
            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
          </div>
          <div className="text-xs text-gray-400">{handle}</div>
        </div>
        <button className="bg-[#1e3a8a] text-white text-sm font-bold px-4 py-2 rounded-lg flex-shrink-0">
          Follow
        </button>
      </div>

      {/* Fileshares grid */}
      {fileshares.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center text-muted-foreground">
          <p className="text-base">No fileshares yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5 bg-gray-200 p-0.5 pb-24">
          {fileshares.map((fs) => (
            <FileshareCard key={fs.id} fs={fs} />
          ))}
        </div>
      )}

      {/* Sticky Start Now */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-12 py-4 rounded-full shadow-lg shadow-blue-500/40 transition-colors">
          Start Now
        </button>
      </div>
    </div>
  );
}
