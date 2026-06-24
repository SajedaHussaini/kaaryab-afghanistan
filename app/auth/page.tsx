import type { Metadata } from "next";
import { AuthPanel } from "@/components/forms/AuthPanel";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "Test mock authentication and role-based admin behavior in KaarYab Afghanistan.",
};

export default function AuthPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bonus feature"
        title="Mock authentication"
        description="Use a local demo account to test student, organization, and admin workflows without a backend auth provider."
      />
      <AuthPanel />
    </>
  );
}
