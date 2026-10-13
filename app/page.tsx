import { ProductCard } from "@/components/catalog/ProductCard";
import { MobileShell } from "@/components/layout/MobileShell";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <MobileShell>
      <section className="px-5 pb-2 pt-4">
        <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-lg shadow-charcoal/20">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            OpticNest-inspired boutique
          </div>
          <h2 className="font-display text-3xl leading-tight">
            See yourself in Royal Specs
          </h2>
          <p className="mt-2 text-sm text-white/75">
            Curated frames, AI try-on, and one-tap WhatsApp styling consults with
            our Kochi optical team.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/try-on"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-charcoal"
            >
              Start Try-On
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl(
                "Hi Royal Specs, I would like a frame recommendation.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#053017]"
            >
              WhatsApp stylist
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-4">
        <div className="mb-3 flex items-end justify-between">
          <h3 className="font-display text-lg font-semibold">Shop by category</h3>
          <Link href="/catalog" className="text-xs font-semibold text-stone-500">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className="rounded-3xl border border-stone-200/80 bg-white p-4 shadow-sm transition hover:border-stone-300"
            >
              <p className="text-sm font-semibold">{cat.label}</p>
              <p className="mt-1 text-xs text-stone-500">{cat.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 py-4">
        <div className="mb-3 flex items-end justify-between">
          <h3 className="font-display text-lg font-semibold">Featured frames</h3>
          <Link href="/catalog" className="text-xs font-semibold text-stone-500">
            Catalog
          </Link>
        </div>
        <div className="grid gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
