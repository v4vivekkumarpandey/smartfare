---
description: Scaffold a new sale-calendar entry in content/sale-calendar.json
argument-hint: <sale name>
---

Create a new sale-calendar entry for `/sale-calendar/[slug]`.

Arguments: `$ARGUMENTS` is the sale's name (e.g. "Black Friday 2027" or "Cyber Monday 2027").

Steps:
1. Read `content/sale-calendar.json` and the `SaleCalendarEntry` interface in `lib/types.ts` to confirm the current shape before editing.
2. Generate a kebab-case `slug` (e.g. `"black-friday-2027"`).
3. Ask the user for `startDate` and `endDate` (ISO `YYYY-MM-DD`) if not given — do not guess sale dates.
4. Write a short `description` (1–2 sentences) suitable as a meta description.
5. `cover` is optional — a path under `public/` or an https URL for the feature image shown on the list card and detail-page hero. Leave `""` if the user has no image yet; don't fabricate one.
6. `storeSlugs` MUST reference real stores — check `content/stores/*.json` and only include slugs that actually exist.
7. Choose `category` from an existing category slug if relevant, or leave `""`.
8. Default `featured: false` and `published: false` so the entry is staged for review — ask the user if they want it live and featured immediately instead.
9. Append the new object to `content/sale-calendar.json`.

Notes:
- If Sheets is configured, mention the user should also add a row to the `salecalendar` sheet tab for production.
- No route changes needed — `app/(site)/sale-calendar/page.tsx`, `app/(site)/sale-calendar/[slug]/page.tsx`, and `app/sitemap.ts` pick this up automatically via `lib/content.ts`'s `getUpcomingSales`/`getSaleCalendar` accessors.
