import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "../pages/ProductsPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import CartPage from "../pages/CartPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "products", component: ProductsPage },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailPage,
      props: true,
    },
    { path: "/cart", name: "cart", component: CartPage },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
