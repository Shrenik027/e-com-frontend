// components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Truck,
  RefreshCw,
  Headphones,
  CreditCard,
  Globe,
  ArrowRight,
  Send,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  Package,
  Lock,
  Award,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([0, 1]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Newsletter subscription:", email);
    setIsSuccess(true);
    setEmail("");
    setIsSubmitting(false);

    setTimeout(() => setIsSuccess(false), 5000);
  };

  // Trust Badges/Logos
  const trustBadges = [
    {
      name: "SSL Secure",
      icon: <Lock className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      name: "Google Trusted",
      icon: <Shield className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      name: "Verified",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      name: "Award Winner",
      icon: <Award className="w-6 h-6" />,
      color: "text-yellow-500",
    },
  ];

  // Payment Methods
  const paymentMethods = [
    "Visa",
    "Mastercard",
    "American Express",
    "PayPal",
    "Google Pay",
    "Apple Pay",
    "UPI",
    "Net Banking",
  ];

  // Social Media
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  // Quick Links Sections
  const footerSections = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/shop" },
        { label: "New Arrivals", href: "/shop?new=true" },
        { label: "Best Sellers", href: "/shop?bestsellers=true" },
        { label: "Trending Now", href: "/shop?trending=true" },
        { label: "Flash Deals", href: "/deals" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
    {
      title: "Categories",
      links: [
        { label: "Electronics", href: "/category/electronics" },
        { label: "Home & Living", href: "/category/home" },
        { label: "Fashion", href: "/category/fashion" },
        { label: "Beauty & Health", href: "/category/beauty" },
        { label: "Sports & Fitness", href: "/category/sports" },
        { label: "Books & Media", href: "/category/books" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Track Your Order", href: "/track" },
        { label: "Returns & Refunds", href: "/returns" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Size Guide", href: "/size-guide" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
        { label: "Affiliate Program", href: "/affiliate" },
        { label: "Sell With Us", href: "/sell" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  // Trust Features
  const trustFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "100% Secure Payments",
      description: "256-bit SSL encryption",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Free Shipping",
      description: "On orders above ₹999",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "30-Day Returns",
      description: "Hassle-free returns",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "24/7 Support",
      description: "Dedicated customer care",
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: "Quality Checked",
      description: "Every product verified",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Best Price Guarantee",
      description: "Found cheaper? We match it!",
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* ================= TRUST BANNER ================= */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">2K+</div>
                <div className="text-sm text-gray-300">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg"
                >
                  <div className={badge.color}>{badge.icon}</div>
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Newsletter & Contact */}
          <div>
            {/* Newsletter Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold">Join Our Community</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Be the first to know about exclusive deals, new arrivals, and
                insider tips. Join 100,000+ smart shoppers.
              </p>

              {isSuccess ? (
                <div className="bg-green-900/30 border border-green-800 rounded-xl p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">
                    Welcome to the family! 🎉
                  </h4>
                  <p className="text-green-200">
                    Check your email for a special 15% OFF welcome coupon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    By subscribing, you agree to our Privacy Policy and consent
                    to receive updates from us. Unsubscribe anytime.
                  </p>
                </form>
              )}

              {/* Bonus Offer */}
              <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">
                      Subscribers get 15% OFF first purchase
                    </div>
                    <div className="text-sm text-gray-300">
                      Plus early access to flash sales
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">24/7 Support</div>
                  <div className="text-blue-300 text-xl font-bold">
                    +91 12345 67890
                  </div>
                  <div className="text-gray-400">Call us anytime</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">Email Support</div>
                  <div className="text-blue-300">support@yourstore.com</div>
                  <div className="text-gray-400">Reply within 4 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">Business Hours</div>
                  <div className="text-gray-300">Mon-Fri: 9AM-8PM</div>
                  <div className="text-gray-300">Sat: 10AM-6PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Links & Features */}
          <div>
            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-4 mb-8">
              {footerSections.map((section, index) => (
                <div key={index} className="border-b border-gray-800 pb-4">
                  <button
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-bold">{section.title}</h3>
                    {openSections.includes(index) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {openSections.includes(index) && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors py-2 text-sm"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-8 mb-12">
              {footerSections.slice(0, 3).map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Trust Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {trustFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-blue-400">{feature.icon}</div>
                    <div className="font-bold text-sm">{feature.title}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* App Download */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">Get Our App</h3>
              <p className="text-gray-300 text-sm mb-4">
                Shop faster, track orders, and get exclusive app-only deals.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-black hover:bg-gray-900 rounded-xl p-3 flex items-center justify-center gap-2 transition-all duration-300">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.24 2.31-.93 3.57-.8 1.5.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>

                <button className="flex-1 bg-black hover:bg-gray-900 rounded-xl p-3 flex items-center justify-center gap-2 transition-all duration-300">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35z" />
                      <path d="M20.5 3H14l9.85 9.85L20.5 3z" />
                      <path d="M14 21h6.5c.83 0 1.5-.67 1.5-1.5v-16c0-.83-.67-1.5-1.5-1.5H14v19z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright & Links */}
            <div className="text-center md:text-left">
              <div className="text-gray-400 text-sm mb-2">
                © {new Date().getFullYear()} YourStore. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/sitemap"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap justify-center gap-2">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-lg text-xs text-gray-300 border border-gray-700"
                >
                  {method}
                </div>
              ))}
            </div>

            {/* Country/Language Selector */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm">India | English</span>
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500 max-w-3xl mx-auto">
              *Prices are inclusive of all taxes. Free shipping on orders above
              ₹999. Product images are for illustration purposes only. Actual
              product may vary. Prices and availability are subject to change.
              <Link
                href="/disclaimer"
                className="text-gray-400 hover:text-white ml-1"
              >
                See full disclaimer
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ================= FLOATING SUPPORT BUTTON ================= */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end gap-3">
          {/* Support Button */}
          <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
            <Headphones className="w-6 h-6" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          </button>

          {/* Chat Notification */}
          <div className="bg-white text-gray-900 rounded-2xl p-4 shadow-2xl max-w-xs hidden group-hover:block animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="font-bold text-white">AI</span>
              </div>
              <div>
                <div className="font-bold">Need help?</div>
                <div className="text-sm text-gray-600">
                  Our AI assistant is online
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-3">
              Average response time:{" "}
              <span className="font-bold text-green-600">1 min</span>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-bold text-sm">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
