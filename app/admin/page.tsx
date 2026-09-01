import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ booked?: string }>;
}) {
  const { booked } = await searchParams;
  const bookings = await prisma.booking.findMany({
    include: { equipment: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <>
      <section className="hero">
        <h1>Admin Dashboard</h1>
        <p>Track bookings, revenue, and equipment utilization.</p>
      </section>

      {booked === "1" && (
        <div className="success-banner">Booking confirmed successfully.</div>
      )}

      <section className="stats">
        <div className="stat-card">
          <span>Total bookings</span>
          <strong>{bookings.length}</strong>
        </div>
        <div className="stat-card">
          <span>Total revenue</span>
          <strong>${totalRevenue.toFixed(2)}</strong>
        </div>
        <div className="stat-card">
          <span>Confirmed</span>
          <strong>
            {bookings.filter((booking) => booking.status === "confirmed").length}
          </strong>
        </div>
      </section>

      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Equipment</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="muted">
                  No bookings yet. Create one from the catalog.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div>{booking.customerName}</div>
                    <div className="muted" style={{ fontSize: "0.85rem" }}>
                      {booking.customerEmail}
                    </div>
                  </td>
                  <td>{booking.equipment.name}</td>
                  <td>
                    {booking.startDate.toLocaleDateString()} –{" "}
                    {booking.endDate.toLocaleDateString()}
                  </td>
                  <td>${booking.totalAmount.toFixed(2)}</td>
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
