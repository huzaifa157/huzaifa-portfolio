/**
 * Generates the project thumbnails in `public/projects` so every card shares one
 * visual language instead of six hand-drawn one-offs.
 *
 *   node scripts/generate-thumbnails.mjs
 *
 * Each thumbnail is a 1200x630 SVG: title block on the left, and a schematic on
 * the right whose grid is dimensioned from the project's real numbers (tables,
 * endpoints, roles), with the accent cells marking what the case study is about.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "projects"
);

const C = {
  bg: "#0d1015",
  bgDeep: "#08090c",
  line: "#1b202a",
  line2: "#262d3a",
  cell: "#161b24",
  fg: "#eef1f6",
  fg2: "#a2abbb",
  fg3: "#69727f",
  accent: "#ff5c2b",
};

const SANS =
  "Inter, 'Space Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

const projects = [
  {
    file: "serveflow-thumb.svg",
    index: "01",
    kicker: "Café management & ordering",
    title: "ServeFlow",
    caption: "15 tables · 18 endpoints · 3 roles",
    grid: { cols: 6, rows: 5 },
    // Highlighted cells trace an order moving through the state machine.
    schematicLabel: "ORDER STATE PATH",
    accents: [0, 7, 14, 21, 28, 29],
  },
  {
    file: "dentalflow-thumb.svg",
    index: "02",
    kicker: "Multi-branch clinic portal",
    title: "DentalFlow",
    caption: "49 endpoints · 14 models · 4 roles",
    grid: { cols: 7, rows: 4 },
    // Four lanes, one per role.
    schematicLabel: "ROLE ACCESS LANES",
    accents: [0, 7, 14, 21],
  },
  {
    file: "wanderlust-thumb.svg",
    index: "03",
    kicker: "Travel marketplace",
    title: "Wanderlust",
    caption: "Bookings · GeoJSON · 5 hardening layers",
    grid: { cols: 6, rows: 4 },
    // A contiguous stay: reserved nights that nothing else may overlap.
    schematicLabel: "BOOKED DATE RANGE",
    accents: [8, 9, 10, 11],
  },
  {
    file: "expense-tracker-thumb.svg",
    index: "04",
    kicker: "Cross-platform mobile app",
    title: "Expense Tracker",
    caption: "One Expo codebase · iOS + Android",
    grid: { cols: 5, rows: 5 },
    // One vertical thread: a single codebase running down every platform screen.
    schematicLabel: "SYNCED PLATFORMS",
    accents: [2, 7, 12, 17, 22],
  },
  {
    file: "ai-studio-thumb.svg",
    index: "05",
    kicker: "AI video publishing",
    title: "AI Studio",
    caption: "Provider fallback · CDN delivery",
    grid: { cols: 6, rows: 4 },
    // A run of cells stepping down a row: one provider handing off to the next.
    schematicLabel: "PROVIDER FALLBACK",
    accents: [6, 7, 8, 15, 16],
  },
  {
    file: "intellitest-thumb.svg",
    index: "06",
    kicker: "Adaptive assessment engine",
    title: "IntelliTest",
    caption: "Adaptive routing · timed scoring",
    grid: { cols: 6, rows: 4 },
    // A branching path: the next question depends on the one before it.
    schematicLabel: "ADAPTIVE ROUTING",
    accents: [0, 6, 13, 19, 20],
  },
];

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function schematic({ grid, accents }, box) {
  const gap = 10;
  const cellW = (box.w - gap * (grid.cols - 1)) / grid.cols;
  const cellH = (box.h - gap * (grid.rows - 1)) / grid.rows;
  const cells = [];

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const i = row * grid.cols + col;
      const isAccent = accents.includes(i);
      const x = box.x + col * (cellW + gap);
      const y = box.y + row * (cellH + gap);

      cells.push(
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cellW.toFixed(1)}" height="${cellH.toFixed(1)}" rx="6" ` +
          `fill="${isAccent ? C.accent : C.cell}" fill-opacity="${isAccent ? 0.9 : 1}" ` +
          `stroke="${isAccent ? C.accent : C.line2}" stroke-opacity="${isAccent ? 0.5 : 1}"/>`
      );
    }
  }

  return cells.join("\n      ");
}

function svg(project) {
  const panel = { x: 660, y: 96, w: 476, h: 438 };
  const gridBox = {
    x: panel.x + 34,
    y: panel.y + 40,
    w: panel.w - 68,
    h: panel.h - 118,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc(project.title)} — ${esc(project.kicker)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.bg}"/>
      <stop offset="1" stop-color="${C.bgDeep}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.12" cy="0" r="0.9">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="3" fill="${C.accent}"/>

  <g font-family="${MONO}" font-size="17" letter-spacing="2.4" fill="${C.fg3}">
    <text x="64" y="108">${esc(project.index)}</text>
    <text x="110" y="108" fill="${C.accent}">/</text>
    <text x="136" y="108">${esc(project.kicker.toUpperCase())}</text>
  </g>

  <text x="64" y="240" font-family="${SANS}" font-size="82" font-weight="600" letter-spacing="-3" fill="${C.fg}">${esc(project.title)}</text>

  <rect x="64" y="286" width="72" height="3" rx="1.5" fill="${C.accent}"/>

  <text x="64" y="344" font-family="${SANS}" font-size="25" fill="${C.fg2}">${esc(project.caption)}</text>

  <g font-family="${MONO}" font-size="15" letter-spacing="1.6" fill="${C.fg3}">
    <text x="64" y="556">MUHAMMAD HUZAIFA</text>
    <text x="64" y="584" fill="${C.line2}">CASE STUDY</text>
  </g>

  <rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" rx="18" fill="#0a0d12" stroke="${C.line}"/>
  <g>
    <circle cx="${panel.x + 26}" cy="${panel.y + 24}" r="4.5" fill="${C.line2}"/>
    <circle cx="${panel.x + 42}" cy="${panel.y + 24}" r="4.5" fill="${C.line2}"/>
    <circle cx="${panel.x + 58}" cy="${panel.y + 24}" r="4.5" fill="${C.accent}" fill-opacity="0.7"/>
  </g>
  <line x1="${panel.x}" y1="${panel.y + 46}" x2="${panel.x + panel.w}" y2="${panel.y + 46}" stroke="${C.line}"/>

  <g>
      ${schematic(project, gridBox)}
  </g>

  <text x="${panel.x + 34}" y="${panel.y + panel.h - 32}" font-family="${MONO}" font-size="14" letter-spacing="1.8" fill="${C.fg3}">${esc(project.schematicLabel)}</text>
</svg>
`;
}

await fs.mkdir(OUT_DIR, { recursive: true });

for (const project of projects) {
  const target = path.join(OUT_DIR, project.file);
  await fs.writeFile(target, svg(project), "utf8");
  console.log(`wrote ${path.relative(process.cwd(), target)}`);
}
