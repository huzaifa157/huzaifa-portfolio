"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrowUpRight, IconCheck, IconLayers } from "./icons";

interface InteractiveTechStackProps {
  skillsByCategory: Record<string, string[]>;
  skillCategoryLabels: Record<string, string>;
}

// Production mapping connecting individual technologies to real portfolio projects
const techProvenance: Record<
  string,
  { project: string; slug: string; note: string }
> = {
  "MongoDB": {
    project: "DentalFlow",
    slug: "dentalflow",
    note: "14 models managing appointments, medical records, invoices, and multi-branch operations.",
  },
  "Next.js": {
    project: "DentalFlow",
    slug: "dentalflow",
    note: "Multi-branch clinic dashboards rendered per role, with data access scoped server-side.",
  },
  "React Native for Web": {
    project: "Healthify",
    slug: "healthify",
    note: "Cross-platform D2C meal subscription platform sharing components across mobile web and desktop.",
  },
  "React.js": {
    project: "DentalFlow & Healthify",
    slug: "dentalflow",
    note: "Component architecture powering clinic management and conversion-oriented meal subscriptions.",
  },
  "React Native": {
    project: "Expense Tracker",
    slug: "expense-tracker",
    note: "Cross-platform mobile application with AsyncStorage persisted session recovery.",
  },
  "NativeWind": {
    project: "Expense Tracker",
    slug: "expense-tracker",
    note: "Utility-first mobile styling with Tailwind CSS primitives compiled for React Native.",
  },
  "Node.js": {
    project: "DentalFlow & Wanderlust",
    slug: "dentalflow",
    note: "Backend REST services handling scheduling, authentication, and state management.",
  },
  "Express.js": {
    project: "DentalFlow & Wanderlust",
    slug: "dentalflow",
    note: "Layered architecture separating controllers, services, and route validation.",
  },
  "ASP.NET Core": {
    project: "Independent Client Systems",
    slug: "dentalflow",
    note: "Typed REST APIs with dependency injection, middleware pipelines, and Entity Framework Core.",
  },
  "C#": {
    project: "Enterprise Backends",
    slug: "dentalflow",
    note: "Object-oriented backend services, data modeling, and typed service architectures.",
  },
  "Entity Framework Core": {
    project: "Backend Systems",
    slug: "serveflow",
    note: "Object-relational mapping, database migrations, and LINQ database queries.",
  },
  "JWT": {
    project: "DentalFlow",
    slug: "dentalflow",
    note: "Server-side role tokens enforced across 4 clinic dashboards (Patient, Doctor, Receptionist, Admin).",
  },
  "Authentication & RBAC": {
    project: "DentalFlow",
    slug: "dentalflow",
    note: "Role-based access tiers protecting clinical records, appointments, and billing endpoints.",
  },
  "Recharts": {
    project: "DentalFlow",
    slug: "dentalflow",
    note: "Analytics dashboards for multi-branch clinic revenue, patient growth, and doctor performance.",
  },
  "Tailwind CSS": {
    project: "Healthify & DentalFlow",
    slug: "healthify",
    note: "Responsive cross-platform design system tailored for UAE market and clinical interfaces.",
  },
  "TypeScript": {
    project: "DentalFlow & Healthify",
    slug: "healthify",
    note: "Strict typing across database models, API contracts, and nutritional calculator schemas.",
  },
  "PostgreSQL": {
    project: "ServeFlow",
    slug: "serveflow",
    note: "Relational database schema with line-item pricing snapshots and staff audit tables.",
  },
  "Prisma": {
    project: "ServeFlow",
    slug: "serveflow",
    note: "Prisma ORM typed queries, relations, and transactional state updates.",
  },
  "Docker": {
    project: "ServeFlow",
    slug: "serveflow",
    note: "Containerized deployment with multi-stage builds and GitHub Actions CI gating.",
  },
  "LLM APIs": {
    project: "AI Studio",
    slug: "ai-studio",
    note: "Generative AI API integrations with token optimization, multi-provider fallbacks, and retry logic.",
  },
  "AI Integration": {
    project: "AI Studio",
    slug: "ai-studio",
    note: "Connecting AI models to web applications with resilient timeout controls and streaming pipelines.",
  },
  "AWS": {
    project: "Cloud Deployments",
    slug: "dentalflow",
    note: "Cloud hosting, asset storage, and serverless application deployment configurations.",
  },
  "Vercel": {
    project: "DentalFlow & Healthify",
    slug: "dentalflow",
    note: "Production edge deployments with automated preview branches and optimized image delivery.",
  },
  "API Design": {
    project: "DentalFlow",
    slug: "dentalflow",
    note: "RESTful resource design, consistent HTTP status codes, and validated response schemas.",
  },
  "Database Design": {
    project: "DentalFlow & ServeFlow",
    slug: "dentalflow",
    note: "Relational table schemas, document collections, indexing, and referential integrity.",
  },
  "Git": {
    project: "All Projects",
    slug: "dentalflow",
    note: "Branch workflows, atomic commits, pull requests, and version control best practices.",
  },
};

