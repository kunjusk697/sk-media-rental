import { CuratedProductCard } from "@/components/catalog/CuratedProductCard";
import { CategoryScroller } from "@/components/home/CategoryScroller";
import { MobileShell } from "@/components/layout/MobileShell";
import { PRODUCTS } from "@/data/products";
import { whatsappUrl } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const curated = PRODUCTS.slice(0, 4);

  return (
    <MobileShell>
      <section className="px-5 pb-2">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest p-5 text-white shadow-lg shadow-forest/30">
          <div className="relative z-10 max-w-[58%]">
            <p className="text-sm font-bold text-gold">30% OFF</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/90">
              New collections
            </p>
            <p className="mt-3 font-display text-2xl leading-snug">
              Signature frames for every face
            </p>
            <Link
              href="/catalog"
              className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-bold text-forest"
            >
              Order Now
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 h-full w-[48%]">
            <Image
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
              alt="Model wearing sunglasses"
              fill
              className="object-cover object-top"
              sizes="200px"
            />
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="mb-3 flex items-end justify-between px-5">
          <h2 className="text-lg font-bold text-charcoal">Shop by category</h2>
          <Link
            href="/catalog"
            className="text-xs font-semibold text-forest"
          >
            View all
          </Link>
        </div>
        <CategoryScroller />
      </section>

      <section className="space-y-4 px-5 py-4">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-bold text-charcoal">Curated for you</h2>
          <a
            href={whatsappUrl("Hi Royal Specs, help me pick a curated frame.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-forest"
          >
            Stylist
          </a>
        </div>
        <div className="grid gap-5">
          {curated.map((product, i) => (
            <CuratedProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
