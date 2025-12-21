"use client";

import API from "@/services/api";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { setCart } = useCart();

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await API.post("/cart", {
      productId,
      quantity: 1,
    });

    // ✅ update cart directly
    setCart(res.data.cart);
  };

  return (
    <button
      onClick={addToCart}
      className="bg-[#1f3655] text-white px-6 py-3 rounded-md hover:bg-[#16283f]"
    >
      Add to cart
    </button>
  );
}
