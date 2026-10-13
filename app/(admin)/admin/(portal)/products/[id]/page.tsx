"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { useRoyalStore } from "@/lib/store/royal-store";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = useRoyalStore((s) => s.products.find((p) => p.id === id));

  if (!product) {
    return <p className="text-stone-500">Product not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit product</h1>
      <ProductForm initial={product} />
    </div>
  );
}
