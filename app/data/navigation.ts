import { caseStudies, profile } from "./portfolio";

export type NavLink = {
  href: string;
  label: string;
};

export type CommandItem = {
  id: string;
  label: string;
  group: "Navigate" | "Projects" | "Open" | "Contact";
  href: string;
  icon: CommandIconKey;
  hint?: string;
  external?: boolean;
  download?: boolean;
};

export type CommandIconKey =
  | "work"
  | "principles"
  | "experience"
  | "stack"
  | "about"
  | "contact"
  | "github"
  | "linkedin"
  | "mail"
  | "phone"
  | "resume";

export const homeNavLinks: NavLink[] = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#systems", label: "Systems" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const subpageNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "All projects" },
];

/**
 * Command palette entries. Section jumps only resolve on the homepage, so they
 * point at absolute URLs with a hash and work from a case study page too.
 */
export const commandItems: CommandItem[] = [
  {
    id: "experience",
    label: "Experience",
    group: "Navigate",
    href: "/#experience",
    icon: "experience",
  },
  { id: "work", label: "Selected work", group: "Navigate", href: "/#work", icon: "work" },
  {
    id: "systems",
    label: "Systems — state machine & RBAC",
    group: "Navigate",
    href: "/#systems",
    icon: "principles",
  },
  {
    id: "approach",
    label: "Approach — rules I hold to",
    group: "Navigate",
    href: "/#approach",
    icon: "principles",
  },
  { id: "stack", label: "Tech stack", group: "Navigate", href: "/#stack", icon: "stack" },
  { id: "about", label: "About, education & certification", group: "Navigate", href: "/#about", icon: "about" },
  { id: "projects", label: "All case studies", group: "Navigate", href: "/projects", icon: "work" },
  // One entry per case study, so typing a project name jumps straight to it.
  ...caseStudies.map(
    (project): CommandItem => ({
      id: `project-${project.slug}`,
      label: `${project.title} — ${project.kicker}`,
      group: "Projects",
      href: `/projects/${project.slug}`,
      icon: "work",
    })
  ),
  {
    id: "resume",
    label: "Download résumé (PDF)",
    group: "Open",
    href: profile.resume,
    icon: "resume",
    hint: "PDF",
    download: true,
  },
  {
    id: "github",
    label: "GitHub — @" + profile.githubUsername,
    group: "Open",
    href: profile.github,
    icon: "github",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn profile",
    group: "Open",
    href: profile.linkedin,
    icon: "linkedin",
    external: true,
  },
  {
    id: "email",
    label: profile.email,
    group: "Contact",
    href: `mailto:${profile.email}`,
    icon: "mail",
    hint: "Email",
  },
  {
    id: "phone",
    label: profile.phone,
    group: "Contact",
    href: `tel:${profile.phoneHref}`,
    icon: "phone",
    hint: "Call",
  },
];
