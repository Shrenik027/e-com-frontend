"use client";

import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "@/services/adminProducts";
import Link from "next/link";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    )
      return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    if (!product) return false;
    const name = product.name?.toLowerCase() || "";
    const id = product._id?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return name.includes(search) || id.includes(search);
  });

  // Calculate stats from actual data
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p?.stock > 0).length;
  const outOfStockProducts = products.filter((p) => p?.stock <= 0).length;

  // Calculate total inventory value from actual data
  const totalInventoryValue = products.reduce((sum, p) => {
    const price = p?.price || 0;
    const stock = p?.stock || 0;
    return sum + price * stock;
  }, 0);

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
              Loading Products
            </h3>
            <p className="text-muted">Fetching your product catalog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Product Management
          </h1>
          <p className="text-muted mt-2">
            Manage your product catalog, inventory, and pricing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadProducts}
            disabled={loading}
            className="p-2.5 bg-background-tertiary border border-theme rounded-lg text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors disabled:opacity-50"
            title="Refresh products"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid - Only from actual data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-500/10 rounded-lg">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            {totalProducts}
          </p>
          <p className="text-sm text-muted">Total Products</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-[#22C55E]/10 rounded-lg">
              <Package className="w-6 h-6 text-[#22C55E]" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            {inStockProducts}
          </p>
          <p className="text-sm text-muted">In Stock</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            {outOfStockProducts}
          </p>
          <p className="text-sm text-muted">Out of Stock</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-[#F59E0B]/10 rounded-lg">
              <span className="text-2xl font-bold text-[#F59E0B]">₹</span>
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            ₹{totalInventoryValue.toLocaleString()}
          </p>
          <p className="text-sm text-muted">Inventory Value</p>
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
                placeholder="Search products by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-background-secondary rounded-xl border border-theme overflow-hidden">
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
                  Stock
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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <Package className="w-16 h-16 text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {searchTerm ? "No products found" : "No products yet"}
                      </h3>
                      <p className="text-muted mb-6">
                        {searchTerm
                          ? "No products match your search. Try a different term."
                          : "Get started by adding your first product."}
                      </p>
                      <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Plus className="w-5 h-5" />
                        Add First Product
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-background-tertiary/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {product.images &&
                        product.images.length > 0 &&
                        product.images[0] ? (
                          <div className="w-12 h-12 bg-background-tertiary rounded-lg overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name || "Product image"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.parentElement!.innerHTML = `
                                  <div class="w-12 h-12 bg-background-tertiary rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-background-tertiary rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-primary hover:text-[#F59E0B] transition-colors">
                            <Link href={`/admin/products/${product._id}`}>
                              {product.name || "Unnamed Product"}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted mt-1">
                            ID: {product._id?.slice(-8).toUpperCase() || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-lg text-primary">
                        ₹{(product.price || 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            (product.stock || 0) > 20
                              ? "bg-[#22C55E]/10 text-[#22C55E]"
                              : (product.stock || 0) > 0
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {product.stock || 0} units
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          (product.stock || 0) > 0
                            ? "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
                            : "bg-red-500/10 text-red-600 border border-red-500/20"
                        }`}
                      >
                        {(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product._id}`}
                          target="_blank"
                          className="p-2 text-[#38BDF8] hover:text-[#60A5FA] hover:bg-[#38BDF8]/10 rounded-lg transition-colors"
                          title="View product"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="p-2 text-[#F59E0B] hover:text-[#F97316] hover:bg-[#F59E0B]/10 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deletingId === product._id}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete product"
                        >
                          {deletingId === product._id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Stats - Only actual data */}
      <div className="text-sm text-muted text-center">
        <p>
          Last updated:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {products.length > 0 && (
          <p className="mt-1">
            {inStockProducts} in stock • {outOfStockProducts} out of stock •
            Total inventory value: ₹{totalInventoryValue.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
