"use client";

import { motion } from "framer-motion";
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Heart,
  Check,
  Mail,
  Repeat,
  Package,
  ChevronRight,
  Play,
  X,
  ZoomIn,
  ZoomOut,
  Move,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProductPage } from "@/hooks/useProductPage";
import { useState, useRef } from "react";

/* ================= COMPONENTS ================= */

// Skeleton Loader
function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 py-4">
          <div className="h-4 w-16 bg-background-tertiary rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-background-tertiary rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-background-tertiary rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-background-tertiary rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-background-tertiary rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image Gallery Skeleton */}
          <div className="lg:w-1/2">
            <div className="aspect-square bg-background-tertiary rounded-2xl animate-pulse"></div>
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-background-tertiary rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="lg:w-1/2">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-background-tertiary rounded animate-pulse"></div>
              <div className="h-8 w-3/4 bg-background-tertiary rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-background-tertiary rounded animate-pulse"></div>
              <div className="h-12 w-48 bg-background-tertiary rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Image Lightbox Component
function ImageLightbox({
  images,
  selectedIndex,
  onClose,
  onIndexChange,
}: {
  images: { url: string }[];
  selectedIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative max-w-4xl max-h-[80vh] overflow-hidden">
          <Image
            ref={imageRef}
            src={images[selectedIndex].url}
            alt="Product zoom view"
            width={1200}
            height={1200}
            className={`object-contain transition-transform duration-200 ${
              isDragging
                ? "cursor-grabbing"
                : scale > 1
                ? "cursor-grab"
                : "cursor-default"
            }`}
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            disabled={scale <= 1}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="px-4 py-2 text-sm text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            disabled={scale >= 3}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(
                  (selectedIndex - 1 + images.length) % images.length
                );
                handleReset();
              }}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange((selectedIndex + 1) % images.length);
                handleReset();
              }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails at bottom */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(index);
                handleReset();
              }}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-brand"
                  : "border-white/30 hover:border-white/50"
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Breadcrumb Component
function Breadcrumb({ productName }: { productName?: string }) {
  const router = useRouter();

  return (
    <nav className="py-4">
      <ol className="flex items-center text-sm text-muted">
        <li>
          <button
            onClick={() => router.push("/")}
            className="hover:text-primary transition-colors"
          >
            Home
          </button>
        </li>
        <li className="mx-2 text-muted">/</li>
        <li>
          <button
            onClick={() => router.push("/shop")}
            className="hover:text-primary transition-colors"
          >
            Shop
          </button>
        </li>
        <li className="mx-2 text-muted">/</li>
        <li className="text-primary font-medium">{productName || "Product"}</li>
      </ol>
    </nav>
  );
}

