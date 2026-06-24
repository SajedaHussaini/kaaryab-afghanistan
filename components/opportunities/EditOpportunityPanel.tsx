"use client";

import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { OpportunityForm } from "@/components/opportunities/OpportunityForm";
import { useAuth } from "@/context/AuthContext";
import { useOpportunities } from "@/context/OpportunityContext";
import { useToast } from "@/context/ToastContext";
import type { OpportunityInput } from "@/types/opportunity";

export function EditOpportunityPanel({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getOpportunityById, updateOpportunity } = useOpportunities();
  const { notify } = useToast();
  const opportunity = getOpportunityById(id);
  const isAdmin = user?.role === "admin";

  if (!opportunity) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
        <EmptyState
          title="Opportunity not found"
          description="This record may have been deleted from LocalStorage."
          actionHref="/opportunities"
          actionLabel="Back to opportunities"
        />
      </div>
    );
  }

  const submit = async (input: OpportunityInput) => {
    updateOpportunity(id, input);
    notify({
      title: "Opportunity updated",
      description: "Your changes were saved in this browser.",
      variant: "success",
    });
    router.push(`/opportunities/${id}`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
      <OpportunityForm
        mode="edit"
        initialOpportunity={opportunity}
        allowAdminFields={isAdmin}
        submitLabel="Save opportunity"
        onSubmit={submit}
      />
    </div>
  );
}
