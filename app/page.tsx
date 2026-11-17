import Image from "next/image";
import Link from "next/link";
import CopyEmail from "./components/CopyEmail";
import GitHubContributionGraph from "./components/GitHubContributionGraph";
import InteractiveTechStack from "./components/InteractiveTechStack";
import LocalTime from "./components/LocalTime";
import ProjectShowcase from "./components/ProjectShowcase";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SystemArchitectureExplorer from "./components/SystemArchitectureExplorer";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconDownload,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconPhone,
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
  skillProof,
  skillsByCategory,
} from "./data/portfolio";

type GitHubUser = {
  public_repos: number;
};

/** Only the repo count is shown; `null` hides the line rather than the panel. */
async function getPublicRepoCount() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${profile.githubUsername}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return null;
    }

    const user: GitHubUser = await response.json();
    return user.public_repos;
  } catch {
    return null;
  }
}

export default async function Home() {
  const publicRepos = await getPublicRepoCount();
  const { currentRole } = profile;

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
        <div className="hero-backdrop" aria-hidden="true" />

        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="status rise" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="live-dot" aria-hidden="true" />
              {profile.availability}
            </p>

            <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
              Full-stack engineer turning manual operations into{" "}
              <em>production software.</em>
            </h1>

            <p className="hero-lede rise" style={{ "--i": 2 } as React.CSSProperties}>
              I&apos;m a software engineer at {currentRole.company}, building an
              AI-driven insurance brokerage platform. In 2 years I&apos;ve
              shipped production apps in insurance, healthcare, subscription
              commerce, and travel — across web and mobile UIs, backend
              services, databases, and cloud deployment.
            </p>

            <div className="hero-actions rise" style={{ "--i": 3 } as React.CSSProperties}>
              <a className="btn btn-primary" href={profile.resume} download>
                <IconDownload />
                Download résumé
              </a>
              <Link className="btn btn-ghost" href="#work">
                See the work
                <IconArrowRight />
              </Link>
              <a className="btn btn-quiet" href={`mailto:${profile.email}`}>
                <IconMail />
                Get in touch
              </a>
            </div>

          </div>

          <aside
            className="profile-card rise"
            style={{ "--i": 3 } as React.CSSProperties}
            aria-label="Profile summary"
          >
            <div className="profile-head">
              <Image
                className="profile-photo"
                src="/huzaifa-profile.jpg"
                alt={`Portrait of ${profile.name}`}
                width={176}
                height={176}
                preload
              />
              <div className="profile-id">
                <h2>{profile.name}</h2>
                <p>{profile.headline}</p>
                <p className="profile-status">
                  <span className="live-dot" aria-hidden="true" />
                  Open to new roles
                </p>
              </div>
            </div>

            <dl className="profile-facts">
              <div>
                <dt>Now</dt>
                <dd>
                  {currentRole.title},{" "}
                  <a href={currentRole.url} target="_blank" rel="noreferrer">
                    {currentRole.company}
                  </a>
                  <span>{currentRole.location}</span>
                </dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{profile.experience}</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>
                  {profile.location}
                  <LocalTime timeZone={profile.timeZoneId} fallback={profile.timezone} />
                </dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>
                  BS Computer Science
                  <span>UBIT, University of Karachi</span>
                </dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{profile.focus}</dd>
              </div>
            </dl>

            <div className="profile-stack">
              {signatureStack.slice(0, 6).map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className="profile-links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <IconGitHub />
                <span>GitHub</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <IconLinkedIn />
                <span>LinkedIn</span>
              </a>
              <a href={`mailto:${profile.email}`}>
                <IconMail />
                <span>Email</span>
              </a>
              <a href={profile.resume} download>
                <IconDownload />
                <span>Résumé</span>
              </a>
            </div>
          </aside>
        </div>

        <div className="shell">
          <dl className="metrics rise" style={{ "--i": 5 } as React.CSSProperties}>
            {heroMetrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <dt>{metric.label}</dt>
                <dd className="metric-value">{metric.value}</dd>
                {metric.source ? <dd className="metric-source">{metric.source}</dd> : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------- 01: experience */}
      <section className="section" id="experience" aria-labelledby="experience-title">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="eyebrow">
              <span>01</span> Experience
            </p>
            <h2 className="section-title" id="experience-title">
              Where the work has <em>shipped</em>
            </h2>
            <p className="section-note">
              Remote for a UAE team today, client delivery before that — owning
              features from requirements to release in both.
            </p>
          </div>

          <div className="xp">
            {experience.map((job) => (
              <article className="xp-item" key={`${job.company}-${job.role}`} data-reveal>
                <div className="xp-meta">
                  <p className="xp-period">
                    {job.current ? <span className="live-dot" aria-hidden="true" /> : null}
                    {job.period}
                  </p>
                  <p className="xp-company">{job.company}</p>
                  {job.location ? <p className="xp-location">{job.location}</p> : null}
                  {job.url ? (
                    <a className="link-inline" href={job.url} target="_blank" rel="noreferrer">
                      {job.urlLabel ?? job.url}
                      <IconArrowUpRight />
                    </a>
                  ) : null}
                </div>

                <div className="xp-body">
                  <h3 className="xp-role">{job.role}</h3>
                  <p className="xp-context">{job.context}</p>
                  <ul className="xp-bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet.lead}>
                        <strong>{bullet.lead}</strong>
                        {bullet.rest}
                      </li>
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

      {/* --------------------------------------------------------- 02: work */}
      <section className="section" id="work" aria-labelledby="work-title">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="eyebrow">
              <span>02</span> Selected work
            </p>
            <h2 className="section-title" id="work-title">
              Systems built to <em>hold up</em>
            </h2>
            <p className="section-note">
              Three projects in depth, four more below. Every one has a case
              study covering the constraint, the build, and the outcome.
            </p>
          </div>

          <ProjectShowcase featured={featuredCaseStudies} archive={archiveCaseStudies} />
        </div>
      </section>

      {/* ----------------------------- 03: interactive systems architecture */}
      <SystemArchitectureExplorer />

      {/* ------------------------------------------------ 04: how I build */}
      <section className="section" id="approach" aria-labelledby="approach-title">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="eyebrow">
              <span>04</span> Approach
            </p>
            <h2 className="section-title" id="approach-title">
              Rules I <em>hold to</em>
            </h2>
            <p className="section-note">
              Opinions are cheap. Each of these is tied to the project where it
              shipped.
            </p>
          </div>

          <ol className="principles">
            {principles.map((principle, index) => (
              <li className="principle" key={principle.title} data-reveal>
                <span className="principle-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
                <p className="proof">{principle.proof}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------ 05: stack & signal */}
      <section className="section" id="stack" aria-labelledby="stack-title">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="eyebrow">
              <span>05</span> Stack
            </p>
            <h2 className="section-title" id="stack-title">
              The tools, and <em>where I used them</em>
            </h2>
            <p className="section-note">
              Select any skill to see the role or project behind it.
            </p>
          </div>

          <InteractiveTechStack
            skillsByCategory={skillsByCategory}
            skillCategoryLabels={skillCategoryLabels}
            skillProof={skillProof}
            initialSkill="Next.js"
          />

          <div className="gh" data-reveal>
            <div className="gh-head">
              <p className="gh-title">
                <IconGitHub />
                GitHub activity
              </p>
              <a className="link-inline" href={profile.github} target="_blank" rel="noreferrer">
                {publicRepos ? `${publicRepos} public repositories · ` : ""}@
                {profile.githubUsername}
                <IconArrowUpRight />
              </a>
            </div>
            <GitHubContributionGraph username={profile.githubUsername} />
            <p className="gh-note">
              Public activity only — work for Super Auto and client projects
              lives in private repositories.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 06: background */}
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="shell">
          <div className="section-head" data-reveal>
            <p className="eyebrow">
              <span>06</span> About
            </p>
            <h2 className="section-title" id="about-title">
              The <em>short version</em>
            </h2>
          </div>

          <div className="about">
            <div className="about-prose" data-reveal>
              <p className="about-lead">{profile.summary}</p>
              <p>{profile.ownership}</p>
              <p>
                I care most about the unglamorous parts — schema design that
                survives a feature request, authorization that holds when the UI
                is bypassed, and error responses a client can actually branch
                on. {profile.positioning}
              </p>
              <ul className="about-industries" aria-label="Industries shipped in">
                {profile.industries.map((industry) => (
                  <li key={industry}>{industry}</li>
                ))}
              </ul>
              <div className="chips">
                <span className="chip chip-accent">{profile.availability}</span>
                <span className="chip">Remote-friendly</span>
                <span className="chip">Open to relocation</span>
              </div>
            </div>

            <div className="about-records" data-reveal>
              <h3>Education</h3>
              {profile.education.map((entry) => (
                <div className="record" key={entry.degree}>
                  <b>{entry.degree}</b>
                  <span>{entry.institution}</span>
                  <span className="record-meta">{entry.location}</span>
                </div>
              ))}

              <h3>Certification &amp; recognition</h3>
              {profile.achievements.map((item) => (
                <div className="record" key={item.title}>
                  <b>{item.title}</b>
                  <span>{item.issuer}</span>
                  <span className="record-meta">{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- contact */}
      <section className="section section-contact" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <div className="contact" data-reveal>
            <p className="eyebrow">
              <span className="live-dot" aria-hidden="true" /> Contact
            </p>
            <h2 id="contact-title">
              Let&apos;s talk about what you&apos;re <em>building.</em>
            </h2>
            <p className="contact-lede">
              I reply to every message. If you are hiring for a full-stack or
              backend role, the résumé has the short version and the case
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
                <IconMail />
                <span className="k">Email</span>
                <span className="v">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phoneHref}`}>
                <IconPhone />
                <span className="k">Phone</span>
                <span className="v">{profile.phone}</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <IconLinkedIn />
                <span className="k">LinkedIn</span>
                <span className="v">{profile.linkedinHandle}</span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <IconGitHub />
                <span className="k">GitHub</span>
                <span className="v">@{profile.githubUsername}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
