---
description: Scaffold a new COD product landing page under app/lp/<slug>
argument-hint: <new-slug> [source-slug-to-clone]
---

Scaffold a new cash-on-delivery (COD) product landing page, following the recipe already documented in `CLAUDE.md` under "To add a new COD LP."

Arguments: `$ARGUMENTS` is `<new-slug>` and optionally a `<source-slug>` to clone from. If no source is given, look at existing pages under `app/lp/` and `app/pl/` and pick the closest match by market (Polish `_pl`/`-pl` suffix vs. Czech) and product type; ask the user to confirm before proceeding if it's ambiguous.

Steps:
1. Read the chosen source page at `app/lp/<source-slug>/page.tsx` (or `app/pl/<source-slug>/page.tsx`) in full, along with `components/lp/OrderForm.tsx`, `components/lp/captureLead.ts`, and `components/lp/CrossSell.tsx` to understand the current props/config shape — these may have evolved since this command was written.
2. Copy the source page to `app/lp/<new-slug>/page.tsx` (matching the source's market directory — `app/lp/` or `app/pl/`), updating all copy, product name, and pricing to the new product. Preserve the `noindex` robots metadata — every LP must stay `noindex`.
3. Create `public/lp/<new-slug>/` and note which images the copied page references — ask the user to supply the actual product images for that path (don't fabricate image files).
4. Ask the user for the new product's islaffiliate `uid` / `offer` / `lp` / `formKey` values (or confirm the shared `uid` used elsewhere in `lib/crossSell.ts` also applies here). Wire these into the page's `OrderForm` usage — either the `isla` prop (direct POST) or `offerHref` (JS redirect), matching whichever mode the source page uses.
5. If `components/lp/captureLead.ts`'s `ACTION` / field IDs need a different target form for this product, ask the user — otherwise leave it as-is (it's typically shared across LPs).
6. Add a new entry to `CROSS_SELL` in `lib/crossSell.ts` with the same `isla` config, `name`, `price`, `oldPrice` (optional), and `image` path — this is what makes the product appear as a one-click reorder option on `/lp/thanks`.

Notes:
- Do not invent islaffiliate credentials (`offer`/`lp`/`formKey`) — always get real values from the user. A placeholder/fake value here would silently break the order flow (see the `// TODO` block already in `lib/crossSell.ts` for products still missing real configs).
- Confirm the new page still has no server-side dependencies — LP pages are `"use client"` and self-contained, matching the existing architecture.
