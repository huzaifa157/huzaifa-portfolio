"use client";

import { useId, useState } from "react";
import { IconCheck, IconLayers, IconSparkle, IconTerminal } from "./icons";

type StateStep = {
  id: string;
  name: string;
  badge: string;
  summary: string;
  guard: string;
  violationResponse: string;
  auditAction: string;
  snippet: string;
};

const clinicStates: StateStep[] = [
  {
    id: "requested",
    name: "01. Booking Request",
    badge: "REQUESTED",
    summary:
      "Patient selects treatment, preferred branch, doctor, and date/time slot through self-service portal.",
    guard: "Appointment slot availability verified across doctor schedules; duplicate bookings blocked at DB level.",
    violationResponse: "409 Conflict if doctor or time slot already reserved",
    auditAction: "Patient session ID logged with request timestamp",
    snippet: `// Verify doctor availability for branch
const conflicting = await Appointment.findOne({
  doctorId,
  branchId,
  date,
  timeSlot,
  status: { $in: ["CONFIRMED", "CHECKED_IN", "IN_TREATMENT"] }
});
if (conflicting) throw new ConflictError("Slot unavailable");`,
  },
  {
    id: "confirmed",
    name: "02. Confirmed & Scheduled",
    badge: "CONFIRMED",
    summary:
      "Appointment slot locked in clinic calendar. Branch receptionist and patient receive automated confirmation.",
    guard: "Doctor must be actively rostered at the selected clinic branch on that day.",
    violationResponse: "422 Unprocessable if doctor not rostered at selected branch",
    auditAction: "Confirmation logged with branch ID",
    snippet: `// Transition state to CONFIRMED
await Appointment.findByIdAndUpdate(appointmentId, {
  status: "CONFIRMED",
  confirmedAt: new Date(),
  confirmedBy: req.user.id
});`,
  },
  {
    id: "checked-in",
    name: "03. Checked In",
    badge: "CHECKED_IN",
    summary:
      "Patient arrives at physical clinic. Receptionist verifies insurance / identity and marks patient in waiting queue.",
    guard: "Appointment must be in CONFIRMED state for today's date.",
    violationResponse: "409 Conflict if appointment is CANCELLED or already COMPLETED",
    auditAction: "Front-desk receptionist user ID attached to check-in event",
    snippet: `// Verify check-in validity
if (appointment.status !== "CONFIRMED") {
  return res.status(409).json({ error: "Cannot check in unconfirmed appointment" });
}
appointment.status = "CHECKED_IN";
await appointment.save();`,
  },
  {
    id: "consultation",
    name: "04. In Consultation",
    badge: "IN_TREATMENT",
    summary:
      "Doctor calls patient, reviews historical medical charts, updates clinical notes, and performs dental procedure.",
    guard: "Only the assigned doctor or administrator JWT token can mutate clinical treatment records.",
    violationResponse: "403 Forbidden if non-assigned clinician attempts chart write",
    auditAction: "Doctor license and timestamp recorded with clinical note version",
    snippet: `// Doctor role and assignment check
if (req.user.role !== "doctor" || appointment.doctorId.toString() !== req.user.id) {
  throw new ForbiddenError("Only assigned doctor can update clinical chart");
}
await MedicalRecord.create({ appointmentId, diagnosis, notes });`,
  },
  {
    id: "invoiced",
    name: "05. Prescription & Invoice",
    badge: "INVOICED",
    summary:
      "Doctor inputs medication and treatment codes; receptionist generates invoice slip and applies branch fee structure.",
    guard: "Invoice line items match approved clinic fee schedule; doctor notes become read-only.",
    violationResponse: "409 Conflict if attempting to re-invoice or modify locked notes",
    auditAction: "Generated invoice number and billing staff ID logged",
    snippet: `// Generate itemized invoice
const invoice = await Invoice.create({
  appointmentId,
  patientId: appointment.patientId,
  items: treatmentCodes.map(c => ({ code: c.code, fee: c.fee })),
  total: calculateTotal(treatmentCodes),
  status: "UNPAID"
});`,
  },
  {
    id: "completed",
    name: "06. Settled & Completed",
    badge: "COMPLETED",
    summary:
      "Payment processed (cash, card, or insurance claim). Final receipt generated and follow-up appointment prompted.",
    guard: "Invoice must be marked PAID; appointment enters terminal immutable state.",
    violationResponse: "409 Conflict: Completed appointment records cannot be mutated",
    auditAction: "Payment transaction reference and closing timestamp recorded",
    snippet: `// Final settlement and immutable lock
await Appointment.findByIdAndUpdate(appointmentId, {
  status: "COMPLETED",
  settledAt: new Date()
});`,
  },
];

type RoleTier = {
  id: string;
  name: string;
  badge: string;
  summary: string;
  accessScope: string;
  securityInvariant: string;
  endpointsAllowed: string[];
};

