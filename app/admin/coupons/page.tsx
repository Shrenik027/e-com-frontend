"use client";

import { useEffect, useState } from "react";
import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
} from "@/services/adminCoupons";
import {
  Tag,
  Plus,
  Percent,
  DollarSign,
  ShoppingCart,
  Calendar,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Copy,
  TrendingDown,
} from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState({
    code: "",
    discountType: "percent",
    discountValue: "",
    minCartAmount: "",
    maxDiscount: "",
    expiresAt: "",
  });

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const data = await getAllCoupons();
      setCoupons(data.coupons || []);
    } catch {
      alert("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCoupon({
        code: form.code.toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minCartAmount: form.minCartAmount
          ? Number(form.minCartAmount)
          : undefined,
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
        expiresAt: form.expiresAt,
      });

      // Reset form
      setForm({
        code: "",
        discountType: "percent",
        discountValue: "",
        minCartAmount: "",
        maxDiscount: "",
        expiresAt: "",
      });

      loadCoupons();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to create coupon");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this coupon? This action cannot be undone."
      )
    )
      return;

    try {
      setDeletingId(id);
      await deleteCoupon(id);
      await loadCoupons();
    } catch {
      alert("Failed to delete coupon");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter coupons
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const now = new Date();
    const expiresAt = new Date(coupon.expiresAt);
    const isActive = expiresAt > now;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && isActive) ||
      (statusFilter === "expired" && !isActive);

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const now = new Date();
  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => new Date(c.expiresAt) > now).length,
    expired: coupons.filter((c) => new Date(c.expiresAt) <= now).length,
    percent: coupons.filter((c) => c.discountType === "percent").length,
    flat: coupons.filter((c) => c.discountType === "flat").length,
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
              Loading Coupons
            </h3>
            <p className="text-muted">Fetching discount coupons...</p>
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
            Coupon Management
          </h1>
          <p className="text-muted mt-2">
            Create and manage discount coupons for your store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadCoupons}
            disabled={loading}
            className="p-2.5 bg-background-tertiary border border-theme rounded-lg text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors disabled:opacity-50"
            title="Refresh coupons"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Tag className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.total}
            </span>
          </div>
          <p className="text-xs text-muted">Total Coupons</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-[#22C55E]/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.active}
            </span>
          </div>
          <p className="text-xs text-muted">Active</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.expired}
            </span>
          </div>
          <p className="text-xs text-muted">Expired</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Percent className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.percent}
            </span>
          </div>
          <p className="text-xs text-muted">Percentage</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-cyan-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.flat}
            </span>
          </div>
          <p className="text-xs text-muted">Flat Discount</p>
        </div>
      </div>

      {/* Create Coupon Form */}
      <div className="bg-background-secondary rounded-2xl border border-theme p-6">
        <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Coupon
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Code */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Coupon Code *
                </div>
              </label>
              <input
                placeholder="SUMMER25"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent uppercase"
                required
              />
            </div>

            {/* Discount Type */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Discount Type *
                </div>
              </label>
              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm({ ...form, discountType: e.target.value })
                }
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              >
                <option value="percent">Percentage</option>
                <option value="flat">Flat Amount</option>
              </select>
            </div>

            {/* Discount Value */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  {form.discountType === "percent" ? (
                    <Percent className="w-4 h-4" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                  Discount Value *
                </div>
              </label>
              <input
                type="number"
                placeholder={form.discountType === "percent" ? "25" : "100"}
                value={form.discountValue}
                onChange={(e) =>
                  setForm({ ...form, discountValue: e.target.value })
                }
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                required
                min="0"
                step={form.discountType === "percent" ? "0.01" : "1"}
              />
            </div>

            {/* Minimum Cart Amount */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Minimum Cart Amount
                </div>
                <span className="text-xs text-muted font-normal">Optional</span>
              </label>
              <input
                type="number"
                placeholder="500"
                value={form.minCartAmount}
                onChange={(e) =>
                  setForm({ ...form, minCartAmount: e.target.value })
                }
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                min="0"
              />
            </div>

            {/* Maximum Discount */}
            {form.discountType === "percent" && (
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Maximum Discount
                  </div>
                  <span className="text-xs text-muted font-normal">
                    Optional
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="200"
                  value={form.maxDiscount}
                  onChange={(e) =>
                    setForm({ ...form, maxDiscount: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                  min="0"
                />
              </div>
            )}

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Expiry Date *
                </div>
              </label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) =>
                  setForm({ ...form, expiresAt: e.target.value })
                }
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-theme">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              Create Coupon
            </button>
          </div>
        </form>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-background-secondary rounded-xl border border-theme p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                placeholder="Search coupons by code..."
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
                <option value="active">Active Only</option>
                <option value="expired">Expired Only</option>
              </select>
            </div>
            <div className="text-sm text-muted">
              Showing {filteredCoupons.length} of {coupons.length} coupons
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-background-secondary rounded-xl border border-theme overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-tertiary">
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Coupon Code
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Discount
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Requirements
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Expiry
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <Tag className="w-16 h-16 text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No coupons found
                      </h3>
                      <p className="text-muted">
                        {searchTerm || statusFilter !== "all"
                          ? "No coupons match your search criteria"
                          : "Create your first coupon to get started"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => {
                  const now = new Date();
                  const expiresAt = new Date(coupon.expiresAt);
                  const isActive = expiresAt > now;

                  return (
                    <tr
                      key={coupon._id}
                      className="hover:bg-background-tertiary/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isActive
                                ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                                : "bg-gray-500/10 text-gray-500"
                            }`}
                          >
                            <Tag className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-mono font-bold text-lg text-primary">
                              {coupon.code}
                            </div>
                            <div className="text-xs text-muted">
                              ID: {coupon._id.slice(-8).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xl text-primary">
                              {coupon.discountType === "percent"
                                ? `${coupon.discountValue}%`
                                : `₹${coupon.discountValue}`}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded-full">
                              {coupon.discountType === "percent"
                                ? "Percentage"
                                : "Flat"}
                            </span>
                          </div>
                          {coupon.maxDiscount &&
                            coupon.discountType === "percent" && (
                              <div className="text-xs text-muted">
                                Max: ₹{coupon.maxDiscount}
                              </div>
                            )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          {coupon.minCartAmount ? (
                            <div className="flex items-center gap-2 text-sm">
                              <ShoppingCart className="w-4 h-4 text-muted" />
                              <span className="text-primary">
                                Min: ₹{coupon.minCartAmount}
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm text-muted">No minimum</div>
                          )}
                          <div className="text-xs text-muted">
                            Created:{" "}
                            {new Date(coupon.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted" />
                          <div>
                            <div className="text-sm font-medium text-primary">
                              {new Date(coupon.expiresAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted">
                              {Math.ceil(
                                (expiresAt.getTime() - now.getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days left
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            isActive
                              ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                              : "bg-red-500/10 text-red-600 border-red-500/20"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Expired
                            </>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(coupon.code);
                              alert(`Copied: ${coupon.code}`);
                            }}
                            className="p-2 text-[#38BDF8] hover:text-[#60A5FA] hover:bg-[#38BDF8]/10 rounded-lg transition-colors"
                            title="Copy code"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(coupon._id)}
                            disabled={deletingId === coupon._id}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete coupon"
                          >
                            {deletingId === coupon._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
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
