/**
 * The mark: an H whose crossbar steps up as it crosses from one stem to the
 * other — a state transition drawn through a monogram. It reduces to "two bars
 * and a bridge" at 16px, so it survives a browser tab, and the step is the
 * detail that keeps it from reading as a plain letter at large sizes.
 *
 * The geometry is declared once here and consumed by both renderers: the React
 * component below (coloured by CSS) and `logoSvg()` (explicit colours, for
 * `next/og` and the generated favicon, neither of which sees a stylesheet).
 */

export const LOGO_GEOMETRY = {
  viewBox: "0 0 24 24",
  /** The two uprights. */
  stems: [
    { x: 4.5, y: 3.5, width: 3, height: 17, rx: 1.5 },
    { x: 16.5, y: 3.5, width: 3, height: 17, rx: 1.5 },
  ],
  /** The stepped crossbar, drawn as a stroke so the corners stay crisp. */
  link: "M7.5 14.5H11V9.5h5.5",
  linkWidth: 3,
} as const;

export default function Logo({
  className,
  title,
}: {
  className?: string;
  /** Pass only when the mark stands alone; beside the name it is decorative. */
  title?: string;
}) {
  return (
    <svg
      data-logo
      className={className}
      viewBox={LOGO_GEOMETRY.viewBox}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {LOGO_GEOMETRY.stems.map((stem) => (
        <rect key={stem.x} {...stem} className="logo-stem" fill="currentColor" />
      ))}
      <path
        d={LOGO_GEOMETRY.link}
        className="logo-link"
        stroke="currentColor"
        strokeWidth={LOGO_GEOMETRY.linkWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** Standalone SVG markup for contexts with no stylesheet. */
export function logoSvg({
  stem,
  link,
  size = 24,
  background,
  radius = 0,
}: {
  stem: string;
  link: string;
  size?: number;
  background?: string;
  radius?: number;
}) {
  const plate = background
    ? `<rect width="24" height="24" rx="${radius}" fill="${background}"/>`
    : "";

  const stems = LOGO_GEOMETRY.stems
    .map(
      (s) =>
        `<rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" rx="${s.rx}" fill="${stem}"/>`
    )
    .join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${LOGO_GEOMETRY.viewBox}" fill="none">` +
    plate +
    stems +
    `<path d="${LOGO_GEOMETRY.link}" stroke="${link}" stroke-width="${LOGO_GEOMETRY.linkWidth}" stroke-linecap="butt" stroke-linejoin="miter"/>` +
    `</svg>`
  );
}

/** `logoSvg` packed as a data URI, for `next/og`, which renders images not JSX SVG. */
export function logoDataUri(options: Parameters<typeof logoSvg>[0]) {
  return `data:image/svg+xml;base64,${Buffer.from(logoSvg(options)).toString("base64")}`;
}
