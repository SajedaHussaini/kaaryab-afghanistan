import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send feedback or suggestions to the KaarYab Afghanistan demo.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Share feedback or opportunity leads"
        description="Have a question, suggestion, or partnership idea? We'd love to hear from you. Get in touch and we'll respond as soon as possible."
      />
      <div className="mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </>
  );
}
