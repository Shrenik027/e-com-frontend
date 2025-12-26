"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, FileText } from "lucide-react";
import type { Variants, Transition } from "framer-motion";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "collect",
      title: "1. Information We Collect",
      icon: <FileText className="w-5 h-5" />,
      content: "We may collect the following information:",
      items: [
        "Name",
        "Email address",
        "Phone number",
        "Shipping address",
        "Order and payment details",
        "IP address and browser information",
      ],
    },
    {
      id: "use",
      title: "2. How We Use Your Information",
      icon: <Eye className="w-5 h-5" />,
      content: "We use your information to:",
      items: [
        "Process and deliver orders",
        "Communicate order updates",
        "Provide customer support",
        "Improve our services and website",
        "Prevent fraud and misuse",
      ],
    },
    {
      id: "sharing",
      title: "3. Data Sharing",
      icon: <UserCheck className="w-5 h-5" />,
      content:
        "We do not sell your personal data. We may share information only with:",
      items: [
        "Shipping partners",
        "Payment gateways",
        "Legal authorities when required by law",
      ],
    },
    {
      id: "security",
      title: "4. Data Security",
      icon: <Lock className="w-5 h-5" />,
      content:
        "We use secure systems and encryption to protect your data. However, no online transmission is 100% secure.",
      items: [],
    },
    {
      id: "rights",
      title: "5. Your Rights",
      icon: <Shield className="w-5 h-5" />,
      content: "You may request:",
      items: ["Access to your data", "Correction or deletion of your data"],
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

  const listItemTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
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
              <Shield className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Privacy Policy
            </h1>

            <p className="text-lg text-secondary max-w-3xl mx-auto mb-8">
              At Shrix, we value your privacy and are committed to protecting
              your personal information.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-tertiary border border-theme">
              <span className="text-muted text-sm">Last updated:</span>
              <span className="text-secondary font-medium">[add date]</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 lg:p-8 hover:border-[var(--color-border)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/5">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-background-tertiary)] to-[var(--color-border)] flex items-center justify-center group-hover:from-[var(--color-primary)]/10 group-hover:to-[#F97316]/10 transition-all duration-300">
                      <div className="text-brand group-hover:scale-110 transition-transform duration-300">
                        {section.icon}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      {section.title}
                    </h2>

                    <p className="text-secondary mb-4">{section.content}</p>

                    {section.items.length > 0 && (
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + itemIndex * 0.05,
                              ...listItemTransition,
                            }}
                            className="flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2" />
                            <span className="text-secondary leading-relaxed">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Contact Section */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-[var(--color-background-tertiary)] to-[var(--color-background-secondary)] rounded-2xl border border-theme p-8 lg:p-10"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Contact Us
              </h3>

              <p className="text-secondary mb-6 max-w-2xl mx-auto">
                For privacy-related concerns or to exercise your rights, please
                contact us at:
              </p>

              <motion.a
                href="mailto:support@shrix.store"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#F97316] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-all duration-300 min-h-[44px]"
                aria-label="Contact support via email"
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

              <p className="text-muted text-sm mt-6">
                We aim to respond to all privacy inquiries within 48 hours.
              </p>
            </div>
          </motion.section>

          {/* Additional Notes */}
          <motion.div
            variants={itemVariants}
            className="bg-background-tertiary rounded-xl border border-theme p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-sm font-medium text-secondary">
                Important Note
              </span>
            </div>

            <p className="text-muted text-sm leading-relaxed">
              This privacy policy may be updated periodically to reflect changes
              in our practices. We encourage you to review this page regularly
              for the latest information on our privacy practices.
            </p>
          </motion.div>
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
