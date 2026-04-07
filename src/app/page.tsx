import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { DashboardView } from "@/components/dashboard-view";

export default function Home() {
  return (
    <AppShell
      active="Dashboard"
      title="A cleaner, faster behavioral health EMR for detox and rehab centers."
      description="This interactive demo shell is built to show how admissions, charting, scheduling, billing, and reporting can live in one coherent system with far less friction than legacy tools."
    >
      <div className="grid gap-6">
        <section className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/10 p-5 shadow-xl shadow-cyan-950/20 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">Suggested demo path</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Best way to present EmberCore in a customer meeting</h3>
            </div>
            <Link
              href="/demo-login"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Start with role selector
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              { step: "01", label: "Choose stakeholder role", href: "/demo-login" },
              { step: "02", label: "Show intake flow", href: "/admissions/new" },
              { step: "03", label: "Review admissions queue", href: "/admissions" },
              { step: "04", label: "Drill into chart or billing", href: "/patients/jordan-nguyen" },
            ].map((item) => (
              <a
                key={item.step}
                href={item.href}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100">{item.step}</p>
                <p className="mt-2 text-sm font-medium text-white">{item.label}</p>
              </a>
            ))}
          </div>
        </section>

        <DashboardView />
      </div>
    </AppShell>
  );
}
