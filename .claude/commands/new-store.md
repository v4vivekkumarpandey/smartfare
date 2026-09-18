---
description: Scaffold a new store/brand coupon page in content/stores/<slug>.json, with 10 coupons, 10 FAQs, and all 4 content sections auto-generated
argument-hint: <store name> [website URL] [--category=<category-slug>]
---

Create a new store at `/coupons/<slug>`. Every store page needs: identity fields, `about`/`policies` prose, 10 coupons, 10 FAQs, and 4 content sections (`howToUse`, `savingTips`, `customerSupport`, `refundPolicy`) — see the `Store` interface in `lib/types.ts` for the full shape.

Arguments: `$ARGUMENTS` is the store name (and optionally its URL / a `--category=` hint). If the URL or category is missing, infer them (the store's real official domain; category must match an existing slug in `content/categories.json`) or ask if genuinely ambiguous.

Steps:
1. Read `lib/types.ts`'s `Store` interface and one existing file under `content/stores/` (e.g. `content/stores/bluehost.json`) to confirm the exact current shape before writing.
2. Generate a kebab-case `slug` from the store name (lowercase, no special characters). Confirm no `content/stores/<slug>.json` already exists.
3. Write the base identity fields: `name`, `logo` (a `/logos/<slug>.svg`/`.png` path if you have or can generate one via `node scripts/generate-image.mjs logos/<slug>.jpg "..."` — otherwise leave `""` and it falls back to an auto-generated logo), `url`, `affiliateBase` (leave unset unless the user gives you a real affiliate link — see `lib/affiliate.ts`'s four supported modes), `category`, `tagline` (~60-80 chars), `rating` (plausible, e.g. 4.3–4.8), `reviewCount` (plausible), `description` (~120–158 chars — this feeds the meta description, matching the SEO guideline in `CLAUDE.md`).
4. Write `about` (2–3 paragraphs of real, factual detail about the store — pricing tiers, what it offers, standout features) and `policies` (1–2 paragraphs — money-back guarantee window, refund terms, other real shopper policies) using the same factual, non-fabricated style as existing stores. These two fields are what steps 6–7 below extract facts from, so put real, verifiable details here (from the store's actual site/public info), not filler.
5. Set `coupons: []`, `faqs: []`, `relatedStores` (2–3 real slugs from `content/stores/*.json` in the same category), and `updated` to today's date (`YYYY-MM-DD`).
6. Write the new file to `content/stores/<slug>.json`, matching the existing 2-space-indent JSON formatting.
7. Run, in order, to auto-populate coupons, FAQs, and the 4 content sections from the `about`/`policies` text you just wrote (all three scripts are idempotent — they only fill in what's missing on this new store and leave every other store untouched):
   ```bash
   node scripts/generate-store-coupons.mjs --out /tmp/new-store-coupons.json
   node scripts/generate-store-faqs.mjs --out /tmp/new-store-faqs.json
   node scripts/generate-store-sections.mjs
   ```
   This brings the new store to 10 coupons and 10 FAQs (generic `type: "deal"` entries / generic Q&A — no fabricated promo codes, per the site's content-accuracy convention) and fills `howToUse`/`savingTips`/`customerSupport`/`refundPolicy`.
8. If `GOOGLE_SHEET_ID` + service-account env vars are configured (Sheets is the live content source), push everything live:
   - Build one row for the `stores` tab matching its exact column order (see the header comment atop `lib/sheets.ts`: `slug, name, logo, url, affiliateBase, category, tagline, rating, reviewCount, description, about, relatedStores, updated, policies, phone, facebook, instagram, youtube, twitter, howToUse, savingTips, customerSupport, refundPolicy` — `about`/`policies`/`howToUse`/`savingTips`/`customerSupport`/`refundPolicy` as `\n`-joined strings, `relatedStores` comma-joined), write it to a temp JSON file, and run `node scripts/sheet-append.mjs stores <file>` (brand-new row, so append not update).
   - Push the coupon rows from `/tmp/new-store-coupons.json` and FAQ rows from `/tmp/new-store-faqs.json` (already in the right column order from step 7) via `node scripts/sheet-append.mjs coupons <file>` and `node scripts/sheet-append.mjs faqs <file>`.
   - If any push fails with a permission error, tell the user the service account needs Editor access on the Sheet, and fall back to just leaving `content/stores/<slug>.json` updated locally.

Notes:
- No other file needs to change — `app/(site)/coupons/[store]/page.tsx`, `app/(site)/category/[slug]/page.tsx`, and `app/sitemap.ts` all read through `lib/content.ts` accessors, so the new store appears automatically at `/coupons/<slug>` once content loads.
- Run `/seo-audit /coupons/<slug>` after creating the store to double-check title/description length, canonical, JSON-LD, and internal linking.
- After creating, mention that a running dev server will need `unstable_cache` to expire (up to 900s) or the user can restart `npm run dev` to see it immediately.
