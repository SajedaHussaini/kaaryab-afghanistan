"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarDays, LinkIcon, ListChecks, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  opportunityCategories,
  opportunityKinds,
  opportunityTypes,
} from "@/lib/constants";
import { opportunityFormSchema, type OpportunityFormValues } from "@/lib/schemas";
import { joinLines, splitLines } from "@/lib/utils";
import type { Opportunity, OpportunityInput } from "@/types/opportunity";

type OpportunityFormProps = {
  mode: "create" | "edit";
  initialOpportunity?: Opportunity;
  submitLabel?: string;
  allowAdminFields?: boolean;
  submittedBy?: string;
  onSubmit: (input: OpportunityInput) => void | Promise<void>;
};

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 21);
  return date.toISOString().slice(0, 10);
}

function toFormValues(
  opportunity?: Opportunity,
  submittedBy?: string,
): OpportunityFormValues {
  return {
    title: opportunity?.title ?? "",
    organization: opportunity?.organization ?? "",
    category: opportunity?.category ?? "Job",
    location: opportunity?.location ?? "",
    type: opportunity?.type ?? "Remote",
    opportunityType: opportunity?.opportunityType ?? "Full-time",
    deadline: opportunity?.deadline ?? getDefaultDeadline(),
    description: opportunity?.description ?? "",
    requirements: opportunity ? joinLines(opportunity.requirements) : "",
    applyLink: opportunity?.applyLink ?? "",
    tags: opportunity ? opportunity.tags.join(", ") : "",
    featured: opportunity?.featured ?? false,
    status: opportunity?.status ?? "pending",
    submittedBy: opportunity?.submittedBy ?? submittedBy ?? "",
  };
}

export function OpportunityForm({
  mode,
  initialOpportunity,
  submitLabel = mode === "create" ? "Submit opportunity" : "Save changes",
  allowAdminFields = false,
  submittedBy,
  onSubmit,
}: OpportunityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues: toFormValues(initialOpportunity, submittedBy),
    mode: "onBlur",
  });

  const submitForm = async (values: OpportunityFormValues) => {
    await onSubmit({
      title: values.title,
      organization: values.organization,
      category: values.category,
      location: values.location,
      type: values.type,
      opportunityType: values.opportunityType,
      deadline: values.deadline,
      description: values.description,
      requirements: splitLines(values.requirements),
      applyLink: values.applyLink,
      tags: splitLines(values.tags),
      featured: allowAdminFields
        ? values.featured
        : (initialOpportunity?.featured ?? false),
      status: allowAdminFields
        ? values.status
        : (initialOpportunity?.status ?? "pending"),
      submittedBy: values.submittedBy || undefined,
    });
  };

  const inputClass =
    "h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const textareaClass =
    "min-h-32 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm leading-6 text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const labelClass =
    "text-sm font-semibold text-neutral-700 dark:text-neutral-200";
  const errorClass = "text-sm font-medium text-rose-600 dark:text-rose-300";

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Title</span>
          <input
            className={inputClass}
            placeholder="Frontend Developer Intern"
            {...register("title")}
          />
          {errors.title ? (
            <span className={errorClass}>{errors.title.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Organization</span>
          <input
            className={inputClass}
            placeholder="Kabul Tech Community"
            {...register("organization")}
          />
          {errors.organization ? (
            <span className={errorClass}>{errors.organization.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Category</span>
          <select className={inputClass} {...register("category")}>
            {opportunityCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <span className={errorClass}>{errors.category.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Location</span>
          <input
            className={inputClass}
            placeholder="Kabul, Herat, Online"
            {...register("location")}
          />
          {errors.location ? (
            <span className={errorClass}>{errors.location.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Remote or on-site</span>
          <select className={inputClass} {...register("type")}>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type ? (
            <span className={errorClass}>{errors.type.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Opportunity type</span>
          <select className={inputClass} {...register("opportunityType")}>
            {opportunityKinds.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
          {errors.opportunityType ? (
            <span className={errorClass}>{errors.opportunityType.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Deadline</span>
          <span className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="date"
              className={`${inputClass} w-full pl-9`}
              {...register("deadline")}
            />
          </span>
          {errors.deadline ? (
            <span className={errorClass}>{errors.deadline.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Apply link</span>
          <span className="relative">
            <LinkIcon
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              className={`${inputClass} w-full pl-9`}
              placeholder="https://example.com/apply"
              {...register("applyLink")}
            />
          </span>
          {errors.applyLink ? (
            <span className={errorClass}>{errors.applyLink.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className={labelClass}>Description</span>
          <textarea
            className={textareaClass}
            placeholder="Explain the opportunity, who it is for, and what the applicant will gain."
            {...register("description")}
          />
          {errors.description ? (
            <span className={errorClass}>{errors.description.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Requirements</span>
          <span className="relative">
            <ListChecks
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400"
              aria-hidden="true"
            />
            <textarea
              className={`${textareaClass} w-full pl-9`}
              placeholder={"Basic React\nHTML and CSS\nGitHub profile"}
              {...register("requirements")}
            />
          </span>
          {errors.requirements ? (
            <span className={errorClass}>{errors.requirements.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Tags</span>
          <textarea
            className={textareaClass}
            placeholder="React, Next.js, Internship"
            {...register("tags")}
          />
          {errors.tags ? (
            <span className={errorClass}>{errors.tags.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className={labelClass}>Submitted by</span>
          <input
            className={inputClass}
            placeholder="Student, organization, or team name"
            {...register("submittedBy")}
          />
        </label>

        {allowAdminFields ? (
          <div className="grid gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900 md:col-span-2 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>Approval status</span>
              <select className={inputClass} {...register("status")}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
            <label className="flex items-center gap-3 self-end rounded-md border border-neutral-200 bg-white px-3 py-3 text-sm font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
              <input
                type="checkbox"
                className="h-4 w-4 accent-emerald-600"
                {...register("featured")}
              />
              Feature on home page
            </label>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
        <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          New submissions are saved locally and marked as pending until an admin
          approves them in the dashboard.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
