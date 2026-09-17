---
description: Scaffold a web hosting review, comparison, or roundup article in content/blog.json
argument-hint: <hosting provider name, or "X vs Y", or a roundup topic> [--type=review|comparison|roundup]
---

Create a new web-hosting-focused article. This is a standalone skill for hosting content specifically — it writes to the same `content/blog.json` (or the `blog` sheet tab) as regular blog posts, using the `BlogPost` shape from `lib/types.ts`, but follows its own structure rules tailored to hosting reviews/comparisons/roundups rather than reusing `/new-post`'s generic steps.

Arguments: `$ARGUMENTS` is either a single hosting provider name (→ `review`), two providers like "Hostinger vs Bluehost" (→ `comparison`), or a roundup topic like "best hosting for WordPress" (→ `roundup`). Infer the type from phrasing if `--type` isn't given, or ask if genuinely ambiguous.

## Step 0 — verify a store entry exists for every provider covered (required, do not skip)

For **every** hosting provider the article will cover (one for a review, two for a comparison, several for a roundup):

1. Check `content/stores/*.json` for a store whose `slug` matches the provider and whose `category` is `"hosting"`.
2. If it exists, read it — the store entry is the **only authoritative source** for that provider's pricing, features and rating. The article's pricing/feature claims and its `[Provider coupon page](/coupons/<slug>)` links must be consistent with what that store entry says; never contradict it (e.g. don't claim a different price tier than what's in the store's `description`/`about`) and never invent a star rating or review count that isn't the store's own `rating`/`reviewCount` fields. If the article needs a pricing or feature detail the store entry doesn't have, either look it up from the provider's own official site or leave it out — don't guess.
3. **If no matching store entry exists, stop and tell the user which provider(s) are missing a store entry**, and that one needs to be added to `content/stores/<slug>.json` (matching the `Store` interface in `lib/types.ts`: `slug, name, logo, url, category, tagline, rating, reviewCount, description, about, policies, coupons, faqs, relatedStores, updated`) before this article can be written. Do not fabricate a store's rating, pricing or feature claims to work around a missing entry — an article can't safely link to or reference a store that doesn't exist in the content system yet. Only proceed to the next steps once every covered provider has a real store entry.

## Steps

1. Read `content/blog.json` and the `BlogPost` interface in `lib/types.ts` to confirm the exact current shape before editing (same as any blog post).
2. Generate a kebab-case `slug`:
   - Review: `<provider>-review` (e.g. `bluehost-review`).
   - Comparison: `<provider-a>-vs-<provider-b>` (e.g. `hostinger-vs-bluehost`).
   - Roundup: a descriptive slug for the topic (e.g. `best-hosting-for-wordpress-2026`).
3. Write `excerpt` (120–158 characters) and keep `title` roughly 50–60 characters, per this repo's standard SEO conventions (see `CLAUDE.md`'s "SEO guideline" section) — for a review, front-load the provider name and current year (e.g. `"Bluehost Review 2026: Pricing, Features and Verdict"`, matching the existing `hostinger-review` post's title pattern).
4. Set `category: "hosting"` and 2–4 relevant `tags` (e.g. `["hosting", "review", "website"]` for a review; add `"comparison"` or `"roundup"` for those types).
5. Set `postType` to `"post"` (hosting reviews/comparisons/roundups are not sale-calendar or gift-guide content) and set `storeSlugs` to the covered provider slug(s) — this is supported for any `postType`, not just sale-calendar/gift-guide (confirmed in `app/(site)/blog/[slug]/page.tsx`: the "Featured in this guide" `StoreCard` section renders whenever `storeSlugs` resolves to real stores, regardless of `postType`). This gets the article automatic cross-linked `StoreCard`s for every provider it covers.
6. Write `body` — target **6,000–10,000 characters** (matching this repo's current blog-body length guideline), using ONLY the markdown subset `components/blog/PostBody.tsx` supports: `##`/`###` headings, `- ` bullet lines, `**bold**`, blank-line-separated paragraphs, `[text](url)` links, `![alt](src)` images (must be alone on their own line), and pipe tables. The required structure differs by type:

   All three types open the same way: **a 40–60 word direct answer** right after the `## ` heading that starts the article, answering the main question a searcher has ("Is [Provider] good?", "Which is better, X or Y?", "What's the best hosting for [use case]?") before going into detail — this is what gets pulled into featured snippets and AI Overviews, so it needs to stand on its own without the rest of the article for context. Follow it with a small **"At a glance" quick-facts table** (starting price, renewal price, uptime guarantee, money-back guarantee, best-for) before the deeper pricing table — skimmers and snippet extraction both benefit from getting the summary before the detail.

   **Review** (single provider):
   - The 40–60 word direct answer + "At a glance" table (see above).
   - What the provider actually is / who runs it.
   - A pricing table (plan tiers, what's included) — pull real figures from the store entry's `description`/`about`, don't invent pricing.
   - A **real cost breakdown**: intro/promotional price, the upfront commitment length it requires, the renewal price after that term, and any add-on costs the store entry mentions (domain, email, backups) — don't just show the advertised monthly-equivalent price without also stating what's actually charged at checkout and what it renews at.
   - **"Which plan should you choose"** — map plan tiers to use cases ("Choose Premium if you're launching one small site," "Choose Business if you're running several sites or need daily backups") rather than just labeling one plan "best."
   - A pros/cons table.
   - Explicit **support** and **migration** mini-sections (not folded into pros/cons) — what support channels are actually offered, and what moving an existing site in looks like, since these are two of the most common things someone deciding on a host actually wants answered.
   - "Where it's a strong fit" / "Where to think twice" sections.
   - A bottom-line verdict paragraph.
   - An FAQ section (5–8 questions, covering the real search-intent questions: pricing, renewal, migration, support, beginner-friendliness).
   - Link to the provider's coupon page: `[<Provider> coupon page](/coupons/<slug>)`, and to the hosting category page: `[Web hosting deals](/category/hosting)`.

   **Comparison** ("X vs Y"):
   - The 40–60 word direct answer + "At a glance" table (see above), covering both providers.
   - A short intro framing what the comparison is deciding between.
   - A head-to-head feature/pricing comparison table (both providers as columns) — include both the intro price and the renewal price as separate rows, not just one "price" row.
   - A "choose X if..." / "choose Y if..." section — comparisons should land on a use-case-based recommendation, not a single flat winner.
   - Brief **support** and **migration** comparison points if the two store entries have material differences worth calling out (skip if there's nothing meaningfully different to say).
   - An FAQ section (5–8 questions).
   - Links to both coupon pages (`/coupons/<slug-a>`, `/coupons/<slug-b>`) and to `[Web hosting deals](/category/hosting)`.

   **Roundup** ("best hosting for...", multiple providers):
   - The 40–60 word direct answer + "At a glance" ranking table (provider | best for | notable strength), covering every provider included.
   - A short subsection per provider explaining the pick, including its real cost breakdown (intro vs. renewal) where the store entry has that detail.
   - A "how to choose" section tying the picks back to the roundup's specific use case (e.g. WordPress, e-commerce, beginners).
   - An FAQ section (5–8 questions).
   - A coupon-page link for every provider covered, and a link to `[Web hosting deals](/category/hosting)`.

   **Cross-linking to other hosting content:** if another hosting review/comparison/roundup already exists in `content/blog.json` (check the `category: "hosting"` posts — currently just `hostinger-review`, but this grows over time), link to it naturally where relevant (e.g. a roundup mentioning Hostinger can link `[our full Hostinger review](/blog/hostinger-review)` instead of repeating detail already covered there). Don't force a link where there's nothing genuinely relevant to send the reader to yet.

   **Writing style, for all three types:** write like an experienced, evidence-based reviewer, not a marketing brochure. Avoid AI-sounding filler phrases — banned unless genuinely unavoidable: "seamless," "cutting-edge," "game changer," "revolutionary," "robust solution," "in today's digital landscape," "whether you're a...," "let's dive in." Vary paragraph length; don't pad every section to the same size just to hit the character target. Since pricing/renewal terms change over time, add one line near the pricing section noting that pricing was accurate as of the post's `date` field and can change — this keeps the article honest without needing to re-verify it forever.

7. `cover` — same as `/new-post` step 7: use a supplied image as-is, or auto-generate with `node scripts/generate-blog-cover.mjs <slug>` after the post is appended (requires `AI_GATEWAY_API_KEY`; leave `cover: ""` and tell the user if it's missing, rather than fabricating a path).
8. Set `author` to `"Editorial Team"` unless told otherwise, and `published: true` unless asked to stage it as a draft.
9. Append the new object to `content/blog.json` (don't reformat unrelated entries).
10. If `GOOGLE_SHEET_ID` + service-account env vars are configured (check `.env.local` — scripts under `scripts/*.mjs` now auto-load it, no `--env-file` flag needed), push the new row live: build a JSON array with one row matching the `blog` tab's exact column order (`slug, title, excerpt, cover, author, date, category, tags, body, published, postType, startDate, endDate, occasion, storeSlugs` — tags/storeSlugs as comma-joined strings), write it to a temp file, and run `node scripts/sheet-update.mjs blog <that file>` (this both appends new rows and updates existing ones by slug — safe to use even if re-running on an already-pushed article). If it fails with a permission error, tell the user the service account needs Editor access on the Sheet.

## Notes

- Don't add a per-article affiliate disclosure paragraph — this site already discloses its affiliate relationship site-wide (`components/layout/Footer.tsx`, `app/(site)/terms`, `app/(site)/how-it-works`, `app/(site)/privacy`), so repeating it in every hosting article's body would be redundant.
- This skill deliberately does **not** create the store entries themselves — Step 0 is a hard gate, not a fallback path. If a provider's store is missing, stop there; adding a full store profile (ratings, coupons, FAQs) is a separate, larger task outside this skill's scope.
- Full SEO conventions (title/description length, canonical, JSON-LD, internal linking, noindex) are in `CLAUDE.md`'s "SEO guideline" section — steps 3–5 above already cover what's relevant. Run `/seo-audit /blog/<slug>` after publishing to double-check.
- No other file needs to change — `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`, and `app/sitemap.ts` all read through `lib/content.ts` accessors, so the new entry appears automatically at `/blog/<slug>`.
- After editing, mention that a running dev server will need `unstable_cache` to expire (up to 900s) or the user can restart `npm run dev` to see it immediately.
