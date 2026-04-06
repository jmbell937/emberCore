export type NavItem = {
  label: string;
  badge?: string;
};

export type MetricCard = {
  label: string;
  value: string;
  change: string;
  tone: "cyan" | "emerald" | "violet" | "amber";
};

export type AdmissionsLead = {
  slug: string;
  name: string;
  age: number;
  levelOfCare: string;
  facility: string;
  status: string;
  payer: string;
  updatedAt: string;
  priority: "High" | "Medium" | "Low";
  stage: string;
  source: string;
  requestedDate: string;
  bedType: string;
  summary: string;
};

export type TimelineItem = {
  time: string;
  title: string;
  summary: string;
  author: string;
  type: string;
};

export type PatientRecord = {
  slug: string;
  name: string;
  age: number;
  program: string;
  dayLabel: string;
  diagnosis: string;
  levelOfCare: string;
  careTeam: string;
  riskFlags: string[];
  tasks: string[];
  timeline: TimelineItem[];
};

export type ScheduleEvent = {
  slug: string;
  time: string;
  title: string;
  track: string;
  owner: string;
  location: string;
  occupancy: string;
  duration: string;
};

export type BillingTask = {
  slug: string;
  patient: string;
  payer: string;
  issue: string;
  due: string;
  owner: string;
  severity: "Critical" | "Watch" | "Stable";
  queue: string;
  status: string;
  summary: string;
};

export type ReportCard = {
  title: string;
  figure: string;
  note: string;
};

export const topNav: NavItem[] = [
  { label: "Dashboard" },
  { label: "Patients" },
  { label: "Admissions", badge: "7" },
  { label: "Schedule" },
  { label: "Billing" },
  { label: "Reports" },
];

export const quickActions = [
  "Start intake",
  "Open chart",
  "Create progress note",
  "Review auths",
];

export const dashboardMetrics: MetricCard[] = [
  { label: "Current census", value: "74", change: "+6 vs. last week", tone: "cyan" },
  { label: "Unsigned notes", value: "11", change: "2 urgent today", tone: "violet" },
  { label: "Open admissions", value: "18", change: "5 high-priority leads", tone: "emerald" },
  { label: "Billing blockers", value: "9", change: "3 due within 24h", tone: "amber" },
];

export const admissionsLeads: AdmissionsLead[] = [
  {
    slug: "avery-collins",
    name: "Avery Collins",
    age: 34,
    levelOfCare: "Detox",
    facility: "Nashville Campus",
    status: "Benefits verified · awaiting nurse review",
    payer: "BlueCross TN",
    updatedAt: "5 min ago",
    priority: "High",
    stage: "Benefits verified",
    source: "Hospital referral",
    requestedDate: "Today · 7:30 PM",
    bedType: "Detox semi-private",
    summary: "High-acuity detox referral with insurance verified and nursing review still pending.",
  },
  {
    slug: "jordan-nguyen-intake",
    name: "Jordan Nguyen",
    age: 29,
    levelOfCare: "Residential",
    facility: "Franklin Recovery",
    status: "Ready to admit · bed held",
    payer: "Aetna",
    updatedAt: "12 min ago",
    priority: "High",
    stage: "Ready to admit",
    source: "Self referral",
    requestedDate: "Tomorrow · 9:00 AM",
    bedType: "Residential private",
    summary: "Residential admit cleared clinically with bed placement held and transport arranged.",
  },
  {
    slug: "maria-santos",
    name: "Maria Santos",
    age: 41,
    levelOfCare: "Detox",
    facility: "Nashville Campus",
    status: "Clinical screening in progress",
    payer: "Cigna",
    updatedAt: "27 min ago",
    priority: "Medium",
    stage: "Clinical screening",
    source: "Family referral",
    requestedDate: "Tomorrow · 1:00 PM",
    bedType: "Detox female bed",
    summary: "Needs psychiatric risk screening and final detox placement recommendation.",
  },
  {
    slug: "devon-brooks",
    name: "Devon Brooks",
    age: 37,
    levelOfCare: "PHP step-down",
    facility: "Franklin Recovery",
    status: "Waiting on transport confirmation",
    payer: "UnitedHealthcare",
    updatedAt: "43 min ago",
    priority: "Low",
    stage: "Transport pending",
    source: "Internal transfer",
    requestedDate: "Wednesday · 10:00 AM",
    bedType: "PHP outpatient seat",
    summary: "Step-down transfer already approved; coordination issue is transportation timing.",
  },
];

