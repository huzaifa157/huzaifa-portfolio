"use client";

import { IconMoon, IconSun } from "./icons";

/**
 * Stateless on purpose. The current theme lives on `<html data-theme>` — set
 * before paint by the inline script in the layout — and CSS decides which of
 * the two icons is visible, so there is nothing for React to hydrate or
 * mismatch here.
 */
export default function ThemeToggle() {
  function toggle() {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);

    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Blocked storage (private mode) — the attribute still applies for this
      // session.
    }
  }

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <IconSun className="theme-icon-sun" />
      <IconMoon className="theme-icon-moon" />
    </button>
  );
}
