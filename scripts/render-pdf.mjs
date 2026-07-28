import { createCanvas, ImageData } from "@napi-rs/canvas";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

const pdfPath = process.argv[2];
const outPrefix = process.argv[3] || "page";

globalThis.ImageData = globalThis.ImageData || ImageData;

const data = new Uint8Array(await fs.readFile(pdfPath));
const standardFontDataUrl =
  path
    .join(fileURLToPath(new URL(".", import.meta.url)), "..", "node_modules", "pdfjs-dist", "standard_fonts")
    .split(path.sep)
    .join("/") + "/";
const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl }).promise;

for (let i = 1; i <= doc.numPages; i += 1) {
  const page = await doc.getPage(i);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;
  const buffer = await canvas.encode("png");
  await fs.writeFile(`${outPrefix}-${i}.png`, buffer);
  console.log(`Saved ${outPrefix}-${i}.png`);
}

console.log(`file url for reference: ${pathToFileURL(pdfPath).href}`);
