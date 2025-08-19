<template>
  <section v-if="product" class="grid md:grid-cols-2 gap-6">
    <div>
      <img
        :src="activeImage || product.thumbnail"
        :alt="product.title"
        class="w-full rounded-2xl"
      />
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="img in product.images || []"
          :key="img"
          @click="activeImage = img"
          class="border border-gray-200 rounded-xl overflow-hidden p-0"
        >
          <img :src="img" :alt="product.title" class="w-20 h-20 object-cover" />
        </button>
      </div>
    </div>

    <div>
      <h1 class="text-2xl font-semibold">{{ product.title }}</h1>
      <p v-if="product.brand" class="text-gray-500">{{ product.brand }}</p>
      <p class="text-xl font-bold my-2">€{{ product.price.toFixed(2) }}</p>
      <p class="text-gray-700">{{ product.description }}</p>

      <div class="flex items-center gap-2 mt-4">
        <input type="number" min="1" v-model.number="qty" class="input w-24" />
        <button class="btn btn-primary" @click="addToCart">Add to cart</button>
      </div>
    </div>
  </section>
  <p v-else-if="store.loading">Loading…</p>
  <p v-else class="text-red-600">{{ store.error || "Not found" }}</p>
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
