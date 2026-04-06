import { scheduleEvents } from "@/lib/demo-data";

export function ScheduleView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Scheduling</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Daily operations board</h3>
          </div>
          <span className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300">
            Monday · Nashville Campus
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { label: "Detox census", value: "34 / 37" },
            { label: "Residential census", value: "40 / 48" },
            { label: "Staff on shift", value: "22" },
            { label: "Transports today", value: "4" },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4">
          {scheduleEvents.map((event) => (
            <article key={event.slug} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:w-[42%]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      {event.time}
                    </span>
                    <p className="font-medium text-white">{event.title}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{event.owner}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{event.duration} · {event.occupancy}</p>
                </div>

                <div className="grid flex-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Program</p>
                    <p className="mt-2 text-sm text-white">{event.track}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Location</p>
                    <p className="mt-2 text-sm text-white">{event.location}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
                    <p className="mt-2 text-sm text-white">On track</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Scheduling philosophy</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Operations should be visual, not hidden in dense tables</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Staff coverage", value: "97%" },
            { label: "Groups today", value: "14" },
            { label: "Beds turning over", value: "5" },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">Bed board snapshot</p>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Live occupancy demo</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { bed: "Detox 2A", status: "Occupied", note: "CIWA q4h" },
              { bed: "Detox 2B", status: "Turnover", note: "Housekeeping in progress" },
              { bed: "Residential 5C", status: "Occupied", note: "Family session at 1 PM" },
              { bed: "Residential 6A", status: "Reserved", note: "Jordan Nguyen admit tomorrow" },
            ].map((bed) => (
              <div key={bed.bed} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{bed.bed}</p>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">
                    {bed.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{bed.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Group schedule",
              text: "Make curriculum, attendance, room usage, and staffing visible in one glanceable layout.",
            },
            {
              title: "Staff coverage",
              text: "Let leadership see nursing, therapy, BHT, and admissions coverage gaps before they become operational problems.",
            },
            {
              title: "Census visibility",
              text: "Tie occupancy and patient movement into the same scheduling layer so bed planning is not a separate mystery.",
            },
            {
              title: "Mobile use",
              text: "Rounds and floor work should still be usable on tablets and phones without the interface falling apart.",
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
