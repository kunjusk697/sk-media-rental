"use client";

import type { PosterSlide } from "@/data/posters";
import { POSTER_SLIDES } from "@/data/posters";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const AUTO_MS = 5500;

export function PosterSlideshow({ slides = POSTER_SLIDES }: { slides?: PosterSlide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [count, go]);

  const slide = slides[index];

  return (
    <section className="px-5 pb-2" aria-roledescription="carousel" aria-label="Promotions">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {slide.kind === "promo" ? (
              <PromoPoster slide={slide} />
            ) : (
              <ImagePoster slide={slide} />
            )}
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-sm"
              aria-label="Previous poster"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-sm"
              aria-label="Next poster"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-forest" : "w-2 bg-stone-300",
              )}
              aria-label={`Go to poster ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function PromoPoster({
  slide,
}: {
  slide: Extract<PosterSlide, { kind: "promo" }>;
}) {
  const isForest = slide.variant === "forest";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] p-5 text-white shadow-lg",
        isForest
          ? "bg-forest shadow-forest/30"
          : "bg-gold text-forest-dark shadow-gold/30",
      )}
    >
      <div className="relative z-10 max-w-[58%]">
        <p
          className={cn(
            "text-sm font-bold",
            isForest ? "text-gold" : "text-forest-dark",
          )}
        >
          {slide.highlight}
        </p>
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            isForest ? "text-white/90" : "text-forest-dark/80",
          )}
        >
          {slide.title}
        </p>
        <p
          className={cn(
            "mt-3 font-display text-2xl leading-snug",
            !isForest && "text-forest-dark",
          )}
        >
          {slide.subtitle}
        </p>
        <Link
          href={slide.ctaHref}
          className={cn(
            "mt-4 inline-flex rounded-full px-5 py-2.5 text-xs font-bold",
            isForest ? "bg-white text-forest" : "bg-forest text-white",
          )}
        >
          {slide.ctaLabel}
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 h-full w-[48%]">
        <Image
          src={slide.image}
          alt=""
          fill
          className="object-cover object-top"
          sizes="220px"
        />
      </div>
    </div>
  );
}

function ImagePoster({
  slide,
}: {
  slide: Extract<PosterSlide, { kind: "image" }>;
}) {
  const inner = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-forest shadow-lg shadow-forest/20">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className="object-contain p-4"
        sizes="(max-width: 448px) 100vw, 400px"
        priority
      />
    </div>
  );

  if (slide.href) {
    return <Link href={slide.href}>{inner}</Link>;
  }

  return inner;
}
