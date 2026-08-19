# Muhammad Huzaifa — Portfolio

Personal engineering portfolio built with Next.js 16 (App Router), React 19, and
Tailwind CSS 4. Deployed on Vercel at
[huzaifa-portfolio-blush.vercel.app](https://huzaifa-portfolio-blush.vercel.app).

## Design system

The UI is a hand-built system in `app/globals.css` — no component library, no
template. It is documented at the top of that file, but in short:

- **Monochrome ink surfaces, one signal accent.** Colour marks exactly one thing
  per screen region (active nav item, live dot, primary action, hovered work
  row); everything else earns attention through type scale and whitespace.
- **Tokens** are defined once per theme on `:root` / `:root[data-theme="light"]`
  and cascade in a fixed order: `--bg → --surface → --surface-2 → --surface-3`
  for surfaces, `--fg → --fg-2 → --fg-3` for text.
- **Type**: Space Grotesk for display, Inter for body, JetBrains Mono for labels,
  indices, and metrics — all self-hosted through `next/font`.
- **The mark** is an H whose crossbar steps up as it crosses between the stems —
  a state transition drawn through a monogram. Its geometry lives once in
  `LOGO_GEOMETRY` (`app/components/Logo.tsx`) and is consumed by three
  renderers: the React component (coloured by CSS), `logoSvg()` for `next/og`,
  and `scripts/generate-favicon.mjs`. In the header it stays monochrome until
  hover, because the accent in that region belongs to the active nav item.
- **Theme** is set on `<html data-theme>` by an inline script before paint, so
  there is no flash and nothing for React to hydrate. The toggle is stateless;
  CSS picks which icon is visible.
- **Motion** is opt-in per element via `data-reveal` and driven entirely by CSS
  scroll-driven animations (`animation-timeline: view()`), guarded by `@supports`
  and `prefers-reduced-motion`. Nothing observes or mutates the DOM, so the
  reveal cannot race hydration, and browsers without scroll-driven animations
  simply render the final state.

## Structure

```
app/
  layout.tsx              root metadata, fonts, JSON-LD, theme script
  page.tsx                homepage: hero, metrics, work, principles,
                          experience, stack + GitHub, background, contact
  opengraph-image.tsx     generated PNG social card (1200x630)
  icon.tsx / apple-icon.tsx
  projects/page.tsx       case study index
  projects/[slug]/page.tsx  individual case study (statically generated)
  components/
    SiteHeader.tsx        sticky header, scroll spy, mobile menu, ⌘K trigger
    CommandPalette.tsx    ⌘K / Ctrl-K palette with subsequence search
    ScrollProgress.tsx    reading progress rule (rAF, no React renders)
    Logo.tsx              the mark — one geometry, three renderers
    CopyEmail.tsx, ThemeToggle.tsx, SiteFooter.tsx, icons.tsx
  data/
    portfolio.ts          single source of truth for all site content
    navigation.ts         nav links and command palette entries
scripts/
  generate-thumbnails.mjs regenerates public/projects/*.svg
  generate-favicon.mjs    regenerates app/favicon.ico from the mark
  shots.mjs               screenshots for design review
```

## Editing content

Everything a recruiter reads lives in `app/data/portfolio.ts`:

| Export             | Drives                                          |
| ------------------ | ----------------------------------------------- |
| `profile`          | hero, spec card, contact, footer, metadata      |
| `heroMetrics`      | the four-number band under the hero             |
| `principles`       | the "How I build" section                       |
| `experience`       | the experience timeline                         |
| `skillsByCategory` | the stack grid (labels in `skillCategoryLabels`)|
| `caseStudies`      | work rows, `/projects`, and every case study page|

A case study with `featured: true` gets a full row on the homepage; the rest
appear in the archive strip and on `/projects`. Set `github` to link a
repository, or omit it and set `repoNote` to explain why there isn't one.

The numbers in `heroMetrics` are deliberately the sums of figures that appear on
the résumé — keep them in sync so the site and the PDF never disagree in an
interview.

## Résumé

`public/resume.pdf` is exported by hand from Overleaf. To update it, overwrite
that file — the filename is referenced by `profile.resume`, the header CTA, the
command palette, and a test that asserts the file exists.

## Thumbnails

Project thumbnails are generated, not drawn:

```bash
node scripts/generate-thumbnails.mjs
```

Each 1200x630 SVG uses a schematic whose grid is dimensioned from that project's
real numbers. Edit the `projects` array in the script and re-run.

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
node scripts/shots.mjs http://localhost:4310 ./shot dark 1440 "#work,#contact"
```

> Restart `next start` after every build — an already-running server keeps
> serving asset URLs from the previous build and the page loads unstyled.

## Deployment notes

- `profile.site` in `app/data/portfolio.ts` sets `metadataBase`, the canonical
  URL, JSON-LD, and the sitemap host. Change it if the domain changes.
- GitHub stats on the homepage come from the public GitHub API, cached for one
  hour, and the section degrades to a link if the API is unavailable.
- External project links are verified by hand — re-check them if a repository is
  renamed, since a 404 in front of a recruiter is worse than no link.
