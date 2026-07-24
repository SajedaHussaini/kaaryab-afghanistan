import type { Metadata } from "next";
import { SavedOpportunities } from "@/components/opportunities/SavedOpportunities";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "Saved Opportunities",
  description: "Review opportunities saved in your browser.",
};

export default function SavedPage() {
  return (
    <>
    <ProtectedRoute>
      <PageHeader
        title="Saved opportunities"
        description="Your saved opportunities are stored locally in this browser, so you can return to important jobs, scholarships, and programs quickly."
      />
      <SavedOpportunities />
      </ProtectedRoute>
    </>
  );
}
