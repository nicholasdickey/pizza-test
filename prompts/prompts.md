Create a Node / React / Vite project in the repo root.

This is a hands-on interview exercise: pizza menu with Node BFF + React frontend. I’ll start simple and extend during pairing rather than overbuilding upfront.

---

Notes / approach

- Keep state minimal, derive price instead of storing it
- Keep pricing logic out of components (pure function)
- Shared types between client/server for consistency
- Don’t over-engineer validation (simple type guards, no libraries)
- Start without cart persistence, can add localStorage if asked

---

1. Project structure

- React + TypeScript + Vite frontend
- Node.js + Express + TypeScript BFF
- Shared types imported by both sides

Dev:

- Hot reload for both client and server (don’t want to fight tooling during interview)

Prod:

- Simple build + ngrok exposure (good enough for demo)

---

2. Shared domain types

Create shared types:

- Size = "Small" | "Medium" | "Large"
- Topping
- Pizza
- MenuData

MenuData:

- pizzas: Pizza[]
- toppings: Topping[]

Pizza:

- map of sizes → base prices (precise pricing per size, not derived via multipliers)

Topping:

- map of sizes → prices (toppings can vary by size, not assumed proportional)

Pricing:

- total = pizza.basePrice[size] + sum(topping.price[size])
- no implicit modifiers or multipliers — all pricing is explicit

---

3. Mock data

Create mock data (probably server-side):

- pizzas
- toppings

Doesn’t need to be fancy, just enough variety to exercise UI

---

4. Backend API

Add:

GET /api/menu

- returns MenuData
- keep handler simple, no layering unless needed

---

5. Frontend

Create a page with PizzaMenu component.

Data fetching:

- fetch /api/menu in useEffect
- treat response as unknown
- narrow to MenuData before setting state
- basic loading + error handling (nothing fancy)

Might extract to useMenu() hook if it starts getting noisy.

---

6. Pizza cards

Render list of PizzaCard components.

Each card:

- name
- size selector (default: Medium)
- toppings selector (default: none)
- derived price (recomputed on change)
- Add to Cart button (only when selected — might refine this)

State:

- size + selected toppings local to card
- no price in state

Styling:

- keep it simple, not the focus

---

7. Cart (if/when added)

- Cart state lives above cards (likely in PizzaMenu or App)
- pass addToCart handler down
- SelectedPizza shape:

  { pizza, size, toppings }

Will keep it simple first (no dedup/merge), can refine if asked.

---

8. Testing

- Vitest for React
- Supertest for API
- Playwright smoke test

Not aiming for full coverage, just basic confidence:

- component renders
- API returns expected shape
- page loads and displays pizzas

---

9. CI

.github/workflows/test.yml

- install
- typecheck
- run Vitest
- run Supertest
- run Playwright (headless)

---

That should be enough for baseline. I’ll extend based on follow-ups (cart behavior, filtering, persistence, etc.) rather than pre-building everything.
