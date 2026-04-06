import { reportCards } from "@/lib/demo-data";

export function ReportsView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-200">Reporting</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Executive dashboard preview</h3>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reportCards.map((card) => (
            <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">{card.title}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{card.figure}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{card.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">Completion trend</p>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Last 7 days</span>
          </div>
          <div className="mt-5 flex items-end gap-3">
            {[
              { day: "M", value: "h-24" },
              { day: "T", value: "h-28" },
              { day: "W", value: "h-20" },
              { day: "T", value: "h-32" },
              { day: "F", value: "h-36" },
              { day: "S", value: "h-16" },
              { day: "S", value: "h-14" },
            ].map((bar, index) => (
              <div key={`${bar.day}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                <div className={`w-full rounded-t-2xl bg-gradient-to-t from-cyan-400 to-violet-400 ${bar.value}`} />
                <span className="text-xs text-slate-500">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Why the reporting matters</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Leadership should understand the facility without exporting to spreadsheets</h3>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-400/10 p-5">
          <p className="text-sm font-semibold text-white">What this proves in a customer demo</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Cleaner workflow handoffs between admissions, clinical, and revenue teams",
              "A chart that surfaces what matters without forcing tab-hopping",
              "Scheduling that’s visual and operationally useful",
              "Reporting that leadership can understand at a glance",
            ].map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-slate-200">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Operational KPIs",
              text: "Census, occupancy, admits, discharges, bed turnover, and staffing coverage.",
            },
            {
              title: "Clinical compliance",
              text: "Unsigned notes, overdue treatment plans, and documentation completion trends.",
            },
            {
              title: "Revenue insights",
              text: "Authorization expirations, payer mix, blocked claims, and readiness snapshots.",
            },
            {
              title: "Growth view",
              text: "Admissions conversion, source trends, and facility-level performance comparisons.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
