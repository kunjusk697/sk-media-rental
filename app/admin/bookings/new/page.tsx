import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export default async function NewBookingPage() {
  const [clients, equipment] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.equipment.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      <section className="hero">
        <h1>Add Booking</h1>
        <p>Manually create a rental booking for an existing client.</p>
      </section>

      <p className="muted" style={{ marginBottom: "1rem" }}>
        <Link href="/admin/bookings">← Back to bookings</Link>
      </p>

      {clients.length === 0 ? (
        <div className="notice">
          Add a client first before creating bookings.
          <div className="actions" style={{ marginTop: "1rem" }}>
            <Link className="btn" href="/admin/clients/new">Add client</Link>
          </div>
        </div>
      ) : (
        <BookingForm clients={clients} equipment={equipment} />
      )}
    </>
  );
}
