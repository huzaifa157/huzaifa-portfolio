import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, experience, profile, techStack } from "./portfolio";

const publicDir = path.resolve(__dirname, "../../public");

describe("portfolio data integrity", () => {
  it("has a valid profile with contact details", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toMatch(/@/);
    expect(profile.github).toMatch(/^https:\/\//);
    expect(profile.linkedin).toMatch(/^https:\/\//);
  });

  it("has unique, non-empty case study slugs", () => {
    const slugs = caseStudies.map((project) => project.slug);
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("gives every case study the fields the case study page depends on", () => {
    for (const project of caseStudies) {
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.github).toMatch(/^https:\/\/github\.com\//);
      expect(project.thumbnail).toMatch(/^\/projects\/.+\.svg$/);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.implementation.length).toBeGreaterThan(0);
      expect(project.impact.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);
      expect(existsSync(path.join(publicDir, project.thumbnail))).toBe(true);
    }
  });

  it("gives every experience entry a role, company, and at least one bullet", () => {
    for (const job of experience) {
      expect(job.role).toBeTruthy();
      expect(job.company).toBeTruthy();
      expect(job.bullets.length).toBeGreaterThan(0);
    }
  });

  it("has a non-empty tech stack with no duplicates", () => {
    expect(techStack.length).toBeGreaterThan(0);
    expect(new Set(techStack).size).toBe(techStack.length);
  });
});
