import Link from "next/link";
import type { ReactNode } from "react";

import { quickActions, topNav } from "@/lib/demo-data";

type AppShellProps = {
  children: ReactNode;
  active: string;
  title: string;
  description: string;
  eyebrow?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

const quickActionLinks: Record<string, string> = {
  "Start intake": "/admissions/new",
  "Open chart": "/patients/jordan-nguyen",
  "Create progress note": "/patients/jordan-nguyen",
  "Review auths": "/billing",
};

export function AppShell({
  children,
  active,
  title,
  description,
  eyebrow = "EmberCore Health",
  breadcrumbs,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(180deg,_#07111d_0%,_#09131f_38%,_#071018_100%)] text-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <aside className="hidden w-72 shrink-0 flex-col rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur xl:flex">
          <div className="rounded-[1.6rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">{eyebrow}</p>
            <h1 className="mt-3 text-2xl font-semibold text-white">Detox + Rehab Command Center</h1>
            <p className="mt-3 text-sm leading-7 text-cyan-50/90">
              Demo-first EMR SaaS concept designed around admissions, charting, scheduling, billing, and reporting.
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {topNav.map((item) => {
              const href = item.label === "Dashboard" ? "/" : `/${item.label.toLowerCase()}`;
              const isActive = item.label === active;

              return (
                <a
                  key={item.label}
                  href={href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-xs text-cyan-100">
                      {item.badge}
                    </span>
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Quick actions</p>
            <div className="mt-4 space-y-2">
              {quickActions.map((action) => (
                <a
                  key={action}
                  href={quickActionLinks[action]}
                  className="block w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-slate-900"
                >
                  {action}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-violet-400/20 to-fuchsia-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">Product stance</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              This product should feel like a modern operating system for treatment centers, not a prettier skin on an old EMR.
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                  EH
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">EmberCore Health</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Detox + Rehab SaaS Demo</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/schedule"
                  className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-slate-900"
                >
                  Facility: <span className="font-medium text-white">Nashville Campus</span>
                </Link>
                <Link
                  href="/demo-login"
                  className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-slate-900"
                >
                  Role preview: <span className="font-medium text-white">Executive + Ops</span>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 xl:hidden">
              {topNav.map((item) => {
                const href = item.label === "Dashboard" ? "/" : `/${item.label.toLowerCase()}`;
                const isActive = item.label === active;

                return (
                  <a
                    key={item.label}
                    href={href}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-100">
                        {item.badge}
                      </span>
                    ) : null}
                  </a>
                );
              })}
            </div>

            <div className="mt-3 grid gap-2 xl:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Quick actions</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickActions.map((action) => (
                  <a
                    key={action}
                    href={quickActionLinks[action]}
                    className="inline-flex shrink-0 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-slate-900"
                  >
                    {action}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
                  Demo Environment
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Multi-facility SaaS concept
                </div>
                <div>
                  {breadcrumbs && breadcrumbs.length > 0 ? (
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                      {breadcrumbs.map((crumb, index) => (
                        <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                          {crumb.href ? (
                            <a href={crumb.href} className="transition hover:text-slate-300">
                              {crumb.label}
                            </a>
                          ) : (
                            <span className="text-slate-300">{crumb.label}</span>
                          )}
                          {index < breadcrumbs.length - 1 ? <span>/</span> : null}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[440px] lg:grid-cols-1 xl:grid-cols-3">
                {[
                  { label: "Facilities", value: "3" },
                  { label: "Open admits", value: "18" },
                  { label: "Mobile ready", value: "Yes" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>
    </main>
  );
}
