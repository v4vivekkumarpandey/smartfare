#!/usr/bin/env node
/**
 * One-time patch: append the howToUse / savingTips / customerSupport /
 * refundPolicy columns to the live Sheet's `stores` tab (if missing), then
 * fill them in for every store from content/stores/*.json — writing ONLY
 * those 4 columns per row (narrow-range update, matched by slug), leaving
 * every other column untouched.
 *
 * Usage:
 *   node scripts/sheet-add-store-sections.mjs
 */
import "./lib/load-env.mjs";
import fs from "node:fs";
import path from "node:path";
import { JWT } from "google-auth-library";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
const PRIVATE_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n");
const TAB = "stores";
const NEW_COLUMNS = ["howToUse", "savingTips", "customerSupport", "refundPolicy"];

function colLetter(n) {
  let s = "";
  let num = n;
  while (num >= 0) {
    s = String.fromCharCode((num % 26) + 65) + s;
    num = Math.floor(num / 26) - 1;
  }
  return s;
}

async function main() {
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error(
      "GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set in .env.local."
    );
    process.exit(1);
  }

  const client = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
    TAB
  )}?majorDimension=ROWS`;
  const existing = await client.request({ url: getUrl });
  const rows = existing.data.values || [];
  if (rows.length === 0) {
    console.error(`Tab "${TAB}" is empty or missing.`);
    process.exit(1);
  }

  const header = rows[0].map((h) => (h || "").trim());
  const headerLower = header.map((h) => h.toLowerCase());
  const slugCol = headerLower.indexOf("slug");
  if (slugCol !== 0) {
    console.error(`Expected "slug" to be the first column of "${TAB}", found at index ${slugCol}.`);
    process.exit(1);
  }

  const missing = NEW_COLUMNS.filter((c) => !headerLower.includes(c.toLowerCase()));
  let newHeader = header;
  if (missing.length > 0) {
    newHeader = [...header, ...missing];
    const headerRange = `${TAB}!A1:${colLetter(newHeader.length - 1)}1`;
    await client.request({
      url: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
        headerRange
      )}?valueInputOption=USER_ENTERED`,
      method: "PUT",
      data: { values: [newHeader] },
    });
    console.log(`Added header column(s): ${missing.join(", ")}`);
  } else {
    console.log("All 4 columns already present in header.");
  }

  const newHeaderLower = newHeader.map((h) => h.toLowerCase());
  const colIndices = NEW_COLUMNS.map((c) => newHeaderLower.indexOf(c.toLowerCase()));
  const minCol = Math.min(...colIndices);
  const maxCol = Math.max(...colIndices);
  if (maxCol - minCol + 1 !== NEW_COLUMNS.length) {
    console.error("New columns are not contiguous — aborting to avoid a malformed range write.");
    process.exit(1);
  }

  const slugToRowIndex = new Map();
  rows.forEach((row, i) => {
    if (i === 0) return;
    if (row[slugCol]) slugToRowIndex.set(row[slugCol].toLowerCase(), i);
  });

  const storesDir = path.join(process.cwd(), "content", "stores");
  const files = fs.readdirSync(storesDir).filter((f) => f.endsWith(".json"));

  const updates = [];
  let matched = 0;
  let unmatched = [];

  for (const file of files) {
    const store = JSON.parse(fs.readFileSync(path.join(storesDir, file), "utf-8"));
    const rowIndex = slugToRowIndex.get(store.slug.toLowerCase());
    if (rowIndex === undefined) {
      unmatched.push(store.slug);
      continue;
    }
    matched++;
    const values = [
      (store.howToUse || []).join("\n"),
      (store.savingTips || []).join("\n"),
      (store.customerSupport || []).join("\n"),
      (store.refundPolicy || []).join("\n"),
    ];
    const range = `${TAB}!${colLetter(minCol)}${rowIndex + 1}:${colLetter(maxCol)}${rowIndex + 1}`;
    updates.push({ range, values: [values] });
  }

  if (updates.length) {
    const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`;
    await client.request({
      url: batchUrl,
      method: "POST",
      data: { valueInputOption: "USER_ENTERED", data: updates },
    });
  }

  console.log(`Updated ${matched} store row(s) with the 4 new section columns.`);
  if (unmatched.length) {
    console.log(`No matching Sheet row for: ${unmatched.join(", ")} (skipped — add them manually if needed).`);
  }
}

main().catch((err) => {
  if (err.response?.data) {
    console.error(JSON.stringify(err.response.data, null, 2));
  } else {
    console.error(err);
  }
  process.exit(1);
});
