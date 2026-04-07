import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { ChartingWorkspace } from "@/components/charting-workspace";
import { getPatientRecord } from "@/lib/demo-data";

type PatientDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { slug } = await params;
  const patient = getPatientRecord(slug);

  if (!patient) {
    notFound();
  }

  return (
    <AppShell
      active="Patients"
      title={`${patient.name} chart workspace`}
      description="A chart view should keep staff oriented around the patient, the day’s priorities, and the clinical timeline without forcing them through clutter."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Patients", href: "/patients" },
        { label: patient.name },
      ]}
    >
      <div className="grid gap-6">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-200">Patient chart</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{patient.name}</h3>
              <p className="mt-2 text-sm text-slate-300">Age {patient.age} · {patient.program} · {patient.dayLabel}</p>
            </div>
            <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs text-violet-100">
              {patient.levelOfCare}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Primary diagnosis", value: patient.diagnosis },
              { label: "Current LOC", value: patient.levelOfCare },
              { label: "Care team", value: patient.careTeam },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-base font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {patient.timeline.map((entry) => (
              <article key={`${entry.time}-${entry.title}`} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="w-16 shrink-0 text-sm font-semibold text-cyan-200">{entry.time}</div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-white">{entry.title}</p>
                    <span className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300">
                      {entry.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{entry.summary}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{entry.author}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ChartingWorkspace />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Clinical priorities</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="font-semibold text-white">Risk flags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {patient.riskFlags.map((flag) => (
                  <span key={flag} className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                    {flag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="font-semibold text-white">Today’s tasks</p>
              <div className="mt-3 space-y-3">
                {patient.tasks.map((task, index) => (
                  <div key={task} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                      {index + 1}
                    </span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">Care team activity</p>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Shared chart updates</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "09:12 · Therapist opened daily progress note template",
                  "10:24 · RN signed CIWA reassessment",
                  "11:05 · UR reminder added to chart banner",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">Suggested note templates</p>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                  Draft auto-saved
                </span>
              </div>
              <div className="mt-3 grid gap-3">
                {[
                  "Detox daily progress note",
                  "Nursing reassessment",
                  "Family session summary",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      index === 0
                        ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                        : "border-white/10 bg-white/[0.03] text-slate-300"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
