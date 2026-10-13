"use client";

import { ProductCard } from "@/components/catalog/ProductCard";
import { MobileShell } from "@/components/layout/MobileShell";
import { PRODUCTS } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { ids, count } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <MobileShell>
      <div className="space-y-4 px-5 py-4">
        <div>
          <h2 className="font-display text-xl font-semibold">Wishlist / Bag</h2>
          <p className="text-sm text-stone-500">
            {count} saved frame{count === 1 ? "" : "s"}
          </p>
        </div>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <Heart className="mx-auto mb-3 h-8 w-8 text-stone-300" />
            <p className="text-sm text-stone-500">
              Tap the heart on any frame to build your shortlist.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
