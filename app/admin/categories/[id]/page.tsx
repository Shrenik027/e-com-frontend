"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategoryById, updateCategory } from "@/services/adminCategories";
import {
  ArrowLeft,
  Save,
  Folder,
  Tag,
  FileText,
  Image as ImageIcon,
  Layers,
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
} from "lucide-react";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategoryById(id as string)
      .then((data) => {
        setForm(data);
      })
      .catch(() => {
        setError("Failed to load category");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setSaving(true);
      await updateCategory(id as string, form);
      router.push("/admin/categories");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
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
              Loading Category
            </h3>
            <p className="text-muted">Fetching category details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">
            Category Not Found
          </h3>
          <p className="text-muted mb-6">
            The requested category could not be found
          </p>
          <button
            onClick={() => router.push("/admin/categories")}
            className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.push("/admin/categories")}
            className="p-2 rounded-lg bg-background-tertiary text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">
              Edit Category
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-muted">Category ID:</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  form.parent
                    ? "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                    : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                }`}
              >
                {form.parent ? "Subcategory" : "Main Category"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-background-secondary rounded-2xl border border-theme p-6 space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category Name *
                  </div>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </div>
                </label>
                <textarea
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent resize-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Category Image URL
                  </div>
                </label>
                <input
                  name="image"
                  value={form.image || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin/categories")}
                disabled={saving}
                className="px-6 py-3 bg-background-tertiary border border-theme text-primary font-semibold rounded-xl hover:bg-background-tertiary/80 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Category
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Category Info */}
        <div className="space-y-6">
          {/* Category Details */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h3 className="text-sm font-semibold text-primary mb-4">
              Category Details
            </h3>

            <div className="space-y-4">
              {form.image && (
                <div>
                  <p className="text-xs text-muted mb-2">Image Preview</p>
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-background-tertiary">
                    <img
                      src={form.image}
                      alt={form.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <svg class="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Category Type</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      form.parent
                        ? "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                        : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                    }`}
                  >
                    {form.parent ? "Subcategory" : "Main Category"}
                  </span>
                </div>

                {form.parent && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">
                      Parent Category ID
                    </span>
                    <span className="text-sm font-mono text-primary">
                      {form.parent.slice(-8)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Created</span>
                  <span className="text-sm text-primary">
                    {form.createdAt
                      ? new Date(form.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Last Updated</span>
                  <span className="text-sm text-primary">
                    {form.updatedAt
                      ? new Date(form.updatedAt).toLocaleDateString()
                      : "Never"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Values */}
          <div className="bg-background-secondary rounded-2xl border border-theme p-6">
            <h3 className="text-sm font-semibold text-primary mb-4">
              Current Values
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted mb-1">Current Name</p>
                <p className="font-medium text-primary">{form.name}</p>
              </div>

              <div>
                <p className="text-xs text-muted mb-1">Current Description</p>
                <p className="text-sm text-secondary">
                  {form.description || "No description set"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted mb-1">Current Image</p>
                <p className="text-sm text-secondary truncate">
                  {form.image ? "Image URL set" : "No image set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
