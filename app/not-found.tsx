import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Muhammad Huzaifa",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="portfolio-page not-found-page">
      <div className="bg-orb orb-left" aria-hidden="true" />
      <div className="bg-orb orb-right" aria-hidden="true" />
      <div className="portfolio-shell not-found-shell">
        <p className="status-pill">404</p>
        <h1>This page wandered off the map.</h1>
        <p className="hero-copy">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Head back home or browse the project case studies instead.
        </p>
        <div className="hero-actions">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/projects" className="btn-secondary">
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}
