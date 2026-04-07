import { AppShell } from "@/components/app-shell";
import { IntakeWizard } from "@/components/intake-wizard";

export default function NewAdmissionPage() {
  return (
    <AppShell
      active="Admissions"
      title="New patient intake demo"
      description="This flow now behaves like a real intake wizard with editable fields, step progression, live summary, and a completion state."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Admissions", href: "/admissions" },
        { label: "New intake" },
      ]}
    >
      <IntakeWizard />
    </AppShell>
  );
}
