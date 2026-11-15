import Image from "next/image";
import Link from "next/link";
import type { ProjectCaseStudy } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";
import { IconArrowRight, IconArrowUpRight, IconGitHub } from "./icons";

/** A real screenshot in a browser frame when there is one, artwork otherwise. */
export function ProjectMedia({
  project,
  preload = false,
  sizes,
}: {
  project: ProjectCaseStudy;
  preload?: boolean;
  sizes: string;
}) {
  if (project.screenshot) {
    return (
      <div className="browser">
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-url">{project.screenshot.url}</span>
        </div>
        <Image
          src={project.screenshot.src}
          alt={`${project.title} — screenshot of the live application`}
          width={project.screenshot.width}
          height={project.screenshot.height}
          sizes={sizes}
          preload={preload}
        />
      </div>
    );
  }

  return (
    <div className="artwork">
      <Image
        src={project.thumbnail}
        alt={`${project.title} — ${project.kicker}`}
        width={1200}
        height={630}
        preload={preload}
      />
    </div>
  );
}

function ProjectCard({
  project,
  flagship,
}: {
  project: ProjectCaseStudy;
  flagship: boolean;
}) {
  const href = `/projects/${project.slug}`;

  return (
    <SpotlightCard className={`project${flagship ? " project-flagship" : ""}`} data-reveal>
      <div className="project-inner">
        <div className="project-copy">
          <p className="project-meta">
            <span className="project-index">{project.index}</span>
            {project.kicker}
          </p>

          <h3 className="project-title">
            <Link href={href}>{project.title}</Link>
          </h3>

          <p className="project-summary">{project.summary}</p>

          <ul className="project-metrics" aria-label={`${project.title} in numbers`}>
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <b>{metric.value}</b>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>

          <div className="chips">
            {project.stack.slice(0, flagship ? 9 : 5).map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          <div className="project-actions">
            <Link className="btn btn-primary btn-sm" href={href}>
              Case study
              <IconArrowRight />
            </Link>

            {project.live ? (
              <a
                className="btn btn-ghost btn-sm"
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open the live demo of ${project.title}`}
              >
                Live demo
                <IconArrowUpRight />
              </a>
            ) : null}

            {project.github ? (
              <a
                className="btn btn-ghost btn-sm"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View the source code of ${project.title} on GitHub`}
              >
                <IconGitHub />
                Code
              </a>
            ) : (
              <span className="tag">{project.repoNote ?? "Private repository"}</span>
            )}
          </div>
        </div>

        {/* Decorative duplicate of the title link, so it stays out of the tab order. */}
        <Link className="project-media" href={href} tabIndex={-1} aria-hidden="true">
          <ProjectMedia
            project={project}
            sizes={flagship ? "(max-width: 900px) 100vw, 640px" : "(max-width: 900px) 100vw, 560px"}
          />
        </Link>
      </div>
    </SpotlightCard>
  );
}

export default function ProjectShowcase({
  featured,
  archive,
}: {
  featured: ProjectCaseStudy[];
  archive: ProjectCaseStudy[];
}) {
  return (
    <>
      <div className="project-grid">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} flagship={index === 0} />
        ))}
      </div>

      <div className="more" data-reveal>
        <div className="more-head">
          <h3 className="eyebrow">More projects</h3>
          <Link className="link-inline" href="/projects">
            All {featured.length + archive.length} case studies
            <IconArrowRight />
          </Link>
        </div>

        <ul className="more-list">
          {archive.map((project) => (
            <li key={project.slug}>
              <Link className="more-row" href={`/projects/${project.slug}`}>
                <span className="more-index">{project.index}</span>
                <span className="more-title">{project.title}</span>
                <span className="more-kicker">{project.kicker}</span>
                <span className="more-stack">{project.stack.slice(0, 3).join(" · ")}</span>
                <IconArrowUpRight />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
