import { AdminShell } from "@/components/admin/admin-shell";
import { HistoryDashboard } from "@/components/admin/history-dashboard";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

export default function HistoryPage() {
  return (
    <AdminShell
      topBar={
        <AdminTopBar
          navItems={[
            { href: "/history", label: "Overview" },
            { active: true, href: "/history", label: "Calendar" },
            { href: "/connect", label: "Connections" },
          ]}
        />
      }
    >
      <HistoryDashboard />
    </AdminShell>
  );
}
