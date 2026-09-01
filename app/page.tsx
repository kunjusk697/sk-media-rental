import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const equipment = await prisma.equipment.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <>
      <section className="hero">
        <h1>Media Equipment Catalog</h1>
        <p>
          Browse professional cameras, lenses, audio, lighting, and stabilizers.
          Reserve gear for your next production.
        </p>
      </section>

      <section className="grid">
        {equipment.map((item) => (
          <article key={item.id} className="card">
            <span className="badge">{item.category}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="price">${item.dailyRate.toFixed(2)}/day</div>
            <Link className="btn" href={`/book/${item.id}`}>
              Book now
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
