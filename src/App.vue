<template>
  <div class="container">
    <header class="header">
      <RouterLink to="/" class="brand">E-Commerce Shop</RouterLink>
      <nav>
        <RouterLink to="/">Products</RouterLink>
        <RouterLink to="/cart">Cart ({{ cartCount }})</RouterLink>
      </nav>
    </header>

    <main class="main">
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

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.header a {
  margin-right: 1rem;
  text-decoration: none;
}
.brand {
  font-weight: 700;
}
.main {
  margin-top: 1rem;
}
</style>
