import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getFinanceSummary } from "@/lib/ledger";
import { formatInr } from "@/lib/format";
import { AdminNav } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [clients, bookings, finance] = await Promise.all([
    prisma.client.count(),
    prisma.booking.count(),
    getFinanceSummary(),
  ]);

  const recentBookings = await prisma.booking.findMany({
    include: {
      client: true,
      items: { include: { equipment: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <>
      <section className="hero">
        <h1>Admin Dashboard</h1>
        <p>
          Dashboard-first control center for bookings, client ledgers, payments, and
          business earnings.
        </p>
      </section>

      <AdminNav active="/admin" />

      <section className="quick-actions">
        <div className="quick-card">
          <h3>New booking</h3>
          <p>Manually add a rental booking for a client.</p>
          <Link className="btn" href="/admin/bookings/new">Add booking</Link>
        </div>
        <div className="quick-card">
          <h3>New client</h3>
          <p>Store client name and contact number.</p>
          <Link className="btn" href="/admin/clients/new">Add client</Link>
        </div>
        <div className="quick-card">
          <h3>Record payment</h3>
          <p>Update payments and track remaining balance.</p>
          <Link className="btn" href="/admin/clients">Manage clients</Link>
        </div>
        <div className="quick-card">
          <h3>Finance reports</h3>
          <p>View monthly and yearly earnings summaries.</p>
          <Link className="btn" href="/admin/finance">Open finance</Link>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span>Clients</span>
          <strong>{clients}</strong>
        </div>
        <div className="stat-card">
          <span>Bookings</span>
          <strong>{bookings}</strong>
        </div>
        <div className="stat-card">
          <span>Collected</span>
          <strong>{formatInr(finance.totalCollected)}</strong>
        </div>
        <div className="stat-card">
          <span>Outstanding</span>
          <strong>{formatInr(finance.outstanding)}</strong>
        </div>
      </section>

      <h2 className="section-title">Recent bookings</h2>
      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Equipment</th>
              <th>Dates</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="muted">
                  No bookings yet. Use quick actions to add one.
                </td>
              </tr>
            ) : (
              recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <Link href={`/admin/clients/${booking.clientId}`}>
                      {booking.client.name}
                    </Link>
                  </td>
                  <td>
                    {booking.items.map((item) => item.equipment.name).join(", ")}
                  </td>
                  <td>
                    {booking.startDate.toLocaleDateString("en-IN")} –{" "}
                    {booking.endDate.toLocaleDateString("en-IN")}
                  </td>
                  <td>{formatInr(booking.totalAmount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
