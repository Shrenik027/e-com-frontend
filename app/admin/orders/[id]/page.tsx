"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderByIdAdmin } from "@/services/adminOrders";

import {
  ArrowLeft,
  ShoppingBag,
  User,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Loader2,
  CreditCard,
  Home,
  Phone,
  Mail,
} from "lucide-react";

const STATUS_STEPS = [
  { key: "placed", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Package },
  { key: "cancelled", label: "Cancelled", icon: XCircle },
];
interface OrderTimelineProps {
  status: string;
}

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderByIdAdmin(id);
        setOrder(data);
      } catch (err) {
        console.error("Failed to load order", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#F59E0B]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Loading Order
            </h3>
            <p className="text-muted">Fetching order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">
            Order Not Found
          </h3>
          <p className="text-muted">The requested order could not be found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Order Details
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-muted">Order ID: {order._id}</span>
            <span className="text-sm text-muted">
              <Calendar className="w-4 h-4 inline mr-1" />
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={order.orderStatus} />
          <PaymentBadge status={order.paymentStatus} />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted mb-1">Order ID</p>
                <p className="font-mono text-sm font-semibold text-primary">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Order Date</p>
                <p className="font-medium text-primary">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Order Time</p>
                <p className="font-medium text-primary">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Last Updated</p>
                <p className="font-medium text-primary">
                  {order.updatedAt
                    ? new Date(order.updatedAt).toLocaleDateString()
                    : "Never"}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted mb-1">Name</p>
                <p className="font-medium text-primary">
                  {order.user?.name || "Guest"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Email</p>
                <p className="font-medium text-primary flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {order.user?.email || "No email"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Phone</p>
                <p className="font-medium text-primary flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {order.user?.phone || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Customer Since</p>
                <p className="font-medium text-primary">
                  {order.user?.createdAt
                    ? new Date(order.user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h2>
            <div className="p-4 bg-background-tertiary rounded-xl border border-theme">
              <div className="space-y-2">
                <p className="font-medium text-primary">
                  {order.address?.street || "Not provided"}
                </p>
                <p className="text-primary">
                  {order.address?.city}, {order.address?.state} -{" "}
                  {order.address?.zipCode}
                </p>
                <p className="text-primary">{order.address?.country}</p>
                {order.address?.phone && (
                  <p className="text-primary flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {order.address.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-background-secondary rounded-2xl border border-theme overflow-hidden">
            <div className="p-6 border-b border-theme">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items ({order.items.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-background-tertiary">
                    <th className="p-4 text-left text-sm font-semibold text-primary">
                      Product
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-primary">
                      Price
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-primary">
                      Quantity
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-primary">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme">
                  {order.items.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-background-tertiary/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <div className="w-12 h-12 bg-background-tertiary rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-primary">
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-xs text-muted mt-1 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-primary">
                          ₹{item.price}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-primary">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-primary">
                          ₹{item.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Payment & Timeline */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-primary">
                  ₹{order.subtotal}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted">Discount</span>
                  <span className="font-medium text-[#22C55E]">
                    -₹{order.discount}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted">Shipping</span>
                <span className="font-medium text-primary">
                  ₹{order.shipping}
                </span>
              </div>
              <div className="pt-3 border-t border-theme">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h3 className="text-sm font-semibold text-primary mb-3">
              Payment Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Status</span>
                <PaymentBadge status={order.paymentStatus} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Method</span>
                <span className="text-sm font-medium text-primary">
                  {order.paymentMethod || "Online"}
                </span>
              </div>
              {order.transactionId && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Transaction ID</span>
                  <span className="text-xs font-mono text-primary">
                    {order.transactionId.slice(-12)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Order Timeline */}
          {/* Order Timeline */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">
                Order Timeline
              </h3>
              <span className="text-sm text-muted">
                Current: {order.orderStatus}
              </span>
            </div>
            <div className="p-4 bg-background-tertiary/50 rounded-xl border border-theme">
              <OrderTimeline status={order.orderStatus} />
            </div>
            <p className="text-xs text-muted mt-3 text-center">
              Timeline shows the progression of this order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return {
          color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
          icon: <Clock className="w-4 h-4" />,
        };
      case "confirmed":
        return {
          color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "shipped":
        return {
          color: "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/20",
          icon: <Truck className="w-4 h-4" />,
        };
      case "delivered":
        return {
          color: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20",
          icon: <Package className="w-4 h-4" />,
        };
      case "cancelled":
        return {
          color: "bg-red-500/10 text-red-600 border-red-500/20",
          icon: <XCircle className="w-4 h-4" />,
        };
      default:
        return {
          color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
          icon: <Clock className="w-4 h-4" />,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${config.color}`}
    >
      {config.icon}
      <span className="capitalize">{status}</span>
    </div>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const getPaymentStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 border border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border border-gray-500/20";
    }
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPaymentStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}

function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = STATUS_STEPS.findIndex((step) => step.key === status);

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute left-0 right-0 top-5 h-0.5 bg-theme -translate-y-1/2 z-0"></div>
      <div
        className="absolute left-0 top-5 h-0.5 bg-[#22C55E] -translate-y-1/2 z-10 transition-all duration-500"
        style={{
          width:
            status === "cancelled" ? "100%" : `${(currentIndex + 1) * 25}%`,
          backgroundColor: status === "cancelled" ? "#EF4444" : "#22C55E",
        }}
      ></div>

      {/* Steps */}
      <div className="relative flex justify-between items-start z-20">
        {STATUS_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isCancelled = status === "cancelled";

          return (
            <div key={step.key} className="flex flex-col items-center w-20">
              {/* Icon */}
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-full mb-2
                ${
                  isCompleted
                    ? isCancelled
                      ? "bg-red-500 text-white"
                      : "bg-[#22C55E] text-white"
                    : "bg-background-tertiary text-muted border border-theme"
                }
                ${isCurrent && !isCancelled ? "ring-4 ring-[#22C55E]/30" : ""}
                ${isCurrent && isCancelled ? "ring-4 ring-red-500/30" : ""}
                transition-all duration-300
              `}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label */}
              <div className="text-center">
                <p
                  className={`text-xs font-medium ${
                    isCompleted ? "text-primary" : "text-muted"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-[10px] text-muted mt-1">Current</p>
                )}
              </div>

              {/* Status indicator for current step */}
              {isCurrent && !isCancelled && (
                <div className="mt-2 w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
