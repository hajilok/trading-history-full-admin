import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

export default function SubmitPage() {
  return (
    <AdminShell
      topBar={
        <AdminTopBar
          navItems={[
            { href: "/history", label: "Analysis" },
            { href: "/connect", label: "Connect" },
            { href: "/profile", label: "Settings" },
          ]}
        />
      }
    >
      <AdminPlaceholderPage
        description="This submission surface will eventually house the premium ingestion flow for importing or writing new trading entries. In this issue, it serves as a styled shell ready for the next feature pass."
        eyebrow="Submission Atelier"
        title="A polished intake flow is on the runway."
      />
    </AdminShell>
  );
}
