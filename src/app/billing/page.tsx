import { AppShell } from "@/components/app-shell";
import { BillingView } from "@/components/billing-view";

export default function BillingPage() {
  return (
    <AppShell
      active="Billing"
      title="Billing and utilization review should expose blockers before revenue gets hit."
      description="This queue is designed to connect authorization deadlines, missing documentation, and ownership so revenue teams can act quickly with clinical context."
    >
      <BillingView />
    </AppShell>
  );
}
