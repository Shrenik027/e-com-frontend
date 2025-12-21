"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/services/api";
import { Search, Loader2, Star, Package } from "lucide-react";

// Image URL helper function
const getImageUrl = (image: any): string => {
  if (!image) return "";

  // If image is a string
  if (typeof image === "string") {
    // Already full URL or base64
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("data:image/")) {
      return image;
    }

    // Relative path
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const cleanPath = image.startsWith("/") ? image.substring(1) : image;
    return `${baseUrl}/${cleanPath}`;
  }

  // If image is an object with url property (like ProductPage)
  if (typeof image === "object" && image.url) {
    return getImageUrl(image.url); // Process the url string
  }

  // If image is an object with path property
  if (typeof image === "object" && image.path) {
    return getImageUrl(image.path);
  }

  return "";
};

type Product = {
  _id: string;
  name: string;
  price: number;
  images: Array<{
    // Changed from string[] to object array
    url: string;
    alt?: string;
    _id?: string;
  }>;
  brand:
    | string
    | {
        _id: string;
        name: string;
        description?: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
  rating: number;
  stock: number;
  description?: string;
  discount?: number;
};

const LIMIT = 12;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Helper function to get brand name
  const getBrandName = (brand: any): string => {
    if (typeof brand === "string") return brand;
    if (brand && typeof brand === "object" && brand.name) return brand.name;
    return "Unknown Brand";
  };

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      params.append("page", page.toString());
      params.append("limit", LIMIT.toString());

      const res = await API.get(`/products?${params.toString()}`);

      // DEBUG: Log image structure
      if (res.data?.products?.[0]) {
        console.log("First product images structure:", {
          images: res.data.products[0].images,
          firstImage: res.data.products[0].images?.[0],
          firstImageType: typeof res.data.products[0].images?.[0],
          processedUrl: getImageUrl(res.data.products[0].images?.[0]),
        });
      }

      // FIX: Handle API response properly
      let productsData: Product[] = [];
      let totalCount = 0;

      if (res.data && res.data.products) {
        // If products exists in response
        if (Array.isArray(res.data.products)) {
          productsData = res.data.products;
        } else if (typeof res.data.products === "object") {
          // If it's a single product object, wrap it in array
          productsData = [res.data.products];
        }
        totalCount = res.data.total || productsData.length;
      } else if (Array.isArray(res.data)) {
        // If response is directly an array
        productsData = res.data;
        totalCount = res.data.length;
      }

      setProducts(productsData);
      setTotal(totalCount);
      setHasSearched(true);

      // Update URL
      const urlParams = new URLSearchParams();
      if (searchTerm) urlParams.set("search", searchTerm);
      urlParams.set("page", page.toString());

      router.replace(`/search?${urlParams.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, router]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (searchTerm !== searchParams.get("search")) {
      setPage(1);
    }
  }, [searchTerm, searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ---------------- HANDLE SEARCH ---------------- */
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setPage(1);
      setHasSearched(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setPage(1);
    setHasSearched(false);
    router.replace("/search", { scroll: false });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate original price with discount
  const calculateOriginalPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return Math.round(price / (1 - discount / 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-blue-100 text-lg">
              Find exactly what you're looking for from our curated collection
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search products, brands, or categories..."
                className="w-full pl-14 pr-24 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/20 focus:outline-none transition-all"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-800 hover:to-indigo-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Quick Stats */}
            {searchTerm && (
              <div className="mt-6 flex items-center justify-center gap-6 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">{total}</div>
                  <div className="text-sm">Products Found</div>
                </div>
                <div className="h-8 w-px bg-blue-400"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{page}</div>
                  <div className="text-sm">Page</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Searching products...
            </p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            {searchTerm && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-gray-600 mt-2">
                  Found {total} product{total !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {/* Products Grid */}
            {products && Array.isArray(products) && products.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => {
                    // Get the first image object and extract URL
                    const firstImage = product.images?.[0];
                    const imageUrl = getImageUrl(firstImage);

                    return (
                      <Link
                        key={product._id}
                        href={`/product/${product._id}`}
                        className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Product Image */}
                        <div className="aspect-square overflow-hidden bg-gray-100 relative">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                console.error("Image failed to load:", {
                                  product: product.name,
                                  imageObject: firstImage,
                                  processedUrl: imageUrl,
                                });
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                          {/* Stock Badge */}
                          <div
                            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                              product.stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </div>
                          {/* Discount Badge */}
                          {product.discount && product.discount > 0 && (
                            <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                              -{product.discount}%
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {getBrandName(product.brand)}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold">
                                {product.rating || 4.5}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xl font-bold text-gray-900">
                                {formatPrice(product.price)}
                              </span>
                              {product.discount && product.discount > 0 && (
                                <>
                                  <span className="ml-2 text-sm text-gray-500 line-through">
                                    {formatPrice(
                                      calculateOriginalPrice(
                                        product.price,
                                        product.discount
                                      )
                                    )}
                                  </span>
                                  <span className="ml-2 text-sm text-green-600 font-medium">
                                    Save {product.discount}%
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {total > LIMIT && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                        page === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from(
                        { length: Math.min(5, Math.ceil(total / LIMIT)) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                page === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-white border border-gray-300 text-gray-700 hover:border-blue-300"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                      {Math.ceil(total / LIMIT) > 5 && (
                        <span className="text-gray-500">...</span>
                      )}
                    </div>

                    <button
                      disabled={products.length < LIMIT}
                      onClick={() => setPage((p) => p + 1)}
                      className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                        products.length < LIMIT
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  {hasSearched && searchTerm ? (
                    <Search className="w-12 h-12 text-blue-400" />
                  ) : (
                    <Package className="w-12 h-12 text-blue-400" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {hasSearched && searchTerm
                    ? "No products found"
                    : "Discover Products"}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {hasSearched && searchTerm
                    ? `We couldn't find any products matching "${searchTerm}". Try different keywords.`
                    : "Start typing in the search bar above to discover amazing products."}
                </p>
                {hasSearched && searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
