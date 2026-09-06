import Link from "next/link";
import { notFound } from "next/navigation";
import { getClientLedger } from "@/lib/ledger";
import { formatInr } from "@/lib/format";
import { AdminNav, ContactButtons } from "@/components/ui";
import PaymentForm from "./PaymentForm";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ledger = await getClientLedger(Number(id));

  if (!ledger) {
    notFound();
  }

  const { client, totalBooked, totalPaid, balanceDue } = ledger;

  return (
    <>
      <section className="hero">
        <h1>{client.name}</h1>
        <p>Client ledger with transaction history, payments, and balance due.</p>
      </section>

      <AdminNav active="/admin/clients" />

      <p className="muted" style={{ marginBottom: "1rem" }}>
        <Link href="/admin/clients">← Back to clients</Link>
      </p>

      <section className="ledger-grid">
        <div className="stat-card">
          <span>Total booked</span>
          <strong>{formatInr(totalBooked)}</strong>
        </div>
        <div className="stat-card">
          <span>Payments made</span>
          <strong>{formatInr(totalPaid)}</strong>
        </div>
        <div className="stat-card">
          <span>Balance due</span>
          <strong>{formatInr(balanceDue)}</strong>
        </div>
      </section>

      <div style={{ marginBottom: "1.5rem" }}>
        <p className="muted">Contact: {client.phone}</p>
        <ContactButtons
          phone={client.phone}
          whatsappMessage={`Hi ${client.name}, this is SK Media Rental regarding your booking.`}
        />
      </div>

      <h2 className="section-title">Record payment</h2>
      <PaymentForm clientId={client.id} />

      <h2 className="section-title">Booking history</h2>
      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {client.bookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="muted">No bookings yet.</td>
              </tr>
            ) : (
              client.bookings.map((booking) => (
                <tr key={booking.id}>
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

      <h2 className="section-title">Payment history</h2>
      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {client.payments.length === 0 ? (
              <tr>
                <td colSpan={3} className="muted">No payments recorded yet.</td>
              </tr>
            ) : (
              client.payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.paidAt.toLocaleDateString("en-IN")}</td>
                  <td>{formatInr(payment.amount)}</td>
                  <td>{payment.note ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
