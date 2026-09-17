---
description: Scaffold an AI tool review, comparison, or roundup article in content/blog.json
argument-hint: <AI tool name, or "X vs Y", or a roundup topic> [--type=review|comparison|roundup]
---

Create a new AI-tool-focused article. This is a standalone skill for AI tool content specifically — it writes to the same `content/blog.json` (or the `blog` sheet tab) as regular blog posts, using the `BlogPost` shape from `lib/types.ts`, but follows its own structure rules tailored to AI tool reviews/comparisons/roundups rather than reusing `/new-post`'s generic steps.

Arguments: `$ARGUMENTS` is either a single AI tool name (→ `review`), two tools like "Jasper vs Copy.ai" (→ `comparison`), or a roundup topic like "best AI writing tools" (→ `roundup`). Infer the type from phrasing if `--type` isn't given, or ask if genuinely ambiguous.

## Step 0 — check for a matching store entry (not a hard gate)

For every AI tool the article will cover:

1. Check `content/stores/*.json` for a store whose `slug` matches the tool.
2. If one exists, it is the **only authoritative source** for that tool's pricing/features/rating — never contradict its `description`/`about`/`rating`/`reviewCount`, and link to its coupon page: `[<Tool> coupon page](/coupons/<slug>)`.
3. If no store entry exists, that's fine — most AI tools won't have one yet. Research it yourself instead (see Step 0.5) and simply skip the coupon-page link for that tool. Note in your final report which tools had no matching store entry.

(Unlike `/new-hosting-article`, a missing store entry does not block this article — AI tool coverage is expected to run ahead of the store catalog.)

## Step 0.5 — research before writing

For any fact not covered by a store entry, research in this priority order and don't stop at the first source: (1) the tool's official website, (2) its official pricing page, (3) its official docs/help center, (4) its changelog or product-update page for recency, (5) independent hands-on reviews, (6) other reputable coverage. Cross-check pricing, free-tier limits, and feature claims across at least two sources when they matter to the verdict — never rely on a single competitor's article for a factual claim. If a detail (price, limit, integration) can't be verified this way, say in the article that it should be confirmed on the official site rather than guessing.

Before drafting, also do a quick gap check: if another AI-tool post already exists in `content/blog.json` covering the same or an adjacent tool, skim it and ask what this new article can say that a generic summary (or that existing post) doesn't — a real limitation, a sharper use-case breakdown, a cost detail others skip. Don't just rewrite the vendor's own pitch in different words.

## Steps

1. Read `content/blog.json` and the `BlogPost` interface in `lib/types.ts` to confirm the exact current shape before editing.
2. Generate a kebab-case `slug`:
   - Review: `<tool>-review` (e.g. `jasper-ai-review`).
   - Comparison: `<tool-a>-vs-<tool-b>` (e.g. `jasper-vs-copy-ai`).
   - Roundup: a descriptive slug for the topic (e.g. `best-ai-writing-tools-2026`).
