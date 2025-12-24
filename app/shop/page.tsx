"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, Grid, List } from "lucide-react";
import API from "@/services/api";
import Filters from "@/components/shop/Filters";
import SortBar from "@/components/shop/SortBar";
import ProductCard from "@/components/shop/ProductCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  images?: { url: string }[];
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const limit = 12;

  /* 🔁 RESET PAGE ON FILTER / SORT CHANGE */
  useEffect(() => {
    setPage(1);
  }, [search, category, brand, sort]);

  /* 🔥 FETCH PRODUCTS (CORRECT LOGIC) */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params: any = {
          page,
          limit,
        };

        if (search) params.search = search;
        if (category) params.category = category;
        if (brand) params.brand = brand;
        if (sort) params.sort = sort; // ⚠️ only send if exists

        const res = await API.get("/products", { params });

        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch (err) {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, brand, sort, page]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* ================= HEADER SECTION ================= */}
      <div className="bg-background-secondary border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-primary mb-2"
          >
            Shop Products
          </motion.h1>
          <p className="text-muted">
            Discover premium products at amazing prices
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= MOBILE FILTER TOGGLE ================= */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-background-tertiary rounded-xl border border-theme text-secondary hover:bg-background-secondary transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-background-tertiary text-brand"
                  : "text-muted"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-background-tertiary text-brand"
                  : "text-muted"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ================= DESKTOP FILTERS ================= */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="bg-background-secondary rounded-2xl p-6 border border-theme">
                <h3 className="text-lg font-semibold text-primary mb-6">
                  Filters
                </h3>
                <Filters
                  categories={[]} // Pass actual categories
                  brands={[]} // Pass actual brands
                  filters={{ category, brand }}
                  setFilters={(f: any) => {
                    setCategory(f.category);
                    setBrand(f.brand);
                  }}
                />
              </div>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex-1">
            {/* ================= SEARCH & SORT BAR ================= */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  placeholder="Search products by name, category, or brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-theme rounded-xl text-secondary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <SortBar sort={sort} setSort={setSort} />
              </div>
            </div>

            {/* ================= PRODUCTS GRID ================= */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center"
                >
                  <div className="inline-flex items-center justify-center gap-3">
                    <div className="w-8 h-8 border-3 border-brand/20 border-t-brand rounded-full animate-spin"></div>
                    <span className="text-secondary font-medium">
                      Loading products...
                    </span>
                  </div>
                </motion.div>
              ) : products.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex flex-col items-center gap-4 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center">
                      <Search className="w-10 h-10 text-muted" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      No products found
                    </h3>
                    <p className="text-muted">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setCategory("");
                        setBrand("");
                        setSort("");
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity mt-2"
                    >
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================= PAGINATION ================= */}
            {products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-theme"
              >
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-background-tertiary border border-theme rounded-xl text-secondary font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary transition-colors"
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-secondary">Page</span>
                  <span className="px-3 py-1 bg-background-tertiary rounded-lg font-semibold text-primary">
                    {page}
                  </span>
                </div>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Next
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE FILTERS OVERLAY ================= */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-theme z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-primary">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted" />
                  </button>
                </div>
                <Filters
                  categories={[]}
                  brands={[]}
                  filters={{ category, brand }}
                  setFilters={(f: any) => {
                    setCategory(f.category);
                    setBrand(f.brand);
                    setMobileFiltersOpen(false);
                  }}
                />
                <div className="mt-8 pt-6 border-t border-theme">
                  <button
                    onClick={() => {
                      setCategory("");
                      setBrand("");
                      setMobileFiltersOpen(false);
                    }}
                    className="w-full py-3 bg-background-tertiary border border-theme rounded-xl text-secondary font-medium hover:bg-background-secondary transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
