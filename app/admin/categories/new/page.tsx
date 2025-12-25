"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/services/adminCategories";
import {
  ArrowLeft,
  Save,
  FolderPlus,
  Tag,
  FileText,
  Image as ImageIcon,
  Layers,
  Loader2,
  AlertCircle,
  Upload,
} from "lucide-react";

type CategoryForm = {
  name: string;
  description: string;
  image: string;
  parent: string;
};

export default function NewCategoryPage() {
  const router = useRouter();

  const [form, setForm] = useState<CategoryForm>({
    name: "",
    description: "",
    image: "",
    parent: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  /* --------------------
     HANDLERS
  -------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      setLoading(true);

      await createCategory({
        name: form.name.trim(),
        description: form.description || undefined,
        image: form.image || undefined,
        parent: form.parent || null,
      });

      router.push("/admin/categories");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-background-tertiary text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">
              Create Category
            </h1>
            <p className="text-muted mt-2">
              Add a new product category or subcategory
            </p>
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
              placeholder="Enter category name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              disabled={loading}
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
              <span className="text-xs text-muted font-normal">Optional</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe this category (optional)"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Category Image
              </div>
              <span className="text-xs text-muted font-normal">
                Optional - Provide a URL for the category image
              </span>
            </label>
            <input
              name="image"
              placeholder="https://example.com/category-image.jpg"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              disabled={loading}
            />
            {form.image && (
              <div className="mt-3 p-3 bg-background-tertiary rounded-lg border border-theme">
                <p className="text-xs text-muted mb-2">Image Preview:</p>
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-background-tertiary">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <svg class="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Parent Category
              </div>
              <span className="text-xs text-muted font-normal">
                Optional - Leave empty for main category
              </span>
            </label>
            <input
              name="parent"
              placeholder="Parent Category ID (optional)"
              value={form.parent}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              disabled={loading}
            />
            <p className="text-xs text-muted mt-2">
              Note: For now, use category ID. Will be replaced with dropdown in
              future.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            disabled={loading}
            className="px-6 py-3 bg-background-tertiary border border-theme text-primary font-semibold rounded-xl hover:bg-background-tertiary/80 transition-colors w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FolderPlus className="w-5 h-5" />
                Create Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
