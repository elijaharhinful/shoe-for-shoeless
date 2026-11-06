// Design screenshot tool.
//
// Captures a page from a TARGET url (design source of truth) or the LOCAL app,
// naming the file so the matching pair sits side by side for comparison.
//
// Usage:
//   node screenshot.mjs <url> [label] [flags]
//
// Output: ./screenshots/<source>-<label>[-dark][-mobile|-tablet].png
//   source = "local" for localhost / 127.0.0.1, else "shot".
// If no label is given, an auto-incrementing number is used.
//
// Flags:
//   --dark            capture in dark mode (emulates prefers-color-scheme: dark)
//   --mobile          390x844 viewport
//   --tablet          768x1024 viewport
//   --width=N         custom viewport width  (default 1440)
//   --height=N        custom viewport height (default 900)
//   --full            full-page screenshot (whole scroll height)
//   --selector=".x"   clip to the first element matching this CSS selector
//   --wait=N          extra settle time in ms after load (default 800)
//   --out=name        force exact output filename (without .png)

import puppeteer from "puppeteer";
import { mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT_DIR = resolve("./screenshots");

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (const arg of argv) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      flags[key] = value === undefined ? true : value;
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

function sourceFromUrl(url) {
  if (/localhost|127\.0\.0\.1/i.test(url)) return "local";
  return "shot";
}

function nextNumber(source) {
  let max = 0;
  for (const f of readdirSync(OUT_DIR)) {
    const m = f.match(new RegExp(`^${source}-(\\d+)`));
    if (m) max = Math.max(max, Number(m[1]));
  }
  return String(max + 1).padStart(2, "0");
}

// Scroll through the page so lazy-loaded images and scroll-triggered
// animations (framer-motion whileInView) render before a full-page capture.
async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const url = positional[0];
  if (!url) {
    console.error("Usage: node screenshot.mjs <url> [label] [flags]");
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const source = sourceFromUrl(url);
  const dark = Boolean(flags.dark);

  let width = Number(flags.width) || 1440;
  let height = Number(flags.height) || 900;
  let sizeTag = "";
  if (flags.mobile) {
    width = 390;
    height = 844;
    sizeTag = "-mobile";
  } else if (flags.tablet) {
    width = 768;
    height = 1024;
    sizeTag = "-tablet";
  }

  let name;
  if (flags.out) {
    name = String(flags.out);
  } else {
    const label = positional[1] ? positional[1] : nextNumber(source);
    name = `${source}-${label}${dark ? "-dark" : ""}${sizeTag}`;
  }
  const outPath = join(OUT_DIR, `${name}.png`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 });

    // This app follows the OS theme (Tailwind's default media-query dark variant),
    // so emulate the OS preference rather than seeding a class.
    // Full-page shots never scroll elements into view, so scroll-driven reveal
    // animations would stay invisible. Reduced motion renders everything static.
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: dark ? "dark" : "light" },
      { name: "prefers-reduced-motion", value: flags.full || flags.selector ? "reduce" : "no-preference" },
    ]);

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);

    if (flags.full) await autoScroll(page);

    const settle = Number(flags.wait) || 800;
    await new Promise((r) => setTimeout(r, settle));

    let target = page;
    if (flags.selector) {
      const el = await page.$(String(flags.selector));
      if (!el) {
        console.error(`Selector not found: ${flags.selector}`);
        process.exit(2);
      }
      // Bring the element on screen so lazy images inside it load, then let them decode.
      await el.scrollIntoView();
      await page.waitForNetworkIdle({ idleTime: 400, timeout: 15000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 400));
      target = el;
    }

    await target.screenshot({
      path: outPath,
      fullPage: Boolean(flags.full) && !flags.selector,
    });

    console.log(`Saved ${outPath}`);
    console.log(`  source=${source} viewport=${width}x${height}@2x dark=${dark}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
