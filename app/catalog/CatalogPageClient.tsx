"use client";

import { CatalogView } from "@/components/catalog/CatalogView";
import type { ProductCategory } from "@/data/products";
import { useSearchParams } from "next/navigation";

export function CatalogPageClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;

  return <CatalogView title="Catalog & Categories" initialCategory={categoryParam} />;
}
