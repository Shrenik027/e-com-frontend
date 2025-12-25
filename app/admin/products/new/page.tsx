"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/adminProducts";
import API from "@/services/api";
import {
  Plus,
  Upload,
  X,
  Image as ImageIcon,
  Tag,
  Package,
  DollarSign,
  Hash,
  Percent,
  LayoutGrid,
  Briefcase,
  Loader2,
} from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    discount: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  /* --------------------
     LOAD CATEGORIES & BRANDS
  -------------------- */
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          API.get("/categories"),
          API.get("/brands"),
        ]);

        setCategories(catRes.data.categories || []);
        setBrands(brandRes.data.brands || []);
      } catch (err) {
        console.error("Failed to load categories/brands", err);
      }
    };

    loadMeta();
  }, []);

  /* --------------------
     INPUT HANDLERS
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

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files).slice(0, 5);
    setImages(filesArray);

    // Create previews
    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  /* --------------------
     SUBMIT
  -------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.stock ||
      !form.category ||
      !form.brand
    ) {
      setError("All required fields must be filled");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== "") data.append(key, value);
      });

      images.forEach((file) => {
        data.append("images", file);
      });

      await createProduct(data);
      router.push("/admin/products");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
          Add New Product
        </h1>
        <p className="text-muted">
          Fill in the details below to add a new product to your store
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <X className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
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
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe the product features, benefits, and specifications"
                value={form.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
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
                  placeholder="Quantity available"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column - Category, Brand, Images */}
          <div className="space-y-6">
            {/* Category */}
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
                  <option key={c._id} value={c._id} className="text-primary">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
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
                  <option key={b._id} value={b._id} className="text-primary">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  Discount %
                </div>
                <span className="text-xs text-muted font-normal">Optional</span>
              </label>
              <input
                name="discount"
                type="number"
                placeholder="0"
                value={form.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 bg-background-tertiary border border-theme rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Product Images
                </div>
                <span className="text-xs text-muted font-normal">
                  Upload up to 5 images (First image will be the main display)
                </span>
              </label>

              {/* Image Upload Area */}
              <div className="mt-2">
                <label
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
                    imagePreviews.length > 0
                      ? "border-theme hover:border-[#F59E0B]"
                      : "border-theme hover:border-[#38BDF8] bg-background-tertiary/50"
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImages}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center p-6">
                    {imagePreviews.length === 0 ? (
                      <>
                        <Upload className="w-12 h-12 text-muted mb-3" />
                        <p className="text-sm font-medium text-primary mb-1">
                          Click to upload images
                        </p>
                        <p className="text-xs text-muted">
                          PNG, JPG, WEBP up to 5MB each
                        </p>
                      </>
                    ) : (
                      <>
                        <Plus className="w-10 h-10 text-muted mb-2" />
                        <p className="text-sm font-medium text-primary">
                          Add more images
                        </p>
                        <p className="text-xs text-muted mt-1">
                          {imagePreviews.length}/5 images selected
                        </p>
                      </>
                    )}
                  </div>
                </label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-background-tertiary">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center">
                          {index === 0 ? "Main" : `Image ${index + 1}`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-theme">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.back()}
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
                  Creating Product...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
