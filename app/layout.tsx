import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
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
    "Professional software engineering portfolio of Muhammad Huzaifa featuring MERN projects, BSCS education, and GitHub repositories.",
  openGraph: {
    title: "Muhammad Huzaifa | Software Engineer Portfolio",
    description:
      "MERN stack software engineer portfolio with case studies, architecture notes, and resume highlights.",
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
      "MERN stack software engineer portfolio with case studies and resume highlights.",
    images: ["/og/portfolio-hero.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
