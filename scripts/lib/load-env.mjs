/**
 * Loads .env.local into process.env for standalone scripts run via plain
 * `node scripts/foo.mjs` (Next.js loads .env.local itself for `next dev`/
 * `next build`, but a script run outside Next doesn't get that for free).
 * No-op for any key already set in the environment, so real env vars
 * (CI, shell exports) still take priority. Import this before reading any
 * env var: `import "./lib/load-env.mjs";`
 */
import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}
