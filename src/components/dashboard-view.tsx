import { dashboardMetrics } from "@/lib/demo-data";

const toneClasses = {
  cyan: "from-cyan-400/20 to-sky-500/5 border-cyan-300/15 text-cyan-100",
  emerald: "from-emerald-400/20 to-teal-500/5 border-emerald-300/15 text-emerald-100",
  violet: "from-violet-400/20 to-fuchsia-500/5 border-violet-300/15 text-violet-100",
  amber: "from-amber-300/20 to-orange-500/5 border-amber-300/15 text-amber-100",
};

export function DashboardView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Role-aware dashboard</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Today at a glance</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-2 text-sm text-slate-300">
            Viewing: <span className="font-medium text-white">Executive + Ops</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => {
            const href =
              metric.label === "Current census"
                ? "/schedule"
                : metric.label === "Unsigned notes"
                  ? "/patients/jordan-nguyen"
                  : metric.label === "Open admissions"
                    ? "/admissions"
                    : "/billing";

            return (
              <a
                key={metric.label}
                href={href}
                className={`block rounded-[1.6rem] border bg-gradient-to-br p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/25 ${toneClasses[metric.tone]}`}
              >
                <p className="text-sm text-slate-200/90">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-300">{metric.change}</p>
              </a>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Facility health snapshot</p>
                <p className="mt-1 text-sm text-slate-400">Cross-team visibility without opening five modules</p>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                Live demo data
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {[
                { label: "Detox occupancy", value: "92%", width: "w-[92%]" },
                { label: "Residential occupancy", value: "84%", width: "w-[84%]" },
                { label: "On-time documentation", value: "96%", width: "w-[96%]" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span className="font-medium text-white">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className={`h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 ${item.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm font-semibold text-white">Priority work queues</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "7 intakes need final bed placement", href: "/admissions" },
                { label: "3 auth reviews due within 24 hours", href: "/billing/jordan-nguyen-auth-review" },
                { label: "11 unsigned notes across clinical teams", href: "/patients/jordan-nguyen" },
                { label: "2 discharge plans waiting on physician review", href: "/schedule" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-200">Demo vision</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">What makes this better than legacy EMRs</h3>
          </div>
          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs text-violet-100">
            UX-first
          </span>
        </div>

        <div className="mt-6 grid gap-4">
          {[
            {
              title: "Charting without tab-hopping",
              text: "Timeline-first chart homes surface the patient context, alerts, care team, and recent documentation immediately.",
            },
            {
              title: "Admissions that feel guided",
              text: "Insurance, clinical screening, facility fit, and bed placement can happen inside one coherent intake workspace.",
            },
            {
              title: "Scheduling people can actually read",
              text: "Staff coverage, group sessions, patient appointments, and census visibility should live in visual, operationally useful views.",
            },
            {
              title: "Billing with context",
              text: "Surface missing documentation, expiring auths, and revenue blockers before they get lost in handoff chaos.",
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
