// app/contact/page.tsx
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Shield,
  Send,
  User,
  ArrowRight,
  Sparkles,
  Headphones,
  Zap,
  Bot,
  AlertCircle,
  Star,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    urgency: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        urgency: "normal",
      });
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Live support status
  const supportStatus = {
    isOnline: true,
    waitTime: "3 minutes",
    agentsAvailable: 5,
    satisfactionRate: "98%",
  };

  const contactOptions = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant response within 2 minutes",
      responseTime: "1-2 minutes",
      color: "from-green-500 to-emerald-600",
      cta: "Start Chat",
      href: "#chat",
      isPopular: true,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Support",
      description: "Speak directly with our experts",
      responseTime: "Immediate",
      color: "from-blue-500 to-cyan-600",
      cta: "Call Now",
      href: "tel:+911234567890",
      note: "Available 24/7",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Detailed assistance with attachments",
      responseTime: "4 hours",
      color: "from-purple-500 to-pink-600",
      cta: "Send Email",
      href: "mailto:support@yourstore.com",
      note: "Guaranteed reply within 4 hours",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Assistant",
      description: "Instant answers to common questions",
      responseTime: "Instant",
      color: "from-orange-500 to-red-600",
      cta: "Ask AI",
      href: "#ai",
      isNew: true,
    },
  ];

  const faqs = [
    {
      question: "How fast do you respond to messages?",
      answer:
        "Live chat: 1-2 minutes | Email: Within 4 hours | Phone: Immediate",
    },
    {
      question: "Do you offer 24/7 customer support?",
      answer:
        "Yes! Our phone support is available 24/7. Live chat is available from 6 AM to 2 AM IST.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "30-day money-back guarantee on all products. No questions asked.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You'll receive tracking details within 24 hours of shipping. You can also check in your account dashboard.",
    },
  ];

  const teamStats = [
    {
      label: "Average Response Time",
      value: "4 min",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      label: "Customer Satisfaction",
      value: "98%",
      icon: <Star className="w-4 h-4" />,
    },
    {
      label: "Issues Resolved",
      value: "50K+",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      label: "Support Agents",
      value: "24/7",
      icon: <Headphones className="w-4 h-4" />,
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      {/* Creates urgency and shows availability */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
        {/* Live Status Indicator */}
        <div
          className={`absolute top-4 right-4 ${
            supportStatus.isOnline ? "bg-green-500" : "bg-red-500"
          } text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 z-20`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              supportStatus.isOnline ? "bg-white animate-pulse" : "bg-white"
            }`}
          ></div>
          {supportStatus.isOnline
            ? "Live Support Available"
            : "Support Offline"}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
              <ShieldCheck className="w-4 h-4" />
              Your data is protected with 256-bit encryption
            </div>

            {/* Headline with Urgency */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Need Help?
              <span className="block text-4xl md:text-5xl lg:text-6xl font-normal text-blue-200 mt-4">
                We're Here Within{" "}
                <span className="font-bold text-yellow-300">2 Minutes</span>
              </span>
            </h1>

            {/* Subheading with Social Proof */}
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join{" "}
              <span className="font-bold text-white">50,000+ customers</span>{" "}
              who've rated our support
              <span className="font-bold text-yellow-300"> 4.9/5 stars</span>.
              Average wait time:{" "}
              <span className="font-bold text-green-300">3 minutes</span>.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
              {teamStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT OPTIONS ================= */}
      {/* Hick's Law: Limited, clear choices */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choose Your Preferred{" "}
              <span className="text-blue-600">Help Method</span>
            </h2>
            <p className="text-xl text-gray-600">
              Multiple ways to connect. All lead to fast, helpful solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 border-2 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl ${
                  option.isPopular
                    ? "border-blue-400 shadow-blue-100"
                    : "border-gray-200"
                }`}
              >
                {/* Popular Badge */}
                {option.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                {/* New Badge */}
                {option.isNew && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-6 mx-auto`}
                >
                  {option.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {option.description}
                </p>

                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    <Clock className="w-3 h-3" />
                    Avg. response: {option.responseTime}
                  </div>
                </div>

                <Link
                  href={option.href}
                  className="block w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 rounded-xl font-semibold text-center hover:from-gray-800 hover:to-gray-600 transition-all duration-300"
                >
                  {option.cta}
                </Link>

                {option.note && (
                  <p className="text-sm text-gray-500 text-center mt-3">
                    {option.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Live Support Status */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    supportStatus.isOnline
                      ? "bg-green-500 animate-pulse"
                      : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {supportStatus.isOnline
                      ? "Live agents available now"
                      : "Support team offline"}
                  </div>
                  <div className="text-gray-600">
                    Current wait time:{" "}
                    <span className="font-bold">{supportStatus.waitTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Satisfaction Rate</div>
                  <div className="text-2xl font-bold text-green-600">
                    {supportStatus.satisfactionRate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Agents Online</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {supportStatus.agentsAvailable}
                  </div>
                </div>
              </div>

              <Link
                href="#chat"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Start Live Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      {/* Reciprocity: Offer detailed help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Send Detailed Message
                </h2>
                <p className="text-gray-600">
                  Prefer email? Fill out this form and we'll get back to you
                  within
                  <span className="font-bold text-blue-600"> 4 hours</span>.
                </p>
              </div>

              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We've received your message and will get back to you within
                    4 hours. A confirmation email has been sent to your inbox.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link
                      href="/shop"
                      className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                    >
                      Continue Shopping
                    </Link>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Issue</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="product">Product Question</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="account">Account Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <div className="flex gap-4">
                      {["Low", "Normal", "High", "Critical"].map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level.toLowerCase()}
                            checked={formData.urgency === level.toLowerCase()}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600"
                          />
                          <span className="text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-900">
                          Your Privacy is Protected
                        </div>
                        <p className="text-sm text-blue-700">
                          We never share your personal information. All
                          communications are encrypted and secure.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By sending, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              )}
            </div>

            {/* Contact Information & FAQ */}
            <div>
              {/* Company Info */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Call Us</div>
                      <div className="text-blue-200">+91 12345 67890</div>
                      <div className="text-sm text-gray-400">
                        Available 24/7
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-300" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Email Us</div>
                      <div className="text-blue-200">support@yourstore.com</div>
                      <div className="text-sm text-gray-400">
                        Reply within 4 hours
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Visit Us</div>
                      <div className="text-blue-200">123 Business Street</div>
                      <div className="text-sm text-gray-400">
                        Mumbai, India 400001
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-300" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Business Hours</div>
                      <div className="text-blue-200">
                        Monday - Friday: 9AM - 8PM
                      </div>
                      <div className="text-sm text-gray-400">
                        Saturday: 10AM - 6PM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-bold text-lg mb-4">Before You Contact</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Have your order number ready (if applicable)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Check your spam folder for our replies
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Use live chat for fastest resolution
                    </li>
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Answers
                </h3>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <h4 className="font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href="/faq"
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                  >
                    View all frequently asked questions
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div className="font-bold text-red-900">
                    Urgent Support Needed?
                  </div>
                </div>
                <p className="text-red-700 mb-4">
                  For order cancellations or payment issues that need immediate
                  attention
                </p>
                <Link
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call Emergency Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SATISFACTION GUARANTEE ================= */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Satisfaction is Guaranteed
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're not satisfied until you are. That's our promise.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="font-bold text-gray-900 mb-2">
                  Issue Resolution
                </div>
                <p className="text-gray-600 text-sm">
                  of problems solved on first contact
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  4.9/5
                </div>
                <div className="font-bold text-gray-900 mb-2">
                  Support Rating
                </div>
                <p className="text-gray-600 text-sm">from verified customers</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  24/7
                </div>
                <div className="font-bold text-gray-900 mb-2">Availability</div>
                <p className="text-gray-600 text-sm">
                  support team always ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Still Have Questions?
              </h2>

              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                Don't hesitate to reach out. We're here to help you shop with
                confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#chat"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02]"
                >
                  <MessageSquare className="w-5 h-5" />
                  Start Live Chat Now
                </Link>

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Secure & Private
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Fast Response
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