// Image Gallery Component
// Image Gallery Component
function ProductImageGallery({
  images,
  selectedIndex,
  onSelect,
  onOpenLightbox,
}: {
  images: { url: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onOpenLightbox: (index: number) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Main Image - Click to open lightbox */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-2xl bg-background-tertiary cursor-zoom-in"
        onClick={() => onOpenLightbox(selectedIndex)}
      >
        {images[selectedIndex] && (
          <Image
            src={images[selectedIndex].url}
            alt="Product main image"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        )}
        {/* Zoom icon overlay */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <ZoomIn className="w-5 h-5" />
        </div>
      </div>

      {/* Thumbnails - Side by side like Crafto */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(index);
                // Optional: open lightbox when clicking thumbnail
                // onOpenLightbox(index);
              }}
              className={`flex-none w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-brand"
                  : "border-theme hover:border-brand/50"
              }`}
            >
              <Image
                src={img.url}
                alt={`Product thumbnail ${index + 1}`}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// // Color Selector Component (Hardcoded - Update for each product)
// function ColorSelector() {
//   const colors = [
//     { id: "color-1", color: "#D4AF37", label: "Gold" },
//     { id: "color-2", color: "#5881bf", label: "Blue" },
//     { id: "color-3", color: "#87a968", label: "Green" },
//   ];

//   const [selectedColor, setSelectedColor] = useState("color-1");

//   return (
//     <div className="mb-6">
//       <label className="text-lg font-medium text-primary mb-3 block">
//         Color
//       </label>
//       <div className="flex gap-3">
//         {colors.map((color) => (
//           <div key={color.id} className="relative">
//             <input
//               type="radio"
//               id={color.id}
//               name="color"
//               checked={selectedColor === color.id}
//               onChange={() => setSelectedColor(color.id)}
//               className="sr-only"
//             />
//             <label
//               htmlFor={color.id}
//               className={`block w-10 h-10 rounded-full cursor-pointer border-2 transition-all ${
//                 selectedColor === color.id
//                   ? "border-white ring-2 ring-brand"
//                   : "border-theme hover:border-brand/50"
//               }`}
//               style={{ backgroundColor: color.color }}
//               title={color.label}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Size Selector Component (Hardcoded - Update for each product)
function SizeSelector() {
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="mb-8">
      <label className="text-lg font-medium text-primary mb-3 block">
        Size
      </label>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <div key={size} className="relative">
            <input
              type="radio"
              id={`size-${size}`}
              name="size"
              checked={selectedSize === size}
              onChange={() => setSelectedSize(size)}
              className="sr-only"
            />
            <label
              htmlFor={`size-${size}`}
              className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer border-2 transition-all font-medium ${
                selectedSize === size
                  ? "bg-brand text-white border-brand"
                  : "bg-background-tertiary text-secondary border-theme hover:border-brand/50 hover:text-primary"
              }`}
            >
              {size}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

// Quantity Selector Component
function QuantitySelector({
  quantity,
  stock,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-medium text-primary">Quantity</span>
        <span className="text-sm text-muted">Max: {stock}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 bg-background-tertiary rounded-xl p-2">
          <button
            onClick={onDecrease}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-background-secondary disabled:opacity-30 transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="text-2xl font-bold text-primary min-w-[60px] text-center">
            {quantity}
          </span>

          <button
            onClick={onIncrease}
            disabled={quantity >= stock}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-background-secondary disabled:opacity-30 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Actions Bar Component (Like Crafto)
function ProductActionsBar({
  // onCompare,
  // onAskQuestion,
  onShare,
}: {
  // onCompare: () => void;
  // onAskQuestion: () => void;
  onShare: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-6 mb-6">
      {/* <button
        onClick={onCompare}
        className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
      >
        <Repeat className="w-5 h-5" />
        <span className="font-medium">Compare</span>
      </button>

      <button
        onClick={onAskQuestion}
        className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
      >
        <Mail className="w-5 h-5" />
        <span className="font-medium">Ask a question</span>
      </button> */}

      <button
        onClick={onShare}
        className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span className="font-medium">Share</span>
      </button>
    </div>
  );
}

// Shipping Info Component (Hardcoded - Update as needed)
function ShippingInfo() {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-start gap-3">
        <Truck className="w-5 h-5 text-primary mt-1" />
        <div>
          <span className="font-medium text-primary">Estimated delivery: </span>
          {/* HARDCODED: Update delivery dates for your business */}
          <span className="text-secondary">March 03 - March 07</span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Package className="w-5 h-5 text-primary mt-1" />
        <div>
          <span className="font-medium text-primary">
            Free shipping & returns:{" "}
          </span>
          {/* HARDCODED: Update shipping policy for your business */}
          <span className="text-secondary">On all orders over $50</span>
        </div>
      </div>
    </div>
  );
}

// Secure Checkout Component (Hardcoded - Update payment methods as needed)
function SecureCheckout() {
  // HARDCODED: Update with your accepted payment methods
  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "PayPal", icon: "💳" },
    { name: "Stripe", icon: "💳" },
  ];

  return (
    <div className="bg-background-tertiary rounded-xl p-6 mb-6">
      <h4 className="text-lg font-semibold text-primary mb-4">
        Guarantee safe and secure checkout
      </h4>
      <div className="flex flex-wrap gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg"
          >
            <span className="text-xl">{method.icon}</span>
            <span className="text-sm font-medium text-secondary">
              {method.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Category Tags Component
function CategoryTags({
  category,
  tags,
}: {
  category?: string;
  tags?: string[];
}) {
  // HARDCODED: Update with actual product tags from your database
  const productTags = tags || ["Fashion", "Lightweight", "Minimal", "Trendy"];
  const productCategory = category || "Fashion";

  return (
    <div className="space-y-2">
      <div>
        <span className="font-medium text-primary">Category: </span>
        <span className="text-secondary">{productCategory}</span>
      </div>
      <div>
        <span className="font-medium text-primary">Tags: </span>
        <div className="inline-flex flex-wrap gap-2">
          {productTags.map((tag, index) => (
            <span
              key={index}
              className="text-secondary hover:text-primary transition-colors"
            >
              {tag}
              {index < productTags.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Tabs Component (Like Crafto's detailed tabs)
function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional-info", label: "Additional Information" },
    { id: "shipping-return", label: "Shipping & Return" },
    { id: "reviews", label: "Reviews (3)" },
  ];

  // HARDCODED: Update product description and details for each product
  const productDescription = {
    title: "Uncover the details that make this look truly stand out.",
    description:
      "Discover the subtle yet powerful elements that transform an ordinary look into something extraordinary. From intricate textures and carefully chosen accents to the perfect balance of colors and craftsmanship.",
    features: [
      "Made from soft yet durable 100% organic cotton twill fabric.",
      "Breathable and lightweight design ensures comfort in all climates.",
      "Dyed using eco-friendly, non-toxic pigments that resist fading.",
      "Fabric is hypoallergenic and gentle on sensitive skin.",
    ],
  };

  // HARDCODED: Update additional information for each product
  const additionalInfo = [
    { label: "Color", value: "Black, Yellow" },
    { label: "Style/Type", value: "Sports, Formal" },
    { label: "Material", value: "Leather, Cotton, Silk" },
    { label: "Free shipping", value: "On all orders over $50" },
  ];

  // HARDCODED: Update shipping information for your business
  const shippingInfo = {
    shipping: {
      standard: "Arrives in 5-8 business days",
      express: "Arrives in 2-3 business days",
      details:
        "These shipping rates are not applicable for orders shipped outside of the US. Some oversized items may require an additional shipping charge.",
    },
    returns: {
      period:
        "Orders placed between 10/1/2023 and 12/23/2023 can be returned by 2/27/2023.",
      details:
        "Return or exchange any unused or defective merchandise by mail or at one of our store locations. Returns made within 30 days of the order delivery date will be issued a full refund.",
    },
  };

  // HARDCODED: Update reviews data
  const reviews = [
    {
      name: "Herman Miller",
      date: "06 April 2023",
      rating: 5,
      likes: 8,
      comment:
        "Lorem ipsum dolor sit sed do eiusmod tempor incididunt labore enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Wilbur Haddock",
      date: "26 April 2023",
      rating: 5,
      likes: 6,
      comment:
        "Lorem ipsum dolor sit sed do eiusmod tempor incididunt labore enim ad minim veniamnisi ut aliquip ex ea commodo consequat.",
    },
  ];

  return (
    <div className="mt-12 pt-8">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap border-b border-theme">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-lg font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted hover:text-secondary"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "description" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {productDescription.title}
                </h3>
                <p className="text-secondary mb-6">
                  {productDescription.description}
                </p>
                <div className="space-y-3">
                  {productDescription.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden">
                {/* HARDCODED: Update product detail image */}
                <div className="aspect-video bg-background-tertiary rounded-2xl"></div>
              </div>
            </div>

            {/* Video Section
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-background-tertiary to-background-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </button>
              </div>
            </div> */}
          </div>
        )}

        {activeTab === "additional-info" && (
          <div className="space-y-4">
            {additionalInfo.map((info, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center py-4 ${
                  index % 2 === 0 ? "bg-background-tertiary" : ""
                } rounded-lg px-4`}
              >
                <div className="md:w-1/4 font-medium text-primary mb-2 md:mb-0">
                  {info.label}:
                </div>
                <div className="md:w-3/4 text-secondary">{info.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "shipping-return" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-primary mb-4">
                Shipping Information
              </h4>
              <div className="space-y-3">
                <p>
                  <span className="font-medium text-primary">Standard:</span>{" "}
                  {shippingInfo.shipping.standard}
                </p>
                <p>
                  <span className="font-medium text-primary">Express:</span>{" "}
                  {shippingInfo.shipping.express}
                </p>
                <p className="text-secondary">
                  {shippingInfo.shipping.details}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-primary mb-4">
                Return Information
              </h4>
              <div className="space-y-3">
                <p className="text-secondary">{shippingInfo.returns.period}</p>
                <p className="text-secondary">{shippingInfo.returns.details}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Reviews Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              {/* <div>
                <h4 className="text-2xl font-bold text-primary mb-2">
                  <span className="text-brand">25,000+</span> people love our
                  product
                </h4>
              </div> */}
              <div className="bg-background-tertiary rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>
                <div className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold inline-block">
                  2,488 Reviews
                </div>
              </div>
              <div className="space-y-3">
                {/* Rating distribution - HARDCODED: Update with actual data */}
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "fill-background-tertiary text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand rounded-full"
                        style={{
                          width: `${
                            rating === 5
                              ? "80%"
                              : rating === 4
                              ? "10%"
                              : rating === 3
                              ? "5%"
                              : rating === 2
                              ? "3%"
                              : "2%"
                          }`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-primary w-10">
                      {rating === 5
                        ? "80%"
                        : rating === 4
                        ? "10%"
                        : rating === 3
                        ? "5%"
                        : rating === 2
                        ? "3%"
                        : "2%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="pb-8 border-b border-theme last:border-0"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 text-center">
                      <div className="w-20 h-20 rounded-full bg-background-tertiary mx-auto mb-3"></div>
                      <div className="font-semibold text-primary">
                        {review.name}
                      </div>
                      <div className="text-sm text-muted">{review.date}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-[#F59E0B] text-[#F59E0B]"
                                  : "fill-background-tertiary text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <button className="flex items-center gap-1 text-muted hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {review.likes}
                          </span>
                        </button>
                      </div>
                      <p className="text-secondary">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Review Form
            <div className="bg-background-tertiary rounded-2xl p-8">
              <h4 className="text-2xl font-semibold text-primary mb-6 text-center">
                Add a Review
              </h4>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-primary font-medium mb-2">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background rounded-lg border border-theme text-primary focus:outline-none focus:border-brand"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-medium mb-2">
                      Your Email*
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-background rounded-lg border border-theme text-primary focus:outline-none focus:border-brand"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Your Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-6 h-6 fill-muted text-muted cursor-pointer hover:fill-[#F59E0B] hover:text-[#F59E0B]"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background rounded-lg border border-theme text-primary focus:outline-none focus:border-brand"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="terms" className="w-4 h-4" />
                  <label htmlFor="terms" className="text-sm text-secondary">
                    I accept the terms and conditions and privacy policy
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F59E0B]/25 transition-all"
                >
                  Submit Review
                </button>
              </form>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

// // Related Products Component (Hardcoded - Update with actual related products)
// function RelatedProducts() {
//   // HARDCODED: Update with actual related products from your database
//   const relatedProducts = [
//     {
//       id: 1,
//       name: "Cotton Crochet Tank",
//       price: 199,
//       originalPrice: 245,
//       image: "https://placehold.co/600x740",
//       badge: null,
//     },
//     {
//       id: 2,
//       name: "Basic Slim Fit T-Shirt",
//       price: 320,
//       originalPrice: 345,
//       image: "https://placehold.co/600x740",
//       badge: "Hot",
//     },
//     {
//       id: 3,
//       name: "Cotton Slim Scoop Tank",
//       price: 149,
//       originalPrice: 159,
//       image: "https://placehold.co/600x740",
//       badge: null,
//     },
//     {
//       id: 4,
//       name: "Draped Cowl Top",
//       price: 399,
//       originalPrice: 429,
//       image: "https://placehold.co/600x740",
//       badge: null,
//     },
//   ];

//   return (
//     <div className="mt-12 pt-8 border-t border-theme">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-primary mb-3">
//           Related Products
//         </h2>
//         <p className="text-secondary">
//           Explore trending products chosen by our customers.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {relatedProducts.map((product) => (
//           <div key={product.id} className="group">
//             <div className="relative aspect-square rounded-2xl overflow-hidden bg-background-tertiary mb-4">
//               {product.badge && (
//                 <div className="absolute top-3 left-3 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full z-10">
//                   {product.badge}
//                 </div>
//               )}
//               <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-brand hover:text-white">
//                 Add to Cart
//               </button>
//             </div>
//             <div className="text-center">
//               <h3 className="font-semibold text-primary mb-2">
//                 {product.name}
//               </h3>
//               <div className="flex items-center justify-center gap-2">
//                 <span className="text-xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
//                   ${product.price}
//                 </span>
//                 {product.originalPrice && (
//                   <span className="text-muted line-through">
//                     ${product.originalPrice}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Product Header Component
function ProductHeader({
  product,
  formatPrice,
  discountedPrice,
  stockStatus,
  averageRating,
  totalReviews,
}: {
  product: any;
  formatPrice: (price: number) => string;
  discountedPrice: number;
  stockStatus: string;
  averageRating: number;
  totalReviews: number;
}) {
  // HARDCODED: Update SKU from product data when available
  const sku = product._id?.slice(-8) || "M492300";

  return (
    <div className="space-y-4">
      {/* Brand and SKU */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-muted">
          {product.brand?.name || "Brand Name"}
        </span>
        <div className="w-1 h-1 bg-muted rounded-full"></div>
        <span className="text-muted">SKU: {sku}</span>
      </div>

      {/* Product Name */}
      <h1 className="text-3xl lg:text-4xl font-bold text-primary">
        {product.name}
      </h1>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "fill-background-tertiary text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted">
            {averageRating.toFixed(1)} ({totalReviews} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-4xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
          {formatPrice(discountedPrice)}
        </span>
        {product.discount > 0 && (
          <>
            <span className="text-xl text-muted line-through">
              {formatPrice(product.price)}
            </span>
            <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-sm font-semibold rounded-lg">
              Save {product.discount}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-secondary pt-4 border-t border-theme">
        {product.description ||
          "Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum standard."}
      </p>
    </div>
  );
}

// Product Actions Component
function ProductActions({
  stockStatus,
  onAddToCart,
  onBuyNow,
  onShare,
  buyNowLoading,
  onCompare,
  onAskQuestion,
}: {
  stockStatus: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onShare: () => void;
  buyNowLoading: boolean;
  onCompare: () => void;
  onAskQuestion: () => void;
}) {
  const isOutOfStock = stockStatus === "out-of-stock";

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
            isOutOfStock
              ? "bg-background-tertiary text-muted cursor-not-allowed"
              : "bg-background-tertiary text-primary hover:bg-background-secondary border border-theme hover:border-brand/50"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBuyNow}
          disabled={isOutOfStock || buyNowLoading}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
            isOutOfStock
              ? "bg-background-tertiary text-muted cursor-not-allowed"
              : "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:shadow-lg hover:shadow-[#F59E0B]/25"
          }`}
        >
          {buyNowLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Buy Now
            </>
          )}
        </motion.button>
      </div>

      {/* Wishlist Button
      <button className="w-full py-3 rounded-xl border border-theme hover:border-brand/50 text-muted hover:text-primary transition-colors flex items-center justify-center gap-2">
        <Heart className="w-5 h-5" />
        <span className="font-medium">Add to Wishlist</span>
      </button> */}

      {/* Product Actions Bar */}
      <ProductActionsBar
        // onCompare={onCompare}
        // onAskQuestion={onAskQuestion}
        onShare={onShare}
      />
    </div>
  );
}

/* ================= MAIN PAGE COMPONENT ================= */

export default function ProductPage() {
  const router = useRouter();
  const {
    product,
    loading,
    error,
    quantity,
    selectedImageIndex,
    buyNowLoading,
    discountedPrice,
    stockStatus,
    formatPrice,
    setSelectedImageIndex,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    buyNow,
    shareProduct,
  } = useProductPage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Additional handlers for Crafto features
  const handleCompare = () => {
    // TODO: Implement compare functionality
    console.log("Compare product");
  };

  const handleAskQuestion = () => {
    // TODO: Implement ask question functionality
    console.log("Ask question about product");
  };

  if (loading) return <ProductPageSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-background-tertiary flex items-center justify-center">
            <Package className="w-10 h-10 text-muted" />
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">
            Product Not Found
          </h2>
          <p className="text-secondary mb-6">
            {error ||
              "This product may have been removed or is temporarily unavailable."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl bg-background-tertiary hover:bg-background-secondary text-primary font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button - Mobile Only */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-theme">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb productName={product.name} />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="lg:w-1/2">
            <ProductImageGallery
              images={product.images}
              selectedIndex={selectedImageIndex}
              onSelect={setSelectedImageIndex}
              onOpenLightbox={openLightbox}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2">
            <ProductHeader
              product={product}
              formatPrice={formatPrice}
              discountedPrice={discountedPrice}
              stockStatus={stockStatus}
              averageRating={product.averageRating || 4.9}
              totalReviews={product.totalReviews || 165}
            />

            {/* Color and Size Selectors
            <ColorSelector /> */}
            <SizeSelector />

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              stock={product.stock}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />

            {/* Product Actions */}
            <ProductActions
              stockStatus={stockStatus}
              onAddToCart={addToCart}
              onBuyNow={buyNow}
              onShare={shareProduct}
              buyNowLoading={buyNowLoading}
              onCompare={handleCompare}
              onAskQuestion={handleAskQuestion}
            />

            {/* Divider */}
            <div className="h-px w-full bg-theme my-6"></div>

            {/* Shipping Info */}
            <ShippingInfo />

            {/* Secure Checkout */}
            <SecureCheckout />

            {/* Category Tags */}
            <CategoryTags
              category={product.category?.name}
              tags={["Fashion", "Lightweight", "Minimal", "Trendy"]}
            />
          </div>
        </div>
        {/* Product Tabs - Detailed Information */}
        <ProductTabs />
        {/* Related Products
        <RelatedProducts /> */}
      </div>

      {/* Mobile Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-theme p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
              {formatPrice(discountedPrice)}
            </div>
            {product.discount > 0 && (
              <div className="text-sm text-muted line-through">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={buyNow}
            disabled={stockStatus === "out-of-stock" || buyNowLoading}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${
              stockStatus === "out-of-stock"
                ? "bg-background-tertiary text-muted cursor-not-allowed"
                : "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:shadow-lg hover:shadow-[#F59E0B]/30"
            }`}
          >
            {buyNowLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Buy Now
              </div>
            )}
          </motion.button>
        </div>
      </div>
      {/* Image Lightbox */}
      {lightboxOpen && product.images && product.images.length > 0 && (
        <ImageLightbox
          images={product.images}
          selectedIndex={lightboxIndex}
          onClose={closeLightbox}
          onIndexChange={(index) => {
            setLightboxIndex(index);
            setSelectedImageIndex(index);
          }}
        />
      )}
    </div>
  );
}
