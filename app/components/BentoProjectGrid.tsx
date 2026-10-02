"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProjectCaseStudy } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";
import { IconArrowRight, IconArrowUpRight, IconGitHub, IconSparkle } from "./icons";

interface BentoProjectGridProps {
  projects: ProjectCaseStudy[];
}

type FilterCategory = "All" | "Full-Stack" | "Backend & APIs" | "Mobile / Systems";

export default function BentoProjectGrid({ projects }: BentoProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Full-Stack") {
      return (
        project.stack.includes("Next.js") ||
        project.stack.includes("Next.js 16") ||
        project.stack.includes("React.js")
      );
    }
    if (activeFilter === "Backend & APIs") {
      return (
        project.stack.includes("PostgreSQL") ||
        project.stack.includes("Express.js") ||
        project.metrics.some((m) => m.label.toLowerCase().includes("endpoint"))
      );
    }
    if (activeFilter === "Mobile / Systems") {
      return (
        project.stack.includes("React Native") ||
        project.stack.includes("React Native for Web") ||
        project.stack.includes("Docker") ||
        project.stack.includes("Expo")
      );
    }
    return true;
  });

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="shell">
        <div className="section-head" data-reveal>
          <p className="mono section-index">02 — Selected Work</p>
          <h2 className="section-title" id="work-title">
            Production systems, schemas, and live applications
          </h2>
          <p className="section-note">
            Each project features verified source code, architecture breakdowns, and live demos where deployed.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="bento-filter-bar" data-reveal role="group" aria-label="Filter case studies">
          {(["All", "Full-Stack", "Backend & APIs", "Mobile / Systems"] as FilterCategory[]).map(
            (category) => (
              <button
                key={category}
                type="button"
                className={`bento-filter-btn ${activeFilter === category ? "active" : ""}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Bento Grid */}
        <div className="bento-grid" data-reveal>
          {filteredProjects.map((project, idx) => {
            const isFlagship = project.slug === "dentalflow" && activeFilter === "All";

            return (
              <SpotlightCard
                key={project.slug}
                className={`bento-card ${isFlagship ? "bento-flagship" : ""}`}
              >
                <div className="bento-card-inner">
                  {/* Card Header & Badges */}
                  <div className="bento-header">
                    <div className="bento-meta">
                      <span className="mono bento-index">{project.index}</span>
                      <span className="bento-kicker">{project.kicker}</span>
                    </div>

                    {/* Highly visible primary action buttons */}
                    <div className="bento-actions-cluster">
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-action-primary"
                          aria-label={`View live demo for ${project.title}`}
                        >
                          <span className="live-pulse" aria-hidden="true" />
                          <span>Live Demo</span>
                          <IconArrowUpRight />
                        </a>
                      ) : null}

                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-action-secondary"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <IconGitHub />
                          <span>Code</span>
                        </a>
                      ) : (
                        <span className="badge-private">
                          {project.repoNote || "Client Project"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Title & Thesis */}
                  <div className="bento-body">
                    <h3 className="bento-title">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="bento-summary">{project.summary}</p>
                    <p className="bento-thesis">
                      <em>&ldquo;{project.thesis}&rdquo;</em>
                    </p>

                    {/* Metrics Bar */}
                    <div className="bento-metrics">
                      {project.metrics.map((m) => (
                        <div className="bento-metric-pill" key={m.label}>
                          <span className="metric-val">{m.value}</span>
                          <span className="metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack Chips */}
                    <div className="bento-stack">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span className="chip" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Media / Visual Schematic */}
                  <div className="bento-visual">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="bento-media-link"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} architectural schematic`}
                        width={600}
                        height={315}
                        className="bento-thumb"
                      />
                    </Link>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="bento-case-link"
                    >
                      <span>Read Full Architecture Case Study</span>
                      <IconArrowRight />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
