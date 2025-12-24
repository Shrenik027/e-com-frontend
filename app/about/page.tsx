"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Shield, Clock, Users, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            About Our Store
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We're dedicated to providing quality products and excellent service
            to our customers.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background-tertiary rounded-xl p-6 border border-theme"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-muted">
              To make online shopping simple, secure, and enjoyable for
              everyone. We focus on quality products, fair pricing, and
              exceptional customer service.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background-tertiary rounded-xl p-6 border border-theme"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">
              What We Value
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary font-medium mb-1">
                    Quality Products
                  </p>
                  <p className="text-sm text-muted">
                    Carefully selected items that meet our standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary font-medium mb-1">
                    Secure Shopping
                  </p>
                  <p className="text-sm text-muted">
                    Your safety and privacy are our priority.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary font-medium mb-1">
                    Reliable Service
                  </p>
                  <p className="text-sm text-muted">
                    Consistent and dependable delivery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Simple Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-background-tertiary rounded-xl p-4 border border-theme text-center">
              <div className="text-2xl font-bold text-brand mb-1">1M+</div>
              <div className="text-sm text-muted">Customers</div>
            </div>
            <div className="bg-background-tertiary rounded-xl p-4 border border-theme text-center">
              <div className="text-2xl font-bold text-brand mb-1">50K+</div>
              <div className="text-sm text-muted">Products</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-8"
          >
            <p className="text-muted mb-6">Ready to start shopping?</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/shop")}
              className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all"
            >
              Browse Products
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
