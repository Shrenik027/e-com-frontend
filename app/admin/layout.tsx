"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuth } from "@/services/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu, Home, Package, ShoppingBag, Users, Layers } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (!auth.isLoggedIn || !auth.isAdmin) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // Navigation items for mobile bottom bar
  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/admin",
      active: pathname === "/admin",
    },
    {
      icon: Package,
      label: "Products",
      path: "/admin/products",
      active: pathname.startsWith("/admin/products"),
    },
    {
      icon: ShoppingBag,
      label: "Orders",
      path: "/admin/orders",
      active: pathname.startsWith("/admin/orders"),
    },
    {
      icon: Users,
      label: "Users",
      path: "/admin/users",
      active: pathname.startsWith("/admin/users"),
    },
    {
      icon: Layers,
      label: "Categories",
      path: "/admin/categories",
      active: pathname.startsWith("/admin/categories"),
    },
  ];

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#F59E0B]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-primary">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-secondary">
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 bg-background-secondary border-r border-theme pt-20">
        <AdminSidebar />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
        lg:hidden fixed inset-y-0 left-0 z-40
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        w-64 bg-background-secondary border-r border-theme
        flex flex-col
      `}
      >
        <AdminSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen">
        {/* Mobile Hamburger Button - Top Right */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-background-tertiary text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto pt-16 lg:pt-0">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background-secondary border-t border-theme z-40">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  router.push(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center p-2 transition-colors ${
                  item.active
                    ? "text-[#F59E0B]"
                    : "text-secondary hover:text-primary"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
