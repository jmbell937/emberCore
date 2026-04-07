"use client";

import { useMemo, useState } from "react";

const actions = [
  "Request therapist signature",
  "Attach clinical packet",
  "Submit payer review",
];

export function BillingReviewWorkspace() {
  const [selectedAction, setSelectedAction] = useState(actions[0]);
  const [status, setStatus] = useState<"Blocked" | "In progress" | "Submitted">("Blocked");

  const helper = useMemo(() => {
    if (status === "Submitted") {
      return "Packet submitted to payer review queue.";
    }

    if (status === "In progress") {
      return `Working action: ${selectedAction}`;
    }

    return "Current blocker is still preventing submission.";
  }, [selectedAction, status]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">Billing review</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Action queue</h3>
          </div>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
            UR workflow
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => {
                setSelectedAction(action);
                setStatus(action === "Submit payer review" ? "In progress" : "Blocked");
              }}
              className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                selectedAction === action
                  ? "border-amber-300/25 bg-amber-300/10"
                  : "border-white/10 bg-slate-950/45 hover:border-amber-300/20 hover:bg-slate-950/65"
              }`}
            >
              <p className="font-semibold text-white">{action}</p>
              <p className="mt-2 text-sm text-slate-300">
                {action === "Request therapist signature"
                  ? "Escalate the missing signature blocker to clinical staff."
                  : action === "Attach clinical packet"
                    ? "Bundle UR notes, treatment plan, and signatures for review."
                    : "Send the packet once blockers are resolved."}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Selected action</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{selectedAction}</h3>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs ${
              status === "Submitted"
                ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                : status === "In progress"
                  ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                  : "border-rose-300/20 bg-rose-300/10 text-rose-100"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-white">Workflow guidance</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{helper}</p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            Queue item: Jordan Nguyen · Aetna review
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStatus("In progress")}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
            >
              Mark in progress
            </button>
            <button
              type="button"
              onClick={() => setStatus("Submitted")}
              className="rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              Submit review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
