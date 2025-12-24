"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/services/order";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  CreditCard,
  Download,
  Printer,
  MessageSquare,
  Repeat,
  Star,
  Shield,
  Home,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Headphones,
  IndianRupee,
  Users,
  FileText,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

export default function OrderDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const orderId = slug;
  const router = useRouter();

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || typeof orderId !== "string" || orderId.length !== 24) {
      console.error("❌ Invalid orderId:", orderId);
      router.replace("/orders");
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  const getStatusConfig = (status: string) => {
    const configs = {
      placed: {
        color: "bg-gradient-to-r from-[#38BDF8] to-[#60A5FA] text-white",
        icon: <Clock className="w-5 h-5" />,
        label: "Order Placed",
        gradient: "from-[#38BDF8]/5 to-[#38BDF8]/0",
      },
      confirmed: {
        color: "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white",
        icon: <CheckCircle className="w-5 h-5" />,
        label: "Confirmed",
        gradient: "from-[#F59E0B]/5 to-[#F97316]/0",
      },
      shipped: {
        color: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white",
        icon: <Truck className="w-5 h-5" />,
        label: "Shipped",
        gradient: "from-[#8B5CF6]/5 to-[#8B5CF6]/0",
      },
      delivered: {
        color: "bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white",
        icon: <Package className="w-5 h-5" />,
        label: "Delivered",
        gradient: "from-[#22C55E]/5 to-[#22C55E]/0",
      },
      cancelled: {
        color: "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white",
        icon: <XCircle className="w-5 h-5" />,
        label: "Cancelled",
        gradient: "from-[#EF4444]/5 to-[#EF4444]/0",
      },
    };
    return configs[status as keyof typeof configs] || configs.placed;
  };

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <RefreshCw className="w-12 h-12 text-brand" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-full blur-sm"
              />
            </motion.div>
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Loading Order Details
          </h2>
          <p className="text-muted">Fetching your order information...</p>
        </motion.div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error || !order) {
    return (
      <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 relative">
            <div className="w-20 h-20 mx-auto bg-background-tertiary rounded-2xl flex items-center justify-center border border-theme">
              <Package className="w-10 h-10 text-muted" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            Order Not Found
          </h2>
          <p className="text-muted mb-6">
            {error ||
              "The order you're looking for doesn't exist or has been deleted."}
          </p>
          <div className="space-y-4">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-shadow group"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Orders
            </Link>
            <Link
              href="/shop"
              className="block text-sm text-muted hover:text-primary transition-colors"
            >
              Continue Shopping →
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.orderStatus);
  const date = new Date(order.createdAt);

  /* ---------------- SUCCESS STATE ---------------- */
  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Orders
          </Link>
        </motion.div>

        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-tertiary rounded-2xl border border-theme p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${statusConfig.color}`}
                >
                  {statusConfig.icon}
                  {statusConfig.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Placed on{" "}
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {order.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                  ₹{order.total?.toLocaleString("en-IN") || 0}
                </div>
                <div className="text-sm text-muted">Total Amount</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-background-tertiary rounded-2xl border border-theme overflow-hidden"
            >
              <div className="p-6 border-b border-theme">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    Order Items
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-theme">
                {order.items.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-background-secondary/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/5 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#F59E0B]" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2 text-lg">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted mb-3">
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            Price: ₹{item.price?.toLocaleString("en-IN") || 0}
                          </span>
                          <span>Quantity: {item.quantity}</span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            Total: ₹{item.total?.toLocaleString("en-IN") || 0}
                          </span>
                        </div>

                        {order.orderStatus === "delivered" && (
                          <button className="text-sm text-[#F59E0B] hover:text-[#F97316] font-medium flex items-center gap-2 transition-colors">
                            <Star className="w-4 h-4" />
                            Rate Product
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            {order.address && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background-tertiary rounded-2xl border border-theme p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38BDF8]/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      Shipping Address
                    </h2>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#38BDF8]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      Delivery Address
                    </h3>
                    <div className="text-secondary space-y-1">
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city}, {order.address.zipCode}
                      </p>
                      <p>{order.address.country}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-background-tertiary rounded-2xl border border-theme p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                  <FileText className="w-5 h-5 text-[#22C55E]" />
                </div>
                <h2 className="text-xl font-bold text-primary">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-medium text-primary">
                    ₹{order.subtotal?.toLocaleString("en-IN") || 0}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Discount</span>
                    <span className="font-medium text-[#22C55E]">
                      -₹{order.discount?.toLocaleString("en-IN") || 0}
                    </span>
                  </div>
                )}

                {order.couponCode && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Coupon Applied</span>
                    <span className="font-medium text-[#22C55E]">
                      {order.couponCode}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-secondary">Shipping</span>
                  <span className="font-medium text-primary">
                    ₹{order.shipping?.toLocaleString("en-IN") || 0}
                  </span>
                </div>

                <div className="border-t border-theme pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-primary">Total</span>
                    <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                      ₹{order.total?.toLocaleString("en-IN") || 0}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-background-tertiary rounded-2xl border border-theme p-6"
            >
              <h2 className="text-xl font-bold text-primary mb-6">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center justify-between p-4 border border-theme rounded-xl hover:border-[#38BDF8] hover:bg-[#38BDF8]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#38BDF8]/10 rounded-lg flex items-center justify-center group-hover:bg-[#38BDF8]/20 transition-colors">
                      <Download className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-primary">
                        Download Invoice
                      </div>
                      <div className="text-sm text-muted">PDF format</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-[#38BDF8] transition-colors" />
                </motion.button>

                {order.orderStatus === "delivered" && (
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center justify-between p-4 border border-theme rounded-xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
                        <Repeat className="w-5 h-5 text-[#22C55E]" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-primary">
                          Reorder All Items
                        </div>
                        <div className="text-sm text-muted">
                          Buy these items again
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-[#22C55E] transition-colors" />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center justify-between p-4 border border-theme rounded-xl hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                      <MessageSquare className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-primary">
                        Contact Support
                      </div>
                      <div className="text-sm text-muted">
                        Get help with this order
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-[#8B5CF6] transition-colors" />
                </motion.button>
              </div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-[#38BDF8]/5 to-[#60A5FA]/5 rounded-2xl p-6 border border-[#38BDF8]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Headphones className="w-6 h-6 text-[#38BDF8]" />
                <h3 className="font-bold text-primary">Need Help?</h3>
              </div>
              <p className="text-sm text-muted mb-4">
                Our support team is available 24/7 to assist you with any
                questions about your order.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#38BDF8]">
                  <Phone className="w-4 h-4" />
                  +91 12345 67890
                </div>
                <div className="flex items-center gap-2 text-sm text-[#38BDF8]">
                  <Mail className="w-4 h-4" />
                  support@yourstore.com
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
