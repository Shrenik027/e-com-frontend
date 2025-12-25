"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/services/adminOrders";
import Link from "next/link";
import {
  ShoppingBag,
  Filter,
  Search,
  RefreshCw,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  Eye,
} from "lucide-react";

const STATUS_OPTIONS = [
  "placed",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
      await loadOrders();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get status stats
  const statusStats = {
    placed: orders.filter((o) => o.orderStatus === "placed").length,
    confirmed: orders.filter((o) => o.orderStatus === "confirmed").length,
    shipped: orders.filter((o) => o.orderStatus === "shipped").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
    total: orders.length,
  };

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
              Loading Orders
            </h3>
            <p className="text-muted">Fetching all orders from your store...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Order Management
          </h1>
          <p className="text-muted mt-2">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadOrders}
            disabled={loading}
            className="p-2.5 bg-background-tertiary border border-theme rounded-lg text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors disabled:opacity-50"
            title="Refresh orders"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {statusStats.total}
            </span>
          </div>
          <p className="text-xs text-muted">Total Orders</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {statusStats.placed}
            </span>
          </div>
          <p className="text-xs text-muted">Placed</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {statusStats.confirmed}
            </span>
          </div>
          <p className="text-xs text-muted">Confirmed</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-[#38BDF8]/10 rounded-lg">
              <Truck className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {statusStats.shipped}
            </span>
          </div>
          <p className="text-xs text-muted">Shipped</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-[#22C55E]/10 rounded-lg">
              <Package className="w-5 h-5 text-[#22C55E]" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {statusStats.delivered}
            </span>
          </div>
          <p className="text-xs text-muted">Delivered</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {statusStats.cancelled}
            </span>
          </div>
          <p className="text-xs text-muted">Cancelled</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-background-secondary rounded-xl border border-theme p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                placeholder="Search by Order ID, email, or payment status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status} className="capitalize">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-muted">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-background-secondary rounded-xl border border-theme overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-tertiary">
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Order ID
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Customer
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Total
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Payment
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No orders found
                      </h3>
                      <p className="text-muted">
                        {searchTerm || statusFilter !== "all"
                          ? "No orders match your search criteria"
                          : "No orders have been placed yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const locked = ["delivered", "cancelled"].includes(
                    order.orderStatus
                  );

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-background-tertiary/50 transition-colors"
                    >
                      <td className="p-4">
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="group flex items-center gap-2"
                        >
                          <div className="font-mono text-sm font-semibold text-primary group-hover:text-[#F59E0B] transition-colors">
                            #{order._id.slice(-8).toUpperCase()}
                          </div>
                          <Eye className="w-4 h-4 text-muted group-hover:text-[#F59E0B] transition-colors" />
                        </Link>
                        <div className="text-xs text-muted mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="p-4">
                        <div>
                          <p className="font-medium text-primary">
                            {order.user?.name || "Guest"}
                          </p>
                          <p className="text-sm text-muted">
                            {order.user?.email || "No email"}
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-lg text-primary">
                          ₹{order.total}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            order.paymentStatus === "paid"
                              ? "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
                              : order.paymentStatus === "pending"
                              ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                              : "bg-red-500/10 text-red-600 border border-red-500/20"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="p-4">
                        <StatusBadge status={order.orderStatus} />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={order.orderStatus}
                            disabled={updatingId === order._id || locked}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="px-3 py-1.5 bg-background-tertiary border border-theme rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                          >
                            {STATUS_OPTIONS.map((status) => {
                              const currentIndex = STATUS_OPTIONS.indexOf(
                                order.orderStatus
                              );
                              const optionIndex =
                                STATUS_OPTIONS.indexOf(status);
                              const isDisabled =
                                optionIndex < currentIndex ||
                                optionIndex > currentIndex + 1 ||
                                order.orderStatus === "cancelled";

                              return (
                                <option
                                  key={status}
                                  value={status}
                                  disabled={isDisabled}
                                  className="capitalize"
                                >
                                  {status}
                                </option>
                              );
                            })}
                          </select>

                          {updatingId === order._id && (
                            <Loader2 className="w-4 h-4 animate-spin text-[#F59E0B]" />
                          )}

                          {locked && (
                            <div className="text-xs text-muted">
                              {order.orderStatus === "delivered"
                                ? "Final"
                                : "Cancelled"}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
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
          icon: <Clock className="w-3 h-3" />,
        };
      case "confirmed":
        return {
          color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
          icon: <CheckCircle className="w-3 h-3" />,
        };
      case "shipped":
        return {
          color: "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/20",
          icon: <Truck className="w-3 h-3" />,
        };
      case "delivered":
        return {
          color: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20",
          icon: <Package className="w-3 h-3" />,
        };
      case "cancelled":
        return {
          color: "bg-red-500/10 text-red-600 border-red-500/20",
          icon: <XCircle className="w-3 h-3" />,
        };
      default:
        return {
          color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
          icon: <AlertCircle className="w-3 h-3" />,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.color}`}
    >
      {config.icon}
      <span className="capitalize">{status}</span>
    </div>
  );
}
