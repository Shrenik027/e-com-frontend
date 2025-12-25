"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCategories, deleteCategory } from "@/services/adminCategories";
import {
  Layers,
  FolderPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  FolderTree,
  Folder,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Eye,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data.categories || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? Products in this category may be affected."
      )
    )
      return;

    try {
      setDeletingId(id);
      await deleteCategory(id);
      await loadCategories();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "parent" && !cat.parent) ||
      (typeFilter === "subcategory" && cat.parent);

    return matchesSearch && matchesType;
  });

  // Calculate stats
  const stats = {
    total: categories.length,
    parent: categories.filter((c) => !c.parent).length,
    subcategory: categories.filter((c) => c.parent).length,
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
              Loading Categories
            </h3>
            <p className="text-muted">Fetching your product categories...</p>
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
            Category Management
          </h1>
          <p className="text-muted mt-2">
            Organize products into categories and subcategories
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadCategories}
            disabled={loading}
            className="p-2.5 bg-background-tertiary border border-theme rounded-lg text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors disabled:opacity-50"
            title="Refresh categories"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/categories/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <FolderPlus className="w-5 h-5" />
            New Category
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-500/10 rounded-lg">
              <Layers className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            {stats.total}
          </p>
          <p className="text-sm text-muted">Total Categories</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-500/10 rounded-lg">
              <FolderTree className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            {stats.parent}
          </p>
          <p className="text-sm text-muted">Parent Categories</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-green-500/10 rounded-lg">
              <Folder className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">
            {stats.subcategory}
          </p>
          <p className="text-sm text-muted">Subcategories</p>
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
                placeholder="Search categories by name..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="parent">Parent Only</option>
                <option value="subcategory">Subcategory Only</option>
              </select>
            </div>
            <div className="text-sm text-muted">
              Showing {filteredCategories.length} of {categories.length}{" "}
              categories
            </div>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-background-secondary rounded-xl border border-theme overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-tertiary">
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Category
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Type
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Description
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <Layers className="w-16 h-16 text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No categories found
                      </h3>
                      <p className="text-muted mb-6">
                        {searchTerm || typeFilter !== "all"
                          ? "No categories match your search criteria"
                          : "Get started by creating your first category"}
                      </p>
                      <Link
                        href="/admin/categories/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <FolderPlus className="w-5 h-5" />
                        Create First Category
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="hover:bg-background-tertiary/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {cat.image ? (
                          <div className="w-12 h-12 bg-background-tertiary rounded-lg overflow-hidden">
                            <img
                              src={cat.image}
                              alt={cat.name}
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
                            <Layers className="w-6 h-6 text-muted" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-primary hover:text-[#F59E0B] transition-colors">
                            <Link href={`/admin/categories/${cat._id}`}>
                              {cat.name}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted mt-1">
                            ID: {cat._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          cat.parent
                            ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                            : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                        }`}
                      >
                        {cat.parent ? (
                          <>
                            <Folder className="w-3 h-3" />
                            Subcategory
                          </>
                        ) : (
                          <>
                            <FolderTree className="w-3 h-3" />
                            Parent Category
                          </>
                        )}
                      </div>
                      {cat.parent && (
                        <p className="text-xs text-muted mt-1">
                          Parent: {cat.parent}
                        </p>
                      )}
                    </td>

                    <td className="p-4">
                      <p className="text-sm text-secondary line-clamp-2">
                        {cat.description || "No description"}
                      </p>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/categories/${cat._id}`}
                          className="p-2 text-[#F59E0B] hover:text-[#F97316] hover:bg-[#F59E0B]/10 rounded-lg transition-colors"
                          title="Edit category"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          disabled={deletingId === cat._id}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete category"
                        >
                          {deletingId === cat._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
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
    </div>
  );
}
