/**
 * Design review helper: captures the page one viewport at a time, so
 * scroll-driven reveals are in their settled state in every frame (a single
 * full-page capture would catch everything below the fold mid-animation).
 *
 *   node scripts/shots.mjs http://localhost:3000 ./out/home dark 1440
 *   node scripts/shots.mjs http://localhost:3000 ./out/home light 390 ".contact"
 *
 * With selectors, each matching element is captured instead.
 */

import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPrefix = process.argv[3] || "shot";
const theme = process.argv[4] || "dark";
const width = Number(process.argv[5] || 1440);
const selectors = (process.argv[6] || "").split(",").filter(Boolean);

const height = width < 700 ? 844 : 900;
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
});

// The theme script in the layout reads this before first paint.
await context.addInitScript((value) => {
  window.localStorage.setItem("theme", value);
}, theme);

const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });

// Instant jumps, or the walk outruns the site's smooth scrolling.
await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
await page.waitForTimeout(1200);

if (selectors.length > 0) {
  for (const selector of selectors) {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const name = selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    await element.screenshot({ path: `${outPrefix}-${name}.png` });
    console.log(`Saved ${outPrefix}-${name}.png`);
  }
} else {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = height - 80;
  let index = 0;

  for (let y = 0; y < total; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(350);
    index += 1;
    const file = `${outPrefix}-${String(index).padStart(2, "0")}.png`;
    await page.screenshot({ path: file });
    console.log(`Saved ${file}`);
  }
}

await browser.close();
