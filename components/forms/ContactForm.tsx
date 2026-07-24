"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { useToast } from "@/context/ToastContext";
import { memo, useCallback } from "react";

export const ContactForm = memo(function ContactForm() {
  const { notify } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  const submit = useCallback(
    async (values: ContactFormValues) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        notify({
          title: "Failed to send message",
          description: "We couldn't send your message. Please try again later.",
          variant: "error",
        });
        return;
      }

      notify({
        title: "Message sent successfully",
        description:
          "Thank you for contacting KaarYab Afghanistan. We'll get back to you as soon as possible.",
        variant: "success",
      });

      reset();
    },
    [notify, reset]
  );

  const inputClass =
    "h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const textareaClass =
    "min-h-36 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm leading-6 text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const labelClass =
    "text-sm font-semibold text-neutral-700 dark:text-neutral-200";
  const errorClass = "text-sm font-medium text-rose-600 dark:text-rose-300";

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
            Send a message
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Suggestions, corrections, and opportunity leads are welcome.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Name</span>
          <input className={inputClass} {...register("name")} />
          {errors.name ? (
            <span className={errorClass}>{errors.name.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Email</span>
          <input className={inputClass} {...register("email")} />
          {errors.email ? (
            <span className={errorClass}>{errors.email.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className={labelClass}>Topic</span>
          <input
            className={inputClass}
            placeholder="New opportunity, feedback, correction"
            {...register("topic")}
          />
          {errors.topic ? (
            <span className={errorClass}>{errors.topic.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className={labelClass}>Message</span>
          <textarea
            className={textareaClass}
            placeholder="Write your suggestion or message here."
            {...register("message")}
          />
          {errors.message ? (
            <span className={errorClass}>{errors.message.message}</span>
          ) : null}
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
});
