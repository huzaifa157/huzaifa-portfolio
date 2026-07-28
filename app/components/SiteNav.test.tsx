import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SiteNav from "./SiteNav";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

/**
 * jsdom has no IntersectionObserver, so the scroll-spy tests drive the
 * observer callback by hand.
 */
function stubIntersectionObserver() {
  const callbacks: ObserverCallback[] = [];

  class FakeIntersectionObserver {
    constructor(callback: ObserverCallback) {
      callbacks.push(callback);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);

  return (id: string, isIntersecting: boolean) => {
    const target = document.getElementById(id);
    if (!target) throw new Error(`No element with id "${id}" in the test DOM`);

    act(() => {
      for (const callback of callbacks) {
        callback([{ target, isIntersecting } as unknown as IntersectionObserverEntry]);
      }
    });
  };
}

function renderSections(ids: string[]) {
  for (const id of ids) {
    const section = document.createElement("section");
    section.id = id;
    document.body.append(section);
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.replaceChildren();
});

describe("SiteNav", () => {
  it("renders the brand and all links", () => {
    render(<SiteNav brand="Test Brand" links={links} />);
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("toggles the mobile menu open state on click", async () => {
    const user = userEvent.setup();
    render(<SiteNav brand="Test Brand" links={links} />);

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /close navigation menu/i })).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu after a link is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteNav brand="Test Brand" links={links} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    await user.click(screen.getByRole("link", { name: "Projects" }));

    expect(screen.getByRole("button", { name: /open navigation menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("highlights the link for the section currently in view", () => {
    renderSections(["projects", "contact"]);
    const intersect = stubIntersectionObserver();
    render(<SiteNav brand="Test Brand" links={links} />);

    const projects = screen.getByRole("link", { name: "Projects" });
    const contact = screen.getByRole("link", { name: "Contact" });
    expect(projects).not.toHaveClass("is-active");

    intersect("projects", true);
    expect(projects).toHaveClass("is-active");
    expect(projects).toHaveAttribute("aria-current", "location");
    expect(contact).not.toHaveClass("is-active");

    intersect("projects", false);
    intersect("contact", true);
    expect(contact).toHaveClass("is-active");
    expect(contact).toHaveAttribute("aria-current", "location");
    expect(projects).not.toHaveAttribute("aria-current");
  });

  it("renders without a scroll spy when sections are missing", () => {
    stubIntersectionObserver();
    render(<SiteNav brand="Test Brand" links={links} />);

    expect(screen.getByRole("link", { name: "Projects" })).not.toHaveClass("is-active");
  });
});
