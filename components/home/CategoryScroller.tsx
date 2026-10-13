"use client";

import { CATEGORIES } from "@/data/products";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CategoryScroller() {
  return (
    <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <motion.div
        className="flex gap-4 px-5"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalog?category=${cat.id}`}
            className="flex w-[4.5rem] shrink-0 flex-col items-center gap-2"
          >
            <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full ring-2 ring-stone-100">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <span className="text-center text-[11px] font-semibold text-charcoal">
              {cat.shortLabel}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
