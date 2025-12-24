"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Truck,
  Headphones,
  Mail,
  Clock,
  MapPin,
  CreditCard,
  Package,
  HelpCircle,
  FileText,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Award,
  Users,
  Smartphone,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      console.log("Subscribed:", email);
      setEmail("");
      // Show success message
      alert("Thank you for subscribing!");
    }
  };

  return (
    <footer className="bg-background-secondary border-t border-theme text-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Identity Block */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block ">
              <span className="  ">
                <img
                  src="/SHRIX.png"
                  alt="Shrix Logo"
                  style={{ height: "140px", width: "auto" }}
                />
              </span>
            </Link>

            <p className="text-muted mb-6 leading-relaxed max-w-md">
              Premium products. Global quality. Trusted by thousands of
              customers across India and beyond.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              {[
                {
                  icon: <Award className="w-5 h-5" />,
                  label: "Premium Quality",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  label: "10K+ Customers",
                },
                { icon: <Shield className="w-5 h-5" />, label: "100% Secure" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-accent-blue" />
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { label: "All Products", href: "/shop" },
                { label: "New Arrivals", href: "/new" },
                { label: "Best Sellers", href: "/best-sellers" },
                { label: "Clearance Sale", href: "/sale" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent-blue" />
              Support
            </h3>
            <ul className="space-y-3">
              {[
                {
                  label: "Track Your Order",
                  href: "/track-order",
                  icon: <Package className="w-3 h-3" />,
                },
                {
                  label: "FAQs",
                  href: "/faq",
                  icon: <HelpCircle className="w-3 h-3" />,
                },
                {
                  label: "Contact Us",
                  href: "/contact",
                  icon: <Mail className="w-3 h-3" />,
                },
                {
                  label: "Shipping Info",
                  href: "/shipping",
                  icon: <Truck className="w-3 h-3" />,
                },
                {
                  label: "Returns & Exchanges",
                  href: "/returns",
                  icon: <ArrowRight className="w-3 h-3" />,
                },
                {
                  label: "Size Guide",
                  href: "/size-guide",
                  icon: <FileText className="w-3 h-3" />,
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.icon}
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-blue" />
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Return Policy", href: "/return-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
              ].map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="text-muted hover:text-secondary transition-colors text-sm"
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment & Security Section */}
        <div className="border-t border-theme pt-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-accent-green" />
                <h4 className="font-semibold text-primary">
                  Secure Payment Processing
                </h4>
              </div>
              <p className="text-sm text-muted max-w-2xl">
                All transactions are securely processed through Razorpay with
                256-bit SSL encryption. We are PCI-DSS compliant and your
                payment information is never stored.
              </p>
            </div>

            <div>
              {/* Payment Methods */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {[
                  { name: "Visa", icon: "💳" },
                  { name: "Mastercard", icon: "💳" },
                  { name: "RuPay", icon: "💳" },
                  { name: "UPI", icon: "📱" },
                  { name: "Net Banking", icon: "🏦" },
                  { name: "Wallet", icon: "👛" },
                ].map((method) => (
                  <div
                    key={method.name}
                    className="px-3 py-2 bg-background-tertiary rounded-lg text-sm font-medium border border-theme text-muted flex items-center gap-2"
                  >
                    <span>{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                ))}
              </div>

              {/* Contact & Social */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:support@shrix.store"
                    className="text-muted hover:text-secondary transition-colors text-sm flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    support@shrix.store
                  </a>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted">
                    <Clock className="w-4 h-4" />
                    <span>10AM-7PM IST</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted mr-2">Follow us:</span>
                  {[
                    {
                      icon: <Facebook className="w-5 h-5" />,
                      label: "Facebook",
                    },
                    {
                      icon: <Instagram className="w-5 h-5" />,
                      label: "Instagram",
                    },
                    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                    { icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-muted hover:text-secondary hover:bg-background-tertiary p-2 rounded-lg transition-all"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-theme mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted text-center md:text-left">
              <p>© {currentYear} SHRIX India Pvt. Ltd. All rights reserved.</p>
              <p className="mt-1">
                GSTIN: 27AAECA1234M1Z5 • CIN: U74999MH2022PTC123456 • Mumbai,
                Maharashtra, India
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Truck className="w-4 h-4 text-accent-blue" />
                <span>All India Delivery</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted">
                <Shield className="w-4 h-4 text-accent-green" />
                <span>7-Day Returns</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted">
                <Headphones className="w-4 h-4 text-brand" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-6 p-4 bg-background-tertiary/50 rounded-lg border border-theme">
          <div className="grid md:grid-cols-3 gap-4 text-xs text-muted">
            <div>
              <div className="font-medium text-secondary mb-1">
                Authenticity Guarantee
              </div>
              <p>All products are 100% authentic with manufacturer warranty.</p>
            </div>
            <div>
              <div className="font-medium text-secondary mb-1">
                Secure Checkout
              </div>
              <p>Your data is protected with bank-level security.</p>
            </div>
            <div>
              <div className="font-medium text-secondary mb-1">
                Easy Returns
              </div>
              <p>Not satisfied? We offer hassle-free returns within 7 days.</p>
            </div>
          </div>
          <p className="text-xs text-muted/70 text-center mt-4 pt-3 border-t border-theme/50">
            This website is operated by SHRIX India Pvt. Ltd. Prices are
            inclusive of all taxes. Images are for representation only. Product
            specifications may vary.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-theme/50">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-xs text-muted">Ships Worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs text-muted">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="text-xs text-muted">Verified Seller</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
