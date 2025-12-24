"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyOrders } from "@/services/order";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Search,
  RefreshCw,
  ShoppingBag,
  Calendar,
  CreditCard,
  MapPin,
  Star,
  MessageSquare,
  Repeat,
  Eye,
  ArrowLeft,
  Headphones,
  IndianRupee,
  Wallet,
  ShieldCheck,
  Zap,
  Lock,
  Filter,
  TrendingUp,
  Sparkles,
  Users,
  Shield,
} from "lucide-react";

// Define the order type
interface Order {
  _id: string;
  user: any;
  items: any[];
  address: any;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string;
  transactionId?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login?redirect=/orders");
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const ordersData: any = await getMyOrders();
      console.log("📦 Orders data received:", ordersData);

      let ordersArray: any[] = [];

      if (Array.isArray(ordersData)) {
        ordersArray = ordersData;
      } else if (ordersData && typeof ordersData === "object") {
        if ("orders" in ordersData && Array.isArray(ordersData.orders)) {
          ordersArray = ordersData.orders;
        } else if ("data" in ordersData && Array.isArray(ordersData.data)) {
          ordersArray = ordersData.data;
        }
      }

      console.log(`✅ Found ${ordersArray.length} orders`);

      const validOrders = ordersArray
        .filter(
          (order) =>
            order &&
            typeof order === "object" &&
            order._id &&
            typeof order._id === "string"
        )
        .map((order) => ({
          ...order,
          paymentStatus: order.paymentStatus || "pending",
          orderStatus: order.orderStatus || "placed",
          total: order.total || 0,
          subtotal: order.subtotal || 0,
          discount: order.discount || 0,
          shipping: order.shipping || 0,
        }));

