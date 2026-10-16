import { CuratedProductCard } from "@/components/catalog/CuratedProductCard";
import { CategoryScroller } from "@/components/home/CategoryScroller";
import { PosterSlideshow } from "@/components/home/PosterSlideshow";
import { MobileShell } from "@/components/layout/MobileShell";
import { PRODUCTS } from "@/data/products";
import { whatsappUrl } from "@/lib/whatsapp";
import Link from "next/link";

export default function HomePage() {
  const curated = PRODUCTS.slice(0, 4);

  return (
    <MobileShell>
      <PosterSlideshow />

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
