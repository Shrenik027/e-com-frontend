"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Clock,
  Package,
  RefreshCw,
  Shield,
  Info,
  MessageSquare,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactUs() {
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

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "For all inquiries and support requests",
      details: "support@shrix.store",
      action: "Email Support",
      link: "mailto:support@shrix.store",
      color: "from-[#F59E0B]/10 to-[#F97316]/10",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Support Hours",
      description: "When you can reach our team",
      details: "Mon-Sat: 10:00 AM – 6:00 PM (IST)",
      note: "Excluding public holidays",
      color: "from-[#38BDF8]/10 to-[#60A5FA]/10",
    },
  ];

  const helpTopics = [
    {
      icon: <Package className="w-5 h-5" />,
      title: "Order-Related Queries",
      points: [
        "Include your Order ID for faster assistance",
        "Provide registered email address",
        "Brief description of your issue",
        "Attach relevant screenshots if applicable",
      ],
      tip: "This helps us resolve your request quickly",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Returns & Refunds",
      points: [
        "Refer to our Return Policy and Refund Policy",
        "Contact within 48 hours of delivery",
        "Include photos of damaged/wrong items",
        "Keep original packaging until resolution",
      ],
      tip: "For eligible issues only",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Privacy & Security",
      points: [
        "For privacy-related concerns",
        "Data access or deletion requests",
        "Security vulnerability reports",
        "Account security assistance",
      ],
      details: "Email: support@shrix.store",
      tip: "We take data protection seriously",
    },
  ];

  const businessInfo = {
    name: "Shrix",
    region: "India",
    operating: "We currently operate online only",
    details: "E-commerce fashion and accessories store",
  };

  const responseCommitment = [
    "Clear and transparent communication",
    "Honest updates about your request",
    "Timely resolutions and follow-ups",
    "Customer satisfaction is our top priority",
    "We strive to respond within 24-48 business hours",
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
              <MessageSquare className="w-8 h-8 text-brand" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Contact Us
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8">
              We're here to help! Reach out for order support, returns, or any
              questions
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
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-6 rounded-2xl bg-background-secondary border border-theme"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-brand" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                We're Here to Help!
              </h2>
              <p className="text-secondary">
                If you have any questions about your order, shipping, returns,
                or anything else, feel free to reach out to us. Our support team
                is always happy to assist you.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl ${info.color} border border-theme flex items-center justify-center`}
                    >
                      <div className="text-brand">{info.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-1">
                        {info.title}
                      </h3>
                      <p className="text-secondary text-sm mb-2">
                        {info.description}
                      </p>
                      {info.details && (
                        <p className="text-lg font-medium text-primary mt-2">
                          {info.details}
                        </p>
                      )}
                      {info.note && (
                        <p className="text-sm text-muted mt-1">{info.note}</p>
                      )}
                    </div>
                  </div>

                  {info.action && info.link && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = info.link)}
                      className="w-full mt-4 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center gap-2"
                    >
                      {info.action}
                      <Mail className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Business Information */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="bg-background-secondary rounded-2xl border border-theme p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#38BDF8]/10 to-[#60A5FA]/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  Business Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background-tertiary border border-theme">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary mb-1">
                        Store Name
                      </h4>
                      <p className="text-secondary">{businessInfo.name}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium text-primary mb-1">
                        Operating Region
                      </h4>
                      <p className="text-secondary">{businessInfo.region}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background-tertiary border border-theme">
                  <p className="text-secondary">{businessInfo.operating}</p>
                  <p className="text-sm text-muted mt-1">
                    {businessInfo.details}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Help Topics */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              {helpTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-background-secondary rounded-2xl border border-theme p-6 hover:border-gray-400 dark:hover:border-[#4B5563] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 flex items-center justify-center">
                      <div className="text-brand">{topic.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {topic.title}
                    </h3>
                  </div>

                  <ul className="space-y-3 mb-4">
                    {topic.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                          </div>
                        </div>
                        <span className="text-secondary">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {topic.details && (
                    <div className="mt-4 p-3 rounded-lg bg-background-tertiary border border-theme">
                      <p className="text-secondary">{topic.details}</p>
                    </div>
                  )}

                  {topic.tip && (
                    <div className="mt-4 pt-4 border-t border-theme">
                      <p className="text-sm text-muted">{topic.tip}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Response Commitment */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-background-tertiary to-background-secondary p-6 rounded-2xl border border-theme"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  Response Commitment
                </h3>
              </div>

              <div className="space-y-4">
                {responseCommitment.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                      </div>
                    </div>
                    <span className="text-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.2 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-theme"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Get Help?
            </h3>
            <p className="text-secondary max-w-2xl mx-auto mb-8">
              Our support team is standing by to assist you with any questions
              or concerns. Reach out to us via email for the fastest response.
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
                onClick={() =>
                  (window.location.href = "mailto:support@shrix.store")
                }
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#F59E0B]/10 h-[44px] flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Navigate to FAQ or Help Center
                  window.location.href = "/faq";
                }}
                className="px-6 py-3.5 rounded-lg border border-theme text-secondary hover:bg-background-tertiary hover:text-primary transition-all duration-200 font-medium h-[44px] flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Visit FAQ
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shrix. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            We typically respond within 24-48 business hours. For urgent
            matters, please email directly.
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
