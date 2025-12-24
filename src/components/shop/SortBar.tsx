"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function SortBar({ sort, setSort }: any) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted hidden sm:inline">Sort by:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="appearance-none px-4 py-3 bg-background-secondary border border-theme rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all pr-10 cursor-pointer"
        >
          <option value="" className="bg-background-secondary">
            Recommended
          </option>
          <option value="price" className="bg-background-secondary">
            Price: Low → High
          </option>
          <option value="-price" className="bg-background-secondary">
            Price: High → Low
          </option>
          <option value="-createdAt" className="bg-background-secondary">
            Newest First
          </option>
          <option value="createdAt" className="bg-background-secondary">
            Oldest First
          </option>
          <option value="name" className="bg-background-secondary">
            Name: A → Z
          </option>
          <option value="-name" className="bg-background-secondary">
            Name: Z → A
          </option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>
    </div>
  );
}
