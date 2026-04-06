import { AppShell } from "@/components/app-shell";
import { LoginDemoView } from "@/components/login-demo-view";

export default function DemoLoginPage() {
  return (
    <AppShell
      active="Dashboard"
      title="Role-based demo entry"
      description="Choose a role-specific path through the product to show how EmberCore can adapt to different treatment-center teams."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Demo login" },
      ]}
    >
      <LoginDemoView />
    </AppShell>
  );
}
