import { ImageResponse } from "next/og";
import { logoDataUri } from "./components/Logo";
import { heroMetrics, profile, signatureStack } from "./data/portfolio";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#08090c",
          backgroundImage:
            "radial-gradient(900px 420px at 12% -10%, rgba(255,92,43,0.20), transparent 70%)",
          padding: 72,
          color: "#eef1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 12,
              border: "1px solid #262d3a",
              background: "#12161d",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoDataUri({ stem: "#eef1f6", link: "#ff5c2b" })}
              width={32}
              height={32}
              alt=""
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, fontWeight: 600 }}>{profile.name}</div>
            <div style={{ fontSize: 18, color: "#a2abbb" }}>{profile.headline}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            I build production web systems that hold up under real users.
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {signatureStack.slice(0, 7).map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "1px solid #262d3a",
                  background: "#12161d",
                  color: "#a2abbb",
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
            borderTop: "1px solid #1b202a",
          }}
        >
          {heroMetrics.map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.5 }}>
                {metric.value}
              </div>
              <div style={{ fontSize: 17, color: "#69727f" }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
