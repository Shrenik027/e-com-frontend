"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/services/order";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  Loader2,
  FileText,
  Printer,
  Package,
  AlertTriangle,
  Home,
  Truck,
  Mail,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();

  // Logic: Try multiple naming conventions to ensure the ID is captured
  const orderId = params?.["order-id"] || params?.["orderId"] || params?.["id"];

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("No Order ID found in URL parameters.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId as string);
        if (!data) throw new Error("Order not found in database.");
        setOrder(data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // --- 1. Loading State ---
  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-background gap-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[#F97316]/20 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-[var(--color-primary)]" />
          </div>
          <div className="absolute -inset-6 rounded-full border-2 border-[var(--color-primary)]/10 animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="font-bold text-primary">Loading your order details</p>
          <p className="text-sm text-muted">Please wait a moment...</p>
        </div>
      </motion.div>
    );

  // --- 2. Error State (Loophole Fix: Provides actionable feedback) ---
  if (error || !order)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center"
      >
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <div className="absolute -inset-6 rounded-2xl bg-gradient-to-r from-red-500/5 to-transparent blur-xl"></div>
        </div>

        <h2 className="text-2xl font-bold text-primary mb-3">
          Something went wrong
        </h2>
        <p className="text-secondary mb-8 max-w-sm">
          {error || "The order could not be loaded."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.replace("/")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20"
          >
            Back to Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-xl bg-background-secondary border border-theme text-secondary hover:text-primary font-medium"
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );

  // --- 3. Success UI ---
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background)] opacity-50 pointer-events-none" />

      {/* Confetti Effect Container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] rounded-full"
            initial={{
              y: -100,
              x: Math.random() * window.innerWidth,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight,
              x: Math.random() * 200 - 100,
              rotate: 360,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.02,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 lg:py-16">
        {/* Success Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="relative inline-block mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
              }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center shadow-2xl shadow-[var(--color-primary)]/30">
                <CheckCircle className="w-20 h-20 text-white" strokeWidth={2} />
              </div>

              {/* Animated Rings */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -inset-8 rounded-[60px] border-2 border-[var(--color-primary)]/30"
              />
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
                className="absolute -inset-12 rounded-[80px] border-2 border-[var(--color-primary)]/20"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">
              Order Confirmed!
            </h1>
            <p className="text-lg text-secondary">
              Thank you for your purchase. Your order has been successfully
              placed.
            </p>

            <div className="inline-flex items-center gap-4 px-6 py-3 bg-background-secondary rounded-full border border-theme">
              <span className="text-sm text-muted">Order ID:</span>
              <span className="font-mono font-bold text-[var(--color-primary)]">
                #{order._id.slice(-8).toUpperCase()}
              </span>
              <span className="text-xs text-muted">•</span>
              <span className="text-sm text-secondary">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-background-secondary border border-theme rounded-3xl overflow-hidden shadow-2xl">
            {/* Card Header */}
            <div className="p-6 lg:p-8 border-b border-theme bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    Order Summary
                  </h2>
                  <p className="text-sm text-secondary">
                    Review your purchase details
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 lg:p-8">
              <div className="space-y-4 mb-8">
                {order.items.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-background-tertiary border border-theme group hover:border-[var(--color-primary)]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center">
                        <span className="font-bold text-primary">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-primary truncate">
                          {item.product?.name || item.name}
                        </p>
                        <p className="text-sm text-secondary">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-theme pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-bold text-primary">
                    ₹{order.subtotal || order.total}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between items-center py-2 px-3 bg-[var(--color-accent-green)]/10 border border-[var(--color-accent-green)]/20 rounded-lg">
                    <span className="text-sm font-bold text-[var(--color-accent-green)]">
                      Discount Applied
                    </span>
                    <span className="font-bold text-[var(--color-accent-green)]">
                      -₹{order.discount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-secondary">Shipping</span>
                  <span className="font-bold text-primary">
                    {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-theme">
                  <div>
                    <p className="text-lg font-bold text-primary">
                      Total Amount
                    </p>
                    <p className="text-sm text-muted">Including all taxes</p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] bg-clip-text text-transparent">
                    ₹{order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.replace("/")}
            className="py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <ShoppingBag className="w-6 h-6" />
            Continue Shopping
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.print()}
            className="py-5 rounded-2xl font-bold text-lg bg-background-secondary border border-theme text-primary hover:border-[var(--color-primary)]/30 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Printer className="w-6 h-6" />
            Print Invoice
          </motion.button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-primary">What's Next?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Confirmation */}
            <div className="p-5 rounded-2xl bg-background-secondary border border-theme hover:border-[var(--color-accent-blue)]/30 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-blue)] to-[#60A5FA] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-primary">Email Confirmation</p>
                  <p className="text-xs text-secondary">Check your inbox</p>
                </div>
              </div>
              <p className="text-sm text-muted">
                A detailed invoice has been sent to your registered email
                address.
              </p>
            </div>

            {/* Order Tracking */}
            <div className="p-5 rounded-2xl bg-background-secondary border border-theme hover:border-[var(--color-primary)]/30 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-primary">Track Order</p>
                  <p className="text-xs text-secondary">Real-time updates</p>
                </div>
              </div>
              <p className="text-sm text-muted">
                Track your delivery status in the "My Orders" section of your
                account.
              </p>
            </div>

            {/* Support */}
            <div className="p-5 rounded-2xl bg-background-secondary border border-theme hover:border-[var(--color-accent-green)]/30 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-green)] to-[#22C55E] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-primary">Need Help?</p>
                  <p className="text-xs text-secondary">We're here for you</p>
                </div>
              </div>
              <p className="text-sm text-muted">
                Contact our support team for any questions about your order.
              </p>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent-blue)]/5 border border-theme">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-6 h-6 text-[var(--color-primary)]" />
              <div>
                <p className="font-bold text-primary">Estimated Delivery</p>
                <p className="text-sm text-secondary">
                  Your order will be delivered within 3-7 business days
                </p>
              </div>
            </div>
            <div className="w-full bg-background-tertiary rounded-full h-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "30%" }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[#F97316]"
              />
            </div>
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>Order Placed</span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
