<template>
  <div class="container mx-auto py-5">
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
  <Toaster />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "./stores/cart";
import Toaster from "./components/Toaster.vue";

const cart = useCartStore();
const cartCount = computed(() => cart.totalQuantity);
</script>
