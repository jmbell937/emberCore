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

export function getRoleDashboard(role: DemoRole) {
  switch (role) {
    case "Admissions":
      return {
        title: "Admissions dashboard",
        subtitle: "Prioritize referrals, payer readiness, and bed placement.",
        highlights: [
          "5 high-priority intakes need final disposition",
          "2 verified admits can be moved to bed assignment now",
          "1 hospital referral still waiting on nursing screen",
        ],
      };
    case "Therapist":
      return {
        title: "Therapist dashboard",
        subtitle: "Stay focused on charting, sessions, and signatures.",
        highlights: [
          "4 progress notes need final sign-off",
          "2 family sessions scheduled this afternoon",
          "1 treatment plan review due before discharge planning",
        ],
      };
    case "Nurse":
      return {
        title: "Nursing dashboard",
        subtitle: "Track med passes, assessments, and withdrawal monitoring.",
        highlights: [
          "3 CIWA reassessments due this hour",
          "1 new detox admit pending nursing intake",
          "Medication reconciliation needed for 2 patients",
        ],
      };
    case "Billing":
      return {
        title: "Billing dashboard",
        subtitle: "See authorizations, blockers, and ownership clearly.",
        highlights: [
          "3 auth reviews due within 24 hours",
          "1 claim packet blocked by missing therapist signature",
          "2 payer responses need follow-up today",
        ],
      };
    case "Executive + Ops":
    default:
      return {
        title: "Executive + Ops dashboard",
        subtitle: "Monitor census, admissions velocity, compliance, and revenue risk.",
        highlights: [
          "Detox occupancy is at 92%",
          "Admissions conversion is up 14% this week",
          "6 auth reviews are due by tomorrow morning",
        ],
      };
  }
}
