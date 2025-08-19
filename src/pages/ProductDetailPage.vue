<template>
  <section v-if="product" class="detail">
    <div class="gallery">
      <img :src="activeImage || product.thumbnail" :alt="product.title" />
      <div class="thumbs">
        <button
          v-for="img in product.images || []"
          :key="img"
          @click="activeImage = img"
        >
          <img :src="img" :alt="product.title" />
        </button>
      </div>
    </div>

    <div class="info">
      <h1>{{ product.title }}</h1>
      <p class="brand" v-if="product.brand">{{ product.brand }}</p>
      <p class="price">€{{ product.price.toFixed(2) }}</p>
      <p class="desc">{{ product.description }}</p>

      <div class="actions">
        <input type="number" min="1" v-model.number="qty" />
        <button @click="addToCart">Add to cart</button>
      </div>
    </div>
  </section>
  <p v-else-if="store.loading">Loading…</p>
  <p v-else class="error">{{ store.error || "Not found" }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../stores/products";
import { useCartStore } from "../stores/cart";
import type { Product } from "../types";

const route = useRoute();
const id = Number(route.params.id);
const store = useProductsStore();
const cart = useCartStore();

const product = ref<Product | null>(null);
const activeImage = ref<string>("");
const qty = ref(1);

onMounted(async () => {
  product.value = await store.fetchById(id);
});

function addToCart() {
  if (product.value) cart.add(product.value, qty.value);
}
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.5rem;
}
.gallery img {
  width: 100%;
  border-radius: 12px;
}
.thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}
.thumbs button {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
}
.thumbs img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  display: block;
}
.info h1 {
  margin: 0 0 0.25rem;
}
.brand {
  color: #555;
}
.price {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.actions input {
  width: 80px;
  padding: 0.4rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.actions button {
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>
