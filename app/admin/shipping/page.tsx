"use client";

import { useEffect, useState } from "react";
import {
  getAllShippingMethodsAdmin,
  createShippingMethod,
  deleteShippingMethod,
} from "@/services/adminShipping";
import {
  Truck,
  Package,
  Plus,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  Loader2,
  AlertCircle,
  TrendingUp,
  Timer,
  Activity,
} from "lucide-react";

export default function AdminShippingPage() {
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    estimatedDays: "",
    isActive: true,
  });

  const loadMethods = async () => {
    try {
      setLoading(true);
      const data = await getAllShippingMethodsAdmin();
      setMethods(data.methods || []);
    } catch {
      alert("Failed to load shipping methods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMethods();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.estimatedDays) {
      alert("All fields are required");
      return;
    }

    try {
      setCreating(true);
      await createShippingMethod({
        name: form.name,
        price: Number(form.price),
        estimatedDays: Number(form.estimatedDays),
        isActive: form.isActive,
      });

      // Reset form
      setForm({
        name: "",
        price: "",
        estimatedDays: "",
        isActive: true,
      });

      loadMethods();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to create shipping method");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this shipping method? This action cannot be undone."
      )
    )
      return;

    try {
      setDeletingId(id);
      await deleteShippingMethod(id);
      await loadMethods();
    } catch {
      alert("Failed to delete shipping method");
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate stats
  const stats = {
    total: methods.length,
    active: methods.filter((m) => m.isActive).length,
    inactive: methods.filter((m) => !m.isActive).length,
    avgPrice:
      methods.length > 0
        ? methods.reduce((sum, m) => sum + m.price, 0) / methods.length
        : 0,
    avgDays:
      methods.length > 0
        ? methods.reduce((sum, m) => sum + m.estimatedDays, 0) / methods.length
        : 0,
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
              Loading Shipping Methods
            </h3>
            <p className="text-muted">Fetching shipping options...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Shipping Methods
          </h1>
          <p className="text-muted mt-2">
            Configure shipping options and delivery timelines
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadMethods}
            disabled={loading}
            className="p-2.5 bg-background-tertiary border border-theme rounded-lg text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors disabled:opacity-50"
            title="Refresh shipping methods"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Truck className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.total}
            </span>
          </div>
          <p className="text-xs text-muted">Total Methods</p>
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
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.avgDays.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-muted">Avg. Days</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-primary">
              ₹{stats.avgPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted">Avg. Price</p>
        </div>
      </div>

      {/* Create Shipping Method Form */}
      <div className="bg-background-secondary rounded-2xl border border-theme p-6">
        <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Shipping Method
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Method Name *
                </div>
              </label>
              <input
                placeholder="Standard Shipping"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price (₹) *
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Estimated Days */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Estimated Days *
                </div>
              </label>
              <input
                type="number"
                placeholder="3-5"
                value={form.estimatedDays}
                onChange={(e) =>
                  setForm({ ...form, estimatedDays: e.target.value })
                }
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                required
                min="1"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Status *
                </div>
              </label>
              <select
                value={String(form.isActive)}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.value === "true" })
                }
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-theme">
            <button
              type="submit"
              disabled={creating}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full md:w-auto"
            >
              {creating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Shipping Method
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Shipping Methods List */}
      <div className="bg-background-secondary rounded-2xl border border-theme overflow-hidden">
        <div className="p-6 border-b border-theme">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">
              Shipping Methods ({methods.length})
            </h2>
            <div className="text-sm text-muted">
              {stats.active} active, {stats.inactive} inactive
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-tertiary">
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Shipping Method
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Price
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Delivery Time
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
              {methods.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <Truck className="w-16 h-16 text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No shipping methods
                      </h3>
                      <p className="text-muted">
                        Add your first shipping method to get started
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                methods.map((method) => (
                  <tr
                    key={method._id}
                    className="hover:bg-background-tertiary/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-lg ${
                            method.isActive
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary">
                            {method.name}
                          </div>
                          <div className="text-xs text-muted mt-1">
                            ID: {method._id?.slice(-8).toUpperCase() || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted" />
                        <span className="font-bold text-lg text-primary">
                          ₹{method.price}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted" />
                        <div>
                          <span className="font-medium text-primary">
                            {method.estimatedDays} days
                          </span>
                          <div className="text-xs text-muted">
                            {method.estimatedDays === 1
                              ? "Next day"
                              : `${method.estimatedDays}-${
                                  method.estimatedDays + 2
                                } business days`}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          method.isActive
                            ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                            : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                        }`}
                      >
                        {method.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Inactive
                          </>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(method._id)}
                        disabled={deletingId === method._id}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete shipping method"
                      >
                        {deletingId === method._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Footer */}
      <div className="bg-background-secondary rounded-xl border border-theme p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-primary mb-1">
              Shipping Method Information
            </h4>
            <p className="text-xs text-muted">
              • Active shipping methods are available to customers at checkout
              <br />
              • Inactive methods are hidden from customers
              <br />
              • Estimated days represent delivery timeframes
              <br />• Deleting a shipping method cannot be undone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
