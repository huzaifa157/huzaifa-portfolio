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

      <section className="hero">
        <div className="shell">
          <p className="mono section-index" data-reveal>
            Index — {String(caseStudies.length).padStart(2, "0")} projects
          </p>
          <h1
            className="display page-title"
            data-reveal
          >
            Every project, with the reasoning attached.
          </h1>
          <p className="hero-lede" data-reveal>
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
                <div className="index-card-shot">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} — ${project.kicker}`}
                    width={1200}
                    height={630}
                  />
                </div>
                <p className="work-kicker">{project.kicker}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="chips">
                  {project.stack.slice(0, 5).map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="link-inline">
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
