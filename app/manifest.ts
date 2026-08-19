import type { MetadataRoute } from "next";
import { profile } from "./data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.headline}`,
    short_name: profile.name.split(" ")[1],
    description:
      "Full-stack engineering portfolio: production case studies, architecture notes, experience, and résumé.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#08090c",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
