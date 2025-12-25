"use client";

import { useEffect, useState } from "react";
import { fetchAdminDashboard } from "@/services/adminDashboard";
import { useRouter } from "next/navigation";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

type DashboardData = {
  totals: {
    users: number;
    orders: number;
    products: number;
    revenue: number;
  };
  orderStatusStats: { _id: string; count: number }[];
  recentOrders: any[];
};

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = () => {
    setRefreshing(true);
    fetchAdminDashboard()
      .then((res) => {
        console.log("DASHBOARD RAW:", res);
        setData(res);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#F59E0B]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Loading Dashboard
            </h3>
            <p className="text-muted">Fetching your store analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center max-w-md p-8 space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-primary">
              Unable to Load Dashboard
            </h3>
            <p className="text-muted">
              We couldn't fetch your store data. This might be a temporary
              issue.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-background-tertiary border border-theme text-primary font-semibold rounded-lg hover:bg-background-tertiary/80 transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={loadData}
              disabled={refreshing}
              className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {refreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { totals, orderStatusStats, recentOrders } = data;
  const revenueGrowth = 18.5; // Mock growth percentage for UI

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Dashboard Overview
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 rounded-full">
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm font-semibold text-[#22C55E]">
                +{revenueGrowth}% revenue growth
              </span>
            </div>
            <button
              onClick={loadData}
              disabled={refreshing}
              className="p-2 text-muted hover:text-primary hover:bg-background-tertiary rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
        <div className="text-sm text-muted">
          Last updated:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Users"
          value={totals.users.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          trend="+12.5%"
          trendPositive={true}
          color="blue"
        />
        <MetricCard
          label="Total Orders"
          value={totals.orders.toLocaleString()}
          icon={<ShoppingCart className="w-5 h-5" />}
          trend="+24.3%"
          trendPositive={true}
          color="purple"
        />
        <MetricCard
          label="Products"
          value={totals.products.toLocaleString()}
          icon={<Package className="w-5 h-5" />}
          trend="+5.2%"
          trendPositive={true}
          color="green"
        />
        <MetricCard
          label="Total Revenue"
          value={`₹${totals.revenue.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+18.5%"
          trendPositive={true}
          color="orange"
        />
      </div>

      {/* Order Status & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary rounded-2xl border border-theme p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-primary">
                Order Status
              </h2>
              <span className="text-xs text-muted">Live count</span>
            </div>
            <div className="space-y-4">
              {orderStatusStats.map((stat) => (
                <div
                  key={stat._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background-tertiary hover:bg-background-tertiary/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon status={stat._id} />
                    <span className="font-medium text-primary">
                      {capitalize(stat._id)}
                    </span>
                  </div>
                  <span className="font-bold text-lg text-primary">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-background-secondary rounded-2xl border border-theme overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-theme flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">
                Recent Orders
              </h2>
              <button
                onClick={() => router.push("/admin/orders")}
                className="text-sm font-semibold text-[#F59E0B] hover:text-[#F97316] transition-colors flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="min-w-full">
                <div className="px-6 py-4 grid grid-cols-12 gap-4 bg-background-tertiary">
                  <div className="col-span-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Order ID
                  </div>
                  <div className="col-span-2 text-xs font-semibold text-muted uppercase tracking-wider">
                    Status
                  </div>
                  <div className="col-span-2 text-xs font-semibold text-muted uppercase tracking-wider">
                    Payment
                  </div>
                  <div className="col-span-2 text-xs font-semibold text-muted uppercase tracking-wider">
                    Total
                  </div>
                  <div className="col-span-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Date
                  </div>
                </div>
                <div className="divide-y divide-theme">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="px-6 py-4 grid grid-cols-12 gap-4 hover:bg-background-tertiary/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/admin/orders/${order._id}`)}
                    >
                      <div className="col-span-3">
                        <div className="font-mono text-sm font-semibold text-primary hover:text-[#F59E0B] transition-colors">
                          #{order._id.slice(-8).toUpperCase()}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <StatusBadge status={order.orderStatus} />
                      </div>
                      <div className="col-span-2">
                        <PaymentBadge status={order.paymentStatus} />
                      </div>
                      <div className="col-span-2 font-semibold text-primary">
                        ₹{order.total}
                      </div>
                      <div className="col-span-3 text-sm text-secondary">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {recentOrders.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <ShoppingCart className="w-16 h-16 text-muted mb-4" />
                <p className="text-muted">No recent orders</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 rounded-xl p-4 border border-[#F59E0B]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Avg. Order Value</p>
              <p className="text-2xl font-bold text-primary">₹1,245</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#38BDF8]/10 to-[#60A5FA]/10 rounded-xl p-4 border border-[#38BDF8]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Conversion Rate</p>
              <p className="text-2xl font-bold text-primary">3.4%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#38BDF8]" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/10 rounded-xl p-4 border border-[#22C55E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Satisfaction</p>
              <p className="text-2xl font-bold text-primary">94.7%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#22C55E]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   UI COMPONENTS ONLY
======================= */

function MetricCard({
  label,
  value,
  icon,
  trend,
  trendPositive,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendPositive: boolean;
  color: "blue" | "purple" | "green" | "orange";
}) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-[#F59E0B] to-[#F97316]",
  };

  return (
    <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-[#F59E0B]/30 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}
        >
          {icon}
        </div>
        <div
          className={`text-sm font-semibold ${
            trendPositive ? "text-[#22C55E]" : "text-red-500"
          }`}
        >
          {trend}
        </div>
      </div>
      <p className="text-3xl lg:text-4xl font-bold text-primary mb-1">
        {value}
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  const getIcon = () => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "processing":
        return <RefreshCw className="w-4 h-4 text-purple-500" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-[#38BDF8]" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-[#22C55E]" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div
      className={`p-2 rounded-lg ${
        status.toLowerCase() === "pending"
          ? "bg-yellow-500/10"
          : status.toLowerCase() === "confirmed"
          ? "bg-blue-500/10"
          : status.toLowerCase() === "processing"
          ? "bg-purple-500/10"
          : status.toLowerCase() === "shipped"
          ? "bg-[#38BDF8]/10"
          : status.toLowerCase() === "delivered"
          ? "bg-[#22C55E]/10"
          : "bg-gray-500/10"
      }`}
    >
      {getIcon()}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "processing":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "shipped":
        return "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20";
      case "delivered":
        return "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20";
    }
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
        status
      )}`}
    >
      {capitalize(status)}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const getPaymentStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20";
    }
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPaymentStyle(
        status
      )}`}
    >
      {capitalize(status)}
    </span>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
