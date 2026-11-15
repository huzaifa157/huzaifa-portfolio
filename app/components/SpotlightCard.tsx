"use client";

import { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * A card with a soft glow that follows the pointer. The component only reports
 * where the pointer is; whether the glow shows at all is decided in CSS, behind
 * `(hover: hover) and (pointer: fine)` and `prefers-reduced-motion` — so there
 * is no client state to hydrate and nothing to flash on touch devices.
 */
export default function SpotlightCard({
  children,
  className = "",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      <div className="spotlight-glow" aria-hidden="true" />
      <div className="spotlight-content">{children}</div>
    </div>
  );
}
