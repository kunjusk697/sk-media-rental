import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatInr } from "@/lib/format";
import { AdminNav } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      client: true,
      items: { include: { equipment: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="hero">
        <h1>Bookings</h1>
        <p>Admin-managed rental bookings linked to client profiles.</p>
      </section>

      <AdminNav active="/admin/bookings" />

      <div className="actions" style={{ marginBottom: "1.5rem" }}>
        <Link className="btn" href="/admin/bookings/new">Add booking</Link>
      </div>

      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Equipment</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="muted">No bookings yet.</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <Link href={`/admin/clients/${booking.clientId}`}>
                      {booking.client.name}
                    </Link>
                  </td>
                  <td>
                    {booking.items
                      .map((item) => `${item.equipment.name} x${item.quantity}`)
                      .join(", ")}
                  </td>
                  <td>
                    {booking.startDate.toLocaleDateString("en-IN")} –{" "}
                    {booking.endDate.toLocaleDateString("en-IN")}
                  </td>
                  <td>{formatInr(booking.totalAmount)}</td>
                  <td>{booking.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
