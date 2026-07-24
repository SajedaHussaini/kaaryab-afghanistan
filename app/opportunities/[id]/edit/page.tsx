import type { Metadata } from "next";
import { EditOpportunityPanel } from "@/components/opportunities/EditOpportunityPanel";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "Edit Opportunity",
};

type EditOpportunityPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditOpportunityPage({
  params,
}: EditOpportunityPageProps) {
  const { id } = await params;

  return (
    <>
    <ProtectedRoute>
      <PageHeader
        title="Edit opportunity"
        description="Update opportunity information, requirements, tags, and admin fields. Changes are saved in LocalStorage for this demo."
      />
      <EditOpportunityPanel id={id} />
      </ProtectedRoute>
    </>
  );
}
