"use client";

import Link from "next/link";
import { useState } from "react";
import type { SkillProof } from "../data/portfolio";
import { IconArrowUpRight } from "./icons";

interface InteractiveTechStackProps {
  skillsByCategory: Record<string, string[]>;
  skillCategoryLabels: Record<string, string>;
  skillProof: Record<string, SkillProof>;
  /** The skill inspected on first render. */
  initialSkill: string;
}

/**
 * The résumé's skills list, with an inspector beside it: selecting a skill shows
 * where it was actually used. Skills with evidence carry a dot.
 */
export default function InteractiveTechStack({
  skillsByCategory,
  skillCategoryLabels,
  skillProof,
  initialSkill,
}: InteractiveTechStackProps) {
  const [activeSkill, setActiveSkill] = useState(initialSkill);
  const proof = skillProof[activeSkill];

  return (
    <div className="stack" data-reveal>
      <dl className="stack-list">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div className="stack-row" key={category}>
            <dt>
              {skillCategoryLabels[category]}
              <span>{String(skills.length).padStart(2, "0")}</span>
            </dt>
            <dd>
              {skills.map((skill) => {
                const isActive = skill === activeSkill;
                return (
                  <button
                    key={skill}
                    type="button"
                    className="skill"
                    data-active={isActive}
                    data-proof={Boolean(skillProof[skill])}
                    aria-pressed={isActive}
                    onClick={() => setActiveSkill(skill)}
                  >
                    {skill}
                  </button>
                );
              })}
            </dd>
          </div>
        ))}
      </dl>

      <aside className="inspector" aria-live="polite" aria-label="Where the selected skill was used">
        <p className="inspector-label">Used in</p>
        <h3 className="inspector-skill">{activeSkill}</h3>

        {proof ? (
          <>
            <p className="inspector-where">{proof.where}</p>
            <p className="inspector-note">{proof.note}</p>
            <Link
              className="link-inline"
              href={proof.slug ? `/projects/${proof.slug}` : "#experience"}
            >
              {proof.slug ? "Read the case study" : "See it in experience"}
              <IconArrowUpRight />
            </Link>
          </>
        ) : (
          <p className="inspector-note">
            Part of my day-to-day toolkit across client and product work.
          </p>
        )}

        <p className="inspector-hint">
          <span className="inspector-dot" aria-hidden="true" />
          A dot marks a skill backed by a case study or a role on this page.
        </p>
      </aside>
    </div>
  );
}
