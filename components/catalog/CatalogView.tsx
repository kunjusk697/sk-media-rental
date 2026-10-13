"use client";

import { CatalogFilters, type CatalogFilterState } from "@/components/catalog/CatalogFilters";
import { ProductCard } from "@/components/catalog/ProductCard";
import { PRODUCTS } from "@/data/products";
import type { ProductCategory } from "@/data/products";
import { useEffect, useMemo, useState } from "react";

const priceBounds = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};

const initialFilters: CatalogFilterState = {
  query: "",
  category: "all",
  shape: "all",
  material: "all",
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
};

export function CatalogView({
  title,
  initialCategory,
}: {
  title?: string;
  initialCategory?: ProductCategory | null;
}) {
  const [filters, setFilters] = useState<CatalogFilterState>(() => ({
    ...initialFilters,
    category: initialCategory ?? initialFilters.category,
  }));

  useEffect(() => {
    if (initialCategory) {
      setFilters((f) => ({ ...f, category: initialCategory }));
    }
  }, [initialCategory]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
      if (filters.shape !== "all" && p.shape !== filters.shape) return false;
      if (filters.material !== "all" && p.material !== filters.material)
        return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice)
        return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.shape.includes(q) ||
        p.material.includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [filters]);

  return (
    <div className="space-y-5 px-5 py-4">
      {title ? (
        <div>
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <p className="text-sm text-stone-500">
            {filtered.length} frame{filtered.length === 1 ? "" : "s"} curated for you
          </p>
        </div>
      ) : null}
      <CatalogFilters
        value={filters}
        onChange={setFilters}
        priceBounds={priceBounds}
      />
      <div className="grid gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-stone-500">
            No frames match your filters. Try widening the price range or clearing
            search.
          </p>
        ) : null}
      </div>
    </div>
  );
}
