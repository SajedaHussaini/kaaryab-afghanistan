import type { Metadata } from "next";
import { AddOpportunityPanel } from "@/components/opportunities/AddOpportunityPanel";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "Add Opportunity",
  description:
    "Submit a new job, scholarship, internship, remote work, course, training program, or volunteer opportunity.",
};

export default function AddOpportunityPage() {
  return (
    <>
    <ProtectedRoute>
      <PageHeader
        title="Add a new opportunity"
        description="Organizations and community members can submit opportunities with validation. Non-admin submissions are saved as pending for dashboard approval."
      />
      <AddOpportunityPanel />
      </ProtectedRoute>
    </>
  );
}
