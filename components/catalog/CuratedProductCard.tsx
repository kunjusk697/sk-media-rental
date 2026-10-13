"use client";

import type { Product } from "@/data/products";
import { formatInr } from "@/data/products";
import { curatedTint } from "@/lib/theme";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CuratedProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const tint = curatedTint(index);
  const image = product.showcaseImage ?? product.images[0];
  const buyHref = whatsappUrl(
    productInquiryMessage(
      product.name,
      product.price,
      product.colors[0]?.name,
    ),
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className={cn("relative overflow-hidden rounded-[2rem] shadow-md", tint)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] min-h-[320px]">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 pb-16 text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-white/80">
              Royal Specs
            </p>
            <h3 className="mt-1 font-display text-2xl leading-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-semibold">{formatInr(product.price)}</p>
          </div>
        </div>
      </Link>
      <a
        href={buyHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 left-5 z-10 rounded-full bg-white px-5 py-2 text-xs font-bold text-forest shadow-sm"
      >
        Buy Now
      </a>
    </motion.article>
  );
}
