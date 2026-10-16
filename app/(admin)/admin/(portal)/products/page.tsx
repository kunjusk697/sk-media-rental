"use client";

import { useRoyalStore } from "@/lib/store/royal-store";
import { formatInr } from "@/data/products";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const products = useRoyalStore((s) => s.products);
  const deleteProduct = useRoyalStore((s) => s.deleteProduct);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Catalog management</h1>
          <p className="text-sm text-stone-500">
            {products.length} products · CRUD with image placeholders
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-100 bg-surface text-xs uppercase text-stone-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-stone-50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 capitalize">{p.category}</td>
                <td className="px-4 py-3">{formatInr(p.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.stock <= p.stockAlertAt
                        ? "font-semibold text-amber-700"
                        : ""
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="rounded-lg p-2 hover:bg-surface"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                      }}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
