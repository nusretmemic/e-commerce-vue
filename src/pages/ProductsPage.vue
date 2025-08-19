<template>
  <section>
    <div class="flex gap-2 mb-4">
      <input
        v-model="q"
        @keyup.enter="search"
        placeholder="Search products…"
        class="input focus:bg-white"
      />
      <button class="btn btn-primary" @click="search">Search</button>
    </div>

    <div v-if="store.error" class="text-red-600 mb-3">{{ store.error }}</div>

    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mt-10"
    >
      <ProductCard v-for="p in store.items" :key="p.id" :product="p" />
    </div>

    <div class="flex justify-center my-6">
      <button
        class="btn"
        :disabled="store.loading || !store.hasMore"
        @click="loadMore"
      >
        <span v-if="store.loading">Loading…</span>
        <span v-else>Load more</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useProductsStore } from "../stores/products";
import ProductCard from "../components/ProductCard.vue";

const store = useProductsStore();
const q = ref(store.query);

function search() {
  store.query = q.value.trim();
  store.fetchProducts(true);
}
function loadMore() {
  store.fetchProducts();
}

onMounted(() => {
  if (!store.items.length) store.fetchProducts(true);
});
watch(
  () => store.query,
  (n, o) => {
    if (n !== o && !n) store.fetchProducts(true);
  }
);
</script>
