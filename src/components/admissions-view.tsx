"use client";

import { admissionsLeads } from "@/lib/demo-data";
import { intakeQueueStorageKey, type IntakeQueueItem } from "@/lib/intake-draft-store";

function getDraftQueueItem() {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem(intakeQueueStorageKey);

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as IntakeQueueItem;
  } catch {
    window.localStorage.removeItem(intakeQueueStorageKey);
    return null;
  }
}

export function AdmissionsView() {
  const draftQueueItem = getDraftQueueItem();

  const queue = draftQueueItem
    ? [draftQueueItem, ...admissionsLeads.map((lead) => ({
        slug: lead.slug,
        name: lead.name,
        levelOfCare: lead.levelOfCare,
        facility: lead.facility,
        payer: lead.payer,
        requestedDate: lead.requestedDate,
        updatedAt: lead.updatedAt,
        priority: lead.priority,
        status: lead.status,
        stage: lead.stage,
        summary: lead.summary,
      }))]
    : admissionsLeads.map((lead) => ({
        slug: lead.slug,
        name: lead.name,
        levelOfCare: lead.levelOfCare,
        facility: lead.facility,
        payer: lead.payer,
        requestedDate: lead.requestedDate,
        updatedAt: lead.updatedAt,
        priority: lead.priority,
        status: lead.status,
        stage: lead.stage,
        summary: lead.summary,
      }));
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Admissions workspace</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Intake pipeline</h3>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            New inquiry
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">Queue filters</p>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Demo state</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "High priority only", active: true },
                { label: "Benefits verified" },
                { label: "Needs nursing review" },
                { label: "Transport pending" },
              ].map((filter) => (
                <div
                  key={filter.label}
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    filter.active
                      ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                      : "border-white/10 bg-white/[0.03] text-slate-300"
                  }`}
                >
                  {filter.label}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Automation preview</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                New hospital referrals with verified commercial benefits can be auto-prioritized into the intake queue.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/65 p-4">
              <p className="text-sm font-semibold text-white">Status automation</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Benefits verified",
                  "Nursing review queued",
                  "Bed hold available",
                ].map((item) => (
                  <span key={item} className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {queue.map((lead) => (
              <a
                key={lead.slug}
                href={lead.slug === "avery-collins" || lead.slug === "jordan-nguyen-intake" || lead.slug === "maria-santos" || lead.slug === "devon-brooks" ? `/admissions/${lead.slug}` : "/admissions/new"}
                className={`block rounded-[1.5rem] border p-4 transition hover:border-cyan-300/25 hover:bg-slate-950/65 ${
                  lead.slug === draftQueueItem?.slug
                    ? "border-emerald-300/25 bg-emerald-300/10"
                    : "border-white/10 bg-slate-950/45"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-semibold text-white">{lead.name}</p>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                        {lead.levelOfCare}
                      </span>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-100">
                        {lead.priority}
                      </span>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">
                        {lead.stage}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{lead.status}</p>
                    <p className="mt-2 text-sm text-slate-500">{lead.summary}</p>
                    {lead.slug === draftQueueItem?.slug ? (
                      <span className="mt-3 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                        Newly submitted demo intake
                      </span>
                    ) : null}
                  </div>
                  <div className="text-sm text-slate-400 sm:text-right">
                    <p>{lead.facility}</p>
                    <p className="mt-1 text-slate-300">{lead.payer}</p>
                    <p className="mt-1 text-slate-300">Requested {lead.requestedDate}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">Updated {lead.updatedAt}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Why this view wins</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">One intake workspace instead of scattered tabs</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "New today", value: "8" },
            { label: "Ready to admit", value: "3" },
            { label: "Waiting on payer", value: "2" },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {[
            {
              title: "Insurance + eligibility",
              text: "Keep payer, benefits, auth status, and financial risk together so admissions does not work blind.",
            },
            {
              title: "Clinical screening",
              text: "Capture substance history, withdrawal risk, psychiatric flags, and placement notes in the same flow.",
            },
            {
              title: "Placement + bed management",
              text: "Show the right facility, level of care, and bed availability without forcing staff into separate tools.",
            },
            {
              title: "Fast admit handoff",
              text: "Once admitted, the patient chart should already contain the core data needed by nursing, therapy, and billing.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
