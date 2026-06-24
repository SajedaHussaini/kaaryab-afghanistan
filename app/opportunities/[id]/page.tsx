import type { Metadata } from "next";
import { OpportunityDetail } from "@/components/opportunities/OpportunityDetail";
import { opportunities } from "@/data/opportunities";

type OpportunityPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: OpportunityPageProps): Promise<Metadata> {
  const { id } = await params;
  const opportunity = opportunities.find((item) => item.id === id);

  return {
    title: opportunity?.title ?? "Opportunity Details",
    description:
      opportunity?.description ??
      "View full opportunity details on KaarYab Afghanistan.",
  };
}

export default async function OpportunityDetailsPage({
  params,
}: OpportunityPageProps) {
  const { id } = await params;
  return <OpportunityDetail id={id} />;
}
