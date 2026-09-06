# SK Media Rental

Admin-controlled camera and equipment rental catalog with client ledger, payments, and financial tracking.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Prisma** with SQLite for local development
- **Cloud Agent** environment via `.cursor/environment.json`

## Features

- Public catalog with INR daily rates (view-only for customers)
- WhatsApp booking notice on catalog and product pages
- Admin dashboard for bookings, clients, payments, and finance reports
- Client ledger with balance due, WhatsApp, and call buttons
- Dark theme with orange accent buttons

## Local development

```bash
bash .cursor/scripts/install.sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the catalog and `/admin` for the dashboard.

## Cloud Agent environment

- **install** — `npm ci`, Prisma generate/push, and database seed
- **start** — ensures the SQLite database exists on boot
- **terminals** — runs `npm run dev` on port 3000
