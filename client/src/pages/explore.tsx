import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/use-seo";
import { Search, CheckCircle, X, AlertCircle } from "lucide-react";


const CATEGORY_KEYS = ["all", "art", "music", "podcasts", "gaming", "writing", "video", "education", "photography"];
const AVATAR_COLORS = ["#7c3aed","#2563eb","#059669","#dc2626","#d97706","#0891b2","#9333ea","#be185d"];

interface ExternalCreator {
  id: string;
  firstName: string;
  lastName: string;
  slug?: string;
  imageUrl: string | null;
}

function getInitials(first: string, last: string) {
  return ((first?.[0] || "") + (last?.[0] || "")).toUpperCase();
}

function vanitySlug(first: string, last: string) {
  return `${first ?? ""}${last ?? ""}`.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function Explore() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();
  const [creators, setCreators] = useState<ExternalCreator[]>([]);
  const [total, setTotal] = useState<number>(673);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory] = useState("all");

  useSEO({
    title: "Explore Creators | Sword Creator",
    description: "Discover and support amazing creators across art, music, podcasts, gaming, writing, and more on Sword Creator.",
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setFetchError(false);

    const fetchCreatorsPage = async (page: number, retries = 2) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        const response = await fetch(
          `https://web-api.swordpay.me/v1/creators?take=50&page=${page}`,
          { signal: controller.signal }
        );
        if (response.ok) {
          return response.json();
        }
        if (attempt === retries) {
          throw new Error(`HTTP ${response.status}`);
        }
      }
      throw new Error("Failed to fetch creators page");
    };

    const fetchAllCreators = async () => {
      const allCreators: ExternalCreator[] = [];
      let page = 1;
      let totalFromApi = 673;
      let firstPageLoaded = false;

      try {
        while (true) {
          const data = await fetchCreatorsPage(page);
          const batch: ExternalCreator[] = data.data || [];
          if (batch.length > 0) firstPageLoaded = true;
          if (data.meta?.total) totalFromApi = data.meta.total;
          allCreators.push(...batch);
          if (batch.length < 50) break; // last page
          page++;
        }
        setCreators(allCreators);
        setTotal(totalFromApi);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          if (allCreators.length > 0 || firstPageLoaded) {
            setCreators(allCreators);
            setTotal(allCreators.length);
          } else {
            setFetchError(true);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllCreators();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q") || "";
    setSearchTerm(q);
  }, [location]);

  const filtered = (() => {
    if (!searchTerm) return [];
    const q = searchTerm.toLowerCase();
    if (q.length === 1) {
      return creators.filter((c) => c.firstName.toLowerCase().startsWith(q));
    }
    return creators.filter((c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q)
    );
  })();

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28" data-testid="page-explore">
      {/* Header */}
      <div className="bg-white border-b px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">{t("explore.title")}</h1>
          <p className="text-muted-foreground mb-6">{t("explore.subtitle")}</p>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap mb-5" data-testid="category-filters">
            {CATEGORY_KEYS.map((key) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                disabled
                className="rounded-lg text-sm"
                data-testid={`button-category-${key}`}
              >
                {t(`explore.categories.${key}`)}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("explore.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 text-base rounded-xl border-2 border-red-500 focus:border-red-500 focus:outline-none"
              data-testid="input-search-creators"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {fetchError ? (
          <div className="flex flex-col items-center py-20 text-center text-muted-foreground">
            <AlertCircle className="h-10 w-10 mb-3 text-gray-300" />
            <p className="text-sm">Could not load creators. Please try again later.</p>
          </div>
        ) : !searchTerm ? (
          /* Empty state */
          <div className="py-20" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No creators found for &ldquo;<strong>{searchTerm}</strong>&rdquo;
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm" data-testid="results-list">
            {filtered.map((creator, i) => {
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
              const initials = getInitials(creator.firstName, creator.lastName);
              return (
                <button
                  key={creator.id}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-blue-50 transition-colors text-left"
                  onClick={() => {
                    const slug = creator.slug || vanitySlug(creator.firstName, creator.lastName) || creator.id;
                    navigate(`/${slug}`);
                  }}
                  data-testid={`creator-row-${creator.id}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-base"
                    style={{ background: creator.imageUrl ? undefined : color }}
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
                            el.parentElement.style.background = color;
                            el.parentElement.textContent = initials;
                          }
                        }}
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900 truncate">
                        {creator.firstName} {creator.lastName}
                      </span>
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Tag */}
                  <span className="text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-md flex-shrink-0">
                    Creator
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
