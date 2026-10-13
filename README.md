# Royal Specs

Premium mobile-first optical boutique web app for **Royal Optical Specs** — catalog, AI virtual try-on, wishlist, and WhatsApp ordering.

Brand wordmark: `public/royal-specs-logo.png` (Royol Opticals) — used in the header and app icon.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4, Framer Motion, Lucide React
- Mock catalog in `data/products.ts` (Unsplash imagery)

## Development

```bash
bash .cursor/scripts/install.sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
| --- | --- |
| `/` | Home hero, categories, featured frames |
| `/catalog` | Search, filters, product grid |
| `/try-on` | AI face models, upload/camera, frame overlay |
| `/wishlist` | Saved frames (localStorage) |
| `/product/[id]` | Gallery, lens customizer, WhatsApp order |

WhatsApp: [+91 9946732958](https://wa.me/919946732958)

## Cloud Agent

See `.cursor/environment.json` for install/start scripts.
