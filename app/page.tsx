import Image from "next/image";
import Link from "next/link";
import {
  caseStudies,
  highlights,
  profile,
  skillsByCategory,
  techStack,
} from "./data/portfolio";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepo = {
  stargazers_count: number;
};

async function getGitHubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/huzaifa157", {
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/huzaifa157/repos?per_page=100", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return null;
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();
    const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      stars,
    };
  } catch {
    return null;
  }
}

export default async function Home() {
  const githubStats = await getGitHubStats();

  return (
    <main className="portfolio-page">
      <div className="bg-orb orb-left" aria-hidden="true" />
      <div className="bg-orb orb-right" aria-hidden="true" />

      <div className="portfolio-shell">
        <header className="topbar reveal">
          <p className="brand">{profile.name}</p>
          <nav aria-label="Main navigation" className="topbar-links">
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#highlights">Highlights</a>
            <a href="#education">Education</a>
            <a href="#stack">Stack</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero reveal">
          <div className="hero-grid">
            <div>
              <p className="status-pill">
                Open to software engineering Jobs (2026-2027)
              </p>
              <h1>
                Software engineer focused on building reliable full-stack
                products for high-performance teams.
              </h1>
              <p className="hero-copy">
                {profile.heroSummary}
              </p>
              <p className="hero-subcopy"> {profile.headline} | {profile.location} </p>
              <div className="hero-actions">
                <a
                  href={profile.github}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub profile
                </a>
                <a
                  href={profile.linkedin}
                  className="btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn profile
                </a>
                <a href="/resume.pdf" className="btn-secondary" download>
                  Download resume
                </a>
              </div>
            </div>

            <aside className="profile-card" aria-label="Profile card">
              <Image
                src="/huzaifa-profile.jpg"
                alt="Portrait of Muhammad Huzaifa"
                width={220}
                height={220}
                className="profile-image"
                priority
              />
              <h2>{profile.name}</h2>
              <p> Software Engineer • MERN Stack Developer • BSCS</p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                @huzaifa157
              </a>
            </aside>
          </div>
        </section>

        <section id="highlights" className="highlights reveal">
          {highlights.map((item) => (
            <article key={item.label} className="highlight-card">
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </article>
          ))}

          <article className="highlight-card">
            <p>GitHub Followers</p>
            <h3>{githubStats?.followers ?? "--"}</h3>
          </article>
          <article className="highlight-card">
            <p>Total Stars</p>
            <h3>{githubStats?.stars ?? "--"}</h3>
          </article>
          <article className="highlight-card">
            <p>Following</p>
            <h3>{githubStats?.following ?? "--"}</h3>
          </article>
        </section>

        <section id="about" className="about-grid reveal">
          <article className="panel">
            <h2>Professional summary</h2>
            <p>
              I build scalable web applications with a strong focus on clean
              architecture, API reliability, and practical product outcomes. I
              enjoy collaborating, shipping quickly, and learning deeply.
            </p>
          </article>
          <article id="education" className="panel">
            <h2>Education</h2>
            <ul>
              {profile.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section id="resume" className="resume reveal">
          <div className="section-head">
            <p>Resume Highlights</p>
            <h2>Experience snapshot for recruiter screening</h2>
          </div>
          <div className="resume-grid">
            <article className="panel">
              <h2>Programming languages</h2>
              <ul>
                {skillsByCategory.programmingLanguages.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
            <article className="panel">
              <h2>Web development</h2>
              <ul>
                {skillsByCategory.webDevelopment.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
            <article className="panel">
              <h2>Frameworks and concepts</h2>
              <ul>
                {skillsByCategory.frameworksConcepts.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
            <article className="panel">
              <h2>Databases and tools</h2>
              <ul>
                {skillsByCategory.databases.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
                {skillsByCategory.toolsPlatforms.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="projects" className="work reveal">
          <div className="section-head">
            <p>Featured projects</p>
            <h2>High-impact projects selected for portfolio review</h2>
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
                    <a
                      className="repo-link"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live demo
                    </a>
                  ) : null}
                  <a
                    className="repo-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open repository
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="projects-cta">
            <Link href="/projects" className="btn-secondary">
              View all case studies
            </Link>
          </div>
        </section>

        <section id="stack" className="stack reveal">
          <div className="section-head">
            <p>Tech stack</p>
            <h2>Technologies I use to build and ship products</h2>
          </div>
          <div className="stack-grid" aria-label="Technology stack">
            {techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="contact reveal">
          <p>Interested in jobs, collaboration, or freelance work.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn profile
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub profile
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
