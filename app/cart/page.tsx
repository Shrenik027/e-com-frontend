"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  Tag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingCart,
  Check,
  AlertCircle,
  Package,
  Shield,
  CreditCard,
  Loader2,
  X,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Services
import {
  updateCartItem,
  removeCartItem,
  clearCart,
  applyCoupon,
  removeCoupon,
  applyShipping,
  getCart,
} from "@/services/cart";
import { getShippingMethods } from "@/services/shipping";
import { useCart } from "@/context/CartContext";

/**
 * INDUSTRY GRADE TYPES
 * Prevents the "Parameter 'i' implicitly has an 'any' type" error
 */
interface CartItem {
  _id: string;
  name: string;
  quantity: number;
  priceAtAdd: number;
  total: number;
  product?: {
    _id: string;
    stock: number;
    images: { url: string }[];
  };
}

export default function CartPage() {
  const router = useRouter();
  const { cart, setCart, showToast, refreshCart } = useCart();

  // --- Logic Control States ---
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});
  const [couponLoading, setCouponLoading] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  // --- Helpers ---
  const formatPrice = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  // --- Initial Load ---
  useEffect(() => {
    let isMounted = true;
    getShippingMethods()
      .then((data) => {
        if (isMounted) setShippingMethods(data);
      })
      .catch(() => showToast("Could not load shipping methods", "error"));
    return () => {
      isMounted = false;
    };
  }, [showToast]);

  // --- Logic: Parallel-Safe Quantity Update ---
  const handleUpdateQty = async (item: CartItem, newQty: number) => {
    if (loadingItems[item._id] || newQty < 1) return;

    const stock = item.product?.stock ?? 0;
    if (newQty > stock) {
      showToast(`Only ${stock} units remaining`, "error");
      return;
    }

    setLoadingItems((prev) => ({ ...prev, [item._id]: true }));
    try {
      const updatedCart = await updateCartItem(item._id, newQty);
      setCart(updatedCart);
    } catch (err: any) {
      showToast(err.response?.data?.error || "Update failed", "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [item._id]: false }));
    }
  };

  // --- Logic: Robust Remove ---
  const handleRemove = async (item: CartItem) => {
    if (loadingItems[item._id]) return;
    setLoadingItems((prev) => ({ ...prev, [item._id]: true }));
    try {
      const updatedCart = await removeCartItem(item._id);
      setCart(updatedCart);
      showToast(`${item.name} removed`, "success");
    } catch {
      showToast("Failed to remove item", "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [item._id]: false }));
    }
  };

  // --- Logic: Coupon Management ---
  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || couponLoading) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const updatedCart = await applyCoupon(couponCode.trim());
      setCart(updatedCart);
      setCouponCode("");
      showToast("Promo applied!", "success");
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Invalid Code";
      setCouponError(msg);
      showToast(msg, "error");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setCouponLoading(true);
    try {
      const updatedCart = await removeCoupon();
      setCart(updatedCart);
      showToast("Coupon removed", "info");
    } catch {
      showToast("Failed to remove coupon", "error");
    } finally {
      setCouponLoading(false);
    }
  };

  // --- Logic: Shipping ---
  const handleShipping = async (id: string) => {
    if (shippingLoading) return;
    setShippingLoading(true);
    try {
      const updatedCart = await applyShipping(id);
      setCart(updatedCart);
    } catch {
      showToast("Error updating shipping", "error");
    } finally {
      setShippingLoading(false);
    }
  };

  // --- Logic: Freshness Guard Checkout ---
  const handleCheckout = async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    try {
      // Step 1: Refresh one last time to ensure stock hasn't changed
      await refreshCart();

      if (!cart?.shippingMethod) {
        showToast("Please select a shipping method", "error");
        setIsNavigating(false);
        return;
      }

      router.push("/checkout");
    } catch {
      setIsNavigating(false);
    }
  };

  // --- Loading/Error States ---
  if (!cart)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-6"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[#F97316]/20 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
          </div>
          <div className="absolute -inset-4 rounded-full border-2 border-[var(--color-primary)]/10 animate-pulse"></div>
        </div>
        <p className="mt-6 text-muted font-medium">Loading your cart...</p>
      </motion.div>
    );

  if (cart.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      >
        {/* Empty Cart Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative mb-10"
        >
          <div className="w-48 h-48 rounded-[40px] bg-background-secondary flex items-center justify-center shadow-2xl shadow-black/30">
            <ShoppingBag className="w-24 h-24 text-muted" />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -inset-8 rounded-[60px] bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent-blue)]/10 blur-xl"
          />
        </motion.div>

        {/* Empty State Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-md"
        >
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            Looks like you haven't added any items yet. Start exploring our
            collection of premium products.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary)]/20 to-[#F97316]/20 blur-xl rounded-3xl" />
            <Link
              href="/shop"
              className="relative px-12 py-5 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] shadow-2xl shadow-[var(--color-primary)]/30 hover:shadow-3xl hover:shadow-[var(--color-primary)]/40 transition-all duration-300 flex items-center gap-4 group"
            >
              <ShoppingBag className="w-6 h-6" />
              Start Shopping
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>

          <p className="text-sm text-muted mt-6">
            Free shipping on orders over ₹999 • 30-day return policy
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background)] opacity-50 pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 lg:mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ rotate: 5 }} className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center shadow-xl">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--color-accent-green)] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-white">
                    {cart.items.length}
                  </span>
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                  Shopping Cart
                </h1>
                <p className="text-secondary mt-1">
                  Review your items and proceed to checkout
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/shop"
                className="px-5 py-3 rounded-xl bg-background-secondary border border-theme text-secondary hover:text-primary hover:border-[var(--color-primary)]/30 transition-colors flex items-center gap-3 group"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Continue Shopping</span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  confirm("Clear all items from your cart?") &&
                  clearCart().then(setCart)
                }
                className="px-5 py-3 rounded-xl bg-background-secondary border border-theme text-muted hover:text-red-400 hover:border-red-400/30 transition-colors flex items-center gap-3"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Clear All</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ================= LEFT COLUMN: CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">
                Items ({cart.items.length})
              </h2>
              <div className="text-sm text-muted">
                Total:{" "}
                <span className="font-bold text-primary ml-1">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-5">
              <AnimatePresence mode="popLayout">
                {cart.items.map((item: CartItem, index: number) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="group"
                  >
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-3xl">
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Main Card */}
                      <div className="relative bg-background-secondary border border-theme p-6 rounded-3xl backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Product Image */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative flex-shrink-0"
                          >
                            <div className="relative w-full sm:w-40 h-40 sm:h-40">
                              {/* Image Container */}
                              <div className="absolute inset-0 bg-gradient-to-br from-background-tertiary to-background-secondary rounded-2xl" />
                              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-theme">
                                <Image
                                  src={
                                    item.product?.images?.[0]?.url ||
                                    "/placeholder.png"
                                  }
                                  alt={item.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 640px) 100vw, 160px"
                                />
                              </div>

                              {/* Stock Badge */}
                              {item.product?.stock &&
                                item.product.stock < 10 && (
                                  <div className="absolute -top-2 -right-2 px-3 py-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] rounded-full shadow-lg">
                                    <span className="text-xs font-bold text-white">
                                      Only {item.product.stock} left
                                    </span>
                                  </div>
                                )}
                            </div>
                          </motion.div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            {/* Header Row */}
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-primary mb-2 truncate">
                                  {item.name}
                                </h3>
                                <div className="flex items-center gap-4 mb-3">
                                  <span className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                                    {formatPrice(item.priceAtAdd)}
                                  </span>
                                  <span className="text-sm text-muted">
                                    each
                                  </span>
                                </div>
                              </div>

                              {/* Remove Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemove(item)}
                                disabled={loadingItems[item._id]}
                                className="flex-shrink-0 p-3 rounded-xl bg-background-tertiary text-muted hover:text-red-400 hover:bg-red-400/10 border border-theme ml-4"
                                aria-label={`Remove ${item.name}`}
                              >
                                {loadingItems[item._id] ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <X className="w-5 h-5" />
                                )}
                              </motion.button>
                            </div>

                            {/* Quantity Controls and Total */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-4">
                                <div className="flex items-center bg-background-tertiary border border-theme rounded-2xl overflow-hidden shadow-inner">
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    disabled={
                                      item.quantity <= 1 ||
                                      loadingItems[item._id]
                                    }
                                    onClick={() =>
                                      handleUpdateQty(item, item.quantity - 1)
                                    }
                                    className="p-4 hover:bg-background-secondary disabled:opacity-30 transition-colors"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-5 h-5" />
                                  </motion.button>

                                  <div className="w-16 text-center">
                                    {loadingItems[item._id] ? (
                                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                      <span className="text-lg font-bold text-primary">
                                        {item.quantity}
                                      </span>
                                    )}
                                  </div>

                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    disabled={
                                      item.quantity >=
                                        (item.product?.stock ?? 0) ||
                                      loadingItems[item._id]
                                    }
                                    onClick={() =>
                                      handleUpdateQty(item, item.quantity + 1)
                                    }
                                    className="p-4 hover:bg-background-secondary disabled:opacity-30 transition-colors"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-5 h-5" />
                                  </motion.button>
                                </div>

                                <div className="text-sm text-muted">
                                  Max: {item.product?.stock ?? 0}
                                </div>
                              </div>

                              {/* Total Price */}
                              <div className="text-right">
                                <p className="text-sm text-muted mb-2">
                                  Item Total
                                </p>
                                <p className="text-3xl font-bold text-primary">
                                  {formatPrice(item.total)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8"
            >
              {/* Summary Card */}
              <div className="bg-background-secondary border border-theme rounded-3xl overflow-hidden shadow-2xl">
                {/* Card Header */}
                <div className="p-8 border-b border-theme">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">
                      Order Summary
                    </h2>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Subtotal</span>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(cart.subtotal)}
                      </span>
                    </div>

                    {/* Discount Display */}
                    {cart.discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-between items-center py-3 px-4 bg-[var(--color-accent-green)]/10 border border-[var(--color-accent-green)]/20 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Tag className="w-4 h-4 text-[var(--color-accent-green)]" />
                            <span className="text-sm font-bold text-[var(--color-accent-green)]">
                              Discount Applied
                            </span>
                          </div>
                          <span className="text-lg font-bold text-[var(--color-accent-green)]">
                            -{formatPrice(cart.discount)}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Shipping</span>
                      <span className="text-lg font-bold text-primary">
                        {cart.shippingMethod
                          ? cart.shipping === 0
                            ? "FREE"
                            : formatPrice(cart.shipping)
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Section */}
                <div className="p-8 border-b border-theme">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted mb-1">Total Amount</p>
                      <p className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                        {formatPrice(cart.total)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted">Including all taxes</p>
                      <p className="text-xs text-muted">
                        Free shipping over ₹999
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="p-8 border-b border-theme">
                  {cart.discount > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-accent-green)] flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-[var(--color-accent-green)]">
                              Coupon Applied
                            </p>
                            <p className="text-sm text-muted">
                              You saved {formatPrice(cart.discount)}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleRemoveCoupon}
                          disabled={couponLoading}
                          className="p-2 rounded-lg bg-background-tertiary text-muted hover:text-red-400 hover:bg-red-400/10 border border-theme"
                          aria-label="Remove coupon"
                        >
                          {couponLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-primary mb-3">
                        Have a promo code?
                      </p>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <input
                            value={couponCode}
                            onChange={(e) =>
                              setCouponCode(e.target.value.toUpperCase())
                            }
                            placeholder="Enter promo code"
                            className="w-full bg-background-tertiary border border-theme rounded-2xl px-4 py-3.5 text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/30 transition-all"
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleApplyCoupon()
                            }
                          />
                          <Tag className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !couponCode}
                          className="px-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {couponLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </motion.button>
                      </div>
                      {couponError && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 px-2 flex items-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {couponError}
                        </motion.p>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping Methods */}
                <div className="p-8 border-b border-theme">
                  <p className="text-sm font-bold text-primary mb-4 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[var(--color-accent-blue)]" />
                    Delivery Options
                  </p>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <motion.button
                        key={method._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={shippingLoading}
                        onClick={() => handleShipping(method._id)}
                        className={`w-full flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                          cart.shippingMethod === method._id
                            ? "border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)]/10 to-[#F97316]/5"
                            : "border-theme bg-background-tertiary hover:border-[var(--color-primary)]/40"
                        }`}
                      >
                        <div className="text-left">
                          <span className="font-bold text-primary block">
                            {method.name}
                          </span>
                          <span className="text-sm text-muted">
                            {method.estimatedDays
                              ? `${method.estimatedDays} days`
                              : "Standard"}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {method.price === 0
                            ? "FREE"
                            : formatPrice(method.price)}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Security & Checkout */}
                <div className="p-8">
                  {/* Security Badge */}
                  <div className="mb-8 p-4 bg-background-tertiary border border-theme rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-blue)] to-[#60A5FA] flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">
                          Secure Checkout
                        </p>
                        <p className="text-xs text-muted">
                          Your payment is 100% protected
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={
                      !cart.shippingMethod ||
                      isNavigating ||
                      cart.items.some((i: { product?: any }) => !i.product)
                    }
                    onClick={handleCheckout}
                    className="w-full py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    {isNavigating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-6 h-6" />
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </motion.button>

                  {/* Additional Info */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-muted">
                      By proceeding, you agree to our{" "}
                      <a
                        href="/terms"
                        className="text-[var(--color-accent-blue)] hover:underline"
                      >
                        Terms & Conditions
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
