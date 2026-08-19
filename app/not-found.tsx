import Link from "next/link";
import { IconArrowRight } from "./components/icons";

export const metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <main className="page" id="main-content">
      <div className="shell state-page">
        <p className="mono" style={{ color: "var(--accent)" }}>
          Error 404
        </p>
        <h1>No route matched.</h1>
        <p>
          The page you are looking for does not exist or has moved. The work is
          all one click away.
        </p>
        <div className="state-actions">
          <Link className="btn btn-primary" href="/">
            Back to home
            <IconArrowRight />
          </Link>
          <Link className="btn btn-ghost" href="/projects">
            Browse case studies
          </Link>
        </div>
      </div>
    </main>
  );
}
