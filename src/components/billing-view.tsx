import { billingTasks } from "@/lib/demo-data";

const severityClasses = {
  Critical: "border-rose-400/30 bg-rose-400/10 text-rose-100",
  Watch: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  Stable: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
};

export function BillingView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">Billing + UR</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Work queue with context</h3>
          </div>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
            3 items due soon
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {billingTasks.map((task) => (
            <a
              key={task.slug}
              href={`/billing/${task.slug}`}
              className="block rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4 transition hover:border-cyan-300/25 hover:bg-slate-950/65"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-white">{task.patient}</p>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${severityClasses[task.severity]}`}>
                      {task.severity}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                      {task.queue}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{task.issue}</p>
                  <p className="mt-2 text-sm text-slate-500">{task.summary}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Owner: {task.owner}</p>
                </div>
                <div className="text-sm text-slate-400 sm:text-right">
                  <p>{task.payer}</p>
                  <p className="mt-1 text-slate-300">{task.due}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{task.status}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Revenue cycle design</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Make blockers obvious early</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Critical", value: "1" },
            { label: "Watching", value: "1" },
            { label: "Stable", value: "1" },
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
              title: "Authorization deadlines",
              text: "Surface reviews that are coming due so clinical and billing can coordinate before reimbursement is at risk.",
            },
            {
              title: "Documentation gaps",
              text: "Missing signatures, unsigned treatment plans, and absent assessments should be visible from the revenue queue itself.",
            },
            {
              title: "Ownership clarity",
              text: "Every blocker should have an owner, due date, and linked clinical context instead of vague status notes.",
            },
            {
              title: "Executives stay informed",
              text: "Leadership should see overall claims readiness and UR bottlenecks without needing to dig into raw logs.",
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
