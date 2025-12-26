"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Package,
  Clock,
  AlertCircle,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ShippingPolicy() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    // Set the current date as last updated
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

  const shippingLocations = [
    "All states and union territories across India",
    "Standard shipping available nationwide",
    "Express shipping available in metro cities",
    "Remote areas may have extended delivery times",
  ];

  const shippingTimeDetails = [
    {
      phase: "Order Processing",
      time: "1–3 business days",
      description: "Time to verify payment, prepare, and pack your order",
    },
    {
      phase: "Standard Delivery",
      time: "5–10 business days",
      description: "Delivery time after processing, varies by location",
    },
    {
      phase: "Express Delivery",
      time: "2–4 business days",
      description: "Available in select metro cities for additional charge",
    },
  ];

  const delayReasons = [
    {
      reason: "Courier Service Issues",
      description: "Logistical challenges or service disruptions",
    },
    {
      reason: "Weather Conditions",
      description:
        "Monsoon, floods, or extreme weather affecting transportation",
    },
    {
      reason: "High Demand Periods",
      description: "Festive seasons, sales, or promotional events",
    },
    {
      reason: "Customs Clearance",
      description: "For international shipping where applicable",
    },
    {
      reason: "Remote Locations",
      description: "Hard-to-reach areas with limited courier service",
    },
  ];

  const trackingInfo = [
    "Tracking details sent via email and SMS once shipped",
    "Real-time tracking available on courier partner's website",
    "Delivery notifications sent before arrival",
    "Contact support if tracking doesn't update for 48+ hours",
  ];

  const importantNotes = [
    "Business days exclude weekends and public holidays",
    "Delivery attempts: 2 attempts maximum before return to warehouse",
    "Failed deliveries may incur additional re-shipping charges",
    "Contact us within 24 hours for address change requests",
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
              <Truck className="w-8 h-8 text-brand" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Shipping Policy
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8">
              Transparent shipping information for a seamless delivery
              experience
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary border border-theme">
              <span className="text-muted text-sm">Last updated:</span>
              <span className="text-secondary font-medium">{lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-6 rounded-2xl bg-background-secondary border border-theme"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-brand" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Delivery Promise
              </h2>
              <p className="text-secondary">
                We strive to deliver your orders as quickly and reliably as
                possible. This policy outlines our shipping procedures,
                timelines, and what to expect.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Section 1: Shipping Locations */}
            <motion.section
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="group"
            >
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                      <MapPin className="w-6 h-6 text-brand" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      1. Shipping Locations
                    </h2>
                    <p className="text-muted mt-1">
                      Nationwide delivery across India
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {shippingLocations.map((location, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#38BDF8]/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                        </div>
                      </div>
                      <span className="text-secondary">{location}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Section 2: Shipping Time */}
            <motion.section
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="group"
            >
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                      <Clock className="w-6 h-6 text-brand" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      2. Shipping Time
                    </h2>
                    <p className="text-muted mt-1">
                      Estimated delivery timelines
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {shippingTimeDetails.map((item, index) => (
                    <motion.div
                      key={item.phase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 rounded-lg bg-background-tertiary border border-theme"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-primary">
                          {item.phase}
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 text-brand text-sm font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-secondary">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-theme">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    <span className="text-secondary">
                      Total estimated delivery:{" "}
                      <strong className="text-primary">
                        6–13 business days
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Section 3: Delays */}
            <motion.section
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.7 }}
              className="group"
            >
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                      <AlertCircle className="w-6 h-6 text-brand" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      3. Delays & Tracking
                    </h2>
                    <p className="text-muted mt-1">
                      Potential delays and tracking information
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Common Delay Reasons
                  </h3>
                  <div className="space-y-3">
                    {delayReasons.map((item, index) => (
                      <motion.div
                        key={item.reason}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-background-tertiary/50"
                      >
                        <AlertCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-primary">
                            {item.reason}
                          </h4>
                          <p className="text-sm text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Tracking Information
                  </h3>
                  <ul className="space-y-3">
                    {trackingInfo.map((info, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                          </div>
                        </div>
                        <span className="text-secondary">{info}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Important Notes */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-background-tertiary to-background-secondary p-6 rounded-2xl border border-theme">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Important Notes
                </h3>
                <div className="space-y-3">
                  {importantNotes.map((note, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                        </div>
                      </div>
                      <p className="text-secondary">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-theme"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  Need Shipping Help?
                </h3>
                <p className="text-secondary mb-6">
                  Our support team is here to assist with any delivery questions
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.history.back()}
                    className="px-6 py-3.5 rounded-lg border border-theme text-secondary hover:bg-background-tertiary hover:text-primary transition-all duration-200 font-medium h-[44px] flex items-center justify-center"
                  >
                    Go Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Navigate to contact/support page
                      window.location.href = "/contact";
                    }}
                    className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center"
                  >
                    Contact Support
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.2 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shrix. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            Shipping rates and policies are subject to change without prior
            notice
          </p>
        </motion.div>
      </div>
    </div>
  );
}
