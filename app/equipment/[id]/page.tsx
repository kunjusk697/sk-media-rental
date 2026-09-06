import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  WHATSAPP_NUMBER,
  bookingWhatsAppMessage,
  formatInr,
  whatsappUrl,
} from "@/lib/format";
import { PriceTag, EquipmentImage } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipment = await prisma.equipment.findUnique({
    where: { id: Number(id) },
  });

  if (!equipment) {
    notFound();
  }

  const message = bookingWhatsAppMessage(equipment.name);

  return (
    <>
      <p className="muted" style={{ marginBottom: "1rem" }}>
        <Link href="/">← Back to catalog</Link>
      </p>

      <section className="card form-card">
        <EquipmentImage name={equipment.name} imageUrl={equipment.imageUrl} detail />
        <span className="badge">{equipment.category}</span>
        <h1 style={{ fontSize: "1.8rem" }}>{equipment.name}</h1>
        <p>{equipment.description}</p>
        <PriceTag amount={equipment.dailyRate} />
        {equipment.quantity > 1 && (
          <span className="quantity-pill">{equipment.quantity} units in stock</span>
        )}

        <div className="notice" style={{ marginTop: "1rem" }}>
          This catalog is view-only. To book {equipment.name}, contact us on WhatsApp.
          Admin will add your booking manually.
        </div>

        <div className="actions">
          <a
            className="btn btn-whatsapp"
            href={whatsappUrl(WHATSAPP_NUMBER, message)}
            target="_blank"
            rel="noreferrer"
          >
            Book via WhatsApp
          </a>
          <Link className="btn btn-secondary" href="/">
            Browse more gear
          </Link>
        </div>

        <div className="detail-list" style={{ marginTop: "1.5rem" }}>
          <div className="detail-row">
            <span className="muted">Daily rate</span>
            <strong>{formatInr(equipment.dailyRate)}</strong>
          </div>
          <div className="detail-row">
            <span className="muted">Availability</span>
            <strong>{equipment.available ? "Available" : "Unavailable"}</strong>
          </div>
          <div className="detail-row">
            <span className="muted">Quantity</span>
            <strong>{equipment.quantity}</strong>
          </div>
        </div>
      </section>
    </>
  );
}
