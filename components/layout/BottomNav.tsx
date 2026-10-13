"use client";

import { cn } from "@/lib/cn";
import { Glasses, Heart, Home, ScanFace } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/catalog", label: "Catalog", icon: Glasses },
  { href: "/try-on", label: "Try-On", icon: ScanFace },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 z-30 mx-auto w-full max-w-md border-t border-stone-200/80 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:rounded-b-[2rem]"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium transition-colors",
                  active
                    ? "bg-charcoal text-white"
                    : "text-stone-500 hover:text-charcoal",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 2} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
