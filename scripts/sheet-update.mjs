#!/usr/bin/env node
/**
 * Update existing rows in a tab of the live content Google Sheet, matching
 * by the first column's value (e.g. a slug), using the same service-account
 * credentials lib/sheets.ts uses to read (GOOGLE_SHEET_ID +
 * GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in
 * .env.local). Requires the service account to have Editor access on the
 * Sheet (read-only access, which is all lib/sheets.ts needs, is not enough).
 *
 * Rows whose first-column value isn't found in the tab are appended instead.
 *
 * Usage:
 *   node scripts/sheet-update.mjs <tabName> <rowsJsonFile>
 *
 * <rowsJsonFile> is a JSON file containing an array of rows, each row an
 * array of cell values in the exact column order of that tab's header row,
 * with the first cell being the match key (e.g. slug).
 */
import fs from "node:fs";
import { JWT } from "google-auth-library";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
const PRIVATE_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(
  /\\n/g,
  "\n"
);

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
  const [tabName, rowsFile] = process.argv.slice(2);
  if (!tabName || !rowsFile) {
    console.error("Usage: node scripts/sheet-update.mjs <tabName> <rowsJsonFile>");
    process.exit(1);
  }
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error(
      "GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set in .env.local."
    );
    process.exit(1);
  }

  const newRows = JSON.parse(fs.readFileSync(rowsFile, "utf-8"));

  const client = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
    tabName
  )}?majorDimension=ROWS`;
  const existing = await client.request({ url: getUrl });
  const existingRows = existing.data.values || [];
  const keyToRowIndex = new Map();
  existingRows.forEach((row, i) => {
    if (i === 0) return; // header
    keyToRowIndex.set(row[0], i);
  });

  const updates = [];
  const toAppend = [];
  for (const row of newRows) {
    const key = row[0];
    const rowIndex = keyToRowIndex.get(key);
    if (rowIndex === undefined) {
      toAppend.push(row);
      continue;
    }
    const lastCol = colLetter(row.length - 1);
    updates.push({
      range: `${tabName}!A${rowIndex + 1}:${lastCol}${rowIndex + 1}`,
      values: [row],
    });
  }

  if (updates.length) {
    const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`;
    const res = await client.request({
      url: batchUrl,
      method: "POST",
      data: { valueInputOption: "USER_ENTERED", data: updates },
    });
    console.log(`Updated ${updates.length} existing row(s) in "${tabName}".`);
    console.log(JSON.stringify(res.data.responses?.map((r) => r.updatedRange)));
  }

  if (toAppend.length) {
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
      tabName
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await client.request({
      url: appendUrl,
      method: "POST",
      data: { values: toAppend },
    });
    console.log(`Appended ${toAppend.length} new row(s) to "${tabName}" (no existing match found).`);
    console.log(res.data.updates?.updatedRange || "");
  }

  if (!updates.length && !toAppend.length) {
    console.log("No rows to update or append.");
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