3. Write `excerpt` (120–158 characters) and keep `title` roughly 50–60 characters, per this repo's standard SEO conventions (see `CLAUDE.md`'s "SEO guideline" section) — for a review, front-load the tool name and current year (e.g. `"Jasper AI Review 2026: Pricing, Features and Verdict"`).
4. Set `category: "software"` (this repo has no dedicated AI-tools category slug — `content/categories.json` covers AI/SaaS tools under `"software"`) and 2–4 relevant `tags` (e.g. `["ai", "review", "productivity"]` for a review; add `"comparison"` or `"roundup"` for those types).
5. Set `postType` to `"post"` and set `storeSlugs` to any covered tool slug(s) that have a matching store entry (omit tools that don't). This gets the article automatic cross-linked `StoreCard`s wherever a store exists.
6. Write `body` — target **8,000–12,000 characters** (bumped above this repo's usual 6,000–10,000 blog-body guideline specifically for AI-tool content, since covering pricing + features walkthrough + integrations + audience-fit + limitations in real depth needs more room than a hosting review), using ONLY the markdown subset `components/blog/PostBody.tsx` supports: `##`/`###` headings, `- ` bullet lines, `**bold**`, blank-line-separated paragraphs, `[text](url)` links, `![alt](src)` images (must be alone on their own line), and pipe tables. Read `components/blog/PostBody.tsx` yourself if you need to confirm exactly what renders — don't assume beyond that subset. The required structure differs by type:

   All three types open the same way: **a 40–60 word direct answer** right after the `## ` heading that starts the article, answering the main question a searcher has ("Is [Tool] good?", "Which is better, X or Y?", "What's the best AI tool for [use case]?") before going into detail — this is what gets pulled into featured snippets and AI Overviews, so it needs to stand on its own without the rest of the article for context. Follow it with a small **"At a glance" quick-facts table** (starting price, free tier/trial, best-for, standout feature) before the deeper pricing table.

   **Review** (single tool):
   - The 40–60 word direct answer + "At a glance" table.
   - What the tool actually is, who makes it, and what model(s)/tech it's built on if publicly stated.
   - A pricing table (plan tiers, what's included, any free tier or trial) — pull real figures from the store entry if one exists, otherwise from the tool's official pricing page via `WebFetch`.
   - Core **features walkthrough** — the 3–5 capabilities that actually differentiate it, not a generic feature dump.
   - **Who it's actually for** — map plan tiers / features to use cases (solo creator, small team, enterprise) rather than a single blanket recommendation.
   - A pros/cons table.
   - An **integrations & ecosystem** mini-section (API access, plugins, Zapier/Slack/etc. if applicable).
   - "Where it's a strong fit" / "Where to think twice" sections — be honest about real limitations (accuracy, hallucination risk, rate limits, learning curve). Within "Where to think twice," be explicit about who should skip it (e.g. "if you need a fully free tool," "if your team needs SOC 2/enterprise compliance," "if you need offline/on-prem use") rather than only listing generic downsides.
   - A bottom-line verdict paragraph.
   - An FAQ section (5–8 questions, covering pricing, free tier limits, data/privacy handling, alternatives, beginner-friendliness).
   - Link to the tool's coupon page if a store entry exists: `[<Tool> coupon page](/coupons/<slug>)`, and to `[AI & software deals](/category/software)`.

   **Comparison** ("X vs Y"):
   - The 40–60 word direct answer + "At a glance" table covering both tools.
   - A short intro framing what the comparison is deciding between (same category, different strengths).
   - A head-to-head feature/pricing comparison table (both tools as columns) — include free tier, entry price, and top-tier price as separate rows.
   - A "choose X if..." / "choose Y if..." section — land on a use-case-based recommendation, not a flat winner.
   - Brief comparison points on accuracy/output quality, ease of use, and integrations if the two tools differ meaningfully there.
   - An FAQ section (5–8 questions).
   - Links to both coupon pages (where store entries exist) and to `[AI & software deals](/category/software)`.

   **Roundup** ("best AI tools for...", multiple tools):
   - The 40–60 word direct answer + "At a glance" ranking table (tool | best for | notable strength).
   - A short subsection per tool explaining the pick, including pricing where available.
   - A "how to choose" section tying the picks back to the roundup's specific use case (e.g. content writing, coding, image generation).
   - An FAQ section (5–8 questions).
   - A coupon-page link for every tool that has one, and a link to `[AI & software deals](/category/software)`.

   **Cross-linking:** if another AI-tool post already exists in `content/blog.json` (check for posts tagged `"ai"` or `category: "software"`), link to it naturally where relevant (e.g. a roundup mentioning a tool that already has a full review can link to it instead of repeating detail). Don't force a link where nothing's genuinely relevant.

   **Writing style:** write like an experienced, hands-on reviewer, not a marketing brochure. Avoid AI-sounding filler phrases — banned unless genuinely unavoidable: "seamless," "cutting-edge," "game changer," "revolutionary," "robust solution," "in today's digital landscape," "whether you're a...," "let's dive in," "unleash," "supercharge." Vary paragraph length. Add one line near the pricing section noting pricing, free-tier limits and feature availability were accurate as of the post's `date` field and can change — AI tool pricing and feature sets move fast.

   **Fact vs. vendor claim:** when a specific number or capability claim comes only from the vendor's own marketing copy (not their docs/pricing page, and not independently verifiable), phrase it as what the vendor states ("Jasper says its output...") rather than asserting it as an established fact.

7. `cover` — use a supplied image as-is, or auto-generate with `node scripts/generate-blog-cover.mjs <slug>` after the post is appended (requires `AI_GATEWAY_API_KEY`; leave `cover: ""` and note it in your report if the key is missing, rather than fabricating a path).
8. Set `author` to `"Editorial Team"` unless told otherwise, and `published: true` unless asked to stage it as a draft.
9. Append the new object to `content/blog.json` (don't reformat unrelated entries).
10. If `GOOGLE_SHEET_ID` + service-account env vars are configured (check `.env.local` — scripts under `scripts/*.mjs` auto-load it via `scripts/lib/load-env.mjs`, no `--env-file` flag needed), push the new row live: build a JSON array with one row matching the `blog` tab's exact column order (`slug, title, excerpt, cover, author, date, category, tags, body, published, postType, startDate, endDate, occasion, storeSlugs` — tags/storeSlugs as comma-joined strings), write it to a temp file, and run `node scripts/sheet-update.mjs blog <that file>`. If it fails with a permission error, note in your report that the service account needs Editor access on the Sheet.

## Notes

- Don't add a per-article affiliate disclosure paragraph — this site already discloses its affiliate relationship site-wide (`components/layout/Footer.tsx`, `app/(site)/terms`, `app/(site)/how-it-works`, `app/(site)/privacy`).
- Never fabricate benchmark numbers, model names, star ratings/review counts (beyond what a matching store entry provides), claims about accuracy/hallucination rates, hands-on testing you didn't do ("I tested this and found..."), screenshots, or user reviews/quotes — source real claims from the vendor's own docs or well-known public information, and hedge or omit if you can't verify a specific figure via `WebFetch`.
- Full SEO conventions (title/description length, canonical, JSON-LD, internal linking, noindex) are in `CLAUDE.md`'s "SEO guideline" section — steps 3–5 above already cover what's relevant. Run `/seo-audit /blog/<slug>` after publishing to double-check.
- No other file needs to change — `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`, and `app/sitemap.ts` all read through `lib/content.ts` accessors, so the new entry appears automatically at `/blog/<slug>`.
- After editing, mention that a running dev server will need `unstable_cache` to expire (up to 900s) or the user can restart `npm run dev` to see it immediately.

## What to report back

End with a concise summary: the slug and title written, its final character count, which covered tools (if any) had no matching store entry, whether the cover was generated or left empty (and why), whether it was pushed to the live Sheet (or why not), and any assumption made about the article type if it wasn't explicit.
