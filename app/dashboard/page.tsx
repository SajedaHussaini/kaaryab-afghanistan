import type { Metadata } from "next";
import { DashboardManager } from "@/components/dashboard/DashboardManager";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View opportunity statistics, charts, recent submissions, and admin approval tools.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Manage KaarYab opportunities"
        description="Track totals, jobs, scholarships, internships, remote options, expiring soon records, recent submissions, and admin approval status."
      />
      <DashboardManager />
    </>
  );
}
