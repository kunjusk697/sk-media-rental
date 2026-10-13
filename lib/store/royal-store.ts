"use client";

import {
  initialMockDb,
  type CategoryRecord,
  type ExpenseRecord,
  type FaceModelRecord,
  type OrderRecord,
  type OrderStatus,
  type ProductRecord,
  type RoyalMockDb,
} from "@/data/mockDb";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

interface RoyalStore extends RoyalMockDb {
  upsertProduct: (product: ProductRecord) => void;
  deleteProduct: (id: string) => void;
  upsertCategory: (category: CategoryRecord) => void;
  deleteCategory: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addExpense: (expense: Omit<ExpenseRecord, "id">) => void;
  upsertFaceModel: (model: FaceModelRecord) => void;
  deleteFaceModel: (id: string) => void;
  resetToSeed: () => void;
}

export const useRoyalStore = create<RoyalStore>()(
  persist(
    (set) => ({
      ...initialMockDb,
      upsertProduct: (product) =>
        set((state) => {
          const exists = state.products.some((p) => p.id === product.id);
          return {
            products: exists
              ? state.products.map((p) => (p.id === product.id ? product : p))
              : [...state.products, product],
          };
        }),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      upsertCategory: (category) =>
        set((state) => {
          const exists = state.categories.some((c) => c.id === category.id);
          return {
            categories: exists
              ? state.categories.map((c) => (c.id === category.id ? category : c))
              : [...state.categories, category],
          };
        }),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o,
          ),
        })),
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: uid("exp") }],
        })),
      upsertFaceModel: (model) =>
        set((state) => {
          const exists = state.faceModels.some((m) => m.id === model.id);
          return {
            faceModels: exists
              ? state.faceModels.map((m) => (m.id === model.id ? model : m))
              : [...state.faceModels, model],
          };
        }),
      deleteFaceModel: (id) =>
        set((state) => ({
          faceModels: state.faceModels.filter((m) => m.id !== id),
        })),
      resetToSeed: () => set({ ...initialMockDb }),
    }),
    { name: "royal-specs-mock-db" },
  ),
);

export function selectLowStock(products: ProductRecord[]) {
  return products.filter((p) => p.stock <= p.stockAlertAt);
}

export function computeFinance(orders: OrderRecord[], expenses: ExpenseRecord[]) {
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
  const monthlyRevenue = orders
    .filter((o) => {
      const d = new Date(o.createdAt);
      return (
        o.status !== "cancelled" &&
        `${d.getFullYear()}-${d.getMonth()}` === monthKey
      );
    })
    .reduce((sum, o) => sum + o.amount, 0);

  return {
    revenue,
    totalExpenses,
    netProfit: revenue - totalExpenses,
    monthlyRevenue,
  };
}
