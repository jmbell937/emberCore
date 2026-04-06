import { AppShell } from "@/components/app-shell";
import { ScheduleView } from "@/components/schedule-view";

export default function SchedulePage() {
  return (
    <AppShell
      active="Schedule"
      title="Scheduling should be visual enough to run the building from it."
      description="This demo view shows a more readable approach to staff coverage, patient appointments, groups, and occupancy-oriented coordination."
    >
      <ScheduleView />
    </AppShell>
  );
}
