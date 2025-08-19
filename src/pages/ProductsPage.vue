<template>
  <section>
    <div class="toolbar">
      <input v-model="q" @keyup.enter="search" placeholder="Search products…" />
      <button @click="search">Search</button>
    </div>

    <div v-if="store.error" class="error">{{ store.error }}</div>

    <div class="grid">
      <ProductCard v-for="p in store.items" :key="p.id" :product="p" />
    </div>

    <div class="controls">
      <button :disabled="store.loading || !store.hasMore" @click="loadMore">
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
  (newQ, oldQ) => {
    if (newQ !== oldQ && !newQ) store.fetchProducts(true);
  }
);
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.toolbar input {
  flex: 1;
  padding: 0.5rem 0.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.controls {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
.error {
  color: #b00020;
  margin-bottom: 0.75rem;
}
</style>