const clinicRoles: RoleTier[] = [
  {
    id: "patient",
    name: "Patient",
    badge: "Tier 1 of 4",
    summary: "Patient self-service portal for appointments, prescriptions, and billing.",
    accessScope: "Book appointments, view personal medical notes, download itemized invoices.",
    securityInvariant:
      "Data queries enforce patientId filter at the MongoDB driver level — patients cannot query other patients' data even by guessing IDs.",
    endpointsAllowed: [
      "GET /api/patient/appointments",
      "POST /api/patient/appointments/book",
      "GET /api/patient/prescriptions",
      "GET /api/patient/invoices/:id/download",
    ],
  },
  {
    id: "doctor",
    name: "Doctor / Clinician",
    badge: "Tier 2 of 4",
    summary: "Clinical practitioner dashboard across 3 branches.",
    accessScope:
      "Access scheduled patients, update clinical charts, write digital prescriptions, view treatment calendar.",
    securityInvariant:
      "Doctors can only access medical records for patients with an active appointment assigned to their branch and schedule.",
    endpointsAllowed: [
      "GET /api/doctor/schedule",
      "POST /api/doctor/prescriptions/new",
      "PATCH /api/doctor/records/:id",
      "GET /api/doctor/patients/:patientId/history",
    ],
  },
  {
    id: "receptionist",
    name: "Receptionist",
    badge: "Tier 3 of 4",
    summary: "Front-desk operations across 3 clinic locations.",
    accessScope:
      "Schedule, reschedule, and check-in patients, manage room allocations, generate invoices, record payments.",
    securityInvariant:
      "Receptionists can create invoices and check-ins but are structurally blocked from viewing or editing doctor clinical diagnosis notes.",
    endpointsAllowed: [
      "POST /api/desk/check-in",
      "POST /api/desk/invoices/generate",
      "GET /api/desk/calendar/branch/:branchId",
      "PATCH /api/desk/appointments/:id/reschedule",
    ],
  },
  {
    id: "administrator",
    name: "Administrator",
    badge: "Tier 4 of 4",
    summary: "Multi-branch clinic executive and practice analytics console.",
    accessScope:
      "Cross-branch revenue analytics (Recharts), staff management, financial audits, branch settings, system reports.",
    securityInvariant:
      "Aggregated financial queries run with read-only database credentials to prevent accidental mutations during reporting runs.",
    endpointsAllowed: [
      "GET /api/admin/analytics/revenue",
      "GET /api/admin/performance/doctors",
      "ALL /api/admin/branches/*",
      "GET /api/admin/audit-logs",
    ],
  },
];

