type IconProps = { className?: string };

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const solid = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
};

export function IconGitHub({ className }: IconProps) {
  return (
    <svg {...solid} className={className}>
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.51v-1.98c-2.93.64-3.55-1.24-3.55-1.24-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.08-2.82-.11-.27-.47-1.35.1-2.82 0 0 .88-.28 2.88 1.08a10 10 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.47.21 2.55.1 2.82.67.73 1.08 1.67 1.08 2.82 0 4.04-2.47 4.92-4.82 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg {...solid} className={className}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94Z" />
      <path d="M20.44 20.5h-3.38v-6.32c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33v6.43H9.16V8.5h3.24v1.64h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.19v6.92Z" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3v12" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function IconArrowLeft({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconSun({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function IconCopy({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconRepo({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v16H7.5A2.5 2.5 0 0 0 5 20.5Z" />
      <path d="M19 18v4H7.5A2.5 2.5 0 0 1 5 19.5" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3.5l2.7 5.6 6.1.7-4.5 4.2 1.2 6.1-5.5-3-5.5 3 1.2-6.1L3.2 9.8l6.1-.7z" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M16 21v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V21" />
      <circle cx="9" cy="8" r="3.5" />
      <path d="M22 21v-1.5a4 4 0 0 0-3-3.87" />
      <path d="M15.5 4.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconUserPlus({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M13 21v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V21" />
      <circle cx="7.5" cy="8" r="3.5" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

export function IconTerminal({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 10 2.5 2L7 14" />
      <path d="M13 15h4" />
    </svg>
  );
}

export function IconLayers({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </svg>
  );
}

export function IconBriefcase({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <rect x="2.5" y="7" width="19" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A2 2 0 0 1 10.5 3.5h3a2 2 0 0 1 2 2V7" />
      <path d="M2.5 12.5h19" />
    </svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
    </svg>
  );
}

export function IconGraduation({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z" />
      <path d="M6.5 10.8V15c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.2" />
      <path d="M21 8.5V14" />
    </svg>
  );
}
