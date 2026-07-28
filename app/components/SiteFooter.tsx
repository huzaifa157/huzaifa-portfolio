import { profile } from "../data/portfolio";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
      </p>
      <a href="#main-content" className="back-to-top">
        Back to top ↑
      </a>
    </footer>
  );
}
