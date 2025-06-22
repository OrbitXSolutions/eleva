"use client";
import Form from "next/form";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpAZ,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useServerTranslation } from "@/hooks/useServerTranslation";
import ProductListItem from "./ProductListItem";
import LoadingSpinner from "./LoadingSpinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductWithUserData } from "@/lib/types/database.types";
import ProductCard from "@/components/atoms/ProductCard";

interface Category {
  id: number;
  name_en: string | null;
  name_ar: string | null;
  slug: string | null;
}

interface ProductsPageClientProps {
  initialProducts: ProductWithUserData[];
  categories: Category[];
  initialQuery: string;
  initialCategoryId?: number;
  currentPage: number;
  hasMore: boolean;
}

type ViewMode = "grid" | "list";
type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name-az"
  | "name-za"
  | "rating-high"
  | "rating-low";

export default function ProductsPageClient({
  initialProducts,
  categories,
  initialQuery,
  initialCategoryId,
  currentPage,
  hasMore,
}: ProductsPageClientProps) {
  const { t, locale, isRTL } = useServerTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] =
    useState<ProductWithUserData[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    initialCategoryId
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Initialize pagination data on mount
  useEffect(() => {
    // Calculate initial pagination based on products length and page size
    const pageSize = 8;
    const initialTotal =
      initialProducts.length >= pageSize
        ? Math.ceil(initialProducts.length * (hasMore ? 2 : 1))
        : initialProducts.length;
    const initialTotalPages = Math.ceil(initialTotal / pageSize);

    setTotalProducts(initialTotal);
    setTotalPages(initialTotalPages);
  }, [initialProducts.length, hasMore]);

  // Sync sortBy state with URL params
  useEffect(() => {
    const sortParam = searchParams.get("sort") as SortOption;
    if (
      sortParam &&
      [
        "newest",
        "oldest",
        "price-low",
        "price-high",
        "name-az",
        "name-za",
        "rating-high",
        "rating-low",
      ].includes(sortParam)
    ) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  const getCategoryName = (category: Category) => {
    return locale === "ar"
      ? category.name_ar || category.name_en
      : category.name_en;
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return null;
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? getCategoryName(category) : null;
  };

  const updateURL = useCallback(
    (params: Record<string, string | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.replace(`${pathname}${query}`);
    },
    [pathname, router, searchParams]
  );

  const handleSearch = useCallback(
    async (query: string, categoryId?: number, newPage = 1) => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (categoryId) params.set("category", categoryId.toString());
        params.set("page", newPage.toString());
        params.set("sort", sortBy);
        // Update URL with sort parameter
        updateURL({
          q: query || undefined,
          category: categoryId?.toString(),
          page: newPage > 1 ? newPage.toString() : undefined,
          sort: sortBy !== "newest" ? sortBy : undefined,
        });

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();

        setProducts(data.products || []);
        setPage(newPage);
        setTotalPages(data.totalPages || 1);
        setTotalProducts(data.total || 0);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [sortBy, updateURL]
  );

  const handleCategoryChange = (categoryId: string) => {
    const newCategoryId =
      categoryId === "all" ? undefined : Number.parseInt(categoryId);
    setSelectedCategory(newCategoryId);
    handleSearch(searchQuery, newCategoryId, 1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
    setSortBy("newest");
    handleSearch("", undefined, 1);
  };

  const handlePageChange = (newPage: number) => {
    handleSearch(searchQuery, selectedCategory, newPage);
    // Scroll to top of products section
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const sortProducts = (
    products: ProductWithUserData[],
    sortOption: SortOption
  ) => {
    const sorted = [...products];
    switch (sortOption) {
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.created_at!).getTime() -
            new Date(b.created_at!).getTime()
        );
      case "price-low":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name-az":
        return sorted.sort((a, b) => {
          const nameA =
            locale === "ar" ? a.name_ar || a.name_en || "" : a.name_en || "";
          const nameB =
            locale === "ar" ? b.name_ar || b.name_en || "" : b.name_en || "";
          return nameA.localeCompare(nameB);
        });
      case "name-za":
        return sorted.sort((a, b) => {
          const nameA =
            locale === "ar" ? a.name_ar || a.name_en || "" : a.name_en || "";
          const nameB =
            locale === "ar" ? b.name_ar || b.name_en || "" : b.name_en || "";
          return nameB.localeCompare(nameA);
        });
      case "rating-high":
        return sorted.sort(
          (a, b) => (b.total_rates || 0) - (a.total_rates || 0)
        );
      case "rating-low":
        return sorted.sort(
          (a, b) => (a.total_rates || 0) - (b.total_rates || 0)
        );
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t("products.title") || "Our Products"}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {t("products.description") ||
                "Discover our complete collection of premium fragrances"}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <Form action="/products" className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search
                  className={`absolute ${
                    isRTL ? "right-3" : "left-3"
                  } top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                />
                <Input
                  type="text"
                  name="q"
                  placeholder={t("header.search") || "Search perfumes..."}
                  defaultValue={searchQuery}
                  className={`${isRTL ? "pr-10" : "pl-10"} h-12`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>

            {/* Filters Row */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {t("categories.title") || "Categories"}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant={!selectedCategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(undefined);
                        handleSearch(searchQuery, undefined, 1);
                      }}
                      className="flex flex-col items-center gap-1 h-auto py-2 px-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Grid className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-xs">
                        {t("categories.all") || "All"}
                      </span>
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        type="button"
                        variant={
                          selectedCategory === category.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(category.id);
                          handleSearch(searchQuery, category.id, 1);
                        }}
                        className="flex flex-col items-center gap-1 h-auto py-2 px-3"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-purple-200 rounded-full"></div>
                        </div>
                        <span className="text-xs">
                          {getCategoryName(category)}
                        </span>
                      </Button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    name="category"
                    value={selectedCategory?.toString() || ""}
                  />
                </div>

                {/* Sort and View Controls */}
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  {/* Sort Filter */}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Sort By
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={sortBy === "newest" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortBy("newest");
                          handleSearch(searchQuery, selectedCategory, 1);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4" />
                        {t("products.sort.newest") || "Newest"}
                      </Button>
                      <Button
                        type="button"
                        variant={sortBy === "price-low" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortBy("price-low");
                          handleSearch(searchQuery, selectedCategory, 1);
                        }}
                        className="flex items-center gap-2"
                      >
                        <TrendingUp className="h-4 w-4" />
                        {t("products.sort.priceLow") || "Price ↑"}
                      </Button>
                      <Button
                        type="button"
                        variant={
                          sortBy === "price-high" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setSortBy("price-high");
                          handleSearch(searchQuery, selectedCategory, 1);
                        }}
                        className="flex items-center gap-2"
                      >
                        <TrendingDown className="h-4 w-4" />
                        {t("products.sort.priceHigh") || "Price ↓"}
                      </Button>
                      <Button
                        type="button"
                        variant={sortBy === "name-az" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortBy("name-az");
                          handleSearch(searchQuery, selectedCategory, 1);
                        }}
                        className="flex items-center gap-2"
                      >
                        <ArrowUpAZ className="h-4 w-4" />
                        {t("products.sort.nameAZ") || "A-Z"}
                      </Button>
                      <Button
                        type="button"
                        variant={
                          sortBy === "rating-high" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setSortBy("rating-high");
                          handleSearch(searchQuery, selectedCategory, 1);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Star className="h-4 w-4" />
                        {t("products.sort.ratingHigh") || "Rating ↓"}
                      </Button>
                      <Button
                        type="button"
                        variant={
                          sortBy === "rating-low" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setSortBy("rating-low");
                          handleSearch(searchQuery, selectedCategory, 1);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Star className="h-4 w-4" />
                        {t("products.sort.ratingLow") || "Rating ↑"}
                      </Button>
                    </div>
                    <input type="hidden" name="sort" value={sortBy} />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex flex-col items-start lg:items-end">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      View
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="lg"
                        onClick={() => setViewMode("grid")}
                        className="px-4"
                      >
                        <Grid className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="lg"
                        onClick={() => setViewMode("list")}
                        className="px-4"
                      >
                        <List className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden inputs for maintaining state */}
            <input type="hidden" name="page" value="1" />
            <input type="hidden" name="lang" value={locale} />
          </Form>

          {/* Active Filters */}
          {(searchQuery || selectedCategory) && (
            <div
              className={`flex items-center gap-2 mt-4 pt-4 border-t ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <span className="text-sm text-gray-600">
                {t("products.activeFilters") || "Active filters"}:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.delete("q");
                      window.location.href = url.toString();
                    }}
                  />
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getSelectedCategoryName()}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.delete("category");
                      window.location.href = url.toString();
                    }}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.location.href = "/products";
                }}
                className="text-purple-600"
              >
                {t("products.clearAll") || "Clear All"}
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {products.length > 0 ? (
              <>
                {t("products.resultsCount") || "Showing"} {(page - 1) * 8 + 1}-
                {Math.min(page * 8, Math.max(products.length, totalProducts))}{" "}
                {t("products.of") || "of"}{" "}
                {totalProducts > 0 ? totalProducts : products.length}{" "}
                {t("products.results") || "results"}
                {searchQuery &&
                  ` ${t("products.for") || "for"} "${searchQuery}"`}
              </>
            ) : (
              `0 ${t("products.results") || "results"}`
            )}
          </p>
          {(totalPages > 1 || (products.length >= 8 && hasMore)) && (
            <p className="text-sm text-gray-500">
              {t("products.page") || "Page"} {page} {t("products.of") || "of"}{" "}
              {totalPages > 0 ? totalPages : Math.ceil(products.length / 8)}
            </p>
          )}
        </div>

        {/* Products Grid/List */}
        {loading && sortedProducts.length === 0 ? (
          <LoadingSpinner />
        ) : sortedProducts.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {sortedProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {(totalPages > 1 || (products.length >= 8 && hasMore)) &&
              !loading && (
                <div className="flex justify-center mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={
                            page <= 1
                              ? undefined
                              : `?${new URLSearchParams({
                                  ...Object.fromEntries(searchParams.entries()),
                                  page: (page - 1).toString(),
                                }).toString()}`
                          }
                          className={
                            page <= 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from(
                        {
                          length: Math.max(
                            totalPages,
                            Math.ceil(products.length / 8)
                          ),
                        },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href={`?${new URLSearchParams({
                                  ...Object.fromEntries(searchParams.entries()),
                                  page: pageNum.toString(),
                                }).toString()}`}
                                isActive={pageNum === page}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href={
                            page >=
                            Math.max(totalPages, Math.ceil(products.length / 8))
                              ? undefined
                              : `?${new URLSearchParams({
                                  ...Object.fromEntries(searchParams.entries()),
                                  page: (page + 1).toString(),
                                }).toString()}`
                          }
                          className={
                            page >=
                            Math.max(totalPages, Math.ceil(products.length / 8))
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("products.noResults") || "No products found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("products.noResultsDescription") ||
                  "Try adjusting your search or filters to find what you're looking for."}
              </p>
              <Button
                onClick={() => {
                  window.location.href = "/products";
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {t("products.clearFilters") || "Clear Filters"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
