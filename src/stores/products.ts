import { defineStore } from "pinia";
import type { Product, PaginatedProducts } from "../types";

const BASE = "https://dummyjson.com";

export const useProductsStore = defineStore("products", {
  state: () => ({
    items: [] as Product[],
    total: 0,
    limit: 12,
    skip: 0,
    loading: false,
    error: "" as string | null,
    query: "",
  }),
  getters: {
    hasMore: (s) => s.skip + s.limit < s.total,
  },
  actions: {
    async fetchProducts(reset = false) {
      if (reset) {
        this.items = [];
        this.skip = 0;
      }
      this.loading = true;
      this.error = null;
      try {
        const url = this.query
          ? `${BASE}/products/search?q=${encodeURIComponent(
              this.query
            )}&limit=${this.limit}&skip=${this.skip}`
          : `${BASE}/products?limit=${this.limit}&skip=${this.skip}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as PaginatedProducts;
        this.total = data.total;
        this.items = reset ? data.products : [...this.items, ...data.products];
        this.skip = this.items.length;
      } catch (e: any) {
        this.error = e.message || "Failed to load products";
      } finally {
        this.loading = false;
      }
    },
    async fetchById(id: number): Promise<Product | null> {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(`${BASE}/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Product;
        return data;
      } catch (e: any) {
        this.error = e.message || "Failed to fetch product";
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
