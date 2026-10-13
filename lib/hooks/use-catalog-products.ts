"use client";

import { PRODUCTS } from "@/data/products";
import { useRoyalStore } from "@/lib/store/royal-store";
import { useEffect, useState } from "react";

/** Customer catalog: prefers persisted admin store when hydrated. */
export function useCatalogProducts() {
  const storeProducts = useRoyalStore((s) => s.products);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(useRoyalStore.persist.hasHydrated());
    const unsub = useRoyalStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  if (hydrated && storeProducts.length > 0) return storeProducts;
  return PRODUCTS.map((p) => ({
    ...p,
    stock: 10,
    stockAlertAt: 5,
    gender: "unisex" as const,
    tags: [],
    blueCut: false,
    reviewsCount: 0,
  }));
}
