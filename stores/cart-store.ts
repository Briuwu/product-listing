import { create } from "zustand";

type Store = {
  cart: { id: number; quantity: number }[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
};

export const useCartStore = create<Store>()((set) => ({
  cart: [],
  addToCart: (id: number) =>
    set((state) => {
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        return {
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { cart: [...state.cart, { id, quantity: 1 }] };
      }
    }),
  removeFromCart: (id: number) => {
    set((state) => {
      const item = state.cart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        return {
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      } else {
        return { cart: state.cart.filter((item) => item.id !== id) };
      }
    });
  },
  removeItem: (id: number) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
  removeAll: () => set({ cart: [] }),
}));
