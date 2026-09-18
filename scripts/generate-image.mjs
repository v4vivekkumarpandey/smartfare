#!/usr/bin/env node
/**
 * Generate any image via the Vercel AI Gateway's free flux-fast-schnell model
 * and save it under public/, so it deploys automatically with the site on
 * Vercel — no separate image host needed. Requires AI_GATEWAY_API_KEY (see
 * .env.local.example).
 *
 * Usage:
 *   node scripts/generate-image.mjs <path-under-public> "<prompt>"
 *   node scripts/generate-image.mjs logos/acme.jpg "minimalist blue rocket logo, flat vector, no text"
 *
 * Note: this free model always outputs 1024x1024 and ignores aspectRatio/size
 * requests. It's also rate-limited (a burst of requests will start failing
 * with a rate-limit error) — space out large batches instead of firing many
 * at once.
 */
import "./lib/load-env.mjs";
import fs from "node:fs";
import path from "node:path";
import { generateImage } from "ai";
import sharp from "sharp";

const ROOT = process.cwd();
const MODEL = "prodia/flux-fast-schnell";

async function main() {
  const [outPath, prompt] = process.argv.slice(2);
  if (!outPath || !prompt) {
    console.error(
      'Usage: node scripts/generate-image.mjs <path-under-public> "<prompt>"'
    );
    process.exit(1);
  }
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error(
      "AI_GATEWAY_API_KEY is not set. Add it to .env.local (see .env.local.example)."
    );
    process.exit(1);
  }

  const fullPath = path.join(ROOT, "public", outPath);
  const ext = path.extname(fullPath).toLowerCase();

  console.log(`Generating image for "${prompt}"...`);
  const { image } = await generateImage({ model: MODEL, prompt });

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  const raw = Buffer.from(image.uint8Array);
  const buffer =
    ext === ".png"
      ? await sharp(raw).png().toBuffer()
      : ext === ".webp"
      ? await sharp(raw).webp({ quality: 85 }).toBuffer()
      : await sharp(raw).jpeg({ quality: 85 }).toBuffer();

  fs.writeFileSync(fullPath, buffer);
  console.log(`Saved /${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
