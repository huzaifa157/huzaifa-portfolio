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
          background: "#08090c",
          backgroundImage:
            "radial-gradient(120px 120px at 50% 0%, rgba(255,92,43,0.22), transparent 70%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri({ stem: "#eef1f6", link: "#ff5c2b" })}
          width={124}
          height={124}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
