// Checkout-frontend
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  MapPin,
  Check,
  Loader2,
  Lock,
  X,
  Plus,
  Wallet,
  ArrowLeft,
  Package,
  ShieldCheck,
  Truck,
  ChevronRight,
  Home,
  Briefcase,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import API from "@/services/api";
import { applyShipping } from "@/services/cart";
import { getShippingMethods } from "@/services/shipping";

// 1. ADD INTERFACE: For strict UI building later
interface Address {
  _id: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  type?: "home" | "work";
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, setCart, showToast, refreshCart } = useCart();

  const [addresses, setAddresses] = useState<Address[]>([]); // Use interface
  const [phone, setPhone] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [step, setStep] = useState<"address" | "review">("address");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay"
  );
  const [loading, setLoading] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);

  const isSuccessRedirecting = useRef(false);
  const placingOrderRef = useRef(false);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "India",
    type: "home" as "home" | "work",
  });

  // CHANGE 1: Logic Block #1 (Script Injection with Cleanup)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.id = "razorpay-script";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("razorpay-script");
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  // CHANGE 2: Logic Block #2 (Keep as is, it's correct)
  useEffect(() => {
    const initUser = async () => {
      try {
        const res = await API.get("/users/me");
        const userData = res.data.user || res.data;
        setAddresses(userData.addresses || []);
        setPhone((prev) => prev || userData.phone || "");
        const def =
          userData.addresses?.find((a: any) => a.isDefault) ||
          userData.addresses?.[0];
        if (def) setSelectedAddressId(def._id);
      } catch (err) {
        console.error("Profile load failed");
      }
    };
    initUser();
  }, []);

  // CHANGE 3: Logic Block #3 (Watch Cart ID instead of length)
  useEffect(() => {
    if ((!cart || cart.items.length === 0) && !isSuccessRedirecting.current) {
      router.replace("/cart");
      return;
    }

    const loadShipping = async () => {
      try {
        const data = await getShippingMethods();
        setShippingMethods(data);
      } catch {
        showToast("Shipping options unavailable", "error");
      }
    };
    loadShipping();
  }, [cart?._id, router]); // WATCHING cart?._id IS MORE ACCURATE

  const selectedAddress = useMemo(
    () => addresses.find((addr) => addr._id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  // CHANGE 4: Add Phone Formatter logic
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
  };

  const handleSelectShipping = async (methodId: string) => {
    if (shippingLoading) return;
    setShippingLoading(true);
    try {
      const updatedCart = await applyShipping(methodId);
      setCart(updatedCart);
      showToast("Shipping method updated", "success");
    } catch {
      showToast("Error applying shipping", "error");
    } finally {
      setShippingLoading(false);
    }
  };

  const handleFinalOrder = async () => {
    if (placingOrderRef.current || !selectedAddress) return;

    if (!cart.shippingMethod)
      return showToast("Please pick a delivery speed", "error");

    if (!/^[6-9]\d{9}$/.test(phone))
      return showToast("Invalid 10-digit mobile number", "error");

    placingOrderRef.current = true;
    setLoading(true);

    try {
      const orderRes = await API.post("/orders", {
        address: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          zipCode: selectedAddress.zipCode,
          country: selectedAddress.country,
        },
        phone,
        paymentMethod,
      });

      const order = orderRes.data.order;

      // ✅ COD FLOW
      if (paymentMethod === "cod") {
        await refreshCart();
        router.replace(`/order-success/${order._id}`);
        return;
      }

      // ✅ ONLINE PAYMENT FLOW
      const paymentRes = await API.post("/payments/create", {
        orderId: order._id,
      });

      const { razorpayOrder } = paymentRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "Shrix Store",
        prefill: { contact: phone },
        theme: { color: "#f59e0b" },
        handler: async (response: any) => {
          if (isSuccessRedirecting.current) return;

          try {
            isSuccessRedirecting.current = true;
            await API.post("/payments/verify", response);
            await refreshCart();
            router.replace(`/order-success/${order._id}`);
          } catch {
            isSuccessRedirecting.current = false;
            showToast("Payment verification failed", "error");
            setLoading(false);
            placingOrderRef.current = false;
          }
        },
        modal: {
          ondismiss: async () => {
            placingOrderRef.current = false;
            setLoading(false);
            showToast("Payment Cancelled", "info");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setLoading(false);
      placingOrderRef.current = false;
      showToast(err.response?.data?.error || "Transaction failed", "error");
    }
  };

  if (!cart) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background font-sans"
    >
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background)] opacity-50 pointer-events-none" />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background-secondary border-b border-theme backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center gap-3 text-secondary hover:text-primary transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-[var(--color-primary)]/30 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Back to Cart</p>
                <p className="text-xs text-muted">Your items are waiting</p>
              </div>
            </motion.button>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-accent-green)] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-primary">Checkout</h1>
              </div>
              <p className="text-sm text-muted mt-1">Secure & encrypted</p>
            </div>

            {/* Step Indicator */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "address"
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-background-tertiary text-muted"
                  }`}
                >
                  <span className="text-sm font-bold">1</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    step === "address" ? "text-primary" : "text-muted"
                  }`}
                >
                  Address
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "review"
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-background-tertiary text-muted"
                  }`}
                >
                  <span className="text-sm font-bold">2</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    step === "review" ? "text-primary" : "text-muted"
                  }`}
                >
                  Payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Checkout Steps */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {step === "address" ? (
                <motion.div
                  key="address-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Delivery Address Card */}
                  <div className="bg-background-secondary border border-theme rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-primary">
                            Delivery Address
                          </h2>
                          <p className="text-sm text-secondary">
                            Where should we deliver your order?
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        onClick={() => setAddingNewAddress(true)}
                        className="px-5 py-3 rounded-xl bg-background-tertiary border border-theme text-secondary hover:text-primary hover:border-[var(--color-primary)]/30 transition-colors flex items-center gap-3"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="font-medium">Add New</span>
                      </motion.button>
                    </div>

                    {/* Address Selection */}
                    <div className="space-y-4 mb-8">
                      <p className="text-sm font-medium text-primary mb-4">
                        Select an address
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <motion.button
                            key={addr._id}
                            whileHover={{ scale: 1.02 }}
                            disabled={loading}
                            onClick={() => setSelectedAddressId(addr._id)}
                            className={`text-left p-5 rounded-2xl border-2 transition-all backdrop-blur-sm ${
                              selectedAddressId === addr._id
                                ? "border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)]/10 to-[#F97316]/5 shadow-lg shadow-[var(--color-primary)]/10"
                                : "border-theme bg-background-tertiary hover:border-[var(--color-primary)]/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {addr.type === "work" ? (
                                  <Briefcase className="w-5 h-5 text-[var(--color-accent-blue)]" />
                                ) : (
                                  <Home className="w-5 h-5 text-[var(--color-primary)]" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-primary truncate">
                                  {addr.street}
                                </p>
                                <p className="text-sm text-secondary mt-1">
                                  {addr.city}, {addr.zipCode}
                                </p>
                                <p className="text-xs text-muted mt-2">
                                  {addr.country}
                                </p>
                              </div>
                              {selectedAddressId === addr._id && (
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-primary">
                          Phone Number
                        </label>
                        <span className="text-xs text-muted">
                          For delivery updates
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          disabled={loading}
                          type="tel"
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="Enter your 10-digit mobile number"
                          className="w-full bg-background-tertiary border border-theme rounded-2xl px-5 py-4 text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/30 transition-all"
                        />
                        {phone.length === 10 && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Check className="w-5 h-5 text-[var(--color-accent-green)]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted">
                        We'll send order updates to this number
                      </p>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      disabled={
                        !selectedAddressId || phone.length < 10 || loading
                      }
                      onClick={() => setStep("review")}
                      className="w-full py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      Continue to Payment
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="review-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Shipping Selection for Buy Now Users */}
                  {!cart.shippingMethod && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-orange-50/80 to-orange-100/50 border-2 border-orange-200 rounded-3xl p-6 shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-orange-800">
                            Select Shipping Speed
                          </h3>
                          <p className="text-sm text-orange-700">
                            Choose your preferred delivery method
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {shippingMethods.map((method) => {
                          const isSelected =
                            cart.shippingMethod === method._id ||
                            cart.shippingMethod?._id === method._id;

                          return (
                            <motion.button
                              key={method._id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={shippingLoading || loading}
                              onClick={() => handleSelectShipping(method._id)}
                              className={`w-full flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                                isSelected
                                  ? "border-orange-500 bg-white shadow-md"
                                  : "border-orange-100 bg-white hover:border-orange-300"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? "border-orange-500"
                                      : "border-orange-200"
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                                  )}
                                </div>
                                <div className="text-left">
                                  <p className="text-sm font-bold text-orange-900">
                                    {method.name}
                                  </p>
                                  <p className="text-xs text-orange-700">
                                    {method.estimatedDays || "3-5"} Days
                                    Delivery
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-orange-900">
                                {method.price === 0
                                  ? "FREE"
                                  : `₹${method.price}`}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {shippingLoading && (
                        <div className="mt-4 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                          <span className="ml-2 text-sm text-orange-700">
                            Updating shipping...
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Shipping Summary for Cart Users */}
                  {cart.shippingMethod && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent border border-theme rounded-3xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-primary">
                              Delivery Method Selected
                            </h3>
                            <p className="text-sm text-secondary">
                              {cart.shippingMethod.name || "Standard Delivery"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-lg">
                            {cart.shipping === 0 ? "FREE" : `₹${cart.shipping}`}
                          </p>
                          <p className="text-xs text-muted">
                            {cart.shippingMethod.estimatedDays || "3-5"} days
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Payment Method Card */}
                  <div className="bg-background-secondary border border-theme rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-primary">
                          Payment Method
                        </h2>
                        <p className="text-sm text-secondary">
                          Choose how you'd like to pay
                        </p>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        disabled={loading}
                        onClick={() => setPaymentMethod("razorpay")}
                        className={`p-6 rounded-2xl border-2 transition-all text-left ${
                          paymentMethod === "razorpay"
                            ? "border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)]/10 to-[#F97316]/5 shadow-lg shadow-[var(--color-primary)]/10"
                            : "border-theme bg-background-tertiary hover:border-[var(--color-primary)]/40"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">
                              Credit/Debit Card
                            </p>
                            <p className="text-sm text-secondary mt-1">
                              Pay securely online
                            </p>
                          </div>
                          {paymentMethod === "razorpay" && (
                            <div className="ml-auto w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        disabled={cart.total > 5000 || loading}
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-6 rounded-2xl border-2 transition-all text-left ${
                          paymentMethod === "cod"
                            ? "border-[var(--color-accent-green)] bg-gradient-to-r from-[var(--color-accent-green)]/10 to-[#22C55E]/5"
                            : "border-theme bg-background-tertiary hover:border-[var(--color-accent-green)]/40"
                        } ${
                          cart.total > 5000
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-green)] to-[#22C55E] flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">
                              Cash on Delivery
                            </p>
                            <p className="text-sm text-secondary mt-1">
                              Pay when you receive
                            </p>
                            {cart.total > 5000 && (
                              <p className="text-xs text-red-400 mt-2">
                                Available only for orders below ₹5,000
                              </p>
                            )}
                          </div>
                          {paymentMethod === "cod" && (
                            <div className="ml-auto w-6 h-6 rounded-full bg-[var(--color-accent-green)] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    </div>

                    {/* Security Note */}
                    <div className="p-4 bg-background-tertiary border border-theme rounded-2xl">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-[var(--color-accent-blue)]" />
                        <div>
                          <p className="text-sm font-medium text-primary">
                            100% Secure Payment
                          </p>
                          <p className="text-xs text-muted">
                            Your payment information is encrypted and secure
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                      onClick={() => setStep("address")}
                      className="flex-1 py-4 rounded-2xl bg-background-tertiary border border-theme text-secondary hover:text-primary hover:border-[var(--color-primary)]/30 transition-colors font-medium flex items-center justify-center gap-3"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Address
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFinalOrder}
                      disabled={loading || !cart.shippingMethod}
                      className="flex-1 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-6 h-6" />
                          Place Order
                          <Truck className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
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
                <div className="p-6 border-b border-theme">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      Order Summary
                    </h2>
                  </div>

                  {/* Selected Address Preview */}
                  {selectedAddress && (
                    <div className="mb-6 p-4 bg-background-tertiary rounded-xl">
                      <p className="text-sm font-medium text-primary mb-2">
                        Deliver to:
                      </p>
                      <p className="text-sm text-secondary">
                        {selectedAddress.street}
                      </p>
                      <p className="text-xs text-muted">
                        {selectedAddress.city}, {selectedAddress.zipCode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="p-6 border-b border-theme">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Subtotal</span>
                      <span className="font-bold text-primary">
                        ₹{cart.subtotal}
                      </span>
                    </div>

                    {cart.discount > 0 && (
                      <div className="flex justify-between items-center py-2 px-3 bg-[var(--color-accent-green)]/10 border border-[var(--color-accent-green)]/20 rounded-lg">
                        <span className="text-sm font-bold text-[var(--color-accent-green)]">
                          Discount Applied
                        </span>
                        <span className="font-bold text-[var(--color-accent-green)]">
                          -₹{cart.discount}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Shipping</span>
                      <span className="font-bold text-primary">
                        {cart.shipping === 0 ? "FREE" : `₹${cart.shipping}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-primary">
                      Total Amount
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] bg-clip-text text-transparent">
                        ₹{cart.total}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Including all taxes
                      </p>
                    </div>
                  </div>

                  {/* Shipping Status Warning */}
                  {!cart.shippingMethod && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-orange-600" />
                        <p className="text-xs text-orange-800 font-medium">
                          Select shipping method to proceed
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <Truck className="w-4 h-4" />
                      <span>Free shipping over ₹999</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <ShieldCheck className="w-4 h-4" />
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Add New Address Modal */}
      <AnimatePresence>
        {addingNewAddress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-background-secondary border border-theme rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-theme">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">
                      Add New Address
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAddingNewAddress(false)}
                    className="p-2 rounded-lg bg-background-tertiary text-muted hover:text-primary hover:bg-background-tertiary border border-theme"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-sm text-secondary mt-2">
                  Add a new delivery address
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Address Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-primary">
                    Address Type
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "home", label: "Home", icon: Home },
                      { value: "work", label: "Work", icon: Briefcase },
                    ].map((type) => (
                      <motion.button
                        key={type.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() =>
                          setNewAddress({
                            ...newAddress,
                            type: type.value as "home" | "work",
                          })
                        }
                        className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${
                          newAddress.type === type.value
                            ? "border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)]/10 to-[#F97316]/5"
                            : "border-theme bg-background-tertiary hover:border-[var(--color-primary)]/40"
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {type.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    Street Address
                  </label>
                  <input
                    disabled={loading}
                    className="w-full bg-background-tertiary border border-theme rounded-2xl px-4 py-3 text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/30 transition-all"
                    placeholder="House number, street, area"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  />
                </div>

                {/* City and Zip Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">
                      City
                    </label>
                    <input
                      disabled={loading}
                      className="w-full bg-background-tertiary border border-theme rounded-2xl px-4 py-3 text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/30 transition-all"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">
                      PIN Code
                    </label>
                    <input
                      disabled={loading}
                      className="w-full bg-background-tertiary border border-theme rounded-2xl px-4 py-3 text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/30 transition-all"
                      placeholder="6-digit PIN"
                      maxLength={6}
                      value={newAddress.zipCode}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          zipCode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    Country
                  </label>
                  <div className="relative">
                    <input
                      disabled
                      className="w-full bg-background-tertiary border border-theme rounded-2xl px-4 py-3 text-primary"
                      value={newAddress.country}
                    />
                    <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-accent-green)]" />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-theme bg-background-tertiary">
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAddingNewAddress(false)}
                    className="flex-1 py-3 rounded-xl bg-background-secondary border border-theme text-secondary hover:text-primary transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    onClick={async () => {
                      if (newAddress.street.length < 5)
                        return showToast("Street address too short", "error");
                      setLoading(true);
                      try {
                        const res = await API.post(
                          "/users/address",
                          newAddress
                        );
                        const updated =
                          res.data.addresses || res.data.user?.addresses;
                        setAddresses(updated);
                        setSelectedAddressId(updated[updated.length - 1]._id);
                        setAddingNewAddress(false);
                        showToast("Address Saved Successfully", "success");
                      } catch (e) {
                        showToast("Save failed", "error");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Save & Use"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
