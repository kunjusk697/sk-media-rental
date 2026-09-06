"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewClientPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name")),
        phone: String(formData.get("phone")),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Failed to create client");
      setSubmitting(false);
      return;
    }

    const client = await response.json();
    router.push(`/admin/clients/${client.id}`);
  }

  return (
    <>
      <section className="hero">
        <h1>Add Client</h1>
        <p>Store client name and contact number for ledger tracking.</p>
      </section>

      <p className="muted" style={{ marginBottom: "1rem" }}>
        <Link href="/admin/clients">← Back to clients</Link>
      </p>

      {error && <div className="error-banner">{error}</div>}

      <section className="card form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Client name</label>
            <input id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Contact number</label>
            <input id="phone" name="phone" placeholder="+91 98765 43210" required />
          </div>
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save client"}
          </button>
        </form>
      </section>
    </>
  );
}
