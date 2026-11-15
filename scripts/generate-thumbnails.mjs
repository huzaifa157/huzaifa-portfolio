/**
 * Generates the project artwork in `public/projects` so every card shares one
 * visual language.
 *
 *   node scripts/generate-thumbnails.mjs
 *
 * Each file is a 1200x630 SVG: a dark panel with a schematic of the idea the
 * case study is about (role lanes, a schema, a fallback chain, ...). The title
 * is deliberately absent — the card and the case study page already set it in
 * real type, and repeating it inside an image helps nobody.
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

// Mirrors the dark-theme tokens in app/globals.css.
const C = {
  bg: "#0d0d0b",
  panel: "#141412",
  cell: "#1b1b18",
  line: "#2c2c26",
  line2: "#45453c",
  fg: "#f4f2eb",
  fg2: "#b5b2a7",
  fg3: "#807d72",
  accent: "#c8f24b",
  accentInk: "#0f1405",
};

const MONO = "ui-monospace, 'SF Mono', 'Cascadia Mono', Consolas, Menlo, monospace";

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const n = (value) => Number(value.toFixed(1));

function label(x, y, text, { fill = C.fg3, size = 22, anchor = "start", spacing = 1.6 } = {}) {
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" letter-spacing="${spacing}" fill="${fill}" text-anchor="${anchor}">${esc(text)}</text>`;
}

/* ------------------------------------------------------------- motifs --- */

/** One lane per role; the lit cells widen as the role's reach widens. */
function lanes() {
  const roles = [
    ["PATIENT", 3],
    ["DOCTOR", 6],
    ["RECEPTION", 8],
    ["ADMIN", 12],
  ];
  const cols = 12;
  const x0 = 290;
  const gap = 10;
  const cellW = (1110 - x0 - gap * (cols - 1)) / cols;
  const rowH = 62;
  const rowGap = 26;
  const y0 = 150;
  const out = [];

  roles.forEach(([name, reach], row) => {
    const y = y0 + row * (rowH + rowGap);
    out.push(label(90, y + rowH / 2 + 8, name, { fill: C.fg2 }));
    for (let col = 0; col < cols; col += 1) {
      const lit = col < reach;
      out.push(
        `<rect x="${n(x0 + col * (cellW + gap))}" y="${y}" width="${n(cellW)}" height="${rowH}" rx="8" fill="${lit ? C.accent : C.cell}" fill-opacity="${lit ? n(0.35 + (0.6 * (row + 1)) / roles.length) : 1}" stroke="${lit ? C.accent : C.line}" stroke-opacity="${lit ? 0.55 : 1}"/>`
      );
    }
  });

  return out.join("\n  ");
}

/** Four tables and the relations between them; subscriptions is the hub. */
function schema() {
  const tables = [
    { name: "customers", x: 90, y: 214, rows: 4 },
    { name: "subscriptions", x: 364, y: 178, rows: 5, hub: true },
    { name: "orders", x: 638, y: 214, rows: 4 },
    { name: "meals", x: 912, y: 196, rows: 4 },
  ];
  const w = 198;
  const out = [];

  tables.forEach((table, i) => {
    const h = 58 + table.rows * 38 + 12;
    const stroke = table.hub ? C.accent : C.line2;
    out.push(
      `<rect x="${table.x}" y="${table.y}" width="${w}" height="${h}" rx="12" fill="${C.panel}" stroke="${stroke}" stroke-opacity="${table.hub ? 0.8 : 1}"/>`,
      `<path d="M${table.x} ${table.y + 46}h${w}" stroke="${stroke}" stroke-opacity="${table.hub ? 0.4 : 1}"/>`,
      label(table.x + 16, table.y + 31, table.name, { fill: table.hub ? C.accent : C.fg, spacing: 0, size: 20 })
    );
    for (let row = 0; row < table.rows; row += 1) {
      const y = table.y + 68 + row * 38;
      const key = row === 0;
      out.push(
        `<circle cx="${table.x + 24}" cy="${y}" r="4" fill="${key ? C.accent : C.line2}"/>`,
        `<rect x="${table.x + 40}" y="${y - 5}" width="${[86, 62, 104, 74, 92][row]}" height="10" rx="5" fill="${C.line2}" fill-opacity="${key ? 1 : 0.7}"/>`
      );
    }

    const next = tables[i + 1];
    if (next) {
      const y1 = table.y + 106;
      const y2 = next.y + 106;
      const x1 = table.x + w;
      const mid = (x1 + next.x) / 2;
      out.push(
        `<path d="M${x1} ${y1}H${mid}V${y2}H${next.x}" fill="none" stroke="${C.fg3}" stroke-width="1.5"/>`,
        `<circle cx="${x1}" cy="${y1}" r="4.5" fill="${C.bg}" stroke="${C.fg3}" stroke-width="1.5"/>`,
        `<circle cx="${next.x}" cy="${y2}" r="4.5" fill="${C.fg3}"/>`
      );
    }
  });

  return out.join("\n  ");
}

