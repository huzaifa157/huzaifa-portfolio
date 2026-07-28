"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

// Only the slice of the viewport around the middle counts as "current", so the
// highlight moves once a section actually takes over the screen.
const ACTIVE_BAND = "-45% 0px -50% 0px";

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

        // Last match in document order wins, so a nested section (#education
        // inside #about) beats its container.
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

export default function SiteNav({
  brand,
  links,
}: {
  brand: string;
  links: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(links);

  return (
    <header className="topbar reveal">
      <div className="topbar-row">
        <p className="brand">{brand}</p>
        <div className="topbar-toggles">
          <ThemeToggle />
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav-links"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span />
          </button>
        </div>
      </div>
      <nav
        id="site-nav-links"
        aria-label="Main navigation"
        className={`topbar-links${open ? " is-open" : ""}`}
      >
        {links.map((link) => {
          const isActive = activeId !== "" && link.href === `#${activeId}`;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "location" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
