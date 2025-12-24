"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import API from "@/services/api";
import ProductCard from "@/components/shop/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: { url: string }[];
  discount: number;
  stock: number;
}

export default function RelatedProducts({
  productId,
  categoryId,
}: {
  productId: string;
  categoryId: string;
}) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await API.get("/products", {
          params: {
            category: categoryId,
            limit: 4,
            page: 1,
          },
        });

        // Filter out current product
        const filtered = response.data.products.filter(
          (product: Product) => product._id !== productId
        );
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error("Failed to load related products");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchRelatedProducts();
    }
  }, [productId, categoryId]);

  if (loading || relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary">Related Products</h2>
          <p className="text-muted mt-1">You might also like</p>
        </div>
        <button className="flex items-center gap-2 text-brand hover:opacity-80 transition-opacity font-semibold">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
