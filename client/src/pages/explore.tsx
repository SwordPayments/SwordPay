import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatorCard, CreatorCardSkeleton } from "@/components/creator-card";
import { useSEO } from "@/hooks/use-seo";
import { Search, AlertCircle, X, CheckCircle, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Creator } from "@shared/schema";

const allCategories = [
  "All",
  "Art & Illustration",
  "Music",
  "Podcasts",
  "Gaming",
  "Writing",
  "Video",
  "Education",
  "Photography",
];

export default function Explore() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const initialCategory = params.get("category") || "All";

  useSEO({
    title: "Explore Creators | Sword Creator",
    description: "Discover and support amazing creators across art, music, podcasts, gaming, writing, and more on Sword Creator.",
  });

  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: creators, isLoading, error } = useQuery<Creator[]>({
    queryKey: ["/api/creators"],
  });

  const filteredCreators = creators?.filter((creator) => {
    if (!searchTerm) return false;
    return (
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (creator: Creator) => {
    setSelectedCreator(creator);
    setSearchTerm(creator.name);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSelectedCreator(null);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen" data-testid="page-explore">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t('explore.title')}</h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-lg">
            {t('explore.subtitle')}
          </p>
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 flex-wrap" data-testid="category-filters">
            {allCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="default"
                disabled
                className="text-base px-5"
                data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Search with dropdown */}
          <div className="relative max-w-2xl" ref={searchRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              type="search"
              placeholder={t('explore.searchPlaceholder')}
              className="pl-12 py-6 text-lg pr-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCreator(null);
                setShowDropdown(true);
              }}
              onFocus={() => searchTerm && setShowDropdown(true)}
              data-testid="input-search-creators"
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Dropdown */}
            {showDropdown && searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {isLoading ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                ) : filteredCreators && filteredCreators.length > 0 ? (
                  filteredCreators.map((creator) => (
                    <button
                      key={creator.id}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b last:border-0"
                      onClick={() => handleSelect(creator)}
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-900 truncate">{creator.name}</span>
                          {creator.isVerified && <CheckCircle className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{creator.tagline}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">{creator.category}</Badge>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">{t('explore.noResults')} "{searchTerm}"</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-20" data-testid="error-explore">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Unable to load creators right now. Please try again later.</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CreatorCardSkeleton key={i} />
            ))}
          </div>
        ) : selectedCreator ? (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('explore.searchResult')}</h2>
              <button onClick={handleClear} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <X className="h-4 w-4" /> {t('explore.clear')}
              </button>
            </div>
            <CreatorCard creator={selectedCreator} />
          </div>
        ) : (
          <div className="py-20" />
        )}
      </div>
    </div>
  );
}
