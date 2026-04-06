import { AppShell } from "@/components/app-shell";
import { ReportsView } from "@/components/reports-view";

export default function ReportsPage() {
  return (
    <AppShell
      active="Reports"
      title="Reporting should help leadership understand the facility instantly."
      description="The reporting layer is meant to show how census, compliance, revenue risk, and operational trends can be surfaced without relying on spreadsheet exports."
    >
      <ReportsView />
    </AppShell>
  );
}
