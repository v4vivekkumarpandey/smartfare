#!/usr/bin/env node
/**
 * Generate a blog post cover image via the Vercel AI Gateway and save it to
 * public/blog/<slug>.jpg. Requires AI_GATEWAY_API_KEY (see .env.local.example).
 *
 * Usage:
 *   node scripts/generate-blog-cover.mjs <slug>
 *   node scripts/generate-blog-cover.mjs <slug> --prompt "custom art direction"
 *   node scripts/generate-blog-cover.mjs --all   (backfill every post with an empty cover)
 */
import "./lib/load-env.mjs";
import fs from "node:fs";
import path from "node:path";
import { generateImage } from "ai";
import sharp from "sharp";

const ROOT = process.cwd();
const BLOG_JSON = path.join(ROOT, "content", "blog.json");
const BLOG_DIR = path.join(ROOT, "public", "blog");
const MODEL = "prodia/flux-fast-schnell";

function buildPrompt(post) {
  return (
    `Wide editorial blog cover illustration for an article titled "${post.title}". ` +
    `Theme: ${post.excerpt || post.category}. ` +
    `Clean modern flat-illustration style, vibrant but tasteful brand-friendly colors, ` +
    `no text or letters in the image, no logos, no watermarks, 16:9 composition.`
  );
}

async function generateCover(post, prompt) {
  const { image } = await generateImage({
    model: MODEL,
    prompt: prompt || buildPrompt(post),
    aspectRatio: "16:9",
  });
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const jpeg = await sharp(Buffer.from(image.uint8Array))
    .jpeg({ quality: 82 })
    .toBuffer();
  fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.jpg`), jpeg);
  return `/blog/${post.slug}.jpg`;
}

async function main() {
  const args = process.argv.slice(2);
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error(
      "AI_GATEWAY_API_KEY is not set. Add it to .env.local (see .env.local.example)."
    );
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(BLOG_JSON, "utf-8"));

  const targets = args.includes("--all")
    ? posts.filter((p) => !p.cover)
    : posts.filter((p) => p.slug === args[0]);

  if (targets.length === 0) {
    console.error(
      args.includes("--all")
        ? "No posts with an empty cover found."
        : `No post found with slug "${args[0]}". Usage: node scripts/generate-blog-cover.mjs <slug>`
    );
    process.exit(1);
  }

  const promptIdx = args.indexOf("--prompt");
  const customPrompt = promptIdx !== -1 ? args[promptIdx + 1] : undefined;

  const failed = [];
  let succeeded = 0;
  for (const post of targets) {
    console.log(`Generating cover for "${post.slug}"...`);
    try {
      post.cover = await generateCover(post, customPrompt);
      fs.writeFileSync(BLOG_JSON, JSON.stringify(posts, null, 2) + "\n");
      console.log(`  saved ${post.cover}`);
      succeeded++;
    } catch (err) {
      const message = err?.message || String(err);
      console.error(`  failed: ${message}`);
      failed.push(post.slug);
      // A rate limit means every remaining request will fail the same way —
      // stop burning time/requests instead of retrying it once per post.
      if (/rate.?limit/i.test(message)) {
        const remaining = targets.slice(targets.indexOf(post) + 1).map((p) => p.slug);
        console.error(
          `Rate-limited by the AI Gateway — stopping early. Re-run with --all later to pick up the remaining posts (their cover is still empty, so they'll be retried): ${remaining.join(", ") || "(none left)"}`
        );
        break;
      }
    }
  }

  if (targets.length > 1) {
    console.log(`\n${succeeded}/${targets.length} cover(s) generated this run.`);
    if (failed.length) {
      console.log(`Failed this run: ${failed.join(", ")}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
