# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npx tsc --noEmit   # type-check (closest thing to a test in this repo)
```

There are no tests. No test runner is configured.

**`npm run lint` (`next lint`) is currently broken** — there's no `eslint.config.*` in the repo, and Next.js 16 removed the legacy `next lint` shim's auto-setup, so it errors out immediately. Use `npx tsc --noEmit` to catch type errors instead until ESLint is reconfigured.

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
| `/blog`, `/blog/[slug]` | Blog with AdSense display ads — also covers sale-calendar entries and gift guides (see below) |
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

Full Sheets setup walkthrough (tab template, service-account steps, publish webhook): [docs/GOOGLE_SHEET_SETUP.md](docs/GOOGLE_SHEET_SETUP.md).

Content types: `stores`, `categories`, `menu`, `settings`, `posts` (blog — see below) — each is a sheet tab (see the tab list documented at the top of `lib/sheets.ts`) with a matching local JSON fallback file in `content/`.

**Blog posts, sale-calendar entries, and gift guides are one content type** (`BlogPost` in `lib/types.ts`), all living at `/blog/[slug]` and stored together in `content/blog.json` (or the `blog` sheet tab). An optional `postType` field (`"post"` | `"sale-calendar"` | `"gift-guide"`, defaults to `"post"`) controls rendering:
- `"sale-calendar"` posts additionally use `startDate`/`endDate` (ISO dates, rendered as a date range and used for `Event` JSON-LD) and `storeSlugs` (comma-separated store slugs, cross-linked as `StoreCard`s on the page).
- `"gift-guide"` posts additionally use `occasion` (freeform label) and `storeSlugs` (same cross-linking as above).
- Plain `"post"` entries ignore all of the above.

**To add any of the three:** use `/new-post` (see `.claude/commands/new-post.md`) or add a row/object directly — see `scripts/sheet-templates/blog.csv` (or `blog.xlsx`, same data, spreadsheet-ready) for the full column set including the extra fields. Both are pre-filled with the current `content/blog.json` posts, ready to import as the sheet's `blog` tab.

**Cover images** (the `cover` field) can be auto-generated via the Vercel AI Gateway instead of sourced manually: `node scripts/generate-blog-cover.mjs <slug>` (or `--all` to backfill every post with an empty `cover`) generates a 16:9 illustration from the post's title/excerpt, saves it to `public/blog/<slug>.png`, and writes the path back into `content/blog.json`. Requires `AI_GATEWAY_API_KEY` (see `.env.local.example`). `/new-post` calls this automatically when no cover is supplied.

**Any other image** (store logos, one-off assets, anything not tied to a blog post) can be generated the same way with `node scripts/generate-image.mjs <path-under-public> "<prompt>"` — e.g. `node scripts/generate-image.mjs logos/acme.jpg "minimalist blue rocket logo, flat vector, no text"`. Both scripts use the Gateway's free `prodia/flux-fast-schnell` model (no AI Gateway credits needed), which always outputs 1024x1024 and is rate-limited under heavy use — space out large batches. Anything saved under `public/` deploys with the site automatically; no separate image host is needed.

**Writing directly to the live Sheet:** `node scripts/sheet-append.mjs <tabName> <rowsJsonFile>` appends rows to any tab of the live Google Sheet, and `node scripts/sheet-update.mjs <tabName> <rowsJsonFile>` updates existing rows in place by matching the first column (e.g. slug) — falling back to append for any row whose key isn't found. Both use the same service-account credentials `lib/sheets.ts` uses to read; `rowsJsonFile` is a JSON file containing an array of rows (each row an array of cell values in that tab's exact column order). Requires the service account to have **Editor** access on the Sheet (read-only, which is all the app itself needs, isn't enough for this). This is how new stores/posts/faqs — or edits to existing ones — can be pushed live without manually editing the Sheet in a browser.

All `scripts/*.mjs` files auto-load `.env.local` via `scripts/lib/load-env.mjs` (a no-dependency shim, since Next.js only does this for `next dev`/`next build`, not standalone scripts) — just run `node scripts/whatever.mjs`, no `--env-file` flag or manual `export` needed.

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

## SEO guideline

Every indexable page in this repo follows the same conventions, enforced by the `seo-auditor` subagent (`.claude/agents/seo-auditor.md`, run via `/seo-audit`). When adding or editing a page or content entry, match these rules:

1. **Title**: ~50–60 characters. Set via `generateMetadata`'s `title` (or the root layout's `template` for the homepage). Don't leave a bare product/entry name as the whole title — pad with a few descriptive/keyword-relevant words (e.g. `"Black Friday 2026 Software Deals — Codes, Sales & Savings"`, not just `"Black Friday 2026"`).
2. **Meta description**: ~120–158 characters, used for both `<meta description>` and Open Graph. If it's built from variable-length content data (e.g. a store's own `description` field), truncate with `truncate()` from `lib/cn.ts` rather than letting it run long — see `app/(site)/coupons/[store]/page.tsx`'s `generateMetadata` for the pattern.
3. **Canonical**: every page must set `alternates: { canonical: "/some/path" }` (relative path — resolved against `metadataBase`/`site.url` from `lib/site.ts`). This includes the homepage (`app/layout.tsx`'s `generateMetadata`), not just nested routes.
4. **JSON-LD** (`components/JsonLd.tsx`): match the existing `@type` convention per content kind — `Store`/`Offer`/`FAQPage` graph for coupon pages (`lib/schema.ts`), `BlogPosting` for regular blog posts, `Event` (with `startDate`/`endDate`) for `postType: "sale-calendar"` posts. Don't invent a new schema type without checking what the rest of the site already uses for that content kind.
5. **Internal linking**: cross-link real content, not orphan pages — store pages need `relatedStores` populated, blog/guide posts need `storeSlugs` resolving to real store slugs (`content/stores/*.json`) and `category`/`tags` matching real category slugs (`content/categories.json`).
6. **`noindex` correctness**: everything under `app/lp/` and `app/pl/` MUST stay `robots: { index: false }` (paid-ads-only pages). Everything else that's real content (coupon pages, blog/sale-calendar/gift-guide posts, category pages) must NOT be noindex.
7. **Sitemap** (`app/sitemap.ts`): every indexable route must appear here; noindex/LP/redirect routes must NOT.

To audit any page against this list, run `/seo-audit <path or slug>`.

## Affiliate redirect logic

`lib/affiliate.ts` — `affiliateBase` on a store supports four modes:
1. Empty → link straight to `coupon.dealUrl` or `store.url`
2. Contains `{url}` → template substitution
3. Ends with `=` → tracking prefix, destination appended
4. Anything else → use as a complete direct/ref link

Coupon codes are stripped from page HTML; they're only returned by `/api/reveal` on click (`PublicCoupon` type omits `code`).

[components/coupon/useRevealCode.ts](components/coupon/useRevealCode.ts) drives the "Get Code" flow (open affiliate link → fetch real code from `/api/reveal` → copy to clipboard) and fires a `reveal_coupon` GA4 event via `window.gtag` — mark this as a conversion in GA4/Google Ads if wiring up ad conversion tracking.

## Environment variables

See `.env.local.example` for the full list. The most important:

```
GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
REVALIDATE_SECRET          # webhook secret for /api/revalidate
NEXT_PUBLIC_SITE_URL       # canonical domain (no trailing slash)
NEXT_PUBLIC_GA_ID          # GA4 (e.g. G-XXXXXXXXXX)
NEXT_PUBLIC_GOOGLE_ADS_ID  # Google Ads tag (e.g. AW-XXXXXXXXX)
NEXT_PUBLIC_ADSENSE_CLIENT # ca-pub-… (blog pages only)
GOOGLE_SITE_VERIFICATION   # Search Console HTML-tag verification content value
AI_GATEWAY_API_KEY         # Vercel AI Gateway key — used by scripts/generate-blog-cover.mjs
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
