<template>
  <div class="container mx-auto">
    <header class="flex items-center justify-between gap-4 py-4">
      <RouterLink to="/" class="text-xl font-semibold"
        >E-Commerce Shop</RouterLink
      >
      <nav class="flex items-center gap-3">
        <RouterLink to="/" class="btn">Products</RouterLink>
        <RouterLink to="/cart" class="btn">Cart ({{ cartCount }})</RouterLink>
      </nav>
    </header>

    <main class="py-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "./stores/cart";

const cart = useCartStore();
const cartCount = computed(() => cart.totalQuantity);
</script>
