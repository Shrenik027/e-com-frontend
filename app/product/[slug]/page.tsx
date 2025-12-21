"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleProduct } from "@/services/product";
import AddToCartButton from "@/components/AddToCart";

export default function ProductPage() {
  const { slug } = useParams(); // slug = productId
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(slug as string);
        setProduct(data);
      } catch (err: any) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          className="w-full h-[450px] object-cover"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <p className="text-2xl font-bold text-[#1f3655] mb-4">
          ₹{product.price}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Category: {product.category?.name} <br />
          Brand: {product.brand?.name}
        </p>

        <AddToCartButton productId={product._id} />
      </div>
    </div>
  );
}
