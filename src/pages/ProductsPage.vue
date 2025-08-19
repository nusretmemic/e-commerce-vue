<template>
  <section>
    <div class="w-150 relative">
      <input
        v-model="q"
        placeholder="Search products…"
        class="input focus:bg-white border-gray-300"
      />
      <button
        v-if="q"
        class="absolute right-0 top-0 h-full px-4"
        @click="resetSearch"
      >
        x
      </button>
    </div>

    <div v-if="store.error" class="text-red-600 mb-3">{{ store.error }}</div>

    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mt-10"
    >
      <ProductCard v-for="p in store.items" :key="p.id" :product="p" />
    </div>

    <div class="flex justify-center my-6">
      <button
        v-if="!store.loading && store.hasMore"
        class="btn"
        @click="loadMore"
      >
        <span>Load more</span>
      </button>
      <span v-else-if="store.loading" class="text-gray-500 text-sm">
        Loading…
      </span>
      <span v-else class="text-gray-500 text-sm"> No more products </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useProductsStore } from "../stores/products";
import ProductCard from "../components/ProductCard.vue";
import { useDebounce } from "../composables/useDebounce";

const store = useProductsStore();
const q = ref(store.query);
const qDebounced = useDebounce(q, 400);

function loadMore() {
  store.fetchProducts();
}

function resetSearch() {
  q.value = "";
  store.query = "";
}

onMounted(() => {
  if (!store.items.length) store.fetchProducts(true);
});

//auto-search when user stops typing
watch(qDebounced, (val, oldVal) => {
  if (val === oldVal) return;
  store.query = String(val).trim();
  store.fetchProducts(true);
});
</script>