export default function InteractiveTechStack({
  skillsByCategory,
  skillCategoryLabels,
}: InteractiveTechStackProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTech, setActiveTech] = useState<string>("MongoDB");

  const categories = Object.keys(skillsByCategory);
  const activeProvenance = techProvenance[activeTech];

  return (
    <div className="tech-matrix-wrapper" data-reveal>
      {/* Category Filter Pills */}
      <div className="tech-cat-filter" role="group" aria-label="Filter tech stack categories">
        <button
          type="button"
          className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          All Domains
        </button>
        {categories.map((catKey) => (
          <button
            key={catKey}
            type="button"
            className={`filter-btn ${selectedCategory === catKey ? "active" : ""}`}
            onClick={() => setSelectedCategory(catKey)}
          >
            {skillCategoryLabels[catKey]} ({skillsByCategory[catKey]?.length || 0})
          </button>
        ))}
      </div>

      {/* Grid of Categories and Interactive Pills */}
      <div className="tech-columns-grid">
        {categories
          .filter((catKey) => selectedCategory === "all" || selectedCategory === catKey)
          .map((catKey) => {
            const items = skillsByCategory[catKey] || [];
            return (
              <div className="tech-cat-col" key={catKey}>
                <div className="cat-col-header">
                  <h4>{skillCategoryLabels[catKey]}</h4>
                  <span className="cat-count">{String(items.length).padStart(2, "0")}</span>
                </div>

                <div className="tech-pill-list" role="list">
                  {items.map((tech) => {
                    const isSelected = activeTech === tech;
                    const hasProof = !!techProvenance[tech];

                    return (
                      <button
                        key={tech}
                        type="button"
                        className={`tech-interactive-pill ${isSelected ? "selected" : ""} ${
                          hasProof ? "has-proof" : ""
                        }`}
                        onClick={() => setActiveTech(tech)}
                        aria-pressed={isSelected}
                      >
                        <span>{tech}</span>
                        {hasProof && <span className="proof-indicator" aria-hidden="true">●</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Production Provenance Panel */}
      <div className="tech-provenance-panel" aria-live="polite">
        <div className="prov-header">
          <div className="prov-title-wrap">
            <IconLayers />
            <span className="mono prov-tag">Production Application</span>
            <span className="prov-tool-name">{activeTech}</span>
          </div>

          {activeProvenance && (
            <Link
              href={`/projects/${activeProvenance.slug}`}
              className="prov-link"
              aria-label={`View ${activeProvenance.project} case study`}
            >
              <span>{activeProvenance.project}</span>
              <IconArrowUpRight />
            </Link>
          )}
        </div>

        <p className="prov-description">
          {activeProvenance
            ? activeProvenance.note
            : `Utilized in backend and full-stack software development workflows across Muhammad Huzaifa's systems.`}
        </p>

        <div className="prov-footer">
          <span className="prov-hint">
            ● Dot indicates technology is backed by a dedicated case study and verifiable codebase.
          </span>
        </div>
      </div>
    </div>
  );
}
