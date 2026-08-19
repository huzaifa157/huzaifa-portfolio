import Image from "next/image";
import Link from "next/link";
import CopyEmail from "./components/CopyEmail";
import GitHubContributionGraph from "./components/GitHubContributionGraph";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconDownload,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconRepo,
  IconStar,
  IconUserPlus,
  IconUsers,
} from "./components/icons";
import { homeNavLinks } from "./data/navigation";
import {
  archiveCaseStudies,
  experience,
  featuredCaseStudies,
  heroMetrics,
  principles,
  profile,
  signatureStack,
  skillCategoryLabels,
  skillsByCategory,
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
      fetch(`https://api.github.com/users/${profile.githubUsername}`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100`,
        { next: { revalidate: 3600 } }
      ),
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

const stackCategories = (
  Object.keys(skillsByCategory) as Array<keyof typeof skillsByCategory>
).map((key) => ({
  key,
  label: skillCategoryLabels[key],
  items: skillsByCategory[key],
}));

export default async function Home() {
  const githubStats = await getGitHubStats();

  return (
    <main className="page" id="main-content">
      <SiteHeader
        brand={profile.name}
        brandSub={profile.headline}
        links={homeNavLinks}
        resumeHref={profile.resume}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="status" data-reveal>
              <span className="live-dot" aria-hidden="true" />
              {profile.availability}
            </p>

            <h1 data-reveal>
              I build production web systems{" "}
              <em>that hold up under real users.</em>
            </h1>

            <p className="hero-lede" data-reveal>
              {profile.positioning}
            </p>

            <div className="hero-actions" data-reveal>
              <a className="btn btn-primary" href={profile.resume} download>
                <IconDownload />
                Download résumé
              </a>
              <Link className="btn btn-ghost" href="#work">
                See the work
                <IconArrowRight />
              </Link>
              <a
                className="btn btn-quiet"
                href={`mailto:${profile.email}`}
              >
                <IconMail />
                Get in touch
              </a>
            </div>

            <div className="hero-foot" data-reveal>
              <span>{profile.location}</span>
              <span>{profile.timezone}</span>
              <span>{profile.educationShort}</span>
            </div>
          </div>

          <aside className="spec" aria-label="Profile summary" data-reveal>
            <div className="spec-head">
              <div className="spec-photo">
                <Image
                  src="/huzaifa-profile.jpg"
                  alt={`Portrait of ${profile.name}`}
                  width={120}
                  height={120}
                  priority
                />
              </div>
              <div className="spec-id">
                <h2>{profile.name}</h2>
                <p>{profile.headline}</p>
              </div>
            </div>

            <dl className="spec-rows">
              <div className="spec-row">
                <dt>Now</dt>
                <dd>{profile.currentlyBuilding}</dd>
              </div>
              <div className="spec-row">
                <dt>Focus</dt>
                <dd>APIs, data modeling, auth &amp; access control, delivery</dd>
              </div>
              <div className="spec-row">
                <dt>Based in</dt>
                <dd>
                  {profile.location} · {profile.timezone}
                </dd>
              </div>
              <div className="spec-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
            </dl>

            <div className="spec-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <IconGitHub />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <IconLinkedIn />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Send an email" title="Email">
                <IconMail />
              </a>
              <a href={profile.resume} download aria-label="Download résumé" title="Résumé">
                <IconDownload />
              </a>
            </div>
          </aside>
        </div>

        <div className="shell">
          <div className="metrics" data-reveal>
            {heroMetrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <p className="metric-value">{metric.value}</p>
                <p className="metric-label">{metric.label}</p>
              </div>
            ))}
          </div>
          <p className="metrics-note">
            Endpoint, model, and role-tier counts are summed from ServeFlow and
            DentalFlow — the two role-based systems that expose them. Every
            number matches the résumé.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- ticker */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...signatureStack, ...signatureStack].map((tech, index) => (
            <span key={`${tech}-${index}`}>{tech}</span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ work */}
      <section className="section" id="work">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="mono section-index">01 — Selected work</p>
            <h2 className="section-title">
              Four systems, and the decisions behind them
            </h2>
            <p className="section-note">
              Each case study covers the constraint, the implementation, and what
              it changed.
            </p>
          </div>

          <div className="work-list">
            {featuredCaseStudies.map((project) => (
              <article className="work-row" key={project.slug} data-reveal>
                <p className="work-index">{project.index}</p>

                <div>
                  <p className="work-kicker">{project.kicker}</p>
                  <Link className="work-title" href={`/projects/${project.slug}`}>
                    {project.title}
                    <IconArrowUpRight className="arrow" />
                  </Link>

                  <p className="work-thesis">{project.thesis}</p>

                  <div className="work-metrics">
                    {project.metrics.map((metric) => (
                      <div className="work-metric" key={metric.label}>
                        <b>{metric.value}</b>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="chips">
                    {project.stack.slice(0, 7).map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="work-links">
                    <Link className="link-inline" href={`/projects/${project.slug}`}>
                      Read case study
                      <IconArrowRight />
                    </Link>
                    {project.live ? (
                      <a
                        className="link-inline"
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live demo
                        <IconArrowUpRight />
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        className="link-inline"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                        <IconArrowUpRight />
                      </a>
                    ) : (
                      <span className="link-muted">
                        {project.repoNote ?? "Private repository"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="work-media">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} — ${project.kicker}`}
                    width={1200}
                    height={630}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="archive" data-reveal>
            {archiveCaseStudies.map((project) => (
              <Link
                className="archive-item"
                key={project.slug}
                href={`/projects/${project.slug}`}
              >
                <h3>
                  {project.title}
                  <IconArrowUpRight />
                </h3>
                <p>{project.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- approach */}
      <section className="section" id="approach">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="mono section-index">02 — How I build</p>
            <h2 className="section-title">Rules I hold to, and where each one shipped</h2>
            <p className="section-note">
              Opinions are cheap; these are the ones that survived contact with a
              production codebase.
            </p>
          </div>

          <div className="principles">
            {principles.map((principle) => (
              <article className="principle" key={principle.title} data-reveal>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
                <p className="proof">{principle.proof}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ experience */}
      <section className="section" id="experience">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="mono section-index">03 — Experience</p>
            <h2 className="section-title">Where the work has been shipped</h2>
          </div>

          <div className="timeline">
            {experience.map((job) => (
              <article className="tl-item" key={`${job.company}-${job.role}`} data-reveal>
                <div className="tl-meta">
                  <p className="tl-period">
                    {job.current ? <span className="live-dot" aria-hidden="true" /> : null}
                    {job.period}
                  </p>
                  <p className="tl-company">{job.company}</p>
                  <p className="tl-context">{job.context}</p>
                </div>

                <div>
                  <h3 className="tl-role">{job.role}</h3>
                  <ul className="tl-bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {job.stack.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- stack */}
      <section className="section" id="stack">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="mono section-index">04 — Stack &amp; signal</p>
            <h2 className="section-title">Tools I reach for, and public activity</h2>
          </div>

          <div className="stack-grid" data-reveal>
            {stackCategories.map((category) => (
              <article className="stack-cat" key={category.key}>
                <h3>
                  {category.label}
                  <span>{String(category.items.length).padStart(2, "0")}</span>
                </h3>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="gh-panel" data-reveal>
            {githubStats ? (
              <>
                <div className="gh-stats">
                  <div className="gh-stat">
                    <p className="gh-stat-head">
                      <IconRepo />
                      Public repos
                    </p>
                    <b>{githubStats.repos}</b>
                  </div>
                  <div className="gh-stat">
                    <p className="gh-stat-head">
                      <IconStar />
                      Stars earned
                    </p>
                    <b>{githubStats.stars}</b>
                  </div>
                  <div className="gh-stat">
                    <p className="gh-stat-head">
                      <IconUsers />
                      Followers
                    </p>
                    <b>{githubStats.followers}</b>
                  </div>
                  <div className="gh-stat">
                    <p className="gh-stat-head">
                      <IconUserPlus />
                      Following
                    </p>
                    <b>{githubStats.following}</b>
                  </div>
                </div>

                <GitHubContributionGraph username={profile.githubUsername} />

                <div className="gh-foot">
                  <span>Live from the GitHub API · cached 1 hour</span>
                  <a
                    className="link-inline"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{profile.githubUsername}
                    <IconArrowUpRight />
                  </a>
                </div>
              </>
            ) : (
              <div className="gh-fallback">
                <p>GitHub stats are temporarily unavailable.</p>
                <a
                  className="btn btn-ghost"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconGitHub />
                  Open GitHub profile
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- about */}
      <section className="section" id="about">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="mono section-index">05 — Background</p>
            <h2 className="section-title">Education, recognition, and the short version</h2>
          </div>

          <div className="two-col">
            <article className="panel" data-reveal>
              <h3>Education</h3>
              {profile.education.map((entry) => (
                <div className="record" key={entry.degree}>
                  <b>{entry.degree}</b>
                  <span>{entry.institution}</span>
                  <span className="year">{entry.period}</span>
                </div>
              ))}

              <h3 className="panel-heading-spaced">Recognition</h3>
              {profile.achievements.map((item) => (
                <div className="record" key={item.title}>
                  <b>{item.title}</b>
                  <span>{item.issuer}</span>
                  <span className="year">{item.year}</span>
                </div>
              ))}
            </article>

            <article className="panel" data-reveal>
              <h3>In short</h3>
              <p className="panel-prose">
                {profile.heroSummary}
              </p>
              <p className="panel-prose">
                I care most about the unglamorous parts — schema design that
                survives a feature request, authorization that holds when the UI
                is bypassed, and error responses a client can actually branch on.
                I write documentation and hand-off material as part of shipping,
                not after it.
              </p>
              <div className="chips">
                <span className="chip chip-accent">Available for 2026–2027 roles</span>
                <span className="chip">Open to relocation</span>
                <span className="chip">Remote-friendly</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- contact */}
      <section className="section" id="contact">
        <div className="shell">
          <div className="contact" data-reveal>
            <p className="mono section-index">Contact</p>
            <h2>Let&apos;s talk about what you&apos;re building.</h2>
            <p>
              I reply to every message. If you are hiring for a full-stack or
              backend role, the résumé below has the short version and the case
              studies have the long one.
            </p>

            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                <IconMail />
                Email me
              </a>
              <CopyEmail email={profile.email} />
              <a className="btn btn-ghost" href={profile.resume} download>
                <IconDownload />
                Résumé
              </a>
            </div>

            <div className="contact-rows">
              <a href={`mailto:${profile.email}`}>
                <p className="k">Email</p>
                <p className="v">{profile.email}</p>
              </a>
              <a href={`tel:${profile.phoneHref}`}>
                <p className="k">Phone</p>
                <p className="v">{profile.phone}</p>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <p className="k">LinkedIn</p>
                <p className="v">/in/syedhuzaifa-codes</p>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <p className="k">GitHub</p>
                <p className="v">@{profile.githubUsername}</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
