"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: {},
      addOrder: (order) =>
        set((state) => ({
          orders: { ...state.orders, [order.id]: order },
        })),
      getOrder: (id) => get().orders?.[id] ?? null,
      removeOrder: (id) =>
        set((state) => {
          const next = { ...state.orders };
          delete next[id];
          return { orders: next };
        }),
    }),
    {
      name: "orders-storage",
      version: 1,
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
