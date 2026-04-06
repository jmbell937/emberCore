import { AppShell } from "@/components/app-shell";
import { PatientsView } from "@/components/patients-view";

export default function PatientsPage() {
  return (
    <AppShell
      active="Patients"
      title="Patient charting should feel oriented, fast, and built for handoffs."
      description="The chart home is centered around the patient timeline, care context, and note-entry speed so staff can document without getting lost in the interface."
    >
      <PatientsView />
    </AppShell>
  );
}
