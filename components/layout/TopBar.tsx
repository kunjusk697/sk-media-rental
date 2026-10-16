"use client";

import { RoyalLogo } from "@/components/brand/RoyalLogo";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

export function TopBar() {
  const { count } = useWishlist();

  return (
    <header className="sticky top-0 z-20 bg-white px-5 pb-3 pt-4">
      <div className="flex items-center justify-between gap-3">
        <RoyalLogo priority className="h-10" />
        <div className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface ring-1 ring-stone-200"
            aria-hidden
          >
            <User className="h-5 w-5 text-forest" />
          </span>
          <Link
            href="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface ring-1 ring-stone-200"
            aria-label="Wishlist"
          >
            <ShoppingBag className="h-5 w-5 text-forest" />
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest-dark">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
