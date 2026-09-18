#!/usr/bin/env node
/**
 * Idempotent backfill: top up every store in content/stores/*.json to at
 * least TARGET_COUNT FAQs. Generates Q&A pairs from facts already present
 * in each store's about[]/policies[] text (mirrors
 * scripts/generate-store-coupons.mjs), skipping any fact whose topic is
 * already covered by an existing hand-written FAQ. Writes updated JSON
 * back to disk and prints the newly added rows (in the Sheet "faqs" tab
 * column order: storeSlug | question | answer) to a JSON file for
 * scripts/sheet-append.mjs to push live.
 *
 * Safe to re-run any time (e.g. after a new store is added) — stores
 * already at TARGET_COUNT are skipped, and existing FAQs are never
 * touched.
 *
 * Usage:
 *   node scripts/generate-store-faqs.mjs [--out <rows.json>]
 */
import fs from "node:fs";
import path from "node:path";

const STORES_DIR = path.join(process.cwd(), "content", "stores");
const outArgIdx = process.argv.indexOf("--out");
const OUT_FILE =
  outArgIdx !== -1 && process.argv[outArgIdx + 1]
    ? process.argv[outArgIdx + 1]
    : path.join(process.cwd(), "new-faq-rows.json");

const TODAY = new Date().toISOString().slice(0, 10);
const TARGET_COUNT = 10;

const TOPIC_KEYWORDS = {
  price: /pric|renew|cost|\$/i,
  guarantee: /money-back|refund|guarantee/i,
  domain: /domain/i,
  ssl: /ssl/i,
  cdn: /cdn/i,
  uptime: /uptime/i,
  credit: /credit/i,
  code: /promo code|coupon code|discount code/i,
};

function isPlanName(s) {
  return /^[A-Za-z][A-Za-z\s-]{1,24}$/.test(s.trim()) && !/\d/.test(s);
}

function extractFacts(store) {
  const text = [...(store.about || []), ...(store.policies || [])].join(" \n ");
  const name = store.name;
  const facts = [];

  const priceMatch = text.match(/\$(\d+(?:\.\d{2})?)\s*\/\s*month\s*\(([^)]+)\)/);
  const anyPrice = text.match(/\$(\d+(?:\.\d{2})?)\s*\/\s*month/i);
  if (anyPrice) {
    const planNote = priceMatch && isPlanName(priceMatch[2]) ? ` on the ${priceMatch[2].trim()} plan` : "";
    facts.push({
      topic: "price",
      q: `What does ${name} cost?`,
      a: `${name}'s introductory pricing starts from $${anyPrice[1]}/month${planNote}. Check the pricing page for renewal rates, since the lowest advertised price usually applies only to the first term.`,
    });
  }

  const guaranteeMatch = text.match(/(\d+)-day money-back guarantee/i);
  if (guaranteeMatch) {
    facts.push({
      topic: "guarantee",
      q: `Does ${name} offer a money-back guarantee?`,
      a: `Yes — ${name} backs its plans with a ${guaranteeMatch[1]}-day money-back guarantee, so you can request a refund if it's not a good fit.`,
    });
  }

  if (/free domain/i.test(text)) {
    facts.push({
      topic: "domain",
      q: `Does ${name} include a free domain?`,
      a: `Yes, ${name}'s plans include a free domain registration for the first year. It reverts to the standard renewal price after that.`,
    });
  }

  if (/free ssl/i.test(text)) {
    facts.push({
      topic: "ssl",
      q: `Does ${name} include a free SSL certificate?`,
      a: `Yes — every ${name} plan includes a free SSL certificate so your site is secured over HTTPS from day one.`,
    });
  }

  if (/free cdn/i.test(text)) {
    facts.push({
      topic: "cdn",
      q: `Does ${name} include a free CDN?`,
      a: `Yes, ${name} bundles a free CDN with its plans to help speed up page loads for visitors worldwide.`,
    });
  }

  const uptimeMatch = text.match(/(\d+(?:\.\d+)?%)\s+uptime/i);
  if (uptimeMatch) {
    facts.push({
      topic: "uptime",
      q: `What uptime guarantee does ${name} offer?`,
      a: `${name} backs its hosting with a ${uptimeMatch[1]} uptime SLA.`,
    });
  }

  if (/free credit/i.test(text)) {
    facts.push({
      topic: "credit",
      q: `Does ${name} offer free credit for new accounts?`,
      a: `Yes — ${name} runs limited-time free credit offers for new accounts; check the current promotion before signing up.`,
    });
  }

  facts.push({
    topic: "code",
    q: `Do I need a promo code to get ${name}'s best price?`,
    a: `Not always — some ${name} deals apply automatically at checkout, while others require pasting a revealed code into the promo/coupon field before you pay. Check each listing above for details.`,
  });

  return facts;
}

