# Starter Google Sheet template (CSV)

Seven CSV files — one per tab — pre-filled with the same sample data the site
ships with. Import each into a tab of **one** Google Sheet.

| CSV file | Import into a tab named |
|----------|-------------------------|
| `categories.csv` | `categories` |
| `stores.csv` | `stores` |
| `coupons.csv` | `coupons` |
| `faqs.csv` | `faqs` |
| `menu.csv` | `menu` |
| `settings.csv` | `settings` |
| `blog.csv` | `blog` |

> Tab names must be **exactly** these (lowercase). The header row (row 1) must
> stay as-is — the site matches columns by these header names.

## How to import

1. Create a new Google Sheet (sheet.new).
2. Rename the first tab to `categories`. Then **File → Import → Upload →**
   choose `categories.csv` → **Import location: Replace current sheet** →
   **Separator type: Comma** → Import.
3. Add a new tab, name it `stores`, and repeat **File → Import → Replace current
   sheet** with `stores.csv`. Do the same for `coupons`, `faqs`, `menu`,
   `settings`.
4. (Optional) In the `coupons` tab, convert the `verified` and `featured`
   columns to checkboxes: select the column → **Insert → Tick box**. `TRUE` /
   `FALSE` text also works.

## Notes on the data

- **stores.about** cells contain a line break (two paragraphs). Google Sheets
  preserves it on import; each line becomes its own paragraph on the site.
- **affiliateBase** values are placeholders — swap in your real affiliate
  tracking prefix. The final link is `affiliateBase + encodeURIComponent(dest)`.
- **logo** paths point at `/logos/*.svg` shipped in the repo. Replace with your
  own logo paths (under `public/`) or full `https://` image URLs.
- **settings.logoUrl** is blank by default (shows the icon + site name). Set it
  to a logo image path/URL to use an image instead.

Once imported, share the sheet with your service-account email (Viewer) and add
the env vars — see **[../docs/GOOGLE_SHEET_SETUP.md](../docs/GOOGLE_SHEET_SETUP.md)**.
