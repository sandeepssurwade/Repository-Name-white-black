"use client";

import { create } from "zustand";
import { CartLine } from "@/lib/types";

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  compareList: string[];
  isCartOpen: boolean;
  addToCart: (line: CartLine) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  setCartOpen: (open: boolean) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  compareList: [],
  isCartOpen: false,
  addToCart: (line) =>
    set((state) => {
      const existing = state.cart.find(
        (c) => c.productId === line.productId && c.size === line.size && c.color === line.color
      );
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c === existing ? { ...c, qty: c.qty + line.qty } : c
          ),
          isCartOpen: true,
        };
      }
      return { cart: [...state.cart, line], isCartOpen: true };
    }),
  removeFromCart: (productId, size, color) =>
    set((state) => ({
      cart: state.cart.filter(
        (c) => !(c.productId === productId && c.size === size && c.color === color)
      ),
    })),
  updateQty: (productId, size, color, qty) =>
    set((state) => ({
      cart: state.cart.map((c) =>
        c.productId === productId && c.size === size && c.color === color
          ? { ...c, qty: Math.max(1, qty) }
          : c
      ),
    })),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
  addRecentlyViewed: (productId) =>
    set((state) => ({
      recentlyViewed: [productId, ...state.recentlyViewed.filter((id) => id !== productId)].slice(0, 8),
    })),
  toggleCompare: (productId) =>
    set((state) => ({
      compareList: state.compareList.includes(productId)
        ? state.compareList.filter((id) => id !== productId)
        : state.compareList.length < 4
        ? [...state.compareList, productId]
        : state.compareList,
    })),
  setCartOpen: (open) => set({ isCartOpen: open }),
  clearCart: () => set({ cart: [] }),
}));