export default function SystemArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState<"statemachine" | "rbac">("statemachine");
  const [selectedStateIndex, setSelectedStateIndex] = useState(1); // Default to Confirmed
  const [selectedRoleId, setSelectedRoleId] = useState("patient");

  const currentState = clinicStates[selectedStateIndex];
  const currentRole = clinicRoles.find((r) => r.id === selectedRoleId) || clinicRoles[0];

  function handleStateKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSelectedStateIndex((index + 1) % clinicStates.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSelectedStateIndex((index - 1 + clinicStates.length) % clinicStates.length);
    }
  }

  function handleRoleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = clinicRoles[(index + 1) % clinicRoles.length];
      if (next) setSelectedRoleId(next.id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = clinicRoles[(index - 1 + clinicRoles.length) % clinicRoles.length];
      if (prev) setSelectedRoleId(prev.id);
    }
  }

  return (
    <section className="section" id="systems" aria-labelledby="systems-title">
      <div className="shell">
        <div className="section-head" data-reveal>
          <p className="mono section-index">03 — System Architecture</p>
          <h2 className="section-title" id="systems-title">
            Lifecycle state machines and 4-tier clinic RBAC
          </h2>
          <p className="section-note">
            Production proof: interactive appointment lifecycle, scheduling validation, and server-side authorization.
          </p>
        </div>

        <div className="sys-container" data-reveal>
          {/* Main Top Tab Switcher */}
          <div
            className="sys-tabs-header"
            role="tablist"
            aria-label="System Architecture Modules"
          >
            <button
              type="button"
              role="tab"
              id="tab-statemachine"
              aria-selected={activeTab === "statemachine"}
              aria-controls="panel-statemachine"
              className={`sys-tab-btn ${activeTab === "statemachine" ? "active" : ""}`}
              onClick={() => setActiveTab("statemachine")}
            >
              <IconTerminal />
              <span>DentalFlow Appointment State Machine</span>
              <span className="tab-pill">MongoDB · 409 Guards</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-rbac"
              aria-selected={activeTab === "rbac"}
              aria-controls="panel-rbac"
              className={`sys-tab-btn ${activeTab === "rbac" ? "active" : ""}`}
              onClick={() => setActiveTab("rbac")}
            >
              <IconLayers />
              <span>DentalFlow 4-Tier RBAC Matrix</span>
              <span className="tab-pill">JWT &amp; Scoped Queries</span>
            </button>
          </div>

          {/* Screen Reader Live Announcement */}
          <div className="sr-only" aria-live="polite">
            {activeTab === "statemachine"
              ? `Selected appointment state: ${currentState.name}, status ${currentState.badge}`
              : `Selected RBAC role: ${currentRole.name}, tier ${currentRole.badge}`}
          </div>

          {/* ------------------------------------------------ Tab 1: State Machine */}
          {activeTab === "statemachine" && (
            <div
              id="panel-statemachine"
              role="tabpanel"
              aria-labelledby="tab-statemachine"
              className="sys-panel"
            >
              <div className="sys-panel-intro">
                <p>
                  <strong>Core Rule:</strong> Healthcare appointment states cannot jump or double-book.
                  Availability, check-in sequences, and clinical billing are enforced at the service layer
                  with HTTP <code>409 Conflict</code> returned on illegal transitions.
                </p>
              </div>

              {/* State Pipeline Buttons */}
              <div
                className="state-pipeline"
                role="tablist"
                aria-label="Appointment lifecycle states"
              >
                {clinicStates.map((step, idx) => {
                  const isSelected = idx === selectedStateIndex;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      id={`state-step-${step.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onKeyDown={(e) => handleStateKeyDown(e, idx)}
                      onClick={() => setSelectedStateIndex(idx)}
                      className={`pipeline-step ${isSelected ? "selected" : ""}`}
                    >
                      <span className="step-num">{step.id === "completed" ? "✓" : idx + 1}</span>
                      <span className="step-title">{step.name.replace(/^\d+\.\s*/, "")}</span>
                      <span className="step-badge">{step.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* State Details Card */}
              <div className="state-detail-grid">
                <div className="state-spec-card">
                  <div className="spec-card-head">
                    <div>
                      <span className="mono spec-badge">{currentState.badge}</span>
                      <h3>{currentState.name}</h3>
                    </div>
                  </div>

                  <p className="state-summary">{currentState.summary}</p>

                  <dl className="state-invariants">
                    <div className="invariant-row">
                      <dt>Transition Guard</dt>
                      <dd>{currentState.guard}</dd>
                    </div>
                    <div className="invariant-row">
                      <dt>Violation Response</dt>
                      <dd className="violation-chip">{currentState.violationResponse}</dd>
                    </div>
                    <div className="invariant-row">
                      <dt>Audit Logging</dt>
                      <dd>{currentState.auditAction}</dd>
                    </div>
                  </dl>
                </div>

                <div className="state-code-card">
                  <div className="code-head">
                    <span className="code-title">Server Validation Logic</span>
                    <span className="mono code-lang">Node.js / Express</span>
                  </div>
                  <pre className="code-block">
                    <code>{currentState.snippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ Tab 2: RBAC Matrix */}
          {activeTab === "rbac" && (
            <div
              id="panel-rbac"
              role="tabpanel"
              aria-labelledby="tab-rbac"
              className="sys-panel"
            >
              <div className="sys-panel-intro">
                <p>
                  <strong>4 User Roles:</strong> <em>Patient</em>, <em>Doctor</em>, <em>Receptionist</em>,
                  and <em>Administrator</em>. Authorization is enforced server-side on every request
                  via JWT session tokens and database driver-level query scoping.
                </p>
              </div>

              {/* Roles List */}
              <div className="roles-strip" role="tablist" aria-label="Role tiers">
                {clinicRoles.map((role, idx) => {
                  const isSelected = role.id === selectedRoleId;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      id={`role-tab-${role.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onKeyDown={(e) => handleRoleKeyDown(e, idx)}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`role-btn ${isSelected ? "selected" : ""}`}
                    >
                      <span className="role-sys">DentalFlow</span>
                      <span className="role-name">{role.name}</span>
                      <span className="role-tier-badge">{role.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Role Detail Card */}
              <div className="role-detail-card">
                <div className="role-card-header">
                  <div>
                    <span className="mono spec-badge">DentalFlow · {currentRole.badge}</span>
                    <h3>{currentRole.name} Role</h3>
                  </div>
                  <span className="role-access-tag">{currentRole.accessScope}</span>
                </div>

                <div className="role-grid">
                  <div className="role-invariant-box">
                    <h4>Security Invariant</h4>
                    <p>{currentRole.securityInvariant}</p>
                    <div className="role-verified-badge">
                      <IconCheck /> Server-enforced via JWT &amp; DB Query Scoping
                    </div>
                  </div>

                  <div className="role-endpoints-box">
                    <h4>Allowed Protected Endpoints</h4>
                    <ul>
                      {currentRole.endpointsAllowed.map((ep) => (
                        <li key={ep}>
                          <code>{ep}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
