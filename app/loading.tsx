export default function Loading() {
  return (
    <main className="page">
      <div className="shell skeleton-stack" aria-hidden="true">
        <div className="skeleton" style={{ width: "12rem", height: "0.9rem" }} />
        <div className="skeleton" style={{ width: "80%", height: "3.2rem" }} />
        <div className="skeleton" style={{ width: "60%", height: "3.2rem" }} />
        <div className="skeleton" style={{ width: "45%", height: "1.1rem" }} />
        <div className="skeleton" style={{ width: "38%", height: "1.1rem" }} />
      </div>
      <p className="mono" style={{ textAlign: "center", color: "var(--fg-3)" }}>
        Loading
      </p>
    </main>
  );
}
