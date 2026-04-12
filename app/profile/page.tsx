import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

export default function ProfilePage() {
  return (
    <AdminShell
      topBar={
        <AdminTopBar
          navItems={[
            { href: "/history", label: "Analysis" },
            { href: "/connect", label: "Connect" },
            { active: true, href: "/profile", label: "Settings" },
          ]}
        />
      }
    >
      <AdminPlaceholderPage
        description="Profile settings will become the control room for identity, token scope, and personal preferences. This placeholder keeps the route real while the shared visual language is established."
        eyebrow="Profile Suite"
        title="Identity and governance will live here next."
      />
    </AdminShell>
  );
}
