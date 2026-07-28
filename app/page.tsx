import Image from "next/image";
import Link from "next/link";
import GitHubContributionGraph from "./components/GitHubContributionGraph";
import {
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconRepo,
  IconStar,
  IconUserPlus,
  IconUsers,
} from "./components/icons";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import {
  caseStudies,
  experience,
  highlights,
  profile,
  skillCategoryLabels,
  skillsByCategory,
  techStack,
} from "./data/portfolio";

const GITHUB_USERNAME = "huzaifa157";

const stackCategories = (
  Object.keys(skillsByCategory) as Array<keyof typeof skillsByCategory>
).map((key) => ({
  key,
  label: skillCategoryLabels[key],
  items: skillsByCategory[key],
}));

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#highlights", label: "Highlights" },
  { href: "#education", label: "Education" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

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
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
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
    <main className="portfolio-page" id="main-content">
      <div className="bg-orb orb-left" aria-hidden="true" />
      <div className="bg-orb orb-right" aria-hidden="true" />

      <div className="portfolio-shell">
        <SiteNav brand={profile.name} links={navLinks} />

        <section className="hero reveal">
          <div className="hero-grid">
            <div className="hero-main">
              <p className="status-pill">
                <span className="live-dot" aria-hidden="true" />
                Open to software engineering roles, 2026–2027
              </p>
              <h1>
                Full-stack engineer building production-grade web &amp; mobile
                products.
              </h1>
              <p className="hero-copy">{profile.heroSummary}</p>
              <p className="hero-subcopy">
                {profile.educationShort} · {profile.location}
              </p>

              <ul className="hero-stats" aria-label="Portfolio highlights">
                <li>
                  <strong>{caseStudies.length}</strong> shipped case studies
                </li>
                <li>
                  <strong>{techStack.length}+</strong> technologies
                </li>
                <li>
                  <strong>{Object.keys(skillsByCategory).length}</strong> skill areas
                </li>
              </ul>

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

              <div className="tag-row hero-tech-row" aria-label="Core technologies">
                {techStack.slice(0, 6).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <aside className="profile-card" aria-label="Profile card">
              <div className="profile-image-wrap">
                <Image
                  src="/huzaifa-profile.jpg"
                  alt="Portrait of Muhammad Huzaifa"
                  width={220}
                  height={220}
                  className="profile-image"
                  priority
                />
                <span className="availability-dot" aria-hidden="true" />
              </div>
              <h2>{profile.name}</h2>
              <p>Software Engineer • Full-Stack Web &amp; Mobile • BSCS</p>
              <div className="profile-social-row">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <IconGitHub />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <IconLinkedIn />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email Muhammad Huzaifa">
                  <IconMail />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section id="highlights" className="github-activity reveal">
          <div className="section-head github-activity-head">
            <div>
              <p>
                <span className="live-dot" aria-hidden="true" />
                Live from GitHub
              </p>
              <h2>GitHub activity, pulled fresh on every visit</h2>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="repo-link"
            >
              View full profile →
            </a>
          </div>

          {githubStats ? (
            <>
              <div className="highlights">
                <article className="highlight-card">
                  <IconRepo className="highlight-icon" />
                  <p>Public Repos</p>
                  <h3>{githubStats.repos}</h3>
                </article>
                <article className="highlight-card">
                  <IconStar className="highlight-icon" />
                  <p>Total Stars</p>
                  <h3>{githubStats.stars}</h3>
                </article>
                <article className="highlight-card">
                  <IconUsers className="highlight-icon" />
                  <p>Followers</p>
                  <h3>{githubStats.followers}</h3>
                </article>
                <article className="highlight-card">
                  <IconUserPlus className="highlight-icon" />
                  <p>Following</p>
                  <h3>{githubStats.following}</h3>
                </article>
              </div>
              <GitHubContributionGraph username={GITHUB_USERNAME} />
              <p className="github-activity-caption">
                Cached for up to 1 hour · Source: github.com/{GITHUB_USERNAME}
              </p>
            </>
          ) : (
            <div className="github-activity-fallback">
              <p>Live GitHub stats are temporarily unavailable right now.</p>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-secondary">
                View GitHub profile
              </a>
            </div>
          )}

          <div className="highlights static-highlights">
            {highlights.map((item) => (
              <article key={item.label} className="highlight-card">
                <p>{item.label}</p>
                <h3>{item.value}</h3>
              </article>
            ))}
          </div>
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

        <section id="experience" className="experience reveal">
          <div className="section-head">
            <p>Experience</p>
            <h2>Where I&apos;ve applied these skills professionally</h2>
          </div>
          <div className="experience-list">
            {experience.map((job) => (
              <article
                className={`panel experience-card${job.current ? " is-current" : ""}`}
                key={`${job.company}-${job.role}`}
              >
                <div className="experience-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="experience-company">{job.company}</p>
                  </div>
                  <div className="experience-meta">
                    {job.current ? (
                      <span className="badge-current">
                        <span className="live-dot" aria-hidden="true" />
                        Current
                      </span>
                    ) : null}
                    <p className="experience-period">{job.period}</p>
                  </div>
                </div>
                <div className="tag-row" aria-label={`${job.role} stack`}>
                  {job.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <ul>
                  {job.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
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
          <div className="stack-groups">
            {stackCategories.map((category) => (
              <article className="stack-group" key={category.key}>
                <div className="stack-group-head">
                  <h3>{category.label}</h3>
                  <span className="stack-count">{category.items.length}</span>
                </div>
                <div className="stack-chips" aria-label={`${category.label} technologies`}>
                  {category.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
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

        <SiteFooter />
      </div>
    </main>
  );
}
