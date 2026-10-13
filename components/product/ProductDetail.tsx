"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { LensOption, Product } from "@/data/products";
import { LENS_LABELS, formatInr } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Heart, ScanFace } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductDetail({ product }: { product: Product }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [lens, setLens] = useState<LensOption>(product.lensOptions[0]);
  const [anglePreview, setAnglePreview] = useState<"front" | "angled">("front");
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const color = product.colors.find((c) => c.id === colorId);

  return (
    <div className="px-5 py-4">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-200",
            wished && "text-rose-500",
          )}
          aria-label="Wishlist"
        >
          <Heart className="h-5 w-5" fill={wished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="relative mb-4 overflow-hidden rounded-[2rem] bg-stone-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={galleryIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative aspect-[4/5]"
          >
            <Image
              src={product.images[galleryIndex] ?? product.images[0]}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-500",
                anglePreview === "angled" && "scale-105 rotate-[-2deg]",
              )}
              sizes="400px"
            />
          </motion.div>
        </AnimatePresence>
        {product.badge ? (
          <Badge className="absolute left-4 top-4 bg-white/95">
            {product.badge}
          </Badge>
        ) : null}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {(["front", "angled"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAnglePreview(a)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                anglePreview === a
                  ? "bg-charcoal text-white"
                  : "bg-white/90 text-charcoal",
              )}
            >
              {a} view
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto">
        {product.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setGalleryIndex(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2",
              galleryIndex === i ? "ring-charcoal" : "ring-transparent",
            )}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">{product.name}</h1>
          <p className="text-sm text-stone-500">{product.frameDimensions}</p>
          <p className="mt-2 text-2xl font-bold">{formatInr(product.price)}</p>
        </div>
        <p className="text-sm leading-relaxed text-stone-600">
          {product.description}
        </p>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Frame color
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColorId(c.id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm",
                  colorId === c.id
                    ? "border-charcoal bg-white"
                    : "border-stone-200 bg-stone-50",
                )}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-stone-300"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Lens customizer
          </p>
          <div className="grid gap-2">
            {product.lensOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setLens(opt)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm font-medium",
                  lens === opt
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-stone-200 bg-white text-charcoal",
                )}
              >
                {LENS_LABELS[opt]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 pt-2">
          <Link href={`/try-on?product=${product.id}`}>
            <Button variant="secondary" className="w-full">
              <ScanFace className="h-4 w-4" />
              Virtual Try-On
            </Button>
          </Link>
          <a
            href={whatsappUrl(
              productInquiryMessage(
                product.name,
                product.price,
                color?.name,
                LENS_LABELS[lens],
              ),
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" className="w-full">
              Order on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
