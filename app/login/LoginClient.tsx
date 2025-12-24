"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/services/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Shield,
  Sparkles,
  Zap,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Loader2,
  Globe,
  Smartphone,
  Gift,
  Award,
  CreditCard,
  Headphones,
} from "lucide-react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/components/firebase";
import API from "@/services/api";

export default function AccountPage() {
  const router = useRouter();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register state
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  // UI state
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await API.post("/google", {
        email: user.email,
        name: user.displayName,
      });

      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err) {
      console.error("Google login failed", err);
      setMessage("Google login failed. Please try again.");
      setMessageType("error");
    }
  };

  /* =========================
     LOGIN HANDLER
  ========================== */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.token);
      router.push("/");
    } catch (err: any) {
      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     REGISTER HANDLER
  ========================== */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await registerUser({
        name,
        email: regEmail,
        password: regPassword,
      });

      setMessage("Account created successfully! You can now sign in.");
      setMessageType("success");

      setName("");
      setRegEmail("");
      setRegPassword("");

      setTimeout(() => setActiveTab("login"), 1000);
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#38BDF8] to-[#22C55E] rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Welcome to Your Account
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Sign in to continue shopping or create a new account to get started
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Tab Navigation */}
              <div className="bg-background-tertiary rounded-2xl p-1 border border-theme">
                <div className="flex">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 py-4 px-6 text-center font-semibold rounded-xl transition-all ${
                      activeTab === "login"
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-lg"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("register")}
                    className={`flex-1 py-4 px-6 text-center font-semibold rounded-xl transition-all ${
                      activeTab === "register"
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-lg"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    Create Account
                  </motion.button>
                </div>
              </div>

              {/* Message Alert */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`rounded-2xl p-4 flex items-start gap-3 border ${
                      messageType === "success"
                        ? "bg-gradient-to-r from-[#22C55E]/10 to-[#22C55E]/5 border-[#22C55E]/20 text-[#22C55E]"
                        : messageType === "error"
                        ? "bg-gradient-to-r from-[#EF4444]/10 to-[#EF4444]/5 border-[#EF4444]/20 text-[#EF4444]"
                        : "bg-gradient-to-r from-[#38BDF8]/10 to-[#38BDF8]/5 border-[#38BDF8]/20 text-[#38BDF8]"
                    }`}
                  >
                    {messageType === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium">{message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forms */}
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-background-tertiary rounded-2xl border border-theme p-6 md:p-8"
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-primary mb-3">
                        Welcome Back
                      </h2>
                      <p className="text-muted">
                        Sign in to access your account and continue shopping
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-3">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-background border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary placeholder:text-muted"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-primary">
                            Password
                          </label>
                          <a
                            href="/forgot-password"
                            className="text-sm text-[#38BDF8] hover:text-[#60A5FA] font-medium transition-colors"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          <input
                            type={showLoginPassword ? "text" : "password"}
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3.5 bg-background border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary placeholder:text-muted"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowLoginPassword(!showLoginPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors"
                          >
                            {showLoginPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Signing in...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-theme"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-background-tertiary text-muted">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-background text-primary font-semibold py-3.5 px-4 rounded-xl border border-theme hover:bg-background-secondary transition-colors flex items-center justify-center gap-3"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span>Continue with Google</span>
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-background-tertiary rounded-2xl border border-theme p-6 md:p-8"
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-primary mb-3">
                        Join Our Community
                      </h2>
                      <p className="text-muted">
                        Create an account to unlock exclusive benefits and start
                        shopping
                      </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-3">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3.5 bg-background border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary placeholder:text-muted"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-3">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-background border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary placeholder:text-muted"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-3">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          <input
                            type={showRegPassword ? "text" : "password"}
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3.5 bg-background border border-theme rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 focus:outline-none transition-all text-primary placeholder:text-muted"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors"
                          >
                            {showRegPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-muted">
                          Use at least 8 characters with a mix of letters,
                          numbers & symbols
                        </p>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-background rounded-xl border border-theme">
                        <input
                          id="terms"
                          type="checkbox"
                          required
                          className="h-5 w-5 text-[#F59E0B] focus:ring-[#F59E0B] border-theme rounded mt-0.5"
                        />
                        <label
                          htmlFor="terms"
                          className="block text-sm text-secondary"
                        >
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-[#38BDF8] hover:text-[#60A5FA] font-medium transition-colors"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-[#38BDF8] hover:text-[#60A5FA] font-medium transition-colors"
                          >
                            Privacy Policy
                          </a>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Creating account...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Create Account</span>
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-sm text-muted">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="font-semibold text-[#F59E0B] hover:text-[#F97316] transition-colors"
                        >
                          Sign in here
                        </button>
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl border border-theme p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    Member Benefits
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#22C55E]/10 rounded-lg mt-1">
                      <Gift className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        Exclusive Offers
                      </h3>
                      <p className="text-sm text-muted">
                        Get access to member-only discounts and early access to
                        sales
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#38BDF8]/10 rounded-lg mt-1">
                      <ShoppingBag className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        Faster Checkout
                      </h3>
                      <p className="text-sm text-muted">
                        Save your details for quick and easy purchases
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#8B5CF6]/10 rounded-lg mt-1">
                      <CreditCard className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        Order Tracking
                      </h3>
                      <p className="text-sm text-muted">
                        Track all your orders in one place with real-time
                        updates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F59E0B]/10 rounded-lg mt-1">
                      <Headphones className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        Priority Support
                      </h3>
                      <p className="text-sm text-muted">
                        Get faster responses and dedicated customer service
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Trust */}
              <div className="bg-background-tertiary rounded-2xl border border-theme p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#38BDF8]/10 rounded-lg">
                    <Shield className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <h3 className="font-bold text-primary">Secure & Trusted</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full" />
                    <span>PCI-DSS compliant</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full" />
                    <span>Your data is never shared</span>
                  </li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/5 rounded-2xl border border-[#F59E0B]/20 p-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-xl flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-primary mb-2">
                    Start Shopping Today
                  </h3>
                  <p className="text-sm text-muted mb-4">
                    Join thousands of happy customers shopping with confidence
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/shop")}
                    className="w-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Browse Products</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-theme">
            <div className="text-center">
              <p className="text-sm text-muted">
                Need help?{" "}
                <a
                  href="/contact"
                  className="text-[#38BDF8] hover:text-[#60A5FA] font-medium transition-colors"
                >
                  Contact our support team
                </a>{" "}
                • Available 24/7
              </p>
              <p className="text-xs text-muted mt-4">
                By signing in, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
