"use client";

import { useState, useEffect } from "react";
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
  Sparkles,
  Info,
} from "lucide-react";
import API from "@/services/api";

import {
  updateCartItem,
  removeCartItem,
  clearCart,
  applyCoupon,
  removeCoupon,
  applyShipping,
} from "@/services/cart";

import { useCart } from "@/context/CartContext";
import { getShippingMethods } from "@/services/shipping";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, setCart, showToast } = useCart();

  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);

  /* ================= LOAD SHIPPING METHODS ================= */
  useEffect(() => {
    getShippingMethods()
      .then(setShippingMethods)
      .catch(() => {});
  }, []);

  if (!cart) {
    return <div className="p-20 text-center">Loading cart…</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/shop" className="text-brand font-semibold">
          Your cart is empty. Start shopping →
        </Link>
      </div>
    );
  }

  /* ================= QUANTITY ================= */

  const increaseQty = async (item: any) => {
    if (loadingItem || item.quantity >= item.product?.stock) return;

    try {
      setLoadingItem(item._id);
      const updated = await updateCartItem(item._id, item.quantity + 1);
      setCart(updated);
      showToast(`Increased quantity of ${item.name}`, "success");
    } catch {
      showToast("Failed to update quantity", "error");
    } finally {
      setLoadingItem(null);
    }
  };

  const decreaseQty = async (item: any) => {
    if (loadingItem) return;

    try {
      setLoadingItem(item._id);

      const updated =
        item.quantity === 1
          ? await removeCartItem(item._id)
          : await updateCartItem(item._id, item.quantity - 1);

      setCart(updated);
      showToast(
        item.quantity === 1
          ? `${item.name} removed`
          : `Decreased quantity of ${item.name}`,
        "success"
      );
    } catch {
      showToast("Failed to update cart", "error");
    } finally {
      setLoadingItem(null);
    }
  };

  const handleRemoveItem = async (id: string, name: string) => {
    if (removingItemId) return;

    try {
      setRemovingItemId(id);
      const updated = await removeCartItem(id);
      setCart(updated);
      showToast(`Removed ${name}`, "success");
    } catch {
      showToast("Failed to remove item", "error");
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Clear entire cart?")) return;
    try {
      const updated = await clearCart();
      setCart(updated);
      showToast("Cart cleared", "success");
    } catch {
      showToast("Failed to clear cart", "error");
    }
  };

  /* ================= COUPON ================= */

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || couponLoading) return;

    try {
      setCouponLoading(true);
      setCouponError("");
      const updated = await applyCoupon(couponCode.trim());
      setCart(updated);
      setCouponCode("");
      showToast("Coupon applied", "success");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Invalid coupon";
      setCouponError(msg);
      showToast(msg, "error");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    if (couponLoading) return;

    try {
      setCouponLoading(true);
      const updated = await removeCoupon();
      setCart(updated);
      showToast("Coupon removed", "success");
    } catch {
      showToast("Failed to remove coupon", "error");
    } finally {
      setCouponLoading(false);
    }
  };

  /* ================= SHIPPING ================= */

  const handleApplyShipping = async (methodId: string) => {
    if (shippingLoading) return;

    try {
      setShippingLoading(true);
      const updated = await applyShipping(methodId);
      setCart(updated);
      const method = shippingMethods.find((m) => m._id === methodId);
      showToast(`Shipping set to ${method?.name}`, "success");
    } catch {
      showToast("Failed to update shipping", "error");
    } finally {
      setShippingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT COLUMN: CART ITEMS ================= */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand" />
                  <h2 className="text-xl font-bold text-primary">
                    Cart Items ({cart.items.length})
                  </h2>
                </div>
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </motion.div>

            {/* Cart Items List */}
            <div className="space-y-4">
              <AnimatePresence>
                {cart.items.map((item: any, index: number) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background-secondary border border-theme rounded-xl overflow-hidden"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Product Image */}
                        <div className="relative w-full md:w-32 h-32 md:h-32 flex-shrink-0 bg-background-tertiary rounded-lg overflow-hidden">
                          <Image
                            src={
                              item.product?.images?.[0]?.url ||
                              "/placeholder.png"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 128px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-primary mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted mb-3">
                                ₹{item.priceAtAdd} each
                              </p>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-4">
                                <div className="flex items-center border border-theme rounded-lg">
                                  <button
                                    onClick={() => decreaseQty(item)}
                                    disabled={
                                      loadingItem === item._id ||
                                      item.quantity === 1
                                    }
                                    className="p-2 text-muted hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    {loadingItem === item._id &&
                                    item.quantity === 1 ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <Minus className="w-3 h-3" />
                                    )}
                                  </button>
                                  <span className="w-10 text-center font-semibold text-primary">
                                    {loadingItem === item._id ? (
                                      <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                                    ) : (
                                      item.quantity
                                    )}
                                  </span>
                                  <button
                                    onClick={() => increaseQty(item)}
                                    disabled={
                                      loadingItem === item._id ||
                                      item.quantity >= item.product?.stock
                                    }
                                    className="p-2 text-muted hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                  onClick={() =>
                                    handleRemoveItem(item._id, item.name)
                                  }
                                  disabled={removingItemId === item._id}
                                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                >
                                  {removingItemId === item._id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </div>

                              {/* Stock Warning */}
                              {item.product?.stock &&
                                item.quantity >= item.product.stock && (
                                  <div className="flex items-center gap-2 mt-3 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                    <AlertCircle className="w-3 h-3 text-yellow-500" />
                                    <p className="text-xs text-yellow-600">
                                      Maximum stock reached
                                    </p>
                                  </div>
                                )}
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                ₹{item.total}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted">
                                  ₹{item.priceAtAdd} × {item.quantity}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-background-tertiary border border-theme rounded-xl text-secondary font-medium hover:bg-background-secondary transition-colors w-full"
              >
                <ShoppingCart className="w-5 h-5" />
                Continue Shopping
              </Link>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background-secondary border border-theme rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-primary mb-6">
                  Order Summary
                </h3>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">
                      Subtotal ({cart.items.length} items)
                    </span>
                    <span className="font-semibold text-primary">
                      ₹{cart.subtotal}
                    </span>
                  </div>

                  {cart.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Discount</span>
                      <span className="font-semibold text-[#22C55E]">
                        -₹{cart.discount}
                      </span>
                    </div>
                  )}

                  {/* ✅ CORRECTED: Shipping display - only show after method selected */}
                  {cart.shippingMethod && (
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Shipping</span>
                      <span
                        className={`font-semibold ${
                          cart.shipping === 0
                            ? "text-[#22C55E]"
                            : "text-primary"
                        }`}
                      >
                        {cart.shipping === 0 ? "FREE" : `₹${cart.shipping}`}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-theme">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        Total
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand">
                          ₹{cart.total}
                        </div>
                        <p className="text-xs text-muted mt-1">
                          Inclusive of all taxes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-brand" />
                    <h4 className="font-semibold text-primary text-sm">
                      Have a coupon?
                    </h4>
                  </div>

                  {cart.discount ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-[#22C55E]" />
                          <span className="text-sm font-medium text-[#22C55E]">
                            Coupon applied
                          </span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          disabled={couponLoading}
                          className="text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-3 py-2 bg-background border border-theme rounded-lg text-sm text-secondary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-brand/30 focus:border-brand transition-all"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                          className="px-3 py-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold text-sm rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                          {couponLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {couponError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* ✅ CORRECTED: Shipping Methods Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4 text-brand" />
                    <h4 className="font-semibold text-primary text-sm">
                      Shipping Method
                    </h4>
                    {!cart.shippingMethod && (
                      <span className="text-xs text-red-500 ml-2">
                        (Required)
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {shippingMethods.length === 0 ? (
                      <div className="text-center py-3">
                        <div className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-muted" />
                          <span className="text-sm text-muted">
                            Loading shipping options...
                          </span>
                        </div>
                      </div>
                    ) : (
                      shippingMethods.map((method) => (
                        <div key={method._id} className="relative">
                          {/* ✅ CORRECTED: Hidden radio input with proper accessibility */}
                          <input
                            type="radio"
                            id={`shipping-${method._id}`}
                            name="shipping"
                            checked={cart.shippingMethod === method._id}
                            onChange={() => handleApplyShipping(method._id)}
                            disabled={shippingLoading}
                            className="absolute opacity-0 w-0 h-0"
                          />
                          <label
                            htmlFor={`shipping-${method._id}`}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                              cart.shippingMethod === method._id
                                ? "border-brand bg-brand/5"
                                : "border-theme hover:border-brand/50"
                            } ${
                              shippingLoading
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  cart.shippingMethod === method._id
                                    ? "border-brand bg-brand"
                                    : "border-theme"
                                }`}
                              >
                                {cart.shippingMethod === method._id && (
                                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                )}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-primary">
                                  {method.name}
                                </span>
                                <p className="text-xs text-muted mt-0.5">
                                  {method.estimatedDays
                                    ? `${method.estimatedDays} days`
                                    : "Standard delivery"}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold text-primary">
                              ₹{method.price}
                            </span>
                          </label>
                          {shippingLoading &&
                            cart.shippingMethod === method._id && (
                              <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
                                <Loader2 className="w-4 h-4 animate-spin text-brand" />
                              </div>
                            )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Shipping not selected warning */}
                  {!cart.shippingMethod && shippingMethods.length > 0 && (
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <Info className="w-3 h-3 text-yellow-500" />
                      <p className="text-xs text-yellow-600">
                        Please select a shipping method to continue
                      </p>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={cart.shippingMethod ? { scale: 1.02 } : {}}
                  whileTap={cart.shippingMethod ? { scale: 0.98 } : {}}
                  onClick={() => router.push("/checkout")}
                  disabled={
                    !cart.shippingMethod || couponLoading || shippingLoading
                  }
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    !cart.shippingMethod
                      ? "bg-background-tertiary text-muted cursor-not-allowed"
                      : "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:opacity-90"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="text-xs text-center text-muted mt-3">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </motion.div>

              {/* Trust Badges */}
              <div className="bg-background-secondary border border-theme rounded-xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-background-tertiary rounded-lg">
                      <Shield className="w-3 h-3 text-[#38BDF8]" />
                    </div>
                    <span className="text-xs text-muted">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-background-tertiary rounded-lg">
                      <Package className="w-3 h-3 text-[#38BDF8]" />
                    </div>
                    <span className="text-xs text-muted">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
