"use client";

import { useRoyalStore } from "@/lib/store/royal-store";

export default function AdminCategoriesPage() {
  const categories = useRoyalStore((s) => s.categories);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Categories & tags</h1>
      <p className="text-sm text-stone-500">Manage catalog taxonomy (CRUD UI next).</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <li key={c.id} className="rounded-2xl border bg-white p-4">
            <p className="font-semibold">{c.label}</p>
            <p className="text-sm text-stone-500">{c.subtitle}</p>
            <p className="mt-2 text-xs text-forest">{c.tags.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