/** Contours, a scatter of listings, and the one that is currently selected. */
function map() {
  const out = [];
  const contours = [
    [330, 300, 250, 130, -8],
    [330, 300, 170, 82, -8],
    [330, 300, 90, 40, -8],
    [860, 340, 230, 120, 10],
    [860, 340, 140, 68, 10],
    [640, 180, 150, 54, 4],
  ];
  for (const [cx, cy, rx, ry, rot] of contours) {
    out.push(
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="none" stroke="${C.line2}" stroke-opacity="0.75"/>`
    );
  }
  out.push(
    `<path d="M150 440C330 380 470 470 640 400S930 250 1080 300" fill="none" stroke="${C.fg3}" stroke-width="1.5" stroke-dasharray="3 9" stroke-linecap="round"/>`
  );

  const pins = [
    [250, 250],
    [420, 340],
    [560, 205],
    [760, 410],
    [960, 290],
    [1010, 420],
  ];
  for (const [x, y] of pins) {
    out.push(
      `<circle cx="${x}" cy="${y}" r="9" fill="${C.cell}" stroke="${C.fg3}" stroke-width="1.5"/>`,
      `<circle cx="${x}" cy="${y}" r="3" fill="${C.fg2}"/>`
    );
  }

  const [sx, sy] = [690, 300];
  out.push(
    `<circle cx="${sx}" cy="${sy}" r="46" fill="${C.accent}" fill-opacity="0.08" stroke="${C.accent}" stroke-opacity="0.3"/>`,
    `<circle cx="${sx}" cy="${sy}" r="24" fill="${C.accent}" fill-opacity="0.16"/>`,
    `<circle cx="${sx}" cy="${sy}" r="11" fill="${C.accent}"/>`,
    `<rect x="${sx + 34}" y="${sy - 64}" width="214" height="46" rx="12" fill="${C.panel}" stroke="${C.accent}" stroke-opacity="0.6"/>`,
    label(sx + 141, sy - 33, "[ lng, lat ]", { fill: C.accent, spacing: 0.4, anchor: "middle" })
  );

  return out.join("\n  ");
}

/** One codebase in the middle, the same screen on both platforms. */
function phones() {
  const out = [];
  const w = 196;
  const h = 356;
  const y = 122;

  const phone = (x, name) => {
    out.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="${C.panel}" stroke="${C.line2}" stroke-width="1.5"/>`,
      `<rect x="${x + 68}" y="${y + 14}" width="60" height="8" rx="4" fill="${C.line2}"/>`,
      `<rect x="${x + 22}" y="${y + 48}" width="92" height="12" rx="6" fill="${C.fg3}"/>`,
      `<rect x="${x + 22}" y="${y + 76}" width="${w - 44}" height="74" rx="14" fill="${C.accent}" fill-opacity="0.92"/>`,
      `<rect x="${x + 38}" y="${y + 96}" width="64" height="9" rx="4.5" fill="${C.accentInk}" fill-opacity="0.55"/>`,
      `<rect x="${x + 38}" y="${y + 116}" width="104" height="14" rx="7" fill="${C.accentInk}"/>`
    );
    for (let row = 0; row < 4; row += 1) {
      const ry = y + 170 + row * 42;
      out.push(
        `<rect x="${x + 22}" y="${ry}" width="${w - 44}" height="30" rx="9" fill="${C.cell}" stroke="${C.line}"/>`,
        `<rect x="${x + 34}" y="${ry + 10}" width="${[70, 54, 82, 60][row]}" height="9" rx="4.5" fill="${C.line2}"/>`,
        `<rect x="${x + w - 70}" y="${ry + 10}" width="36" height="9" rx="4.5" fill="${C.fg3}" fill-opacity="0.7"/>`
      );
    }
    out.push(label(x + w / 2, y + h + 34, name, { anchor: "middle", fill: C.fg2 }));
  };

  phone(204, "IOS");
  phone(800, "ANDROID");

  const cx = 600;
  const cy = y + h / 2;
  out.push(
    `<path d="M400 ${cy}H${cx - 96}M${cx + 96} ${cy}H800" stroke="${C.fg3}" stroke-width="1.5" stroke-dasharray="3 8" stroke-linecap="round"/>`,
    `<rect x="${cx - 96}" y="${cy - 42}" width="192" height="84" rx="16" fill="${C.panel}" stroke="${C.accent}" stroke-opacity="0.7"/>`,
    label(cx, cy - 6, "ONE", { anchor: "middle", fill: C.accent, size: 20 }),
    label(cx, cy + 22, "CODEBASE", { anchor: "middle", fill: C.accent, size: 20 })
  );

  return out.join("\n  ");
}

