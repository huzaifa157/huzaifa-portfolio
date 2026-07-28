import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import { caseStudies } from "../../data/portfolio";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "All Projects" },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Muhammad Huzaifa",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Muhammad Huzaifa`,
      description: project.summary,
      type: "article",
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: `${project.title} thumbnail`,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="portfolio-page case-study-page" id="main-content">
      <div className="portfolio-shell">
        <SiteNav brand={project.title} links={navLinks} />

        <article className="case-study">
          <section className="case-hero">
            <p className="status-pill">Case Study</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <Image
              src={project.thumbnail}
              alt={`${project.title} project thumbnail`}
              width={1200}
              height={630}
              className="project-thumb case-thumb"
            />
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">
                GitHub Repository
              </a>
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="btn-secondary">
                  Live Demo
                </a>
              ) : null}
            </div>
          </section>

          <section className="case-block">
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </section>

          <section className="case-block">
            <h2>Implementation</h2>
            <ul>
              {project.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="case-block">
            <h2>Architecture</h2>
            <ul>
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="case-block">
            <h2>Impact</h2>
            <ul>
              {project.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="case-block">
            <h2>Technology Stack</h2>
            <div className="tag-row" aria-label={`${project.title} stack`}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}
