import { demoRoles, getRoleDescription } from "@/lib/demo-session";

export function LoginDemoView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Demo entry</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Choose how you want to experience EmberCore</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            In a real SaaS product this would be authentication, tenant-aware access, and permissions. For the demo, it doubles as a role-based walkthrough selector.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {demoRoles.map((role) => (
            <a
              key={role}
              href={
                role === "Executive + Ops"
                  ? "/demo-login/executive-ops"
                  : role === "Admissions"
                    ? "/demo-login/admissions"
                    : role === "Therapist"
                      ? "/demo-login/therapist"
                      : role === "Nurse"
                        ? "/demo-login/nurse"
                        : "/demo-login/billing"
              }
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4 transition hover:border-cyan-300/25 hover:bg-slate-950/65"
            >
              <p className="font-semibold text-white">{role}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{getRoleDescription(role)}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Why this matters in demos</p>
        <div className="mt-6 space-y-4">
          {[
            "Shows that the product is designed around role-specific workflows, not one generic screen for everyone",
            "Lets you tailor a customer conversation based on who is in the room",
            "Makes the SaaS concept feel more complete, even before real auth is built",
            "Provides a natural narrative for executive, clinical, admissions, and billing stakeholders",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
