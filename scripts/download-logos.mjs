/**
 * Brand Logo Downloader for PodcastRep
 *
 * Visits each brand's website, finds their header logo (SVG or image),
 * and saves it to public/brands/.
 *
 * Run from the podcastrep project root:
 *   node scripts/download-logos.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRANDS_DIR = join(__dirname, "..", "public", "brands");

if (!existsSync(BRANDS_DIR)) {
  mkdirSync(BRANDS_DIR, { recursive: true });
}

const brands = [
  { slug: "shopify", url: "https://www.shopify.com" },
  { slug: "betterhelp", url: "https://www.betterhelp.com" },
  { slug: "draftkings", url: "https://www.draftkings.com" },
  { slug: "fanduel", url: "https://www.fanduel.com" },
  { slug: "hellofresh", url: "https://www.hellofresh.com" },
  { slug: "factor", url: "https://www.factor75.com" },
  { slug: "prizepicks", url: "https://prizepicks.com" },
  { slug: "acorns", url: "https://www.acorns.com" },
  { slug: "greenlight", url: "https://greenlight.com" },
  { slug: "quince", url: "https://www.onequince.com" },
  { slug: "aura-frames", url: "https://www.auraframes.com" },
  { slug: "underdog-fantasy", url: "https://underdogfantasy.com" },
  { slug: "dutch-pets", url: "https://www.dutch.com" },
  { slug: "rula", url: "https://www.rula.com" },
];

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    return await res.text();
  } catch {
    return null;
  }
}

function extractLogoUrl(html, baseUrl) {
  // Strategy 1: Look for SVG logo in header/nav area
  // Find <img> tags near the top that look like logos
  const imgRegex =
    /<img[^>]*(?:logo|brand|header)[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    return resolveUrl(match[1], baseUrl);
  }

  // Strategy 2: Look for any img with "logo" in src
  const srcLogoRegex = /<img[^>]*src=["']([^"']*logo[^"']*)["'][^>]*>/gi;
  match = srcLogoRegex.exec(html);
  if (match) return resolveUrl(match[1], baseUrl);

  // Strategy 3: Look for og:image meta tag
  const ogRegex =
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
  match = ogRegex.exec(html);
  if (match) return resolveUrl(match[1], baseUrl);

  // Strategy 4: look for link rel="icon" with large size
  const iconRegex =
    /<link[^>]*rel=["'](?:icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let bestIcon = null;
  let bestSize = 0;
  while ((match = iconRegex.exec(html)) !== null) {
    const sizeMatch = match[0].match(/sizes=["'](\d+)/);
    const size = sizeMatch ? parseInt(sizeMatch[1]) : 32;
    if (size > bestSize) {
      bestSize = size;
      bestIcon = match[1];
    }
  }
  if (bestIcon) return resolveUrl(bestIcon, baseUrl);

  return null;
}

function resolveUrl(src, base) {
  if (src.startsWith("//")) return "https:" + src;
  if (src.startsWith("http")) return src;
  try {
    return new URL(src, base).href;
  } catch {
    return null;
  }
}

async function downloadFile(url, filepath) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 100) return false;
    writeFileSync(filepath, buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("\n=== PodcastRep Brand Logo Downloader ===");
  console.log(`Saving to: ${BRANDS_DIR}\n`);

  let succeeded = 0;
  const failed = [];

  for (const brand of brands) {
    process.stdout.write(`  ${brand.slug}... `);

    const html = await fetchPage(brand.url);
    if (!html) {
      console.log("FAILED (could not fetch page)");
      failed.push(brand.slug);
      continue;
    }

    const logoUrl = extractLogoUrl(html, brand.url);
    if (!logoUrl) {
      console.log("FAILED (no logo found in HTML)");
      failed.push(brand.slug);
      continue;
    }

    const ext = logoUrl.match(/\.svg/i) ? ".svg" : ".png";
    const filepath = join(BRANDS_DIR, brand.slug + ext);

    const ok = await downloadFile(logoUrl, filepath);
    if (ok) {
      console.log(`OK -> ${brand.slug}${ext}`);
      succeeded++;
    } else {
      console.log("FAILED (download error)");
      failed.push(brand.slug);
    }
  }

  console.log(`\n--- Results ---`);
  console.log(`  Downloaded: ${succeeded} / ${brands.length}`);

  if (failed.length > 0) {
    console.log(`\n  Failed brands (download manually):`);
    failed.forEach((f) => console.log(`    - ${f}`));
    console.log(
      `\n  For failed logos, Google "[brand] logo transparent png" and save to:`
    );
    console.log(`    ${BRANDS_DIR}`);
    console.log(
      `  Name files: brandname.svg or brandname.png (lowercase, hyphens for spaces)`
    );
  }

  console.log("\nDone!\n");
}

main();
