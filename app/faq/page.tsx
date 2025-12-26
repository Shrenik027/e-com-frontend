"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Truck,
  RefreshCw,
  Package,
  User,
  Shield,
  HelpCircle,
  Mail,
} from "lucide-react";
import type { Variants, Transition } from "framer-motion";
import { useState } from "react";

export default function FAQPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const sections = [
    {
      id: "orders",
      title: "Orders & Payments",
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "from-[var(--color-primary)]/20 to-[#F97316]/10",
      questions: [
        {
          id: "order-1",
          q: "How do I place an order on Shrix?",
          a: "Simply browse our products, add your preferred item to the cart, and complete checkout using a secure payment method or Cash on Delivery.",
        },
        {
          id: "order-2",
          q: "What payment methods do you accept?",
          a: "We accept:\n\n• Online payments (UPI, Debit/Credit Cards, Net Banking)\n• Cash on Delivery (available on eligible orders)",
        },
        {
          id: "order-3",
          q: "Is it safe to pay on Shrix?",
          a: "Yes. All online payments are processed through secure and trusted payment gateways. Your payment details are never stored on our servers.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <Truck className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-blue)]/20 to-[var(--color-accent-blue)]/10",
      questions: [
        {
          id: "shipping-1",
          q: "Where do you ship?",
          a: "We currently ship across India.",
        },
        {
          id: "shipping-2",
          q: "How long does delivery take?",
          a: "• Order processing: 1–3 business days\n• Delivery: 5–10 business days depending on your location\n\nYou'll receive tracking details once your order is shipped.",
        },
        {
          id: "shipping-3",
          q: "How can I track my order?",
          a: "Once your order is shipped, we'll send you a tracking link via email so you can monitor your delivery status.",
        },
      ],
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: <RefreshCw className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-green)]/20 to-[var(--color-accent-green)]/10",
      questions: [
        {
          id: "returns-1",
          q: "Can I return a product?",
          a: "Yes, returns are accepted for:\n\n• Damaged products\n• Incorrect products received\n\nReturn requests must be raised within 48 hours of delivery.",
        },
        {
          id: "returns-2",
          q: "How do I request a return or refund?",
          a: "Please email us at support@shrix.store with:\n\n• Order ID\n• Issue description\n• Clear images (if applicable)\n\nOur team will guide you through the next steps.",
        },
        {
          id: "returns-3",
          q: "When will I receive my refund?",
          a: "Approved refunds are processed within 5–7 business days and credited back to the original payment method.",
        },
      ],
    },
    {
      id: "products",
      title: "Product Information",
      icon: <Package className="w-5 h-5" />,
      color: "from-[var(--color-primary)]/20 to-[#F97316]/10",
      questions: [
        {
          id: "products-1",
          q: "Are the products exactly as shown on the website?",
          a: "We make every effort to display accurate product images and descriptions. Minor variations may occur due to lighting or screen settings.",
        },
        {
          id: "products-2",
          q: "Do you test your products?",
          a: "We carefully select and review products before listing them to ensure they meet our quality and usability standards.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Support",
      icon: <User className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-blue)]/20 to-[var(--color-accent-blue)]/10",
      questions: [
        {
          id: "account-1",
          q: "Do I need an account to place an order?",
          a: "Creating an account is recommended for easy order tracking and faster checkout, but it is not mandatory.",
        },
        {
          id: "account-2",
          q: "How can I contact customer support?",
          a: "You can reach us at support@shrix.store. Our support team responds within 24–48 business hours.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
      color:
        "from-[var(--color-accent-green)]/20 to-[var(--color-accent-green)]/10",
      questions: [
        {
          id: "privacy-1",
          q: "Is my personal information safe?",
          a: "Yes. We respect your privacy and handle your data securely in accordance with our Privacy Policy.",
        },
      ],
    },
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

  const questionTransition: Transition = {
    type: "spring",
    stiffness: 300,
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
              <HelpCircle className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>

            <p className="text-lg text-secondary max-w-3xl mx-auto mb-8">
              Find quick answers to common questions about shopping on Shrix
            </p>

            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-6"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(
                      `section-${section.id}`
                    );
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      setOpenSection(section.id);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    openSection === section.id
                      ? "bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white"
                      : "bg-background-tertiary border border-theme text-secondary hover:text-primary hover:border-brand/30"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </motion.div>

            <p className="text-muted text-sm">
              Click on any question to see the answer
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* FAQ Sections */}
          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={`section-${section.id}`}
              variants={itemVariants}
              className="scroll-mt-24"
            >
              <div className="bg-background-secondary rounded-2xl border border-theme overflow-hidden">
                {/* Section Header */}
                <div
                  className={`p-6 border-b border-theme ${section.color} bg-gradient-to-r`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-background-tertiary flex items-center justify-center">
                      <div className="text-brand">{section.icon}</div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">
                        {section.title}
                      </h2>
                      <p className="text-secondary text-sm mt-1">
                        {section.questions.length} question
                        {section.questions.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-theme">
                  {section.questions.map((question, qIndex) => (
                    <motion.div
                      key={question.id}
                      initial={false}
                      animate={{
                        backgroundColor: openQuestions.has(question.id)
                          ? "var(--color-background-tertiary)"
                          : "transparent",
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full text-left p-6 hover:bg-background-tertiary/50 transition-colors duration-200 flex items-start justify-between gap-4 min-h-[44px]"
                        aria-expanded={openQuestions.has(question.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-background-tertiary)] to-transparent flex items-center justify-center mt-0.5">
                              <span className="text-xs font-bold text-secondary">
                                Q{qIndex + 1}
                              </span>
                            </div>
                            <h3 className="font-semibold text-primary text-lg">
                              {question.q}
                            </h3>
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            rotate: openQuestions.has(question.id) ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 text-brand"
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: openQuestions.has(question.id) ? "auto" : 0,
                          opacity: openQuestions.has(question.id) ? 1 : 0,
                        }}
                        transition={questionTransition}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-9 border-l-2 border-[var(--color-primary)]/30">
                            <div className="text-secondary whitespace-pre-line leading-relaxed">
                              {question.a}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}

          {/* Contact CTA Section */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-[var(--color-background-tertiary)] to-[var(--color-background-secondary)] rounded-2xl border border-theme p-8 lg:p-10"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[#F97316]/20 mb-6">
                <Mail className="w-6 h-6 text-brand" />
              </div>

              <h3 className="text-2xl font-bold text-primary mb-4">
                Still have questions?
              </h3>

              <p className="text-secondary mb-6 max-w-2xl mx-auto text-lg">
                We're here to help! Our support team is ready to assist you with
                any questions or concerns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="mailto:support@shrix.store"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-all duration-300 min-h-[44px]"
                  aria-label="Email support"
                >
                  <Mail className="w-5 h-5" />
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

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { value: "24-48h", label: "Response Time" },
                  { value: "100%", label: "Secure" },
                  { value: "7 Days", label: "Support" },
                  { value: "India", label: "Coverage" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-background-tertiary/50 border border-theme"
                  >
                    <div className="text-xl font-bold text-brand mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-secondary">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Related Links */}
          <motion.section
            variants={itemVariants}
            className="bg-background-secondary rounded-2xl border border-theme p-6 lg:p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              Related Information
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Shipping Policy",
                  description:
                    "Learn about our shipping methods and delivery times",
                  href: "/shipping",
                  color: "border-l-[var(--color-accent-blue)]",
                },
                {
                  title: "Return Policy",
                  description: "Understand our return and refund process",
                  href: "/returns",
                  color: "border-l-[var(--color-accent-green)]",
                },
                {
                  title: "Privacy Policy",
                  description: "Read about how we protect your data",
                  href: "/privacy",
                  color: "border-l-[var(--color-primary)]",
                },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="block p-4 rounded-xl bg-background-tertiary border border-theme hover:border-brand/30 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all duration-300"
                >
                  <div className={`pl-4 border-l-4 ${link.color}`}>
                    <h3 className="font-semibold text-primary mb-1">
                      {link.title}
                    </h3>
                    <p className="text-secondary text-sm">{link.description}</p>
                  </div>
                </motion.a>
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
