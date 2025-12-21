"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyOrders } from "@/services/order";
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
        color: "bg-blue-100 text-blue-800",
        icon: <Clock className="w-4 h-4" />,
        label: "Order Placed",
        bgColor: "bg-gradient-to-r from-blue-50 to-blue-100",
      },
      confirmed: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Confirmed",
        bgColor: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      },
      shipped: {
        color: "bg-purple-100 text-purple-800",
        icon: <Truck className="w-4 h-4" />,
        label: "Shipped",
        bgColor: "bg-gradient-to-r from-purple-50 to-purple-100",
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <Package className="w-4 h-4" />,
        label: "Delivered",
        bgColor: "bg-gradient-to-r from-green-50 to-green-100",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
        label: "Cancelled",
        bgColor: "bg-gradient-to-r from-red-50 to-red-100",
      },
    };
    return configs[status as keyof typeof configs] || configs.placed;
  };

  const getPaymentStatusConfig = (status: string) => {
    const configs = {
      paid: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Paid",
        badgeColor: "bg-green-500",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
        label: "Pending",
        badgeColor: "bg-yellow-500",
      },
      failed: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
        label: "Failed",
        badgeColor: "bg-red-500",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  // ✅ FIXED: Calculate total spent only from PAID orders
  const totalSpent = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + (order.total || 0), 0);

  // ✅ FIXED: Calculate pending payments
  const pendingPayments = orders
    .filter((order) => order.paymentStatus === "pending")
    .reduce((sum, order) => sum + (order.total || 0), 0);

  // ✅ FIXED: Calculate successful orders count
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
    // Implement payment logic
    console.log("Processing payment for order:", order._id);

    // For now, show a mock payment modal
    const amount = order.total;
    alert(
      `Redirecting to payment gateway for ₹${amount.toLocaleString(
        "en-IN"
      )}\nOrder ID: ${order._id}`
    );

    // In real implementation, you would:
    // 1. Create payment intent with your payment gateway
    // 2. Redirect to payment page
    // 3. Update order status on success
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-gray-700">
              Loading your orders...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Orders
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
          <div className="space-y-4">
            <button
              onClick={fetchOrders}
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <Link
              href="/shop"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Orders Yet
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Start shopping to place your first order. Discover amazing products
            waiting for you!
          </p>
          <div className="space-y-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-2">
                Track, manage, and review your purchases
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchOrders}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <Link
                href="/shop"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Stats - UPDATED with Payment Info */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-2xl font-bold text-gray-900">
                {orders.length}
              </div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">
                ₹{totalSpent.toLocaleString("en-IN")}
              </div>
              <div className="text-sm text-gray-500">Total Spent</div>
              <div className="text-xs text-green-500 mt-1">
                {successfulOrders} successful orders
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-2xl font-bold text-yellow-600">
                ₹{pendingPayments.toLocaleString("en-IN")}
              </div>
              <div className="text-sm text-gray-500">Pending Payments</div>
              <div className="text-xs text-yellow-500 mt-1">
                {orders.filter((o) => o.paymentStatus === "pending").length}{" "}
                orders
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">
                {orders.filter((o) => o?.orderStatus === "shipped").length}
              </div>
              <div className="text-sm text-gray-500">In Transit</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter((o) => o?.orderStatus === "delivered").length}
              </div>
              <div className="text-sm text-gray-500">Delivered</div>
            </div>
          </div>

          {/* Payment Summary Alert */}
          {pendingPayments > 0 && (
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Pending Payments: ₹
                      {pendingPayments.toLocaleString("en-IN")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Complete payment for{" "}
                      {
                        orders.filter((o) => o.paymentStatus === "pending")
                          .length
                      }{" "}
                      order(s) to continue processing
                    </p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Pay All Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="placed">Order Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                className="border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid Only</option>
                <option value="pending">Pending Payment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.orderStatus);
            const paymentConfig = getPaymentStatusConfig(order.paymentStatus);
            const date = new Date(order.createdAt);

            return (
              <div
                key={order._id}
                className={`${statusConfig.bgColor} border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group relative`}
              >
                {/* Payment Status Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`${paymentConfig.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}
                  >
                    {paymentConfig.icon}
                    {paymentConfig.label}
                  </div>
                </div>

                {/* Order Header */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Order #{order._id?.slice(-6).toUpperCase() || "N/A"}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}
                    >
                      {statusConfig.icon}
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IndianRupee className="w-4 h-4" />
                    <span className="font-bold text-gray-900">
                      ₹{order.total?.toLocaleString("en-IN") || 0}
                    </span>
                  </div>
                  {order.address?.city && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {order.address.city}
                    </div>
                  )}
                </div>

                {/* Items Preview */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Items
                  </h4>
                  <div className="space-y-2">
                    {order.items?.slice(0, 2).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600 truncate">
                          {item.name}
                        </span>
                        <span className="font-medium">₹{item.total}</span>
                      </div>
                    ))}
                    {order.items?.length > 2 && (
                      <div className="text-sm text-gray-500">
                        + {order.items.length - 2} more items
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/orders/${order._id}`)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>

                  {order.paymentStatus === "pending" && (
                    <button
                      onClick={() => handlePayNow(order)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse"
                    >
                      <Lock className="w-4 h-4" />
                      Pay Now
                    </button>
                  )}
                </div>

                {/* Payment Note */}
                {order.paymentStatus === "pending" && (
                  <div className="mt-3 text-xs text-yellow-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Payment pending for 24+ hours
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State for Filtered Results */}
        {filteredOrders.length === 0 && orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Payment Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Secure Payments</h4>
            <p className="text-sm text-gray-600">
              256-bit SSL encryption. Your payment information is always
              protected.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              Multiple Payment Options
            </h4>
            <p className="text-sm text-gray-600">
              Credit/Debit Cards, UPI, Net Banking, Wallets & EMI options
              available.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Payment Support</h4>
            <p className="text-sm text-gray-600">
              Need help with payment? Contact our 24/7 support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
