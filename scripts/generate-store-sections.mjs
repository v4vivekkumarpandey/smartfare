#!/usr/bin/env node
/**
 * Idempotent backfill: fill in the howToUse / savingTips / customerSupport
 * / refundPolicy arrays on every store in content/stores/*.json that
 * doesn't already have them. Generated from facts already present in each
 * store's about[]/policies[] text (same fact-extraction as
 * scripts/generate-store-coupons.mjs), plus generic non-fabricated
 * fallbacks. customerSupport deliberately avoids inventing specific
 * claims (e.g. "24/7 live chat") for stores with no `contact` data —
 * it only states generic, true-by-construction guidance, plus a real
 * phone number when store.contact.phone is present.
 *
 * Safe to re-run any time (e.g. after a new store is added) — stores that
 * already have a given field populated are left untouched for that field.
 *
 * Usage:
 *   node scripts/generate-store-sections.mjs
 */
import fs from "node:fs";
import path from "node:path";

const STORES_DIR = path.join(process.cwd(), "content", "stores");
const TODAY = new Date().toISOString().slice(0, 10);

function extractGuarantee(store) {
  const text = [...(store.about || []), ...(store.policies || [])].join(" \n ");
  return text.match(/(\d+)-day money-back guarantee/i);
}

function hasCodeCoupons(store) {
  return (store.coupons || []).some((c) => c.type === "code");
}

function buildHowToUse(store) {
  const name = store.name;
  if (hasCodeCoupons(store)) {
    return [
      `Browse the ${name} offers listed above and pick the one that fits what you're buying.`,
      `Click "Get Code" to reveal the coupon — we copy it to your clipboard automatically.`,
      `Head to ${name}'s checkout page and paste the code into the promo/coupon field.`,
      `Confirm the discount applied to your total before completing payment.`,
      `No matching code? Use one of the "deal" listings above instead — those apply automatically, no code needed.`,
    ];
  }
  return [
    `Browse the ${name} offers listed above and pick the one that fits what you're buying.`,
    `Click through on the offer — it takes you straight to ${name}'s relevant page or checkout.`,
    `The discount or perk applies automatically; no coupon code is needed for these deals.`,
    `Complete your purchase on ${name}'s site as normal.`,
  ];
}

function buildSavingTips(store) {
  const text = [...(store.about || []), ...(store.policies || [])].join(" \n ");
  const name = store.name;
  const tips = [];

  if (/longest|48-month|36-month|24-month/i.test(text)) {
    tips.push(
      `${name}'s lowest headline price usually needs the longest prepaid term — compare that against the renewal rate to see the real long-term cost before committing.`
    );
  }
  if (/free trial|free plan|free tier/i.test(text)) {
    tips.push(`Start with ${name}'s free trial or free plan if one is available, so you can confirm it's a fit before paying.`);
  }
  if (/free domain/i.test(text)) {
    tips.push(`Look for a plan that bundles a free domain — it saves you a separate domain-registration cost in year one.`);
  }
  const guaranteeMatch = extractGuarantee(store);
  if (guaranteeMatch) {
    tips.push(`${name} offers a ${guaranteeMatch[1]}-day money-back window — use it to try a plan risk-free before deciding to stick with it.`);
  }

  const generic = [
    `Compare ${name}'s plan tiers before buying — the middle tier is often the best value rather than the cheapest or priciest option.`,
    `Check this page again before renewing — new ${name} deals are added and old ones expire regularly.`,
    `Stack a site-wide deal above with any first-time-customer discount ${name} offers directly, when both are allowed.`,
    `Set a calendar reminder before your ${name} renewal date so you're not surprised by the higher post-intro price.`,
  ];
  for (const g of generic) {
    if (tips.length >= 5) break;
    tips.push(g);
  }
  return tips.slice(0, 5);
}

function buildCustomerSupport(store) {
  const name = store.name;
  const bullets = [
    `The fastest way to reach ${name} support is through the official contact links on their website.`,
    `Sign in to your ${name} account dashboard for a built-in help widget or support-ticket system.`,
    `Check ${name}'s help center for setup guides and troubleshooting articles before opening a ticket.`,
  ];
  if (store.contact?.phone) {
    bullets.push(`You can also call ${name} support directly at ${store.contact.phone}.`);
  }
  return bullets;
}

function buildRefundPolicy(store) {
  const name = store.name;
  const guaranteeMatch = extractGuarantee(store);
  if (guaranteeMatch) {
    return [
      `${name} offers a ${guaranteeMatch[1]}-day money-back guarantee on new plans — cancel within that window for a refund.`,
      `Refund terms can exclude add-ons, domain fees or custom work — check ${name}'s own refund policy page for the exact conditions before purchasing.`,
    ];
  }
  return [
    `Refund and cancellation terms vary by plan — review ${name}'s official refund policy on their site before purchasing.`,
  ];
}

function main() {
  const files = fs.readdirSync(STORES_DIR).filter((f) => f.endsWith(".json"));
  let filesChanged = 0;

  for (const file of files) {
    const filePath = path.join(STORES_DIR, file);
    const store = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let changed = false;

    if (!store.howToUse || store.howToUse.length === 0) {
      store.howToUse = buildHowToUse(store);
      changed = true;
    }
    if (!store.savingTips || store.savingTips.length === 0) {
      store.savingTips = buildSavingTips(store);
      changed = true;
    }
    if (!store.customerSupport || store.customerSupport.length === 0) {
      store.customerSupport = buildCustomerSupport(store);
      changed = true;
    }
    if (!store.refundPolicy || store.refundPolicy.length === 0) {
      store.refundPolicy = buildRefundPolicy(store);
      changed = true;
    }

    if (!changed) continue;

    store.updated = TODAY;
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2) + "\n", "utf-8");
    filesChanged++;
  }

  console.log(`Updated ${filesChanged} store file(s) with new sections.`);
}

main();
