"use client";

import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { ORDER_STATUS_LABELS } from "@/data/mockDb";
import {
  computeFinance,
  selectLowStock,
  useRoyalStore,
} from "@/lib/store/royal-store";
import { formatInr } from "@/data/products";
import Link from "next/link";

export default function AdminDashboardPage() {
  const products = useRoyalStore((s) => s.products);
  const orders = useRoyalStore((s) => s.orders);
  const expenses = useRoyalStore((s) => s.expenses);
  const finance = computeFinance(orders, expenses);
  const lowStock = selectLowStock(products);

  const pipeline = Object.keys(ORDER_STATUS_LABELS).map((status) => ({
    status,
    label: ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS],
    count: orders.filter((o) => o.status === status).length,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Executive dashboard</h1>
        <p className="text-sm text-stone-500">
          വരവ്-ചിലവ് overview · WhatsApp +919946732958
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value={formatInr(finance.revenue)} />
        <StatCard label="This month" value={formatInr(finance.monthlyRevenue)} />
        <StatCard label="Expenses" value={formatInr(finance.totalExpenses)} />
        <StatCard
          label="Net profit"
          value={formatInr(finance.netProfit)}
          highlight
        />
      </div>

      <DashboardCharts orders={orders} expenses={expenses} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Order pipeline</h2>
            <Link href="/admin/orders" className="text-sm text-forest">View all</Link>
          </div>
          <ul className="space-y-2">
            {pipeline.map((p) => (
              <li
                key={p.status}
                className="flex justify-between rounded-xl bg-surface px-3 py-2 text-sm"
              >
                <span>{p.label}</span>
                <span className="font-semibold">{p.count}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Low stock alerts</h2>
            <Link href="/admin/products" className="text-sm text-forest">Catalog</Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="text-sm text-stone-500">All SKUs above alert threshold.</p>
          ) : (
            <ul className="space-y-2">
              {lowStock.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm"
                >
                  <span>{p.name}</span>
                  <span className="font-semibold text-amber-800">{p.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/finance"
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium"
        >
          Export statement (CSV) — coming soon
        </Link>
        <Link
          href="/admin/finance"
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium"
        >
          PDF invoice — coming soon
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-forest bg-forest text-white"
          : "border-stone-200 bg-white"
      }`}
    >
      <p className={`text-xs font-medium ${highlight ? "text-white/80" : "text-stone-500"}`}>
        {label}
      </p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
