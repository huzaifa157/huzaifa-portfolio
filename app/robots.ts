import type { MetadataRoute } from "next";
import { profile } from "./data/portfolio";

const baseUrl = profile.site;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
