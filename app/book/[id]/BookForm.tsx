"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Equipment = {
  id: number;
  name: string;
  category: string;
  description: string;
  dailyRate: number;
};

export default function BookPage({
  equipment,
}: {
  equipment: Equipment;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      equipmentId: equipment.id,
      customerName: String(formData.get("customerName")),
      customerEmail: String(formData.get("customerEmail")),
      startDate: String(formData.get("startDate")),
      endDate: String(formData.get("endDate")),
    };

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Booking failed");
      setSubmitting(false);
      return;
    }

    router.push("/admin?booked=1");
  }

  return (
    <>
      <p className="muted" style={{ marginBottom: "1rem" }}>
        <Link href="/">← Back to catalog</Link>
      </p>
      <section className="card form-card">
        <span className="badge">{equipment.category}</span>
        <h1 style={{ fontSize: "1.5rem" }}>Book {equipment.name}</h1>
        <p className="muted">{equipment.description}</p>
        <p className="price">${equipment.dailyRate.toFixed(2)}/day</p>

        {error && (
          <div className="success-banner" style={{ borderColor: "#ef4444", color: "#fca5a5" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Your name</label>
            <input id="customerName" name="customerName" required />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail">Email</label>
            <input id="customerEmail" name="customerEmail" type="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date</label>
            <input id="startDate" name="startDate" type="date" required />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End date</label>
            <input id="endDate" name="endDate" type="date" required />
          </div>
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Booking..." : "Confirm booking"}
          </button>
        </form>
      </section>
    </>
  );
}
