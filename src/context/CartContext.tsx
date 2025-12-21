"use client";

import { createContext, useContext, useEffect, useState } from "react";
import API from "@/services/api";

type CartContextType = {
  cart: any;
  setCart: (cart: any) => void;
  checkoutInProgress: boolean;
  setCheckoutInProgress: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  // Initial cart load
  useEffect(() => {
    API.get("/cart")
      .then((res) => setCart(res.data.cart))
      .catch(() => {});
  }, []);

  // 🔥 Listen for global cart refresh events
  useEffect(() => {
    const handler = (e: any) => {
      setCart(e.detail);
    };

    window.addEventListener("cart:update", handler);
    return () => window.removeEventListener("cart:update", handler);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        checkoutInProgress,
        setCheckoutInProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
