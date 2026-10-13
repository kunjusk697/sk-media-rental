"use client";

import type { FrameMaterial, FrameShape, ProductCategory } from "@/data/products";
import {
  CATEGORIES,
  MATERIAL_FILTERS,
  SHAPE_FILTERS,
} from "@/data/products";
import { cn } from "@/lib/cn";
import { Search, SlidersHorizontal } from "lucide-react";

export interface CatalogFilterState {
  query: string;
  category: ProductCategory | "all";
  shape: FrameShape | "all";
  material: FrameMaterial | "all";
  minPrice: number;
  maxPrice: number;
}

interface CatalogFiltersProps {
  value: CatalogFilterState;
  onChange: (next: CatalogFilterState) => void;
  priceBounds: { min: number; max: number };
}

export function CatalogFilters({
  value,
  onChange,
  priceBounds,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          placeholder="Search frames, shapes, materials…"
          className="w-full rounded-2xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm outline-none ring-charcoal/20 placeholder:text-stone-400 focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
        <SlidersHorizontal className="h-4 w-4" />
        Categories
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip
          active={value.category === "all"}
          onClick={() => onChange({ ...value, category: "all" })}
        >
          All
        </Chip>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.id}
            active={value.category === cat.id}
            onClick={() => onChange({ ...value, category: cat.id })}
          >
            {cat.label.split(" ")[0]}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select
          value={value.shape}
          onChange={(e) =>
            onChange({
              ...value,
              shape: e.target.value as CatalogFilterState["shape"],
            })
          }
          className="rounded-2xl border border-stone-200 bg-white px-3 py-2.5 text-sm"
        >
          {SHAPE_FILTERS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <select
          value={value.material}
          onChange={(e) =>
            onChange({
              ...value,
              material: e.target.value as CatalogFilterState["material"],
            })
          }
          className="rounded-2xl border border-stone-200 bg-white px-3 py-2.5 text-sm"
        >
          {MATERIAL_FILTERS.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-stone-500">
          <span>Price range</span>
          <span>
            ₹{value.minPrice.toLocaleString("en-IN")} – ₹
            {value.maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={100}
            value={value.minPrice}
            onChange={(e) =>
              onChange({
                ...value,
                minPrice: Math.min(Number(e.target.value), value.maxPrice),
              })
            }
            className="w-full accent-charcoal"
          />
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={100}
            value={value.maxPrice}
            onChange={(e) =>
              onChange({
                ...value,
                maxPrice: Math.max(Number(e.target.value), value.minPrice),
              })
            }
            className="w-full accent-charcoal"
          />
        </div>
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
        active
          ? "bg-charcoal text-white"
          : "bg-white text-stone-600 ring-1 ring-stone-200",
      )}
    >
      {children}
    </button>
  );
}
