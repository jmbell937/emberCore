import { patientRecords } from "@/lib/demo-data";

export function PatientsView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-200">Patient charts</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Open patient workspace previews</h3>
          </div>
          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs text-violet-100">
            Timeline-first
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {patientRecords.map((patient) => (
            <a
              key={patient.slug}
              href={`/patients/${patient.slug}`}
              className="block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.05]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-white">{patient.name}</p>
                    <span className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300">
                      {patient.program}
                    </span>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">
                      {patient.dayLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{patient.diagnosis}</p>
                  <p className="mt-2 text-sm text-slate-500">{patient.careTeam}</p>
                </div>
                <div className="text-sm text-slate-400 sm:text-right">
                  <p>{patient.levelOfCare}</p>
                  <p className="mt-1 text-slate-300">Age {patient.age}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{patient.timeline.length} timeline events</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Chart design principles</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Documentation should feel fast and oriented</h3>

        <div className="mt-6 space-y-4">
          {[
            "Sticky patient context so staff always know who they are documenting on",
            "Recent events, signatures, alerts, and tasks visible without extra navigation",
            "Role-based templates for therapy, nursing, BHT observations, and physician notes",
            "Timeline layout that makes handoffs easier between departments",
          ].map((point) => (
            <div key={point} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4 text-sm leading-7 text-slate-300">
              {point}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
