"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CommandIconKey, CommandItem } from "../data/navigation";
import { commandItems } from "../data/navigation";
import {
  IconArrowUpRight,
  IconBriefcase,
  IconDownload,
  IconGitHub,
  IconGraduation,
  IconLayers,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconSearch,
  IconSparkle,
  IconTerminal,
} from "./icons";

const iconFor: Record<
  CommandIconKey,
  (props: { className?: string }) => React.ReactElement
> = {
  work: IconTerminal,
  principles: IconSparkle,
  experience: IconBriefcase,
  stack: IconLayers,
  about: IconGraduation,
  contact: IconMail,
  github: IconGitHub,
  linkedin: IconLinkedIn,
  mail: IconMail,
  phone: IconPhone,
  resume: IconDownload,
};

const groupOrder: CommandItem["group"][] = ["Navigate", "Open", "Contact"];

/** Lowercases and strips diacritics, so typing "resume" finds "résumé". */
function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function matches(item: CommandItem, query: string) {
  if (!query) return true;
  const haystack = fold(`${item.label} ${item.group} ${item.hint ?? ""}`);
  // Subsequence match, so "cs" finds "Case studies" the way an editor palette would.
  let cursor = 0;
  for (const char of fold(query)) {
    if (char === " ") continue;
    cursor = haystack.indexOf(char, cursor);
    if (cursor === -1) return false;
    cursor += 1;
  }
  return true;
}

/**
 * Mounted only while open, so every launch starts with an empty query and the
 * first result selected — no reset effect needed.
 */
export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => commandItems.filter((item) => matches(item, query)),
    [query]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Freeze the page behind the overlay while it is up.
  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previousOverflow;
    };
  }, []);

  function activate(item: CommandItem) {
    onClose();

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.download) {
      const link = document.createElement("a");
      link.href = item.href;
      link.download = "";
      link.click();
      return;
    }

    window.location.assign(item.href);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;

      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = (activeIndex + delta + results.length) % results.length;
      setActiveIndex(next);
      listRef.current
        ?.querySelectorAll<HTMLElement>("[data-cmdk-item]")
        [next]?.scrollIntoView?.({ block: "nearest" });
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) activate(item);
    }
  }

  return (
    <div
      className="cmdk-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
      >
        <div className="cmdk-input-row">
          <IconSearch />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Jump to a section, project, or contact…"
            aria-label="Search commands"
            aria-controls={listId}
            aria-expanded="true"
            role="combobox"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="cmdk-list" id={listId} role="listbox" ref={listRef}>
          {results.length === 0 ? (
            <p className="cmdk-empty">No matches. Try “resume”, “work”, or “email”.</p>
          ) : (
            groupOrder.map((group) => {
              const groupItems = results.filter((item) => item.group === group);
              if (groupItems.length === 0) return null;

              return (
                <div key={group}>
                  <p className="cmdk-group">{group}</p>
                  {groupItems.map((item) => {
                    const index = results.indexOf(item);
                    const Icon = iconFor[item.icon];

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-cmdk-item
                        data-active={index === activeIndex}
                        className="cmdk-item"
                        role="option"
                        aria-selected={index === activeIndex}
                        onMouseMove={() => setActiveIndex(index)}
                        onClick={() => activate(item)}
                      >
                        <Icon />
                        <span>{item.label}</span>
                        {item.hint ? <span className="hint">{item.hint}</span> : null}
                        {item.external ? <IconArrowUpRight className="hint" /> : null}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="cmdk-foot">
          <span>
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> navigate
          </span>
          <span>
            <kbd className="kbd">↵</kbd> open
          </span>
          <span>
            <kbd className="kbd">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
