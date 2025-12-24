"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  MapPin,
  Truck,
  Shield,
  Package,
  Check,
  AlertCircle,
  Loader2,
  Home,
  Building,
  Lock,
  ChevronRight,
  ArrowLeft,
  Wallet,
  Sparkles,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import API from "@/services/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Address = {
  _id: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  type?: "home" | "work";
  isDefault?: boolean;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, showToast, refreshCart } = useCart();

  // ✅ FIX 3: Always initialize as array
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [phone, setPhone] = useState("");

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [addingNewAddress, setAddingNewAddress] = useState(false);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "India",
    type: "home" as "home" | "work",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [step, setStep] = useState<"address" | "review" | "payment">("address");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay"
  );

  /* ================= ✅ COMPUTED VALUES ================= */

  // ✅ FIX 2: Correct item count (sum of quantities)
  const totalItems = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );
  }, [cart]);

  // ✅ FIX 2: Safe address lookup with validation
  const selectedAddress = useMemo(() => {
    if (!Array.isArray(addresses) || !selectedAddressId) return null;
    return addresses.find((addr) => addr?._id === selectedAddressId) || null;
  }, [addresses, selectedAddressId]);

  /* ================= SAFE REDIRECT ================= */
  useEffect(() => {
    if (!cart) return;

    if (cart.items.length === 0) {
      router.replace("/cart");
    } else {
      setReady(true);
    }
  }, [cart, router]);

  /* ================= LOAD USER ADDRESSES ================= */
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoadingAddresses(true);
        const res = await API.get("/users/me");
        const userAddresses = res.data.addresses || [];
        setAddresses(userAddresses);
        setPhone(res.data.phone || "");

        // Auto-select default address
        const defaultAddress = userAddresses.find(
          (addr: Address) => addr.isDefault
        );
        if (defaultAddress?._id) {
          setSelectedAddressId(defaultAddress._id);
        } else if (userAddresses.length > 0 && userAddresses[0]?._id) {
          setSelectedAddressId(userAddresses[0]._id);
        }
      } catch (err) {
        console.error("Failed to load addresses");
        showToast("Failed to load addresses", "error");
      } finally {
        setLoadingAddresses(false);
      }
    };

    loadUser();
  }, [showToast]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-3 border-brand/20 border-t-brand rounded-full animate-spin"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-3">
                  Preparing Checkout
                </h2>
                <p className="text-muted">Loading your order details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= VALIDATION ================= */
  const isNewAddressValid = () =>
    newAddress.street &&
    newAddress.city &&
    newAddress.zipCode &&
    newAddress.country;

  const canProceedToReview = () => {
    if (selectedAddressId) return true;
    if (addingNewAddress && isNewAddressValid()) return true;
    return false;
  };

  // ✅ FIX 3: Payment requires shipping method
  const canProceedToPayment = () => {
    return step === "review" && (cart.shippingMethod || cart.shipping === 0);
  };

  /* ================= ADDRESS MANAGEMENT ================= */
  const handleSaveNewAddress = async () => {
    if (!isNewAddressValid()) {
      showToast("Please fill all address fields", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/users/address", newAddress);

      // ✅ FIX 4: Normalize backend response
      const user = res.data.user ?? res.data;

      const savedAddress =
        Array.isArray(user.addresses) && user.addresses.length > 0
          ? user.addresses[user.addresses.length - 1]
          : null;

      if (!savedAddress?._id) {
        showToast("Address saved, but could not sync locally", "error");
        return;
      }

      // ✅ FIX 1 & OPTIONAL: Safe update with auto-select
      setAddresses((prev) => {
        const updated = [...prev, savedAddress];
        // Auto-select the new address
        setSelectedAddressId(savedAddress._id);
        return updated;
      });

      setAddingNewAddress(false);
      setNewAddress({
        street: "",
        city: "",
        zipCode: "",
        country: "India",
        type: "home",
        isDefault: false,
      });
      showToast("Address saved successfully", "success");
    } catch (err) {
      console.error("Failed to save address:", err);
      showToast("Failed to save address", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAYMENT ================= */
  const handlePayment = async () => {
    // ✅ FIX 4: Prevent double submission
    if (loading) return;

    try {
      setLoading(true);

      let addressToSend;

      // CASE 1: Selected existing address
      if (selectedAddressId) {
        // ✅ FIX 2: Use cached selectedAddress safely
        if (!selectedAddress) {
          showToast("Invalid address selected", "error");
          setLoading(false);
          return;
        }

        if (
          !selectedAddress.street ||
          !selectedAddress.city ||
          !selectedAddress.zipCode ||
          !selectedAddress.country
        ) {
          showToast("Selected address is incomplete", "error");
          setLoading(false);
          return;
        }

        addressToSend = {
          street: selectedAddress.street,
          city: selectedAddress.city,
          zipCode: selectedAddress.zipCode,
          country: selectedAddress.country,
        };
      }

      // CASE 2: New address (should be saved by now, but handle just in case)
      else {
        if (!isNewAddressValid()) {
          showToast("Please fill complete address", "error");
          setLoading(false);
          return;
        }

        addressToSend = {
          street: newAddress.street,
          city: newAddress.city,
          zipCode: newAddress.zipCode,
          country: newAddress.country,
        };
      }

      if (!addressToSend) {
        showToast("Address is required", "error");
        setLoading(false);
        return;
      }

      if (!phone || phone.length < 10) {
        showToast("Please enter a valid mobile number", "error");
        setLoading(false);
        return;
      }

      // ================= CREATE ORDER =================
      const orderRes = await API.post("/orders", {
        address: addressToSend,
        phone,
        paymentMethod: paymentMethod === "cod" ? "cod" : "online",
      });

      const order = orderRes.data.order;

      // ================= PAYMENT METHODS =================
      if (paymentMethod === "cod") {
        // ✅ FIX 7: COD limit should be enforced by backend too
        if (cart.total > 5000) {
          showToast(
            "Cash on Delivery not available for orders above ₹5,000",
            "error"
          );
          setLoading(false);
          return;
        }

        showToast("Order placed successfully! Pay on delivery.", "success");
        setTimeout(() => {
          router.replace(`/order-success/${order._id}`);
        }, 1500);
        await refreshCart();

        return;
      }

      // ================= RAZORPAY =================
      const paymentRes = await API.post("/payments/create", {
        orderId: order._id,
      });

      const razorpayOrder = paymentRes.data.razorpayOrder;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "Your Store",
        description: `Order #${order.orderNumber}`,
        image: "/logo.png",
        theme: {
          color: "#F59E0B",
        },

        handler: async (response: any) => {
          try {
            await API.post("/payments/verify", response);
            showToast("Payment successful!", "success");
            router.replace(`/order-success/${order._id}`);
            await refreshCart();
          } catch (err) {
            console.error("Payment verification failed:", err);
            showToast("Payment verification failed", "error");
            // ✅ FIX 6: Only refresh cart on payment failure
            router.replace("/cart");
            await refreshCart();
          }
        },

        modal: {
          ondismiss: async () => {
            showToast("Payment cancelled", "info");
            // ✅ FIX 6: Only refresh cart on payment cancel
            await refreshCart();

            router.replace("/cart");
          },
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: phone,
        },

        notes: {
          order_id: order._id,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Checkout failed:", err);
      // ✅ FIX 6: Only refresh cart on specific failures
      await refreshCart();

      showToast(err?.response?.data?.error || "Checkout failed", "error");
      router.replace("/cart");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER STEP CONTENT ================= */
  const renderAddressStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Saved Addresses */}
      {addresses.length > 0 && !loadingAddresses && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-brand" />
            <h3 className="text-lg font-bold text-primary">Saved Addresses</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <motion.label
                key={addr._id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAddressId === addr._id
                    ? "border-brand bg-brand/5"
                    : "border-theme hover:border-brand/50"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="sr-only"
                  checked={selectedAddressId === addr._id}
                  onChange={() => {
                    // ✅ Safe selection
                    if (addr?._id) {
                      setSelectedAddressId(addr._id);
                    }
                  }}
                />
                <div className="bg-background-tertiary border border-theme rounded-xl p-6 space-y-2">
                  <label className="text-sm font-medium text-primary">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-3 bg-background border border-theme rounded-lg text-secondary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      addr.type === "home"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-purple-500/10 text-purple-500"
                    }`}
                  >
                    {addr.type === "home" ? (
                      <Home className="w-4 h-4" />
                    ) : (
                      <Building className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-primary">
                        {addr.type === "home" ? "Home" : "Work"}
                        {addr.isDefault && (
                          <span className="ml-2 px-2 py-0.5 bg-brand/10 text-brand text-xs font-medium rounded">
                            Default
                          </span>
                        )}
                      </span>
                      {selectedAddressId === addr._id && (
                        <Check className="w-4 h-4 text-brand" />
                      )}
                    </div>
                    <p className="text-sm text-secondary">
                      {addr.street}, {addr.city}, {addr.zipCode}, {addr.country}
                    </p>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loadingAddresses && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-brand/20 border-t-brand rounded-full animate-spin"></div>
            <span className="text-secondary">Loading your addresses...</span>
          </div>
        </div>
      )}

      {/* New Address Toggle */}
      <div className="pt-4 border-t border-theme">
        <button
          onClick={() => setAddingNewAddress(!addingNewAddress)}
          className="flex items-center gap-2 text-brand hover:opacity-80 transition-opacity font-medium"
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              addingNewAddress ? "rotate-90" : ""
            }`}
          />
          {addingNewAddress ? "Cancel adding new address" : "Add new address"}
        </button>
      </div>

      {/* New Address Form */}
      <AnimatePresence>
        {addingNewAddress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-background-tertiary border border-theme rounded-xl p-6 space-y-4">
              <h4 className="font-bold text-primary text-lg">
                Add New Address
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Street */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                    placeholder="Enter street address"
                    className="w-full px-4 py-3 bg-background border border-theme rounded-lg text-secondary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    City
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    placeholder="Enter city"
                    className="w-full px-4 py-3 bg-background border border-theme rounded-lg text-secondary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  />
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={newAddress.zipCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, zipCode: e.target.value })
                    }
                    placeholder="Enter ZIP code"
                    className="w-full px-4 py-3 bg-background border border-theme rounded-lg text-secondary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    Country
                  </label>
                  <select
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-background border border-theme rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                {/* Address Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">
                    Address Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setNewAddress({ ...newAddress, type: "home" })
                      }
                      className={`flex-1 px-4 py-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                        newAddress.type === "home"
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-theme text-secondary hover:border-brand/50"
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      Home
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewAddress({ ...newAddress, type: "work" })
                      }
                      className={`flex-1 px-4 py-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                        newAddress.type === "work"
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-theme text-secondary hover:border-brand/50"
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      Work
                    </button>
                  </div>
                </div>

                {/* Set as Default */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-brand rounded focus:ring-brand/30"
                    />
                    <span className="text-sm text-primary">
                      Set as default address
                    </span>
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleSaveNewAddress}
                  disabled={!isNewAddressValid() || loading}
                  className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Address"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-bold text-primary mb-4">Order Summary</h3>
        <div className="bg-background-secondary border border-theme rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            {/* ✅ FIX 2: Correct item count */}
            <span className="text-secondary">
              Subtotal ({totalItems} items)
            </span>
            <span className="font-semibold text-primary">₹{cart.subtotal}</span>
          </div>

          {cart.discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-secondary">Discount</span>
              <span className="font-semibold text-[#22C55E]">
                -₹{cart.discount}
              </span>
            </div>
          )}

          {/* ✅ FIX 1: Shipping display only when method selected */}
          {cart.shippingMethod ? (
            <div className="flex justify-between items-center">
              <span className="text-secondary">Shipping</span>
              <span
                className={`font-semibold ${
                  cart.shipping === 0 ? "text-[#22C55E]" : "text-primary"
                }`}
              >
                {cart.shipping === 0 ? "FREE" : `₹${cart.shipping}`}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-secondary">Shipping</span>
              <span className="text-sm text-muted">Select shipping method</span>
            </div>
          )}

          <div className="pt-4 border-t border-theme">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary">
                Total Amount
              </span>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand">
                  ₹{cart.total}
                </div>
                <p className="text-sm text-muted mt-1">
                  Inclusive of all taxes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Address */}
      <div>
        <h3 className="text-lg font-bold text-primary mb-4">
          Delivery Address
        </h3>
        <div className="bg-background-secondary border border-theme rounded-xl p-6">
          {selectedAddress ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-brand" />
                <span className="font-medium text-primary">
                  {selectedAddress.type === "home" ? "Home" : "Work"}
                </span>
              </div>
              <p className="text-secondary">
                {selectedAddress.street}
                <br />
                {selectedAddress.city}, {selectedAddress.zipCode}
                <br />
                {selectedAddress.country}
              </p>
              <button
                onClick={() => setStep("address")}
                className="mt-4 text-sm text-brand hover:opacity-80 transition-opacity"
              >
                Change Address
              </button>
            </div>
          ) : (
            <p className="text-muted">No address selected</p>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-bold text-primary mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
              paymentMethod === "razorpay"
                ? "border-brand bg-brand/5"
                : "border-theme hover:border-brand/50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              className="sr-only"
              checked={paymentMethod === "razorpay"}
              onChange={() => setPaymentMethod("razorpay")}
            />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-brand" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-primary">
                    Credit/Debit Card
                  </span>
                  {paymentMethod === "razorpay" && (
                    <Check className="w-4 h-4 text-brand" />
                  )}
                </div>
                <p className="text-xs text-muted">Pay securely with Razorpay</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Shield className="w-3 h-3 text-[#38BDF8]" />
              <span className="text-xs text-muted">100% Secure</span>
            </div>
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
              paymentMethod === "cod"
                ? "border-brand bg-brand/5"
                : "border-theme hover:border-brand/50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              className="sr-only"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#22C55E]/10 to-[#16A34A]/10 rounded-lg">
                <Wallet className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-primary">
                    Cash on Delivery
                  </span>
                  {paymentMethod === "cod" && (
                    <Check className="w-4 h-4 text-brand" />
                  )}
                </div>
                <p className="text-xs text-muted">
                  Pay when you receive the order
                </p>
              </div>
            </div>
            {cart.total > 5000 && paymentMethod === "cod" && (
              <div className="flex items-center gap-1 mt-3">
                <AlertCircle className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-yellow-600">
                  Not available for orders above ₹5,000
                </span>
              </div>
            )}
          </motion.label>
        </div>
      </div>
    </motion.div>
  );

  /* ================= MAIN RENDER ================= */
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-theme bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Checkout
              </h1>
              <p className="text-muted">Complete your purchase</p>
            </div>
            <button
              onClick={() => router.push("/cart")}
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT COLUMN: CHECKOUT STEPS ================= */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                {["address", "review", "payment"].map((s, index) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === s
                          ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white"
                          : index <
                            ["address", "review", "payment"].indexOf(step)
                          ? "bg-[#22C55E] text-white"
                          : "bg-background-tertiary text-muted"
                      }`}
                    >
                      {index <
                      ["address", "review", "payment"].indexOf(step) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        step === s ? "text-primary" : "text-muted"
                      }`}
                    >
                      {s === "address"
                        ? "Address"
                        : s === "review"
                        ? "Review"
                        : "Payment"}
                    </span>
                    {index < 2 && (
                      <div
                        className={`w-16 h-0.5 mx-4 ${
                          index < ["address", "review", "payment"].indexOf(step)
                            ? "bg-[#22C55E]"
                            : "bg-background-tertiary"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {step === "address" && renderAddressStep()}
              {step === "review" && renderReviewStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              {step === "address" ? (
                <>
                  <button
                    onClick={() => router.push("/cart")}
                    className="px-6 py-3 bg-background-tertiary border border-theme rounded-lg text-secondary font-medium hover:bg-background-secondary transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={() => canProceedToReview() && setStep("review")}
                    disabled={!canProceedToReview()}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      canProceedToReview()
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:opacity-90"
                        : "bg-background-tertiary text-muted cursor-not-allowed"
                    }`}
                  >
                    Continue to Review
                  </button>
                </>
              ) : step === "review" ? (
                <>
                  <button
                    onClick={() => setStep("address")}
                    className="px-6 py-3 bg-background-tertiary border border-theme rounded-lg text-secondary font-medium hover:bg-background-secondary transition-colors"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={handlePayment}
                    // ✅ FIX 3: Payment requires shipping method
                    disabled={
                      !canProceedToPayment() ||
                      loading ||
                      (paymentMethod === "cod" && cart.total > 5000)
                    }
                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      canProceedToPayment() &&
                      !(paymentMethod === "cod" && cart.total > 5000)
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:opacity-90"
                        : "bg-background-tertiary text-muted cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {paymentMethod === "cod"
                          ? "Place Order (COD)"
                          : `Pay ₹${cart.total}`}
                      </>
                    )}
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-background-secondary border border-theme rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Order Summary
                </h3>

                {/* Items List */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cart.items.slice(0, 3).map((item: any) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-background-tertiary rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted">
                          ₹{item.priceAtAdd} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        ₹{item.total}
                      </span>
                    </div>
                  ))}
                  {cart.items.length > 3 && (
                    <p className="text-xs text-muted text-center">
                      +{cart.items.length - 3} more items
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 border-t border-theme pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Subtotal</span>
                    <span className="text-sm font-medium text-primary">
                      ₹{cart.subtotal}
                    </span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary">Discount</span>
                      <span className="text-sm font-medium text-[#22C55E]">
                        -₹{cart.discount}
                      </span>
                    </div>
                  )}
                  {/* ✅ FIX 1: Shipping display only when method selected */}
                  {cart.shippingMethod ? (
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary">Shipping</span>
                      <span
                        className={`text-sm font-medium ${
                          cart.shipping === 0
                            ? "text-[#22C55E]"
                            : "text-primary"
                        }`}
                      >
                        {cart.shipping === 0 ? "FREE" : `₹${cart.shipping}`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary">Shipping</span>
                      <span className="text-sm text-muted">Not selected</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-theme pt-2">
                    <span className="font-bold text-primary">Total</span>
                    <span className="font-bold text-brand">₹{cart.total}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-background-secondary border border-theme rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#22C55E]" />
                    <span className="text-sm text-secondary">
                      Secure Payment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#38BDF8]" />
                    <span className="text-sm text-secondary">
                      Fast Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-sm text-secondary">Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#A855F7]" />
                    <span className="text-sm text-secondary">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Assurance */}
              <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-xl p-6 border border-brand/20">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-brand mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">
                      100% Purchase Protection
                    </h4>
                    <p className="text-sm text-secondary">
                      Your order is protected with end-to-end encryption and
                      buyer-friendly refund policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= END RIGHT COLUMN ================= */}
        </div>
      </div>
    </div>
  );
}
