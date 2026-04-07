"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { intakeQueueStorageKey, type IntakeQueueItem } from "@/lib/intake-draft-store";

type IntakeForm = {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  referralSource: string;
  substances: string;
  withdrawalRisk: string;
  psychFlags: string;
  medicalConcerns: string;
  requestedLoc: string;
  payer: string;
  memberId: string;
  benefitsStatus: string;
  authRequired: string;
  financialNotes: string;
  facility: string;
  bedType: string;
  transport: string;
  admitDate: string;
  priority: string;
  ciwaRequired: string;
  authNotes: string;
};

const steps = [
  "Patient basics",
  "Clinical screening",
  "Insurance + financial",
  "Placement + logistics",
  "Review + submit",
] as const;

const storageKey = "embercore-intake-draft";

const initialForm: IntakeForm = {
  firstName: "Avery",
  lastName: "Collins",
  dob: "1991-05-18",
  phone: "(615) 555-0142",
  email: "avery@example.com",
  referralSource: "Hospital referral",
  substances: "Alcohol, benzodiazepines",
  withdrawalRisk: "Moderate",
  psychFlags: "None reported",
  medicalConcerns: "Monitor vitals closely first 24h",
  requestedLoc: "Medical detox",
  payer: "BlueCross TN",
  memberId: "XJ22914",
  benefitsStatus: "Verified",
  authRequired: "No",
  financialNotes: "Commercial plan active",
  facility: "Nashville Campus",
  bedType: "Detox semi-private",
  transport: "Hospital discharge transport",
  admitDate: "2026-04-06T19:30",
  priority: "High",
  ciwaRequired: "Yes",
  authNotes: "",
};

const requiredFields: (keyof IntakeForm)[][] = [
  ["firstName", "lastName", "dob", "phone", "referralSource"],
  ["substances", "withdrawalRisk", "requestedLoc"],
  ["payer", "memberId", "benefitsStatus", "authRequired"],
  ["facility", "bedType", "admitDate", "priority"],
  [],
];

function inputClass(hasError: boolean) {
  return `mt-2 w-full rounded-2xl border px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-white/[0.05] ${
    hasError
      ? "border-rose-300/35 bg-rose-300/10 focus:border-rose-300/50"
      : "border-white/10 bg-white/[0.03] focus:border-cyan-300/35"
  }`;
}

