import type { Metadata } from "next";
import { OpportunitiesExplorer } from "@/components/opportunities/OpportunitiesExplorer";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Browse, search, and filter jobs, internships, scholarships, remote work, training programs, and volunteer opportunities.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader

        title="Find your next opportunity"
        description="Search by title, category, location, work mode, deadline, and opportunity type. Approved records are shown publicly while new submissions wait for admin review."

      />
      <OpportunitiesExplorer />
    </>
  );
}

// export default async function OpportunitiesPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ category?: string }>;
// }) {
//   const { category } = await searchParams;

//   return (
//     <>
//       <PageHeader
//         title="Find your next opportunity"
//         description="Search by title, category, location, work mode, deadline, and opportunity type. Approved records are shown publicly while new submissions wait for admin review."
//       />

//       <OpportunitiesExplorer initialCategory={category ?? "All"} />
      
//   );
// }

