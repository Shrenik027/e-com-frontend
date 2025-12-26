"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  RefreshCw,
  Clock,
  XCircle,
  CheckCircle,
  Package,
} from "lucide-react";
import type { Variants, Transition } from "framer-motion";

export default function RefundPolicy() {
  const refundProcess = [
    {
      step: 1,
      title: "Raise Request",
      description: "Submit refund request within 48 hours of delivery",
      icon: <Clock className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-blue)]/20 to-[var(--color-accent-blue)]/10",
    },
    {
      step: 2,
      title: "Verification",
      description: "Our team reviews your request and documentation",
      icon: <CheckCircle className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-green)]/20 to-[var(--color-accent-green)]/10",
    },
    {
      step: 3,
      title: "Approval & Processing",
      description: "Approved refunds processed in 5-7 business days",
      icon: <RefreshCw className="w-5 h-5" />,
      color: "from-[var(--color-primary)]/20 to-[#F97316]/10",
    },
    {
      step: 4,
      title: "Credit Issued",
      description: "Amount credited to original payment method",
      icon: <DollarSign className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-blue)]/20 to-[var(--color-accent-blue)]/10",
    },
  ];

  const eligibleRefunds = [
    {
      title: "Damaged Product",
      description: "Product received in damaged condition",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Incorrect Product",
      description: "Different product delivered than ordered",
      icon: <XCircle className="w-5 h-5" />,
    },
    {
      title: "Pre-shipment Cancellation",
      description: "Order cancelled before shipping",
      icon: <RefreshCw className="w-5 h-5" />,
    },
  ];

  const nonRefundable = [
    "Products damaged due to misuse or improper handling",
    "Items without original packaging and accessories",
    "Products with removed or tampered security seals",
    "Customized or personalized products",
    "Digital products after download or access",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      } as Transition,
    },
  };

  const cardHoverTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background-tertiary)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent-blue)]/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#F97316] mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Refund Policy
            </h1>

            <p className="text-lg text-secondary max-w-3xl mx-auto mb-8">
              Transparent and fair refund process for your peace of mind
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-tertiary border border-theme">
              <span className="text-muted text-sm">Last updated:</span>
              <span className="text-secondary font-medium">[add date]</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Refund Process Timeline */}
          <section>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Refund Process Timeline
              </h2>
              <p className="text-secondary text-lg">
                Simple 4-step process for quick and hassle-free refunds
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {refundProcess.map((step) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: cardHoverTransition,
                  }}
                  className="group"
                >
                  <div
                    className={`h-full bg-background-secondary rounded-2xl border border-theme p-6 ${step.color} bg-gradient-to-br hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-brand font-bold">
                          {step.step}
                        </span>
                      </div>
                      <div className="text-[var(--color-accent-blue)]">
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-theme/50">
                      <span className="text-xs text-muted">
                        Step {step.step}/4
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Eligible Refunds Section */}
          <section className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-accent-green)]" />
                  <h2 className="text-2xl font-bold text-primary">
                    Eligible Refunds
                  </h2>
                </div>

                <p className="text-secondary mb-6">
                  Refunds are issued only under the following conditions:
                </p>

                <div className="space-y-4">
                  {eligibleRefunds.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-background-tertiary border border-theme/50 hover:border-[var(--color-accent-green)]/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent-green)]/20 to-transparent flex items-center justify-center">
                        <div className="text-[var(--color-accent-green)]">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">
                          {item.title}
                        </h3>
                        <p className="text-secondary text-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Non-Refundable Items */}
            <motion.div variants={itemVariants}>
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
                  <h2 className="text-2xl font-bold text-primary">
                    Non-Refundable Items
                  </h2>
                </div>

                <p className="text-secondary mb-6">
                  The following items are not eligible for refunds:
                </p>

                <ul className="space-y-3">
                  {nonRefundable.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2" />
                      <span className="text-secondary leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[var(--color-background-tertiary)] to-transparent border border-theme">
                  <p className="text-sm text-secondary">
                    <span className="font-semibold text-primary">Note:</span>{" "}
                    Refund requests must be raised within 48 hours of delivery.
                    Approved refunds are processed within 5–7 business days to
                    the original payment method.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Contact Section */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-[var(--color-background-tertiary)] to-[var(--color-background-secondary)] rounded-2xl border border-theme p-8 lg:p-10"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[#F97316]/20 mb-6">
                <RefreshCw className="w-6 h-6 text-brand" />
              </div>

              <h3 className="text-2xl font-bold text-primary mb-4">
                Need Help with a Refund?
              </h3>

              <p className="text-secondary mb-6 max-w-2xl mx-auto text-lg">
                Our support team is here to help you with any refund-related
                questions or requests.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="mailto:support@shrix.store"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-all duration-300 min-h-[44px]"
                  aria-label="Contact support for refund request"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  support@shrix.store
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-background-tertiary border border-theme text-secondary font-semibold rounded-xl hover:text-primary hover:border-brand/30 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all duration-300 min-h-[44px]"
                  aria-label="Visit contact page"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Contact Support
                </motion.a>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-4 rounded-xl bg-background-tertiary/50 border border-theme">
                  <div className="text-2xl font-bold text-brand mb-1">48h</div>
                  <p className="text-sm text-secondary">
                    Refund Request Window
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-background-tertiary/50 border border-theme">
                  <div className="text-2xl font-bold text-brand mb-1">5-7</div>
                  <p className="text-sm text-secondary">
                    Business Days Processing
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-background-tertiary/50 border border-theme">
                  <div className="text-2xl font-bold text-brand mb-1">24/7</div>
                  <p className="text-sm text-secondary">Support Available</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            variants={itemVariants}
            className="bg-background-secondary rounded-2xl border border-theme p-6 lg:p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How long does it take to receive my refund?",
                  a: "Approved refunds are processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your bank's processing time.",
                },
                {
                  q: "Can I return a product after 48 hours?",
                  a: "Refund requests must be raised within 48 hours of delivery. After this period, returns may only be accepted for warranty claims or manufacturing defects.",
                },
                {
                  q: "What payment methods are refunded?",
                  a: "Refunds are always credited to the original payment method used for the purchase.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-background-tertiary border border-theme/50 hover:border-[var(--color-accent-blue)]/30 transition-all duration-300"
                >
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)]" />
                    {faq.q}
                  </h3>
                  <p className="text-secondary text-sm pl-4">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Back to Top - Mobile Sticky Button */}
      <div className="sticky bottom-6 z-50 flex justify-center px-4">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-background-secondary border border-theme rounded-full text-secondary font-medium hover:text-primary hover:border-brand/30 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all duration-300 flex items-center gap-2 min-h-[44px]"
          aria-label="Scroll back to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <span className="hidden sm:inline">Back to Top</span>
          <span className="sm:hidden">Top</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
