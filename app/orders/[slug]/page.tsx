"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/services/order";
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
        color: "bg-blue-100 text-blue-800",
        icon: <Clock className="w-5 h-5" />,
        label: "Order Placed",
        description: "We've received your order",
      },
      confirmed: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <CheckCircle className="w-5 h-5" />,
        label: "Confirmed",
        description: "Order confirmed and being processed",
      },
      shipped: {
        color: "bg-purple-100 text-purple-800",
        icon: <Truck className="w-5 h-5" />,
        label: "Shipped",
        description: "Your order is on the way",
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <Package className="w-5 h-5" />,
        label: "Delivered",
        description: "Order delivered successfully",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-5 h-5" />,
        label: "Cancelled",
        description: "Order has been cancelled",
      },
    };
    return configs[status as keyof typeof configs] || configs.placed;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-gray-700">
              Loading order details...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            {error ||
              "The order you're looking for doesn't exist or has been deleted."}
          </p>
          <div className="space-y-4">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Orders
            </Link>
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

  const statusConfig = getStatusConfig(order.orderStatus);
  const date = new Date(order.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${statusConfig.color}`}
                >
                  {statusConfig.icon}
                  {statusConfig.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                <div className="text-4xl font-bold text-gray-900">
                  ₹{order.total?.toLocaleString("en-IN") || 0}
                </div>
                <div className="text-sm text-gray-500">Total Amount</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
              </div>

              <div className="divide-y">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>
                            Price: ₹{item.price?.toLocaleString("en-IN") || 0}
                          </span>
                          <span>Quantity: {item.quantity}</span>
                          <span>
                            Item Total: ₹
                            {item.total?.toLocaleString("en-IN") || 0}
                          </span>
                        </div>

                        {order.orderStatus === "delivered" && (
                          <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Rate Product
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {order.address && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Address
                  </h2>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Delivery Address
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city}, {order.address.zipCode}
                      </p>
                      <p>{order.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₹{order.subtotal?.toLocaleString("en-IN") || 0}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -₹{order.discount?.toLocaleString("en-IN") || 0}
                    </span>
                  </div>
                )}

                {order.couponCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon Applied</span>
                    <span className="font-medium text-green-600">
                      {order.couponCode}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ₹{order.shipping?.toLocaleString("en-IN") || 0}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{order.total?.toLocaleString("en-IN") || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Download Invoice
                      </div>
                      <div className="text-sm text-gray-500">PDF format</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </button>

                {order.orderStatus === "delivered" && (
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Repeat className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          Reorder All Items
                        </div>
                        <div className="text-sm text-gray-500">
                          Buy these items again
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                  </button>
                )}

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Contact Support
                      </div>
                      <div className="text-sm text-gray-500">
                        Get help with this order
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Headphones className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with any
                questions about your order.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Phone className="w-4 h-4" />
                  +91 12345 67890
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Mail className="w-4 h-4" />
                  support@yourstore.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
