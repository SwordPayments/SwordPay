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
  link: string;
  message: string | null;
  thumb: string | null;
}

function getInitials(first: string, last: string) {
  return ((first?.[0] || "") + (last?.[0] || "")).toUpperCase();
}

export default function CreatorPage() {
  const params = useParams<{ id: string }>();
  const [creator, setCreator] = useState<ExternalCreator | null>(null);
  const [fileshares, setFileshares] = useState<Fileshare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

        // Fetch real thumbUrl from /v1/fileshares/{id} for each fileshare (correct S3 bucket)
        const fileshareList: Fileshare[] = fsData.data || [];
        const enriched = await Promise.all(
          fileshareList.map(async (fs: Fileshare) => {
            try {
              const detailRes = await fetch(`https://web-api.swordpay.me/v1/fileshares/${fs.id}`, { signal });
              if (detailRes.ok) {
                const detail = await detailRes.json();
                if (detail.thumbUrl) return { ...fs, thumb: detail.thumbUrl };
              }
            } catch { /* ignore */ }
            return fs;
          })
        );
        setFileshares(enriched);
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
        <div
          className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-base"
          style={{ background: creator.imageUrl ? undefined : avatarColor }}
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
        </div>
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
            <a
              key={fs.id}
              href={fs.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white block"
              data-testid={`fileshare-${fs.id}`}
            >
              {/* Blurred thumb */}
              <div className="relative w-full aspect-square overflow-hidden">
                {fs.thumb ? (
                  <img
                    src={fs.thumb}
                    alt=""
                    className="w-full h-full object-cover blur-md scale-110"
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
                {/* Sword icon overlay — always shown */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <img src="/images/sword-icon.png" alt="sword" className="w-7 h-7 object-contain" />
                  </div>
                </div>
              </div>
              {/* Info below image */}
              <div className="px-2 py-2">
                <div className="text-sm font-bold text-gray-900">${fs.price}</div>
                {fs.message && (
                  <div className="text-xs text-gray-500 mt-0.5 truncate">{fs.message}</div>
                )}
              </div>
            </a>
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
