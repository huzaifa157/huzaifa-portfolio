"use client";

export default function ThemeToggle() {
  function toggle() {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      <span className="theme-icon icon-sun" aria-hidden="true">
        ☀️
      </span>
      <span className="theme-icon icon-moon" aria-hidden="true">
        🌙
      </span>
    </button>
  );
}
