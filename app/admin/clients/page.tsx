import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getClientLedger } from "@/lib/ledger";
import { formatInr } from "@/lib/format";
import { AdminNav, ContactButtons } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
  });

  const ledgers = await Promise.all(
    clients.map(async (client) => ({
      client,
      ledger: await getClientLedger(client.id),
    })),
  );

  return (
    <>
      <section className="hero">
        <h1>Client Management</h1>
        <p>Track client profiles, bookings, payments, and outstanding balances.</p>
      </section>

      <AdminNav active="/admin/clients" />

      <div className="actions" style={{ marginBottom: "1.5rem" }}>
        <Link className="btn" href="/admin/clients/new">Add client</Link>
      </div>

      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Total booked</th>
              <th>Paid</th>
              <th>Balance due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ledgers.length === 0 ? (
              <tr>
                <td colSpan={6} className="muted">No clients yet.</td>
              </tr>
            ) : (
              ledgers.map(({ client, ledger }) => (
                <tr key={client.id}>
                  <td>
                    <Link href={`/admin/clients/${client.id}`}>{client.name}</Link>
                  </td>
                  <td>{client.phone}</td>
                  <td>{formatInr(ledger?.totalBooked ?? 0)}</td>
                  <td>{formatInr(ledger?.totalPaid ?? 0)}</td>
                  <td>{formatInr(ledger?.balanceDue ?? 0)}</td>
                  <td>
                    <ContactButtons phone={client.phone} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
