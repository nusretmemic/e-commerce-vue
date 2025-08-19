<template>
  <section>
    <h1 class="text-xl font-semibold mb-3">Your Cart</h1>
    <div v-if="!cart.items.length" class="text-gray-600">Cart is empty.</div>

    <ul v-else class="grid gap-2">
      <li
        v-for="it in cart.items"
        :key="it.product.id"
        class="grid grid-cols-[1fr_120px_120px_40px] items-center gap-2 border border-gray-200 rounded-2xl p-2"
      >
        <div class="flex items-center gap-2">
          <img
            :src="it.product.images?.[0] ?? it.product.thumbnail ?? placeholder"
            :alt="it.product.title"
            class="w-16 h-16 object-cover rounded-lg"
          />
          <RouterLink
            :to="`/product/${it.product.id}`"
            class="hover:underline"
            >{{ it.product.title }}</RouterLink
          >
        </div>
        <div>
          <input
            type="number"
            min="1"
            :value="it.qty"
            @input="onQty(it.product.id, $event)"
            class="input"
          />
        </div>
        <div class="font-semibold text-right">
          €{{ (it.product.price * it.qty).toFixed(2) }}
        </div>
        <button class="btn" @click="cart.remove(it.product.id)">×</button>
      </li>
    </ul>

    <footer
      v-if="cart.items.length"
      class="flex flex-wrap items-center gap-3 justify-end mt-4"
    >
      <div>Total items: {{ cart.totalQuantity }}</div>
      <div class="font-semibold">Total: €{{ cart.totalPrice.toFixed(2) }}</div>
      <button class="btn btn-primary" @click="checkout">Checkout</button>
      <button class="btn" @click="cart.clear()">Clear</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart";
const cart = useCartStore();

// small inline SVG as a fallback (no new file needed)
const placeholder =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="%239ca3af">No Image</text></svg>';

function onQty(id: number, evt: Event) {
  const target = evt.target as HTMLInputElement;
  const n = Number(target.value);
  cart.setQty(id, n);
}

function checkout() {
  alert("Pretend to checkout 🙂");
}
</script>
