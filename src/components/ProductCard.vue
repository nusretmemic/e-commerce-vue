<template>
  <article class="card overflow-hidden flex flex-col relative h-75">
    <RouterLink
      :to="`/product/${product.id}`"
      class="block aspect-video overflow-hidden"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
        class="w-full h-full object-cover"
      />
    </RouterLink>
    <div class="p-3 flex flex-col gap-2 mt-5">
      <h3 class="text-sm text-gray-500 font-medium leading-snug line-clamp-2">
        {{ product.title }}
      </h3>
      <p class="font-semibold">€{{ product.price.toFixed(2) }}</p>
    </div>
    <div class="px-3 absolute bottom-3 left-0 right-0">
      <button
        class="btn border-gray-500 hover:bg-gray-900 hover:text-white w-full"
        @click="addToCart"
      >
        Add to cart
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "../types";
import { useCartStore } from "../stores/cart";
import { useToastStore } from "../stores/toast";
const toast = useToastStore();

const props = defineProps<{ product: Product }>();
const cart = useCartStore();

function addToCart() {
  cart.add(props.product, 1);
  toast.show(`Added ${props.product.title} to cart`, {
    type: "success",
  });
}
</script>
