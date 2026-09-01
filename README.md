# SK Media Rental

Admin-controlled media equipment rental app with customer catalog, bookings, payments, and financial tracking.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Prisma** with SQLite for local development
- **Cloud Agent** environment via `.cursor/environment.json`

## Local development

```bash
# Install dependencies and seed the database
bash .cursor/scripts/install.sh

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the equipment catalog. Use **Admin** to view bookings and revenue.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed sample equipment |
| `npm run db:push` | Push Prisma schema to database |

## Cloud Agent environment

The `.cursor/environment.json` configures:

- **install** — `npm ci`, Prisma generate/migrate, and database seed
- **start** — ensures the SQLite database exists on boot
- **terminals** — runs `npm run dev` on port 3000
