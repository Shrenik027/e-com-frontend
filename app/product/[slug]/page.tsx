"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Shield,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Package,
  RefreshCw,
  CreditCard,
  ShoppingCart,
  Plus,
  Minus,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import API from "@/services/api";
import { useCart } from "@/context/CartContext";
import AddToCartButton from "@/components/AddToCart";
import ProductReviews from "@/components/products/ProductsReviews";
import RelatedProducts from "@/components/products/RelatedProducts";

interface ProductImage {
  url: string;
  publicId?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
  category: {
    _id: string;
    name: string;
  };
  brand: {
    _id: string;
    name: string;
  };
  discount: number;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();

  // Use your existing CartContext with toast
  const { setCart, showToast } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1); // ✅ Quantity lives here
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [stockStatus, setStockStatus] = useState<
    "in-stock" | "low-stock" | "out-of-stock"
  >("in-stock");

  // Calculate discounted price
  const calculateDiscountedPrice = useCallback(
    (price: number, discount: number) => {
      return discount > 0 ? price - (price * discount) / 100 : price;
    },
    []
  );

  // Format price with commas
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-IN").format(price);
  }, []);

  // Fetch product data
  useEffect(() => {
    if (!slug) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        const productResponse = await API.get(`/products/${slug}`);
        const productData = productResponse.data;
        setProduct(productData);

        if (productData.stock === 0) {
          setStockStatus("out-of-stock");
        } else if (productData.stock <= 10) {
          setStockStatus("low-stock");
        } else {
          setStockStatus("in-stock");
        }
      } catch (err: any) {
        console.error("Failed to load product:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  // ✅ Handle quantity changes
  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      if (product && quantity < product.stock) {
        setQuantity((prev) => prev + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  // ✅ FIXED: Buy Now with proper flow (no double adding)
  const handleBuyNow = async () => {
    if (!product) return;

    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to checkout", "error");
      setTimeout(() => router.push("/login"), 1000);
      return;
    }

    if (product.stock === 0) {
      showToast("Product is out of stock", "error");
      return;
    }

    try {
      setBuyNowLoading(true);

      // ✅ Step 1: Clear existing cart first (if needed)
      // Since your backend doesn't support 'replace', we'll clear then add
      const existingCart = await API.get("/cart");
      if (existingCart.data.cart.items.length > 0) {
        await API.delete("/cart");
      }

      // ✅ Step 2: Add just this item with selected quantity
      const res = await API.post("/cart", {
        productId: product._id,
        quantity: quantity,
      });

      // ✅ Step 3: Update cart state
      setCart(res.data.cart);

      // ✅ Step 4: Redirect to checkout immediately
      router.push("/checkout");
    } catch (err: any) {
      console.error("Failed to buy now:", err);

      if (err.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        setTimeout(() => router.push("/login"), 1000);
        return;
      }

      const errorMessage =
        err.response?.data?.message || "Failed to proceed to checkout";
      showToast(errorMessage, "error");
    } finally {
      setBuyNowLoading(false);
    }
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out ${product?.name} on our store!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    }
  };

  // Handle image navigation
  const handleImageNavigation = (direction: "prev" | "next") => {
    if (!product?.images.length) return;

    if (direction === "next") {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 bg-background-tertiary rounded w-24 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-background-tertiary rounded-2xl"></div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-20 flex-1 bg-background-tertiary rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-10 bg-background-tertiary rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-background-tertiary rounded w-full"></div>
                  <div className="h-4 bg-background-tertiary rounded w-5/6"></div>
                  <div className="h-4 bg-background-tertiary rounded w-4/6"></div>
                </div>
                <div className="h-8 bg-background-tertiary rounded w-32"></div>
                <div className="h-12 bg-background-tertiary rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex flex-col items-center gap-6 max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Product Not Found
              </h2>
              <p className="text-muted mb-6">
                {error || "The product you're looking for doesn't exist."}
              </p>
            </div>
            <button
              onClick={() => router.push("/shop")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );
  const discountAmount =
    product.discount > 0 ? product.price - discountedPrice : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Breadcrumb Navigation */}
      <div className="border-b border-theme bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => router.push("/shop")}
              className="text-muted hover:text-secondary transition-colors"
            >
              Shop
            </button>
            <ChevronRight className="w-4 h-4 text-muted" />
            <span className="text-muted">{product.category?.name}</span>
            <ChevronRight className="w-4 h-4 text-muted" />
            <span className="text-primary font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ================= LEFT COLUMN: IMAGES ================= */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-background-tertiary rounded-2xl overflow-hidden">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[selectedImage]?.url || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNavigation("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleImageNavigation("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-sm font-semibold rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
                {stockStatus === "out-of-stock" ? (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    Out of Stock
                  </span>
                ) : stockStatus === "low-stock" ? (
                  <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-[#22C55E] text-white text-sm font-semibold rounded-full">
                    In Stock
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                    wishlisted
                      ? "bg-red-500/20 text-red-500"
                      : "bg-black/20 text-white hover:bg-black/30"
                  }`}
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full backdrop-blur-sm bg-black/20 text-white hover:bg-black/30 transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-brand"
                        : "border-theme hover:border-brand/50"
                    }`}
                  >
                    <div className="relative w-full h-full bg-background-tertiary">
                      <Image
                        src={image.url}
                        alt={`${product.name} - View ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: DETAILS ================= */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(product.averageRating)
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted">
                        {product.averageRating.toFixed(1)} (
                        {product.totalReviews} reviews)
                      </span>
                    </div>
                    <span className="text-sm text-muted">•</span>
                    <span className="text-sm text-muted">
                      SKU: {product._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Brand Logo/Name */}
                <div className="text-right">
                  <span className="text-sm text-muted">Brand</span>
                  <div className="px-3 py-1 bg-background-tertiary rounded-lg">
                    <span className="font-semibold text-secondary">
                      {product.brand?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-3xl lg:text-4xl font-bold text-primary">
                    ₹{formatPrice(discountedPrice)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-muted line-through">
                        ₹{formatPrice(product.price)}
                      </span>
                      <span className="px-2 py-1 bg-red-500/10 text-red-500 text-sm font-semibold rounded">
                        Save ₹{formatPrice(discountAmount)}
                      </span>
                    </>
                  )}
                </div>
                {product.discount > 0 && (
                  <p className="text-sm text-muted">
                    You save {product.discount}% ({formatPrice(discountAmount)})
                  </p>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div
              className={`p-4 rounded-xl border ${
                stockStatus === "out-of-stock"
                  ? "border-red-500/20 bg-red-500/5"
                  : stockStatus === "low-stock"
                  ? "border-yellow-500/20 bg-yellow-500/5"
                  : "border-[#22C55E]/20 bg-[#22C55E]/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    stockStatus === "out-of-stock"
                      ? "bg-red-500"
                      : stockStatus === "low-stock"
                      ? "bg-yellow-500"
                      : "bg-[#22C55E]"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-primary">
                    {stockStatus === "out-of-stock"
                      ? "Out of Stock"
                      : stockStatus === "low-stock"
                      ? `Only ${product.stock} left in stock`
                      : "In Stock"}
                  </p>
                  <p className="text-sm text-muted">
                    {stockStatus === "out-of-stock"
                      ? "This product is currently unavailable"
                      : stockStatus === "low-stock"
                      ? "Order soon to avoid disappointment"
                      : "Ready to ship"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Description
              </h3>
              <p className="text-secondary leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* ✅ QUANTITY SELECTOR */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-theme rounded-xl">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    className="p-3 text-muted hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    disabled={!product || quantity >= product.stock}
                    className="p-3 text-muted hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted">
                  {product.stock} units available
                </span>
              </div>
            </div>

            {/* ✅ ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* ✅ Add to Cart with quantity */}
              <AddToCartButton
                productId={product._id}
                quantity={quantity} // ✅ Now passes selected quantity
                disabled={product.stock === 0}
                className="flex-1"
              />

              {/* ✅ Buy Now (separate flow) */}
              <motion.button
                whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                onClick={handleBuyNow}
                disabled={product.stock === 0 || buyNowLoading}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-xl transition-all ${
                  product.stock === 0 || buyNowLoading
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-75"
                    : "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:opacity-90"
                }`}
              >
                {buyNowLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Buy Now
                  </>
                )}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-theme">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background-tertiary rounded-lg">
                  <Truck className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    Free Shipping
                  </p>
                  <p className="text-xs text-muted">Above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background-tertiary rounded-lg">
                  <RefreshCw className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    Easy Returns
                  </p>
                  <p className="text-xs text-muted">30 Day Policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background-tertiary rounded-lg">
                  <Shield className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    Secure Payment
                  </p>
                  <p className="text-xs text-muted">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background-tertiary rounded-lg">
                  <Package className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    Quality Checked
                  </p>
                  <p className="text-xs text-muted">Authentic Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRODUCT DETAILS TABS ================= */}
        <div className="mt-16">
          <div className="border-b border-theme">
            <nav className="flex gap-8">
              <button className="py-4 border-b-2 border-brand text-brand font-semibold">
                Product Details
              </button>
              <button className="py-4 text-secondary hover:text-primary transition-colors">
                Specifications
              </button>
              <button className="py-4 text-secondary hover:text-primary transition-colors">
                Reviews & Ratings
              </button>
              <button className="py-4 text-secondary hover:text-primary transition-colors">
                FAQs
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.description
                    .split(".")
                    .filter(Boolean)
                    .map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                        <span className="text-secondary">
                          {feature.trim()}.
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="bg-background-secondary rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Product Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-theme">
                    <span className="text-muted">Category</span>
                    <span className="font-medium text-secondary">
                      {product.category?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-theme">
                    <span className="text-muted">Brand</span>
                    <span className="font-medium text-secondary">
                      {product.brand?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-theme">
                    <span className="text-muted">SKU</span>
                    <span className="font-medium text-secondary">
                      {product._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-theme">
                    <span className="text-muted">Stock Status</span>
                    <span
                      className={`font-medium ${
                        stockStatus === "out-of-stock"
                          ? "text-red-500"
                          : stockStatus === "low-stock"
                          ? "text-yellow-500"
                          : "text-[#22C55E]"
                      }`}
                    >
                      {stockStatus === "out-of-stock"
                        ? "Out of Stock"
                        : stockStatus === "low-stock"
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted">Added On</span>
                    <span className="font-medium text-secondary">
                      {new Date(product.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS SECTION ================= */}
        <ProductReviews
          productId={product._id}
          averageRating={product.averageRating}
          totalReviews={product.totalReviews}
        />

        {/* ================= RELATED PRODUCTS ================= */}
        <RelatedProducts
          productId={product._id}
          categoryId={product.category._id}
        />
      </div>
    </motion.div>
  );
}
