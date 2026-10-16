# Royal Specs — dual-interface architecture

## Route groups

| URL | Group | Purpose |
| --- | --- | --- |
| `/`, `/catalog`, `/try-on`, `/wishlist`, `/product/[id]` | `app/(customer)/` | Mobile boutique |
| `/app` | `app/(customer)/app` | Alias → `/` |
| `/admin/login` | `app/(admin)/admin/login` | PIN gate |
| `/admin/*` | `app/(admin)/admin/(portal)/` | Super admin (protected) |

## State

- **`data/mockDb.ts`** — types + seed (products, categories, orders, expenses, face models).
- **`lib/store/royal-store.ts`** — Zustand + `localStorage` persist (`royal-specs-mock-db`).
- **`lib/hooks/use-catalog-products.ts`** — customer catalog reads store after hydration.

## Admin auth

- PIN: `NEXT_PUBLIC_ADMIN_PIN` or default `452958` (last 6 digits of WhatsApp).
- Session: `sessionStorage` key `royal-specs-admin-session`.

## Implemented (phase 1)

- Executive dashboard + Recharts
- Product catalog CRUD (`/admin/products`)
- Orders pipeline, finance ledger stubs, categories/try-on list views

## Next

- Category CRUD, try-on upload UI, CSV/PDF export, customer reviews, power requirement on WhatsApp flow.
