import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import ScrollProgress from "./components/ScrollProgress";
import { profile } from "./data/portfolio";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Italic only: the serif appears solely as the emphasised phrase in a heading.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.headline}`;
const description =
  "Full-stack software engineer at Super Auto, shipping production apps in insurance, healthcare, subscription commerce, and travel — React, Next.js, Node.js, ASP.NET Core, PostgreSQL, MongoDB, and LLM-powered features.";

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
    "full-stack software engineer",
    "React",
    "Next.js",
    "Node.js",
    "ASP.NET Core",
    "PostgreSQL",
    "MongoDB",
    "TypeScript",
    "LLM integration",
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
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
  worksFor: {
    "@type": "Organization",
    name: profile.currentRole.company,
    url: profile.currentRole.url,
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Full-stack web development",
    "REST API design",
    "Role-based access control",
    "PostgreSQL",
    "MongoDB",
    "Next.js",
    "ASP.NET Core",
    "LLM API integration",
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
      className={`${geist.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
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
