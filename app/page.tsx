import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MainBookingWhatsApp, PriceTag } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const equipment = await prisma.equipment.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <>
      <section className="hero">
        <h1>Equipment Catalog</h1>
        <p>
          Browse cameras, lenses, audio, lighting, and stabilizers with daily rental
          rates. Bookings are handled by admin via WhatsApp — customers can view specs
          and pricing only.
        </p>
        <div className="actions" style={{ marginTop: "1rem" }}>
          <MainBookingWhatsApp />
        </div>
      </section>

      <div className="notice">
        Bookings are not accepted in-app. Please contact us on WhatsApp to reserve
        equipment.
      </div>

      <section className="grid">
        {equipment.map((item) => (
          <article key={item.id} className="card">
            <span className="badge">{item.category}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <PriceTag amount={item.dailyRate} />
            {item.quantity > 1 && (
              <span className="quantity-pill">{item.quantity} units available</span>
            )}
            <Link className="btn btn-secondary" href={`/equipment/${item.id}`}>
              View details
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
