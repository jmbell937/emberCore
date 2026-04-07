"use client";

import { useMemo, useState } from "react";

const templates = [
  {
    name: "Detox daily progress note",
    content:
      "Patient reports improving withdrawal symptoms, engaged in treatment programming, and remains appropriate for continued detox monitoring.",
  },
  {
    name: "Nursing reassessment",
    content:
      "Vital signs reviewed, CIWA score documented, and medication response remains stable with no acute escalation concerns.",
  },
  {
    name: "Family session summary",
    content:
      "Family contact focused on treatment engagement, discharge planning expectations, and support-system readiness.",
  },
];

export function ChartingWorkspace() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [noteBody, setNoteBody] = useState(templates[0].content);
  const [status, setStatus] = useState<"Draft" | "Saved" | "Signed">("Draft");

  const activityLabel = useMemo(() => {
    if (status === "Signed") return "Note signed and added to timeline";
    if (status === "Saved") return "Draft saved to chart";
    return "Editing in progress";
  }, [status]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Charting workspace</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Choose note template</h3>
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
            Role-aware
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {templates.map((template) => (
            <button
              key={template.name}
              type="button"
              onClick={() => {
                setSelectedTemplate(template);
                setNoteBody(template.content);
                setStatus("Draft");
              }}
              className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                selectedTemplate.name === template.name
                  ? "border-cyan-300/25 bg-cyan-300/10"
                  : "border-white/10 bg-slate-950/45 hover:border-cyan-300/20 hover:bg-slate-950/65"
              }`}
            >
              <p className="font-semibold text-white">{template.name}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{template.content}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-200">Draft note</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{selectedTemplate.name}</h3>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs ${
              status === "Signed"
                ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                : status === "Saved"
                  ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/[0.04] text-slate-300"
            }`}
          >
            {status}
          </span>
        </div>

        <textarea
          value={noteBody}
          onChange={(event) => {
            setNoteBody(event.target.value);
            setStatus("Draft");
          }}
          className="mt-6 min-h-[220px] w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/[0.05]"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            {activityLabel}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStatus("Saved")}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("Signed")}
              className="rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              Sign note
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
