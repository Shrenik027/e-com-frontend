"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getUserById,
  getUserOrders,
  toggleUserStatus,
  updateUserRole,
} from "@/services/adminUsers";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  ShieldAlert,
  UserCheck,
  UserX,
  MapPin,
  ShoppingBag,
  Calendar,
  Clock,
  DollarSign,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Loader2,
  Home,
  Phone,
  Edit,
  AlertCircle,
} from "lucide-react";

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, orderData] = await Promise.all([
        getUserById(id),
        getUserOrders(id),
      ]);

      setUser(userData);
      setOrders(orderData.orders || []);
    } catch (err) {
      console.error("Failed to load user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleRoleChange = async (role: "user" | "admin") => {
    try {
      setUpdating(true);
      await updateUserRole(id, role);
      await loadData();
    } catch {
      alert("Failed to update user role");
    } finally {
      setUpdating(false);
    }
  };

  const handleBlockToggle = async () => {
    try {
      setUpdating(true);
      await toggleUserStatus(id);
      await loadData();
    } catch {
      alert("Failed to update user status");
    } finally {
      setUpdating(false);
    }
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
              Loading User
            </h3>
            <p className="text-muted">
              Fetching user details and order history...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <UserX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">
            User Not Found
          </h3>
          <p className="text-muted mb-6">
            The requested user could not be found
          </p>
          <button
            onClick={() => router.push("/admin/users")}
            className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  // Calculate user stats
  const userStats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue:
      orders.length > 0
        ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length
        : 0,
    pendingOrders: orders.filter(
      (o) => !["delivered", "cancelled"].includes(o.orderStatus)
    ).length,
    completedOrders: orders.filter((o) => o.orderStatus === "delivered").length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/users")}
            className="p-2 rounded-lg bg-background-tertiary text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">
              User Details
            </h1>
            <p className="text-muted mt-1">
              User ID: {id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              user.isActive
                ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                : "bg-red-500/10 text-red-600 border-red-500/20"
            }`}
          >
            {user.isActive ? "Active Account" : "Blocked Account"}
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              user.role === "admin"
                ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                : "bg-blue-500/10 text-blue-600 border-blue-500/20"
            }`}
          >
            {user.role === "admin" ? "Administrator" : "Regular User"}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Card */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-white">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted">Member since</p>
                  <p className="text-sm font-medium text-primary">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-primary">
                    {user.name || "Unnamed User"}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBlockToggle}
                      disabled={updating}
                      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-opacity disabled:opacity-50 ${
                        user.isActive
                          ? "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                          : "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                      }`}
                    >
                      {updating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : user.isActive ? (
                        <>
                          <UserX className="w-4 h-4" />
                          Block User
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Unblock User
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted" />
                      <div>
                        <p className="text-sm text-muted">Email</p>
                        <p className="font-medium text-primary">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted" />
                      <div>
                        <p className="text-sm text-muted">Role</p>
                        <div className="flex items-center gap-2">
                          <select
                            value={user.role}
                            disabled={updating}
                            onChange={(e) =>
                              handleRoleChange(
                                e.target.value as "user" | "admin"
                              )
                            }
                            className="px-3 py-1.5 bg-background-tertiary border border-theme rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent disabled:opacity-50"
                          >
                            <option value="user">Regular User</option>
                            <option value="admin">Administrator</option>
                          </select>
                          {updating && (
                            <Loader2 className="w-4 h-4 animate-spin text-[#F59E0B]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted" />
                      <div>
                        <p className="text-sm text-muted">Joined</p>
                        <p className="font-medium text-primary">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted" />
                      <div>
                        <p className="text-sm text-muted">Last Updated</p>
                        <p className="font-medium text-primary">
                          {user.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString()
                            : "Never"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background-secondary rounded-xl border border-theme p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-lg font-bold text-primary">
                  {userStats.totalOrders}
                </span>
              </div>
              <p className="text-xs text-muted">Total Orders</p>
            </div>

            <div className="bg-background-secondary rounded-xl border border-theme p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-[#22C55E]" />
                </div>
                <span className="text-lg font-bold text-primary">
                  ₹{userStats.totalSpent.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted">Total Spent</p>
            </div>

            <div className="bg-background-secondary rounded-xl border border-theme p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-purple-500" />
                </div>
                <span className="text-lg font-bold text-primary">
                  ₹{userStats.avgOrderValue.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted">Avg. Order Value</p>
            </div>

            <div className="bg-background-secondary rounded-xl border border-theme p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="text-lg font-bold text-primary">
                  {userStats.pendingOrders}
                </span>
              </div>
              <p className="text-xs text-muted">Pending Orders</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Addresses
              </h2>
              <span className="text-sm text-muted">
                {user.addresses?.length || 0} addresses
              </span>
            </div>

            {user.addresses?.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-theme rounded-xl">
                <MapPin className="w-12 h-12 text-muted mx-auto mb-3" />
                <p className="text-muted">No addresses saved</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses?.map((addr: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      addr.isDefault
                        ? "border-[#F59E0B] bg-[#F59E0B]/5"
                        : "border-theme bg-background-tertiary"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted" />
                        <span className="text-sm font-semibold text-primary">
                          Address {idx + 1}
                        </span>
                      </div>
                      {addr.isDefault && (
                        <span className="px-2 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-semibold rounded-full">
                          Default
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-primary">{addr.street}</p>
                      <p className="text-primary">
                        {addr.city}, {addr.state} - {addr.zipCode}
                      </p>
                      <p className="text-primary">{addr.country}</p>
                      {addr.phone && (
                        <p className="text-primary flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {addr.phone}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Orders */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <div className="bg-background-secondary rounded-2xl border border-theme overflow-hidden">
            <div className="p-6 border-b border-theme">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Recent Orders ({orders.length})
              </h3>
            </div>

            <div className="divide-y divide-theme">
              {orders.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 text-muted mx-auto mb-3" />
                  <p className="text-muted">No orders yet</p>
                </div>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <Link
                    key={order._id}
                    href={`/admin/orders/${order._id}`}
                    className="block p-4 hover:bg-background-tertiary/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-sm font-semibold text-primary group-hover:text-[#F59E0B]">
                        #{order._id.slice(-8).toUpperCase()}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === "delivered"
                            ? "bg-[#22C55E]/10 text-[#22C55E]"
                            : order.orderStatus === "cancelled"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="font-bold text-primary">₹{order.total}</p>
                    </div>
                  </Link>
                ))
              )}

              {orders.length > 5 && (
                <div className="p-4 text-center border-t border-theme">
                  <Link
                    href="/admin/orders"
                    className="text-sm font-semibold text-[#F59E0B] hover:text-[#F97316] transition-colors"
                  >
                    View all {orders.length} orders →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Order Status Breakdown */}
          {orders.length > 0 && (
            <div className="bg-background-secondary rounded-2xl border border-theme p-6">
              <h3 className="text-sm font-semibold text-primary mb-3">
                Order Status
              </h3>
              <div className="space-y-3">
                {[
                  {
                    status: "Placed",
                    count: orders.filter((o) => o.orderStatus === "placed")
                      .length,
                    color: "bg-yellow-500",
                  },
                  {
                    status: "Confirmed",
                    count: orders.filter((o) => o.orderStatus === "confirmed")
                      .length,
                    color: "bg-blue-500",
                  },
                  {
                    status: "Shipped",
                    count: orders.filter((o) => o.orderStatus === "shipped")
                      .length,
                    color: "bg-[#38BDF8]",
                  },
                  {
                    status: "Delivered",
                    count: orders.filter((o) => o.orderStatus === "delivered")
                      .length,
                    color: "bg-[#22C55E]",
                  },
                  {
                    status: "Cancelled",
                    count: orders.filter((o) => o.orderStatus === "cancelled")
                      .length,
                    color: "bg-red-500",
                  },
                ].map((stat) => (
                  <div
                    key={stat.status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${stat.color}`}
                      ></div>
                      <span className="text-sm text-muted">{stat.status}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {stat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
