# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # ESLint via next lint
```

There are no tests. No test runner is configured.

## Architecture overview

This is a **dual-purpose Next.js 16 (App Router) site** running two distinct product lines under one repo:

### 1. Coupon directory — `app/(site)/`

A Google-Ads-ready coupon website. All pages are SSG/ISR. Routes:

| Path | Description |
|---|---|
| `/` | Homepage — search, categories, top coupons |
| `/coupons/[store]` | Brand coupon landing page (main Google Ads target) |
| `/category/[slug]` | Category listing |
| `/go/[store]/[id]` | Tracked affiliate redirect (302, noindex) |
| `/go/offer/[slug]` | Simple offer redirect; destinations are in `lib/offers.ts` |
| `/blog`, `/blog/[slug]` | Blog with AdSense display ads |
| `/sale-calendar`, `/sale-calendar/[slug]` | Upcoming shopping events, cross-linked to participating stores |
| `/gift-guides`, `/gift-guides/[slug]` | Curated gift guides, cross-linked to featured stores |
| `/api/reveal` | Returns the coupon code server-side (code hidden from HTML) |
| `/api/revalidate` | Webhook that calls `revalidateTag("content")` to bust ISR cache |

### 2. Product landing pages — `app/lp/` and `app/pl/`

COD (cash-on-delivery) product landing pages for the Polish/Czech market, each mostly self-contained with its own images under `public/lp/<slug>/`. All LPs are `robots: noindex`.

Key LP files:
- [components/lp/OrderForm.tsx](components/lp/OrderForm.tsx) — COD order form; either posts directly to **islaffiliate** (pass `isla` prop) or does a JS redirect (pass `offerHref`)
- [components/lp/captureLead.ts](components/lp/captureLead.ts) — fire-and-forget lead backup to a Google Form via `sendBeacon`; `ACTION` constant at the top controls the target form
- [components/lp/CrossSell.tsx](components/lp/CrossSell.tsx) — one-click reorder grid on `/lp/thanks`; reads buyer details from `sessionStorage` that `OrderForm` stashed at submit time
- [lib/crossSell.ts](lib/crossSell.ts) — `CROSS_SELL` array defines which products appear on the thank-you page; each entry needs a full islaffiliate config (`offer`, `lp`, `formKey`)
- [lib/offers.ts](lib/offers.ts) — `OFFERS` map used by `/go/offer/[slug]` for simple redirect-style LPs

**LP order flow:** buyer fills `OrderForm` → form POSTs to islaffiliate → islaffiliate redirects to `/lp/thanks` → `CrossSell` offers reorder of other products in one click.

**To add a new COD LP:** copy an existing page under `app/lp/<slug>/page.tsx`, add images to `public/lp/<slug>/`, get islaffiliate `uid`/`offer`/`lp`/`formKey` values, add the product to `CROSS_SELL` in `lib/crossSell.ts`.

## Content system

Content is loaded by [lib/content.ts](lib/content.ts) via `unstable_cache` (ISR, 900 s TTL, tag `"content"`).

**Priority:**
1. **Google Sheets** (when `GOOGLE_SHEET_ID` + service-account env vars are set) — see `lib/sheets.ts`
2. **Local JSON fallback** (`content/stores/*.json`, `content/categories.json`, etc.) — always works in dev without any secrets

Content types: `stores`, `categories`, `menu`, `settings`, `posts` (blog), `saleCalendar`, `giftGuides` — each is a sheet tab (see the tab list documented at the top of `lib/sheets.ts`) with a matching local JSON fallback file in `content/`.

**To add a sale-calendar entry:** add a row to the `salecalendar` sheet tab (or an object to `content/sale-calendar.json` in dev) with `slug`, `name`, `startDate`, `endDate`, `description`, `cover` (optional feature-image path/URL), `storeSlugs` (comma-separated store slugs), `category`, `featured`, `published`. It appears at `/sale-calendar/<slug>` and is cross-linked from participating stores' pages automatically via `storeSlugs`.

**To add a gift guide:** add a row to the `giftguides` sheet tab (or an object to `content/gift-guides.json` in dev) with `slug`, `title`, `excerpt`, `cover`, `author`, `date`, `occasion`, `storeSlugs`, `tags`, `body` (same minimal-markdown subset as blog posts), `published`. It appears at `/gift-guides/<slug>`.

**Sheet templates:** `scripts/sheet-templates/salecalendar.csv` and `scripts/sheet-templates/giftguides.csv` are ready-to-import CSVs with the correct headers (and one example row) for creating the `salecalendar`/`giftguides` tabs in Google Sheets — see the file for import instructions.

Instant cache bust: `POST /api/revalidate?secret=<REVALIDATE_SECRET>` — wire this as a Google Apps Script publish webhook (see `scripts/apps-script.gs`).

New stores added to the sheet appear after first request with no redeploy needed (`dynamicParams = true`).

**Gotcha — stale build cache:** `unstable_cache` persists in `.next/` across local builds. If sheet changes don't appear after `npm run build`, delete `.next` first:
```bash
rm -rf .next && npm run build
```

## Key config files

| File | What to change |
|---|---|
| [lib/site.ts](lib/site.ts) | Site name, domain, GA4/Ads/AdSense IDs |
| [lib/crossSell.ts](lib/crossSell.ts) | Products shown on the COD thank-you page |
| [lib/offers.ts](lib/offers.ts) | Redirect destinations for `/go/offer/[slug]` LPs |
| [components/lp/captureLead.ts](components/lp/captureLead.ts) | Google Form lead-backup endpoint (`ACTION`) and field IDs |
| [app/globals.css](app/globals.css) | Tailwind v4 `@theme` brand color tokens |
| `.env.local` (copy from `.env.local.example`) | All secrets; site runs without any set |

## Affiliate redirect logic

`lib/affiliate.ts` — `affiliateBase` on a store supports four modes:
1. Empty → link straight to `coupon.dealUrl` or `store.url`
2. Contains `{url}` → template substitution
3. Ends with `=` → tracking prefix, destination appended
4. Anything else → use as a complete direct/ref link

Coupon codes are stripped from page HTML; they're only returned by `/api/reveal` on click (`PublicCoupon` type omits `code`).

## Environment variables

See `.env.local.example` for the full list. The most important:

```
GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
REVALIDATE_SECRET          # webhook secret for /api/revalidate
NEXT_PUBLIC_SITE_URL       # canonical domain (no trailing slash)
NEXT_PUBLIC_GA_ID          # GA4 (e.g. G-XXXXXXXXXX)
NEXT_PUBLIC_GOOGLE_ADS_ID  # Google Ads tag (e.g. AW-XXXXXXXXX)
NEXT_PUBLIC_ADSENSE_CLIENT # ca-pub-… (blog pages only)
```

AdSense Auto Ads must stay off — enabling it would serve ads on paid Google Ads LP pages (policy violation).

## Apps Script setup

`scripts/apps-script.gs` has two constants at the top — fill them in before pasting into the sheet's Apps Script editor:

```js
var CONFIG_URL = 'https://your-domain.com';
var CONFIG_SECRET = 'your-REVALIDATE_SECRET';
```

This wires **🌐 Website → Publish now** so edits go live instantly without using the configure-webhook prompts.

## Deploy

Push to GitHub → import into Vercel (zero-config). Set env vars in Vercel dashboard. The `NEXT_PUBLIC_SITE_URL` var must match your actual domain for canonicals and JSON-LD to be correct.

**Vercel build cache:** Vercel also persists the Next.js build cache between deployments. If a newly-added store is missing after a deploy, trigger a redeploy with **"Use existing Build Cache" unchecked** from the Vercel dashboard.
