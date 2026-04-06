export type DemoRole = "Executive + Ops" | "Admissions" | "Therapist" | "Nurse" | "Billing";

export const demoRoles: DemoRole[] = [
  "Executive + Ops",
  "Admissions",
  "Therapist",
  "Nurse",
  "Billing",
];

export function getRoleDescription(role: DemoRole) {
  switch (role) {
    case "Admissions":
      return "Focused on intake speed, benefits verification, clinical screening, and bed placement.";
    case "Therapist":
      return "Centered on patient charting, treatment plans, groups, and signature completion.";
    case "Nurse":
      return "Optimized for med passes, assessments, CIWA workflows, and handoff visibility.";
    case "Billing":
      return "Highlights authorization deadlines, missing documentation, and revenue blockers.";
    case "Executive + Ops":
    default:
      return "Provides cross-team visibility across census, admits, compliance, and reimbursement risk.";
  }
}
