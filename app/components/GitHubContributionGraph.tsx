"use client";

import { useState } from "react";

export default function GitHubContributionGraph({
  username,
  color,
}: {
  username: string;
  /** Hex without the leading `#` — ghchart takes it as a path segment. */
  color?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <div className="contrib">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://ghchart.rshah.org/${color ?? "ff5c2b"}/${username}`}
        alt={`${username}'s GitHub contribution graph for the past year`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