export const patientRecords: PatientRecord[] = [
  {
    slug: "jordan-nguyen",
    name: "Jordan Nguyen",
    age: 29,
    program: "Detox",
    dayLabel: "Day 4",
    diagnosis: "Alcohol use disorder",
    levelOfCare: "ASAM 3.7",
    careTeam: "M. Gomez, RN · K. Patel, Therapist · N. Bell, BHT",
    riskFlags: ["CIWA monitoring", "Fall risk", "Authorization review due"],
    tasks: [
      "Finalize therapist signature on progress note",
      "Prepare packet for tomorrow’s continued stay review",
      "Confirm family session availability",
    ],
    timeline: [
      {
        time: "08:15",
        title: "CIWA reassessment signed",
        summary: "Withdrawal symptoms improving. Score decreased from 11 to 7 after morning med pass.",
        author: "M. Gomez, RN",
        type: "Nursing",
      },
      {
        time: "09:00",
        title: "Relapse prevention group attended",
        summary: "Patient engaged, shared triggers, and completed worksheet goals with peers.",
        author: "T. Warren, LPC",
        type: "Group",
      },
      {
        time: "10:20",
        title: "Progress note drafted",
        summary: "Template prefilled with presenting symptoms, goals, and yesterday’s unresolved tasks.",
        author: "K. Patel, Therapist",
        type: "Clinical",
      },
      {
        time: "11:05",
        title: "Authorization review flagged",
        summary: "Continued stay review due tomorrow at 9:00 AM with clinical packet still missing one signature.",
        author: "Revenue Ops Bot",
        type: "UR",
      },
    ],
  },
  {
    slug: "avery-collins",
    name: "Avery Collins",
    age: 34,
    program: "Detox",
    dayLabel: "Pending admit",
    diagnosis: "Opioid use disorder",
    levelOfCare: "ASAM 3.7-WM",
    careTeam: "Admissions RN · Intake coordinator · On-call provider",
    riskFlags: ["Hospital referral", "MAT history", "High-priority intake"],
    tasks: [
      "Complete nursing screening",
      "Confirm bed turnover timing",
      "Send admit-ready notification to front desk",
    ],
    timeline: [
      {
        time: "16:10",
        title: "Benefits verification completed",
        summary: "Commercial coverage confirmed with detox benefits available and no prior auth barrier to initial admit.",
        author: "L. Kim",
        type: "Admissions",
      },
      {
        time: "16:35",
        title: "Hospital clinical packet received",
        summary: "Recent vitals, medication list, and discharge summary imported into intake workspace.",
        author: "A. Flores",
        type: "Documents",
      },
      {
        time: "17:00",
        title: "Bed identified",
        summary: "Semi-private detox bed expected to turn over by 7:15 PM pending housekeeping clear.",
        author: "Bed board",
        type: "Placement",
      },
    ],
  },
];

export const chartTimeline: TimelineItem[] = patientRecords[0].timeline;

export const scheduleEvents: ScheduleEvent[] = [
  {
    slug: "morning-meds-vitals",
    time: "08:30",
    title: "Morning meds + vitals",
    track: "Detox",
    owner: "Nursing team",
    location: "Med room A",
    occupancy: "Detox census 92%",
    duration: "45 min",
  },
  {
    slug: "process-group",
    time: "10:00",
    title: "Process group",
    track: "Residential",
    owner: "T. Warren",
    location: "Group room 2",
    occupancy: "Residential census 84%",
    duration: "60 min",
  },
  {
    slug: "family-session",
    time: "13:00",
    title: "Family session",
    track: "Residential",
    owner: "K. Patel",
    location: "Telehealth suite",
    occupancy: "4 family sessions today",
    duration: "50 min",
  },
  {
    slug: "ur-huddle",
    time: "15:30",
    title: "Utilization review huddle",
    track: "Admin",
    owner: "Billing + UR",
    location: "Ops office",
    occupancy: "3 reviews due by tomorrow",
    duration: "30 min",
  },
];

export const billingTasks: BillingTask[] = [
  {
    slug: "jordan-nguyen-auth-review",
    patient: "Jordan Nguyen",
    payer: "Aetna",
    issue: "Continued stay review packet missing therapist signature",
    due: "Tomorrow · 9:00 AM",
    owner: "D. Price",
    severity: "Critical",
    queue: "UR review",
    status: "Packet incomplete",
    summary: "Clinical packet is nearly ready, but one therapist signature still blocks submission to the payer.",
  },
  {
    slug: "avery-collins-intake-auth",
    patient: "Avery Collins",
    payer: "BlueCross TN",
    issue: "Intake labs uploaded but not linked to initial auth request",
    due: "Today · 6:00 PM",
    owner: "L. Kim",
    severity: "Watch",
    queue: "Intake follow-up",
    status: "Waiting on attachment linkage",
    summary: "Required intake labs exist in the chart but still need to be attached to the auth packet before submission.",
  },
  {
    slug: "maria-santos-benefits",
    patient: "Maria Santos",
    payer: "Cigna",
    issue: "Benefits verified. Pending detox admit date confirmation",
    due: "No hard deadline",
    owner: "S. Ortiz",
    severity: "Stable",
    queue: "Benefits verified",
    status: "Ready for admit scheduling",
    summary: "No immediate reimbursement risk; queue item remains open until admit timing is locked in.",
  },
];

export const reportCards: ReportCard[] = [
  {
    title: "Average length of stay",
    figure: "24.6 days",
    note: "Residential LOS is up 1.8 days month over month.",
  },
  {
    title: "Note completion rate",
    figure: "96.2%",
    note: "Nursing notes are strongest. Therapy signatures are the main delay.",
  },
  {
    title: "Payer mix",
    figure: "41% commercial",
    note: "BlueCross and Aetna remain the top two reimbursers this quarter.",
  },
  {
    title: "Occupancy trend",
    figure: "88%",
    note: "Detox is near full utilization across the next 72 hours.",
  },
];

export function getAdmissionsLead(slug: string) {
  return admissionsLeads.find((lead) => lead.slug === slug);
}

export function getPatientRecord(slug: string) {
  return patientRecords.find((record) => record.slug === slug);
}

export function getBillingTask(slug: string) {
  return billingTasks.find((task) => task.slug === slug);
}
