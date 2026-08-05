# TheSmartFares — Coupon Site

A fast, Google-Ads-ready coupon website built with **Next.js 15 (App Router)** and **Tailwind CSS v4**. Hybrid architecture: a store directory homepage plus dedicated, ad-optimized brand coupon landing pages. Content lives in JSON files — no database. Coupons link out through tracked affiliate redirects.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  page.tsx                    Directory homepage (search, categories, top coupons)
  coupons/[store]/page.tsx    Brand coupon landing page (your Google Ads pages) — SSG
  category/[slug]/page.tsx    Category listing — SSG
  go/[store]/[id]/route.ts    Tracked affiliate redirect (302, noindex)
  about | contact | privacy | terms   Trust/legal pages (required for Google Ads)
  sitemap.ts | robots.ts      Auto-generated SEO files
components/
  layout/   Header, Footer, SearchBox, MobileNav
  coupon/   CouponCard (+ reveal modal, copy, affiliate open)
  store/    StoreCard, FaqAccordion
  ui/       Rating, VerifiedBadge, Breadcrumbs, CategoryIcon, Prose
content/
  categories.json
  stores/*.json               One JSON file per brand
lib/
  content.ts  types.ts  affiliate.ts  schema.ts  site.ts  cn.ts
public/logos/                 Store logos
```

## Managing content

Content comes from **Google Sheets** (stores, coupons, categories, FAQs) when
configured, and automatically falls back to the local JSON files in `content/`
when it isn't — so the site always runs, even with no credentials.

- **Google Sheets (recommended):** see **[docs/GOOGLE_SHEET_SETUP.md](docs/GOOGLE_SHEET_SETUP.md)**
  for the four-tab template, the service-account steps, env vars, and the
  publish webhook. Edits auto-refresh every ~15 min (ISR) or instantly via
  `/api/revalidate?secret=…`.
- **Local JSON fallback:** add `content/stores/<slug>.json` (copy
  `mergescreens.json`) + a logo in `public/logos/`. Used automatically whenever
  the Google Sheet env vars are absent.

New stores added to the sheet appear on first request (no redeploy needed):
`dynamicParams` is on and pages are cached after the first render.

## Configuration

- Site name, domain, description, tagline: `lib/site.ts`.
- Analytics / Google Ads: set `NEXT_PUBLIC_GA_ID` in `.env.local` (see `.env.local.example`).
  The `CouponCard` fires a `reveal_coupon` gtag event you can mark as a conversion.
- Brand colors: `@theme` tokens in `app/globals.css`.

## Google Ads readiness checklist

- ✅ About, Contact, Privacy, Terms pages
- ✅ Affiliate disclosure in the footer + legal pages
- ✅ Cookie consent banner
- ✅ Honest coupon states (verified badge, success rate, expiry; expired codes hidden)
- ✅ Fast static pages, JSON-LD (Store/Offer/AggregateRating/FAQ), sitemap + robots
- 🔲 Before running ads: point `lib/site.ts` domain/URL to your real domain, add real
  affiliate links, and replace sample content.

## Deploy

Push to GitHub and import into **Vercel** (zero-config for Next.js). Set the
`NEXT_PUBLIC_GA_ID` environment variable in the Vercel dashboard.
