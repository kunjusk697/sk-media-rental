import { getFinanceSummary } from "@/lib/ledger";
import { formatInr } from "@/lib/format";
import { AdminNav } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const finance = await getFinanceSummary();

  return (
    <>
      <section className="hero">
        <h1>Financial Dashboard</h1>
        <p>Track rental earnings, payments collected, and outstanding balances.</p>
      </section>

      <AdminNav active="/admin/finance" />

      <section className="stats">
        <div className="stat-card">
          <span>Total booked</span>
          <strong>{formatInr(finance.totalBooked)}</strong>
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

      <h2 className="section-title">Monthly summary</h2>
      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Earnings collected</th>
            </tr>
          </thead>
          <tbody>
            {finance.monthly.length === 0 ? (
              <tr>
                <td colSpan={2} className="muted">No payments recorded yet.</td>
              </tr>
            ) : (
              finance.monthly.map(([month, amount]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{formatInr(amount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <h2 className="section-title">Yearly summary</h2>
      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Earnings collected</th>
            </tr>
          </thead>
          <tbody>
            {finance.yearly.length === 0 ? (
              <tr>
                <td colSpan={2} className="muted">No payments recorded yet.</td>
              </tr>
            ) : (
              finance.yearly.map(([year, amount]) => (
                <tr key={year}>
                  <td>{year}</td>
                  <td>{formatInr(amount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
