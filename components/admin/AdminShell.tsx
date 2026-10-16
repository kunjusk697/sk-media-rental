"use client";

import { cn } from "@/lib/cn";
import { setAdminSession } from "@/lib/admin-auth";
import {
  Boxes,
  BarChart3,
  Glasses,
  LayoutDashboard,
  LogOut,
  ScanFace,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Catalog", icon: Glasses },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/try-on", label: "Try-On Assets", icon: ScanFace },
  { href: "/admin/finance", label: "Finance", icon: Wallet },
  { href: "/admin/categories", label: "Categories", icon: Boxes },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-surface lg:flex">
      <aside className="border-b border-stone-200 bg-white lg:fixed lg:inset-y-0 lg:z-30 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">
              Royal Specs
            </p>
            <p className="font-display text-xl text-charcoal">Super Admin</p>
          </div>
          <BarChart3 className="h-6 w-6 text-forest" />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
                  active
                    ? "bg-forest text-white"
                    : "text-stone-600 hover:bg-stone-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden border-t border-stone-100 p-4 lg:block">
          <Link
            href="/"
            className="mb-2 block text-sm font-medium text-forest"
          >
            ← Customer app
          </Link>
          <button
            type="button"
            onClick={() => {
              setAdminSession(false);
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-charcoal"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</div>
      </main>
    </div>
  );
}
