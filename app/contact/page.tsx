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
        eyebrow="Contact"
        title="Share feedback or opportunity leads"
        description="Use the contact form to test the email/contact API flow. The demo endpoint validates the message and returns a success response."
      />
      <div className="mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </>
  );
}
