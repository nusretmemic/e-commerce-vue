import { defineStore } from "pinia";
import type { Product } from "../types";

export interface CartItem {
  product: Product;
  qty: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalQuantity: (s) => s.items.reduce((sum, it) => sum + it.qty, 0),
    totalPrice: (s) =>
      s.items.reduce((sum, it) => sum + it.qty * it.product.price, 0),
  },
  actions: {
    add(product: Product, qty = 1) {
      const found = this.items.find((i) => i.product.id === product.id);
      if (found) found.qty += qty;
      else this.items.push({ product, qty });
    },
    remove(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    },
    setQty(productId: number, qty: number) {
      const it = this.items.find((i) => i.product.id === productId);
      if (!it) return;
      it.qty = Math.max(1, qty);
    },
    clear() {
      this.items = [];
    },
  },
});
