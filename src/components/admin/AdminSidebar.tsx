"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  Tag,
  Truck,
  Store,
} from "lucide-react";

const adminMenu = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    name: "Coupons",
    href: "/admin/coupons",
    icon: Tag,
  },
  {
    name: "Shipping",
    href: "/admin/shipping",
    icon: Truck,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64  bg-background-secondary border-r border-theme flex flex-col ">
      {/* Header */}
      <div className="p-5 border-b border-theme">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
            <p className="text-xs text-muted">Store Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {adminMenu.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                      : "text-secondary hover:text-primary hover:bg-background-tertiary"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#F59E0B]" : "text-muted"
                  }`}
                />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
