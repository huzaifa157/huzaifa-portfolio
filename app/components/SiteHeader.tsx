"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { NavLink } from "../data/navigation";
import CommandPalette from "./CommandPalette";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { IconClose, IconDownload, IconMenu, IconSearch } from "./icons";

// Only the middle band of the viewport counts as "current", so the highlight
// moves once a section actually takes over the screen.
const ACTIVE_BAND = "-45% 0px -50% 0px";

/*
 * The keyboard-shortcut label is the one thing here that legitimately differs
 * between server and client. `useSyncExternalStore` is the supported way to say
 * so: React renders the server snapshot during hydration and re-renders with
 * the client one straight after — no mismatch to warn about, and nothing writes
 * into DOM that React owns. The store never changes, so the subscribe callback
 * has nothing to do; both functions are module-level to keep their identities
 * stable across renders.
 */
const subscribeToNothing = () => () => {};
const readShortcutLabel = () =>
  /mac|iphone|ipad/i.test(navigator.platform ?? "") ? "⌘K" : "Ctrl K";
const readServerShortcutLabel = () => "⌘K";

function useActiveSection(links: NavLink[]) {
  const [activeId, setActiveId] = useState("");
  const hrefKey = links.map((link) => link.href).join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections = hrefKey
      .split("|")
      .filter((href) => href.startsWith("#"))
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );

    if (sections.length === 0) {
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Last match in document order wins, so a nested section beats its
        // container when both are on screen.
        const current = sections.filter((section) => visible.has(section.id)).at(-1);
        if (current) {
          setActiveId(current.id);
        }
      },
      { rootMargin: ACTIVE_BAND }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [hrefKey]);

  return activeId;
}

export default function SiteHeader({
  brand,
  brandSub,
  links,
  resumeHref = "/resume.pdf",
}: {
  brand: string;
  brandSub?: string;
  links: NavLink[];
  resumeHref?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const activeId = useActiveSection(links);
  const shortcut = useSyncExternalStore(
    subscribeToNothing,
    readShortcutLabel,
    readServerShortcutLabel
  );

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="site-header" data-stuck={stuck}>
        <div className="shell header-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">
              <Logo />
            </span>
            {brand}
            {brandSub ? <span className="brand-sub">{brandSub}</span> : null}
          </Link>

          <nav id="site-nav" aria-label="Main navigation" className="nav" data-open={menuOpen}>
            {links.map((link) => {
              const isActive = activeId !== "" && link.href === `#${activeId}`;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "location" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="cmdk-trigger"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
            >
              <IconSearch />
              <span className="cmdk-label">Quick jump</span>
              <kbd className="kbd">{shortcut}</kbd>
            </button>

            <ThemeToggle />

            <a className="header-cta" href={resumeHref} download>
              <IconDownload />
              <span>Résumé</span>
            </a>

            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {paletteOpen ? <CommandPalette onClose={() => setPaletteOpen(false)} /> : null}
    </>
  );
}
