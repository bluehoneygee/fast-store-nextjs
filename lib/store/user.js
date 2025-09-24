import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPosition } from "../services/geolocation";
import { reverseGeocode } from "../services/geocoding";

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

          // 1. ambil posisi
          const posObj = await getPosition();
          const position = {
            latitude: posObj.coords.latitude,
            longitude: posObj.coords.longitude,
          };

          // 2. reverse geocoding
          const { address } = await reverseGeocode(position);

          // 3. update state
          set({ position, address, status: "idle" });
        } catch (err) {
          console.error(" fetchAddress error:", err);
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