function labelize(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function getInitialForm() {
  if (typeof window === "undefined") {
    return initialForm;
  }

  const saved = window.localStorage.getItem(storageKey);

  if (!saved) {
    return initialForm;
  }

  try {
    return JSON.parse(saved) as IntakeForm;
  } catch {
    window.localStorage.removeItem(storageKey);
    return initialForm;
  }
}

export function IntakeWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<IntakeForm | null>(null);
  const [form, setForm] = useState<IntakeForm>(() => getInitialForm());
  const [errors, setErrors] = useState<Partial<Record<keyof IntakeForm, string>>>({});

  useEffect(() => {
    if (submitted) return;
    window.localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form, submitted]);

  const readiness = useMemo(() => {
    const verifiedBenefits = form.benefitsStatus.toLowerCase().includes("verified");
    const hasFacility = form.facility.length > 0;
    const highPriority = form.priority === "High";

    if (verifiedBenefits && hasFacility && highPriority) {
      return { label: "Ready for intake queue", tone: "text-emerald-100 border-emerald-300/20 bg-emerald-300/10" };
    }

    return { label: "Needs manual review", tone: "text-amber-100 border-amber-300/20 bg-amber-300/10" };
  }, [form]);

  const generatedSlug = useMemo(() => {
    return `${form.firstName}-${form.lastName}`.trim().toLowerCase().replace(/\s+/g, "-");
  }, [form.firstName, form.lastName]);

  const updateField = (key: keyof IntakeForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validateStep = () => {
    const stepFields = requiredFields[step];
    const nextErrors: Partial<Record<keyof IntakeForm, string>> = {};

    stepFields.forEach((field) => {
      if (!String(form[field]).trim()) {
        nextErrors[field] = `${labelize(field)} is required`;
      }
    });

    if (step === 1 && form.withdrawalRisk === "High" && !form.ciwaRequired.trim()) {
      nextErrors.ciwaRequired = "CIWA requirement is required for high withdrawal risk";
    }

    if (step === 2 && form.authRequired === "Yes" && !form.authNotes.trim()) {
      nextErrors.authNotes = "Authorization notes are required when auth is needed";
    }

    setErrors((current) => ({ ...current, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const back = () => setStep((current) => Math.max(current - 1, 0));

  const submit = () => {
    const queueItem: IntakeQueueItem = {
      slug: generatedSlug,
      name: `${form.firstName} ${form.lastName}`,
      levelOfCare: form.requestedLoc,
      facility: form.facility,
      payer: form.payer,
      requestedDate: form.admitDate,
      updatedAt: "Just now",
      priority: form.priority,
      status: "Ready for admissions review",
      stage: "New submission",
      summary: `${form.requestedLoc} intake created from ${form.referralSource.toLowerCase()} with ${form.benefitsStatus.toLowerCase()} benefits.`,
    };

    window.localStorage.setItem(intakeQueueStorageKey, JSON.stringify(queueItem));
    setSubmittedSnapshot(form);
    setSubmitted(true);
    window.localStorage.removeItem(storageKey);
  };

  const reset = () => {
    setSubmitted(false);
    setSubmittedSnapshot(null);
    setStep(0);
    setForm(initialForm);
    setErrors({});
    window.localStorage.removeItem(storageKey);
  };

  const renderFieldError = (key: keyof IntakeForm) =>
    errors[key] ? <span className="mt-2 block text-xs text-rose-200">{errors[key]}</span> : null;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Guided intake</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Create a new admission</h3>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Draft saved locally</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {steps.map((label, index) => (
            <div key={label} className="space-y-2">
              <div className={`h-2 rounded-full ${index <= step ? "bg-cyan-300" : "bg-white/10"}`} />
              <p className={`text-xs ${index === step ? "text-white" : "text-slate-500"}`}>{label}</p>
            </div>
          ))}
        </div>

        {!submitted ? (
          <div className="mt-6 space-y-6">
            {step === 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "First name", key: "firstName", type: "text" },
                  { label: "Last name", key: "lastName", type: "text" },
                  { label: "DOB", key: "dob", type: "date" },
                  { label: "Phone", key: "phone", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                ].map((field) => (
                  <label key={field.key} className="block text-sm text-slate-300">
                    {field.label}
                    <input
                      type={field.type}
                      value={form[field.key as keyof IntakeForm]}
                      onChange={(event) => updateField(field.key as keyof IntakeForm, event.target.value)}
                      className={inputClass(Boolean(errors[field.key as keyof IntakeForm]))}
                    />
                    {renderFieldError(field.key as keyof IntakeForm)}
                  </label>
                ))}

                <label className="block text-sm text-slate-300">
                  Referral source
                  <select
                    value={form.referralSource}
                    onChange={(event) => updateField("referralSource", event.target.value)}
                    className={inputClass(Boolean(errors.referralSource))}
                  >
                    <option className="bg-slate-950">Hospital referral</option>
                    <option className="bg-slate-950">Self referral</option>
                    <option className="bg-slate-950">Family referral</option>
                    <option className="bg-slate-950">Internal transfer</option>
                  </select>
                  {renderFieldError("referralSource")}
                </label>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-300 md:col-span-2">
                  Substances used
                  <textarea
                    value={form.substances}
                    onChange={(event) => updateField("substances", event.target.value)}
                    className={inputClass(Boolean(errors.substances))}
                    rows={3}
                  />
                  {renderFieldError("substances")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Withdrawal risk
                  <select
                    value={form.withdrawalRisk}
                    onChange={(event) => updateField("withdrawalRisk", event.target.value)}
                    className={inputClass(Boolean(errors.withdrawalRisk))}
                  >
                    <option className="bg-slate-950">Low</option>
                    <option className="bg-slate-950">Moderate</option>
                    <option className="bg-slate-950">High</option>
                  </select>
                  {renderFieldError("withdrawalRisk")}
                </label>

                {form.withdrawalRisk === "High" ? (
                  <label className="block text-sm text-slate-300 md:col-span-2">
                    CIWA required?
                    <select
                      value={form.ciwaRequired}
                      onChange={(event) => updateField("ciwaRequired", event.target.value)}
                      className={inputClass(Boolean(errors.ciwaRequired))}
                    >
                      <option className="bg-slate-950">Yes</option>
                      <option className="bg-slate-950">No</option>
                    </select>
                    {renderFieldError("ciwaRequired")}
                  </label>
                ) : null}

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Psych flags
                  <textarea
                    value={form.psychFlags}
                    onChange={(event) => updateField("psychFlags", event.target.value)}
                    className={inputClass(Boolean(errors.psychFlags))}
                    rows={2}
                  />
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Medical concerns
                  <textarea
                    value={form.medicalConcerns}
                    onChange={(event) => updateField("medicalConcerns", event.target.value)}
                    className={inputClass(Boolean(errors.medicalConcerns))}
                    rows={2}
                  />
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Requested LOC
                  <select
                    value={form.requestedLoc}
                    onChange={(event) => updateField("requestedLoc", event.target.value)}
                    className={inputClass(Boolean(errors.requestedLoc))}
                  >
                    <option className="bg-slate-950">Medical detox</option>
                    <option className="bg-slate-950">Residential</option>
                    <option className="bg-slate-950">PHP</option>
                    <option className="bg-slate-950">IOP</option>
                  </select>
                  {renderFieldError("requestedLoc")}
                </label>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-300 md:col-span-2">
                  Payer
                  <select
                    value={form.payer}
                    onChange={(event) => updateField("payer", event.target.value)}
                    className={inputClass(Boolean(errors.payer))}
                  >
                    <option className="bg-slate-950">BlueCross TN</option>
                    <option className="bg-slate-950">Aetna</option>
                    <option className="bg-slate-950">Cigna</option>
                    <option className="bg-slate-950">UnitedHealthcare</option>
                  </select>
                  {renderFieldError("payer")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Member ID
                  <input
                    value={form.memberId}
                    onChange={(event) => updateField("memberId", event.target.value)}
                    className={inputClass(Boolean(errors.memberId))}
                  />
                  {renderFieldError("memberId")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Benefits status
                  <select
                    value={form.benefitsStatus}
                    onChange={(event) => updateField("benefitsStatus", event.target.value)}
                    className={inputClass(Boolean(errors.benefitsStatus))}
                  >
                    <option className="bg-slate-950">Verified</option>
                    <option className="bg-slate-950">Pending</option>
                    <option className="bg-slate-950">Needs manual call</option>
                  </select>
                  {renderFieldError("benefitsStatus")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Auth required
                  <select
                    value={form.authRequired}
                    onChange={(event) => updateField("authRequired", event.target.value)}
                    className={inputClass(Boolean(errors.authRequired))}
                  >
                    <option className="bg-slate-950">No</option>
                    <option className="bg-slate-950">Yes</option>
                  </select>
                  {renderFieldError("authRequired")}
                </label>

                {form.authRequired === "Yes" ? (
                  <label className="block text-sm text-slate-300 md:col-span-2">
                    Authorization notes
                    <textarea
                      value={form.authNotes}
                      onChange={(event) => updateField("authNotes", event.target.value)}
                      className={inputClass(Boolean(errors.authNotes))}
                      rows={3}
                    />
                    {renderFieldError("authNotes")}
                  </label>
                ) : null}

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Financial notes
                  <textarea
                    value={form.financialNotes}
                    onChange={(event) => updateField("financialNotes", event.target.value)}
                    className={inputClass(Boolean(errors.financialNotes))}
                    rows={2}
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-300 md:col-span-2">
                  Facility
                  <select
                    value={form.facility}
                    onChange={(event) => updateField("facility", event.target.value)}
                    className={inputClass(Boolean(errors.facility))}
                  >
                    <option className="bg-slate-950">Nashville Campus</option>
                    <option className="bg-slate-950">Franklin Recovery</option>
                    <option className="bg-slate-950">Murfreesboro PHP</option>
                  </select>
                  {renderFieldError("facility")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Bed type
                  <select
                    value={form.bedType}
                    onChange={(event) => updateField("bedType", event.target.value)}
                    className={inputClass(Boolean(errors.bedType))}
                  >
                    <option className="bg-slate-950">Detox semi-private</option>
                    <option className="bg-slate-950">Detox private</option>
                    <option className="bg-slate-950">Residential private</option>
                    <option className="bg-slate-950">PHP outpatient seat</option>
                  </select>
                  {renderFieldError("bedType")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Transport
                  <input
                    value={form.transport}
                    onChange={(event) => updateField("transport", event.target.value)}
                    className={inputClass(Boolean(errors.transport))}
                  />
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Admit date/time
                  <input
                    type="datetime-local"
                    value={form.admitDate}
                    onChange={(event) => updateField("admitDate", event.target.value)}
                    className={inputClass(Boolean(errors.admitDate))}
                  />
                  {renderFieldError("admitDate")}
                </label>

                <label className="block text-sm text-slate-300 md:col-span-2">
                  Priority
                  <select
                    value={form.priority}
                    onChange={(event) => updateField("priority", event.target.value)}
                    className={inputClass(Boolean(errors.priority))}
                  >
                    <option className="bg-slate-950">Low</option>
                    <option className="bg-slate-950">Medium</option>
                    <option className="bg-slate-950">High</option>
                  </select>
                  {renderFieldError("priority")}
                </label>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(form)
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <div key={key} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{labelize(key)}</p>
                      <p className="mt-2 text-sm text-white">{value}</p>
                    </div>
                  ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="rounded-2xl border border-white/10 bg-slate-950/45 px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-950/70"
              >
                Back
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Reset draft
                </button>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                  >
                    Create intake record
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100">Intake created</p>
            <h4 className="mt-2 text-2xl font-semibold text-white">
              {submittedSnapshot?.firstName} {submittedSnapshot?.lastName} is now in the admissions queue
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              A new demo intake record was created for slug <span className="font-semibold">{generatedSlug}</span>. Benefits, clinical fit, and placement data were packaged into the admissions handoff.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                ["Patient", `${submittedSnapshot?.firstName} ${submittedSnapshot?.lastName}`],
                ["Referral", submittedSnapshot?.referralSource ?? ""],
                ["Requested LOC", submittedSnapshot?.requestedLoc ?? ""],
                ["Payer", submittedSnapshot?.payer ?? ""],
                ["Placement", `${submittedSnapshot?.facility ?? ""} · ${submittedSnapshot?.bedType ?? ""}`],
                ["Priority", submittedSnapshot?.priority ?? ""],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-emerald-50/80">{label}</p>
                  <p className="mt-2 text-sm text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/10 p-4">
              <p className="font-semibold text-white">Generated handoff summary</p>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                {submittedSnapshot?.firstName} {submittedSnapshot?.lastName} was referred via {submittedSnapshot?.referralSource?.toLowerCase()} for {submittedSnapshot?.requestedLoc?.toLowerCase()}.
                Benefits are marked {submittedSnapshot?.benefitsStatus?.toLowerCase()}, placement is targeting {submittedSnapshot?.facility}, and current priority is {submittedSnapshot?.priority?.toLowerCase()}.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(4);
                }}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Review submitted data
              </button>
              <Link
                href="/admissions"
                className="rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                View admissions queue
              </Link>
              <button
                type="button"
                onClick={reset}
                className="rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Start another intake
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Intake readiness</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Referral age", value: "5 min" },
            { label: "Benefits status", value: form.benefitsStatus },
            { label: "Clinical fit", value: form.requestedLoc },
            { label: "Bed readiness", value: form.bedType },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className={`mt-6 rounded-[1.5rem] border p-4 ${readiness.tone}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.22em]">Readiness signal</p>
          <p className="mt-2 text-lg font-semibold">{readiness.label}</p>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-white">Live summary</p>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Auto-updating</span>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-300">
            <p>Patient: {form.firstName} {form.lastName}</p>
            <p>Referral: {form.referralSource}</p>
            <p>Requested LOC: {form.requestedLoc}</p>
            <p>Payer: {form.payer}</p>
            <p>Placement: {form.facility} · {form.bedType}</p>
            <p>Generated slug: {generatedSlug}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
