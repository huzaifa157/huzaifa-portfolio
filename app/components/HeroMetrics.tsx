"use client";

import { useEffect, useRef, useState } from "react";
import type { Metric } from "../data/portfolio";
import { IconCheck, IconClose } from "./icons";

interface HeroMetricsProps {
  metrics: Metric[];
}

export default function HeroMetrics({ metrics }: HeroMetricsProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  // Default to the actual values so SSR and initial render never flash '0'
  const [counts, setCounts] = useState<number[]>(
    metrics.map((m) => parseInt(m.value, 10) || 0)
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || hasAnimated) {
      setHasAnimated(true);
      return;
    }

    const targets = metrics.map((m) => parseInt(m.value, 10) || 0);
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts(targets.map((target) => Math.round(target * ease)));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setHasAnimated(true);
      }
    }

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [metrics, hasAnimated]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && breakdownOpen) {
        setBreakdownOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (breakdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [breakdownOpen]);

  return (
    <div className="metrics-wrapper" data-reveal>
      <div className="metrics">
        {metrics.map((metric, index) => {
          const numTarget = parseInt(metric.value, 10);
          const displayValue = isNaN(numTarget)
            ? metric.value
            : hasAnimated
            ? metric.value
            : counts[index] ?? metric.value;

          return (
            <div className="metric" key={metric.label}>
              <p className="metric-value">{displayValue}</p>
              <p className="metric-label">{metric.label}</p>
            </div>
          );
        })}
      </div>

      <div className="metrics-audit-bar">
        <p className="metrics-note">
          Endpoint, model, and role-tier counts are verified from DentalFlow and client systems. Every number matches the résumé.
        </p>

        <button
          ref={triggerRef}
          type="button"
          className="metric-verify-btn"
          aria-expanded={breakdownOpen}
          aria-controls="metrics-audit-panel"
          onClick={() => setBreakdownOpen((prev) => !prev)}
        >
          <span className="verify-badge">Audit breakdown</span>
          <span className="verify-text">
            {breakdownOpen ? "Hide source math" : "Verify codebase figures →"}
          </span>
        </button>
      </div>

      {breakdownOpen && (
        <div
          id="metrics-audit-panel"
          ref={dialogRef}
          className="metrics-audit-panel"
          role="region"
          aria-label="Verified metrics breakdown"
        >
          <div className="audit-header">
            <h4>Codebase Metrics Verification</h4>
            <button
              type="button"
              className="audit-close-btn"
              onClick={() => {
                setBreakdownOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close audit breakdown"
            >
              <IconClose />
            </button>
          </div>

          <div className="audit-grid">
            <div className="audit-item">
              <span className="audit-tag">49 REST Endpoints</span>
              <p className="audit-math">
                Engineered across <strong>DentalFlow</strong> covering appointments, medical records, prescriptions, invoices, and payments.
              </p>
              <span className="audit-check"><IconCheck /> Verified in DentalFlow route handlers</span>
            </div>

            <div className="audit-item">
              <span className="audit-tag">14 MongoDB Models</span>
              <p className="audit-math">
                Data schemas in <strong>DentalFlow</strong> (Patients, Appointments, Clinics, Invoices, Prescriptions, Doctors, Treatments).
              </p>
              <span className="audit-check"><IconCheck /> Verified in Mongoose schemas</span>
            </div>

            <div className="audit-item">
              <span className="audit-tag">4 User Roles (RBAC)</span>
              <p className="audit-math">
                <strong>Patient</strong>, <strong>Doctor</strong>, <strong>Receptionist</strong>, and <strong>Administrator</strong>. Server-side token validation.
              </p>
              <span className="audit-check"><IconCheck /> Verified in JWT & middleware auth guards</span>
            </div>

            <div className="audit-item">
              <span className="audit-tag">4 Shipped Products</span>
              <p className="audit-math">
                <em>DentalFlow</em> (Dental clinic portal), <em>Healthify</em> (UAE meal subscription), <em>Wanderlust</em> (Travel marketplace), and <em>Expense Tracker</em> (Expo mobile app).
              </p>
              <span className="audit-check"><IconCheck /> Documented in resume and case studies</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
