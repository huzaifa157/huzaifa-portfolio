import { ImageResponse } from "next/og";
import { logoDataUri } from "./components/Logo";
import { heroMetrics, profile, signatureStack } from "./data/portfolio";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the dark-theme tokens in globals.css; next/og sees no stylesheet.
const C = {
  bg: "#0a0a09",
  surface: "#191916",
  line: "#32322c",
  fg: "#f4f2eb",
  fg2: "#b7b4a9",
  fg3: "#858277",
  accent: "#c8f24b",
  accentInk: "#10150a",
};

/**
 * Social card. Rendered as PNG at request time so every platform can display it
 * — an SVG here would silently fail on most of them.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.bg,
          backgroundImage:
            "radial-gradient(760px 520px at 96% -8%, rgba(200,242,75,0.2), transparent 70%)",
          padding: 72,
          color: C.fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 15,
              background: C.accent,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoDataUri({ stem: C.accentInk, link: C.accentInk })}
              width={34}
              height={34}
              alt=""
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>{profile.name}</div>
            <div style={{ fontSize: 19, color: C.fg2 }}>
              {`${profile.currentRole.title} · ${profile.currentRole.company}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: -2.6,
              maxWidth: 980,
            }}
          >
            <span>Full-stack engineer turning manual operations into&nbsp;</span>
            <span style={{ color: C.accent }}>production software.</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {signatureStack.slice(0, 8).map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "7px 14px",
                  borderRadius: 9,
                  border: `1px solid ${C.line}`,
                  background: C.surface,
                  color: C.fg2,
                  fontSize: 19,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            paddingTop: 28,
            borderTop: `1px solid ${C.line}`,
          }}
        >
          {heroMetrics.map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 42, fontWeight: 600, letterSpacing: -1.6 }}>
                {metric.value}
              </div>
              <div style={{ fontSize: 17, color: C.fg3 }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
