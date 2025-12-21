"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const { cart, setCart } = useCart();

  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);
  useEffect(() => {
    getShippingMethods()
      .then(setShippingMethods)
      .catch(() => {});
  }, []);
  /* ================= STATES ================= */

  if (!cart) {
    return <div className="p-10 text-center">Loading cart...</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  /* ================= QUANTITY HANDLERS ================= */

  const increaseQty = async (item: any) => {
    if (item.quantity >= item.product?.stock) return;

    try {
      setLoadingItem(item._id);
      const updated = await updateCartItem(item._id, item.quantity + 1);
      setCart(updated);
    } catch {
      // 🔥 CART WAS STALE — REFRESH
      const fresh = await API.get("/cart");
      setCart(fresh.data.cart);
    } finally {
      setLoadingItem(null);
    }
  };

  const decreaseQty = async (item: any) => {
    try {
      setLoadingItem(item._id);

      const updated =
        item.quantity === 1
          ? await removeCartItem(item._id)
          : await updateCartItem(item._id, item.quantity - 1);

      setCart(updated);
    } catch {
      // 🔥 RECOVER CART
      const fresh = await API.get("/cart");
      setCart(fresh.data.cart);
    } finally {
      setLoadingItem(null);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear the cart?")) return;
    const updated = await clearCart();
    setCart(updated);
  };

  /* ================= COUPON ================= */

  const handleApplyCoupon = async () => {
    try {
      setCouponError("");
      setCouponLoading(true);

      if (!couponCode.trim()) {
        setCouponError("Please enter a coupon code");
        return;
      }

      // Backend expects coupon CODE (e.g. NEW10)
      const updatedCart = await applyCoupon(couponCode.trim());
      setCart(updatedCart);
      setCouponCode("");
    } catch (err: any) {
      setCouponError(err?.response?.data?.error || "Invalid or expired coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setCouponLoading(true);
      setCouponError("");

      const updatedCart = await removeCoupon();
      setCart(updatedCart);
    } catch (err: any) {
      setCouponError(err?.response?.data?.error || "Failed to remove coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleApplyShipping = async (methodId: string) => {
    try {
      setShippingLoading(true);
      const updatedCart = await applyShipping(methodId);
      setCart(updatedCart);
    } finally {
      setShippingLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* ================= LEFT - ITEMS ================= */}
      <div className="md:col-span-2 space-y-6">
        {cart.items.map((item: any) => (
          <div key={item._id} className="flex gap-6 border rounded-lg p-4">
            <img
              src={item.product?.images?.[0]?.url || "/placeholder.png"}
              className="w-28 h-28 object-cover rounded"
              alt={item.name}
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.priceAtAdd}</p>

              <div className="flex items-center gap-4 mt-4">
                <button
                  disabled={loadingItem === item._id || item.quantity === 1}
                  onClick={() => decreaseQty(item)}
                  className="px-3 py-1 border disabled:opacity-50"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  disabled={
                    loadingItem === item._id ||
                    item.quantity >= item.product?.stock
                  }
                  onClick={() => increaseQty(item)}
                  className="px-3 py-1 border disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {item.quantity >= item.product?.stock && (
                <p className="text-xs text-red-500 mt-2">Max stock reached</p>
              )}
            </div>

            <div className="font-semibold">₹{item.total}</div>
          </div>
        ))}

        <button
          onClick={handleClearCart}
          className="text-sm text-red-600 underline mt-4"
        >
          Clear Cart
        </button>
      </div>

      {/* ================= RIGHT - SUMMARY ================= */}
      <div className="border rounded-lg p-6 h-fit">
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{cart.subtotal}</span>
        </div>

        {/* Coupon */}
        <div className="mt-6">
          <label className="text-sm font-medium">Have a coupon?</label>

          {cart.discount ? (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-green-600">Coupon applied</span>

              <button
                onClick={handleRemoveCoupon}
                disabled={couponLoading}
                className="text-sm text-red-600 underline disabled:opacity-50"
              >
                {couponLoading ? "Removing..." : "Remove"}
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mt-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code (e.g. NEW10)"
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />

                <button
                  onClick={handleApplyCoupon}
                  disabled={couponLoading}
                  className="bg-gray-800 text-white px-4 rounded text-sm disabled:opacity-50"
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </div>

              {couponError && (
                <p className="text-xs text-red-500 mt-2">{couponError}</p>
              )}
            </>
          )}
        </div>

        <div className="flex justify-between mb-6">
          <span>Discount</span>
          <span className={cart.discount > 0 ? "text-green-600" : ""}>
            -₹{cart.discount}
          </span>
        </div>

        {/* Shipping */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Shipping Method</h4>

          <div className="space-y-2">
            {shippingMethods.map((method) => (
              <label
                key={method._id}
                className="flex items-center justify-between border rounded px-3 py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={cart.shippingMethod === method._id}
                    onChange={() => handleApplyShipping(method._id)}
                    disabled={shippingLoading}
                  />
                  <span className="text-sm">{method.name}</span>
                </div>

                <span className="text-sm font-medium">₹{method.price}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-4">
          <span>Total</span>
          <span>₹{cart.total}</span>
        </div>

        <button
          disabled={!cart.shippingMethod || couponLoading || shippingLoading}
          className="w-full mt-6 bg-[#1f3655] text-white py-3 rounded-md disabled:opacity-50"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
