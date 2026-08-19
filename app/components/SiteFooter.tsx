import { profile } from "../data/portfolio";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>
          © {year} {profile.name}
        </p>
        <div className="footer-meta">
          <span>Next.js 16 · React 19</span>
          <span>{profile.timezone}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
