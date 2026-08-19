"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "./icons";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the address
      // is still on screen as a mailto link next to this button.
    }
  }

  return (
    <button
      type="button"
      className="copy-btn"
      data-copied={copied}
      onClick={copy}
      aria-label={`Copy email address ${email}`}
    >
      {copied ? <IconCheck /> : <IconCopy />}
      <span aria-live="polite">{copied ? "Copied" : email}</span>
    </button>
  );
}
