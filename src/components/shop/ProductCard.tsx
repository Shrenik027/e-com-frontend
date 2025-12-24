"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";

export default function ProductCard({ product }: any) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/product/${product._id}`)}
      className="group cursor-pointer bg-background-secondary border border-theme rounded-2xl overflow-hidden hover:border-brand/30 transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-background-tertiary">
        <Image
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
            <Heart className="w-4 h-4 text-secondary" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-center gap-2 text-white font-semibold">
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </div>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Tag */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-brand/10 text-brand rounded-md">
            {product.category?.name || "Category"}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-primary line-clamp-2 mb-2 group-hover:text-brand transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= 4 ? "fill-[#F59E0B] text-[#F59E0B]" : "text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted ml-1">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted line-through">
              ₹{(product.price * 1.2).toLocaleString()}
            </p>
          </div>

          {/* Quick Add Button */}
          <button className="p-2 bg-background-tertiary rounded-lg hover:bg-brand hover:text-white transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Features */}
        <div className="mt-3 pt-3 border-t border-theme flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
            In Stock
          </span>
          <span>Free Delivery</span>
        </div>
      </div>
    </motion.div>
  );
}
