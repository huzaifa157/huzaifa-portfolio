import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const pdfPath = path.resolve(process.argv[2]);
const outPath = process.argv[3] || "pdf-preview.png";

const wrapperPath = path.join(path.dirname(pdfPath), "__pdf-preview-wrapper.html");
const pdfUrl = pathToFileURL(pdfPath).href;
await fs.writeFile(
  wrapperPath,
  `<!doctype html><html><head><style>html,body{margin:0;padding:0;}embed{width:100vw;height:100vh;}</style></head><body><embed src="${pdfUrl}" type="application/pdf" /></body></html>`
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1250 } });
await page.goto(pathToFileURL(wrapperPath).href, { waitUntil: "load" });
await page.waitForTimeout(1200);
await page.screenshot({ path: outPath });
await browser.close();
await fs.unlink(wrapperPath);
console.log(`Saved ${outPath}`);
