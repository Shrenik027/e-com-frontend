import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Truck,
  Headphones,
  Star,
  Package,
  Clock,
  ShoppingBag,
  TrendingUp,
  Zap,
  ChevronRight,
  ThumbsUp,
  Globe,
  Eye,
  Lock,
  Award,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ================= HERO SECTION (Authority + Value) ================= */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-white via-blue-50/30 to-white border-b border-gray-100">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 px-4 py-2.5 rounded-full text-sm font-medium mb-8">
                <Shield className="w-4 h-4" />
                <span>Trusted by 50,000+ Customers Worldwide</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                Premium Products.
                <br />
                <span className="relative">
                  <span className="relative z-10">Global Prices.</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 z-0"></span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
                We source directly from international suppliers, bringing you
                quality products at prices that traditional retailers can't
                match. Experience global shopping without the complexity.
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border-2 border-white shadow-sm"
                      ></div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      4.8/5 from 12,847 reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Start Shopping Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="group inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:shadow-md"
                >
                  <Eye className="w-5 h-5" />
                  <span>See How It Works</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-100">
                {[
                  { value: "10,000+", label: "Products" },
                  { value: "48h", label: "Avg. Processing" },
                  { value: "150+", label: "Global Suppliers" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Showcase */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-white p-12">
                  <div className="relative">
                    {/* Product Badge */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                      🔥 HOT DEAL
                    </div>

                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <Package className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Global Best Seller
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Top-rated product with 4.9★ rating
                      </p>

                      {/* Price Display */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹1,299
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹2,499
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                          Save 48%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-600">
                      On orders over ₹999
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Activity */}
              <div className="absolute -top-4 -left-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live orders: 42 active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION SECTION ================= */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Global Network Advantage
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why We Deliver Better Value
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our international supplier network and streamlined model give you
              access to products and prices that traditional retailers can't
              match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Sourcing",
                description:
                  "Direct access to manufacturers worldwide eliminates multiple markups",
                stat: "40-70%",
                statLabel: "Typical savings",
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Verified Suppliers",
                description:
                  "Rigorous vetting ensures quality and reliability from every partner",
                stat: "150+",
                statLabel: "Vetted suppliers",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Dynamic Pricing",
                description:
                  "Real-time price optimization based on global market conditions",
                stat: "Daily",
                statLabel: "Price updates",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-blue-600">{value.icon}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      {value.stat}
                    </div>
                    <div className="text-sm text-gray-600">
                      {value.statLabel}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION (Hick's Law - Simplified) ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Three Simple Steps to Global Quality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle the complexity of international sourcing so you can shop
              with confidence
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 -translate-y-1/2"></div>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  number: "01",
                  icon: <Eye className="w-8 h-8" />,
                  title: "You Browse & Select",
                  description:
                    "Explore our curated collection of quality products from global suppliers",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  number: "02",
                  icon: <Package className="w-8 h-8" />,
                  title: "We Handle Everything",
                  description:
                    "We coordinate with suppliers, verify quality, and manage logistics",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  number: "03",
                  icon: <Truck className="w-8 h-8" />,
                  title: "Direct to Your Doorstep",
                  description:
                    "Products ship directly from verified suppliers with full tracking",
                  color: "from-purple-500 to-purple-600",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-8 shadow-lg`}
                  >
                    <span className="text-white text-3xl font-bold">
                      {step.number}
                    </span>
                  </div>

                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl flex items-center justify-center mb-6 shadow-md border border-gray-100">
                    <div className="text-gray-700">{step.icon}</div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST INDICATORS (Social Proof) ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ThumbsUp className="w-4 h-4" />
              Customer-Verified Quality
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Customers Trust Us
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure Payments",
                description: "256-bit SSL encryption",
              },
              {
                icon: <Headphones className="w-6 h-6" />,
                title: "24/7 Support",
                description: "Always here to help",
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Quality Guarantee",
                description: "Supplier-verified products",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Fast Processing",
                description: "Most orders in 24-48h",
              },
            ].map((trust, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:border-blue-300 transition-all duration-300">
                  <div className="text-blue-600">{trust.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {trust.title}
                </h3>
                <p className="text-gray-600 text-sm">{trust.description}</p>
              </div>
            ))}
          </div>

          {/* Customer Testimonials */}
          <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  location: "Mumbai",
                  text: "I was hesitant about international shipping, but the process was seamless. Product quality exceeded my expectations.",
                  rating: 5,
                  purchase: "Wireless Earbuds",
                },
                {
                  name: "Rajesh Kumar",
                  location: "Delhi",
                  text: "Compared prices with 3 other sites. Saved 35% on the same product. Customer support was responsive and helpful.",
                  rating: 5,
                  purchase: "Smart Watch",
                },
                {
                  name: "Ananya Patel",
                  location: "Bangalore",
                  text: "The quality verification gave me confidence. Product arrived faster than estimated. Will definitely order again.",
                  rating: 4,
                  purchase: "Home Speaker",
                },
              ].map((testimonial, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.location} • {testimonial.purchase}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES (Choice Architecture) ================= */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Popular Categories
              </h2>
              <p className="text-gray-600">
                Start exploring our most sought-after collections
              </p>
            </div>
            <Link
              href="/categories"
              className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View all categories
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Electronics & Gadgets",
                image:
                  "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop",
                count: "428 products",
                color: "from-blue-500 to-cyan-500",
              },
              {
                name: "Home & Living",
                image:
                  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop",
                count: "312 products",
                color: "from-emerald-500 to-teal-500",
              },
              {
                name: "Fashion & Accessories",
                image:
                  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
                count: "289 products",
                color: "from-pink-500 to-rose-500",
              },
              {
                name: "Health & Wellness",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
                count: "156 products",
                color: "from-purple-500 to-indigo-500",
              },
            ].map((category, index) => (
              <Link
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
                key={index}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70`}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                  <p className="text-blue-100 mb-4">{category.count}</p>
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium group-hover:bg-white/30 transition-all">
                    Explore now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA (Loss Aversion) ================= */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Limited Time Benefits
          </div>

          <h2 className="text-5xl font-bold text-white mb-8">
            Start Your Global Shopping Journey Today
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of smart shoppers who've discovered better quality
            and better prices through our global network. Your satisfaction is
            our priority.
          </p>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            {[
              "Free shipping over ₹999",
              "Price match guarantee",
              "Easy returns assistance",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 text-white"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-12 py-5 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02]"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Start Shopping Risk-Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Headphones className="w-5 h-5" />
              <span>Talk to Our Experts</span>
            </Link>
          </div>

          {/* Trust Note */}
          <p className="text-gray-400 text-sm mt-12 pt-8 border-t border-gray-700/50 max-w-md mx-auto">
            All transactions secured with bank-level encryption. 30-day
            satisfaction guarantee.
          </p>
        </div>
      </section>
    </main>
  );
}
