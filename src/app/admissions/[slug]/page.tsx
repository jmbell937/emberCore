import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { getAdmissionsLead } from "@/lib/demo-data";

type AdmissionsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdmissionsDetailPage({ params }: AdmissionsDetailPageProps) {
  const { slug } = await params;
  const lead = getAdmissionsLead(slug);

  if (!lead) {
    notFound();
  }

  return (
    <AppShell
      active="Admissions"
      title={`${lead.name} intake workspace`}
      description="A modern intake detail view should gather referral, payer, placement, and readiness details into one clear operating screen."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Admissions", href: "/admissions" },
        { label: lead.name },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Lead summary</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{lead.name}</h3>
              <p className="mt-2 text-sm text-slate-300">Age {lead.age} · {lead.levelOfCare} · {lead.facility}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                {lead.priority} priority
              </span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                {lead.stage}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Referral source", value: lead.source },
              { label: "Requested admit", value: lead.requestedDate },
              { label: "Payer", value: lead.payer },
              { label: "Bed type", value: lead.bedType },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-base font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">Recent intake activity</p>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Auto-timestamped demo</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                "16:10 · Benefits verification completed",
                "16:35 · Clinical packet imported from referral source",
                "17:00 · Bed board tentatively reserved detox 2B",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm font-semibold text-white">Current status</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{lead.status}</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">{lead.summary}</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Readiness checklist</p>
          <div className="mt-6 space-y-3">
            {[
              "Insurance eligibility verified",
              "Clinical packet imported",
              "Nursing screening pending",
              "Bed turnover confirmed",
              "Front desk admit packet staged",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    index < 2
                      ? "bg-emerald-400/20 text-emerald-100"
                      : index === 2
                        ? "bg-amber-300/20 text-amber-100"
                        : "bg-white/10 text-slate-300"
                  }`}
                >
                  {index < 2 ? "✓" : index === 2 ? "!" : index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Next actions</p>
            <div className="mt-3 space-y-3">
              {[
                "Complete nursing screen before 6:45 PM",
                "Confirm housekeeping clearance on detox bed 2B",
                "Send admit-ready alert to front desk and charge nurse",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
