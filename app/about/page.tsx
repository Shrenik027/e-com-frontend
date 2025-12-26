"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Target,
  Shield,
  Truck,
  Users,
  Star,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AboutUs() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastUpdated(currentDate);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const companyValues = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Practical Use",
      description: "Products designed for everyday life",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Clean Design",
      description: "Minimal, functional, and stylish",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Everyday Value",
      description: "Quality that doesn't break the bank",
    },
  ];

  const operationalBenefits = [
    "Keep prices fair and transparent",
    "Reduce unnecessary overhead costs",
    "Deliver products efficiently across India",
    "Focus on quality checks and customer experience",
    "Partner with trusted fulfillment providers",
  ];

  const customerCommitments = [
    {
      title: "Transparent Pricing",
      description: "No hidden charges, clear cost breakdown",
    },
    {
      title: "Secure Payments",
      description: "Multiple options including Cash on Delivery",
    },
    {
      title: "Clear Communication",
      description: "Updates from order to delivery",
    },
    {
      title: "Responsive Support",
      description: "Help when you need it",
    },
  ];

  const whyChooseUs = [
    "Curated selection - no more decision fatigue",
    "Direct-to-customer fulfillment model",
    "Nationwide delivery across India",
    "Continuous improvement based on feedback",
    "Your trust is our priority",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-background-tertiary border border-theme mb-6">
              <Heart className="w-8 h-8 text-brand" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              About Shrix
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8">
              Modern e-commerce built on reliability, style, and accessibility
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary border border-theme">
              <span className="text-muted text-sm">Established in</span>
              <span className="text-secondary font-medium">2023</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Who We Are Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 border border-theme flex items-center justify-center">
                  <Users className="w-7 h-7 text-brand" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  Who We Are
                </h2>
                <p className="text-lg text-secondary">
                  Shrix is a modern e-commerce brand built with a simple goal —
                  to make everyday shopping reliable, stylish, and accessible.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-background-tertiary border border-theme">
              <p className="text-secondary leading-relaxed">
                We curate products that combine quality, functionality, and
                value, so you can shop with confidence without spending hours
                comparing options.
              </p>
            </div>
          </div>
        </motion.section>

        {/* What We Believe Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#38BDF8]/10 to-[#60A5FA]/10 border border-theme flex items-center justify-center">
                  <Star className="w-7 h-7 text-[#38BDF8]" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  What We Believe
                </h2>
                <p className="text-lg text-secondary">
                  We believe that good products don't need loud promises — they
                  need honest pricing, consistent quality, and dependable
                  service.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-background-tertiary rounded-xl border border-theme p-6 text-center hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-brand">{value.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-secondary">{value.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-background-tertiary border border-theme">
              <p className="text-secondary text-center">
                Every product on Shrix is selected to meet our standards for
                practical use, clean design, and everyday value.
              </p>
            </div>
          </div>
        </motion.section>

        {/* How We Work Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/10 border border-theme flex items-center justify-center">
                  <Truck className="w-7 h-7 text-[#22C55E]" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  How We Work
                </h2>
                <p className="text-lg text-secondary">
                  Shrix operates using a direct-to-customer fulfillment model,
                  allowing us to deliver value efficiently.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-background-tertiary border border-theme">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Operational Benefits
                </h3>
                <ul className="space-y-3">
                  {operationalBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        </div>
                      </div>
                      <span className="text-secondary">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-background-tertiary to-background-secondary border border-theme">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Fulfillment Partnership
                </h3>
                <p className="text-secondary mb-4">
                  We partner with trusted fulfillment providers to ensure smooth
                  packaging, shipping, and delivery — while we focus on customer
                  experience and quality checks.
                </p>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#38BDF8]" />
                  <span className="text-sm text-muted">
                    Quality verified at multiple checkpoints
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Customer Commitment Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                Our Commitment to Customers
              </h2>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                When you shop with Shrix, you can expect a shopping experience
                built on trust and transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {customerCommitments.map((commitment, index) => (
                <motion.div
                  key={commitment.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-background-tertiary rounded-xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {commitment.title}
                  </h3>
                  <p className="text-secondary text-sm">
                    {commitment.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-[#F59E0B]/5 to-[#F97316]/5 border border-theme text-center">
              <p className="text-secondary">
                <strong className="text-primary">
                  Your trust is important to us
                </strong>
                , and we work hard to earn it with every order.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Serving India Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-background-tertiary to-background-secondary rounded-2xl border border-theme p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#38BDF8]/10 to-[#60A5FA]/10 border border-theme flex items-center justify-center">
                  <div className="text-2xl font-bold text-[#38BDF8]">🇮🇳</div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  Serving Across India
                </h2>
                <p className="text-lg text-secondary mb-4">
                  Shrix proudly serves customers all across India, bringing
                  curated products straight to your doorstep — wherever you are.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-background border border-theme text-sm text-secondary">
                    Nationwide Delivery
                  </span>
                  <span className="px-3 py-1 rounded-full bg-background border border-theme text-sm text-secondary">
                    Metro & Rural Areas
                  </span>
                  <span className="px-3 py-1 rounded-full bg-background border border-theme text-sm text-secondary">
                    Doorstep Service
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Why Choose Us */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
            className="bg-background-secondary rounded-2xl border border-theme p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">
              Why Choose Shrix
            </h3>
            <ul className="space-y-4">
              {whyChooseUs.map((reason, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    </div>
                  </div>
                  <span className="text-secondary">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-background-tertiary to-background-secondary rounded-2xl border border-theme p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 border border-theme flex items-center justify-center">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  Let's Stay Connected
                </h3>
                <p className="text-secondary">
                  Have questions, feedback, or need assistance? We're always
                  here to help.
                </p>
              </div>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-background border border-theme">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#38BDF8]" />
                <div>
                  <p className="text-sm text-muted">Email Support</p>
                  <p className="text-lg font-medium text-primary">
                    support@shrix.store
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                (window.location.href = "mailto:support@shrix.store")
              }
              className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </motion.button>
          </motion.div>
        </div>

        {/* Our Promise */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <div className="bg-background-secondary rounded-2xl border border-theme p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 border border-theme mb-6">
                <Target className="w-8 h-8 text-brand" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Our Promise
              </h2>

              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-secondary leading-relaxed">
                  We're continuously improving — adding better products,
                  smoother experiences, and stronger support — so every visit to
                  Shrix feels worth your time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-theme"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Experience Shrix?
            </h3>
            <p className="text-secondary max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who trust us for their
              everyday shopping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.history.back()}
                className="px-6 py-3.5 rounded-lg border border-theme text-secondary hover:bg-background-tertiary hover:text-primary transition-all duration-200 font-medium h-[44px] flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/")}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center gap-2"
              >
                Start Shopping
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/contact")}
                className="px-6 py-3.5 rounded-lg border border-theme text-secondary hover:bg-background-tertiary hover:text-primary transition-all duration-200 font-medium h-[44px] flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Contact Us
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shrix. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            Building trust, one order at a time.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Add missing icon import
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);
