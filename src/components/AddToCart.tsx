"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
}

export default function AddToCartButton({
  productId,
  quantity = 1, // ✅ NOW ACCEPTS QUANTITY
  disabled = false,
  className = "",
}: AddToCartButtonProps) {
  const router = useRouter();
  const { setCart } = useCart();
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    if (disabled) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      // ✅ NOW USES THE PASSED QUANTITY
      const res = await API.post("/cart", {
        productId,
        quantity,
      });

      // ✅ update cart directly
      setCart(res.data.cart);
    } catch (err: any) {
      console.error("Failed to add to cart:", err);

      if (err.response?.status === 401) {
        router.push("/login");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={addToCart}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
        disabled
          ? "bg-background-tertiary border border-theme text-muted cursor-not-allowed"
          : loading
          ? "bg-background-tertiary border border-theme text-secondary"
          : "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:opacity-90"
      } ${className}`}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </>
      )}
    </motion.button>
  );
}