      setOrders(validOrders);
    } catch (err: any) {
      console.error("❌ Error fetching orders:", err);
      setError(err.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      placed: {
        color: "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20",
        icon: <Clock className="w-4 h-4" />,
        label: "Order Placed",
        gradient: "from-[#38BDF8]/5 to-[#38BDF8]/0",
      },
      confirmed: {
        color: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Confirmed",
        gradient: "from-[#F59E0B]/5 to-[#F97316]/0",
      },
      shipped: {
        color: "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20",
        icon: <Truck className="w-4 h-4" />,
        label: "Shipped",
        gradient: "from-[#8B5CF6]/5 to-[#8B5CF6]/0",
      },
      delivered: {
        color: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20",
        icon: <Package className="w-4 h-4" />,
        label: "Delivered",
        gradient: "from-[#22C55E]/5 to-[#22C55E]/0",
      },
      cancelled: {
        color: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20",
        icon: <XCircle className="w-4 h-4" />,
        label: "Cancelled",
        gradient: "from-[#EF4444]/5 to-[#EF4444]/0",
      },
    };
    return configs[status as keyof typeof configs] || configs.placed;
  };

  const getPaymentStatusConfig = (status: string) => {
    const configs = {
      paid: {
        color: "bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Paid",
      },
      pending: {
        color: "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white",
        icon: <Clock className="w-4 h-4" />,
        label: "Pending",
      },
      failed: {
        color: "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white",
        icon: <XCircle className="w-4 h-4" />,
        label: "Failed",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  // Calculate totals
  const totalSpent = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + (order.total || 0), 0);

  const pendingPayments = orders
    .filter((order) => order.paymentStatus === "pending")
    .reduce((sum, order) => sum + (order.total || 0), 0);

  const successfulOrders = orders.filter(
    (order) =>
      order.paymentStatus === "paid" && order.orderStatus !== "cancelled"
  ).length;

  const filteredOrders = orders.filter((order) => {
    if (!order || typeof order !== "object") return false;

    const matchesSearch =
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items?.some((item: any) =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePayNow = (order: Order) => {
    console.log("Processing payment for order:", order._id);
    const amount = order.total;
    alert(
      `Redirecting to payment gateway for ₹${amount.toLocaleString(
        "en-IN"
      )}\nOrder ID: ${order._id}`
    );
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
            Loading Your Orders
          </h2>
          <p className="text-muted">Fetching your purchase history...</p>
        </motion.div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error) {
    return (
      <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 relative">
            <div className="w-20 h-20 mx-auto bg-background-tertiary rounded-2xl flex items-center justify-center border border-theme">
              <AlertCircle className="w-10 h-10 text-[#EF4444]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            Unable to Load Orders
          </h2>
          <p className="text-muted mb-6">{error}</p>
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchOrders}
              className="w-full max-w-xs bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </div>
            </motion.button>
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

  /* ---------------- EMPTY STATE ---------------- */
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background-secondary py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-[#F59E0B]" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold text-primary mb-4">
            No Orders Yet
          </h1>
          <p className="text-lg text-muted mb-8">
            Start your shopping journey and discover amazing products!
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN CONTENT ---------------- */
  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                My Orders
              </h1>
              <p className="text-muted">
                Track and manage all your purchases in one place
              </p>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchOrders}
                className="p-3 bg-background-tertiary rounded-xl border border-theme hover:bg-background transition-colors"
                aria-label="Refresh orders"
              >
                <RefreshCw className="w-5 h-5 text-secondary" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Continue Shopping</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-background-tertiary rounded-2xl p-6 border border-theme"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#38BDF8]/10 rounded-lg">
                  <Package className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <h3 className="font-semibold text-primary">Total Orders</h3>
              </div>
              <p className="text-3xl font-bold text-primary">{orders.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background-tertiary rounded-2xl p-6 border border-theme"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#22C55E]" />
                </div>
                <h3 className="font-semibold text-primary">Total Spent</h3>
              </div>
              <p className="text-3xl font-bold text-primary">
                ₹{totalSpent.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-muted mt-2">
                {successfulOrders} successful orders
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-background-tertiary rounded-2xl p-6 border border-theme"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                  <Clock className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <h3 className="font-semibold text-primary">Pending</h3>
              </div>
              <p className="text-3xl font-bold text-[#F59E0B]">
                ₹{pendingPayments.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-muted mt-2">
                {orders.filter((o) => o.paymentStatus === "pending").length}{" "}
                orders
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-background-tertiary rounded-2xl p-6 border border-theme"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg">
                  <Truck className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-primary">In Transit</h3>
              </div>
              <p className="text-3xl font-bold text-primary">
                {orders.filter((o) => o.orderStatus === "shipped").length}
              </p>
              <p className="text-sm text-muted mt-2">Currently shipping</p>
            </motion.div>
          </div>

          {/* Pending Payments Alert */}
          {pendingPayments > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/5 rounded-2xl p-6 border border-[#F59E0B]/20 mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-xl">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">
                      Pending Payments: ₹
                      {pendingPayments.toLocaleString("en-IN")}
                    </h3>
                    <p className="text-sm text-muted">
                      Complete payment for{" "}
                      {
                        orders.filter((o) => o.paymentStatus === "pending")
                          .length
                      }{" "}
                      order(s)
                    </p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Pay All Now
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background-tertiary rounded-2xl p-6 border border-theme mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary placeholder:text-muted"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-background-secondary border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="placed">Order Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders Grid */}
        {filteredOrders.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredOrders.map((order, index) => {
              const statusConfig = getStatusConfig(order.orderStatus);
              const paymentConfig = getPaymentStatusConfig(order.paymentStatus);
              const date = new Date(order.createdAt);

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${statusConfig.gradient} bg-background-tertiary rounded-2xl border border-theme p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative`}
                >
                  {/* Payment Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`${paymentConfig.color} text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1`}
                    >
                      {paymentConfig.icon}
                      {paymentConfig.label}
                    </span>
                  </div>

                  {/* Order Header */}
                  <div className="mb-6">
                    <h3 className="font-bold text-primary text-lg mb-2">
                      Order #{order._id?.slice(-8).toUpperCase()}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}
                      >
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Calendar className="w-4 h-4" />
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="w-4 h-4 text-muted" />
                      <span className="font-bold text-primary text-lg">
                        ₹{order.total?.toLocaleString("en-IN") || 0}
                      </span>
                    </div>
                    {order.address?.city && (
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapPin className="w-4 h-4" />
                        {order.address.city}
                      </div>
                    )}
                  </div>

                  {/* Items Preview */}
                  <div className="border-t border-theme pt-4 mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Items
                    </h4>
                    <div className="space-y-2">
                      {order.items
                        ?.slice(0, 2)
                        .map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-secondary truncate">
                              {item.name}
                            </span>
                            <span className="font-medium text-primary">
                              ₹{item.total}
                            </span>
                          </div>
                        ))}
                      {order.items?.length > 2 && (
                        <div className="text-sm text-muted">
                          + {order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/orders/${order._id}`)}
                      className="flex-1 bg-gradient-to-r from-[#38BDF8] to-[#60A5FA] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </motion.button>

                    {order.paymentStatus === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePayNow(order)}
                        className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Pay Now
                      </motion.button>
                    )}
                  </div>

                  {/* Payment Note */}
                  {order.paymentStatus === "pending" && (
                    <div className="mt-3 text-xs text-[#F59E0B] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Payment pending
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-background-tertiary rounded-2xl p-12 text-center border border-theme"
          >
            <Search className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">
              No matching orders found
            </h3>
            <p className="text-muted mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-[#F59E0B] hover:text-[#F97316] font-medium transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-background-tertiary rounded-2xl p-6 border border-theme">
            <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h4 className="font-bold text-primary mb-2">Secure Payments</h4>
            <p className="text-sm text-muted">
              256-bit SSL encryption. Your payment information is always
              protected.
            </p>
          </div>

          <div className="bg-background-tertiary rounded-2xl p-6 border border-theme">
            <div className="w-12 h-12 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <h4 className="font-bold text-primary mb-2">
              Multiple Payment Options
            </h4>
            <p className="text-sm text-muted">
              Credit/Debit Cards, UPI, Net Banking, Wallets & EMI options
              available.
            </p>
          </div>

          <div className="bg-background-tertiary rounded-2xl p-6 border border-theme">
            <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <h4 className="font-bold text-primary mb-2">Payment Support</h4>
            <p className="text-sm text-muted">
              Need help with payment? Contact our 24/7 support team.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
