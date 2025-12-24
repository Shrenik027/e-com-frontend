"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Filters({
  categories,
  brands,
  filters,
  setFilters,
}: any) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="border-b border-theme pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full group"
        >
          <h4 className="font-semibold text-primary group-hover:text-brand transition-colors">
            Category
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-muted transition-transform ${
              openSection === "category" ? "rotate-180" : ""
            }`}
          />
        </button>

        <motion.div
          initial={false}
          animate={
            openSection === "category"
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full px-4 py-3 bg-background border border-theme rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all appearance-none"
            >
              <option value="" className="bg-background-secondary">
                All Categories
              </option>
              {categories.map((c: any) => (
                <option
                  key={c._id}
                  value={c._id}
                  className="bg-background-secondary"
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>

      {/* Brand */}
      <div className="border-b border-theme pb-6">
        <button
          onClick={() => toggleSection("brand")}
          className="flex items-center justify-between w-full group"
        >
          <h4 className="font-semibold text-primary group-hover:text-brand transition-colors">
            Brand
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-muted transition-transform ${
              openSection === "brand" ? "rotate-180" : ""
            }`}
          />
        </button>

        <motion.div
          initial={false}
          animate={
            openSection === "brand"
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4">
            <select
              value={filters.brand}
              onChange={(e) =>
                setFilters({ ...filters, brand: e.target.value })
              }
              className="w-full px-4 py-3 bg-background border border-theme rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all appearance-none"
            >
              <option value="" className="bg-background-secondary">
                All Brands
              </option>
              {brands.map((b: any) => (
                <option
                  key={b._id}
                  value={b._id}
                  className="bg-background-secondary"
                >
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>

      {/* Price */}
      <div className="border-b border-theme pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full group"
        >
          <h4 className="font-semibold text-primary group-hover:text-brand transition-colors">
            Price Range
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-muted transition-transform ${
              openSection === "price" ? "rotate-180" : ""
            }`}
          />
        </button>

        <motion.div
          initial={false}
          animate={
            openSection === "price"
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-muted mb-2">Min</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
                    ₹
                  </span>
                  <input
                    placeholder="0"
                    type="number"
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-full pl-8 pr-3 py-3 bg-background border border-theme rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-muted mb-2">Max</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
                    ₹
                  </span>
                  <input
                    placeholder="10000"
                    type="number"
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-full pl-8 pr-3 py-3 bg-background border border-theme rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setFilters({ ...filters, minPrice: "", maxPrice: "" });
              }}
              className="w-full py-2 text-sm text-muted hover:text-secondary transition-colors"
            >
              Clear price range
            </button>
          </div>
        </motion.div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={() => {
          // This will trigger parent's filter change
        }}
        className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        Apply Filters
      </button>
    </div>
  );
}
