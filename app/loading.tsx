export default function Loading() {
  return (
    <main className="portfolio-page">
      <div className="portfolio-shell">
        <div className="topbar" aria-hidden="true">
          <div className="skeleton-line" style={{ width: "8rem", height: "1.2rem" }} />
        </div>
        <div className="hero" aria-hidden="true">
          <div className="skeleton-line" style={{ width: "60%", height: "2.4rem", marginTop: "0.5rem" }} />
          <div className="skeleton-line" style={{ width: "80%", marginTop: "1rem" }} />
          <div className="skeleton-line" style={{ width: "70%", marginTop: "0.6rem" }} />
        </div>
      </div>
    </main>
  );
}
