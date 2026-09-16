---
description: Scaffold a new blog post entry in content/blog.json
argument-hint: <title>
---

Create a new blog post for this repo's coupon-directory blog.

Arguments: `$ARGUMENTS` is the post title (or a short topic brief if no title is given — in that case, write a compelling, SEO-friendly title yourself).

Steps:
1. Read `content/blog.json` and `lib/types.ts` (`BlogPost`) to confirm the exact current shape before editing.
2. Generate a kebab-case `slug` from the title (lowercase, no special characters).
3. Write `excerpt` as a meta-description-ready summary, roughly 120–158 characters — this is used directly in `generateMetadata` for `<meta description>` and Open Graph.
4. Keep the `title` itself roughly 50–60 characters so it renders well as a `<title>` tag without truncation in search results.
5. Set `date` to today's date in `YYYY-MM-DD` format.
6. Write `body` using ONLY the minimal markdown subset that `components/blog/PostBody.tsx` supports: `##`/`###` headings, `- ` bullet lines, `**bold**`, and blank-line-separated paragraphs. Do not use tables, images, links, or any other markdown syntax — they will not render.
7. Choose `category` from an existing category slug (check `content/categories.json`) and 2–4 relevant `tags`.
8. `cover` is the feature image shown on the post card and the detail-page hero — a path under `public/` or an https URL (see `next.config.ts`, remote images from any https host are allowed). Leave `""` if the user has no image yet; don't fabricate one.
9. Set `author` to `"Editorial Team"` unless told otherwise, and `published: true` unless the user asks to stage it as a draft.
10. Append the new object to the `content/blog.json` array (don't reformat unrelated entries).

Notes:
- If `GOOGLE_SHEET_ID` + service-account env vars are configured, Sheets content takes priority over this JSON file in production — mention that the user should also add a row to the `blog` sheet tab if they're using Sheets as their source of truth. Editing `content/blog.json` is safe for local dev regardless.
- No other file needs to change — `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`, and `app/sitemap.ts` all read through `lib/content.ts` accessors, so the new post appears automatically.
- After editing, mention that a running dev server will need `unstable_cache` to expire (up to 900s) or the user can restart `npm run dev` to see it immediately.
