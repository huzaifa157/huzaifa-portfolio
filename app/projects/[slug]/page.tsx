import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconGitHub,
} from "../../components/icons";
import { subpageNavLinks } from "../../data/navigation";
import { caseStudies, profile } from "../../data/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — ${project.kicker}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.kicker}`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = caseStudies.findIndex((item) => item.slug === project.slug);
  const nextProject = caseStudies[(currentIndex + 1) % caseStudies.length];

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    author: { "@type": "Person", name: profile.name, url: profile.site },
    programmingLanguage: project.stack.join(", "),
    ...(project.github ? { codeRepository: project.github } : {}),
  };

  return (
    <main className="page" id="main-content">
      <SiteHeader
        brand={profile.name}
        brandSub={project.title}
        links={subpageNavLinks}
        resumeHref={profile.resume}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <article>
        <section className="case-hero">
          <div className="shell">
            <Link className="back-link" href="/projects">
              <IconArrowLeft />
              All case studies
            </Link>

            <p className="mono section-index" style={{ marginTop: "1.6rem" }}>
              {project.index} — {project.timeline}
            </p>
            <h1>{project.title}</h1>
            <p className="case-kicker">{project.kicker}</p>

            <p className="case-thesis">{project.thesis}</p>

            <dl className="case-facts">
              <div className="case-fact">
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="case-fact">
                <dt>Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
              <div className="case-fact">
                <dt>Source</dt>
                <dd>
                  {project.github ? (
                    <a
                      className="link-inline"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconGitHub />
                      Repository
                    </a>
                  ) : (
                    project.repoNote ?? "Private repository"
                  )}
                </dd>
              </div>
              {project.live ? (
                <div className="case-fact">
                  <dt>Live</dt>
                  <dd>
                    <a
                      className="link-inline"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open demo
                      <IconArrowUpRight />
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="case-shot">
              <Image
                src={project.thumbnail}
                alt={`${project.title} — ${project.kicker}`}
                width={1200}
                height={630}
                priority
              />
            </div>
          </div>
        </section>

        <section className="shell">
          <div className="case-body">
            <h2>Overview</h2>
            <p>{project.summary}</p>
          </div>

          <div className="case-body">
            <h2>The constraint</h2>
            <p>{project.challenge}</p>
          </div>

          <div className="case-body">
            <h2>By the numbers</h2>
            <div className="case-metrics">
              {project.metrics.map((metric) => (
                <div className="case-metric" key={metric.label}>
                  <b>{metric.value}</b>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="case-body">
            <h2>Implementation</h2>
            <ol className="case-list">
              {project.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="case-body">
            <h2>Architecture</h2>
            <ul className="case-list plain">
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-body">
            <h2>Outcome</h2>
            <ul className="case-list plain">
              {project.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-body">
            <h2>Stack</h2>
            <div className="chips" style={{ marginTop: 0 }}>
              {project.stack.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="case-next">
            <Link href={`/projects/${nextProject.slug}`}>
              <p className="case-next-label">Next case study</p>
              <h3>{nextProject.title}</h3>
            </Link>
            <Link className="btn btn-ghost" href={`/projects/${nextProject.slug}`}>
              Continue
              <IconArrowRight />
            </Link>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
