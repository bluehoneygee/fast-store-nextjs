// lib/store/cart.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      add: (product, qty = 1) => {
        const exists = get().cart.find((i) => i.id === product.id);
        if (exists) {
          set({
            cart: get().cart.map((i) =>
              i.id === product.id
                ? {
                    ...i,
                    quantity: i.quantity + qty,
                    totalPrice: (i.quantity + qty) * i.price,
                  }
                : i
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              {
                id: product.id,
                name: product.title,
                quantity: qty,
                price: product.price,
                totalPrice: product.price * qty,
              },
            ],
          });
        }
      },
      remove: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),
      clear: () => set({ cart: [] }),
      totalQuantity: () => get().cart.reduce((s, i) => s + i.quantity, 0),
      totalPrice: () => get().cart.reduce((s, i) => s + i.totalPrice, 0),
    }),
    { name: "cart-storage" }
  )
);
