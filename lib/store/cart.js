"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      add: (p, qty = 1) =>
        set((s) => {
          const unit = p.unitPrice ?? p.price ?? 0;
          const name = p.name ?? p.title ?? `Product #${p.id}`;
          const idx = s.cart.findIndex((i) => i.id === p.id);
          if (idx >= 0) {
            const next = [...s.cart];
            const it = next[idx];
            const quantity = it.quantity + qty;
            next[idx] = {
              ...it,
              quantity,
              totalPrice: unit * quantity,
            };
            return { cart: next };
          }
          return {
            cart: [
              ...s.cart,
              {
                id: p.id,
                name,
                unitPrice: unit,
                quantity: qty,
                totalPrice: unit * qty,
                image: p.image,
              },
            ],
          };
        }),
      increment: (id) =>
        set((s) => ({
          cart: s.cart.map((it) =>
            it.id === id
              ? {
                  ...it,
                  quantity: it.quantity + 1,
                  totalPrice: (it.quantity + 1) * it.unitPrice,
                }
              : it
          ),
        })),
      decrement: (id) =>
        set((s) => ({
          cart: s.cart
            .map((it) =>
              it.id === id
                ? {
                    ...it,
                    quantity: Math.max(0, it.quantity - 1),
                    totalPrice: Math.max(0, it.quantity - 1) * it.unitPrice,
                  }
                : it
            )
            .filter((it) => it.quantity > 0),
        })),
      remove: (id) =>
        set((s) => ({ cart: s.cart.filter((it) => it.id !== id) })),
      clear: () => set({ cart: [] }),
      total: () => get().cart.reduce((sum, it) => sum + it.totalPrice, 0),
    }),
    { name: "cart-storage" }
  )
);
