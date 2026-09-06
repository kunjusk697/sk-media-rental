"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { bookingDays } from "@/lib/format";

type Client = { id: number; name: string };
type Equipment = {
  id: number;
  name: string;
  dailyRate: number;
  quantity: number;
};

export default function BookingForm({
  clients,
  equipment,
}: {
  clients: Client[];
  equipment: Equipment[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [equipmentId, setEquipmentId] = useState(String(equipment[0]?.id ?? ""));
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const selected = equipment.find((item) => item.id === Number(equipmentId));

  const estimatedTotal = useMemo(() => {
    if (!selected || !startDate || !endDate) {
      return 0;
    }
    const days = bookingDays(new Date(startDate), new Date(endDate));
    return days * selected.dailyRate * quantity;
  }, [selected, startDate, endDate, quantity]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: Number(formData.get("clientId")),
        equipmentId: Number(formData.get("equipmentId")),
        quantity: Number(formData.get("quantity")),
        startDate: String(formData.get("startDate")),
        endDate: String(formData.get("endDate")),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Failed to create booking");
      setSubmitting(false);
      return;
    }

    const booking = await response.json();
    router.push(`/admin/clients/${booking.clientId}`);
  }

  return (
    <section className="card form-card">
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="clientId">Client</label>
            <select id="clientId" name="clientId" required>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="equipmentId">Equipment</label>
            <select
              id="equipmentId"
              name="equipmentId"
              value={equipmentId}
              onChange={(event) => setEquipmentId(event.target.value)}
              required
            >
              {equipment.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (₹{item.dailyRate}/day)
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max={selected?.quantity ?? 1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
            />
          </div>
        </div>

        <p className="price" style={{ marginBottom: "1rem" }}>
          Estimated total: ₹{estimatedTotal.toLocaleString("en-IN")}
        </p>

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Create booking"}
        </button>
      </form>
    </section>
  );
}
