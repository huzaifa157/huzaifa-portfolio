"use client";

import { useSyncExternalStore } from "react";

// Re-checks twice a minute; the snapshot is a "HH:MM" string, so React only
// re-renders when the minute actually changes.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

const readServerTime = () => null;

/**
 * The current wall-clock time in a given zone. The server cannot know it, so it
 * renders the fallback and the client swaps the real time in after hydration —
 * `useSyncExternalStore` makes that a supported difference, not a mismatch.
 */
export default function LocalTime({
  timeZone,
  fallback,
}: {
  timeZone: string;
  fallback: string;
}) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()),
    readServerTime
  );

  if (!time) {
    return <span className="local-time">{fallback}</span>;
  }

  return (
    <span className="local-time">
      <time>{time}</time> local time
    </span>
  );
}
