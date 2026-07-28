import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import { caseStudies } from "../data/portfolio";

export const metadata = {
  title: "Projects | Muhammad Huzaifa",
  description: "Case studies of full-stack projects by Muhammad Huzaifa.",
};

const navLinks = [{ href: "/", label: "Home" }];

export default function ProjectsPage() {
  return (
    <main className="portfolio-page projects-page" id="main-content">
      <div className="portfolio-shell">
        <SiteNav brand="Projects" links={navLinks} />

        <section className="work">
          <div className="section-head">
            <p>Case Studies</p>
            <h2>Engineering projects with architecture and delivery details</h2>
          </div>

          <div className="work-grid">
            {caseStudies.map((project) => (
              <article className="project-card" key={project.slug}>
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} project thumbnail`}
                  width={1200}
                  height={630}
                  className="project-thumb"
                />
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row" aria-label={`${project.title} stack`}>
                  {project.stack.slice(0, 6).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="project-links">
                  <Link className="repo-link" href={`/projects/${project.slug}`}>
                    Read case study
                  </Link>
                  {project.live ? (
                    <a className="repo-link" href={project.live} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  ) : null}
                  <a className="repo-link" href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
