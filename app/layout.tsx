import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import ScrollProgress from "./components/ScrollProgress";
import { profile } from "./data/portfolio";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.headline}`;
const description =
  "Full-stack engineer building production web systems with Next.js, Node, PostgreSQL, and MongoDB. Case studies, architecture notes, experience, and résumé.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "full-stack engineer",
    "software engineer portfolio",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "TypeScript",
    "Muhammad Huzaifa",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: profile.site,
    siteName: `${profile.name} — Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: profile.site,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Full-stack web development",
    "REST API design",
    "Role-based access control",
    "PostgreSQL",
    "MongoDB",
    "Next.js",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "UBIT, University of Karachi",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
};

// Runs before paint so the first frame is already in the stored theme.
const themeInitScript = `
  (function () {
    try {
      var stored = window.localStorage.getItem("theme");
      var theme = stored === "light" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      id="top"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
