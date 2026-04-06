import { AppShell } from "@/components/app-shell";
import { AdmissionsView } from "@/components/admissions-view";

export default function AdmissionsPage() {
  return (
    <AppShell
      active="Admissions"
      title="Admissions should feel like one guided workflow, not a scavenger hunt."
      description="This view is designed to show how intake, insurance, screening, placement, and handoff can live together inside a clean modern admissions workspace."
    >
      <AdmissionsView />
    </AppShell>
  );
}
