import { ProtectedRoute } from "@/components/auth/protected-route";
import { ComingSoonPage } from "@/components/site/coming-soon-page";

export default function SubmitPage() {
  return (
    <ProtectedRoute>
      <ComingSoonPage
        description="This submission surface will eventually house the premium ingestion flow for importing or writing new trading entries. In this issue, it serves as a styled shell ready for the next feature pass."
        eyebrow="Submission Atelier"
        title="A polished intake flow is on the runway."
      />
    </ProtectedRoute>
  );
}
