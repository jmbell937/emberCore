import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BillingReviewWorkspace } from "@/components/billing-review-workspace";
import { getBillingTask } from "@/lib/demo-data";

type BillingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BillingDetailPage({ params }: BillingDetailPageProps) {
  const { slug } = await params;
  const task = getBillingTask(slug);

  if (!task) {
    notFound();
  }

  return (
    <AppShell
      active="Billing"
      title={`${task.patient} authorization workspace`}
      description="This view demonstrates how a billing or utilization review specialist could see blockers, deadlines, and ownership without leaving the revenue workflow."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Billing", href: "/billing" },
        { label: task.patient },
      ]}
    >
      <div className="grid gap-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">Revenue work item</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{task.patient}</h3>
              <p className="mt-2 text-sm text-slate-300">{task.payer} · {task.queue}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                {task.status}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                Due {task.due}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="font-semibold text-white">Current blocker</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{task.issue}</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">{task.summary}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Owner", value: task.owner },
              { label: "Severity", value: task.severity },
              { label: "Queue", value: task.queue },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-base font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">Review activity</p>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Status history</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                "08:40 · Continued stay packet opened by D. Price",
                "09:05 · Missing therapist signature detected",
                "09:15 · Follow-up task auto-assigned to K. Patel",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <BillingReviewWorkspace />

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Recommended actions</p>
          <div className="mt-6 space-y-3">
            {[
              "Notify assigned therapist that signature is still missing",
              "Open linked chart note directly from this revenue item",
              "Bundle supporting documents into payer-specific packet",
              "Escalate to supervisor if still incomplete by 7:00 AM",
            ].map((item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
