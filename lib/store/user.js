"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAddress, getPosition } from "../services/geocoding";

export const useUserStore = create(
  persist(
    (set) => ({
      username: "",
      address: "",
      position: null,
      status: "idle",
      error: "",

      updateName: (name) => set({ username: name }),
      setUsername: (name) => set({ username: name }),
      setAddress: (addr) => set({ address: addr }),

      fetchAddress: async () => {
        try {
          set({ status: "loading", error: "" });
          const posObj = await getPosition();
          const { latitude, longitude } = posObj.coords;

          const { address, position } = await getAddress({
            latitude,
            longitude,
          });

          set({ position, address, status: "idle" });
        } catch (err) {
          set({
            status: "error",
            error:
              "⚠️ Gagal mendapatkan alamat. Silakan isi manual di form order.",
          });
        }
      },
    }),
    { name: "user-storage" }
  )
);
