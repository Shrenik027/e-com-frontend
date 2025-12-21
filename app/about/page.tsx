// app/about/page.tsx
import Link from "next/link";
import {
  CheckCircle,
  Award,
  Shield,
  Users,
  Heart,
  Globe,
  TrendingUp,
  Star,
  ArrowRight,
  Package,
  Truck,
  RefreshCw,
  Headphones,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  // Psychological Trust Signals
  const trustSignals = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "100% Verified Suppliers",
      description: "Every supplier undergoes 15-point quality verification",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure Payments",
      description: "256-bit SSL encryption for all transactions",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "30-day hassle-free return policy",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Lightning Fast Delivery",
      description: "Average delivery in 3-7 business days",
      color: "from-orange-500 to-red-600",
    },
  ];

  const values = [
    {
      title: "Transparency First",
      description: "We show real customer reviews and never hide the true cost",
      icon: <Target className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Customer Obsession",
      description:
        "Every decision is made with our customers' best interest in mind",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Continuous Improvement",
      description:
        "We constantly refine our selection based on customer feedback",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Global Quality Standards",
      description:
        "We source products that meet international quality benchmarks",
      icon: <Globe className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Founded with a vision",
      description: "Started with 3 team members and 50 products",
    },
    {
      year: "2023",
      title: "First 10,000 customers",
      description: "Reached milestone within first year",
    },
    {
      year: "2024",
      title: "Global expansion",
      description: "Launched in 3 new countries",
    },
    {
      year: "2024",
      title: "50,000+ happy customers",
      description: "Maintained 4.8+ average rating",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      {/* Creates emotional connection and establishes purpose */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Trusted by 50,000+ customers worldwide
            </div>

            {/* Headline with Emotional Appeal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              More Than Just a
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Shopping Destination
              </span>
            </h1>

            {/* Benefit-Driven Subheading */}
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              We're on a mission to revolutionize online shopping by cutting out
              middlemen,
              <span className="font-bold text-white"> saving you 40-60% </span>
              on premium products while maintaining uncompromising quality
              standards.
            </p>

            {/* CTA with Value Proposition */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/shop"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02] flex items-center gap-3"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="#story"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY (Emotional Connection) ================= */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                OUR JOURNEY
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Born from Frustration, Built for{" "}
                <span className="text-blue-600">You</span>
              </h2>

              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  In 2022, our founder Alex spent ₹15,000 on what seemed like a
                  premium product, only to discover it was the same item being
                  sold elsewhere for ₹6,000. The frustration was real.
                </p>

                <p>
                  <span className="font-bold text-gray-900">
                    That moment sparked a revolution.
                  </span>
                  We asked: Why should quality products come with outrageous
                  markups?
                </p>

                <p>
                  After 18 months of research, testing 500+ suppliers, and
                  building direct relationships with manufacturers, we created a
                  platform that delivers premium products at
                  <span className="font-bold text-blue-600">
                    {" "}
                    honest prices.
                  </span>
                </p>

                <p>
                  Today, we're proud to have saved our customers over{" "}
                  <span className="font-bold text-green-600">₹50 million</span>
                  while maintaining a 4.8-star average rating.
                </p>
              </div>

              {/* Founder Quote for Authenticity */}
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                <p className="text-gray-700 italic mb-4">
                  "Our success isn't measured by sales, but by the money we help
                  our customers save and the smiles we put on their faces."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <div>
                    <div className="font-bold text-gray-900">Alex Chen</div>
                    <div className="text-sm text-gray-500">Founder & CEO</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start mb-10">
                  <div
                    className={`z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                      index === 0
                        ? "bg-blue-600"
                        : "bg-white border-2 border-blue-200"
                    }`}
                  >
                    <div
                      className={`text-lg font-bold ${
                        index === 0 ? "text-white" : "text-blue-600"
                      }`}
                    >
                      {milestone.year}
                    </div>
                  </div>
                  <div className="ml-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR MISSION (Purpose-Driven) ================= */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Unwavering</span> Commitment
            </h2>
            <p className="text-xl text-gray-600">
              We're not just selling products; we're building a movement towards
              transparent, fair, and joyful shopping experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK (Transparency) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              TRANSPARENCY AT EVERY STEP
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              No Middlemen, No Hidden Fees
            </h2>
            <p className="text-xl text-gray-600">
              Here's exactly how we deliver better products at better prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl font-bold text-white">01</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Direct Sourcing
              </h3>
              <p className="text-gray-600">
                We work directly with vetted manufacturers, cutting out 3-4
                middlemen layers
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl font-bold text-white">02</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Verification
              </h3>
              <p className="text-gray-600">
                Every product batch undergoes rigorous quality checks before
                shipping
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl font-bold text-white">03</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Automated Fulfillment
              </h3>
              <p className="text-gray-600">
                Advanced systems ensure your order ships within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl font-bold text-white">04</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customer Support
              </h3>
              <p className="text-gray-600">
                Dedicated team available 24/7 to ensure your complete
                satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST SIGNALS ================= */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Your Trust is Our <span className="text-blue-400">Priority</span>
            </h2>
            <p className="text-xl text-gray-300">
              We've built multiple layers of protection for your peace of mind
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustSignals.map((signal, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${signal.color} flex items-center justify-center mb-6`}
                >
                  {signal.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{signal.title}</h3>
                <p className="text-gray-300">{signal.description}</p>
              </div>
            ))}
          </div>

          {/* Stats for Social Proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">4.8★</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">2K+</div>
              <div className="text-gray-300">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                ₹50M+
              </div>
              <div className="text-gray-300">Customer Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of smart shoppers who've already discovered how
                much they can save without compromising on quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02]"
                >
                  Start Shopping & Save
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  Have Questions?
                </Link>
              </div>

              {/* Final Trust Signal */}
              <div className="mt-8 flex items-center justify-center gap-2 text-blue-200 text-sm">
                <CheckCircle className="w-4 h-4" />
                30-day money-back guarantee • Free shipping over ₹999 • 24/7
                support
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
