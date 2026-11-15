# Muhammad Huzaifa — Portfolio

Personal engineering portfolio built with Next.js 16 (App Router), React 19, and
Tailwind CSS 4. Deployed on Vercel at
[huzaifa-portfolio-blush.vercel.app](https://huzaifa-portfolio-blush.vercel.app).

## Design system

The UI is a hand-built system in `app/globals.css` — no component library, no
template. It is documented at the top of that file, but in short:

- **Warm ink surfaces, one signal accent.** Lime marks what is live, what is
  selected, and the one primary action in a region; everything else earns
  attention through type scale and whitespace.
- **Tokens** are defined once per theme on `:root` / `:root[data-theme="light"]`
  and cascade in a fixed order: `--bg → --surface → --surface-2 → --surface-3`
  for surfaces, `--fg → --fg-2 → --fg-3` for text. The accent is split into
  `--accent` (ink: text and strokes) and `--accent-bg` / `--accent-fg` (fills),
  because lime text is unreadable on paper — in the light theme the emphasised
  phrase becomes a highlighter stroke behind dark text instead.
- **Type**: Geist for everything you read, Instrument Serif italic for the one
  emphasised phrase inside a display heading (any `<em>` in an `h1`/`h2`), and
  Geist Mono for labels, indices, and numbers — all self-hosted through
  `next/font`.
- **The mark** is an H whose crossbar steps up as it crosses between the stems —
  a state transition drawn through a monogram. Its geometry lives once in
  `LOGO_GEOMETRY` (`app/components/Logo.tsx`) and is consumed by three
  renderers: the React component (coloured by CSS), `logoSvg()` for `next/og`,
  and `scripts/generate-favicon.mjs`.
- **Theme** is set on `<html data-theme>` by an inline script before paint, so
  there is no flash and nothing for React to hydrate. The toggle is stateless;
  CSS picks which icon is visible.
- **Motion** is CSS-only, so it can never race hydration. `.rise` plays once on
  load, staggered by `--i`, for the hero; `data-reveal` is scroll-driven
  (`animation-timeline: view()`) for everything below it. Both sit behind
  `prefers-reduced-motion`, and browsers without scroll-driven animations simply
  render the final state.

## Structure

```
app/
  layout.tsx              root metadata, fonts, JSON-LD, theme script
  page.tsx                homepage: hero + "now building" card, metrics,
                          experience, work, systems, approach, stack + GitHub,
                          about, contact
  opengraph-image.tsx     generated PNG social card (1200x630)
  icon.tsx / apple-icon.tsx
  projects/page.tsx       case study index
  projects/[slug]/page.tsx  individual case study (statically generated)
  components/
    SiteHeader.tsx        sticky header, scroll spy, mobile menu, ⌘K trigger
    CommandPalette.tsx    ⌘K / Ctrl-K palette with subsequence search
    ScrollProgress.tsx    reading progress rule (rAF, no React renders)
    ProjectShowcase.tsx   featured project cards, the "more projects" list,
                          and ProjectMedia (screenshot-in-browser or artwork)
    SystemArchitectureExplorer.tsx  interactive state machine + RBAC tabs
    InteractiveTechStack.tsx        skills list with a "used in" inspector
    SpotlightCard.tsx     pointer-following glow, gated entirely in CSS
    LocalTime.tsx         live clock in the profile's time zone
    Logo.tsx              the mark — one geometry, three renderers
    CopyEmail.tsx, ThemeToggle.tsx, SiteFooter.tsx, icons.tsx
  data/
    portfolio.ts          single source of truth for all site content
    navigation.ts         nav links and command palette entries
scripts/
  generate-thumbnails.mjs regenerates public/projects/*-thumb.svg
  capture-screens.mjs     re-captures product screenshots from live demos
  generate-favicon.mjs    regenerates app/favicon.ico from the mark
  shots.mjs               screenshots for design review
```

## Editing content

Everything a recruiter reads lives in `app/data/portfolio.ts`:

| Export             | Drives                                              |
| ------------------ | --------------------------------------------------- |
| `profile`          | hero, about, contact, footer, metadata, JSON-LD     |
| `nowBuilding`      | the "now building" card and its pipeline in the hero|
| `heroMetrics`      | the four-number band under the hero                 |
| `experience`       | the experience section                              |
| `caseStudies`      | project cards, `/projects`, every case study page   |
| `principles`       | the "Approach" section                              |
| `skillsByCategory` | the stack list (labels in `skillCategoryLabels`)    |
| `skillProof`       | the "used in" inspector beside the stack            |

A case study with `featured: true` gets a card on the homepage (the first one
runs full width); the rest appear in the "more projects" list and on
`/projects`. Set `github` to link a repository, or omit it and set `repoNote`
to explain why there isn't one. Add a `screenshot` to show the real product in
a browser frame instead of the generated artwork.

Each experience bullet is split into `lead` and `rest`, mirroring the bolded
first clause of the bullet on the résumé — the site renders `lead` in the
stronger weight so a recruiter can skim the left edge.

The résumé is the source of truth. Every number in `heroMetrics`, every date in
`experience`, and every item in `skillsByCategory` appears on the PDF — keep
them in sync so the site and the résumé never disagree in an interview.

## Résumé

`public/resume.pdf` is exported by hand from Overleaf. To update it, overwrite
that file — the filename is referenced by `profile.resume`, the header CTA, the
command palette, and a test that asserts the file exists.

## Project imagery

Project artwork is generated, not drawn:

```bash
node scripts/generate-thumbnails.mjs
```

Each 1200x630 SVG is a schematic of the idea its case study is about (role
lanes, a schema, a fallback chain). Edit the `projects` array or a motif
function in the script and re-run.

Projects with a public demo can show the real thing instead:

```bash
node scripts/capture-screens.mjs
```

This saves a 2x screenshot into `public/projects`; reference it from the case
study's `screenshot` field.

## Logo

The mark is generated everywhere it appears, so it can never drift between
contexts. After changing `LOGO_GEOMETRY`, regenerate the one raster artefact:

```bash
node scripts/generate-favicon.mjs
```

`/icon`, `/apple-icon`, and the social card re-render from the geometry on the
next build — only `app/favicon.ico` is a checked-in binary, because bare
`/favicon.ico` requests bypass the declared <link>.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # vitest: data integrity + header/palette behaviour
npm run lint
npm run build        # verifies typing, static generation, and OG rendering
```

Design review screenshots (server must be running):

```bash
npm run build && npx next start -p 4310
node scripts/shots.mjs http://localhost:4310 ./shot dark 1440          # one frame per viewport
node scripts/shots.mjs http://localhost:4310 ./shot light 390 "#work"  # specific elements
```

> Restart `next start` after every build — an already-running server keeps
> serving asset URLs from the previous build and the page loads unstyled.

## Deployment notes

- `profile.site` in `app/data/portfolio.ts` sets `metadataBase`, the canonical
  URL, JSON-LD, and the sitemap host. Change it if the domain changes.
- The public repository count comes from the GitHub API, cached for one hour;
  if the API is unavailable the count is simply omitted.
- External project links are verified by hand — re-check them if a repository is
  renamed, since a 404 in front of a recruiter is worse than no link.
