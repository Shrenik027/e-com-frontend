"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HelpCircle,
  Scale,
  CreditCard,
  Mail,
  ArrowRight,
  Shield,
  FileText,
  RefreshCw,
  Truck,
  Package,
  Cookie,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [year, setYear] = useState<number>();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const legalLinks = [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Refund Policy",
      href: "/refund-policy",
      icon: <RefreshCw className="w-4 h-4" />,
    },
    {
      label: "Shipping Policy",
      href: "/shipping-policy",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      label: "Return Policy",
      href: "/return-policy",
      icon: <Package className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 pt-6">
        {/* Card - Mobile optimized padding */}
        <div className="bg-background rounded-2xl border border-theme p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Mobile: Accordion Layout */}
          <div className="block md:hidden space-y-4">
            {/* Brand Section - Always visible */}
            <div className="pb-4 border-b border-theme/30">
              <img
                src="/SHRIX.png"
                alt="Shrix"
                className="h-8 mb-3"
                loading="lazy"
              />
              <p className="text-sm text-muted leading-relaxed">
                Curated products designed for modern living. Simple, reliable,
                and delivered across India.
              </p>
            </div>

            {/* Support Accordion */}
            <div className="border-b border-theme/30 pb-4">
              <button
                onClick={() => toggleSection("support")}
                className="w-full flex items-center justify-between py-3"
                aria-expanded={expandedSection === "support"}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-muted" />
                  <h4 className="text-sm font-semibold text-primary">
                    Support
                  </h4>
                </div>
                {expandedSection === "support" ? (
                  <ChevronUp className="w-4 h-4 text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "support" && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-2 pl-6 mt-2"
                  >
                    <li>
                      <Link
                        href="/faq"
                        className="group flex items-center gap-2 text-sm text-muted hover:text-secondary py-2"
                      >
                        <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="group flex items-center gap-2 text-sm text-muted hover:text-secondary py-2"
                      >
                        <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <a
                        href="mailto:support@shrix.store"
                        className="group flex items-center gap-2 text-sm text-muted hover:text-secondary py-2"
                      >
                        <Mail className="w-4 h-4 group-hover:animate-pulse" />
                        support@shrix.store
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Legal Accordion */}
            <div className="border-b border-theme/30 pb-4">
              <button
                onClick={() => toggleSection("legal")}
                className="w-full flex items-center justify-between py-3"
                aria-expanded={expandedSection === "legal"}
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-muted" />
                  <h4 className="text-sm font-semibold text-primary">Legal</h4>
                </div>
                {expandedSection === "legal" ? (
                  <ChevronUp className="w-4 h-4 text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "legal" && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-2 pl-6 mt-2"
                  >
                    {legalLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-sm text-muted hover:text-secondary py-2"
                        >
                          <span className="group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Payments Section */}
            <div>
              <div className="flex items-center gap-2 py-3">
                <CreditCard className="w-4 h-4 text-muted" />
                <h4 className="text-sm font-semibold text-primary">Payments</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed pl-6">
                Secure checkout powered by{" "}
                <span className="text-secondary font-medium">Razorpay</span>.
                Supports UPI, Cards, Net Banking & COD.
              </p>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <img
                src="/SHRIX.png"
                alt="Shrix"
                className="h-8 md:h-10 mb-4"
                loading="lazy"
              />
              <p className="text-sm text-muted leading-relaxed max-w-xs">
                Curated products designed for modern living. Simple, reliable,
                and delivered across India.
              </p>
            </div>

            {/* Support */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-muted" />
                <h4 className="text-sm font-semibold text-primary">Support</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/faq"
                    className="group flex items-center gap-2 text-muted hover:text-secondary transition-all duration-300"
                  >
                    <HelpCircle className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      FAQs
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 text-muted hover:text-secondary transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@shrix.store"
                    className="group flex items-center gap-2 text-muted hover:text-secondary transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 group-hover:animate-pulse" />
                    <span className="group-hover:underline decoration-[#F59E0B] decoration-2 underline-offset-2 transition-all duration-300">
                      support@shrix.store
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-4 h-4 text-muted" />
                <h4 className="text-sm font-semibold text-primary">Legal</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-muted hover:text-secondary transition-all duration-300"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-[#F59E0B] to-[#F97316] transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payments */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-muted" />
                <h4 className="text-sm font-semibold text-primary">Payments</h4>
              </div>
              <div className="text-sm text-muted leading-relaxed group">
                <p className="group-hover:text-secondary transition-colors duration-300">
                  Secure checkout powered by{" "}
                  <span className="text-secondary font-medium group-hover:text-[#F59E0B] transition-colors duration-300">
                    Razorpay
                  </span>
                  . Supports UPI, Cards, Net Banking & COD.
                </p>
                <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                  <div className="w-1 h-1 rounded-full bg-[#F97316]" />
                  <div className="w-1 h-1 rounded-full bg-[#38BDF8]" />
                </div>
              </div>
            </div>
          </div>

          {/* Divider - Responsive */}
          <div className="relative my-6 md:my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-theme to-transparent" />
            <div className="absolute left-0 top-1/2 h-1 w-1 md:h-2 md:w-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] animate-pulse" />
          </div>

          {/* Bottom Section - Stack on mobile, row on desktop */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
            <p className="group hover:text-secondary transition-colors duration-300 text-center md:text-left">
              © {year} Shrix. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
              <Link
                href="/privacy-policy"
                className="group flex items-center gap-1 text-muted hover:text-secondary transition-all duration-300 px-2 py-1"
              >
                <Shield className="w-3 h-3 group-hover:animate-bounce" />
                <span className="group-hover:underline decoration-[#38BDF8] underline-offset-2">
                  Privacy
                </span>
              </Link>
              <Link
                href="/terms"
                className="group flex items-center gap-1 text-muted hover:text-secondary transition-all duration-300 px-2 py-1"
              >
                <FileText className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:underline decoration-[#22C55E] underline-offset-2">
                  Terms
                </span>
              </Link>
              <Link
                href="/cookie-policy"
                className="group flex items-center gap-1 text-muted hover:text-secondary transition-all duration-300 px-2 py-1"
              >
                <Cookie className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:underline decoration-[#F59E0B] underline-offset-2">
                  Cookies
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 hidden md:inline" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