/** The first provider times out; the request lands on the second. */
function fallback() {
  const out = [];
  const w = 268;
  const h = 150;
  const y = 250;
  const boxes = [
    { x: 90, name: "PROVIDER A", state: "TIMEOUT", kind: "failed" },
    { x: 466, name: "PROVIDER B", state: "200 OK", kind: "active" },
    { x: 842, name: "PROVIDER C", state: "STANDBY", kind: "idle" },
  ];

  out.push(
    `<rect x="90" y="132" width="150" height="50" rx="25" fill="${C.cell}" stroke="${C.line2}"/>`,
    label(165, 164, "REQUEST", { anchor: "middle", fill: C.fg2, size: 19 }),
    `<path d="M165 182V${y}" stroke="${C.fg3}" stroke-width="1.5"/>`,
    `<path d="M${90 + w / 2 + 40} ${y}C${90 + w / 2 + 40} 170 ${466 + w / 2} 170 ${466 + w / 2} ${y - 8}" fill="none" stroke="${C.accent}" stroke-width="2"/>`,
    `<path d="M${466 + w / 2 - 8} ${y - 20}l8 12 8-12" fill="none" stroke="${C.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    label(410, 162, "RETRY", { anchor: "middle", fill: C.accent, size: 19 })
  );

  for (const box of boxes) {
    const active = box.kind === "active";
    const failed = box.kind === "failed";
    out.push(
      `<rect x="${box.x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${active ? C.accent : C.panel}" fill-opacity="${active ? 0.1 : 1}" stroke="${active ? C.accent : C.line2}" stroke-width="1.5"${failed ? ' stroke-dasharray="6 7"' : ""}/>`,
      label(box.x + 26, y + 52, box.name, { fill: active ? C.fg : C.fg2 }),
      `<rect x="${box.x + 26}" y="${y + 84}" width="${box.state.length * 13 + 34}" height="40" rx="20" fill="${active ? C.accent : C.cell}" stroke="${active ? C.accent : C.line2}"/>`,
      label(box.x + 43, y + 111, box.state, { fill: active ? C.accentInk : C.fg3, size: 18, spacing: 1 })
    );
  }

  out.push(
    `<path d="M${842 - 108} ${y + h / 2}h100" stroke="${C.line2}" stroke-width="1.5" stroke-dasharray="3 8" stroke-linecap="round"/>`
  );

  return out.join("\n  ");
}

/** Every answer picks the next question; one route is taken. */
function branching() {
  const levels = [
    { x: 130, ys: [315] },
    { x: 365, ys: [215, 415] },
    { x: 600, ys: [150, 290, 430] },
    { x: 835, ys: [215, 365] },
    { x: 1070, ys: [290] },
  ];
  const route = [0, 0, 1, 1, 0];
  const out = [];

  levels.forEach((level, i) => {
    const next = levels[i + 1];
    if (!next) return;
    level.ys.forEach((y, a) => {
      next.ys.forEach((ny, b) => {
        if (Math.abs(a - b) > 1 && level.ys.length > 1) return;
        const onRoute = route[i] === a && route[i + 1] === b;
        const mid = (level.x + next.x) / 2;
        out.push(
          `<path d="M${level.x} ${y}C${mid} ${y} ${mid} ${ny} ${next.x} ${ny}" fill="none" stroke="${onRoute ? C.accent : C.line2}" stroke-width="${onRoute ? 2.5 : 1.5}"/>`
        );
      });
    });
  });

  levels.forEach((level, i) => {
    level.ys.forEach((y, a) => {
      const onRoute = route[i] === a;
      const last = i === levels.length - 1;
      if (last) {
        out.push(
          `<rect x="${level.x - 26}" y="${y - 26}" width="52" height="52" rx="12" fill="${C.accent}"/>`,
          `<path d="M${level.x - 10} ${y}l7 8 13-15" fill="none" stroke="${C.accentInk}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
        );
        return;
      }
      out.push(
        `<circle cx="${level.x}" cy="${y}" r="${onRoute ? 17 : 13}" fill="${onRoute ? C.accent : C.cell}" stroke="${onRoute ? C.accent : C.line2}" stroke-width="1.5"/>`
      );
    });
  });

  return out.join("\n  ");
}

