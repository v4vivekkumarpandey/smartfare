#!/usr/bin/env node
/**
 * Append a row to a tab in the live content Google Sheet, using the same
 * service-account credentials lib/sheets.ts uses to read (GOOGLE_SHEET_ID +
 * GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in
 * .env.local). Requires the service account to have Editor access on the
 * Sheet (read-only access, which is all lib/sheets.ts needs, is not enough).
 *
 * Usage:
 *   node scripts/sheet-append.mjs <tabName> <rowsJsonFile>
 *
 * <rowsJsonFile> is a JSON file containing an array of rows, each row an
 * array of cell values in the exact column order of that tab's header row.
 */
import "./lib/load-env.mjs";
import fs from "node:fs";
import { JWT } from "google-auth-library";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
const PRIVATE_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(
  /\\n/g,
  "\n"
);

async function main() {
  const [tabName, rowsFile] = process.argv.slice(2);
  if (!tabName || !rowsFile) {
    console.error(
      "Usage: node scripts/sheet-append.mjs <tabName> <rowsJsonFile>"
    );
    process.exit(1);
  }
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error(
      "GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set in .env.local."
    );
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(rowsFile, "utf-8"));

  const client = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
    tabName
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await client.request({
    url,
    method: "POST",
    data: { values: rows },
  });

  console.log(`Appended ${rows.length} row(s) to "${tabName}".`);
  console.log(res.data.updates?.updatedRange || "");
}

main().catch((err) => {
  if (err.response?.data) {
    console.error(JSON.stringify(err.response.data, null, 2));
  } else {
    console.error(err);
  }
  process.exit(1);
});
