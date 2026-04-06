import { AppShell } from "@/components/app-shell";
import { DashboardView } from "@/components/dashboard-view";

export default function Home() {
  return (
    <AppShell
      active="Dashboard"
      title="A cleaner, faster behavioral health EMR for detox and rehab centers."
      description="This interactive demo shell is built to show how admissions, charting, scheduling, billing, and reporting can live in one coherent system with far less friction than legacy tools."
    >
      <DashboardView />
    </AppShell>
  );
}
