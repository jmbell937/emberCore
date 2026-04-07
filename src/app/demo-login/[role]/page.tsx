import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { getRoleDashboard, getRoleDescription, type DemoRole } from "@/lib/demo-session";

const validRoles = new Set(["executive-ops", "admissions", "therapist", "nurse", "billing"]);

function slugToRole(slug: string): DemoRole | null {
  switch (slug) {
    case "executive-ops":
      return "Executive + Ops";
    case "admissions":
      return "Admissions";
    case "therapist":
      return "Therapist";
    case "nurse":
      return "Nurse";
    case "billing":
      return "Billing";
    default:
      return null;
  }
}

type RoleDashboardPageProps = {
  params: Promise<{ role: string }>;
};

export default async function RoleDashboardPage({ params }: RoleDashboardPageProps) {
  const { role } = await params;

  if (!validRoles.has(role)) {
    notFound();
  }

  const resolvedRole = slugToRole(role);

  if (!resolvedRole) {
    notFound();
  }

  const config = getRoleDashboard(resolvedRole);

  return (
    <AppShell
      active="Dashboard"
      title={config.title}
      description={getRoleDescription(resolvedRole)}
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Demo login", href: "/demo-login" },
        { label: resolvedRole },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Role view</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{config.subtitle}</h3>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              {resolvedRole}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "My tasks", value: resolvedRole === "Billing" ? "9" : resolvedRole === "Admissions" ? "7" : "6" },
              { label: "Due today", value: resolvedRole === "Nurse" ? "5" : "3" },
              { label: "Escalations", value: resolvedRole === "Executive + Ops" ? "4" : "1" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {config.highlights.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Suggested next screens</p>
          <div className="mt-6 space-y-3">
            {[
              resolvedRole === "Admissions" ? { label: "Open new intake", href: "/admissions/new" } : null,
              resolvedRole === "Therapist" ? { label: "Open patient chart", href: "/patients/jordan-nguyen" } : null,
              resolvedRole === "Nurse" ? { label: "View schedule board", href: "/schedule" } : null,
              resolvedRole === "Billing" ? { label: "Open auth review", href: "/billing/jordan-nguyen-auth-review" } : null,
              resolvedRole === "Executive + Ops" ? { label: "Review reporting", href: "/reports" } : null,
              { label: "Return to demo role selector", href: "/demo-login" },
            ]
              .filter(Boolean)
              .map((item) => (
                <a
                  key={item!.label}
                  href={item!.href}
                  className="block rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-white/[0.05] hover:text-white"
                >
                  {item!.label}
                </a>
              ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
