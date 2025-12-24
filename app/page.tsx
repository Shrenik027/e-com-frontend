"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Truck,
  Star,
  ShoppingBag,
  Zap,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Package,
  Sparkles,
  Award,
  Headphones,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-background text-secondary overflow-x-hidden ">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-background-tertiary border border-theme text-accent-blue px-4 py-2.5 rounded-full text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span>Limited Edition • Act Fast</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary">
                Premium Products.
                <span className="block mt-3 bg-gradient-brand bg-clip-text text-transparent">
                  Global Quality.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-muted mb-8 max-w-lg leading-relaxed">
                Discover curated premium products from global suppliers at
                prices traditional retailers can't match.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href="/shop"
                    className="group inline-flex items-center justify-center gap-3 bg-gradient-brand text-black px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all shadow-lg w-full sm:w-auto"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href="/collections"
                    className="group inline-flex items-center justify-center gap-3 bg-background-tertiary border border-theme text-secondary px-8 py-4 rounded-xl font-medium hover:bg-background-secondary transition-all w-full sm:w-auto"
                  >
                    <Package className="w-5 h-5" />
                    <span>Browse Collections</span>
                  </Link>
                </motion.div>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-theme">
                {[
                  {
                    value: "9K+",
                    label: "Happy customers",
                    icon: <Users className="w-5 h-5 text-accent-blue" />,
                  },
                  {
                    value: "2.5K+",
                    label: "Orders / hour",
                    icon: <TrendingUp className="w-5 h-5 text-brand" />,
                  },
                  {
                    value: "90%",
                    label: "5★ rating",
                    icon: <Star className="w-5 h-5 text-accent-green" />,
                  },
                ].map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="flex justify-center mb-3">
                      {metric.icon}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Main Product Card */}
              <div className="relative bg-background-secondary rounded-2xl p-8 border border-theme shadow-2xl">
                {/* Status Badge */}
                <div className="absolute -top-3 right-8 bg-gradient-brand text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  🔥 HOT DEAL
                </div>

                <div className="aspect-square bg-gradient-to-br from-background-tertiary to-background-secondary rounded-xl mb-6 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-48 h-48 bg-brand/10 rounded-full flex items-center justify-center"
                  >
                    <Package className="w-32 h-32 text-brand/30" />
                  </motion.div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                    <span className="text-muted text-sm">
                      Limited Stock Available
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Premium Collection
                  </h3>
                  <p className="text-muted text-base mb-6">
                    Exclusive product with premium detailing
                  </p>

                  {/* Price Display */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
                    <span className="text-4xl font-bold text-primary">
                      ₹2,499
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-muted line-through">
                        ₹3,999
                      </span>
                      <span className="bg-accent-green/10 text-accent-green px-3 py-1.5 rounded-full text-sm font-bold">
                        Save 38%
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/product/premium-collection"
                      className="inline-flex items-center justify-center gap-2 bg-background-tertiary hover:bg-background-secondary text-secondary px-8 py-3.5 rounded-lg font-medium w-full transition-colors border border-theme"
                    >
                      View Product Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Floating Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-background-secondary rounded-xl p-4 border border-theme shadow-xl max-w-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      Verified Purchase
                    </div>
                    <p className="text-sm text-muted">
                      "Premium quality and excellent service. Highly recommend!"
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Pillars Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Customers Trust Us
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Premium service and quality that sets us apart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-accent-blue" />,
                title: "Premium Quality",
                description:
                  "Every product meets our rigorous quality standards.",
                color: "border-l-accent-blue",
              },
              {
                icon: <Shield className="w-8 h-8 text-accent-green" />,
                title: "Secure Shopping",
                description:
                  "Bank-level encryption and secure payment processing.",
                color: "border-l-accent-green",
              },
              {
                icon: <Headphones className="w-8 h-8 text-brand" />,
                title: "24/7 Support",
                description:
                  "Dedicated customer support whenever you need help.",
                color: "border-l-brand",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-background-tertiary rounded-2xl p-8 border border-theme ${item.color} border-l-4 hover:border-l-8 transition-all duration-300`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-background-secondary to-background-tertiary rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-background-secondary to-background-tertiary rounded-2xl p-8 md:p-12 border border-theme text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Exclusive Offer
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Start Shopping Today
            </h2>

            {/* Description */}
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for premium
              quality products.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
              {[
                "Free shipping over ₹999",
                "30-day returns",
                "Authenticity guaranteed",
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-3 text-secondary bg-background-tertiary py-3 px-4 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                  <span className="font-medium text-sm sm:text-base">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/shop"
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-brand text-black px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all shadow-lg w-full sm:w-auto"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/collections"
                  className="group inline-flex items-center justify-center gap-3 bg-background-tertiary border border-theme text-secondary px-8 py-4 rounded-xl font-medium hover:bg-background-secondary transition-all w-full sm:w-auto"
                >
                  <Package className="w-5 h-5" />
                  <span>Browse Collections</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
