## E-Commerce Shop — Vue 3 + Vite + TS + Pinia + Router + Tailwind v4 + DummyJSON

A simple e-commerce shop built with Vue 3, Vite, TypeScript, Pinia, Vue Router, and Tailwind CSS v4. It uses the DummyJSON API for product data.

## Quick Start

1. Clone the repository:

```bash
   git clone https://github.com/your-username/e-commerce-vue.git
   cd e-commerce-vue
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`.

## Features

- **Products list** with pagination and **debounced auto‑search** via `useDebounce`.
- **Product detail** with basic gallery.
- **Cart**: add, remove, set quantity; totals computed in Pinia.
- **Toasts**: lightweight global toaster (`stores/toast.ts` + `components/Toaster.vue`).
- **Dark mode**: enable by adding `class="dark"` to `<html>` or wiring a toggle.

## API

Using [DummyJSON](https://dummyjson.com/docs/products):

- List: `GET /products?limit={n}&skip={n}`
- Search: `GET /products/search?q=term&limit={n}&skip={n}`
- Detail: `GET /products/:id`

## Scripts

`package.json` includes Vite defaults:

- `dev` — start dev server
- `build` — production build
- `preview` — preview build

## Roadmap / Ideas

- Category filters (`/products/categories`), sorting, price range.
- Persist cart to `localStorage`.
- Loading skeletons, empty states.
- E2E tests (Playwright) & unit tests (Vitest + Vue Testing Library).
- Nuxt variant for SSR.

## License

MIT © 2025

```

```

```

```
