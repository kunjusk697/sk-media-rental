"use client";

import { cn } from "@/lib/cn";
import { Glasses, Heart, Home, ScanFace } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/catalog", label: "Search", icon: Glasses },
  { href: "/try-on", label: "Try-On", icon: ScanFace },
  { href: "/wishlist", label: "Bag", icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 z-30 mx-auto w-full max-w-md bg-forest px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:rounded-b-[2rem]"
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
                  "flex flex-col items-center gap-1 py-1 text-[10px] font-medium transition-opacity",
                  active ? "text-white opacity-100" : "text-white/55",
                )}
              >
                <Icon
                  className="h-6 w-6"
                  strokeWidth={active ? 2.25 : 1.75}
                  fill={active ? "currentColor" : "none"}
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
