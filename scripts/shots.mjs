/**
 * Design review helper: scrolls the page so every reveal animation settles,
 * then captures the sections named on the command line.
 *
 *   node scripts/shots.mjs http://localhost:4310 ./out dark 1440
 */

import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPrefix = process.argv[3] || "shot";
const theme = process.argv[4] || "dark";
const width = Number(process.argv[5] || 1440);
const selectors = (process.argv[6] || "").split(",").filter(Boolean);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: width < 700 ? 844 : 1000 },
  deviceScaleFactor: 1,
});

await page.goto(url, { waitUntil: "networkidle" });

if (theme === "light") {
  await page.click(".theme-toggle");
  await page.waitForTimeout(300);
}

// Walk the whole page so every IntersectionObserver fires, then come back up.
await page.evaluate(async () => {
  // The site sets scroll-behavior: smooth; instant jumps are needed here or the
  // walk outruns the animation and lower sections never enter the viewport.
  document.documentElement.style.scrollBehavior = "auto";
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 90));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(900);

if (selectors.length === 0) {
  await page.screenshot({ path: `${outPrefix}.png`, fullPage: true });
  console.log(`Saved ${outPrefix}.png`);
} else {
  for (const selector of selectors) {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const name = selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    await element.screenshot({ path: `${outPrefix}-${name}.png` });
    console.log(`Saved ${outPrefix}-${name}.png`);
  }
}

await browser.close();
