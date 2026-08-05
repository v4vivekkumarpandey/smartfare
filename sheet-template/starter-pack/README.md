# Starter content pack

Ready-to-import content to give your site real depth (Google Ads disapproves
thin/near-empty coupon sites). Covers all 6 categories:

| File | Rows | Import into tab |
|------|------|-----------------|
| `stores.csv` | 12 stores | `stores` |
| `coupons.csv` | 36 offers | `coupons` |
| `faqs.csv` | 24 FAQs | `faqs` |
| `blog.csv` | 5 posts | `blog` |

Stores: Notion, Grammarly, NordVPN, ExpressVPN, Bluehost, Hostinger, Coursera,
Udemy, ASOS, Nike, Myprotein, Sephora.

## How to import (append to your existing sheet)

1. Open each tab (e.g. `stores`), click the first **empty** row below your data.
2. **File → Import → Upload** the matching CSV → **Import location: _Append to
   current sheet_** → **Comma** separator → Import.
   *(If a tab is empty, "Replace current sheet" is fine — but keep row 1 headers.)*
3. Repeat for `coupons`, `faqs`, `blog`.
4. **🌐 Website → Publish now** (or hit your `/api/revalidate` URL).

> The CSVs have no header row conflicts — if you "Append", delete the duplicate
> header row the import adds, or paste rows 2+ only.

## ⚠️ Before you run ads — you MUST edit this data

This is **starter/placeholder** content. Do not run ads on it as-is:

- **Affiliate links:** each store's `affiliateBase` is blank (links straight to
  the store). Add **your real affiliate link** for stores you're partnered with,
  and **delete any store you don't have a deal for**.
- **Codes:** every `code`-type row uses `REPLACEME` and is marked
  `verified = FALSE`. Replace with **real, working codes** or delete those rows.
  Only set `verified = TRUE` once you've confirmed a code actually applies —
  false "verified" claims violate Google Ads' misrepresentation policy.
- **Deals** (`type = deal`) link to the store's current offers and are safe to
  keep, but point them at your affiliate link once you have one.
- **Logos:** `logo` is blank (a placeholder shows). Add real logo paths/URLs.

Everything else (descriptions, About text, FAQs, blog posts) is original content
you're free to keep or edit.
