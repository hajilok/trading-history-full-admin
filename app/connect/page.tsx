import { AdminShell } from "@/components/admin/admin-shell";
import { ConnectTokenManager } from "@/components/admin/connect-token-manager";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

export default function ConnectPage() {
  return (
    <AdminShell
      topBar={
        <AdminTopBar
          navItems={[
            { href: "/history", label: "Analysis" },
            { active: true, href: "/connect", label: "Connect" },
            { href: "/settings", label: "Settings" },
          ]}
        />
      }
    >
      <ConnectTokenManager />
    </AdminShell>
  );
}
