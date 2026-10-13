"use client";

import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/data/products";
import { formatInr } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { Heart, ScanFace } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  product,
  onTryOn,
}: {
  product: Product;
  onTryOn?: (id: string) => void;
}) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] bg-stone-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 448px) 100vw, 400px"
          />
          {product.badge ? (
            <Badge className="absolute left-3 top-3 bg-white/90">
              {product.badge}
            </Badge>
          ) : null}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm",
              wished && "text-rose-500",
            )}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-charcoal">{product.name}</h3>
            <p className="text-xs text-stone-500">{product.frameDimensions}</p>
          </div>
          <p className="text-sm font-bold text-charcoal">
            {formatInr(product.price)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/try-on?product=${product.id}`}
            onClick={() => onTryOn?.(product.id)}
            className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-charcoal"
          >
            <ScanFace className="h-3.5 w-3.5" />
            Try On
          </Link>
          <a
            href={whatsappUrl(
              productInquiryMessage(
                product.name,
                product.price,
                product.colors[0]?.name,
              ),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-charcoal px-3 py-2 text-xs font-semibold text-white"
          >
            Chat to Buy
          </a>
        </div>
      </div>
    </motion.article>
  );
}
