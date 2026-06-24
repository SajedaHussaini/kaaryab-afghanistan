import type { Metadata } from "next";
import { EditOpportunityPanel } from "@/components/opportunities/EditOpportunityPanel";
import { PageHeader } from "@/components/ui/PageHeader";

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
      <PageHeader
        eyebrow="CRUD"
        title="Edit opportunity"
        description="Update opportunity information, requirements, tags, and admin fields. Changes are saved in LocalStorage for this demo."
      />
      <EditOpportunityPanel id={id} />
    </>
  );
}
