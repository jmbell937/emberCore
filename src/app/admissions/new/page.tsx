import Link from "next/link";

import { AppShell } from "@/components/app-shell";

const sections = [
  {
    title: "Patient basics",
    fields: ["First name", "Last name", "DOB", "Phone", "Email"],
  },
  {
    title: "Referral + clinical fit",
    fields: ["Referral source", "Substances used", "Withdrawal risk", "Psych flags", "Requested LOC"],
  },
  {
    title: "Insurance + financial",
    fields: ["Primary payer", "Member ID", "Benefits status", "Auth needed", "Financial notes"],
  },
];

export default function NewAdmissionPage() {
  return (
    <AppShell
      active="Admissions"
      title="New patient intake demo"
      description="This flow shows how a modern admissions workspace can collect referral, clinical, and payer information in one guided intake experience."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Admissions", href: "/admissions" },
        { label: "New intake" },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Guided intake</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Create a new admission</h3>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              Demo flow · Step 1 of 4
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">{section.title}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <label key={field} className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                      <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">{field}</span>
                      <span className="mt-3 block text-sm text-slate-400">Demo input</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admissions/avery-collins"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              Continue to intake summary
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-950/70"
            >
              Back to admissions queue
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Why this intake demo matters</p>
          <div className="mt-6 space-y-4">
            {[
              "One guided flow instead of scattered tabs and duplicate entry",
              "Clinical fit and insurance context stay visible together",
              "Admissions can move from inquiry to bed-ready handoff faster",
              "The intake can become the first version of the patient chart instead of a disconnected record",
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 p-4">
            <p className="text-sm font-semibold text-white">Demo actions that work</p>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <p>• Start intake → opens this screen</p>
              <p>• Continue to intake summary → opens a working detail route</p>
              <p>• Open chart / Create progress note → opens the patient chart demo</p>
              <p>• Review auths → opens billing / UR queue</p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
