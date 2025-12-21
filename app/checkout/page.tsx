"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import API from "@/services/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const refreshCartSafely = async () => {
  try {
    const res = await API.get("/cart");
    // 🔥 update global cart
    window.dispatchEvent(
      new CustomEvent("cart:update", { detail: res.data.cart })
    );
  } catch {}
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [checkoutStarted, setCheckoutStarted] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  /* ================= SAFE REDIRECT ================= */
  useEffect(() => {
    if (!cart) return;

    if (cart.items.length === 0) {
      router.replace("/cart");
    } else {
      setReady(true);
    }
  }, [cart, router]);

  if (!ready) return null;

  const isValid = () =>
    address.name &&
    address.phone &&
    address.address &&
    address.city &&
    address.pincode;

  const handlePay = async () => {
    try {
      if (!isValid()) {
        alert("Please fill address");
        return;
      }

      setCheckoutStarted(true);
      setLoading(true);

      const orderRes = await API.post("/orders", {
        address: {
          street: address.address,
          city: address.city,
          zipCode: address.pincode,
          country: "India",
        },
      });

      const order = orderRes.data.order;

      const paymentRes = await API.post("/payments/create", {
        orderId: order._id,
      });

      const razorpayOrder = paymentRes.data.razorpayOrder;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,

        handler: async (response: any) => {
          await API.post("/payments/verify", response);
          router.replace(`/order-success/${order._id}`);
        },

        modal: {
          ondismiss: async () => {
            // 🔥 CRITICAL FIX
            await API.get("/cart");
            router.replace("/cart");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      // 🔥 USER CANCELS PAYMENT
      rzp.on("modal.closed", async () => {
        await refreshCartSafely();
      });

      // 🔥 PAYMENT FAILED
      rzp.on("payment.failed", async () => {
        await refreshCartSafely();
      });

      rzp.open();
    } catch (err: any) {
      await API.get("/cart");
      router.replace("/cart");
      alert(err.response?.data?.error || "Checkout failed");
    } finally {
      setLoading(false);
      setCheckoutStarted(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

      {["name", "phone", "address", "city", "pincode"].map((k) => (
        <input
          key={k}
          placeholder={k.toUpperCase()}
          value={(address as any)[k]}
          onChange={(e) => setAddress({ ...address, [k]: e.target.value })}
          className="w-full border p-2 mb-3"
        />
      ))}

      <button
        disabled={loading}
        onClick={handlePay}
        className="w-full bg-[#1f3655] text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ₹${cart.total}`}
      </button>
    </div>
  );
}
