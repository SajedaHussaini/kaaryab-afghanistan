import type { Metadata } from "next";
import { CvBuilder } from "@/components/forms/CvBuilder";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "PDF CV Builder",
  description: "Build and download a simple PDF CV in the browser.",
};

export default function CvBuilderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bonus feature"
        title="PDF CV builder"
        description="Create a clean applicant CV and download it as a PDF directly from the browser."
      />
      <CvBuilder />
    </>
  );
}
