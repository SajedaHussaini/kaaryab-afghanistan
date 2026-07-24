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
        title="Welcome back"
        description="Sign in to explore personalized features and manage your opportunities."
      />
      <AuthPanel />
    </>
  );
}