function genericFallback(store, n) {
  const name = store.name;
  const categoryLabel = (store.category || "store").replace(/\b\w/g, (c) => c.toUpperCase());
  const fallbacks = [
    {
      q: `How do I get started with ${name}?`,
      a: `Pick a plan that fits your needs on ${name}'s website, complete checkout, and your account is usually ready within minutes.`,
    },
    {
      q: `Is ${name} good value for ${categoryLabel.toLowerCase()}?`,
      a: `${name} is one of the more popular ${categoryLabel.toLowerCase()} providers — compare its plans and any current deal above against your specific needs before committing.`,
    },
    {
      q: `Can I cancel my ${name} plan anytime?`,
      a: `Most ${name} plans can be cancelled from your account dashboard; check ${name}'s own terms for any minimum-term or refund conditions that apply to your plan.`,
    },
    {
      q: `How often are ${name} deals updated?`,
      a: `Our team checks ${name}'s offers regularly and updates this page when new deals go live or old ones expire.`,
    },
    {
      q: `Is ${name} worth trying?`,
      a: `${name} is a widely used ${categoryLabel.toLowerCase()} pick — read the details above and weigh them against what you specifically need before signing up.`,
    },
    {
      q: `Does ${name} offer a free trial?`,
      a: `Check ${name}'s current plans page for an active free trial or free tier — availability and terms can change, so confirm before you sign up.`,
    },
    {
      q: `What payment methods does ${name} accept?`,
      a: `${name} typically accepts major credit/debit cards and other common online payment methods at checkout; confirm the exact options on ${name}'s own checkout page.`,
    },
    {
      q: `Is ${name} beginner-friendly?`,
      a: `${name}'s plans and dashboard are generally approachable for new users, though comfort level will depend on your own experience — see ${name}'s own guides for a walkthrough.`,
    },
    {
      q: `Does ${name} offer discounts for annual billing?`,
      a: `Many ${name} plans price lower per month when you pay annually or for a longer term upfront compared to paying month-to-month — compare both before choosing a term.`,
    },
    {
      q: `How do I contact ${name} for help?`,
      a: `Use the support links on ${name}'s official website, or sign in to your account dashboard for a help widget or ticket system.`,
    },
    {
      q: `Can I upgrade or downgrade my ${name} plan later?`,
      a: `Most ${name} plans let you change tiers from your account dashboard as your needs grow — check ${name}'s own terms for any proration or minimum-term rules.`,
    },
  ];
  return fallbacks[n % fallbacks.length];
}

function topicCovered(existingFaqs, topic) {
  const keywordRe = TOPIC_KEYWORDS[topic];
  if (!keywordRe) return false;
  return existingFaqs.some((f) => keywordRe.test(f.q) || keywordRe.test(f.a));
}

function main() {
  const files = fs.readdirSync(STORES_DIR).filter((f) => f.endsWith(".json"));
  const newRows = [];
  let filesChanged = 0;

  for (const file of files) {
    const filePath = path.join(STORES_DIR, file);
    const store = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const existing = store.faqs || [];
    const needed = TARGET_COUNT - existing.length;
    if (needed <= 0) continue;

    const existingQuestions = new Set(existing.map((f) => f.q));
    const facts = extractFacts(store).filter((f) => !topicCovered(existing, f.topic));
    const generated = [];
    let factIdx = 0;
    let fallbackIdx = 0;
    let guard = 0;

    while (generated.length < needed && guard++ < 50) {
      let candidate;
      if (factIdx < facts.length) {
        candidate = facts[factIdx++];
      } else {
        candidate = genericFallback(store, fallbackIdx++);
      }
      if (existingQuestions.has(candidate.q)) continue;
      generated.push({ q: candidate.q, a: candidate.a });
      existingQuestions.add(candidate.q);
    }

    store.faqs = [...existing, ...generated];
    store.updated = TODAY;

    fs.writeFileSync(filePath, JSON.stringify(store, null, 2) + "\n", "utf-8");
    filesChanged++;

    for (const faq of generated) {
      newRows.push([store.slug, faq.q, faq.a]);
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(newRows, null, 2), "utf-8");
  console.log(`Updated ${filesChanged} store file(s).`);
  console.log(`Wrote ${newRows.length} new FAQ row(s) to ${OUT_FILE}`);
}

main();