/** States advance left to right; the jump backwards is refused. */
function statePath() {
  const out = [];
  const count = 5;
  const w = 158;
  const gap = (1020 - count * w) / (count - 1);
  const y = 300;
  const h = 70;
  const xs = Array.from({ length: count }, (_, i) => 90 + i * (w + gap));

  xs.forEach((x, i) => {
    const done = i < 3;
    out.push(
      `<rect x="${n(x)}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${done ? C.accent : C.panel}" fill-opacity="${done ? [0.28, 0.55, 0.95][i] : 1}" stroke="${done ? C.accent : C.line2}" stroke-width="1.5"/>`,
      label(n(x + w / 2), y + h / 2 + 7, `STATE ${i + 1}`, {
        anchor: "middle",
        fill: i === 2 ? C.accentInk : done ? C.fg : C.fg3,
        size: 19,
        spacing: 1,
      })
    );
    if (i < count - 1) {
      const ax = x + w;
      out.push(
        `<path d="M${n(ax + 8)} ${y + h / 2}h${n(gap - 16)}" stroke="${done && i < 2 ? C.accent : C.line2}" stroke-width="1.5"/>`,
        `<path d="M${n(ax + gap - 16)} ${y + h / 2 - 6}l8 6-8 6" fill="none" stroke="${done && i < 2 ? C.accent : C.line2}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
      );
    }
  });

  const from = xs[3] + w / 2;
  const to = xs[1] + w / 2;
  const mid = (from + to) / 2;
  out.push(
    `<path d="M${n(from)} ${y - 8}C${n(from)} 170 ${n(to)} 170 ${n(to)} ${y - 8}" fill="none" stroke="${C.fg3}" stroke-width="1.5" stroke-dasharray="5 8" stroke-linecap="round"/>`,
    `<rect x="${n(mid - 58)}" y="172" width="116" height="52" rx="26" fill="${C.bg}" stroke="${C.accent}" stroke-opacity="0.7"/>`,
    label(n(mid), 206, "409", { anchor: "middle", fill: C.accent, size: 23 })
  );

  return out.join("\n  ");
}

/* ----------------------------------------------------------- projects --- */

const projects = [
  {
    file: "dentalflow-thumb.svg",
    title: "DentalFlow",
    heading: "ROLE ACCESS LANES",
    caption: "49 endpoints · 14 models · 4 roles",
    motif: lanes,
  },
  {
    file: "healthify-thumb.svg",
    title: "Healthify",
    heading: "SUBSCRIPTION SCHEMA",
    caption: "ASP.NET Core · EF Core · PostgreSQL",
    motif: schema,
  },
  {
    file: "wanderlust-thumb.svg",
    title: "Wanderlust",
    heading: "GEOJSON DISCOVERY",
    caption: "Listings · reviews · map search",
    motif: map,
  },
  {
    file: "expense-tracker-thumb.svg",
    title: "Expense Tracker",
    heading: "ONE CODEBASE, TWO PLATFORMS",
    caption: "Expo · React Native · JWT",
    motif: phones,
  },
  {
    file: "ai-studio-thumb.svg",
    title: "AI Studio",
    heading: "PROVIDER FALLBACK",
    caption: "Retries · timeouts · graceful degradation",
    motif: fallback,
  },
  {
    file: "intellitest-thumb.svg",
    title: "IntelliTest",
    heading: "ADAPTIVE ROUTING",
    caption: "Qualification-based progression",
    motif: branching,
  },
  {
    file: "serveflow-thumb.svg",
    title: "ServeFlow",
    heading: "ORDER STATE MACHINE",
    caption: "15 tables · 18 endpoints · 3 roles",
    motif: statePath,
  },
];

function svg(project) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc(project.title)} — ${esc(project.heading.toLowerCase())} schematic">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0" r="0.9">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.1"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.1" fill="#ffffff" fill-opacity="0.06"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="90" y="60" width="13" height="13" rx="3" fill="${C.accent}"/>
  ${label(120, 75, project.heading, { fill: C.fg2 })}

  ${project.motif()}

  ${label(90, 580, project.caption, { spacing: 0.4, size: 21 })}
</svg>
`;
}

await fs.mkdir(OUT_DIR, { recursive: true });

for (const project of projects) {
  await fs.writeFile(path.join(OUT_DIR, project.file), svg(project), "utf8");
  console.log(`wrote ${project.file}`);
}
