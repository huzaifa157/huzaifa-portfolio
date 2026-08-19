import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  archiveCaseStudies,
  caseStudies,
  experience,
  featuredCaseStudies,
  heroMetrics,
  principles,
  profile,
  skillCategoryLabels,
  skillsByCategory,
  techStack,
} from "./portfolio";

const publicDir = path.resolve(__dirname, "../../public");

describe("profile", () => {
  it("has the contact details the header, hero, and footer render", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toMatch(/@/);
    expect(profile.github).toMatch(/^https:\/\/github\.com\//);
    expect(profile.linkedin).toMatch(/^https:\/\//);
    expect(profile.site).toMatch(/^https:\/\//);
  });

  it("points at a résumé that actually exists in public/", () => {
    expect(profile.resume).toBe("/resume.pdf");
    expect(existsSync(path.join(publicDir, profile.resume))).toBe(true);
  });

  it("keeps the tel: href dial-safe", () => {
    expect(profile.phoneHref).toMatch(/^\+\d+$/);
  });

  it("lists education and achievements with complete records", () => {
    expect(profile.education.length).toBeGreaterThan(0);
    for (const entry of profile.education) {
      expect(entry.degree).toBeTruthy();
      expect(entry.institution).toBeTruthy();
      expect(entry.period).toBeTruthy();
    }

    for (const achievement of profile.achievements) {
      expect(achievement.title).toBeTruthy();
      expect(achievement.issuer).toBeTruthy();
      expect(achievement.year).toMatch(/^\d{4}$/);
    }
  });
});

describe("case studies", () => {
  it("has unique slugs and unique display indices", () => {
    const slugs = caseStudies.map((project) => project.slug);
    const indices = caseStudies.map((project) => project.index);

    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(indices).size).toBe(indices.length);

    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("gives every case study the fields the case study page renders", () => {
    for (const project of caseStudies) {
      expect(project.title).toBeTruthy();
      expect(project.kicker).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.thesis).toBeTruthy();
      expect(project.role).toBeTruthy();
      expect(project.timeline).toBeTruthy();
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.implementation.length).toBeGreaterThan(0);
      expect(project.impact.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);

      for (const metric of project.metrics) {
        expect(metric.value).toBeTruthy();
        expect(metric.label).toBeTruthy();
      }
    }
  });

  it("ships a thumbnail file for every case study", () => {
    for (const project of caseStudies) {
      expect(project.thumbnail).toMatch(/^\/projects\/.+\.svg$/);
      expect(existsSync(path.join(publicDir, project.thumbnail))).toBe(true);
    }
  });

  it("either links a repository or explains why there isn't one", () => {
    for (const project of caseStudies) {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\/github\.com\//);
      } else {
        // Client work stays private, but the card still has to say so.
        expect(project.repoNote).toBeTruthy();
      }

      if (project.live) {
        expect(project.live).toMatch(/^https:\/\//);
      }
    }
  });

  it("partitions cleanly into the featured list and the archive", () => {
    expect(featuredCaseStudies.length).toBeGreaterThan(0);
    expect(featuredCaseStudies.length + archiveCaseStudies.length).toBe(
      caseStudies.length
    );
    expect(featuredCaseStudies.every((project) => project.featured)).toBe(true);
    expect(archiveCaseStudies.every((project) => !project.featured)).toBe(true);
  });
});

describe("experience", () => {
  it("gives every entry a role, company, period, and bullets", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const job of experience) {
      expect(job.role).toBeTruthy();
      expect(job.company).toBeTruthy();
      expect(job.period).toBeTruthy();
      expect(job.context).toBeTruthy();
      expect(job.stack.length).toBeGreaterThan(0);
      expect(job.bullets.length).toBeGreaterThan(0);
    }
  });
});

describe("skills and metrics", () => {
  it("labels every skill category exactly once", () => {
    const keys = Object.keys(skillsByCategory);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(skillCategoryLabels[key as keyof typeof skillsByCategory]).toBeTruthy();
    }
  });

  it("has a flattened tech stack with no duplicates", () => {
    expect(techStack.length).toBeGreaterThan(0);
    expect(new Set(techStack).size).toBe(techStack.length);
  });

  it("states four hero metrics with a value and a label each", () => {
    expect(heroMetrics).toHaveLength(4);
    for (const metric of heroMetrics) {
      expect(metric.value).toBeTruthy();
      expect(metric.label).toBeTruthy();
    }
  });

  it("backs every stated principle with a named project", () => {
    expect(principles.length).toBeGreaterThan(0);
    for (const principle of principles) {
      expect(principle.title).toBeTruthy();
      expect(principle.body).toBeTruthy();
      expect(principle.proof).toBeTruthy();
    }
  });
});
