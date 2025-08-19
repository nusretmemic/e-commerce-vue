<template>
  <section>
    <h1>Your Cart</h1>
    <div v-if="!cart.items.length">Cart is empty.</div>

    <ul v-else class="cart-list">
      <li v-for="it in cart.items" :key="it.product.id" class="row">
        <RouterLink :to="`/product/${it.product.id}`" class="title">{{
          it.product.title
        }}</RouterLink>
        <div class="qty">
          <input
            type="number"
            min="1"
            :value="it.qty"
            @input="onQty(it.product.id, $event)"
          />
        </div>
        <div class="price">€{{ (it.product.price * it.qty).toFixed(2) }}</div>
        <button class="remove" @click="cart.remove(it.product.id)">×</button>
      </li>
    </ul>

    <footer v-if="cart.items.length" class="summary">
      <div>Total items: {{ cart.totalQuantity }}</div>
      <div>Total: €{{ cart.totalPrice.toFixed(2) }}</div>
      <button @click="checkout">Checkout</button>
      <button class="clear" @click="cart.clear()">Clear</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart";

const cart = useCartStore();

function onQty(id: number, evt: Event) {
  const target = evt.target as HTMLInputElement;
  const n = Number(target.value);
  cart.setQty(id, n);
}

function checkout() {
  alert("Pretend to checkout 🙂");
}
</script>

<style scoped>
.cart-list {
  display: grid;
  gap: 0.5rem;
}
.row {
  display: grid;
  grid-template-columns: 1fr 120px 120px 40px;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid #eee;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
}
.title {
  text-decoration: none;
}
.qty input {
  width: 100%;
  padding: 0.35rem 0.45rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.price {
  font-weight: 700;
  text-align: right;
}
.remove {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}
.summary {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
}
.clear {
  opacity: 0.8;
}
</style>
