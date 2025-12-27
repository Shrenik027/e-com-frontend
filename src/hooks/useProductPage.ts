"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";
import { useCart } from "@/context/CartContext";

/* ================= TYPES ================= */

interface ProductImage {
  url: string;
  publicId?: string;
}

export interface Product {
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

/* ================= HOOK ================= */

export function useProductPage() {
  const params = useParams();
  const router = useRouter();
  const { setCart, showToast } = useCart();

  /**
   * IMPORTANT:
   * Works whether route param is [slug] or [productId]
   */
  const productParam =
    (params?.productId as string) || (params?.slug as string) || "";

  /* ---------- STATE ---------- */
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  /* ---------- DERIVED ---------- */

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

  /* ---------- FETCH PRODUCT (FIXED) ---------- */

  useEffect(() => {
    if (!productParam) {
      setLoading(false);
      setError("Invalid product");
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await API.get(`/products/${productParam}`);
        setProduct(data);
        setSelectedImageIndex(0);
        setQuantity(1);
      } catch (err: any) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productParam]);

  /* ---------- QUANTITY ---------- */

  const increaseQuantity = () => {
    if (!product) return;
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  /* ---------- ADD TO CART ---------- */

  const addToCart = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/login?redirect=/products/${productParam}`);
      return;
    }

    if (product.stock <= 0) {
      showToast("Product is out of stock", "error");
      return;
    }

    try {
      const res = await API.post("/cart", {
        productId: product._id,
        quantity,
      });
      setCart(res.data.cart);
      showToast("Added to cart", "success");
    } catch (err: any) {
      showToast(
        err.response?.data?.message || "Failed to add to cart",
        "error"
      );
    }
  };

  /* ---------- BUY NOW ---------- */

  const buyNow = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/login?redirect=/products/${productParam}`);
      return;
    }

    if (product.stock <= 0) {
      showToast("Product is out of stock", "error");
      return;
    }

    try {
      setBuyNowLoading(true);
      const res = await API.post("/cart", {
        productId: product._id,
        quantity,
      });
      setCart(res.data.cart);
      router.push("/checkout");
    } catch {
      showToast("Checkout failed", "error");
    } finally {
      setBuyNowLoading(false);
    }
  };

  /* ---------- WISHLIST (TEMP) ---------- */

  const toggleWishlist = () => {
    setWishlisted((v) => !v);
    showToast(
      !wishlisted ? "Added to wishlist" : "Removed from wishlist",
      !wishlisted ? "success" : "info"
    );
  };

  /* ---------- SHARE ---------- */

  const shareProduct = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("Link copied", "success");
      }
    } catch {
      // user cancelled share – ignore
    }
  };

  /* ---------- RETURN ---------- */

  return {
    // state
    product,
    loading,
    error,
    quantity,
    selectedImageIndex,
    wishlisted,
    buyNowLoading,

    // derived
    discountedPrice,
    stockStatus,
    formatPrice,

    // setters
    setSelectedImageIndex,

    // actions
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    buyNow,
    toggleWishlist,
    shareProduct,
  };
}
