"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";
import API from "@/services/api";

export type ToastType = "success" | "error" | "info";

type CartContextType = {
  cart: any;
  setCart: (cart: any) => void;
  checkoutInProgress: boolean;
  setCheckoutInProgress: (v: boolean) => void;

  refreshCart: () => Promise<void>;

  toast: { message: string; type: ToastType } | null;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* ================= CART SYNC ================= */

  const refreshCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.cart);
    } catch {
      setCart(null);
    }
  };

  // Initial cart load
  useEffect(() => {
    refreshCart();
  }, []);

  /* ================= TOAST ================= */

  const showToast = (message: string, type: ToastType = "info") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ message, type });

    toastTimerRef.current = setTimeout(() => {
      hideToast();
    }, 3000);
  };

  const hideToast = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        refreshCart,
        checkoutInProgress,
        setCheckoutInProgress,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}

      {/* Global Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100]"
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
                toast.type === "success"
                  ? "bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white"
                  : toast.type === "error"
                  ? "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white"
                  : "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {toast.type === "success" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
              </div>

              <span className="font-medium">{toast.message}</span>

              <button
                onClick={hideToast}
                className="ml-2 p-1 hover:opacity-80 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
