"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertCircle, FileText, Lock } from "lucide-react";
import { useState, useEffect } from "react";

export default function TermsAndConditions() {
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

  const sections = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Eligibility",
      points: [
        "You must be at least 18 years old to use this website.",
        "By accessing Shrix, you confirm you meet all eligibility requirements.",
      ],
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Orders & Payments",
      points: [
        "All orders are subject to product availability and confirmation.",
        "Prices may change without prior notice.",
        "We reserve the right to cancel orders due to pricing errors, stock issues, or suspected fraud.",
        "Payment must be completed in full before order processing begins.",
      ],
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "User Responsibilities",
      points: [
        "Provide accurate and complete information during account creation and checkout.",
        "Maintain the confidentiality of your account credentials.",
        "Not misuse or disrupt website functionality.",
        "Not engage in fraudulent, illegal, or unauthorized activities.",
        "Report any suspicious activity immediately.",
      ],
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Intellectual Property",
      points: [
        "All content including logos, images, text, and designs are property of Shrix.",
        "Unauthorized reproduction or distribution is strictly prohibited.",
        "User-generated content remains user property but grants Shrix usage rights.",
        "Third-party trademarks remain property of their respective owners.",
      ],
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Limitation of Liability",
      points: [
        "Shrix is not liable for indirect, incidental, or consequential damages.",
        "We are not responsible for third-party service disruptions.",
        "Product warranties are provided by manufacturers where applicable.",
        "Users assume responsibility for complying with local laws and regulations.",
      ],
    },
  ];

  const importantNotes = [
    "These terms may be updated periodically. Continued use constitutes acceptance.",
    "For questions, contact our support team before proceeding.",
    "Violation of terms may result in account suspension or legal action.",
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
              <Shield className="w-8 h-8 text-brand" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Terms & Conditions
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8">
              Please read these terms carefully before using our services
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary border border-theme">
              <span className="text-muted text-sm">Last updated:</span>
              <span className="text-secondary font-medium">{lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-6 rounded-2xl bg-background-secondary border border-theme"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-brand" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Important Notice
              </h2>
              <p className="text-secondary">
                By accessing or using Shrix, you agree to be bound by these
                Terms & Conditions. If you do not agree with any part of these
                terms, please discontinue use immediately.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 + 0.3 }}
              className="group"
            >
              <div className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-background-tertiary border border-theme flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-[#4B5563] transition-colors">
                      <div className="text-brand">{section.icon}</div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    {index + 1}. {section.title}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {section.points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.4 + pointIndex * 0.05,
                      }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        </div>
                      </div>
                      <span className="text-secondary">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <div className="bg-gradient-to-r from-background-tertiary to-transparent p-6 rounded-2xl border border-theme">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Additional Information
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

        {/* Acceptance Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-theme"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Need Assistance?
              </h3>
              <p className="text-secondary">
                Contact our support team for clarification on any terms
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center"
              >
                I Accept Terms
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shrix. All rights reserved. Version 1.0
          </p>
          <p className="text-xs text-muted mt-2">
            These terms are governed by the laws of [Your Country/State]
          </p>
        </motion.div>
      </div>
    </div>
  );
}
