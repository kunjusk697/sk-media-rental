"use client";

import type { ExpenseRecord, OrderRecord } from "@/data/mockDb";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function monthlyBuckets(orders: OrderRecord[], expenses: ExpenseRecord[]) {
  const keys = new Set<string>();
  orders.forEach((o) => keys.add(o.createdAt.slice(0, 7)));
  expenses.forEach((e) => keys.add(e.date.slice(0, 7)));
  const sorted = [...keys].sort().slice(-6);
  return sorted.map((month) => {
    const revenue = orders
      .filter(
        (o) =>
          o.status !== "cancelled" && o.createdAt.startsWith(month),
      )
      .reduce((s, o) => s + o.amount, 0);
    const spend = expenses
      .filter((e) => e.date.startsWith(month))
      .reduce((s, e) => s + e.amount, 0);
    return {
      month: month.slice(5),
      revenue,
      expenses: spend,
      profit: revenue - spend,
    };
  });
}

export function DashboardCharts({
  orders,
  expenses,
}: {
  orders: OrderRecord[];
  expenses: ExpenseRecord[];
}) {
  const data = monthlyBuckets(orders, expenses);

  return (
    <div className="h-72 rounded-2xl border border-stone-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-charcoal">
        Revenue vs expenses (6 months)
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) =>
              `₹${Number(value ?? 0).toLocaleString("en-IN")}`
            }
          />
          <Bar dataKey="revenue" fill="#00473e" name="Revenue" radius={4} />
          <Bar dataKey="expenses" fill="#e8b84a" name="Expenses" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
