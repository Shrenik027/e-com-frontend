"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";
import { getProductById, updateProduct } from "@/services/adminProducts";
import {
  ArrowLeft,
  Save,
  Package,
  DollarSign,
  Hash,
  Percent,
  LayoutGrid,
  Briefcase,
  Loader2,
  AlertCircle,
  FileText,
  Tag,
} from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    discount: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  /* --------------------
     LOAD PRODUCT + META
  -------------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [product, catRes, brandRes] = await Promise.all([
          getProductById(id),
          API.get("/categories"),
          API.get("/brands"),
        ]);

        setCurrentProduct(product);

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          stock: product.stock?.toString() || "",
          discount: product.discount?.toString() || "",
          category: product.category?._id || "",
          brand: product.brand?._id || "",
        });

        setCategories(catRes.data.categories || []);
        setBrands(brandRes.data.brands || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  /* --------------------
     INPUT HANDLER
  -------------------- */
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  /* --------------------
     SUBMIT UPDATE
  -------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !form.name ||
      !form.price ||
      !form.stock ||
      !form.category ||
      !form.brand
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);

      await updateProduct(id, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        discount: Number(form.discount) || 0,
      });

      router.push("/admin/products");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to update product");
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
              Loading Product
            </h3>
            <p className="text-muted">Fetching product details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
          <div className="text-sm text-muted">
            Product ID: {id?.slice(-8).toUpperCase()}
          </div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
          Edit Product
        </h1>
        <p className="text-muted">
          Update the details for {currentProduct?.name || "this product"}
        </p>
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
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-background-secondary rounded-2xl border border-theme p-6 space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Product Name *
                  </div>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description *
                  </div>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent resize-none"
                  placeholder="Describe the product features, benefits, and specifications"
                  required
                />
              </div>

              {/* Price, Stock, Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price *
                    </div>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
                      ₹
                    </span>
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Stock *
                    </div>
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                    placeholder="Quantity available"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Discount %
                    </div>
                    <span className="text-xs text-muted font-normal">
                      Optional
                    </span>
                  </label>
                  <input
                    name="discount"
                    type="number"
                    value={form.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Category and Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4" />
                      Category *
                    </div>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="" className="text-muted">
                      Select a category
                    </option>
                    {categories.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                        className="text-primary"
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Brand *
                    </div>
                  </label>
                  <select
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="" className="text-muted">
                      Select a brand
                    </option>
                    {brands.map((b) => (
                      <option
                        key={b._id}
                        value={b._id}
                        className="text-primary"
                      >
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin/products")}
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
                    Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Product Info */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary rounded-2xl border border-theme p-6 space-y-6">
            <h3 className="text-lg font-semibold text-primary">
              Product Information
            </h3>

            {/* Current Images */}
            <div>
              <h4 className="text-sm font-semibold text-primary mb-3">
                Current Images
              </h4>
              {currentProduct?.images && currentProduct.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {currentProduct.images
                    .slice(0, 4)
                    .map((img: string, index: number) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-background-tertiary"
                      >
                        <img
                          src={img}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E`;
                          }}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed border-theme rounded-xl">
                  <Package className="w-12 h-12 text-muted mx-auto mb-3" />
                  <p className="text-sm text-muted">No images uploaded</p>
                </div>
              )}
              <p className="text-xs text-muted mt-3">
                Images cannot be edited here. To change images, please delete
                and recreate the product.
              </p>
            </div>

            {/* Product Status */}
            <div className="pt-4 border-t border-theme">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Current Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      (currentProduct?.stock || 0) > 0
                        ? "bg-[#22C55E]/10 text-[#22C55E]"
                        : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {(currentProduct?.stock || 0) > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Created</span>
                  <span className="text-sm text-primary">
                    {currentProduct?.createdAt
                      ? new Date(currentProduct.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Last Updated</span>
                  <span className="text-sm text-primary">
                    {currentProduct?.updatedAt
                      ? new Date(currentProduct.updatedAt).toLocaleDateString()
                      : "Never"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-theme">
              <h4 className="text-sm font-semibold text-primary mb-3">
                Quick Stats
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Current Price</span>
                  <span className="font-semibold text-primary">
                    ₹{(currentProduct?.price || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Current Stock</span>
                  <span
                    className={`font-semibold ${
                      (currentProduct?.stock || 0) > 20
                        ? "text-[#22C55E]"
                        : (currentProduct?.stock || 0) > 0
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {currentProduct?.stock || 0} units
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Discount</span>
                  <span className="font-semibold text-primary">
                    {currentProduct?.discount || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
