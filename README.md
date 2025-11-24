<div align="center">

  <h3 align="center">Fast Store</h3>

  <div align="center">
    A Next.js 15 (App Router) demo shop. Browse a Fake Store catalog, build a cart, place orders with delivery details and optional priority, auto-fill addresses from your location, and track the order locally with a delivery countdown.
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Fast Store is a lightweight e-commerce experience built with the Next.js App Router. Products are fetched from the Fake Store API (or any compatible endpoint you point it to), cart and orders are persisted locally with Zustand, and users can create orders with an optional 20% priority fee. The order detail view runs entirely on the client, showing delivery countdowns and price breakdowns without needing a backend.

The UI uses Tailwind CSS v4 and ShadCN UI components for a clean, responsive layout, plus global error and not-found boundaries for a production-like flow.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js 15 (App Router)
- React 19 + Server/Client Components
- Tailwind CSS v4 + ShadCN UI + Radix Primitives
- Zustand (persisted cart, user, and order stores)
- Fake Store API (default data source) via `fetch`/Axios
- TypeScript-ready tooling (ESLint, jsconfig paths)

## <a name="features">🔋 Features</a>

👉 **Product catalog**: Fetches items from Fake Store API (override with `NEXT_PUBLIC_API_BASE`) with loading and graceful error states.  
👉 **Cart with persistence**: Add/remove/increment/decrement items, auto-calculate totals, and keep state in `localStorage`.  
👉 **Order builder**: Validates customer name/phone/address, supports optional priority surcharge (+20%), and normalizes cart lines.  
👉 **Address helpers**: Try geolocation + BigDataCloud reverse geocoding to prefill the address; fallback to manual entry.  
👉 **Order lookup**: Search by order ID from the navbar, view local order details, delivery countdown, and status badges.  
👉 **Price breakdown**: Clear summary of order price, priority fee, and pay-on-delivery total.  
👉 **Responsive UI**: Tailwind + ShadCN components, bottom cart overview bar, and global error/not-found boundaries.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to run the project locally.

**Prerequisites**

- Git
- Node.js 18+ (npm included)

**Cloning the Repository**

```bash

git clone https://github.com/bluehoneygee/fast-store-nextjs
cd fast-store-nextjs
```

**Installation**

```bash
npm install
```

**Set Up Environment Variables**

Create `.env.local` in the project root (optional override):

```env
# Change if you use a different product source
NEXT_PUBLIC_API_BASE=https://fakestoreapi.com
```

Geolocation and reverse geocoding use the public BigDataCloud endpoint and do not require an API key.

**Running the Project**

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the store. Use the navbar search to open an order by its ID after you create one. For a production build, run `npm run build && npm start`.
