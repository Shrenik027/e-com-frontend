"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  Info,
  Tag,
  Sparkles,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher"; // Import the theme switcher

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ================= AUTH STATE ================= */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [pathname]);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { cart } = useCart();
  const cartCount = cart?.items?.length || 0;

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAccountOpen(false);
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-theme shadow-lg"
          : "bg-background border-b border-theme/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ================= LEFT - LOGO & NAV ================= */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <motion.span
                className="text-2xl font-bold tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-brand bg-clip-text text-transparent ">
                  <img
                    src="/SHRIX.png"
                    alt="Shrix Logo"
                    style={{ height: "140px", width: "auto" }}
                  />
                </span>
              </motion.span>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                {
                  href: "/",
                  label: "Home",
                  icon: <Home className="w-4 h-4" />,
                },
                {
                  href: "/shop",
                  label: "Shop",
                  icon: <Package className="w-4 h-4" />,
                },
                {
                  href: "/collections",
                  label: "Collections",
                  icon: <Tag className="w-4 h-4" />,
                },
                {
                  href: "/new",
                  label: "New",
                  icon: <Sparkles className="w-4 h-4" />,
                },
                {
                  href: "/about",
                  label: "About",
                  icon: <Info className="w-4 h-4" />,
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all relative"
                >
                  <span
                    className={`transition-colors ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted group-hover:text-secondary"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`transition-colors ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted group-hover:text-secondary"
                    }`}
                  >
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* ================= RIGHT - ACTIONS ================= */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* THEME SWITCHER */}
            <ThemeSwitcher />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/shop")}
              className="p-2.5 text-muted hover:text-secondary hover:bg-background-tertiary rounded-lg transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* ACCOUNT */}
            <div className="relative" ref={dropdownRef}>
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-muted hover:text-secondary hover:bg-background-tertiary rounded-lg font-medium transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </Link>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-muted hover:text-secondary hover:bg-background-tertiary rounded-lg font-medium transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        accountOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-background-tertiary rounded-xl shadow-xl border border-theme py-2 overflow-hidden"
                      >
                        <Link
                          href="/account"
                          className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-background-secondary transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="font-medium">My Account</span>
                        </Link>

                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-background-secondary transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          <span className="font-medium">My Orders</span>
                        </Link>

                        <div className="border-t border-theme my-2" />

                        <button
                          onClick={logout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-brand hover:bg-background-secondary transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* CART */}
            <Link
              href="/cart"
              className="relative p-2.5 text-muted hover:text-secondary hover:bg-background-tertiary rounded-lg transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-gradient-brand text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-muted hover:text-secondary hover:bg-background-tertiary rounded-lg transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background-secondary border-t border-theme overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex flex-col gap-1">
                {[
                  {
                    href: "/",
                    label: "Home",
                    icon: <Home className="w-4 h-4" />,
                  },
                  {
                    href: "/shop",
                    label: "Shop",
                    icon: <Package className="w-4 h-4" />,
                  },
                  {
                    href: "/collections",
                    label: "Collections",
                    icon: <Tag className="w-4 h-4" />,
                  },
                  {
                    href: "/new",
                    label: "New Arrivals",
                    icon: <Sparkles className="w-4 h-4" />,
                  },
                  {
                    href: "/about",
                    label: "About",
                    icon: <Info className="w-4 h-4" />,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium transition-all ${
                      pathname === item.href
                        ? "text-primary bg-background-tertiary"
                        : "text-muted hover:text-secondary hover:bg-background-tertiary"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-theme my-3" />

                {/* Theme Switcher in Mobile Menu */}
                <div className="px-4 py-3.5">
                  <ThemeSwitcher />
                </div>

                <div className="border-t border-theme my-3" />

                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-muted hover:text-secondary hover:bg-background-tertiary transition-all"
                  >
                    <User className="w-4 h-4" />
                    Account / Login
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-muted hover:text-secondary hover:bg-background-tertiary transition-all"
                    >
                      <User className="w-4 h-4" />
                      My Account
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-muted hover:text-secondary hover:bg-background-tertiary transition-all"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-brand hover:bg-background-tertiary transition-all text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
