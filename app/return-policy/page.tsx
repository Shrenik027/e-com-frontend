"use client";

import { motion } from "framer-motion";
import {
  RefreshCw,
  Shield,
  Package,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ReturnPolicy() {
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

  const eligibilityCriteria = [
    {
      title: "Damaged Product",
      description: "Product received with physical damage or defects",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Wrong Product",
      description: "Received different item than ordered",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      title: "Missing Parts",
      description: "Incomplete product or missing accessories",
      icon: <Package className="w-5 h-5" />,
    },
  ];

  const returnConditions = [
    "Return request must be raised within 48 hours of delivery",
    "Product must be unused and in original condition",
    "All original packaging and accessories must be included",
    "Tags and labels must be intact and not removed",
    "No signs of wear, tear, or personal use",
  ];

  const returnProcessSteps = [
    {
      step: 1,
      title: "Contact Support",
      description: "Email or call with order ID and clear images",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      step: 2,
      title: "Get Approval",
      description: "Our team reviews and provides return authorization",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      step: 3,
      title: "Ship Product",
      description: "Follow packing instructions and ship to our center",
      icon: <Package className="w-5 h-5" />,
    },
    {
      step: 4,
      title: "Receive Refund",
      description: "Refund processed within 5-7 business days after inspection",
      icon: <RefreshCw className="w-5 h-5" />,
    },
  ];

  const importantNotes = [
    "Return approval is subject to quality checks by our team",
    "Refunds will be issued to the original payment method",
    "Shipping charges are non-refundable unless our error",
    "Customized or personalized items cannot be returned",
    "Digital products and gift cards are non-returnable",
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
              <RefreshCw className="w-8 h-8 text-brand" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Return Policy
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8">
              Hassle-free returns and exchanges for your peace of mind
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
                <Shield className="w-5 h-5 text-brand" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Customer Satisfaction Guarantee
              </h2>
              <p className="text-secondary">
                We stand behind our products. If you're not completely
                satisfied, our return policy ensures a fair and transparent
                process.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Section 1: Return Eligibility */}
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
                      <CheckCircle className="w-6 h-6 text-brand" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      1. Return Eligibility
                    </h2>
                    <p className="text-muted mt-1">Valid reasons for returns</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {eligibilityCriteria.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-lg bg-background-tertiary border border-theme"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                            <div className="text-[#38BDF8]">{item.icon}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 2: Return Conditions */}
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
                      2. Return Conditions
                    </h2>
                    <p className="text-muted mt-1">
                      Requirements for valid returns
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {returnConditions.map((condition, index) => (
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
                      <span className="text-secondary">{condition}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-theme">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#F59E0B]/5 to-[#F97316]/5 border border-theme">
                    <Clock className="w-5 h-5 text-brand" />
                    <span className="text-secondary">
                      <strong className="text-primary">Time limit:</strong> 48
                      hours from delivery confirmation
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Section 3: Return Process */}
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
                      <RefreshCw className="w-6 h-6 text-brand" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      3. Return Process
                    </h2>
                    <p className="text-muted mt-1">Step-by-step guide</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {returnProcessSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="relative p-4 rounded-lg bg-background-tertiary border border-theme"
                    >
                      <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="flex items-start gap-3 ml-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                            <div className="text-[#38BDF8]">{step.icon}</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-secondary">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Important Notes */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.9 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-background-tertiary to-background-secondary p-6 rounded-2xl border border-theme">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-brand" />
                  <h3 className="text-xl font-semibold text-primary">
                    Important Notes
                  </h3>
                </div>
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

            {/* CTA Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-theme"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  Need to Return an Item?
                </h3>
                <p className="text-secondary mb-6">
                  Our support team is here to help with your return request
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
                    Start Return
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
          transition={{ delay: 1.1 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shrix. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            For international returns, additional terms and shipping may apply
          </p>
        </motion.div>
      </div>
    </div>
  );
}
