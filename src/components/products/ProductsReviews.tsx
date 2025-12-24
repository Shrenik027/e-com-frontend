"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react";
import API from "@/services/api";

interface Review {
  _id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export default function ProductReviews({
  productId,
  averageRating,
  totalReviews,
}: {
  productId: string;
  averageRating: number;
  totalReviews: number;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Implement when review endpoint is available
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await API.get(`/reviews/${productId}`);
  //       setReviews(response.data);
  //     } catch (err) {
  //       console.error("Failed to load reviews");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchReviews();
  // }, [productId]);

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary">Customer Reviews</h2>
          <p className="text-muted mt-1">See what our customers are saying</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
          Write a Review
        </button>
      </div>

      {/* Rating Summary */}
      <div className="bg-background-secondary rounded-2xl p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center lg:text-left">
            <div className="text-5xl font-bold text-primary">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center lg:justify-start gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(averageRating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted mt-2">{totalReviews} reviews</p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-muted">{rating}</span>
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                </div>
                <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted w-12 text-right">
                  {Math.round((rating / 5) * totalReviews)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background-secondary rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background-tertiary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-muted" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">
                      {review.user.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= review.rating
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted">
                        {new Date(review.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm text-muted hover:text-secondary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
              <p className="text-secondary leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex flex-col items-center gap-4">
            <MessageSquare className="w-16 h-16 text-muted" />
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                No reviews yet
              </h3>
              <p className="text-muted">Be the first to review this product</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
