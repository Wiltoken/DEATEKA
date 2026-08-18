import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      hasItem: (productId) => get().items.includes(productId),
      toggle: (productId) => {
        get().hasItem(productId) ? get().removeItem(productId) : get().addItem(productId);
      },
    }),
    { name: "deateka-wishlist" }
  )
);
