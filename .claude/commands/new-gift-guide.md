---
description: Scaffold a new gift guide entry in content/gift-guides.json
argument-hint: <title or occasion>
---

Create a new gift guide entry for `/gift-guides/[slug]`.

Arguments: `$ARGUMENTS` is the guide's title or occasion (e.g. "best gifts for gamers" or "valentines-day"). If only an occasion is given, write a compelling title yourself.

Steps:
1. Read `content/gift-guides.json` and the `GiftGuide` interface in `lib/types.ts` to confirm the current shape before editing.
2. Generate a kebab-case `slug` from the title.
3. Set `occasion` to a short freeform label (e.g. `"christmas"`, `"valentines"`, `"mothers-day"`) — lowercase, kebab-case if multi-word.
4. Write `excerpt` as a meta-description-ready summary (120–158 characters).
5. `storeSlugs` MUST reference real stores — check `content/stores/*.json` (or ask the user which stores/products to feature) and only include slugs that actually exist. These stores render as `StoreCard`s on the guide page.
6. `cover` is the feature image shown on the guide card and the detail-page hero — a path under `public/` or an https URL. Leave `""` if the user has no image yet; don't fabricate one.
7. Write `body` using ONLY the minimal markdown subset `components/blog/PostBody.tsx` supports: `##`/`###` headings, `- ` bullets, `**bold**`, blank-line paragraphs. No tables, images, or links.
8. Set `date` to today, `author` to `"Editorial Team"` unless told otherwise, and 2–4 relevant `tags`.
9. Default `published: false` so the guide is staged for review before going live — flag this to the user and ask if they want it published immediately instead.
10. Append the new object to `content/gift-guides.json`.

Notes:
- If Sheets is configured (`GOOGLE_SHEET_ID` etc.), mention the user should also add a row to the `giftguides` sheet tab for production — this JSON edit is authoritative only when Sheets isn't configured or in local dev.
- No route changes needed — `app/(site)/gift-guides/page.tsx`, `app/(site)/gift-guides/[slug]/page.tsx`, and `app/sitemap.ts` all pick this up automatically via `lib/content.ts`.
