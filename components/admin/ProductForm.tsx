"use client";

import type { ProductRecord } from "@/data/mockDb";
import type { FrameMaterial, FrameShape, LensOption, ProductCategory } from "@/data/products";
import { LENS_LABELS } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { useRoyalStore } from "@/lib/store/royal-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emptyOverlay = {
  front: { scale: 0.6, offsetY: 36, offsetX: 0 },
  angled: { scale: 0.56, offsetY: 38, offsetX: 4, rotate: -8 },
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProductForm({ initial }: { initial?: ProductRecord }) {
  const upsertProduct = useRoyalStore((s) => s.upsertProduct);
  const categories = useRoyalStore((s) => s.categories);
  const router = useRouter();

  const [form, setForm] = useState<ProductRecord>(
    initial ?? {
      id: "",
      name: "",
      category: "classic",
      shape: "round",
      material: "acetate",
      price: 2990,
      description: "",
      frameDimensions: "Lens 50 · Bridge 18 · Temple 140",
      colors: [{ id: "default", name: "Black", hex: "#1a1a1a" }],
      images: [
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
      ],
      frameImage:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
      tryOnOverlay: emptyOverlay,
      lensOptions: ["single-vision", "zero-blue"],
      stock: 10,
      stockAlertAt: 5,
      gender: "unisex",
      tags: [],
      blueCut: false,
      reviewsCount: 0,
    },
  );

  const [imageUrl, setImageUrl] = useState("");

  const save = () => {
    const id = form.id || `royal-${slugify(form.name)}`;
    upsertProduct({ ...form, id });
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 rounded-2xl border border-stone-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Product name">
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Category">
          <select
            className="input"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as ProductCategory,
              })
            }
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Shape">
          <select
            className="input"
            value={form.shape}
            onChange={(e) =>
              setForm({ ...form, shape: e.target.value as FrameShape })
            }
          >
            {["round", "aviator", "cat-eye", "square"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Material">
          <select
            className="input"
            value={form.material}
            onChange={(e) =>
              setForm({ ...form, material: e.target.value as FrameMaterial })
            }
          >
            {["acetate", "metal", "titanium", "tr90"].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field label="Price (INR)">
          <input
            type="number"
            className="input"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Stock">
          <input
            type="number"
            className="input"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Low-stock alert at">
          <input
            type="number"
            className="input"
            value={form.stockAlertAt}
            onChange={(e) =>
              setForm({ ...form, stockAlertAt: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Frame dimensions">
          <input
            className="input"
            value={form.frameDimensions}
            onChange={(e) =>
              setForm({ ...form, frameDimensions: e.target.value })
            }
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          className="input min-h-24"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Field>

      <Field label="Lens types">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(LENS_LABELS) as LensOption[]).map((opt) => {
            const on = form.lensOptions.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    lensOptions: on
                      ? form.lensOptions.filter((x) => x !== opt)
                      : [...form.lensOptions, opt],
                  })
                }
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  on ? "bg-forest text-white" : "bg-surface text-stone-600"
                }`}
              >
                {LENS_LABELS[opt]}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Image URLs (add placeholder)">
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!imageUrl.trim()) return;
              setForm({
                ...form,
                images: [...form.images, imageUrl.trim()],
                frameImage: form.frameImage || imageUrl.trim(),
              });
              setImageUrl("");
            }}
          >
            Add
          </Button>
        </div>
        <ul className="mt-2 space-y-1 text-xs text-stone-500">
          {form.images.map((url) => (
            <li key={url} className="truncate">{url}</li>
          ))}
        </ul>
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.blueCut}
          onChange={(e) => setForm({ ...form, blueCut: e.target.checked })}
        />
        Blue-cut protection
      </label>

      <div className="flex gap-3">
        <Button type="button" onClick={save}>Save product</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-stone-600">{label}</span>
      {children}
    </label>
  );
}
