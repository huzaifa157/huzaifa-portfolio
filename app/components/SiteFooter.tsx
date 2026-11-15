import { profile } from "../data/portfolio";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>
          © {year} {profile.name} · Built with Next.js 16 and React 19
        </p>
        <div className="footer-meta">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
