---
description: Scaffold a new blog post, sale-calendar entry, or gift guide in content/blog.json
argument-hint: <title> [--type=post|sale-calendar|gift-guide]
---

Create a new entry for this repo's unified blog at `/blog/[slug]`. All three content kinds — regular posts, sale-calendar entries, and gift guides — live together in `content/blog.json` (or the `blog` sheet tab), distinguished by the optional `postType` field.

Arguments: `$ARGUMENTS` is the title (or a short topic brief if no title is given — write a compelling, SEO-friendly title yourself). If the user doesn't specify a type, infer it from the request (e.g. "add a Black Friday entry" → `sale-calendar`, "gift ideas for X" → `gift-guide`, otherwise → `post`) or ask if genuinely ambiguous.

Steps:
1. Read `content/blog.json` and the `BlogPost` interface in `lib/types.ts` to confirm the exact current shape before editing.
2. Generate a kebab-case `slug` from the title (lowercase, no special characters).
3. Write `excerpt` as a meta-description-ready summary, roughly 120–158 characters — used directly in `generateMetadata` for `<meta description>` and Open Graph.
4. Keep `title` roughly 50–60 characters so it renders well as a `<title>` tag without truncation.
5. Write `body` using ONLY the minimal markdown subset `components/blog/PostBody.tsx` supports: `##`/`###` headings, `- ` bullet lines, `**bold**`, blank-line-separated paragraphs. No tables, images, or links — they will not render.
6. Choose `category` from an existing category slug (check `content/categories.json`) and 2–4 relevant `tags`.
7. `cover` is the feature image shown on the post card and detail-page hero — a path under `public/` or an https URL (see `next.config.ts`; remote images from any https host are allowed). If the user supplies one, use it as-is. Otherwise, after the post is appended in step 10, auto-generate one: run `node scripts/generate-blog-cover.mjs <slug>` (requires `AI_GATEWAY_API_KEY` in `.env.local` — see `.env.local.example`; if it's missing, tell the user and leave `cover: ""` instead of fabricating a path). The script saves `public/blog/<slug>.png`, sets `cover` on the post in `content/blog.json` itself, and prints the result.
8. Set `author` to `"Editorial Team"` unless told otherwise, and `published: true` unless the user asks to stage it as a draft.
9. Set `postType` based on the kind requested:
   - `"post"` (or omit it) for a regular article — no extra fields needed.
   - `"sale-calendar"` — also set `startDate`/`endDate` (ISO `YYYY-MM-DD`; ask the user, don't guess sale dates) and `storeSlugs` (real slugs from `content/stores/*.json`, cross-linked as `StoreCard`s on the page). Set `date` to `startDate`.
   - `"gift-guide"` — also set `occasion` (freeform, e.g. `"christmas"`, `"valentines"`) and `storeSlugs` (same validation as above).
10. Append the new object to `content/blog.json` (don't reformat unrelated entries).

Notes:
- Full SEO conventions (title/description length, canonical, JSON-LD, internal linking, noindex) are documented in `CLAUDE.md`'s "SEO guideline" section — steps 3–4 and 6 above already cover what's relevant to a new post; canonical and JSON-LD are handled automatically by `app/(site)/blog/[slug]/page.tsx` based on `postType`, no extra action needed. Run `/seo-audit /blog/<slug>` after publishing to double-check.
- If `GOOGLE_SHEET_ID` + service-account env vars are configured, Sheets content takes priority in production — mention the user should also add a row to the `blog` sheet tab (see `scripts/sheet-templates/blog.csv` for the full column set including `postType`/`startDate`/`endDate`/`occasion`/`storeSlugs`) if Sheets is their source of truth. Editing `content/blog.json` is safe for local dev regardless.
- No other file needs to change — `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`, and `app/sitemap.ts` all read through `lib/content.ts` accessors, so the new entry appears automatically at `/blog/<slug>`.
- After editing, mention that a running dev server will need `unstable_cache` to expire (up to 900s) or the user can restart `npm run dev` to see it immediately.
