import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPrefix = process.argv[3] || "shot";
const theme = process.argv[4] || "dark";
const viewport =
  process.argv[5] === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 1000 };
const fullPage = process.argv[6] !== "false";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport });
await page.goto(url, { waitUntil: "networkidle" });

if (theme === "light") {
  await page.click(".theme-toggle");
  await page.waitForTimeout(400);
}

await page.screenshot({ path: `${outPrefix}.png`, fullPage });
await browser.close();
console.log(`Saved ${outPrefix}.png`);
