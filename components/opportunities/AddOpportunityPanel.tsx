"use client";

import { useRouter } from "next/navigation";
import { OpportunityForm } from "@/components/opportunities/OpportunityForm";
import { useAuth } from "@/context/AuthContext";
import { useOpportunities } from "@/context/OpportunityContext";
import { useToast } from "@/context/ToastContext";
import type { OpportunityInput } from "@/types/opportunity";

export function AddOpportunityPanel() {
  const router = useRouter();
  const { user } = useAuth();
  const { createOpportunity } = useOpportunities();
  const { notify } = useToast();
  const isAdmin = user?.role === "admin";

  const submit = async (input: OpportunityInput) => {
    const id = createOpportunity({
      ...input,
      submittedBy: input.submittedBy ?? user?.name,
    });

    notify({
      title: isAdmin ? "Opportunity created" : "Opportunity submitted",
      description: isAdmin
        ? "The record is available based on the selected status."
        : "It is pending admin approval in the dashboard.",
      variant: "success",
    });
    router.push(`/opportunities/${id}`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
      <OpportunityForm
        mode="create"
        allowAdminFields={isAdmin}
        submittedBy={user?.name}
        onSubmit={submit}
      />
    </div>
  );
}
