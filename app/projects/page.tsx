import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { IconArrowRight, IconArrowUpRight } from "../components/icons";
import { subpageNavLinks } from "../data/navigation";
import { caseStudies, profile } from "../data/portfolio";

export const metadata = {
  title: "Case studies",
  description:
    "Full-stack case studies by Muhammad Huzaifa — architecture, implementation decisions, and outcomes for each shipped project.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="page" id="main-content">
      <SiteHeader
        brand={profile.name}
        brandSub="Case studies"
        links={subpageNavLinks}
        resumeHref={profile.resume}
      />

      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">
            <span>{String(caseStudies.length).padStart(2, "0")}</span> Case studies
          </p>
          <h1 className="page-title">
            Every project, with the <em>reasoning attached.</em>
          </h1>
          <p className="hero-lede">
            Each entry documents the constraint that shaped the system, how it was
            implemented, and what changed once it shipped.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="shell">
          <div className="index-grid">
            {caseStudies.map((project) => (
              <Link
                className="index-card"
                key={project.slug}
                href={`/projects/${project.slug}`}
              >
                <div className="artwork">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    width={1200}
                    height={630}
                  />
                </div>
                <p className="project-meta">
                  <span className="project-index">{project.index}</span>
                  {project.kicker}
                </p>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <div className="chips">
                  {project.stack.slice(0, 5).map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="index-card-cta">
                  Read case study
                  <IconArrowRight />
                </p>
              </Link>
            ))}
          </div>

          <p className="section-outro">
            <a
              className="link-inline"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub — @{profile.githubUsername}
              <IconArrowUpRight />
            </a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
