import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatorCardSkeleton } from "@/components/creator-card";
import { useSEO } from "@/hooks/use-seo";
import { Search, AlertCircle, X, CheckCircle, ExternalLink, ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const API = "https://web-api.swordpay.me/v1";

const CATEGORIES = ["Art", "Music", "Podcasts", "Gaming", "Writing", "Video", "Education", "Photography"];

function deriveCategory(id: string): string {
  return CATEGORIES[id.charCodeAt(0) % CATEGORIES.length];
}

interface ApiCreator {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface ApiFileshare {
  id: string;
  link: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: { skip: number; take: number; total: number };
}

const categoryKeys = ["all", "art", "music", "podcasts", "gaming", "writing", "video", "education", "photography"];

export default function Explore() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const initialCategory = params.get("category") || "all";

  useSEO({
    title: "Explore Creators | Sword Creator",
    description: "Discover and support amazing creators across art, music, podcasts, gaming, writing, and more on Sword Creator.",
  });

  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Creators state
  const [creators, setCreators] = useState<ApiCreator[]>([]);
  const [creatorsTotal, setCreatorsTotal] = useState(0);
  const [creatorsSkip, setCreatorsSkip] = useState(0);
  const [isLoadingCreators, setIsLoadingCreators] = useState(true);
  const [creatorsError, setCreatorsError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Selected creator + fileshares
  const [selectedCreator, setSelectedCreator] = useState<ApiCreator | null>(null);
  const [fileshares, setFileshares] = useState<ApiFileshare[]>([]);
  const [filesharesTotal, setFilesharesTotal] = useState(0);
  const [isLoadingFileshares, setIsLoadingFileshares] = useState(false);
  const [filesharesError, setFilesharesError] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Load creators on mount
  useEffect(() => {
    setIsLoadingCreators(true);
    setCreatorsError(false);
    fetch(`${API}/creators?take=50&skip=0`)
      .then((r) => r.json())
      .then((res: PaginatedResponse<ApiCreator>) => {
        setCreators(res.data);
        setCreatorsTotal(res.meta.total);
        setCreatorsSkip(0);
      })
      .catch(() => setCreatorsError(true))
      .finally(() => setIsLoadingCreators(false));
  }, []);

  // Load more creators
  const handleLoadMore = () => {
    const nextSkip = creatorsSkip + 50;
    setIsLoadingMore(true);
    fetch(`${API}/creators?take=50&skip=${nextSkip}`)
      .then((r) => r.json())
      .then((res: PaginatedResponse<ApiCreator>) => {
        setCreators((prev) => [...prev, ...res.data]);
        setCreatorsSkip(nextSkip);
      })
      .catch(() => {})
      .finally(() => setIsLoadingMore(false));
  };

  // Select creator and load fileshares
  const handleSelectCreator = (creator: ApiCreator) => {
    setSelectedCreator(creator);
    setFileshares([]);
    setFilesharesTotal(0);
    setFilesharesError(false);
    setIsLoadingFileshares(true);
    fetch(`${API}/creators/${creator.id}/fileshares?take=50&skip=0`)
      .then((r) => r.json())
      .then((res: PaginatedResponse<ApiFileshare>) => {
        setFileshares(res.data);
        setFilesharesTotal(res.meta.total);
      })
      .catch(() => setFilesharesError(true))
      .finally(() => setIsLoadingFileshares(false));
  };

  const handleBack = () => {
    setSelectedCreator(null);
    setFileshares([]);
    setSearchTerm("");
  };

  // Filtered creators for grid
  const filteredCreators = creators.filter((c) =>
    searchTerm
      ? `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen" data-testid="page-explore">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("explore.title")}</h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-lg">
            {t("explore.subtitle")}
          </p>
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 flex-wrap" data-testid="category-filters">
            {categoryKeys.map((key) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="default"
                disabled
                className="text-base px-5"
                data-testid={`button-category-${key}`}
              >
                {t(`explore.categories.${key}`)}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-2xl" ref={searchRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              type="search"
              placeholder={t("explore.searchPlaceholder")}
              className="pl-12 py-6 text-lg pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error */}
        {creatorsError && !selectedCreator && (
          <div className="text-center py-20" data-testid="error-explore">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">{t("contact.errorLoad")}</p>
          </div>
        )}

        {/* Fileshares view */}
        {selectedCreator && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <h2 className="text-xl font-bold">
                Files by {selectedCreator.firstName} {selectedCreator.lastName}
              </h2>
              {filesharesTotal > 0 && (
                <Badge variant="secondary">{filesharesTotal} files</Badge>
              )}
            </div>

            {isLoadingFileshares ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-4 animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </Card>
                ))}
              </div>
            ) : filesharesError ? (
              <div className="text-center py-20">
                <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Failed to load files.</p>
              </div>
            ) : fileshares.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No files available for this creator.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fileshares.map((fs) => (
                  <Card key={fs.id} className="p-4 hover:shadow-md transition-shadow">
                    <button
                      className="w-full flex items-center gap-3 text-left"
                      onClick={() => window.open(fs.link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground truncate">{fs.link}</span>
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Creator grid */}
        {!selectedCreator && !creatorsError && (
          <>
            {isLoadingCreators ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CreatorCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredCreators.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  {searchTerm ? `${t("explore.noResults")} "${searchTerm}"` : "No creators found."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCreators.map((creator) => (
                    <Card
                      key={creator.id}
                      className="group cursor-pointer hover:shadow-md transition-all duration-200 border-card-border"
                      onClick={() => handleSelectCreator(creator)}
                    >
                      <div className="relative h-32 rounded-t-md overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="relative px-4 pb-4">
                        <div className="-mt-8 mb-3 flex items-end gap-3">
                          <Avatar className="h-14 w-14 border-2 border-background">
                            <AvatarImage src={creator.imageUrl} alt={`${creator.firstName} ${creator.lastName}`} />
                            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                              {creator.firstName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-base truncate">
                              {creator.firstName} {creator.lastName}
                            </h3>
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-3 pt-1">
                            <Badge variant="secondary" className="text-xs no-default-active-elevate">
                              {deriveCategory(creator.id)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Load more */}
                {creators.length < creatorsTotal && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                    >
                      {isLoadingMore ? "Loading..." : "Load more"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
