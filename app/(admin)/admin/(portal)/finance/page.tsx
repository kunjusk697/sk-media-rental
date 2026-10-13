"use client";

import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { PAYMENT_LABELS, type ExpenseCategory } from "@/data/mockDb";
import { computeFinance, useRoyalStore } from "@/lib/store/royal-store";
import { formatInr } from "@/data/products";
import { useState } from "react";

export default function AdminFinancePage() {
  const orders = useRoyalStore((s) => s.orders);
  const expenses = useRoyalStore((s) => s.expenses);
  const addExpense = useRoyalStore((s) => s.addExpense);
  const finance = computeFinance(orders, expenses);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<ExpenseCategory>("other");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Accounts & ledger</h1>
        <p className="text-sm text-stone-500">വരവ്-ചിലവ് കണക്കുകൾ</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-xs text-stone-500">Revenue</p>
          <p className="text-xl font-bold">{formatInr(finance.revenue)}</p>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <p className="text-xs text-stone-500">Expenses</p>
          <p className="text-xl font-bold">{formatInr(finance.totalExpenses)}</p>
        </div>
        <div className="rounded-2xl border border-forest bg-forest p-4 text-white">
          <p className="text-xs text-white/80">Net profit</p>
          <p className="text-xl font-bold">{formatInr(finance.netProfit)}</p>
        </div>
      </div>

      <DashboardCharts orders={orders} expenses={expenses} />

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="font-semibold">Add expense</h2>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            addExpense({
              title,
              amount,
              category,
              paymentMethod: "upi",
              date: new Date().toISOString().slice(0, 10),
            });
            setTitle("");
            setAmount(0);
          }}
        >
          <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input className="input" type="number" placeholder="Amount" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} required />
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)}>
            <option value="stock">Stock purchase</option>
            <option value="packaging">Packaging</option>
            <option value="shipping">Shipping</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
          <button type="submit" className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">Save expense</button>
        </form>
        <ul className="mt-6 space-y-2 text-sm">
          {expenses.map((e) => (
            <li key={e.id} className="flex justify-between rounded-xl bg-surface px-3 py-2">
              <span>{e.title}</span>
              <span>{formatInr(e.amount)} · {PAYMENT_LABELS[e.paymentMethod]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
