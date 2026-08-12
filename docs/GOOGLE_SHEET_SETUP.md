# Managing content with Google Sheets

Stores, coupons, categories, FAQs, the navigation menu, site settings and the blog are all managed from
**one Google Sheet with seven tabs**. The site reads the sheet privately via a Google service account,
caches it, and refreshes automatically every ~15 minutes (or instantly via the
publish webhook).

> If the sheet env vars are not set, the site falls back to the local JSON files
> in `content/` — handy for local development.

---

## 1. Create the spreadsheet + tabs

Create a Google Sheet with **seven tabs named exactly** (lowercase):

### Tab `categories`
| slug | name | icon | description |
|------|------|------|-------------|
| software | Software & SaaS | MonitorSmartphone | Discounts on the tools you use every day. |
| vpn | VPN & Security | ShieldCheck | Save on VPNs and privacy tools. |

- **slug**: url-safe id (lowercase, no spaces).
- **icon**: one of `MonitorSmartphone`, `ShieldCheck`, `Server`, `GraduationCap`,
  `Shirt`, `HeartPulse` (anything else shows a default tag icon).

### Tab `stores`
| slug | name | logo | url | affiliateBase | category | tagline | rating | reviewCount | description | about | relatedStores | updated |
|------|------|------|-----|---------------|----------|---------|--------|-------------|-------------|-------|---------------|---------|
| mergescreens | MergeScreens | /logos/mergescreens.svg | https://mergescreens.com | https://track.net/aff?u=1001&url= | software | Screen recording made easy | 4.8 | 214 | Grab a verified MergeScreens coupon below. | Paragraph one.⏎Paragraph two. | screenpal | 2026-08-01 |

- **logo**: a path under `public/` (e.g. `/logos/mergescreens.svg`) or a full
  `https://` image URL.
- **affiliateBase**: your affiliate link. Three supported styles:
  - **Direct / ref link** (most common) — paste the full URL, used as-is:
    `https://store.com/?ref=abc123`
  - **Tracking prefix** — end it with `=` and the destination is appended:
    `https://track.net/aff?u=1001&url=`
  - **Template** — put `{url}` where the destination goes:
    `https://track.net/?u=1&url={url}&x=2`
  - Leave **blank** to link straight to the store's `url`.
- **category**: must match a `slug` from the categories tab.
- **about**: long text; press **Alt+Enter** inside the cell to separate
  paragraphs (each line becomes its own paragraph).
- **relatedStores**: comma-separated store slugs (optional; auto-fills from the
  same category if blank).
- **updated**: `YYYY-MM-DD`.

Optional extra columns (power the coupon-page sidebar — safe to leave blank):
`policies` (shipping/returns paragraphs, Alt+Enter separated), `phone`,
`facebook`, `instagram`, `youtube`, `twitter` (full URLs).

### Tab `coupons`
| storeSlug | id | title | type | code | discount | verified | expires | uses | successRate | dealUrl | featured |
|-----------|----|-------|------|------|----------|----------|---------|------|-------------|---------|----------|
| mergescreens | ms-20off | 20% Off Annual Plans | code | SMART20 | 20% OFF | TRUE | 2026-12-31 | 1843 | 92 | | TRUE |
| mergescreens | ms-trial | Start a 14-Day Free Trial | deal | | FREE TRIAL | TRUE | | 5120 | 100 | | |

- **storeSlug**: must match a store `slug`.
- **type**: `code` or `deal`. If left blank, it becomes `code` when a code is
  present, otherwise `deal`.
- **verified / featured**: `TRUE` or `FALSE` (checkbox columns work great).
- **expires**: `YYYY-MM-DD` (blank = never expires). Expired rows are hidden
  automatically.
- **dealUrl**: optional per-coupon destination (overrides the store url).

### Tab `faqs`
| storeSlug | question | answer |
|-----------|----------|--------|
| mergescreens | How do I use a code? | Click Get Code, copy it, paste at checkout. |

### Tab `menu` (extra navigation links)
The **header** navigation is a fixed structure — **Coupons** (a dropdown of your
popular stores + "All stores"), **Categories** (the category index), and
**Blog** — so it stays clean and consistent. The `menu` tab controls the
**footer** links (and any extra `header` links you want to append).

| label | href | location | order |
|-------|------|----------|-------|
| All Stores | /stores | footer | 1 |
| Categories | /category | footer | 2 |
| Blog | /blog | footer | 3 |
| About Us | /about | footer | 4 |
| Partner Site | https://example.com | header | 5 |

- **href**: an internal path (starts with `/`, e.g. `/category/vpn`,
  `/coupons/mergescreens`, `/blog`) **or** a full external URL
  (`https://…`, opens in a new tab automatically).
- **location**: `header`, `footer`, or `both`.
- **order**: sort order (lowest first). Optional — falls back to row order.

### Tab `settings` (branding + homepage copy)
A simple **key | value** list. Any key you omit falls back to a sensible default.

