import type { Metadata } from "next";
import { SavedOpportunities } from "@/components/opportunities/SavedOpportunities";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Saved Opportunities",
  description: "Review opportunities saved in your browser.",
};

export default function SavedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Saved"
        title="Saved opportunities"
        description="Your saved opportunities are stored locally in this browser, so you can return to important jobs, scholarships, and programs quickly."
      />
      <SavedOpportunities />
    </>
  );
}
