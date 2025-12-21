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
  Phone,
  LogOut,
} from "lucide-react";

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
      setScrolled(window.scrollY > 20);
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
      className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg border-b border-gray-100"
          : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ================= LEFT - LOGO ================= */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SHOPLY
              </span>
            </Link>

            {/* ================= DESKTOP NAVIGATION ================= */}
            <nav className="hidden lg:flex items-center ml-12 gap-1">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === "/"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                href="/shop"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === "/shop"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Package className="w-4 h-4" />
                Shop
              </Link>

              <Link
                href="/about"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === "/about"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Info className="w-4 h-4" />
                About
              </Link>

              <Link
                href="/contact"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === "/contact"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>
            </nav>
          </div>

          {/* ================= RIGHT - ICONS ================= */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* SEARCH */}
            <button
              onClick={() => router.push("/search")}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* ACCOUNT */}
            <div className="relative" ref={dropdownRef}>
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:inline">Account</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline">Account</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        accountOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setAccountOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="font-medium">My Account</span>
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setAccountOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span className="font-medium">My Orders</span>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CART */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === "/"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === "/shop"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Package className="w-4 h-4" />
                Shop
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === "/about"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Info className="w-4 h-4" />
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === "/contact"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>

              <div className="border-t border-gray-100 my-2"></div>

              {!isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                >
                  <User className="w-4 h-4" />
                  Account / Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                  >
                    <Package className="w-4 h-4" />
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
