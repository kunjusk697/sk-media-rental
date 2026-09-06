"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentForm({ clientId }: { clientId: number }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        amount: Number(formData.get("amount")),
        note: String(formData.get("note") || ""),
        paidAt: String(formData.get("paidAt")),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Failed to record payment");
      setSubmitting(false);
      return;
    }

    router.refresh();
    event.currentTarget.reset();
    setSubmitting(false);
  }

  return (
    <section className="card form-card">
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="amount">Payment amount (₹)</label>
            <input id="amount" name="amount" type="number" min="1" step="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="paidAt">Payment date</label>
            <input
              id="paidAt"
              name="paidAt"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <input id="note" name="note" placeholder="Advance / final settlement" />
        </div>
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Record payment"}
        </button>
      </form>
    </section>
  );
}
