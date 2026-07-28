import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import { profile } from "./data/portfolio";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://huzaifa-portfolio-blush.vercel.app"),
  title: "Muhammad Huzaifa | Software Engineer Portfolio",
  description:
    "Professional software engineering portfolio of Muhammad Huzaifa featuring full-stack web and mobile projects, internship experience, BSCS education, and GitHub repositories.",
  openGraph: {
    title: "Muhammad Huzaifa | Software Engineer Portfolio",
    description:
      "Full-stack web and mobile engineer portfolio with case studies, architecture notes, experience, and resume highlights.",
    type: "website",
    images: [
      {
        url: "/og/portfolio-hero.svg",
        width: 1200,
        height: 630,
        alt: "Muhammad Huzaifa Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Huzaifa | Software Engineer Portfolio",
    description:
      "Full-stack web and mobile engineer portfolio with case studies, experience, and resume highlights.",
    images: ["/og/portfolio-hero.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#090f1a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  email: profile.email,
  telephone: profile.phone,
  url: "https://huzaifa-portfolio-blush.vercel.app",
  sameAs: [profile.github, profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "Pakistan",
  },
};

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
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
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
        {children}
      </body>
    </html>
  );
}
