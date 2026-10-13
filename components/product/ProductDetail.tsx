"use client";

import { Button } from "@/components/ui/Button";
import type { LensOption, Product } from "@/data/products";
import { LENS_LABELS, formatInr } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Heart, Minus, MoreHorizontal, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductDetail({ product }: { product: Product }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [lens, setLens] = useState<LensOption>(product.lensOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const color = product.colors.find((c) => c.id === colorId);
  const compareAt =
    product.compareAtPrice ?? Math.round(product.price * 1.06);
  const rating = product.rating ?? 4.8;

  return (
    <div className="flex min-h-full flex-col pb-28">
      <div className="flex items-center justify-between px-5 py-3">
        <Link
          href="/catalog"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface"
        >
          <ChevronLeft className="h-5 w-5 text-forest" />
        </Link>
        <p className="text-sm font-semibold text-charcoal">Product Details</p>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface"
          aria-label="More options"
        >
          <MoreHorizontal className="h-5 w-5 text-forest" />
        </button>
      </div>

      <div className="px-5">
        <div className="mb-4 flex justify-center gap-2">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setGalleryIndex(i)}
              className={cn(
                "relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2",
                galleryIndex === i ? "ring-forest" : "ring-stone-200",
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="48px" />
            </button>
          ))}
        </div>

        <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-surface p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={galleryIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative mx-auto aspect-square max-h-[280px] w-full"
            >
              <Image
                src={product.images[galleryIndex] ?? product.images[0]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="320px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-charcoal">{product.name}</h1>
              <div className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-semibold text-charcoal">{rating}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-surface",
                wished && "text-rose-500",
              )}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-stone-500">
            {product.description}
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-charcoal">
              {formatInr(product.price)}
            </span>
            <span className="text-sm text-stone-400 line-through">
              {formatInr(compareAt)}
            </span>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              Color
            </p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  className={cn(
                    "h-9 w-9 rounded-full ring-2 ring-offset-2",
                    colorId === c.id ? "ring-forest" : "ring-transparent",
                  )}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              Lens
            </p>
            <div className="flex flex-wrap gap-2">
              {product.lensOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setLens(opt)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold",
                    lens === opt
                      ? "bg-forest text-white"
                      : "bg-surface text-stone-600",
                  )}
                >
                  {LENS_LABELS[opt]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Quantity
            </p>
            <div className="flex items-center gap-4 rounded-full bg-surface px-4 py-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-forest"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[1.5rem] text-center font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="text-forest"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[4.5rem] left-0 right-0 z-20 mx-auto max-w-md px-5">
        <a
          href={whatsappUrl(
            `${productInquiryMessage(
              product.name,
              product.price * quantity,
              color?.name,
              LENS_LABELS[lens],
            )} Quantity: ${quantity}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full py-3.5 text-base shadow-lg shadow-forest/25">
            Buy Now
          </Button>
        </a>
      </div>
    </div>
  );
}
