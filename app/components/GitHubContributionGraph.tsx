"use client";

import { useState } from "react";

export default function GitHubContributionGraph({ username }: { username: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <div className="contribution-graph">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://ghchart.rshah.org/49d0a8/${username}`}
        alt={`${username}'s GitHub contribution graph for the past year`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
