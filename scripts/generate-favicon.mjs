/**
 * Renders the logo mark into `app/favicon.ico`.
 *
 *   node scripts/generate-favicon.mjs
 *
 * `app/icon.tsx` already covers modern browsers, but bare `/favicon.ico`
 * requests — crawlers, feed readers, bookmark imports — bypass the declared
 * <link>, so the file has to carry the real mark rather than whatever
 * create-next-app shipped.
 *
 * The .ico wraps PNGs rather than BMP bitmaps, which every browser since IE11
 * accepts and which keeps the alpha channel clean at small sizes.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SIZES = [16, 32, 48];

// Mirrors LOGO_GEOMETRY in app/components/Logo.tsx. Kept as literals because
// this script runs outside the Next/TypeScript pipeline.
const STEM = "#0a0b0d";
const PLATE = "#ff5c2b";

function markup(size) {
  const radius = size <= 16 ? 3 : 5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" rx="${(radius * 24) / size}" fill="${PLATE}"/>
  <rect x="4.5" y="3.5" width="3" height="17" rx="1.5" fill="${STEM}"/>
  <rect x="16.5" y="3.5" width="3" height="17" rx="1.5" fill="${STEM}"/>
  <path d="M7.5 14.5H11V9.5h5.5" stroke="${STEM}" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter"/>
</svg>`;
}

/** ICO container: 6-byte header, one 16-byte directory entry per image. */
function packIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const browser = await chromium.launch();
const images = [];

for (const size of SIZES) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<body style="margin:0;background:transparent">${markup(size)}</body>`
  );
  const data = await page.screenshot({ omitBackground: true });
  images.push({ size, data });
  await page.close();
  console.log(`rendered ${size}x${size}`);
}

await browser.close();

const target = path.join(ROOT, "app", "favicon.ico");
await fs.writeFile(target, packIco(images));
console.log(`wrote ${path.relative(ROOT, target)} (${SIZES.join(", ")} px)`);
