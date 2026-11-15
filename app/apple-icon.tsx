import { ImageResponse } from "next/og";
import { logoDataUri } from "./components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a09",
          backgroundImage:
            "radial-gradient(120px 120px at 50% 0%, rgba(200,242,75,0.2), transparent 70%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri({ stem: "#f4f2eb", link: "#c8f24b" })}
          width={124}
          height={124}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
