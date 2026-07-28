import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muhammad Huzaifa | Software Engineer Portfolio",
    short_name: "Huzaifa Portfolio",
    description:
      "Software engineering portfolio of Muhammad Huzaifa featuring full-stack web and mobile projects, experience, and resume.",
    start_url: "/",
    display: "standalone",
    background_color: "#090f1a",
    theme_color: "#090f1a",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
