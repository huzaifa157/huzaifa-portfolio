import { ImageResponse } from "next/og";
import { logoDataUri } from "./components/Logo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Accent plate, dark mark — the highest-contrast pairing in a tab strip. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff5c2b",
          borderRadius: 7,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri({ stem: "#0a0b0d", link: "#0a0b0d" })}
          width={26}
          height={26}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
