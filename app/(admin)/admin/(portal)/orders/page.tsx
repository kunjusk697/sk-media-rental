"use client";

import { ORDER_STATUS_LABELS, PAYMENT_LABELS } from "@/data/mockDb";
import { useRoyalStore } from "@/lib/store/royal-store";
import { formatInr } from "@/data/products";
import type { OrderStatus } from "@/data/mockDb";

export default function AdminOrdersPage() {
  const orders = useRoyalStore((s) => s.orders);
  const updateOrderStatus = useRoyalStore((s) => s.updateOrderStatus);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">WhatsApp leads & orders</h1>
      <p className="text-sm text-stone-500">Inbound from +919946732958</p>
      <div className="space-y-3">
        {orders.map((o) => (
          <article
            key={o.id}
            className="rounded-2xl border border-stone-200 bg-white p-4"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">{o.customerName}</p>
                <p className="text-sm text-stone-500">{o.productName}</p>
              </div>
              <p className="font-bold">{formatInr(o.amount)}</p>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              {PAYMENT_LABELS[o.paymentMethod]} · {o.phone}
            </p>
            <select
              className="input mt-3 max-w-xs"
              value={o.status}
              onChange={(e) =>
                updateOrderStatus(o.id, e.target.value as OrderStatus)
              }
            >
              {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </div>
  );
}
