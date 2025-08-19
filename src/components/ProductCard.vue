<template>
  <article class="card">
    <RouterLink :to="`/product/${product.id}`" class="image-wrap">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" />
    </RouterLink>
    <div class="content">
      <h3 class="title">{{ product.title }}</h3>
      <p class="price">€{{ product.price.toFixed(2) }}</p>
      <button @click="addToCart">Add to cart</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "../types";
import { useCartStore } from "../stores/cart";

const props = defineProps<{ product: Product }>();
const cart = useCartStore();

function addToCart() {
  cart.add(props.product, 1);
}
</script>

<style scoped>
.card {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.image-wrap {
  display: block;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.content {
  padding: 0.75rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 0.95rem;
  line-height: 1.3;
}
.price {
  font-weight: 700;
}
button {
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
}
button:hover {
  background: #f7f7f7;
}
</style>