| key | value |
|-----|-------|
| siteName | TheSmartFares |
| logoUrl | /logos/mylogo.svg |
| tagline | Verified codes. Real savings. Every day. |
| description | Verified coupon codes and deals from top brands. |
| heroHeadline | Verified Coupons & Promo Codes |
| heroHeadlineHighlight | that actually work |
| heroSubtext | We hand-test {coupons}+ codes across {stores}+ top brands. |
| searchPlaceholder | Search for a store or brand… |
| trust1Title | Hand-verified |
| trust1Body | Every code is tested by our team and dated. |
| trust2Title | One-tap savings |
| trust2Body | Reveal, copy and apply at checkout in seconds. |
| trust3Title | Updated daily |
| trust3Body | Expired codes removed, fresh offers added daily. |

- **logoUrl**: a path under `public/` or a full image URL. When set, it
  replaces the default icon + site-name text in the header/footer. Leave blank
  to show the icon + name.
- **heroHeadlineHighlight**: the coloured second line of the hero title
  (leave blank for a single-line headline).
- **heroSubtext**: `{coupons}` and `{stores}` are replaced with live totals.
- **trust1–3**: the three cards in the homepage trust band.

### Tab `blog`
Powers the **Blog** section (`/blog` listing + each `/blog/<slug>` post).

| slug | title | excerpt | cover | author | date | category | tags | body | published |
|------|-------|---------|-------|--------|------|----------|------|------|-----------|
| how-to-use-coupon-codes | How to Use Coupon Codes | A quick guide to saving on every order. | | Editorial Team | 2026-08-03 | software | guide, savings | (see below) | TRUE |

- **slug**: url-safe id → `/blog/<slug>`.
- **cover**: image path/URL (optional; a branded placeholder shows if blank).
- **date**: `YYYY-MM-DD` (posts sort newest-first).
- **tags**: comma-separated.
- **published**: `TRUE` / `FALSE` — drafts (`FALSE`) are hidden.
- **body**: supports a small markdown subset — press **Alt+Enter** for line
  breaks inside the cell:
  - `## Heading` and `### Subheading`
  - `- ` for bullet list items
  - a blank line starts a new paragraph
  - `**bold**` for bold text

---

## 2. Create a service account (read-only)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) → create
   (or pick) a project.
2. **APIs & Services → Library →** enable **Google Sheets API**.
3. **APIs & Services → Credentials → Create credentials → Service account.**
   Give it a name (e.g. `coupon-reader`) and create it (no roles needed).
4. Open the service account → **Keys → Add key → Create new key → JSON.**
   A JSON file downloads.
5. **Share the spreadsheet** with the service account's email
   (`...@...iam.gserviceaccount.com`) as **Viewer**. The sheet stays private
   otherwise.

---

## 3. Add environment variables

Copy `.env.local.example` to `.env.local` and fill in from the downloaded JSON:

```
GOOGLE_SHEET_ID=<id from the sheet URL>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<client_email from the JSON>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="<private_key from the JSON, keep the \n>"
REVALIDATE_SECRET=<any long random string>
```

On Vercel, add these same variables under **Project → Settings → Environment
Variables** (paste the private key exactly, including the `\n` sequences).

---

## 4. Publishing edits

- **Automatic:** every ~15 minutes the site re-reads the sheet (ISR).
- **Instant:** hit the webhook after editing —
  `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`

### Recommended: the "🌐 Website" menu (full Apps Script)

Use the ready-made script at **[`scripts/apps-script.gs`](../scripts/apps-script.gs)** —
it gives you a menu with **Publish now**, **auto-publish**, and a one-click
**Set up / repair tabs** (creates all 7 tabs with headers, sample rows and
checkboxes).

1. In your sheet: **Extensions → Apps Script**.
2. Delete any placeholder code, paste the entire contents of
   `scripts/apps-script.gs`, and **Save**.
3. Reload the sheet — a **🌐 Website** menu appears.
4. **🌐 Website → Configure webhook…** → enter your site URL
   (`https://yourdomain.com`) and your `REVALIDATE_SECRET`.
5. (Optional) **🌐 Website → Set up / repair tabs** to scaffold empty tabs.
6. Edit your data, then **🌐 Website → Publish now** (or enable **auto-publish**
   to push changes ~2 min after each edit automatically). The first run asks you
   to authorize the script — that's expected.

Under the hood this calls `GET /api/revalidate?secret=…`, which clears the
cached sheet data so your edits appear within seconds.

---

## 5. Landing-page leads (order forms → your own sheet)

LP order forms post the real order to islaffiliate. In parallel, every submit
also sends a copy of the lead to a **Google Form** you own, whose responses land
in a linked Google Sheet — a backup record to check against what the network
reports. No backend, no service account, no Apps Script.

It's already wired to the **"Offer From Leads"** form (questions: Name,
Telephone No, Address, Product) in
[`components/lp/captureLead.ts`](../components/lp/captureLead.ts). Each landing
page passes its own product label — `<OrderForm product="…" />`, or the
hard-coded name in `FastMowerOrderForm`.

To point it at a different form:

1. Create the form, then in **Responses** click **Link to Sheets**.
2. In the form editor: ⋮ → **Get pre-filled link** → fill dummy answers → **Get
   link**. The copied URL contains an `entry.123456789` id per question — those
   go in `FIELDS`.
3. `ACTION` is that same URL with `/viewform…` replaced by `/formResponse`.
4. Leave `ACTION` empty to turn lead capture off.

Keep the form accepting responses and **do not** require sign-in, or the posts
are rejected. Nothing here can break an order: the copy is fire-and-forget and
any failure is ignored.
