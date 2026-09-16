---
description: Run a codebase-grounded SEO audit on a page (store, blog post — including sale-calendar/gift-guide posts, or LP)
argument-hint: <path or content slug>
---

Delegate this audit to the `seo-auditor` subagent, passing it: `$ARGUMENTS` (the path or content slug to audit).

Use the Agent tool with `subagent_type: seo-auditor`. In the prompt, include the target path/slug and mention whether a local dev server is running at `http://localhost:3000` (if unknown, ask the user first rather than assuming).

Report the subagent's findings back to the user directly — don't summarize away the specific file/line references, since those are what make the audit actionable.
