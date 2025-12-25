"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  Plus,
  Minus,
  AlertCircle,
  ArrowLeft,
  Tag,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import API from "@/services/api";
import { useCart } from "@/context/CartContext";
import AddToCartButton from "@/components/AddToCart";
import ProductReviews from "@/components/products/ProductsReviews";
import RelatedProducts from "@/components/products/RelatedProducts";

// --- Types ---
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
  category: { _id: string; name: string };
  brand: { _id: string; name: string };
  discount: number;
  averageRating: number;
  totalReviews: number;
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { setCart, showToast } = useCart();

  // --- State ---
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  // --- Logic: Pricing & Stock ---
  const discountedPrice = useMemo(() => {
    if (!product) return 0;
    return product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  }, [product]);

  const stockStatus = useMemo(() => {
    if (!product || product.stock <= 0) return "out-of-stock";
    if (product.stock <= 5) return "low-stock";
    return "in-stock";
  }, [product]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // --- Effects: Fetching ---
  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products/${slug}`);
        setProduct(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // --- Handlers ---
  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && product && quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
    if (type === "decrease" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleBuyNow = async () => {
    if (!product || product.stock <= 0) {
      showToast("Product is out of stock", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to proceed with checkout", "info");
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }

    try {
      setBuyNowLoading(true);
      const res = await API.post("/cart", {
        productId: product._id,
        quantity: quantity,
      });
      setCart(res.data.cart);
      showToast("Added to cart! Redirecting to checkout...", "success");
      router.push("/checkout");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to proceed with checkout";
      showToast(errorMsg, "error");
    } finally {
      setBuyNowLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Check out this product",
          text: product?.description || "",
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Product link copied to clipboard", "success");
      } catch (err) {
        showToast("Failed to copy link", "error");
      }
    }
  };

  const handleWishlistToggle = () => {
    const newWishlistedState = !wishlisted;
    setWishlisted(newWishlistedState);
    showToast(
      newWishlistedState ? "Added to wishlist" : "Removed from wishlist",
      newWishlistedState ? "success" : "info"
    );
  };

  if (loading) return <ProductSkeleton />;
  if (error || !product)
    return <ProductError message={error} router={router} />;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-background-secondary border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <button
              onClick={() => router.push("/shop")}
              className="hover:text-secondary transition-colors"
            >
              Shop
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">
              {product.category?.name || "Category"}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Images Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-background-tertiary rounded-2xl overflow-hidden border border-theme">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={
                      product.images[selectedImage]?.url || "/placeholder.png"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.discount > 0 && (
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-sm font-bold rounded-lg shadow-lg"
                  >
                    {product.discount}% OFF
                  </motion.span>
                )}
                <StockBadge status={stockStatus} />
              </div>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-black"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev + 1) % product.images.length
                      )
                    }
                    className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-black"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-xl transition-colors ${
                    wishlisted
                      ? "bg-red-500 text-white"
                      : "bg-background-tertiary text-secondary hover:text-primary"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-3 rounded-xl bg-background-tertiary text-secondary hover:text-primary transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === idx
                        ? "border-[#F59E0B]"
                        : "border-theme hover:border-[#F59E0B]/50"
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#38BDF8]/10 text-[#38BDF8] text-sm font-semibold rounded-full">
                {product.brand?.name || "Brand"}
              </span>
              <span className="px-3 py-1 bg-background-tertiary text-secondary text-sm font-medium rounded-full">
                {product.category?.name || "Category"}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.averageRating)
                        ? "text-[#F59E0B] fill-[#F59E0B]"
                        : "text-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-primary">
                  {product.averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-muted ml-1">
                  ({product.totalReviews} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2 p-6 bg-background-secondary rounded-2xl border border-theme">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(discountedPrice)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-muted line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-sm font-bold rounded-full">
                      Save {formatPrice(product.price - discountedPrice)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">
                Description
              </h3>
              <p className="text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock & Quantity */}
            <div className="space-y-4 p-6 bg-background-secondary rounded-2xl border border-theme">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary">
                    Stock Status
                  </p>
                  <StockIndicator status={stockStatus} stock={product.stock} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary">Quantity</p>
                  <div className="flex items-center border border-theme rounded-xl bg-background">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      disabled={quantity <= 1}
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-3 text-secondary hover:text-primary disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-12 text-center text-lg font-bold text-primary">
                      {quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      disabled={quantity >= product.stock}
                      onClick={() => handleQuantityChange("increase")}
                      className="p-3 text-secondary hover:text-primary disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <AddToCartButton
                  productId={product._id}
                  quantity={quantity}
                  disabled={product.stock <= 0}
                  className="flex-1 h-14"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0 || buyNowLoading}
                  className="flex-1 flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {buyNowLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Buy Now
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TrustItem
                icon={<Truck className="w-5 h-5 text-[#38BDF8]" />}
                title="Free Shipping"
                description="Orders over ₹999"
              />
              <TrustItem
                icon={<Shield className="w-5 h-5 text-[#22C55E]" />}
                title="Secure Payment"
                description="SSL Encrypted"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Sections */}
        <div className="mt-16 space-y-16">
          <ProductReviews
            productId={product._id}
            averageRating={product.averageRating}
            totalReviews={product.totalReviews}
          />
          <RelatedProducts
            productId={product._id}
            categoryId={product.category?._id}
          />
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StockBadge({ status }: { status: string }) {
  const configMap = {
    "in-stock": { color: "bg-[#22C55E]/10 text-[#22C55E]", label: "In Stock" },
    "low-stock": {
      color: "bg-[#F59E0B]/10 text-[#F59E0B]",
      label: "Low Stock",
    },
    "out-of-stock": {
      color: "bg-red-500/10 text-red-500",
      label: "Out of Stock",
    },
  };

  // Fix: Tell TS status is a key of configMap, and add a fallback
  const config =
    configMap[status as keyof typeof configMap] || configMap["out-of-stock"];

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-bold ${config.color}`}
    >
      {config.label}
    </span>
  );
}
function StockIndicator({ status, stock }: { status: string; stock: number }) {
  if (status === "out-of-stock") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-red-500 font-medium">Out of Stock</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            status === "in-stock" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
          }`}
        />
        <span
          className={`font-medium ${
            status === "in-stock" ? "text-[#22C55E]" : "text-[#F59E0B]"
          }`}
        >
          {status === "in-stock" ? "In Stock" : "Low Stock"}
        </span>
      </div>
      <p className="text-sm text-muted">
        {stock} {stock === 1 ? "item" : "items"} available
      </p>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-background-secondary border border-theme hover:bg-background-tertiary transition-colors">
      <div className="p-2.5 bg-background-tertiary rounded-lg">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-primary text-sm">{title}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="aspect-square bg-background-tertiary rounded-2xl animate-pulse" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-background-tertiary rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-background-tertiary rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-background-tertiary rounded animate-pulse" />
            <div className="h-6 w-40 bg-background-tertiary rounded animate-pulse" />
          </div>
          <div className="h-32 bg-background-tertiary rounded-2xl animate-pulse" />
          <div className="h-20 bg-background-tertiary rounded-2xl animate-pulse" />
          <div className="h-14 bg-background-tertiary rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function ProductError({
  message,
  router,
}: {
  message: string | null;
  router: any;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">
            {message || "Product Not Found"}
          </h2>
          <p className="text-muted">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/shop")}
            className="px-6 py-3 bg-background-tertiary border border-theme text-primary font-semibold rounded-xl hover:bg-background-tertiary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Shop
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Go to Homepage
          </motion.button>
        </div>
      </div>
    </div>
  );
}
