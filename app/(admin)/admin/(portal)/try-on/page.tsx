"use client";

import { useRoyalStore } from "@/lib/store/royal-store";
import Image from "next/image";

export default function AdminTryOnPage() {
  const faceModels = useRoyalStore((s) => s.faceModels);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Virtual try-on assets</h1>
      <p className="text-sm text-stone-500">
        Face models & overlay coordinates (upload UI next).
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {faceModels.map((m) => (
          <article key={m.id} className="rounded-2xl border bg-white p-4">
            <div className="relative mb-3 h-40 overflow-hidden rounded-xl">
              <Image src={m.image} alt={m.name} fill className="object-cover" sizes="200px" />
            </div>
            <p className="font-semibold">{m.name}</p>
            <p className="text-xs text-stone-500">{m.gender} · {m.tone}</p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-surface p-2 text-[10px]">
              {JSON.stringify(m.overlay.front, null, 0)}
            </pre>
          </article>
        ))}
      </div>
    </div>
  );
}
