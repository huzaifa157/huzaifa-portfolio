/**
 * Captures real product screenshots for case studies that have a public demo.
 *
 *   node scripts/capture-screens.mjs
 *
 * Output is a 2x JPEG so it stays sharp inside the browser frame on retina
 * displays; `next/image` handles the resizing from there.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "projects"
);

const targets = [
  {
    file: "dentalflow-screen.jpg",
    url: "https://dental-flow-dental-clinic-managemen.vercel.app",
  },
];

const browser = await chromium.launch();

for (const target of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({
    path: path.join(OUT_DIR, target.file),
    type: "jpeg",
    quality: 86,
  });
  await page.close();
  console.log(`Saved ${target.file}`);
}

await browser.close();
