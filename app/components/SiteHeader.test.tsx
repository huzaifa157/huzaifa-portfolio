import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SiteHeader from "./SiteHeader";

const links = [
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

/**
 * jsdom has no IntersectionObserver, so the scroll-spy tests drive the observer
 * callback by hand.
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

describe("SiteHeader", () => {
  it("renders the brand, every link, and the résumé download", () => {
    render(<SiteHeader brand="Muhammad Huzaifa" links={links} />);

    expect(screen.getByText("Muhammad Huzaifa")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();

    const resume = screen.getByRole("link", { name: /résumé/i });
    expect(resume).toHaveAttribute("href", "/resume.pdf");
    expect(resume).toHaveAttribute("download");
  });

  it("puts the logo mark inside the home link and keeps it out of the a11y tree", () => {
    const { container } = render(<SiteHeader brand="Muhammad Huzaifa" links={links} />);

    const mark = container.querySelector("[data-logo]");
    expect(mark).toBeInTheDocument();
    // Decorative here: the brand name sits right next to it.
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: "Muhammad Huzaifa" })).toContainElement(
      mark as HTMLElement
    );
  });

  it("toggles the mobile menu open and closed", async () => {
    const user = userEvent.setup();
    render(<SiteHeader brand="Test" links={links} />);

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /close navigation menu/i })
    ).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /close navigation menu/i }));
    expect(screen.getByRole("button", { name: /open navigation menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("closes the mobile menu after a link is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteHeader brand="Test" links={links} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    await user.click(screen.getByRole("link", { name: "Work" }));

    expect(screen.getByRole("button", { name: /open navigation menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("highlights the link for the section currently in view", () => {
    renderSections(["work", "contact"]);
    const intersect = stubIntersectionObserver();
    render(<SiteHeader brand="Test" links={links} />);

    const work = screen.getByRole("link", { name: "Work" });
    const contact = screen.getByRole("link", { name: "Contact" });
    expect(work).not.toHaveClass("is-active");

    intersect("work", true);
    expect(work).toHaveClass("is-active");
    expect(work).toHaveAttribute("aria-current", "location");

    intersect("work", false);
    intersect("contact", true);
    expect(contact).toHaveClass("is-active");
    expect(work).not.toHaveAttribute("aria-current");
  });

  it("renders without a scroll spy when the sections are missing", () => {
    stubIntersectionObserver();
    render(<SiteHeader brand="Test" links={links} />);

    expect(screen.getByRole("link", { name: "Work" })).not.toHaveClass("is-active");
  });
});

describe("SiteHeader command palette", () => {
  it("opens on the keyboard shortcut and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader brand="Test" links={links} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog", { name: /command palette/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens from the quick-jump button and filters as you type", async () => {
    const user = userEvent.setup();
    render(<SiteHeader brand="Test" links={links} />);

    await user.click(screen.getByRole("button", { name: /open command palette/i }));

    const input = screen.getByRole("combobox", { name: /search commands/i });
    await user.type(input, "resume");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent(/résumé/i);
  });

  it("moves the active option with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<SiteHeader brand="Test" links={links} />);

    await user.click(screen.getByRole("button", { name: /open command palette/i }));

    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");

    // Wraps backwards from the first item to the last.
    await user.keyboard("{ArrowUp}{ArrowUp}");
    const updated = screen.getAllByRole("option");
    expect(updated.at(-1)).toHaveAttribute("aria-selected", "true");
  });
});
